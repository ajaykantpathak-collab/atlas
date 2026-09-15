# Batch 5 drafts: lehs301-304 (Themes Part 3) + leps101-107 (Contemporary World Politics)
import _b5_helper as H

# ---------------- lehs301: Colonialism and the Countryside ---------------- #
C = [
 H.concept("lehs.301.1", "Permanent Settlement and Zamindars",
  "Bengal and the Zamindars",
  "The Permanent Settlement of 1793 fixed Bengal's revenue demand forever and "
  "made zamindars proprietors answerable for payment by sunset on fixed dates; "
  "default brought auction of their estates, so the East Company's state "
  "shifted risk onto the rural elite.",
  "",
  "Fixed demand plus strict sunset rules were designed for predictability, "
  "but fluctuating harvests made zamindars the first losers.",
  "lehs301.txt Permanent Settlement 1793, sunset law and auction sections",
  ["what did the Permanent Settlement of 1793 fix",
   "explain the sunset law and its consequences",
   "why were zamindari estates auctioned",
   "who was Cornwallis and his role in the settlement",
   "how did the raiyat's position change under the settlement",
   "evaluate the aims behind fixing revenue forever"],
  "verify_property",
  [H.vstep(1, "date the settlement", "Cornwallis introduced the Permanent Settlement in 1793"),
  H.vstep(2, "state the rigidity", "the demand was fixed forever and payment windows were brutally short"),
  H.vstep(3, "close with auctions", "defaulting zamindars saw estates sold to the highest bidder")]),
 H.concept("lehs.301.2", "Jotedars and Rural Power", "The Jotedars of Bengal",
  "Within Bengal villages, jotedars - rich peasants holding substantial land - "
  "controlled local credit, leased land to under-ryots and resisted zamindar "
  "demands far more effectively than zamindars resisted the state, shifting "
  "real rural power below the proprietors.",
  "",
  "While zamindars urbanised and defaulted, jotedars stayed in the village, "
  "buying auctioned land and tightening their grip on tenants.",
  "lehs301.txt jotedar power and resistance sections",
  ["who were jotedars and what powers did they wield",
   "why did jotedars resist zamindars successfully",
   "compare zamindar and jotedar positions after 1793",
   "how did credit strengthen jotedar control",
   "what happened to zamindars who moved to cities",
   "argue the jotedars as the true rural controllers"],
  "verify_property",
  [H.vstep(1, "define the layer", "jotedars held land and money-lending power over under-ryots"),
  H.vstep(2, "note their tactics", "they delayed rent, mobilised tenants and bought auctioned estates"),
  H.vstep(3, "close with persistence", "village residence gave jotedars staying power zamindars lacked")]),
 H.concept("lehs.301.3", "Santhals and the Rajmahal Hills",
  "The Santhals: Settled Farmers",
  "The Santhals migrated into the Rajmahal hills from the late eighteenth "
  "century, clearing forests for settled cultivation, clashing with Paharia "
  "herdsmen, and eventually rebelling in 1855-56 against moneylenders, "
  "indigo planters and colonial officials, which led to the creation of a "
  "separate Santhal district.",
  "",
  "Santhal settlement turned forest into paddy land, but traders' debts and "
  "state taxes converted gratitude into the great rebellion.",
  "lehs301.txt Paharias, Santhal settlement and 1855-56 rebellion sections",
  ["describe Paharia life in the Rajmahal hills",
   "how did Santhal settlement change the hills",
   "state the grievances behind the 1855 Santhal rebellion",
   "what followed the rebellion's suppression",
   "who led the Santhal rising",
   "relate moneylending to the rebellion's outbreak"],
  "verify_property",
  [H.vstep(1, "settle the hills", "Santhals cleared forest for permanent paddy and mulberry plots"),
  H.vstep(2, "date the revolt", "the rising of 1855-56 targeted moneylenders and colonial agents"),
  H.vstep(3, "close with the district", "a separate Santhal Pargana recognised their distinct world")]),
 H.concept("lehs.301.4", "Deccan Riots and the Cotton Boom",
  "The Deccan Riots",
  "The American Civil War cotton boom (1860s) drew Deccan ryots into credit-financed cotton exports; when prices crashed after 1864, debt to sahukars crushed peasants, and in 1875 ryots attacked moneylenders' houses and account books, prompting the Deccan Riots Commission.",
  "",
  "The rioters targeted the bahi khatas - account books - showing that the "
  "battle was over debt records as much as grain.",
  "lehs301.txt cotton boom, debt and 1875 riots sections",
  ["link the American Civil War to Deccan cotton expansion",
   "why did peasant debt explode after 1864",
   "what did ryots attack in 1875 and why account books",
   "what did the Deccan Riots Commission find",
   "describe the sahukar's methods of debt manipulation",
   "state the aftermath for debt legislation"],
  "verify_property",
  [H.vstep(1, "boom then bust", "war-time cotton prices drew ryots into debt-financed exports"),
  H.vstep(2, "burn the ledgers", "1875 rioters burned bahi khatas to destroy debt claims"),
  H.vstep(3, "close with inquiry", "the commission's report fixed the episode in colonial records")]),
 H.concept("lehs.301.5", "Colonial Countryside Timeline", "Colonial Countryside Timeline",
  "Key countryside dates form a chain: the Permanent Settlement in 1793, the "
  "Santhal rebellion in 1855, and the Deccan riots in 1875; each interval is "
  "found by subtracting the earlier year from the later one.",
  "ps_to_santhal = santhal_year - settlement_year",
  "Subtracting the settlement year from the Santhal year measures how long "
  "the settlement's order lasted before open rebellion.",
  "lehs301.txt dates 1793, 1855 and 1875 across the chapter",
  ["compute the years between the Permanent Settlement and the Santhal rising",
   "compute the interval between Santhal and Deccan riots",
   "arrange the three events in order",
   "what does the spacing suggest about colonial rule",
   "name the commission following the Deccan riots",
   "which decade saw the cotton crash"],
  "compute",
  [H.cstep(1, "record the two years", "settlement 1793, Santhal rising 1855", "settlement_year = 1793"),
   H.cstep(2, "subtract", "1855 - 1793 = 62 years between them", "ps_to_santhal = santhal_year - settlement_year")]),
]
W = [H.we("we_lehs301_1", "lehs301.txt dates 1793 and 1855", "lehs.301.5",
  "Compute the years between the Permanent Settlement (1793) and the Santhal "
  "rebellion (1855).",
  {"settlement_year": 1793, "santhal_year": 1855},
  [H.cstep(1, "record the years", "1793 settlement, 1855 rising", "settlement_year = 1793"),
   H.cstep(2, "subtract", "1855 - 1793 = 62 years", "ps_to_santhal = santhal_year - settlement_year")]),
 H.we("we_lehs301_2", "lehs301.txt jotedar sections", "lehs.301.2",
  "Explain two reasons jotedars outlasted zamindars as rural powers.",
  {},
  [H.vstep(1, "village presence", "jotedars lived among their tenants and controlled credit locally"),
   H.vstep(2, "state dependence", "the state needed village-level collection, giving jotedars leverage"),
   H.vstep(3, "conclusion", "auctions changed proprietors but not the men who ran the fields")],
  qtype="short_answer"),
 H.we("we_lehs301_3", "lehs301.txt Deccan riots section", "lehs.301.4",
  "Why did Deccan ryots burn account books in 1875?",
  {},
  [H.vstep(1, "debt as paper", "the bahi khata held inflated, manipulated claims"),
   H.vstep(2, "symbolic target", "destroying records symbolised ending bondage"),
   H.vstep(3, "conclusion", "the riot attacked the documentary engine of exploitation")],
  qtype="short_answer")]
E = [H.ex("ex_lehs301_1", "lehs301.txt end-of-chapter exercises, reworded",
          ["explain the Permanent Settlement and its sunset law",
           "describe the rise of jotedars in Bengal villages",
           "account for the Santhal rebellion of 1855-56",
           "compute intervals between 1793, 1855 and 1875",
           "discuss the Deccan riots and the commission's findings"]),
     H.ex("ex_lehs301_2", "lehs301.txt project questions, reworded",
          ["argue whom the Permanent Settlement really served",
           "use Santhal songs and accounts for rebellion history",
           "relate cotton price swings to peasant debt",
           "compare Bengal zamindars and Deccan sahukars as exploiters",
           "assess colonial records' biases in writing rural history"])]
H.emit("lehs301", H.make_cat("lehs301", "Colonialism and the Countryside", C, W, E))

