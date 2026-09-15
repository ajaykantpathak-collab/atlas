const fs = require('fs');
const PATH = 'D:/platform/frontend/components/sims_v2/tools/authored/c8_c10.json';
const cur = JSON.parse(fs.readFileSync(PATH, 'utf8'));
const add = {
"c10_geo_ch07": {
  "discovery": {
    "question": "India has roads, railways, waterways, airways and even pipelines. A fisherman's catch, a software engineer's commute and crude oil bound for a refinery all travel differently — yet the chapter calls ALL of them 'lifelines.' What makes a mode of transport earn that title?",
    "options": ["It links production centres with consumption centres — moving goods, people and services so the economy actually functions", "It must be government-owned and nationally funded", "Only modes that cross state borders count as lifelines", "It must carry passengers, not just cargo"],
    "answer": "It links production centres with consumption centres — moving goods, people and services so the economy actually functions",
    "hook": "A mango that can't reach a market is just a falling fruit. Transport is what turns geography into an economy — every mode is a different kind of vein in the same body."
  },
  "mission": "Route a week of Indian life — farm produce to mandis, coal to power plants, crude through pipelines, passengers by rail and air — and match each cargo to the mode that fits it best.",
  "finale": "Roads knit villages to towns, rails move the bulk, pipes flow invisibly underground. Together they are why a country this size behaves like one economy.",
  "subtitle": "Move a nation's goods across five kinds of lifelines",
  "role": "a national logistics planner",
  "intro": "A fish caught in Kerala, a passenger flying to Delhi, gas flowing under Gujarat — all of it is transport doing one job: connecting where things are made to where they are needed.",
  "goal": "Compare the five modes of transport and communication in India, and explain why each earns the title 'lifeline of the national economy.'"
},
"c10_hist_ch01": {
  "discovery": {
    "question": "Before 1789, a Frenchman's loyalty belonged to his king and his region. After the Revolution, he was a 'citoyen' of 'la patrie' — saluting a tricolour and singing the Marseillaise. What did the Revolution actually invent?",
    "options": ["The idea of the nation: a community of equal citizens bound by shared rights and symbols, not by obedience to a monarch", "The world's first written constitution anywhere in history", "Voting rights for every adult including women and the poor", "The French language itself as a tool of unity"],
    "answer": "The idea of the nation: a community of equal citizens bound by shared rights and symbols, not by obedience to a monarch",
    "hook": "Kings ruled subjects; nations are made of citizens. France didn't just change rulers in 1789 — it changed what people felt they belonged to."
  },
  "mission": "Watch Europe redraw itself: track how one revolution's ideas of nation and citizenship spread, collide with empires, and forge Germany and Italy out of dozens of fragments.",
  "finale": "A flag, an anthem, uniform laws — nationalism was manufactured as deliberately as any machine. Europe spent a century living with the consequences.",
  "subtitle": "Follow one idea as it remade a whole continent's map",
  "role": "a correspondent tracing revolutions across 19th-century Europe",
  "intro": "In 1789 Paris crowds stormed a fortress and invented a new political word: citizen. Within decades, students in secret societies, artists painting allegories, and revolutionaries like Mazzini and Garibaldi were all chasing the same idea.",
  "goal": "Explain how the French Revolution birthed nationalism, how it spread through Europe, and how culture and revolution together unified Germany and Italy."
},
"c10_hist_ch02": {
  "discovery": {
    "question": "During the First World War, India sent soldiers, money and supplies for Britain, and Britain hinted at self-rule in return. Right after the war, Indians got the Rowlatt Act — detention without trial. What did this betrayal prove to Indian nationalists?",
    "options": ["Loyalty and petitions wouldn't win freedom — only mass mobilisation would, setting the stage for Gandhi's movements", "Britain had always planned to leave India by 1920 anyway", "Indians should have supported the Central Powers instead", "The Rowlatt Act was a printing error quickly withdrawn"],
    "answer": "Loyalty and petitions wouldn't win freedom — only mass mobilisation would, setting the stage for Gandhi's movements",
    "hook": "India paid for the war in soldiers and taxes, and was repaid with a law that jailed dissent without trial. The mask slipped — and nationalism shifted from drawing rooms to the streets."
  },
  "mission": "Relive 1915–1947's turning points: from the Rowlatt Act's betrayal through Jallianwala Bagh, the salt march and Quit India — and feel how a subject population became a movement.",
  "finale": "Nationalism in India wasn't born in a conference hall — it was forged by broken promises, a massacre in a walled garden, and a 240-mile walk to make salt.",
  "subtitle": "March from loyalty to mass rebellion in thirty turbulent years",
  "role": "a young Indian deciding whether to join the freedom struggle",
  "intro": "You grew up hearing that loyalty to the Empire would earn India its due. Then came wartime taxes, the Rowlatt Act, and the sound of firing at Jallianwala Bagh — and a thin man with a staff asking you to march for salt.",
  "goal": "Connect wartime hardship to the rise of Gandhian mass movements and explain how each phase — Non-Cooperation, Civil Disobedience, Quit India — widened the struggle."
},
"c10_hist_ch03": {
  "discovery": {
    "question": "Long before airplanes or the internet, Chinese silk reached Rome, Buddhism walked into China, and the humble potato crossed an ocean to change Indian kitchens forever. What made all this movement possible centuries ago?",
    "options": ["The Silk Routes — a shifting network of land and sea paths carrying goods, religions, technologies and even diseases across Afro-Eurasia", "A single paved highway built by one empire from China to Rome", "Viking longships that traded directly with India", "Camel post offices that delivered parcels door to door"],
    "answer": "The Silk Routes — a shifting network of land and sea paths carrying goods, religions, technologies and even diseases across Afro-Eurasia",
    "hook": "The 'Silk Road' was never one road and carried far more than silk — faiths, gunpowder, paper, plagues. Globalisation didn't start with the internet; it started with caravans and monsoon winds."
  },
  "mission": "Travel three thousand years of connection: ride the Silk Routes, sail with the monsoon winds, watch the Americas feed and plague the Old World, and see how indenture rebuilt empire's workforce.",
  "finale": "The global world wasn't discovered in 1492 — it was stitched together by traders, monks, sailors and slaves long before. Columbus just changed the stitching.",
  "subtitle": "Trace how trade, food and disease built one connected world",
  "role": "a trader's apprentice crossing ancient routes",
  "intro": "Your caravan carries silk and spices, but the real cargo is invisible — ideas, faiths and microbes hitching a ride. You are travelling the network that made the world global centuries before the word existed.",
  "goal": "Understand the Silk Routes, the Columbian Exchange, and how trade, migration and disease forged the modern global world."
},
"c10_hist_ch04": {
  "discovery": {
    "question": "Decades before steam factories roared, European merchants were already organising mass production — in peasant cottages. Farm families wove cloth at home with merchant-supplied yarn between harvest seasons. Why did merchants choose cottages over factories?",
    "options": ["It was proto-industrialisation: cheap rural labour with idle seasons let merchants produce for distant markets without building factories or fighting guilds", "Peasants were legally forbidden from entering towns", "Factories hadn't been invented anywhere in the world yet", "Cottage cloth was always higher quality than machine cloth"],
    "answer": "It was proto-industrialisation: cheap rural labour with idle seasons let merchants produce for distant markets without building factories or fighting guilds",
    "hook": "Industrialisation didn't begin with the factory whistle — it began quietly in farmhouses, where a loom sat beside the kitchen and a merchant's cart collected the finished cloth."
  },
  "mission": "Follow cloth through the industrial revolution: from peasant cottages under the putting-out system to Manchester's steam mills — and then to colonial India, where Indian weavers met machine competition.",
  "finale": "The factory didn't invent industrial labour; it reorganised it. And when machines outproduced hands, entire artisan worlds — including India's — paid the price.",
  "subtitle": "Watch production move from farmhouse loom to steam-powered mill",
  "role": "a merchant's agent turned industrial-age observer",
  "intro": "You supply yarn to cottage weavers across the countryside — until one day a smoky brick building with a steam engine outproduces a hundred villages. Industrialisation has arrived, and nothing stays the same.",
  "goal": "Explain proto-industrialisation, the rise of factories, and how industrialisation transformed both Britain and colonial India."
},
"c10_hist_ch05": {
  "discovery": {
    "question": "The world's oldest dated printed book — the Diamond Sutra, 868 CE — was made in China by carving text into wooden blocks, centuries before Gutenberg. If printing was this old, why did it take so long to change the world?",
    "options": ["Woodblock printing was slow and craft-bound; only cheap paper, movable type and mass literacy turned print into a revolution", "China kept the technique a total state secret until 1900", "Ancient people simply had nothing worth printing", "Woodblocks could only print pictures, never words"],
    "answer": "Woodblock printing was slow and craft-bound; only cheap paper, movable type and mass literacy turned print into a revolution",
    "hook": "Carving a block for every page was art, not industry. The explosion came when type could be rearranged and reused — suddenly ideas travelled faster than the people who had them."
  },
  "mission": "Follow print from carved Chinese blocks to Gutenberg's press to colonial India — where newspapers argued, reformers fought, and a scared Raj tried to censor it all.",
  "finale": "Print didn't just copy books faster — it created publics, arguments and revolutions. Every protest pamphlet and newspaper you see is Gutenberg's echo.",
  "subtitle": "Watch a carved block of wood set the modern world arguing",
  "role": "a printer's apprentice watching ideas go viral — on paper",
  "intro": "In a workshop in China, a carver cuts characters backwards into wood. A thousand years later, presses in India churn out newspapers the British wish would disappear. Same invention, new world.",
  "goal": "Trace print's journey from East Asia to Europe to India, and explain how print culture fuelled religion, reform and nationalism."
},
"c10_math_ch01": {
  "discovery": {
    "question": "Take any number — 60, 867, even a million — and break it into primes. The Fundamental Theorem of Arithmetic swears you'll always land on the exact same set of primes, no matter how you split it. Why is this 'obvious' fact actually powerful?",
    "options": ["Because unique prime factorisation lets us prove things like √2 is irrational and compute HCF and LCM with certainty", "Because it proves every number is secretly prime", "Because it shows multiplication and division are the same operation", "Because without it, calculators couldn't multiply"],
    "answer": "Because unique prime factorisation lets us prove things like √2 is irrational and compute HCF and LCM with certainty",
    "hook": "Primes are the atoms of arithmetic — and this theorem says every number has exactly ONE chemical formula. That uniqueness is what makes proofs about irrational numbers possible."
  },
  "mission": "Put numbers on trial: crack them into prime factors, use Euclid's lemma to hunt HCFs, and then prove — with airtight logic — that √2 can never be written as a fraction.",
  "finale": "Every integer is a one-of-a-kind prime recipe. Once you see that, irrational numbers stop being mysterious — they're just numbers that can't fit the recipe.",
  "subtitle": "Break numbers into atoms and catch irrationals red-handed",
  "role": "a number detective",
  "intro": "Someone claims √2 is just a fraction nobody has found yet. Your job: use the unique-prime-factorisation law to prove them mathematically impossible.",
  "goal": "Apply the Fundamental Theorem of Arithmetic and Euclid's division lemma to find HCF/LCM and to prove irrationality."
},
"c10_math_ch02": {
  "discovery": {
    "question": "Graph the polynomial y = x² − 4. It crosses the x-axis at exactly two spots: −2 and +2. A friend claims a cubic MUST cross the axis three times. Your graph of x³ − 2x² + x crosses only twice-ish. Who's right?",
    "options": ["Neither — a degree-n polynomial can cross AT MOST n times, but sometimes fewer, because zeros can repeat or be non-real", "The friend — cubics always cross exactly three times", "You — all cubics cross exactly twice", "Graphs can't tell us anything about zeros at all"],
    "answer": "Neither — a degree-n polynomial can cross AT MOST n times, but sometimes fewer, because zeros can repeat or be non-real",
    "hook": "The x-axis crossings ARE the zeros made visible. A parabola that just kisses the axis has one zero; one that misses it entirely has none — the picture tells you before the algebra does."
  },
  "mission": "Read polynomial graphs like an X-ray: count x-axis crossings to find real zeros, then connect those zeros back to the coefficients hiding inside the equation.",
  "finale": "Zeros aren't just answers — they're where the graph lives or misses on the x-axis. Once you see it, sum and product of zeros stop being random formulas.",
  "subtitle": "See where curves cross the axis — that's where the zeros hide",
  "role": "a curve-reading analyst",
  "intro": "A wavy line on graph paper is secretly a list of answers: every place it touches the x-axis is a zero of the polynomial. Your job is to read the picture, then check it with algebra.",
  "goal": "Connect the geometry of polynomial graphs to real zeros, and use the relationships between zeros and coefficients."
},
"c10_math_ch03": {
  "discovery": {
    "question": "Two friends offer mobile plans: Plan A costs ₹50 + ₹2/min, Plan B costs ₹100 + ₹1/min. Graphed as lines, they cross at one magic point — 50 minutes. What does that crossing point actually tell a customer?",
    "options": ["The unique solution where both plans cost the same — the exact usage where switching makes no difference", "The cheapest possible bill on either plan", "The point where both companies go bankrupt", "The maximum minutes either plan allows"],
    "answer": "The unique solution where both plans cost the same — the exact usage where switching makes no difference",
    "hook": "Two equations, two lines. Intersecting lines = one answer, parallel lines = no answer, coincident lines = infinite answers. Geometry does the solving before algebra even starts."
  },
  "mission": "Solve real dilemmas with two variables at once: plot both equations, read their crossing, then verify with substitution and elimination — and spot the sneaky cases with no solution or infinitely many.",
  "finale": "Every pair of linear equations is two conditions negotiating. One crossing means a deal, parallel means impasse, overlapping means anything goes.",
  "subtitle": "Find the exact point where two conditions agree",
  "role": "a comparison shopper decoding rival offers",
  "intro": "Two phone plans, two taxi fares, two age puzzles — life keeps handing you pairs of conditions at once. Each pair is two straight lines, and the answer lives where they meet — or explains why they never do.",
  "goal": "Solve pairs of linear equations graphically and algebraically, and classify them as consistent, inconsistent or dependent."
},
"c10_math_ch04": {
  "discovery": {
    "question": "A javelin's height follows h = −5t² + 20t. Ask 'when does it land?' and you're solving a quadratic — one answer at takeoff (t = 0), one at landing (t = 4). Why does this single question get TWO answers?",
    "options": ["Because a quadratic's graph is a parabola — a horizontal line can meet it twice, once, or not at all, matching the discriminant's verdict", "Because time flows forwards and backwards simultaneously", "Because the javelin secretly lands twice in reality", "Because all equations in physics give double answers"],
    "answer": "Because a quadratic's graph is a parabola — a horizontal line can meet it twice, once, or not at all, matching the discriminant's verdict",
    "hook": "The discriminant b² − 4ac is a fortune-teller: positive means two landings, zero means a perfect graze, negative means the event never happens. Two answers isn't a bug — it's parabola geometry."
  },
  "mission": "Solve quadratics three different ways — factorisation, completing the square, and the formula — then let the discriminant predict whether your answers even exist before you compute them.",
  "finale": "Projectile paths, profit curves, area puzzles — all parabolas in disguise. Master the discriminant and you can predict the number of answers before doing any solving.",
  "subtitle": "Predict how many answers an equation has before solving it",
  "role": "a problem-solver decoding curved paths",
  "intro": "Rockets, rain gutters and rectangular fields all ask the same question: given ax² + bx + c = 0, when does it hit zero? Your tools: factoring, completing the square, and one famous formula.",
  "goal": "Solve quadratic equations by three methods and use the discriminant to predict the nature of roots."
},
"c10_math_ch05": {
  "discovery": {
    "question": "A salary starts at ₹20,000 and rises by ₹1,500 every year. A savings jar gets ₹10 more each week. A staircase adds one step per floor. What single test reveals all three follow the same hidden pattern?",
    "options": ["Check if consecutive terms differ by the same fixed number — if yes, it's an arithmetic progression with a predictable nth term", "Check if every term is a prime number", "Check if each term doubles the previous one", "Check if the digits of each term add to nine"],
    "answer": "Check if consecutive terms differ by the same fixed number — if yes, it's an arithmetic progression with a predictable nth term",
    "hook": "Fixed increments hide everywhere — EMIs, seating rows, savings plans. Spot the constant difference and the 100th term is a formula away, no counting needed."
  },
  "mission": "Hunt the common difference in real-world lists, predict the 50th or 100th term without writing them all, and sum entire progressions with a two-line formula.",
  "finale": "An AP is a straight line wearing a sequence's clothes. Find a and d, and every term — and every total — surrenders to one formula each.",
  "subtitle": "Predict term 1000 of a pattern without counting past 5",
  "role": "a pattern hunter",
  "intro": "Your pocket money grows by a fixed amount, the cinema rows add fixed seats, your repayments shrink by a fixed sum. Somewhere in these lists is one magic number — d — that controls everything.",
  "goal": "Identify arithmetic progressions, apply the nth term and sum formulas, and model real situations with APs."
},
"c10_math_ch06": {
  "discovery": {
    "question": "Your photo on a passport, on a stamp and on a billboard — same face, wildly different sizes. A geometry teacher calls all three 'similar.' Your friend insists only same-sized figures can 'match.' Who's using the word correctly?",
    "options": ["The teacher — similar means same shape (equal angles, proportional sides); same size makes them congruent, a special case of similar", "The friend — similar always meant identical in maths", "Both — similar and congruent are synonyms in geometry", "Neither — photos can't be studied geometrically"],
    "answer": "The teacher — similar means same shape (equal angles, proportional sides); same size makes them congruent, a special case of similar",
    "hook": "Congruent is just similar with a zoom of exactly 1×. Every scaled map, blueprint and film projection runs on similarity — same angles, stretched sides."
  },
  "mission": "Prove triangles similar using AA, SSS and SAS tests, then weaponise the result: measure a tower's height from its shadow and dissect why Pythagoras falls out of similarity.",
  "finale": "Similarity is why a 1-cm map can describe a 1-km city honestly. Keep the angles, scale the sides, and the shape survives every zoom.",
  "subtitle": "Measure a tower you'll never climb — using only its shadow",
  "role": "a surveyor with only a stick and sunlight",
  "intro": "You can't climb the tower, but its shadow is lying right there on the ground. If you can prove your stick's triangle is similar to the tower's, one proportion does the measuring for you.",
  "goal": "Distinguish similar from congruent, apply similarity criteria to prove triangle relationships, and use them to solve real measurement problems."
},
"c10_math_ch07": {
  "discovery": {
    "question": "Two cities sit at map coordinates (2, 3) and (7, 6). A friend measures the gap with a ruler and guesses 'about 6 cm.' You get the exact answer without any ruler — just Pythagoras. What's the trick?",
    "options": ["Treat the segment as a hypotenuse: the horizontal and vertical gaps are legs, so distance = √[(7−2)² + (6−3)²] = √34", "Add the x and y coordinates of both points together", "Count grid squares diagonally between the cities", "Distance between coordinates is impossible without measuring"],
    "answer": "Treat the segment as a hypotenuse: the horizontal and vertical gaps are legs, so distance = √[(7−2)² + (6−3)²] = √34",
    "hook": "Coordinate geometry turns maps into algebra. Every distance formula is just Pythagoras wearing coordinates — subtract, square, add, root."
  },
  "mission": "Turn a coordinate plane into a measuring lab: find distances between points, divide segments in exact ratios, and compute triangle areas — proving shapes are what you claim they are.",
  "finale": "Descartes' grid let geometry and algebra finally talk. Any question about lengths, midpoints or areas becomes arithmetic once the points have addresses.",
  "subtitle": "Give every point an address, then do geometry by arithmetic",
  "role": "a map analyst working purely in numbers",
  "intro": "A map with no scale, no ruler, no compass — just coordinates. Your job is to measure distances, find exact division points, and prove a triangle is isosceles using nothing but x's and y's.",
  "goal": "Apply the distance, section and area formulas, and verify geometric properties of figures through coordinates."
},
"c10_math_ch08": {
  "discovery": {
    "question": "Draw a tiny right triangle and a giant one, both with the same 30° angle. Measure the opposite side ÷ hypotenuse in each — you get exactly 0.5 both times. How can triangles of different sizes give the identical ratio?",
    "options": ["Same angle means similar triangles — all sides scale together, so any side ratio depends only on the angle, never the size", "It's a coincidence — bigger triangles normally give bigger ratios", "30° is special; no other angle behaves this way", "The hypotenuse doesn't actually change when scaled"],
    "answer": "Same angle means similar triangles — all sides scale together, so any side ratio depends only on the angle, never the size",
    "hook": "That's the entire magic of trigonometry: sin, cos and tan are 'angle fingerprints.' Pin down the angle and the ratios are fixed forever, no matter how big the triangle."
  },
  "mission": "Build sin, cos and tan from scratch, memorise the standard-angle table by reasoning rather than rote, and use identities like sin²θ + cos²θ = 1 to simplify fierce-looking expressions.",
  "finale": "Trigonometry is just three ratios that every angle carries like ID cards. Once you trust that, identities stop being formulas and start being facts.",
  "subtitle": "Discover why every angle has its own fixed fingerprints",
  "role": "a ratio detective in right triangles",
  "intro": "An angle walks into a right triangle and leaves three numbers behind: opposite/hypotenuse, adjacent/hypotenuse, opposite/adjacent. They never change for that angle — and that's the whole game.",
  "goal": "Define and compute trigonometric ratios, evaluate standard angles, and use fundamental identities to simplify expressions."
},
"c10_math_ch09": {
  "discovery": {
    "question": "You stand 50 m from a tower and tilt your head up 30° to see its top. A classmate starts climbing to measure it directly. Who gets the height first — and how?",
    "options": ["You — tan 30° = height ÷ 50 gives the answer (~28.9 m) from a single angle and a single distance, no climbing needed", "The classmate — indirect methods are always rough estimates", "Neither — you also need the tower's shadow length", "You — but only if you also measure the angle of depression"],
    "answer": "You — tan 30° = height ÷ 50 gives the answer (~28.9 m) from a single angle and a single distance, no climbing needed",
    "hook": "Angle of elevation plus one ground distance secretly builds a whole right triangle. Trigonometry lets you 'measure' heights that no tape can reach."
  },
  "mission": "Survey the unclimbable: compute heights of towers, widths of rivers and depths of valleys using only angles of elevation and depression — and learn to spot which ratio fits which problem.",
  "finale": "Every squint upward at a building is a hidden right triangle. Read the angle, pace the ground, and tan does the climbing for you.",
  "subtitle": "Measure skyscrapers and rivers with nothing but angles",
  "role": "a field surveyor armed with a clinometer",
  "intro": "Your instruments: a protractor-like clinometer, a measuring tape, and trigonometry. Your targets: things nobody can reach — treetops, towers, the far bank of a river.",
  "goal": "Distinguish angle of elevation from depression, set up correct right triangles from word problems, and solve height-and-distance cases."
}
};
for (const k in add) { if (cur[k]) { console.log('SKIP existing', k); } else { cur[k] = add[k]; } }
fs.writeFileSync(PATH, JSON.stringify(cur, null, 1));
console.log('total now', Object.keys(cur).length);
