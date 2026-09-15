const fs = require('fs');
const PATH = 'D:/platform/frontend/components/sims_v2/tools/authored/c8_c10.json';
const cur = JSON.parse(fs.readFileSync(PATH, 'utf8'));
const add = {
"c10_engl_ch10": {
  "discovery": {
    "question": "Mrs. Pumphrey feeds Tricki malt, cod-liver oil, Horlicks, cream cakes and chocolates because she believes he is weak and suffering. The vet, Mr. Herriot, takes Tricki away and gives him NO medicine at all — yet the dog recovers completely. What actually cured him?",
    "options": ["A normal diet, exercise and play with other dogs — the 'illness' was overfeeding, not disease", "A secret injection the vet hid from Mrs. Pumphrey", "Being separated from his owner lowered his stress hormones", "The surgery hinted at in the story's title"],
    "answer": "A normal diet, exercise and play with other dogs — the 'illness' was overfeeding, not disease",
    "hook": "The 'triumph of surgery' is ironic — no surgery ever happens. Love expressed as unlimited treats made Tricki ill, and simple discipline cured him."
  },
  "mission": "Play the vet: examine an overweight, listless dog, separate real symptoms from an owner's anxious guesses, and design a recovery plan using only food, exercise and company.",
  "finale": "Pampering can be a slow-acting poison. Tricki didn't need medicine — he needed someone brave enough to say 'no more cream cakes.'",
  "subtitle": "Diagnose a dog whose only disease is too much love",
  "role": "a veterinary surgeon facing a pampered patient",
  "intro": "A wealthy lady arrives at your clinic in tears: her little dog refuses food, vomits, and can barely waddle. She insists he needs more nourishment. You suspect the opposite.",
  "goal": "Distinguish real illness from overindulgence, and explain why responsible care sometimes means withholding what a pet loves."
},
"c10_engl_ch11": {
  "discovery": {
    "question": "Hari Singh, a skilled 15-year-old thief, steals ₹600 from Anil — the one man who trusted him and was teaching him to read and write. Hours later he secretly returns the money. Why would a professional thief give back a successful theft?",
    "options": ["He realised education and Anil's trust could change his life in ways stolen money never could", "He was afraid the police had already been informed", "The notes were wet and damaged, so they were worthless", "He planned to steal a bigger amount later"],
    "answer": "He realised education and Anil's trust could change his life in ways stolen money never could",
    "hook": "The most valuable thing Anil gave Hari wasn't money — it was being treated as someone worth teaching. Stealing from a man who trusted him cost more than ₹600."
  },
  "mission": "Step inside the mind of a boy who survives by lying: weigh the thrill of an easy theft against the slow reward of learning to write your own name, and decide what to do at the railway station.",
  "finale": "Trust turned out to be the thing Hari couldn't steal — he could only lose it or earn it. He chose to earn it.",
  "subtitle": "Decide what a thief does when someone finally trusts him",
  "role": "a young thief at a crossroads",
  "intro": "You are Hari Singh: charming, quick, and honest about only one thing — that you steal. Then you meet Anil, who hands you his money, his kitchen and his time without asking questions.",
  "goal": "Analyse how trust and education can reform where punishment cannot."
},
"c10_engl_ch12": {
  "discovery": {
    "question": "Secret agent Ausable is fat, speaks with an American accent, and lives in a gloomy hotel room — nothing like a film spy. When rival agent Max bursts in with a pistol, Ausable wins without firing a shot or throwing a punch. How?",
    "options": ["He invents a balcony outside the window so convincingly that Max steps backwards into thin air", "He secretly signals the police through his telephone", "He offers Max double the money to switch sides", "He uses a hidden trapdoor installed by French intelligence"],
    "answer": "He invents a balcony outside the window so convincingly that Max steps backwards into thin air",
    "hook": "Ausable's weapon wasn't a gun — it was a believable lie told calmly. The story argues presence of mind beats physical strength and spy-movie glamour."
  },
  "mission": "You are an unimpressive-looking agent cornered by an armed intruder. Invent a detail so believable that your enemy defeats himself — while a knock at the door keeps raising the stakes.",
  "finale": "Max brought a pistol; Ausable brought a story. The story won, because a lie believed is stronger than a weapon feared.",
  "subtitle": "Outwit an armed spy using nothing but a made-up balcony",
  "role": "a secret agent who looks nothing like one",
  "intro": "A young writer named Fowler followed you all evening expecting mystery and danger — and got a damp hotel room instead. Then the door opens, and there's a man with a gun. Time to become interesting.",
  "goal": "Show how calm thinking and convincing detail can overturn a physically hopeless situation."
},
"c10_engl_ch13": {
  "discovery": {
    "question": "Horace Danby is a respectable locksmith who robs one safe a year to buy rare books. At Shotover Grange, a charming young woman catches him mid-robbery, sweet-talks him into opening the safe 'for her jewellery' — and he goes to prison while she walks free. What was the twist?",
    "options": ["She was a fellow thief who tricked him into leaving his fingerprints all over the safe", "She was an undercover police officer gathering evidence", "She was the house owner's wife setting a trap for him", "She hypnotised him into confessing to the owners"],
    "answer": "She was a fellow thief who tricked him into leaving his fingerprints all over the safe",
    "hook": "The man who believed in 'honour among thieves' met a thief who didn't. His careful gloves came off the moment he trusted the wrong person."
  },
  "mission": "Plan a 'perfect' annual burglary as a meticulous, honest-in-public thief — then discover mid-heist that the most dangerous person in the house isn't carrying a weapon but a smile.",
  "finale": "Horace planned for locks, alarms and dogs — everything except another thief. Charm turned out to be the only safe he couldn't crack.",
  "subtitle": "Pull off a careful robbery, then lose it all to a better liar",
  "role": "a gentleman thief with a passion for rare books",
  "intro": "Once a year you stop being a respectable locksmith and become a careful, solitary burglar — not for greed, but for beautiful rare books. This year's job at Shotover Grange is going perfectly. Almost.",
  "goal": "Trace how a single misplaced trust undid months of meticulous planning, and weigh the irony of a thief being out-thieved."
},
"c10_engl_ch14": {
  "discovery": {
    "question": "Griffin discovers drugs that make the human body's refractive index match air — light passes through him, so he becomes invisible. But footprints appear in mud, snow shows his steps, and stolen food bulges visibly in his invisible stomach. What does this reveal about his 'perfect' power?",
    "options": ["Invisibility hides the body, not its effects — he still leaves evidence wherever he goes", "The drugs were imperfect and kept wearing off randomly", "His power worked only in daylight, like a vampire reversed", "He could only stay invisible while holding his breath"],
    "answer": "Invisibility hides the body, not its effects — he still leaves evidence wherever he goes",
    "hook": "Griffin could vanish but could not hide his footprints, his breath in cold air, or the food inside him. Being unseen is not the same as being untraceable."
  },
  "mission": "Test a scientific breakthrough that bends light around a human body — then survive a winter night as an invisible man who still needs warmth, food and shelter, all of which give him away.",
  "finale": "Science gave Griffin a miracle, and he used it for arson and theft. The footprints in the snow were the honest part of him — the man remained visible in his choices.",
  "subtitle": "Become invisible — and learn why that solves nothing",
  "role": "a brilliant but lawless scientist",
  "intro": "You have done what no physicist dreamed of: swallowed rare drugs, watched your body turn transparent as air. Then you step outside into a London January and realise the cold doesn't care that it can't see you.",
  "goal": "Explain the refractive-index logic of Griffin's invisibility and judge how a discovery's value depends on the hands that hold it."
},
"c10_engl_ch15": {
  "discovery": {
    "question": "Richard Ebright started as a kid collecting butterflies in Pennsylvania — his mother got him 'The Travels of Monarch X,' he tagged butterflies for research, and eventually his work helped explain how cells read DNA. What does his path reveal about how scientists are actually made?",
    "options": ["Sustained curiosity plus real research habits — collecting, tagging, recording — matter more than sudden genius", "He was simply born brilliant; the butterflies were a coincidence", "Winning science fairs is the single event that creates scientists", "A famous mentor discovered him and did the real work"],
    "answer": "Sustained curiosity plus real research habits — collecting, tagging, recording — matter more than sudden genius",
    "hook": "Ebright didn't start with a laboratory — he started with a net, a notebook and a mother who fed his curiosity. Scientists are trained by habits, not born with titles."
  },
  "mission": "Follow a butterfly collector from childhood tagging projects to science-fair failures and finally to a real theory about cell life — and pinpoint the exact habits that carried him there.",
  "finale": "The boy who chased monarchs learned the scientist's real secret: curiosity plus stubborn recording beats raw talent that never gets exercised.",
  "subtitle": "Trace how a butterfly hobby became real science",
  "role": "a biographer reconstructing a scientist's childhood",
  "intro": "Before he published research on how cells work, Richard Ebright was a boy in a small town with jars of butterflies and a mother who refused to let him be bored.",
  "goal": "Show that scientific achievement grows from curiosity, discipline and mentorship — not from lone genius."
},
"c10_engl_ch16": {
  "discovery": {
    "question": "Matilda Loisel borrows a dazzling diamond necklace for one grand ball, loses it, and spends ten brutal years in poverty paying off the replacement — only to learn the original was fake, worth almost nothing. What is the cruellest irony here?",
    "options": ["She destroyed her real life to pay for an imitation of the life she dreamed about", "Her friend secretly knew it was fake all along", "The replacement necklace was also fake, so she was cheated twice", "The ball ticket itself was counterfeit"],
    "answer": "She destroyed her real life to pay for an imitation of the life she dreamed about",
    "hook": "Matilda's tragedy wasn't losing a necklace — it was that shame stopped her from simply confessing. One honest sentence at the ball would have saved ten years."
  },
  "mission": "Live one glittering evening on borrowed jewellery, then navigate the decade of debt that follows — and find the exact moment where honesty would have changed everything.",
  "finale": "Ten years of scrubbing floors bought a necklace nobody needed, replacing one that was glass. Vanity wrote the bill; honesty could have torn it up.",
  "subtitle": "Pay for one night of glamour with ten years of poverty",
  "role": "a clerk's wife who longs for the rich life",
  "intro": "You are Matilda: pretty, born for luxury, married to a clerk. An invitation to the Minister's ball should be a dream — except you have nothing to wear. Your friend lends you diamonds. Then, somewhere in the night, they vanish.",
  "goal": "Examine how pride and the fear of shame turn a small accident into a life's catastrophe."
},
"c10_engl_ch17": {
  "discovery": {
    "question": "Sulekha — called 'Bholi' (simpleton) after a fall injured her brain and smallpox scarred her face — is the neglected, stammering daughter everyone mocks. At her own wedding, she refuses to marry the groom when he demands dowry money. What made the 'simpleton' suddenly fearless?",
    "options": ["Schooling — education gave her self-respect, words, and the courage to judge right from wrong", "A hidden inheritance made her financially independent", "Her father finally stood up for her first", "The village elders ordered her to refuse"],
    "answer": "Schooling — education gave her self-respect, words, and the courage to judge right from wrong",
    "hook": "The girl who couldn't finish a sentence without stammering delivered the story's most complete sentence: 'No.' Education didn't just teach her to read — it taught her she mattered."
  },
  "mission": "Grow up as the daughter nobody wants — scarred, stammering, mocked — then let a patient teacher rebuild you word by word until you can refuse an unjust marriage in front of the whole village.",
  "finale": "They named her Bholi to mean 'simple.' School renamed her Sulekha — a girl who could speak, judge, and say no to a greedy bridegroom.",
  "subtitle": "Watch a mocked girl find the one word that changes her life",
  "role": "a neglected child discovering her own voice",
  "intro": "Everyone in the village calls you Bholi — the simpleton who fell off a cot, survived smallpox, and can barely speak. Then the new school opens, and a teacher speaks to you as if you are a person.",
  "goal": "Show how education and one caring teacher transform neglect into self-respect and moral courage."
},
"c10_engl_ch18": {
  "discovery": {
    "question": "In 2040, Martian invaders land on Earth to conquer it — but flee in terror after 'decoding' a book of nursery rhymes, convinced that Earthlings have explosive weapons and interstellar reach. How did a children's book defeat an invasion?",
    "options": ["The Martians misread rhymes as military intelligence — 'Humpty Dumpty' proved Earth's violent power", "The rhymes contained a hidden code planted by Earth's scientists", "The book emitted radiation that poisoned the Martian fleet", "The Historian hypnotised the invaders through the museum display"],
    "answer": "The Martians misread rhymes as military intelligence — 'Humpty Dumpty' proved Earth's violent power",
    "hook": "The Martians were defeated by their own arrogance: they 'translated' Mother Goose into a weapons manual. A book only 'saves the Earth' because the invaders couldn't imagine being wrong."
  },
  "mission": "Command a Martian space fleet invading a library, assign 'experts' to decode a mysterious Earth book — and watch your mighty armada retreat before Mother Goose.",
  "finale": "The invasion failed not with a bang but with a nursery rhyme. Superior technology lost to a superior imagination — Earth's, and the playwright's.",
  "subtitle": "Repel a Martian invasion with nothing but nursery rhymes",
  "role": "a Martian fleet commander decoding Earth's secrets",
  "intro": "The year is 2040. Your fleet lands at a strange Earth building called a 'library' — a warehouse of primitive 'books.' Somewhere in those paper rectangles must be the secret of this planet's power.",
  "goal": "See how satire uses dramatic irony: the 'backward' humans win because the 'advanced' invaders cannot read without arrogance."
},
"c10_geo_ch01": {
  "discovery": {
    "question": "A river flows through a remote valley. To a city engineer it's a hydroelectric resource; to a village upstream it's irrigation; to an untouched forest stretch, the same water is 'not yet a resource.' How can one substance switch between being and not being a resource?",
    "options": ["A substance becomes a resource only when it meets a need AND is technologically accessible, economically feasible and culturally acceptable", "Resources are fixed by nature — the engineer is simply wrong", "Anything wet counts as a water resource automatically", "Only things that can be sold in markets are resources"],
    "answer": "A substance becomes a resource only when it meets a need AND is technologically accessible, economically feasible and culturally acceptable",
    "hook": "A rock in a desert isn't a resource until technology, demand and cost line up. 'Resource' is a relationship between humans and nature — not a label stamped on objects."
  },
  "mission": "Audit a patch of land — soil, water, forests, minerals, sunlight — and sort each item into biotic, abiotic, renewable, non-renewable and 'not yet a resource,' then defend each call.",
  "finale": "Everything around you is either a resource or a resource-in-waiting. What decides isn't the thing itself — it's human need, technology and wisdom.",
  "subtitle": "Decide what counts as a resource — and what doesn't yet",
  "role": "a resource planner surveying a valley",
  "intro": "You've been handed a map of a district and one blunt question: what here is actually a resource? The answer turns out to be trickier than 'everything useful.'",
  "goal": "Classify resources by origin, exhaustibility, ownership and development status — and explain why the same substance can shift categories."
},
"c10_geo_ch02": {
  "discovery": {
    "question": "India holds over 47,000 plant and 89,000 animal species, yet a single town's new highway can erase species that took millions of years to evolve. Conservationists argue even 'useless' insects deserve protection. What's the strongest reason?",
    "options": ["Every species is a link in an ecological web — losing unknown ones can collapse services like pollination and soil renewal that we depend on", "Rare species are always worth money as tourist attractions", "Laws require it, so the debate is already settled", "Insects pollinate every single crop humans eat"],
    "answer": "Every species is a link in an ecological web — losing unknown ones can collapse services like pollination and soil renewal that we depend on",
    "hook": "You can't pull threads out of a web and promise it will hold. We protect species we've never named because ecosystems don't publish their load-bearing walls."
  },
  "mission": "Map India's wild wealth — from Himalayan rhododendrons to Western Ghats frogs — rank the threats pushing species toward extinction, and choose which conservation strategies actually work.",
  "finale": "Forests aren't just timber and tigers aren't just mascots. Biodiversity is the country's insurance policy — and we keep cancelling it.",
  "subtitle": "Defend species you've never heard of before they vanish",
  "role": "a wildlife conservation officer",
  "intro": "India is one of only 17 mega-diverse countries on Earth. Your job: decide where the next highway, dam or mine goes — knowing every 'empty' patch of forest is full of lives.",
  "goal": "Connect India's relief, climate and soil to its biodiversity, weigh depletion causes, and evaluate conservation from Project Tiger to sacred groves."
},
"c10_geo_ch03": {
  "discovery": {
    "question": "Bengaluru gets decent monsoon rain and sits near rivers, yet apartment blocks there queue for water tankers. Meanwhile some genuinely dry regions manage fine. How can a water-rich place run out of water?",
    "options": ["Scarcity can be economic, not just physical — poor infrastructure, pollution and over-extraction can make available water unusable or unreachable", "Tanker mafias secretly export the city's water at night", "Rain in cities instantly evaporates before touching the ground", "Rivers legally belong only to the states they originate in"],
    "answer": "Scarcity can be economic, not just physical — poor infrastructure, pollution and over-extraction can make available water unusable or unreachable",
    "hook": "Running out of water isn't only about rain — a city can stand beside a river and still thirst if the water is polluted, over-pumped or never harvested."
  },
  "mission": "Investigate why a rain-blessed city still buys tanker water: trace over-exploited aquifers, polluted rivers and missing storage, then design a fix using dams and rooftop harvesting wisely.",
  "finale": "Freshwater is renewable but not infinite. The crisis isn't that the sky forgot us — it's that we paved the catchments, poisoned the rivers and pumped the aquifers dry.",
  "subtitle": "Solve why a wet city still runs dry",
  "role": "a water resources investigator",
  "intro": "Three-fourths of Earth's surface is water, yet your city's taps run at fixed hours. Your task is to find where the water actually goes — and why 'enough' on paper means scarcity in pipes.",
  "goal": "Separate physical from economic scarcity, weigh the promises and costs of multipurpose dams, and make the case for rainwater harvesting."
},
"c10_geo_ch04": {
  "discovery": {
    "question": "Agriculture employs about 43% of India's workers but produces only around 18% of the country's GVA. If farming is so 'unproductive,' why can't India simply shift those workers into factories and services?",
    "options": ["Agriculture also feeds the nation, supplies raw material to industries and earns export income — and manufacturing can't absorb that many workers quickly", "It actually can — economists just refuse to admit it", "Farm workers refuse all other jobs by tradition alone", "The 18% figure is a data error; farms produce most of GDP"],
    "answer": "Agriculture also feeds the nation, supplies raw material to industries and earns export income — and manufacturing can't absorb that many workers quickly",
    "hook": "A sector can shrink in GDP share while its importance grows — your breakfast, your cotton shirt and India's rice exports all start in a field."
  },
  "mission": "Follow one grain of wheat through India's farm economy: choose between subsistence and commercial farming logic, match crops to soils and seasons, and judge which reforms actually help the farmer.",
  "finale": "Two in five Indians work the land to feed all of us. Agriculture's share of GDP fell — its responsibility never did.",
  "subtitle": "Run the sector that feeds a billion on a fifth of the economy",
  "role": "an agricultural planner",
  "intro": "Nearly half of India's workers still farm, yet farming earns less than a fifth of the national income. Somewhere between the field and the GDP figure lies the real story of Indian agriculture.",
  "goal": "Weigh agriculture's true economic roles — employment, food security, raw materials, exports — and understand farming types, cropping seasons and reform debates."
},
"c10_geo_ch05": {
  "discovery": {
    "question": "The iron in your bike, the mica in old electricals, the salt in the sea — all minerals, all 'dug up.' Yet geologists say minerals are a 'one-time inheritance': once mined, they're gone. If minerals form naturally, why can't the Earth just make more?",
    "options": ["They form over geological timescales of millions of years — trivially renewable to Earth, effectively non-renewable to us", "Mining permanently stops all mineral formation worldwide", "Earth does make them fast, but companies hide new deposits", "Only metals are finite; other minerals regrow like forests"],
    "answer": "They form over geological timescales of millions of years — trivially renewable to Earth, effectively non-renewable to us",
    "hook": "Earth IS making more minerals right now — it just works on a clock of millions of years while we mine on a clock of decades. Finite isn't about geology; it's about timescale."
  },
  "mission": "Hunt India's minerals from veins and lodes to alluvial sands: classify metallic and non-metallic finds, place iron ore and bauxite belts on the map, then decide how to use a finite inheritance.",
  "finale": "Every mineral you use was made once and will never be remade in human time. Conservation isn't green idealism here — it's arithmetic.",
  "subtitle": "Spend a one-time geological inheritance wisely",
  "role": "a mineral resources geologist",
  "intro": "Under India's soils lies a portfolio millions of years in the making — iron, manganese, bauxite, mica, coal. Your job is to find it, classify it, and explain why 'we'll just find more' is a dangerous plan.",
  "goal": "Define minerals, master their modes of occurrence and Indian distribution, and argue for conservation of an effectively non-renewable endowment."
},
"c10_geo_ch06": {
  "discovery": {
    "question": "Early cotton textile mills clustered almost entirely around Mumbai and Ahmedabad — not near India's biggest cities or cotton's fanciest markets. What pulled an entire industry to that one coastal belt?",
    "options": ["A convergence of location factors: nearby raw cotton, moist coastal air for spinning, ports, cheap labour, capital and a big market", "The British legally banned textile mills everywhere else", "Cotton only grows within 100 km of the sea", "Mumbai had the country's only electricity supply then"],
    "answer": "A convergence of location factors: nearby raw cotton, moist coastal air for spinning, ports, cheap labour, capital and a big market",
    "hook": "Industries aren't planted randomly — they migrate to wherever raw material, labour, power, transport and markets add up to the lowest cost. Geography is arithmetic with a map."
  },
  "mission": "Site a new factory from scratch: weigh raw material, labour, power, capital, transport, market and government policy for competing locations, then defend why industry also means pollution.",
  "finale": "Manufacturing turns harvests into incomes and ores into machines — the sector that decides whether India stays a supplier of raw stuff or becomes a maker.",
  "subtitle": "Pick the perfect spot for a factory — then pay the true price",
  "role": "an industrial location analyst",
  "intro": "A company hands you a map of India and asks: where do we build? The honest answer involves cotton fields, coal seams, railway lines, crowded markets — and the smoke that follows.",
  "goal": "Explain manufacturing's role in the economy, apply the seven industrial location factors to real cases, and confront industry's environmental costs."
}
};
for (const k in add) { if (cur[k]) { console.log('SKIP existing', k); } else { cur[k] = add[k]; } }
fs.writeFileSync(PATH, JSON.stringify(cur, null, 1));
console.log('total now', Object.keys(cur).length);