# ---------------- lehs302: Rebels and the Raj ---------------- #
C = [
 H.concept("lehs.302.1", "Outbreak and Spread of the Revolt",
  "A Mutiny Becomes a Popular Rebellion",
  "On 10 May 1857 sepoys at Meerut broke out in mutiny over greased cartridges "
  "and pay grievances, killed officers and marched to Delhi to proclaim the "
  "ageing Bahadur Shah Zafar as emperor; the mutiny became a rebellion as "
  "peasants, zamindars and ousted chiefs joined across north India.",
  "",
  "Bahadur Shah Zafar's blessing turned a sepoy mutiny into a war with a "
  "political head, spreading it along the Ganga valley and central India.",
  "lehs302.txt Meerut outbreak, Delhi march and spread sections",
  ["what triggered the Meerut outbreak of 10 May 1857",
   "why did the sepoys march to Delhi",
   "name the leaders who joined the revolt at different centres",
   "which regions saw the strongest rebel activity",
   "how did civilians participate in the rebellion",
   "explain the role of Bahadur Shah Zafar in the revolt"],
  "verify_property",
  [H.vstep(1, "date the outbreak", "the mutiny began at Meerut on 10 May 1857"),
  H.vstep(2, "follow the march", "sepoys reached Delhi the next morning and sought Mughal legitimacy"),
  H.vstep(3, "close with spread", "Kanpur, Lucknow, Bareilly and Jhansi became rebel centres")]),
 H.concept("lehs.302.2", "Rumours and Prophecies", "Rumours and Prophecies",
  "The revolt travelled through rumours - greased cartridges defiling caste, "
  "flour kneaded with bone dust, prophecies of British rule ending on the "
  "centenary of Plassey - which historians read as expressions of real fears "
  "and hopes of a society under rapid change.",
  "",
  "Rumour was the rebellion's newspaper: fast, anonymous and believable "
  "because it voiced existing anxieties.",
  "lehs302.txt rumour and prophecy sections and their interpretation",
  ["explain the cartridge and flour rumours of 1857",
   "why do historians treat rumours as historical evidence",
   "what prophecy linked Plassey's centenary to British rule's end",
   "how did rumour move faster than officials",
   "connect peasant anxieties to the greased cartridge scare",
   "compare rumour's role in 1857 with modern media panics"],
  "verify_property",
  [H.vstep(1, "collect the rumours", "greased cartridges and bone-dust flour spread through cantonments"),
  H.vstep(2, "read their meaning", "each rumour encoded real fears of caste pollution and conquest"),
  H.vstep(3, "close with centenary", "the Plassey centenary prophecy gave the revolt a destiny narrative")]),
 H.concept("lehs.302.3", "Repression and the Aftermath", "Repression",
  "British repression was savage: Delhi was recaptured in September 1857, "
  "Bahadur Shah Zafar tried and exiled to Rangoon, rebel villages burnt and "
  "sepoys blown from guns; the Government of India Act 1858 transferred rule "
  "to the Crown and Queen Victoria's proclamation promised non-interference "
  "in religion and an end to annexations.",
  "",
  "The revolt's suppression rebuilt the raj: crown rule, army reorganisation "
  "and a policy of mistrust toward Indians followed.",
  "lehs302.txt repression, 1858 act and Queen's proclamation sections",
  ["describe the repression after Delhi's recapture",
   "what was Bahadur Shah Zafar's fate",
   "state the changes brought by the Government of India Act 1858",
   "what promises did the Queen's proclamation make",
   "how was the army reorganised after 1857",
   "evaluate policies of mistrust toward Muslims and Awadh"],
  "verify_property",
  [H.vstep(1, "count the reprisals", "executions, burnings and confiscations followed the recapture of cities"),
  H.vstep(2, "mark the transfer", "the 1858 act ended company rule and proclaimed crown governance"),
  H.vstep(3, "close with promises", "the proclamation renounced annexation and promised religious non-interference")]),
 H.concept("lehs.302.4", "Visions and Images of the Revolt",
  "Visions of Unity and Busts",
  " Rebel proclamations like the Azamgarh statement spoke for all communities "
  "against the British, while visual records - contemporary sketches, "
  "commemorative images of events like theblowing of sepoys - show how both "
  "sides remembered 1857; later nationalists recast the revolt as the first "
  "war of independence.",
  "",
  "Memory of 1857 changed with its readers: loyalist sketches, nationalist "
  "celebrations and official histories each built their own rebellion.",
  "lehs302.txt Azamgarh proclamation, images and nationalist memory sections",
  ["what did the Azamgarh proclamation promise and to whom",
   "how do contemporary sketches portray the revolt",
   "why is 1857 called the first war of independence",
   "compare rebel and British accounts of key events",
   "identify heroes commemorated in the revolt's memory",
   "discuss unity and division among the rebels"],
  "verify_property",
  [H.vstep(1, "read the proclamation", "the Azamgarh declaration addressed Hindus and Muslims jointly against foreign rule"),
  H.vstep(2, "view the images", "sketches of executions and heroism served each side's memory"),
  H.vstep(3, "close with recasting", "twentieth-century nationalists named 1857 the first war of independence")]),
 H.concept("lehs.302.5", "From Outbreak to Proclamation", "1857 to 1858",
  "The revolt began on 10 May 1857 at Meerut and crown rule was proclaimed "
  "through the Government of India Act of 1858; the interval between the two "
  "years measures how quickly the raj rebuilt itself after the crisis.",
  "proclamation_lag = act_year - outbreak_year",
  "Subtracting the outbreak year from the act year gives the lag in years.",
  "lehs302.txt 10 May 1857 outbreak and 1858 Government of India Act",
  ["compute the years between outbreak and crown rule",
   "state the outbreak date of the revolt",
   "when did the Government of India Act pass",
   "what does the short lag suggest about British recovery",
   "sequence Meerut, Delhi and the 1858 act",
   "why did the crown replace the company"],
  "compute",
  [H.cstep(1, "record the years", "outbreak 1857, act 1858", "outbreak_year = 1857"),
   H.cstep(2, "subtract", "1858 - 1857 = one year to crown rule", "proclamation_lag = act_year - outbreak_year")]),
]
W = [H.we("we_lehs302_1", "lehs302.txt 1857-1858 dates", "lehs.302.5",
  "The revolt broke out on 10 May 1857 and the Government of India Act passed "
  "in 1858. Compute the interval in years.",
  {"outbreak_year": 1857, "act_year": 1858},
  [H.cstep(1, "record the years", "outbreak 1857; act 1858", "outbreak_year = 1857"),
   H.cstep(2, "subtract", "1858 - 1857 = 1 year", "proclamation_lag = act_year - outbreak_year")]),
 H.we("we_lehs302_2", "lehs302.txt rumours section", "lehs.302.2",
  "Interpret the cartridge rumour as historical evidence.",
  {},
  [H.vstep(1, "content", "sepoys believed greased cartridges defiled caste and religion"),
   H.vstep(2, "meaning", "the rumour expressed real fear of forced conversion and cultural assault"),
   H.vstep(3, "conclusion", "rumour shows collective anxiety, whatever the fact")],
  qtype="short_answer"),
 H.we("we_lehs302_3", "lehs302.txt unity section", "lehs.302.4",
  "What vision of unity did rebel proclamations offer?",
  {},
  [H.vstep(1, "joint appeal", "proclamations addressed Hindus and Muslims as one people"),
   H.vstep(2, "common enemy", "the foreign ruler, not each other, was named the enemy"),
   H.vstep(3, "conclusion", "the vision was communal harmony against colonial rule")],
  qtype="short_answer")]
E = [H.ex("ex_lehs302_1", "lehs302.txt end-of-chapter exercises, reworded",
          ["narrate the outbreak and spread of the 1857 revolt",
           "explain rumours and prophecies as evidence of fears",
           "describe British repression and the 1858 act",
           "compute the interval from outbreak to crown rule",
           "discuss images and memory of the revolt"]),
     H.ex("ex_lehs302_2", "lehs302.txt project questions, reworded",
          ["argue whether 1857 was a mutiny or a popular rebellion",
           "compare leaders' aims at different rebel centres",
           "assess Awadh's role in the uprising",
           "relate the Queen's proclamation to later policy",
           "use visual sources critically for revolt history"])]
H.emit("lehs302", H.make_cat("lehs302", "The Meerut Mutiny of 1857", C, W, E))

