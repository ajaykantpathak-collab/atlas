const fs = require('fs');
const PATH = 'D:/platform/frontend/components/sims_v2/tools/authored/c8_c10.json';
const cur = JSON.parse(fs.readFileSync(PATH, 'utf8'));
const add = {
"c10_math_ch10": {
  "discovery": {
    "question": "A bicycle wheel rolls along the road. The road touches the wheel at exactly one point — never two, never a segment. A geometry student calls the road a 'tangent.' What's the deeper rule hiding in that single touch?",
    "options": ["The radius to the touch point is always perpendicular to the tangent — the wheel's spoke stands exactly upright on the road", "The road is secretly part of the circle's circumference", "Any line touching a circle once is parallel to its diameter", "Tangents only exist for perfectly round wheels"],
    "answer": "The radius to the touch point is always perpendicular to the tangent — the wheel's spoke stands exactly upright on the road",
    "hook": "One point of contact, one hidden right angle. Every tangent-radius perpendicularity you prove is just the bicycle wheel's secret made formal."
  },
  "mission": "Prove the tangent-radius perpendicularity, construct tangents from outside points, and use equal-tangent lengths to unlock circle problems that look impossible.",
  "finale": "A circle guards its secrets with one rule: touch it at a point and the radius stands at attention, perpendicular. Everything else — equal tangents, constructions — flows from that.",
  "subtitle": "Find the right angle hiding in every wheel on every road",
  "role": "a geometer studying single-point contact",
  "intro": "Draw a line that kisses a circle at exactly one point. Looks simple — until you prove the radius there must be perpendicular, and suddenly tangent lengths from outside points become equal weapons.",
  "goal": "Master tangent properties — uniqueness, perpendicularity to radius, and equal lengths from an external point — and apply them in proofs and constructions."
},
"c10_math_ch11": {
  "discovery": {
    "question": "Chop a circle into many thin pizza slices and rearrange them alternately — they stack into something eerily close to a parallelogram. This ancient rearrangement trick yields A = πr². What does slicing reveal that memorising can't?",
    "options": ["The 'height' becomes r and the 'base' becomes half the circumference — the formula falls out of the rearrangement itself", "It proves π is exactly 3.14", "It shows circles are secretly polygons with four sides", "Nothing — the rearrangement is just a party trick"],
    "answer": "The 'height' becomes r and the 'base' becomes half the circumference — the formula falls out of the rearrangement itself",
    "hook": "πr² isn't a magic spell — it's a parallelogram wearing a disguise. Slice thin enough and the curve straightens into geometry you already know."
  },
  "mission": "Compute areas of sectors and segments — cake slices, running-track bends, circular gardens with paths — by combining πr² and 2πr into shapes that don't have their own formulas.",
  "finale": "Every sector is a fraction of a circle, every segment a slice minus a triangle. Two formulas, cleverly combined, measure every curve life throws at you.",
  "subtitle": "Slice circles into pieces and measure what formulas forgot",
  "role": "a designer pricing curved shapes",
  "intro": "A client wants a flower bed shaped like a sector and a pathway shaped like a segment. There's no 'segment formula' — only circle pieces, triangles, and your ability to combine them.",
  "goal": "Derive and apply area and circumference formulas, and compute areas of sectors and segments in composite shapes."
},
"c10_math_ch12": {
  "discovery": {
    "question": "An ice-cream cone is a cone sitting on a hemisphere. Asked for its total surface area, a student adds 'total surface area of cone + total surface area of hemisphere' — and gets it wrong. What invisible surface did they accidentally paint?",
    "options": ["The joined faces — where cone meets hemisphere, the surfaces touch internally and must be subtracted or never counted", "The pointed tip of the cone, which has zero area", "The bottom of the hemisphere — it's not exposed", "Nothing — the method was actually correct"],
    "answer": "The joined faces — where cone meets hemisphere, the surfaces touch internally and must be subtracted or never counted",
    "hook": "Combination solids have hidden faces — wherever two solids touch, that skin is buried inside. Surface area counts only what air can touch."
  },
  "mission": "Decompose real objects — capsules, tents, silos, ice-cream cones — into basic solids, count only the exposed surfaces, and compute volumes where melted solids reshape into new ones.",
  "finale": "Every complicated solid is basic shapes glued together. Surface area counts the skin, volume counts the stuffing — and the glued faces belong to neither.",
  "subtitle": "Paint and fill shapes built from cones, cylinders and spheres",
  "role": "a packaging engineer",
  "intro": "Your factory makes odd shapes — a silo that's cylinder plus cone, a capsule that's cylinder plus two hemispheres. Cost depends on surface area; capacity on volume. Neither formula exists until you build it.",
  "goal": "Compute surface areas and volumes of combined solids, and solve conversion problems where one solid is melted and recast into another."
},
"c10_math_ch13": {
  "discovery": {
    "question": "A survey reports 'average daily wage of factory workers' from grouped data — 0–100, 100–200, 200–300 — with worker counts per bracket. There are no exact wages, only ranges. How do you average data you can't fully see?",
    "options": ["Use each class's midpoint (class mark) as its representative value, weight by frequency, and divide by total workers", "Just average the class boundaries — no frequencies needed", "You can't — grouped data has no mean", "Use only the biggest class's midpoint"],
    "answer": "Use each class's midpoint (class mark) as its representative value, weight by frequency, and divide by total workers",
    "hook": "When raw numbers hide inside ranges, the midpoint becomes each group's spokesperson. The mean of grouped data is an honest estimate — assuming each class clusters at its centre."
  },
  "mission": "Compute mean by direct, assumed-mean and step-deviation methods on real frequency tables, then hunt the median and mode that resist the 'average' story the mean tells.",
  "finale": "Mean, median, mode — three different witnesses describing the same data. Learn when they agree and when the 'average' is lying to you politely.",
  "subtitle": "Find the honest average hidden inside grouped data",
  "role": "a data analyst decoding survey tables",
  "intro": "A newspaper hands you a wage table with ranges, not numbers — and asks for 'the average worker.' Your job: make midpoints speak, then check whether the median or mode tells a truer story.",
  "goal": "Calculate mean, median and mode for grouped data and interpret which measure best represents a dataset."
},
"c10_math_ch14": {
  "discovery": {
    "question": "A die is rolled once. 'Probability of getting a 7' = 0. 'Probability of a number below 7' = 1. Between those extremes lives every bet ever made. What rule quietly governs every probability you'll ever compute?",
    "options": ["P(event) = favourable ÷ total equally likely outcomes — always a number between 0 and 1, where 0 means impossible and 1 means certain", "Probability is just a percentage of luck", "Every event's probability is exactly 0.5 — it happens or it doesn't", "Past outcomes change future probabilities for a fair die"],
    "answer": "P(event) = favourable ÷ total equally likely outcomes — always a number between 0 and 1, where 0 means impossible and 1 means certain",
    "hook": "A fair coin doesn't remember the last ten heads. Probability counts equally likely outcomes — 'it either happens or not' gives 0.5 to everything, which is exactly the mistake this chapter kills."
  },
  "mission": "Assign honest probabilities to cards, coins, dice and coloured balls — count sample spaces carefully, and catch the trap where 'happens or doesn't' is not the same as 50–50.",
  "finale": "Probability is organised counting: favourable over total. Between the impossible 0 and the certain 1 lies every game, forecast and gamble you'll ever judge.",
  "subtitle": "Learn why 'it happens or it doesn't' is bad maths",
  "role": "a game analyst rating fair chances",
  "intro": "A friend insists the lottery is 50-50: 'either I win or I don't.' Tonight you learn to count outcomes honestly — and see why casinos, card games and weather forecasts all run on favourable-over-total.",
  "goal": "Apply the classical probability formula to simple experiments and reason correctly about equally likely outcomes."
},
"c10_phy_ch01": {
  "discovery": {
    "question": "Inside a metal wire, the actual moving charges are electrons — flowing from negative to positive. Yet every circuit diagram shows current flowing positive to negative, the opposite way. Are the textbooks just wrong?",
    "options": ["Conventional current was defined before electrons were discovered — the convention stuck, and circuit laws work identically either way", "Yes — modern physics corrected it to electron flow", "Electrons actually flow positive to negative in wires", "Current direction is random; diagrams pick arbitrarily each time"],
    "answer": "Conventional current was defined before electrons were discovered — the convention stuck, and circuit laws work identically either way",
    "hook": "Physics inherited a guess that turned out backwards — and kept it, because Ohm's law doesn't care which sign the movers carry. I = Q/t counts charge per second either way."
  },
  "mission": "Build circuits that obey Ohm's law: push charge with voltage, resist it with resistors in series and parallel, and compute where the energy — and the electricity bill — actually goes.",
  "finale": "Voltage pushes, resistance argues, current flows. Master that argument and every circuit — from a torch to your house wiring — becomes predictable.",
  "subtitle": "Run the invisible river of charge that powers your house",
  "role": "a circuit designer",
  "intro": "Somewhere in every wire, coulombs of charge are marching past each second — that's current. Your job: control that march with voltage, resistance, and clever series-parallel design.",
  "goal": "Define current and potential difference, apply Ohm's law, analyse series and parallel resistances, and compute electric power and heating effects."
},
"c10_phy_ch02": {
  "discovery": {
    "question": "In 1820 Oersted held a compass near a wire, switched on the current — and the needle twitched. No magnet touched it, nothing visible moved. What did that twitch prove?",
    "options": ["Electric current creates a magnetic field around the conductor — electricity and magnetism are two faces of one phenomenon", "Compasses are simply unreliable near wires", "The wire heated up and bent the needle physically", "Static electricity in the air deflected the compass"],
    "answer": "Electric current creates a magnetic field around the conductor — electricity and magnetism are two faces of one phenomenon",
    "hook": "That twitching needle launched electromagnets, motors and generators. A current-carrying wire is secretly a magnet — and the right-hand thumb rule tells you which way its field curls."
  },
  "mission": "Map the invisible: trace field lines around straight wires, loops and solenoids, apply the right-hand rules, then wire up a motor and a fuse — harnessing force on conductors safely.",
  "finale": "Every electric motor on Earth is Oersted's compass writ large — current becomes magnetism, magnetism becomes motion, and a fuse stands guard over all of it.",
  "subtitle": "Turn a twitching compass needle into motors and power",
  "role": "an electrical engineer",
  "intro": "A wire lies over a compass; you close the switch and the needle jumps. You've just witnessed the link between electricity and magnetism — the link that runs every fan, motor and MRI machine.",
  "goal": "Explain magnetic fields around current-carrying conductors, apply Fleming's rules, and connect electromagnetic induction and domestic circuits."
},
"c10_phy_ch03": {
  "discovery": {
    "question": "Coal and petroleum burn beautifully — high calorific value, easy transport, proven technology. Yet every textbook insists we must move beyond them. What two clocks are fossil fuels racing against?",
    "options": ["They're non-renewable (millions of years to form) AND their combustion pumps out CO₂, SO₂ and particulates — depletion plus pollution", "They're actually radioactive, like uranium", "They're running out globally this year — next month there'll be none", "They're too cheap, which hurts the economy"],
    "answer": "They're non-renewable (millions of years to form) AND their combustion pumps out CO₂, SO₂ and particulates — depletion plus pollution",
    "hook": "Fossil fuels are ancient sunlight, banked underground for 300 million years — and we're spending it in three centuries while the exhaust alters the sky."
  },
  "mission": "Judge the world's energy menu: weigh fossil fuels against solar, wind, hydro, biomass and nuclear on availability, environment and scale — then design a sensible energy mix for a growing country.",
  "finale": "No energy source is free — every one trades something. The art is matching the source to the place: sun where it's bright, wind where it blows, and less of what the sky can't absorb.",
  "subtitle": "Choose how a nation powers itself without choking its sky",
  "role": "an energy planner for a growing nation",
  "intro": "Your country needs power — for homes, factories, farms and phones. Every option on the table has a catch: coal pollutes, dams displace, solar sleeps at night, nuclear demands caution.",
  "goal": "Compare conventional and non-conventional energy sources on calorific value, availability and environmental cost, and argue for sustainable choices."
},
"c10_phy_ch04": {
  "discovery": {
    "question": "A straw in a glass of water looks bent at the surface, a pool looks shallower than it is, and a coin in a cup can 'appear' when water is poured in. One physics idea explains all three — what is light actually doing?",
    "options": ["Bending — refraction — because its speed changes when it crosses between air and water, turning at the boundary", "Reflecting off the water's surface like a mirror", "Slowing down so much it stops at the boundary", "Travelling in spirals underwater"],
    "answer": "Bending — refraction — because its speed changes when it crosses between air and water, turning at the boundary",
    "hook": "Light is a speed-change artist: slower in water and glass, faster in air. Every 'bent' straw is light obeying Snell's law — turning at borders like a car skidding onto mud."
  },
  "mission": "Command light rays through mirrors and lenses: predict where images form, whether they're real or virtual, magnified or shrunken — then bend light itself and compute its exact angle.",
  "finale": "Mirrors bounce light by two rules; lenses bend it by two more. Master ray diagrams and the humble straw-in-water becomes a lesson in how your eyes are fooled.",
  "subtitle": "Bend light at borders and predict where images appear",
  "role": "an optics engineer",
  "intro": "Your toolkit is just light rays, curved mirrors and glass lenses — but you must predict exactly where every image forms. Behind you: the bent straw, the shallow-looking pool, and eyes that get fooled daily.",
  "goal": "Apply the laws of reflection and refraction, draw ray diagrams for mirrors and lenses, and use mirror/lens formulas with magnification."
},
"c8_bio_ch01": {
  "discovery": {
    "question": "In the 1660s, Robert Hooke sliced cork, peered through his microscope and saw tiny empty boxes — he called them 'cells.' Leeuwenhoek then found living creatures swimming in pond water nobody knew existed. What did these two men actually reveal?",
    "options": ["An entire living world invisible to the naked eye — life built from microscopic units and teeming with organisms too small to see", "That cork is secretly alive and breathing", "That all diseases are caused by bad smells", "That microscopes can magnify anything infinitely"],
    "answer": "An entire living world invisible to the naked eye — life built from microscopic units and teeming with organisms too small to see",
    "hook": "Before microscopes, 'living' meant things you could see. Hooke's dead cork boxes and Leeuwenhoek's swimming 'animalcules' proved most of life was invisible — and always had been."
  },
  "mission": "Shrink down past what eyes can see: meet the cell — life's smallest unit — tour its membrane, cytoplasm and nucleus, and learn to prepare a slide to spy on onion cells yourself.",
  "finale": "Everything alive — from a mango tree to you — is built from boxes too small to see. The microscope didn't just magnify; it revealed where life actually lives.",
  "subtitle": "Discover the invisible living world inside a cork slice",
  "role": "a microscopist seeing cells for the first time",
  "intro": "You hold a thin slice of cork up to a crude lens — and find a honeycomb of tiny rooms. Nobody named them 'cells' yet. Nobody knew every living thing is built from them. Now you do.",
  "goal": "Understand how the microscopic world was discovered and identify the cell as life's basic unit with its key structures."
},
"c8_bio_ch02": {
  "discovery": {
    "question": "Two students sit in the same class. One has a cold; the other is perfectly disease-free but anxious, friendless and can't sleep. A doctor says BOTH might be unhealthy. How can someone with zero disease still be unwell?",
    "options": ["Health means complete physical, mental AND social well-being — not merely the absence of disease", "The doctor is wrong — no symptoms means healthy", "Only contagious diseases count as real illness", "Mental states can't affect health, only germs can"],
    "answer": "Health means complete physical, mental AND social well-being — not merely the absence of disease",
    "hook": "Health isn't just 'no fever.' A body can be disease-free while the mind struggles and friendships fail — the WHO definition counts all three, and they feed into each other."
  },
  "mission": "Guard the treasure: separate infectious diseases from lifestyle diseases, trace how germs jump between people, and build a defence plan using immunity, vaccines and hygiene.",
  "finale": "Health is three treasures in one chest — body, mind, relationships. Germs threaten the first; stress and isolation threaten the rest. Guarding all three is the real work.",
  "subtitle": "Protect a treasure that has three locks, not one",
  "role": "a health detective",
  "intro": "A school notices some students fall sick often while others struggle silently without a single symptom. Your job: figure out what 'healthy' really means — and what actually protects it.",
  "goal": "Define health holistically, distinguish communicable from non-communicable diseases, and explain how immunity and prevention work."
},
"c8_chem_ch02": {
  "discovery": {
    "question": "Drop sugar into water and stir — it vanishes, yet the water tastes sweet and nothing is left at the bottom. No microscope shows the sugar. Where did it physically GO?",
    "options": ["It broke into particles too small to see, slipping into the empty spaces between water particles — matter is grainy, not continuous", "It chemically reacted with water and ceased to exist", "It evaporated into the air above the glass", "It turned into heat energy and disappeared"],
    "answer": "It broke into particles too small to see, slipping into the empty spaces between water particles — matter is grainy, not continuous",
    "hook": "Water looks continuous but it's full of gaps — sugar particles park in them. The disappearance is proof that everything around you is made of tiny, separate, moving pieces."
  },
  "mission": "Prove the invisible: show particles exist through diffusion, dissolving and motion; then sort solids, liquids and gases by how tightly their particles hold hands.",
  "finale": "You can't see particles — but you can see their effects: smells travelling, sugar dissolving, gases filling rooms. Matter is a crowd of invisible movers.",
  "subtitle": "Prove everything is made of invisible moving particles",
  "role": "a particle detective",
  "intro": "A spoonful of sugar disappears into a glass of water and incense smell crosses a closed room. Your job: explain both with one invisible idea — matter is made of moving particles.",
  "goal": "Establish the particulate nature of matter and use it to explain dissolving, diffusion and the states of matter."
},
"c8_chem_ch03": {
  "discovery": {
    "question": "Iron filings and sulphur powder sit mixed in a dish — a magnet pulls the iron right out, unchanged. Heat them together and no magnet can recover the iron. What did the heating actually do?",
    "options": ["It created a compound — iron and sulphur chemically bonded into a new substance with new properties, unseparable by physical means", "It melted the iron into a liquid alloy", "It evaporated the sulphur leaving pure iron", "It magnetised the sulphur permanently"],
    "answer": "It created a compound — iron and sulphur chemically bonded into a new substance with new properties, unseparable by physical means",
    "hook": "A mixture is a crowd — each substance keeps its identity and can be picked out. A compound is a marriage — new substance, new properties, no going back with a magnet."
  },
  "mission": "Sort the material world: separate mixtures by magnet, sieve, evaporation and distillation; then distinguish elements, compounds and mixtures by whether chemistry — not physics — made them.",
  "finale": "Air, sea water and salad are mixtures — you can unmix them. Water and iron sulphide are compounds — chemistry fused them. The difference decides how you separate anything.",
  "subtitle": "Separate what physics can undo from what only chemistry made",
  "role": "a separation scientist in a busy lab",
  "intro": "Your bench is covered with chaos: salt in water, iron in sulphur, sand in rice. Some of it yields to sieves and magnets; some refuses everything except chemistry. Learn to tell which is which.",
  "goal": "Differentiate elements, compounds and mixtures, and choose the right physical separation method for a given mixture."
},
"c8_civ_ch01": {
  "discovery": {
    "question": "In a Delhi voting queue stand a billionaire CEO and a daily-wage worker. At the booth, their votes count exactly the same — one each. Many countries once gave extra votes to the rich or educated. What radical promise did India make under Article 326?",
    "options": ["Universal adult franchise — every adult citizen votes, every vote weighs equal, regardless of wealth, caste, gender or education", "Only taxpayers may vote in national elections", "Graduates get two votes; everyone else gets one", "Voting rights are decided by each state separately"],
    "answer": "Universal adult franchise — every adult citizen votes, every vote weighs equal, regardless of wealth, caste, gender or education",
    "hook": "Most democracies took centuries to let everyone vote — India's Constitution granted it to all adults from day one, in 1950, when half the world still restricted it."
  },
  "mission": "Run an election where everyone counts: trace how India adopted universal franchise when richer nations hesitated, and see how the Election Commission keeps every single vote equal.",
  "finale": "One person, one vote, one value — three words that quietly ended millennia of 'some people matter more.' The queue outside the booth is the most equal place in India.",
  "subtitle": "Discover the one place where every Indian is perfectly equal",
  "role": "a first-time voter",
  "intro": "You'll turn 18 and join the world's largest electorate. Before that, learn why your single vote — equal to a billionaire's — was one of the most radical promises any nation ever made.",
  "goal": "Explain universal adult franchise, its constitutional guarantee in India, and how the Election Commission conducts free and fair elections."
},
"c8_civ_ch02": {
  "discovery": {
    "question": "The Prime Minister runs the country — but can be thrown out mid-term if Parliament passes a no-confidence motion, and must answer MPs' questions every Question Hour. Why did India's founders tie the executive's leash to the legislature?",
    "options": ["In a parliamentary system the executive must keep the legislature's confidence — accountability is built into the job, not optional", "The President secretly controls the Prime Minister anyway", "So the judiciary can veto any decision instantly", "Because India copied a system that doesn't actually work"],
    "answer": "In a parliamentary system the executive must keep the legislature's confidence — accountability is built into the job, not optional",
    "hook": "Power that answers questions daily and falls on a single vote of confidence — that's the parliamentary deal. The government governs only as long as Parliament lets it."
  },
  "mission": "Sit inside the machinery: watch a bill travel through Lok Sabha and Rajya Sabha, watch ministers face Question Hour, and test what happens when the House stops trusting the government.",
  "finale": "Parliament makes the laws AND keeps the rulers on probation. Question Hour, debates and no-confidence motions are how 'rule by the people' stays honest between elections.",
  "subtitle": "Watch a government that can fall with a single vote",
  "role": "an MP inside Parliament",
  "intro": "You've won your seat. Now discover the rules of the building: who makes laws, who must answer for them, and how 543 elected people can dismiss a government before lunch.",
  "goal": "Understand the parliamentary system — legislature-executive interdependence, the two Houses, and accountability mechanisms like Question Hour and no-confidence motions."
}
};
for (const k in add) { if (cur[k]) { console.log('SKIP existing', k); } else { cur[k] = add[k]; } }
fs.writeFileSync(PATH, JSON.stringify(cur, null, 1));
console.log('total now', Object.keys(cur).length);