# ---------------- lehs303: Mahatma Gandhi and the Nationalist Movement ---------------- #
C = [
 H.concept("lehs.303.1", "Gandhi's Return and Satyagraha", "A Leader Announces Himself",
  "Mohandas Karamchand Gandhi returned to India from South Africa in 1915 and "
  "tested satyagraha - truth-force through non-violent mass resistance - in "
  "local struggles like Champaran and Ahmedabad, building a novel method of "
  "moral-political combat.",
  "",
  "Satyagraha made discipline, not violence, the weapon: suffering rather "
  "than inflicting suffering moved the opponent.",
  "lehs303.txt Gandhi's 1915 return and early local satyagrahas",
  ["when did Gandhi return to India and from where",
   "define satyagraha as Gandhi practised it",
   "describe the Champaran and Ahmedabad struggles",
   "why did Gandhi begin with local movements",
   "how did satyagraha differ from armed resistance",
   "relate Gandhi's South African experience to Indian methods"],
  "verify_property",
  [H.vstep(1, "date the return", "Gandhi came back in 1915 after two decades in South Africa"),
  H.vstep(2, "learn the method", "satyagraha paired non-violence with mass discipline and moral appeal"),
  H.vstep(3, "close with locals", "Champaran indigo and Ahmedabad mill struggles proved the method locally first")]),
 H.concept("lehs.303.2", "Rowlatt Satyagraha to Non-Cooperation",
  "The Making and Unmaking of Non-cooperation",
  "The Rowlatt Act of 1919 triggered the first nationwide satyagraha, "
  "Jallianwala Bagh's massacre deepened anger, and the Non-Cooperation "
  "Movement of 1921-22 combined with Khilafat sentiments until Gandhi called "
  "it off after Chauri Chaura's violence. The span of Gandhian mass movements "
  "is measured by subtracting the Rowlatt year from the Quit India year.",
  "",
  "Between Rowlatt satyagraha (1919) and the Quit India call (1942) lie "
  "twenty-three years of cycles between mass movement and negotiation.",
  "lehs303.txt Rowlatt act, Jallianwala, non-cooperation and Chauri Chaura sections",
  ["why did Gandhi launch the Rowlatt satyagraha",
   "what happened at Jallianwala Bagh and its impact",
   "explain the non-cooperation programme's main planks",
   "why did Gandhi withdraw the movement at Chauri Chaura",
   "relate the Khilafat issue to Hindu-Muslim unity",
   "compute the span from Rowlatt to Quit India"],
  "compute",
  [H.cstep(1, "record the two years", "Rowlatt satyagraha 1919, Quit India 1942", "rowlatt_year = 1919"),
   H.cstep(2, "subtract", "1942 - 1919 = 23 years", "movement_span = quit_india_year - rowlatt_year")]),
 H.concept("lehs.303.3", "Civil Disobedience and the Salt March",
  "Civil Disobedience and Beyond",
  "In 1930 Gandhi broke the salt law at Dandi, turning a pinch of salt into a "
  "nationwide civil disobedience movement that drew women, peasants and "
  "students; the movement paused for the Gandhi-Irwin pact, resumed, and was "
  "finally called off in 1934.",
  "",
  "Salt symbolised shared deprivation: breaking its law needed no property, "
  "only courage, so the poorest could join.",
  "lehs303.txt salt march, Dandi, participation and Gandhi-Irwin pact sections",
  ["why was salt chosen as the symbol of protest",
   "describe the Dandi march and the breaking of the salt law",
   "which social groups joined civil disobedience and how",
   "state the terms of the Gandhi-Irwin pact",
   "compare civil disobedience with non-cooperation",
   "discuss limits of the movement among dalits and Muslims"],
  "verify_property",
  [H.vstep(1, "march to Dandi", "Gandhi walked to the coast and lifted natural salt in 1930"),
  H.vstep(2, "spread the breach", "salt law breaking spread to every province with women in front ranks"),
  H.vstep(3, "close with pact", "the Gandhi-Irwin agreement paused, then the movement resumed and closed by 1934")]),
 H.concept("lehs.303.4", "Quit India, Limits and Legacy", "Quit India",
  "The Quit India movement of August 1942 demanded immediate British exit and "
  "saw the arrest of leaders with widespread underground and popular action; "
  "the chapter also weighs the movement's limits - dalit and Muslim "
  "circumspection and rival visions like Subhas Bose's armed struggle - "
  "before the 1947 transfer of power.",
  "",
  "Quit India was the last Gandhian mass upsurge: its suppression and the "
  "war's end reshaped the road to independence.",
  "lehs303.txt Quit India movement, limits and 1947 transfer sections",
  ["state the slogan and timing of the Quit India movement",
   "how did the government respond to Quit India",
   "what were the movement's limits among dalits and Muslims",
   "compare Subhas Bose's path with Gandhian satyagraha",
   "describe Gandhi's last years and assassination in 1948",
   "relate Quit India to the 1947 transfer of power"],
  "verify_property",
  [H.vstep(1, "date the call", "Quit India was launched in August 1942"),
  H.vstep(2, "note the suppression", "leaders were jailed and the movement ran underground"),
  H.vstep(3, "close with limits", "dalit and Muslim hesitations exposed the movement's social boundaries")]),
]
W = [H.we("we_lehs303_1", "lehs303.txt Rowlatt and Quit India dates", "lehs.303.2",
  "Compute the span of years from the Rowlatt satyagraha (1919) to the Quit "
  "India movement (1942).",
  {"rowlatt_year": 1919, "quit_india_year": 1942},
  [H.cstep(1, "record the years", "1919 and 1942", "rowlatt_year = 1919"),
   H.cstep(2, "subtract", "1942 - 1919 = 23 years", "movement_span = quit_india_year - rowlatt_year")]),
 H.we("we_lehs303_2", "lehs303.txt salt march section", "lehs.303.3",
  "Why did Gandhi choose salt as the target of civil disobedience?",
  {},
  [H.vstep(1, "universal item", "salt was used by every household, rich or poor"),
   H.vstep(2, "open breach", "anyone could make salt and break the law non-violently"),
   H.vstep(3, "conclusion", "the symbol turned a tax grievance into mass participation")],
  qtype="short_answer"),
 H.we("we_lehs303_3", "lehs303.txt limits section", "lehs.303.4",
  "Identify two limits of the Gandhian mass movements.",
  {},
  [H.vstep(1, "dalit hesitations", "many dalit leaders sought separate political guarantees"),
   H.vstep(2, "Muslim distance", "large sections of Muslims stayed apart after the mid-1920s"),
   H.vstep(3, "conclusion", "mass movements advanced freedom while exposing unresolved social divisions")],
  qtype="short_answer")]
E = [H.ex("ex_lehs303_1", "lehs303.txt end-of-chapter exercises, reworded",
          ["describe Gandhi's early satyagrahas after 1915",
           "trace the movement from Rowlatt to Quit India",
           "compute the span between Rowlatt and Quit India",
           "explain the salt satyagraha's design and spread",
           "evaluate the limits of Gandhian mobilisation"]),
     H.ex("ex_lehs303_2", "lehs303.txt project questions, reworded",
          ["use contemporary accounts to study the salt march",
           "compare Bose and Gandhi as strategists of freedom",
           "relate the Khilafat question to nationalist politics",
           "assess women's participation across movements",
           "argue why 1942 mattered to the 1947 transfer"])]
H.emit("lehs303", H.make_cat("lehs303", "Mahatma Gandhi and the Nationalist Movement", C, W, E))

# ---------------- lehs304: Framing the Constitution ---------------- #
C = [
 H.concept("lehs.304.1", "The Constituent Assembly", "Framing the Constitution",
  "The Constituent Assembly, indirectly elected under the 1946 cabinet mission "
  "plan, held its first meeting in December 1946, worked through committees "
  "and drafts, and adopted the Constitution on 26 November 1949, a framing "
  "effort of about three years amid partition and refugee crisis.",
  "",
  "Partition shadowed every debate: the assembly wrote a constitution for a "
  "country bleeding at its borders. Subtracting the first meeting year from "
  "the adoption year gives the framing span in years.",
  "lehs304.txt assembly composition, December 1946 meeting and 1949 adoption",
  ["when did the Constituent Assembly first meet",
   "when was the Constitution adopted",
   "compute the framing span between meeting and adoption",
   "how were assembly members chosen",
   "what difficulties of partition affected the assembly",
   "name key figures of the drafting committee"],
  "compute",
  [H.cstep(1, "record the years", "first meeting 1946, adoption 1949", "first_meeting_year = 1946"),
   H.cstep(2, "subtract", "1949 - 1946 = three years of framing", "framing_span = adoption_year - first_meeting_year")]),
 H.concept("lehs.304.2", "Objectives Resolution and Rights", "Objectives Resolution",
  "Nehru's Objectives Resolution of December 1946 promised justice, equality "
  "and freedom, and suffrage to all adults; the assembly debated fundamental "
  "rights, minority protections and the place of the state vis-a-vis religion, "
  "embedding rights in the constitution's core.",
  "",
  "The resolution was the constitution's moral preamble, later mirrored in "
  "the preamble's keywords.",
  "lehs304.txt Objectives Resolution and fundamental rights debates",
  ["state the promises of the Objectives Resolution",
   "when did Nehru move the resolution",
   "which rights became fundamental rights in the constitution",
   "how did the assembly protect minorities",
   "relate the resolution to the preamble",
   "debate the limits of rights during partition"],
  "verify_property",
  [H.vstep(1, "quote the pledge", "justice social, economic and political; equality of status and opportunity"),
  H.vstep(2, "link to preamble", "the adopted preamble echoes the resolution's vocabulary"),
  H.vstep(3, "close with rights", "fundamental rights constitutionalised the freedom struggle's promises")]),
 H.concept("lehs.304.3", "Debates: Language, Federalism, Electorate",
  "The Dominant Voices and the Debates",
  "Assembly debates weighed a centralising state against provincial demands, "
  "Hindi against regional languages, and separate electorates against common "
  "citizenship; the majority chose strong central power, Hindi as official "
  "language with transitional English, and reserved seats without separate "
  "electorates for depressed classes.",
  "",
  "Every choice traded unity against diversity, and the final text balanced "
  "them through federal checks and temporary provisions.",
  "lehs304.txt language, centre-state power and electorate debates",
  ["summarise the language debate and its settlement",
   "why did the assembly strengthen central power",
   "what was decided on separate electorates for depressed classes",
   "state Ambedkar's role and arguments in the debates",
   "compare critical and consensus voices in the assembly",
   "relate partition to the federal design"],
  "verify_property",
  [H.vstep(1, "follow the language row", "Hindi became official language with English allowed transitionally"),
  H.vstep(2, "centre the state", "partition anxiety pushed the draft toward strong central emergency powers"),
  H.vstep(3, "close with reservation", "reserved seats replaced separate electorates for depressed classes")]),
 H.concept("lehs.304.4", "The Constitution's Vision", "The Vision of the Constitution",
  "The constitution's vision combined a strong state to correct social "
  "wrongs, universal adult franchise in a poor society, and social "
  "revolution through law - banning untouchability, promising land reform - "
  "while accommodating diversity through federal forms.",
  "",
  "Adult franchise was the boldest experiment: a largely illiterate nation "
  "was trusted to elect its rulers at once.",
  "lehs304.txt franchise, social revolution and strong state themes",
  ["describe the vision of universal adult franchise",
   "how does the constitution seek social revolution",
   "why did the assembly prefer a strong central state",
   "identify provisions against untouchability",
   "relate the freedom movement's promises to the text",
   "assess the constitution's accommodative design"],
  "verify_property",
  [H.vstep(1, "trust the voter", "universal franchise extended power to every adult without property tests"),
  H.vstep(2, "law as reform", "untouchability's abolition aimed at social revolution by statute"),
  H.vstep(3, "close with balance", "federal forms carried diversity while the centre held unity")]),
]
W = [H.we("we_lehs304_1", "lehs304.txt 1946-1949 dates", "lehs.304.1",
  "The Constituent Assembly first met in 1946 and adopted the Constitution in "
  "1949. Compute the framing span.",
  {"first_meeting_year": 1946, "adoption_year": 1949},
  [H.cstep(1, "record the years", "1946 meeting, 1949 adoption", "first_meeting_year = 1946"),
   H.cstep(2, "subtract", "1949 - 1946 = 3 years", "framing_span = adoption_year - first_meeting_year")]),
 H.we("we_lehs304_2", "lehs304.txt Objectives Resolution", "lehs.304.2",
  "List three promises of the Objectives Resolution echoed in the preamble.",
  {},
  [H.vstep(1, "justice", "social, economic and political justice for all"),
   H.vstep(2, "equality", "equality of status and opportunity"),
   H.vstep(3, "freedom", "freedom of thought, expression, belief, faith and worship")],
  qtype="short_answer"),
 H.we("we_lehs304_3", "lehs304.txt franchise section", "lehs.304.4",
  "Why was universal adult franchise called an experiment?",
  {},
  [H.vstep(1, "scale", "hundreds of millions of new voters, mostly poor and unschooled"),
   H.vstep(2, "precedent", "no post-colonial society had tried full franchise at once"),
   H.vstep(3, "conclusion", "the assembly gambled that democratic trust would build the nation")],
  qtype="short_answer")]
E = [H.ex("ex_lehs304_1", "lehs304.txt end-of-chapter exercises, reworded",
          ["describe the composition and working of the Constituent Assembly",
           "compute the framing span from first meeting to adoption",
           "explain the Objectives Resolution and its legacy",
           "summarise the language and electorate debates",
           "discuss the constitution's vision of social revolution"]),
     H.ex("ex_lehs304_2", "lehs304.txt project questions, reworded",
          ["use assembly debates to trace the federal design",
           "evaluate Ambedkar's defence of the draft constitution",
           "relate partition events to constitutional choices",
           "compare the preamble with the Objectives Resolution",
           "assess adult franchise as a democratic experiment"])]
H.emit("lehs304", H.make_cat("lehs304", "Framing the Constitution", C, W, E))

# ---------------- leps101: The End of Bipolarity ---------------- #
C = [
 H.concept("leps.101.1", "Soviet System and Its Collapse", "The Soviet System",
  "The Soviet system, built after the 1917 Bolshevik revolution, concentrated "
  "economic and political power in the communist party and a centrally "
  "planned economy; by the 1980s stagnation, shortages and the arms burden "
  "with the USA had weakened it, and Gorbachev's reforms of glasnost and "
  "perestroika accelerated rather than saved the system.",
  "",
  "Reform exposed the rot: once censorship and central control loosened, "
  "republics and nationalities moved for independence.",
  "leps101.txt soviet system, stagnation and Gorbachev reforms sections",
  ["describe the features of the Soviet political-economic system",
   "why did the Soviet economy stagnate by the 1980s",
   "state the meaning of glasnost and perestroika",
   "how did Gorbachev's reforms speed the collapse",
   "which events of 1991 ended the Soviet Union",
   "evaluate internal versus external causes of the collapse"],
  "verify_property",
  [H.vstep(1, "name the system", "one-party rule and central planning defined the Soviet model from 1917"),
  H.vstep(2, "diagnose the crisis", "consumer shortages, technological lag and the arms race drained the economy"),
  H.vstep(3, "close with 1991", "the failed coup and the republics' exits dissolved the union in 1991")]),
 H.concept("leps.101.2", "Berlin Wall's Fall and Bipolarity's End",
  "End of Bipolarity",
  "The Berlin Wall, built at the height of the Cold War as its greatest "
  "symbol, was toppled by the people in 1989; two years later the Soviet "
  "Union itself dissolved, so the wall's fall and the union's end are separated "
  "by the difference of 1991 and 1989.",
  "wall_to_end = ussr_end_year - wall_year",
  "Subtracting the wall's fall year from the Soviet end year gives the gap in "
  "years between the two events.",
  "leps101.txt Berlin Wall 1989 passage and 1991 Soviet dissolution",
  ["when was the Berlin Wall toppled",
   "when did the Soviet Union dissolve",
   "compute the gap between the wall's fall and the union's end",
   "why was the wall the Cold War's symbol",
   "sequence the events from 1989 to 1991",
   "what replaced the bipolar world order"],
  "compute",
  [H.cstep(1, "record the two years", "wall fell 1989; union dissolved 1991", "wall_year = 1989"),
   H.cstep(2, "subtract", "1991 - 1989 = two years between the events", "wall_to_end = ussr_end_year - wall_year")]),
 H.concept("leps.101.3", "Shock Therapy and Its Consequences",
  "Shock Therapy in Post-communist Regimes",
  "Post-communist states adopted shock therapy - abrupt transition to "
  "capitalism under Washington consensus prescriptions: privatisation of "
  "assets, free trade, currency convertibility; the therapy produced deep "
  "initial contraction, oligarchic capture of privatised assets and social "
  "distress, with uneven recovery across states.",
  "",
  "Speed was the therapy and the disease: overnight privatisation handed "
  "state assets to insiders while safety nets vanished.",
  "leps101.txt shock therapy features and consequences sections",
  ["define shock therapy and the Washington consensus",
   "list the three features of shock therapy",
   "state the social costs of rapid transition",
   "how did privatisation create oligarchs in Russia",
   "compare recovery across former Soviet states",
   "why did some economists question shock therapy"],
  "verify_property",
  [H.vstep(1, "list the package", "privatisation, free trade and convertibility arrived together and fast"),
  H.vstep(2, "measure the pain", "output fell, inflation soared and welfare systems collapsed in the early 1990s"),
  H.vstep(3, "close with capture", "insider privatisation built the Russian oligarchy")]),
 H.concept("leps.101.4", "India and Post-communist States", "India and Post-communist Countries",
  "India maintained long friendship with the Soviet Union - defence supplies, "
  "diplomatic support and trade - and after 1991 rebuilt ties with Russia and "
  "the new republics through energy, defence partnership and connectivity "
  "initiatives like the International North-South corridor.",
  "",
  "The end of bipolarity did not end the partnership: India and Russia "
  "re-tooled an old friendship for a multipolar market age.",
  "leps101.txt India-Soviet relations and post-1991 ties sections",
  ["describe India-Soviet ties before 1991",
   "what sustains India-Russia relations after the collapse",
   "name India's connectivity initiatives with the region",
   "how did the end of bipolarity affect Indian foreign policy",
   "state India's stakes in Central Asian energy and security",
   "evaluate the multipolarity argument for India"],
  "verify_property",
  [H.vstep(1, "recall the friendship", "Soviet vetoes and defence supplies anchored Cold War ties"),
  H.vstep(2, "note the rebuild", "energy, defence and transport corridors renewed the partnership"),
  H.vstep(3, "close with strategy", "multipolarity lets India diversify while keeping old friends")]),
]
W = [H.we("we_leps101_1", "leps101.txt 1989 and 1991 dates", "leps.101.2",
  "The Berlin Wall fell in 1989 and the Soviet Union dissolved in 1991. "
  "Compute the gap between the two events in years.",
  {"wall_year": 1989, "ussr_end_year": 1991},
  [H.cstep(1, "record the years", "1989 and 1991", "wall_year = 1989"),
   H.cstep(2, "subtract", "1991 - 1989 = 2 years", "wall_to_end = ussr_end_year - wall_year")]),
 H.we("we_leps101_2", "leps101.txt shock therapy section", "leps.101.3",
  "State the three components of shock therapy and one consequence each.",
  {},
  [H.vstep(1, "privatisation", "state assets sold off fast, later captured by oligarchs"),
   H.vstep(2, "free trade", "sudden openness crushed uncompetitive local industry"),
   H.vstep(3, "convertibility", "the ruble's float unleashed inflation hurting households")],
  qtype="short_answer"),
 H.we("we_leps101_3", "leps101.txt India ties section", "leps.101.4",
  "Give two continuities in India-Russia relations after 1991.",
  {},
  [H.vstep(1, "defence partnership", "Russia remained India's leading arms supplier"),
   H.vstep(2, "diplomatic alignment", "both backed multipolarity and each other in global forums"),
   H.vstep(3, "conclusion", "institutions of friendship adapted rather than ended")],
  qtype="short_answer")]
E = [H.ex("ex_leps101_1", "leps101.txt end-of-chapter exercises, reworded",
          ["explain the features and weaknesses of the Soviet system",
           "compute the gap between the Berlin Wall's fall and the USSR's end",
           "evaluate shock therapy and its social costs",
           "describe Gorbachev's reforms and their unintended results",
           "discuss India's relations with post-communist states"]),
     H.ex("ex_leps101_2", "leps101.txt applied questions, reworded",
          ["argue internal versus external causes of Soviet collapse",
           "map the new republics and their resources",
           "relate the Washington consensus to transition outcomes",
           "assess multipolarity's benefits for India",
           "compare Cold War and post-Cold War security orders"])]
H.emit("leps101", H.make_cat("leps101", "The End of Bipolarity", C, W, E))

# ---------------- leps102: Alternative Centres of Power ---------------- #
C = [
 H.concept("leps.102.1", "The European Union", "The European Union",
  "The European Union evolved from post-war economic cooperation through the "
  "1957 Treaty of Rome into a political-economic union with a common currency, "
  "common foreign and security policy and member-driven institutions; the EU "
  "is the world's largest economy bloc challenges of integration remain.",
  "",
  "The EU integrates by economics first and politics second, pooling "
  "sovereignty in trade and currency while nations keep armies.",
  "leps102.txt EU evolution, institutions and currency sections",
  ["trace the EU's evolution from the Treaty of Rome",
   "name the EU's key institutions and roles",
   "what is the euro and when did it circulate",
   "state the EU's economic and military strengths",
   "discuss limits of EU integration",
   "compare the EU's soft power with US hard power"],
  "verify_property",
  [H.vstep(1, "start at Rome", "the 1957 treaty created the EEC that grew into the EU"),
  H.vstep(2, "pool the money", "the euro replaced national currencies across most members"),
  H.vstep(3, "close with limits", "defence and foreign policy remain largely national choices")]),
 H.concept("leps.102.2", "ASEAN's Way", "The Association of South East Asian Nations",
  "ASEAN, founded in 1967, built regional cooperation through the 'ASEAN "
  "way' - consensus, non-interference and informality - creating an ASEAN "
  "Free Trade Area and security dialogues like the ASEAN Regional Forum "
  "without supranational institutions.",
  "",
  "The ASEAN way trades speed for comfort: no member is forced, so all "
  "members stay at the table.",
  "leps102.txt ASEAN founding, ASEAN way and FTA sections",
  ["when was ASEAN founded and by which states",
   "describe the ASEAN way of cooperation",
   "what is the ASEAN Free Trade Area",
   "state the role of the ASEAN Regional Forum",
   "compare ASEAN's and EU's integration models",
   "assess ASEAN's economic and strategic significance"],
  "verify_property",
  [H.vstep(1, "date the founding", "ASEAN formed in 1967 by five Southeast Asian states"),
  H.vstep(2, "read the way", "consensus and non-interference govern decision-making"),
  H.vstep(3, "close with the forum", "the ARF extends ASEAN's convening power to bigger powers")]),
 H.concept("leps.102.3", "China's Rise", "China",
  "China's rise rests on the 1978 economic reforms that opened the economy to "
  "foreign investment and markets while keeping party control, producing "
  "decades of double-digit growth, the world's largest populated military "
  "modernisation and global economic weight; integration with the world "
  "economy through WTO entry deepened its rise.",
  "",
  "Reform without democratisation created a distinctive model: markets in "
  "goods, party control in politics.",
  "leps102.txt 1978 reforms, growth and WTO entry sections",
  ["what changed in China after the 1978 reforms",
   "compute the years between the PRC's founding and the reforms",
   "state the pillars of China's economic rise",
   "how did WTO entry affect China's economy",
   "discuss the China model's political features",
   "evaluate China as an alternative centre of power"],
  "verify_property",
  [H.vstep(1, "date the turning point", "Deng's reforms launched in 1978 after the PRC's 1949 founding"),
  H.vstep(2, "measure the growth", "special economic zones and exports industrialised the coast"),
  H.vstep(3, "close with leverage", "trade surpluses and reserves converted into global influence")]),
 H.concept("leps.102.4", "Japan and Emerging Centres", "Japan and Korea",
  "Japan rebuilt as an economic power after 1945 under the US security "
  "umbrella, leading in technology and aid despite constitutional limits on "
  "military role; South Korea and other Asian economies followed export-led "
  "models, adding further centres to a diversifying world economy.",
  "",
  "Economic power without matching military power defined Japan's post-war "
  "international personality.",
  "leps102.txt Japan's rise, constitution limits and Korea sections",
  ["describe Japan's post-war economic rise",
   "how does the constitution limit Japan's military",
   "state South Korea's development model",
   "compare Japan's and China's paths to power",
   "relate US alliances to East Asian economics",
   "assess the shift from G7 to G20 in world governance"],
  "verify_property",
  [H.vstep(1, "rebuild the economy", "post-1945 Japan industrialised under US protection"),
  H.vstep(2, "note the clause", "the peace constitution constrained overseas military action"),
  H.vstep(3, "close with followers", "Korea and ASEAN economies replicated export-led growth")]),
]
W = [H.we("we_leps102_1", "leps102.txt China dates", "leps.102.3",
  "The People's Republic of China was founded in 1949 and the economic "
  "reforms began in 1978. Compute the years between the founding and the "
  "reforms.",
  {"founding_year": 1949, "reform_year": 1978},
  [H.cstep(1, "record the years", "1949 founding, 1978 reforms", "founding_year = 1949"),
   H.cstep(2, "subtract", "1978 - 1949 = 29 years", "reform_gap = reform_year - founding_year")]),
 H.we("we_leps102_2", "leps102.txt ASEAN section", "leps.102.2",
  "Explain the ASEAN way with two of its principles.",
  {},
  [H.vstep(1, "consensus", "decisions require agreement rather than votes"),
   H.vstep(2, "non-interference", "members avoid criticising internal affairs of others"),
   H.vstep(3, "conclusion", "informality kept all members engaged despite differences")],
  qtype="short_answer"),
 H.we("we_leps102_3", "leps102.txt EU section", "leps.102.1",
  "Identify two areas where the EU pools sovereignty and one where it does not.",
  {},
  [H.vstep(1, "pooled areas", "trade policy and currency are managed at EU level"),
   H.vstep(2, "unpooled area", "armies and defence remain national"),
   H.vstep(3, "conclusion", "economic integration outpaced political integration")],
  qtype="short_answer")]
E = [H.ex("ex_leps102_1", "leps102.txt end-of-chapter exercises, reworded",
          ["trace the European Union's evolution and institutions",
           "describe ASEAN's founding and the ASEAN way",
           "compute the gap between the PRC's founding and 1978 reforms",
           "evaluate China's rise as an alternative power centre",
           "compare EU and ASEAN as regional organisations"]),
     H.ex("ex_leps102_2", "leps102.txt applied questions, reworded",
          ["argue whether the EU can balance US power",
           "assess China's model for developing countries",
           "relate Japan's constitution to its foreign policy",
           "map ASEAN's strategic importance to India",
           "discuss multipolarity's institutions beyond the UN"])]
H.emit("leps102", H.make_cat("leps102", "Alternative Centres of Power", C, W, E))

# ---------------- leps103: Contemporary South Asia ---------------- #
C = [
 H.concept("leps.103.1", "South Asia: Geography and States", "The Military and Administration in Pakistan",
  "South Asia comprises eight states - India, Pakistan, Bangladesh, Nepal, "
  "Bhutan, Sri Lanka, Maldives and Afghanistan - with enormous demographic "
  "weight in India and varied political systems from stable democracies to "
  "military rules and monarchies.",
  "",
  "One region, many regimes: the subcontinent's states differ in size, "
  "systems and stability, which shapes every bilateral tie.",
  "leps103.txt South Asia definition, states and regime variety sections",
  ["name the eight states of South Asia",
   "contrast the political systems of the region's states",
   "why is India called the region's demographic centre",
   "state the share of South Asians living in India",
   "compare Nepal's and Bhutan's political evolution",
   "locate Afghanistan in South Asian politics"],
  "verify_property",
  [H.vstep(1, "count the states", "eight South Asian states are listed with their systems"),
  H.vstep(2, "weigh India", "India holds the region's largest population and economy"),
  H.vstep(3, "close with regimes", "democracies, monarchies and military rules coexist in the region")]),
 H.concept("leps.103.2", "Pakistan, Bangladesh and Nepal's Politics",
  "Conflict and Cooperation",
  "Pakistan alternated civilian and military rule with the army dominating "
  "security policy; Bangladesh born in 1971 through liberation war oscillated "
  "between civilian rule and military interventions; Nepal moved from monarchy "
  "to constitutional democracy through popular movements and a republican "
  "constitution.",
  "",
  "Each state's civil-military balance decides its democracy's depth, and "
  "1971 redrew the region's map and politics.",
  "leps103.txt Pakistan military rule, Bangladesh 1971 and Nepal democracy sections",
  ["describe the army's role in Pakistan's politics",
   "how was Bangladesh created in 1971",
   "trace Nepal's move from monarchy to republic",
   "compare Sri Lanka's ethnic conflict with its democracy",
   "state Bhutan's democratic transition",
   "relate constitutions to regime stability in the region"],
  "verify_property",
  [H.vstep(1, "follow Pakistan's coups", "military interventions repeatedly displaced civilian governments"),
  H.vstep(2, "date Bangladesh", "the 1971 liberation war created the new state"),
  H.vstep(3, "close with Nepal", "popular movements converted monarchy into republic")]),
 H.concept("leps.103.3", "India-Pakistan and Sri Lankan Conflicts",
  "India and its Other Neighbours",
  "India-Pakistan conflict centres on Kashmir, wars of 1947-48, 1965 and 1971 "
  "and nuclearisation after the 1998 tests; India-Sri Lanka relations involve "
  "the Tamil question and Indian intervention, while China's rise shapes "
  "strategic calculations across the region.",
  "",
  "Nuclear tests of 1998 made the subcontinent's central conflict more "
  "dangerous and more stable at once - deterrence with brinkmanship.",
  "leps103.txt Kashmir wars, 1998 tests and Sri Lanka sections",
  ["outline the Kashmir dispute's origins and course",
   "name the India-Pakistan wars and their outcomes",
   "when did India and Pakistan test nuclear devices",
   "describe India's role in Sri Lanka's ethnic conflict",
   "how does China influence South Asian strategic politics",
   "evaluate confidence-building between India and Pakistan"],
  "verify_property",
  [H.vstep(1, "list the wars", "conflicts of 1947-48, 1965 and 1971 frame the rivalry"),
  H.vstep(2, "date the tests", "both states tested nuclear devices in 1998"),
  H.vstep(3, "close with Lanka", "India's peace-keeping involvement coloured Tamil-Sinhala politics")]),
 H.concept("leps.103.4", "Cooperation: SAARC and Regional Peace",
  "Cooperation and Conflict: SAARC",
  "South Asian cooperation runs through SAARC, founded in 1985 for collective "
  "self-reliance, and through trade and cultural exchanges; bilateral disputes, "
  "especially India-Pakistan, limit integration despite shared histories and "
  "democratisation trends across the region.",
  "",
  "SAARC shows both promise and paralysis: agreements exist, but the "
  "India-Pakistan freeze caps regional integration.",
  "leps103.txt SAARC founding, programmes and limits sections",
  ["when and why was SAARC founded",
   "name SAARC's areas of cooperation",
   "what limits SAARC's effectiveness",
   "how does democratisation affect regional cooperation",
   "compare SAARC with ASEAN's integration",
   "suggest measures to deepen South Asian trade"],
  "verify_property",
  [H.vstep(1, "date the association", "SAARC formed in 1985 to promote regional welfare"),
  H.vstep(2, "note the cap", "India-Pakistan tension blocks summits and protocols"),
  H.vstep(3, "close with hope", "shared culture and democratisation keep cooperation alive")]),
]
W = [H.we("we_leps103_1", "leps103.txt wars and nuclear dates", "leps.103.3",
  "India and Pakistan became declared nuclear powers in 1998, twenty-one "
  "years after the 1971 war. Verify the interval from independence in 1947 to "
  "the nuclear tests.",
  {"independence_year": 1947, "test_year": 1998},
  [H.cstep(1, "record the years", "independence 1947, tests 1998", "independence_year = 1947"),
   H.cstep(2, "subtract", "1998 - 1947 = 51 years", "test_lag = test_year - independence_year")]),
 H.we("we_leps103_2", "leps103.txt Pakistan section", "leps.103.2",
  "Give two reasons for the army's dominance in Pakistan.",
  {},
  [H.vstep(1, "security priority", "conflict with India kept defence at the centre of the state"),
   H.vstep(2, "weak civilian institutions", "frequent political instability invited military interventions"),
   H.vstep(3, "conclusion", "external threat plus internal weakness sustained army rule")],
  qtype="short_answer"),
 H.we("we_leps103_3", "leps103.txt SAARC section", "leps.103.4",
  "State two achievements and two limits of SAARC.",
  {},
  [H.vstep(1, "achievements", "a regional framework and social sector agreements were built"),
   H.vstep(2, "limits", "bilateral disputes stall summits; trade stays far below potential"),
   H.vstep(3, "conclusion", "SAARC mirrors the region's politics: much promise, capped by rivalry")],
  qtype="short_answer")]
E = [H.ex("ex_leps103_1", "leps103.txt end-of-chapter exercises, reworded",
          ["name and describe the political systems of South Asian states",
           "trace India-Pakistan conflicts including the 1998 nuclear tests",
           "compute years from independence to the nuclear tests",
           "explain Bangladesh's creation and Nepal's transition",
           "evaluate SAARC as an instrument of cooperation"]),
     H.ex("ex_leps103_2", "leps103.txt applied questions, reworded",
          ["argue the effects of democracy on regional peace",
           "compare Sri Lanka's and Nepal's political crises",
           "relate China's role to South Asian rivalries",
           "assess confidence-building measures in South Asia",
           "design a South Asian water cooperation framework"])]
H.emit("leps103", H.make_cat("leps103", "Contemporary South Asia", C, W, E))

# ---------------- leps104: International Organisations ---------------- #
C = [
 H.concept("leps.104.1", "Why International Organisations", "Why International Organisations?",
  "International organisations exist because states need forums to cooperate "
  "on problems no single state can solve - war prevention, development, "
  "health and humanitarian relief - with the UN founded in 1945 after two "
  "world wars to save succeeding generations from the scourge of war.",
  "",
  "An organisation helps with matters of war and peace and helps countries "
  "cooperate to make better living conditions for us all.",
  "leps104.txt rationale for organisations and UN founding 1945 sections",
  ["why do states create international organisations",
   "when and why was the UN founded",
   "name the problems requiring global cooperation",
   "how do organisations help in war and peace matters",
   "distinguish international from global organisations",
   "give examples of UN specialised agencies"],
  "verify_property",
  [H.vstep(1, "state the rationale", "collective problems like war need standing institutions"),
  H.vstep(2, "date the UN", "the UN charter took effect in 1945 after the world wars"),
  H.vstep(3, "close with agencies", "WHO, UNESCO and UNICEF carry specialised cooperation")]),
 H.concept("leps.104.2", "Evolution of the UN and Membership", "Evolution of the UN",
  "The UN began in 1945 with 51 founding members and expanded to 193 members "
  "as decolonisation admitted new states, changing the General Assembly's "
  "majorities and pushing demands to reform the Security Council whose five "
  "permanent members hold vetoes.",
  "membership_growth = current_members - founding_members",
  "The growth of UN membership is the current member count minus the founding "
  "count of 51.",
  "leps104.txt membership growth (51 to 193) and Security Council sections",
  ["how many members did the UN have at founding and now",
   "compute the growth in UN membership",
   "name the five permanent members of the Security Council",
   "what is the veto and why is it contested",
   "how did decolonisation change the UN",
   "state the main UN organs and their functions"],
  "compute",
  [H.cstep(1, "record the counts", "51 founding members, 193 today", "founding_members = 51"),
   H.cstep(2, "subtract founding from current", "the difference is 142 new members", "membership_growth = current_members - founding_members")]),
 H.concept("leps.104.3", "Reform of the UN", "Reform of the UN",
  "Reform debates cover two tracks: procedures and relevance - making the "
  "Security Council more representative and reworking mandates - with India "
  "arguing for permanent membership on grounds of population, democracy, "
  "economy and peacekeeping record, while rivals propose alternatives like "
  "longer-term seats.",
  "",
  "Everyone wants a reformed Council; no one agrees whose seat it should be.",
  "leps104.txt reform criteria and India's case sections",
  ["state the two tracks of UN reform debates",
   "list the criteria argued for permanent membership",
   "present India's case for a permanent seat",
   "name rival candidates and groupings for Council reform",
   "why does the veto obstruct reform",
   "evaluate UN peacekeeping as a reform argument"],
  "verify_property",
  [H.vstep(1, "split the tracks", "one track reworks procedures and priorities, the other the Council's composition"),
  H.vstep(2, "argue India's case", "population, democracy, economic size and peacekeeping record are India's planks"),
  H.vstep(3, "close with deadlock", "regional rivalries and the veto freeze any expansion")]),
 H.concept("leps.104.4", "India and the UN", "India and the UN",
  "India's UN engagement spans peacekeeping contributions among the largest, "
  "leadership of the Non-Aligned and G77, nuclear debate years, and campaigns "
  "for Council reform; India uses the UN to project multilateralism while "
  "seeking its democratisation.",
  "",
  "For India the UN is both stage and stake: it defends multilateral rules "
  "while asking for a seat at the top table.",
  "leps104.txt India's UN contributions and diplomacy sections",
  ["summarise India's peacekeeping record at the UN",
   "how did India lead NAM and G77 positions",
   "describe India's role in UN debates on disarmament",
   "state India's proposal for Council expansion",
   "evaluate India's multilateral strategy",
   "relate UN reforms to India's great-power ambitions"],
  "verify_property",
  [H.vstep(1, "count the peacekeepers", "India ranks among the largest troop contributors to UN missions"),
  H.vstep(2, "lead the South", "NAM and G77 leadership framed India as the developing world's voice"),
  H.vstep(3, "close with the seat", "Council reform is India's central UN campaign")]),
]
W = [H.we("we_leps104_1", "leps104.txt membership growth", "leps.104.2",
  "The UN was founded with 51 members and now has 193. Compute the growth in "
  "membership.",
  {"founding_members": 51, "current_members": 193},
  [H.cstep(1, "record the counts", "51 at founding, 193 today", "founding_members = 51"),
   H.cstep(2, "subtract", "193 - 51 = 142 new members", "membership_growth = current_members - founding_members")]),
 H.we("we_leps104_2", "leps104.txt India's case section", "leps.104.3",
  "Present India's case for permanent Security Council membership in three "
  "points.",
  {},
  [H.vstep(1, "scale", "one-sixth of humanity and the world's largest democracy"),
   H.vstep(2, "contributions", "among the largest peacekeeping troop contributors since the 1950s"),
   H.vstep(3, "economy", "a leading economy with growing global responsibilities")],
  qtype="short_answer"),
 H.we("we_leps104_3", "leps104.txt veto section", "leps.104.2",
  "Explain the veto and one criticism of it.",
  {},
  [H.vstep(1, "the power", "each permanent member can block any substantive Council resolution"),
   H.vstep(2, "criticism", "the veto lets great powers stall action backed by world majorities"),
   H.vstep(3, "conclusion", "it froze the Council's composition in 1945's power map")],
  qtype="short_answer")]
E = [H.ex("ex_leps104_1", "leps104.txt end-of-chapter exercises, reworded",
          ["explain why international organisations are needed",
           "compute the UN's membership growth since 1945",
           "state the permanent members and the veto power",
           "present the case for UN Security Council reform",
           "describe India's contributions to the United Nations"]),
     H.ex("ex_leps104_2", "leps104.txt applied questions, reworded",
          ["argue for and against expanding the Security Council",
           "compare UN peacekeeping's successes and failures",
           "relate decolonisation to the UN's composition",
           "evaluate specialised agencies' roles in development",
           "design criteria for a reformed Council membership"])]
H.emit("leps104", H.make_cat("leps104", "International Organisations", C, W, E))

# ---------------- leps105: Security in the Contemporary World ---------------- #
C = [
 H.concept("leps.105.1", "Traditional Notions of Security", "Traditional Notions: External",
  "Traditional security centres the state and external military threats: "
  "greatest danger is war and violence from other states, and responses run "
  "through balance of power and alliance building, with deterrence and "
  "defense as the chief policy instruments including nuclear deterrence.",
  "",
  "Security here means protecting the state - sovereignty, territory and "
  "population - from foreign military force.",
  "leps105.txt traditional security, balance of power and deterrence sections",
  ["define traditional security and its referent object",
   "what threats does traditional security foreground",
   "explain balance of power and alliance building",
   "define deterrence, defence and security dilemma",
   "describe nuclear deterrence and its logic",
   "compare disarmament, arms control and non-proliferation"],
  "verify_property",
  [H.vstep(1, "fix the referent", "the state with its territory and sovereignty is what is secured"),
  H.vstep(2, "list the instruments", "alliances, balance of power, deterrence and defence are the tools"),
  H.vstep(3, "close with the bomb", "nuclear deterrence rested on mutually assured destruction")]),
 H.concept("leps.105.2", "Non-traditional Notions of Security", "Non-traditional Notions",
  "Non-traditional security widens the referent to people and humanity: "
  "human security covers terrorism, human rights, global poverty and "
  "epidemics; global security addresses climate change, international "
  "terrorism and health epidemics that cross borders and threaten individuals "
  "more than armies do.",
  "",
  "When threats come from germs, warming or terror networks, armies are the "
  "wrong instrument and people, not just states, are the protected.",
  "leps105.txt human security, global poverty, epidemics and climate sections",
  ["define non-traditional security and its referent",
   "name the components of human security",
   "how do epidemics become security threats",
   "explain climate change as a security issue",
   "compare state-centric and people-centric security",
   "relate cooperation to addressing non-traditional threats"],
  "verify_property",
  [H.vstep(1, "widen the lens", "the referent shifts from state territory to human lives"),
  H.vstep(2, "list the threats", "poverty, epidemics, terrorism and climate change cross borders"),
  H.vstep(3, "close with cooperation", "no single state can arrest pandemics or warming alone")]),
 H.concept("leps.105.3", "New Sources: Terrorism and Human Rights",
  "New Sources of Threats",
  "New threats include international terrorism by non-state networks, human "
  "rights abuses within states that the world may judge, and migration "
  "pressures; debates ask when the international community may act inside a "
  "sovereign state for humanitarian protection.",
  "",
  "Terror networks and rights abuses challenge both sovereignty's shield and "
  "the state's monopoly over security talk.",
  "leps105.txt terrorism, human rights and migration threat sections",
  ["define international terrorism as a security threat",
   "how do human rights issues become security concerns",
   "explain the debate over intervention in sovereign states",
   "relate migration to security discussions",
   "compare state and non-state threats",
   "evaluate the responsibility to protect idea"],
  "verify_property",
  [H.vstep(1, "name the actors", "terror networks operate across borders without state flags"),
  H.vstep(2, "raise the rights", "genocide and abuse invite international scrutiny despite sovereignty"),
  H.vstep(3, "close with movement", "migration links conflict, poverty and security debates")]),
 H.concept("leps.105.4", "Cooperative Security and India's Strategy",
  "Cooperative Security",
  "Non-traditional threats demand cooperative security - joint action through "
  "institutions and agreements rather than force; India's security strategy "
  "combines strengthening military capabilities, internal security against "
  "separatism and terrorism, and developing the economy so that no citizen "
  "feels excluded.",
  "",
  "India's three-pillar strategy - strength, internal stability and "
  "development - shows security as capability plus inclusion.",
  "leps105.txt cooperative security and India's three-pillar strategy sections",
  ["define cooperative security with examples",
   "state the three components of India's security strategy",
   "how does development serve security",
   "explain India's nuclear doctrine of no first use",
   "relate internal security to democratic rights",
   "evaluate international cooperation against terrorism"],
  "verify_property",
  [H.vstep(1, "cooperate by design", "treaties, forums and agreements replace unilateral force for shared threats"),
  H.vstep(2, "apply India's pillars", "military strength, internal order and economic growth are the three pillars"),
  H.vstep(3, "close with inclusion", "development closes the grievances that feed insecurity")]),
]
W = [H.we("we_leps105_1", "leps105.txt cold war dates", "leps.105.1",
  "The UN-centred postwar system dates from 1945 and the Cold War order ended "
  "around 1991. Compute the Cold War era's length in years.",
  {"start_year": 1945, "end_year": 1991},
  [H.cstep(1, "record the years", "1945 start, 1991 end", "start_year = 1945"),
   H.cstep(2, "subtract", "1991 - 1945 = 46 years", "cold_war_span = end_year - start_year")]),
 H.we("we_leps105_2", "leps105.txt human security section", "leps.105.2",
  "List three non-traditional threats and explain one's cross-border nature.",
  {},
  [H.vstep(1, "epidemics", "diseases travel with people and goods across borders"),
   H.vstep(2, "climate change", "greenhouse gases warm the planet regardless of source country"),
   H.vstep(3, "terrorism", "networks strike across frontiers without declaring war")],
  qtype="short_answer"),
 H.we("we_leps105_3", "leps105.txt India strategy section", "leps.105.4",
  "Describe India's three-pillar security strategy.",
  {},
  [H.vstep(1, "military pillar", "strengthening capabilities including nuclear deterrence"),
   H.vstep(2, "internal pillar", "countering separatism and terrorism within democratic limits"),
   H.vstep(3, "development pillar", "growth that includes citizens removes insecurity's roots")],
  qtype="short_answer")]
E = [H.ex("ex_leps105_1", "leps105.txt end-of-chapter exercises, reworded",
          ["differentiate traditional and non-traditional security",
           "compute the Cold War era's length from 1945 to 1991",
           "explain deterrence and the security dilemma",
           "describe India's three-pillar security strategy",
           "discuss cooperative security against epidemics"]),
     H.ex("ex_leps105_2", "leps105.txt applied questions, reworded",
          ["argue whether climate change is a security issue",
           "relate human rights to humanitarian intervention",
           "evaluate nuclear deterrence in South Asia",
           "map international counter-terrorism cooperation",
           "connect poverty reduction to national security"])]
H.emit("leps105", H.make_cat("leps105", "Security in the Contemporary World", C, W, E))

# ---------------- leps106: Environment and Natural Resources ---------------- #
C = [
 H.concept("leps.106.1", "Environment as a Political Question",
  "Environmental Concerns in Global Politics",
  "Environmental concerns entered world politics as the effects of industrial "
  "growth - ozone depletion, global warming, resource depletion - crossed "
  "borders; since northern states industrialised first, questions of "
  "responsibility and equity divide rich and developing countries.",
  "",
  "The core clash is distributive: who bears the cost of saving a commons "
  "damaged mostly by the industrialised North?",
  "leps106.txt environmental concerns and North-South divides sections",
  ["name the global environmental issues of the chapter",
   "why do North-South divides shape climate politics",
   "explain the commons argument with examples",
   "state the concerns of developing countries in climate talks",
   "relate industrialisation to ecological footprints",
   "define sustainable development in this context"],
  "verify_property",
  [H.vstep(1, "list the issues", "ozone, warming, biodiversity and resource loss head the agenda"),
  H.vstep(2, "read the divide", "the North industrialised first; the South seeks development space"),
  H.vstep(3, "close with equity", "common but differentiated responsibility frames the fairness debate")]),
 H.concept("leps.106.2", "Global Commons and Conferences", "The Global Commons",
  "The global commons - earth's atmosphere, Antarctica, ocean floor and outer "
  "space - lie outside national jurisdiction; the Antarctic Treaty of 1959 "
  "reserved the continent for peaceful science, and conferences from "
  "Stockholm 1972 to Rio 1992 and Kyoto 1997 built the regime of environmental "
  "agreements.",
  "rio_to_kyoto = kyoto_year - rio_year",
  "The Kyoto protocol followed the Rio earth summit by the difference of 1997 "
  "and 1992.",
  "leps106.txt Antarctic Treaty 1959, Stockholm 1972, Rio 1992 and Kyoto 1997 sections",
  ["define the global commons and list its components",
   "what does the Antarctic Treaty provide",
   "compute the years between the Rio summit and the Kyoto protocol",
   "state the Stockholm conference's significance",
   "explain common but differentiated responsibilities",
   "evaluate the effectiveness of summit diplomacy"],
  "compute",
  [H.cstep(1, "record the summits", "Rio 1992, Kyoto 1997", "rio_year = 1992"),
   H.cstep(2, "subtract", "1997 - 1992 = five years between summit and protocol", "rio_to_kyoto = kyoto_year - rio_year")]),
 H.concept("leps.106.3", "Indigenous Peoples and Resource Rights",
  "Indigenous Peoples and their Rights",
  "Indigenous peoples - whose homelands cross borders and whose cultures "
  "predate modern states - seek recognition of land and resource rights; "
  "their movements highlight how states and corporations appropriate forests, "
  "minerals and knowledge, and the UN declared an international day and "
  "decade for them.",
  "",
  "Indigenous claims turn environment into justice: protecting cultures means "
  "protecting the ecosystems they manage.",
  "leps106.txt indigenous peoples' definition, voices and rights sections",
  ["who are indigenous peoples and where do they live",
   "what rights do indigenous movements demand",
   "how do states and corporations threaten indigenous lands",
   "state the UN's recognitions of indigenous peoples",
   "relate indigenous knowledge to conservation",
   "give examples of indigenous struggles from the chapter"],
  "verify_property",
  [H.vstep(1, "define the peoples", "descendants of original inhabitants across the Americas, Australia and beyond"),
  H.vstep(2, "list the claims", "land titles, cultural survival and resource consent head their agenda"),
  H.vstep(3, "close with stewardship", "their livelihoods often sustain the very biodiversity states seek to protect")]),
 H.concept("leps.106.4", "Resource Geopolitics: Oil and Water", "Resource Geopolitics",
  "Resources shape world politics: oil concentrates power in West Asia and "
  "the control of supply lines, and water - river basins like the Jordan, "
  "Tigris-Euphrates and the Indus - generates disputes where upstream and "
  "downstream states meet; competition for natural resources remains a driver "
  "of conflict.",
  "",
  "Whoever commands pipelines, straits and river heads commands leverage: "
  "resource geography is power geography.",
  "leps106.txt oil politics, water disputes and regional competition sections",
  ["explain oil's role in world politics and West Asia",
   "name the river basins prone to water disputes",
   "describe the Indus waters arrangement's significance",
   "relate pipeline routes to geopolitical competition",
   "state the concept of water as a strategic resource",
   "evaluate cooperation possibilities over shared resources"],
  "verify_property",
  [H.vstep(1, "follow the oil", "Western Asian reserves and sea lanes anchor energy geopolitics"),
  H.vstep(2, "trace the rivers", "Jordan and Tigris-Euphrates basins fuel interstate water conflicts"),
  H.vstep(3, "close with treaties", "the Indus treaty shows water sharing can survive rivalries")]),
]
W = [H.we("we_leps106_1", "leps106.txt Rio and Kyoto dates", "leps.106.2",
  "The Rio earth summit was held in 1992 and the Kyoto protocol in 1997. "
  "Compute the years between them.",
  {"rio_year": 1992, "kyoto_year": 1997},
  [H.cstep(1, "record the years", "Rio 1992, Kyoto 1997", "rio_year = 1992"),
   H.cstep(2, "subtract", "1997 - 1992 = 5 years", "rio_to_kyoto = kyoto_year - rio_year")]),
 H.we("we_leps106_2", "leps106.txt commons section", "leps.106.2",
  "Name the four global commons and why they need treaties.",
  {},
  [H.vstep(1, "the commons", "atmosphere, Antarctica, ocean floor and outer space"),
   H.vstep(2, "the problem", "no state owns them, so each may overuse them"),
   H.vstep(3, "conclusion", "treaties like the Antarctic Treaty create shared rules")],
  qtype="short_answer"),
 H.we("we_leps106_3", "leps106.txt resource geopolitics section", "leps.106.4",
  "Explain water as a strategic resource with one river-basin example.",
  {},
  [H.vstep(1, "scarcity meets power", "upstream states control flow that downstream economies need"),
   H.vstep(2, "example", "Jordan basin disputes tie water to regional conflict"),
   H.vstep(3, "conclusion", "water sharing becomes a test of cooperation, not just engineering")],
  qtype="short_answer")]
E = [H.ex("ex_leps106_1", "leps106.txt end-of-chapter exercises, reworded",
          ["identify major global environmental concerns",
           "compute the years between Rio and Kyoto conferences",
           "describe the global commons and treaty protections",
           "discuss indigenous peoples' movements and rights",
           "analyse resource geopolitics of oil and water"]),
     H.ex("ex_leps106_2", "leps106.txt applied questions, reworded",
          ["argue the equity principle in climate negotiations",
           "evaluate indigenous knowledge for sustainability",
           "relate India's energy needs to resource geopolitics",
           "assess summit diplomacy's environmental record",
           "design a cooperative plan for a shared river basin"])]
H.emit("leps106", H.make_cat("leps106", "Environment and Natural Resources", C, W, E))

# ---------------- leps107: Globalisation ---------------- #
C = [
 H.concept("leps.107.1", "Concepts of Globalisation", "The Concept of Globalisation",
  "Globalisation is the process of rapid integration or interconnection "
  "between countries driven by flows of goods, services, capital, technology "
  "and ideas; it has political, economic and cultural dimensions, and its "
  "intensification from the 1990s followed technological and policy changes.",
  "",
  "Globalisation compresses space and time: markets, media and movements "
  "knit distant places into instant interdependence.",
  "leps107.txt globalisation concept and dimensions sections",
  ["define globalisation and its driving flows",
   "name the political, economic and cultural dimensions",
   "why did globalisation intensify in the 1990s",
   "distinguish globalisation from internationalisation",
   "give examples of cultural globalisation in daily life",
   "relate technology to global interconnection"],
  "verify_property",
  [H.vstep(1, "define the process", "integration through cross-border flows defines globalisation"),
  H.vstep(2, "sort the dimensions", "politics, economy and culture are its three faces"),
  H.vstep(3, "close with timing", "1990s technology and liberalisation multiplied the flows")]),
 H.concept("leps.107.2", "Causes: Technology and Politics", "Causes of Globalisation",
  "Globalisation's causes are technological - container transport, "
  "telecommunications and computers collapsing costs - and political - "
  "liberalisation policies, WTO rules and the opening of economies like "
  "India's 1991 reforms that lowered trade barriers.",
  "",
  "Both engines matter: cheaper movement of data and goods met deliberate "
  "decisions to open markets.",
  "leps107.txt technology, liberalisation and India's 1991 opening sections",
  ["list the technological causes of globalisation",
   "state the political causes including WTO rules",
   "how did India's 1991 reforms open the economy",
   "explain container shipping's role in trade",
   "relate telecom costs to global services trade",
   "evaluate which cause dominates globalisation's growth"],
  "verify_property",
  [H.vstep(1, "credit the machines", "containers, satellites and computers cut transaction costs"),
  H.vstep(2, "credit the choices", "trade agreements and 1991-style reforms opened borders"),
  H.vstep(3, "close with services", "cheap telecom enabled India's software and call-centre exports")]),
 H.concept("leps.107.3", "Consequences: Winners and Critics", "Consequences of Globalisation",
  "Globalisation's consequences are uneven: consumers gain cheaper goods and "
  "workers gain new service jobs, while critics point to job losses in "
  "protected sectors, cultural homogenisation, and the widening gap between "
  "winners and losers within and between countries.",
  "",
  "The ledger splits by sector and skill: software exporters celebrate while "
  "import-competing farmers and workers bear adjustment costs.",
  "leps107.txt economic, cultural and political consequences sections",
  ["state the economic gains claimed for globalisation",
   "list critics' concerns about jobs and culture",
   "how does globalisation affect state autonomy",
   "explain winners and losers within countries",
   "relate MNCs to production networks",
   "give Indian examples of globalisation's mixed effects"],
  "verify_property",
  [H.vstep(1, "read the gains", "cheaper goods, export jobs and technology flows mark the upside"),
  H.vstep(2, "hear the critics", "job displacement, cultural erosion and inequality mark the downside"),
  H.vstep(3, "close with politics", "protests and policy debates contest globalisation's rules")]),
 H.concept("leps.107.4", "India and Globalisation", "India and Globalisation",
  "India integrated into the global economy after the 1991 reforms through "
  "trade, investment and services exports; globalisation brought growth, "
  "consumer choice and technology, alongside concerns for farmers, small "
  "industry and cultural practices, making India both a beneficiary and a "
  "negotiator of global rules.",
  "",
  "India's globalisation is selective: services globalised fast while "
  "agriculture and labour markets stayed partly protected.",
  "leps107.txt India's reforms, gains and concerns sections",
  ["describe India's post-1991 global integration",
   "state gains from globalisation for Indian consumers and firms",
   "identify concerns of farmers and small industry",
   "explain India's service exports boom",
   "relate globalisation to employment and inequality",
   "evaluate India's negotiating stance in global trade"],
  "verify_property",
  [H.vstep(1, "open the economy", "1991 reforms cut tariffs and welcomed investment"),
  H.vstep(2, "count the gains", "software exports and cheaper manufactures changed consumption"),
  H.vstep(3, "close with concerns", "farm distress and small-firm competition fuel the globalisation debate")]),
]
W = [H.we("we_leps107_1", "leps107.txt 1991 reforms", "leps.107.4",
  "India's liberalisation began in 1991 and the Seattle WTO protests came in "
  "1999. Compute the years between the reforms and the protests.",
  {"reform_year": 1991, "protest_year": 1999},
  [H.cstep(1, "record the years", "reforms 1991, protests 1999", "reform_year = 1991"),
   H.cstep(2, "subtract", "1999 - 1991 = 8 years", "reform_gap = protest_year - reform_year")]),
 H.we("we_leps107_2", "leps107.txt consequences section", "leps.107.3",
  "Give two gains and two criticisms of globalisation from the chapter.",
  {},
  [H.vstep(1, "gains", "cheaper consumer goods and new service-sector jobs"),
   H.vstep(2, "criticisms", "job losses in protected sectors and cultural homogenisation"),
   H.vstep(3, "conclusion", "benefits and costs distribute unevenly across classes and countries")],
  qtype="short_answer"),
 H.we("we_leps107_3", "leps107.txt India section", "leps.107.4",
  "Explain why India's globalisation is called selective.",
  {},
  [H.vstep(1, "services lead", "software and telecom integrated globally after 1991"),
   H.vstep(2, "protected sectors", "farming and much labour remain partly shielded"),
   H.vstep(3, "conclusion", "integration advanced fastest where skills met world demand")],
  qtype="short_answer")]
E = [H.ex("ex_leps107_1", "leps107.txt end-of-chapter exercises, reworded",
          ["define globalisation and its driving flows",
           "list technological and political causes of globalisation",
           "compute the years between 1991 reforms and 1999 protests",
           "evaluate the consequences of globalisation for India",
           "discuss debates over cultural globalisation"]),
     H.ex("ex_leps107_2", "leps107.txt applied questions, reworded",
          ["argue for and against WTO-led trade rules",
           "relate MNC production networks to Indian jobs",
           "assess globalisation's effect on state autonomy",
           "map winners and losers of liberalisation in India",
           "propose policies to spread globalisation's gains"])]
H.emit("leps107", H.make_cat("leps107", "Globalisation", C, W, E))

print("final group done")
