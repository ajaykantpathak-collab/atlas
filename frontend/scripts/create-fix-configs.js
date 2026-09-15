// create-fix-configs.js — Create game configs for the 10 partial games that need fixing
const fs = require('fs');
const path = require('path');

const baseDir = 'D:\\dream_app\\frontend\\scripts\\game-configs';
const refFile = 'D:\\dream_app\\frontend\\components\\simulations\\chem\\WaterGame.tsx';

const games = [
  {
    name: 'CleanlinessGame', dir: 'evs',
    nodes: 'c1_evs_010 (Personal cleanliness - habits and hygiene)',
    enr: ['D:\\cisce\\evs\\enrichment\\c1_evs_enrichment_part10.marker'],
    mascot: 'Hygiene Hero Hema',
    mascotDesc: 'a friendly young health worker with a white coat, soap bar, and a sparkle of cleanliness. She wears a hairnet and has a warm smile. Custom SVG, not an owl.',
    scene: 'bathroom and hygiene scene with sky gradient, a sink with soap, a toothbrush, a towel, and sparkling clean water drops',
    svg: [['SoapIcon','a bar of soap with bubbles'],['ToothbrushIcon','a toothbrush with toothpaste'],['TowelIcon','a folded clean towel'],['NailClipperIcon','a nail clipper for cutting nails'],['CombIcon','a comb for neat hair'],['WaterDropIcon','a water drop for washing'],['CleanHandIcon','a clean hand with sparkle'],['GermsIcon','tiny germs that we wash away']],
    challenges: [
      'identify: When should we wash our hands with soap? (Before eating and after toilet vs Only at night vs Never)',
      'identify: How many times should we brush our teeth? (Twice daily - morning and night vs Once a week vs Never)',
      'identify: Why should we cut our nails? (To stop dirt and germs hiding under nails vs To look pretty vs To scratch)',
      'sort: Drag hygiene habits to the right time (Morning: brush teeth, bathe | Before eating: wash hands | After toilet: wash hands | Daily: wear clean clothes)',
      'identify: What happens if we do NOT bathe daily? (Sweat and dirt cause rashes and boils vs Nothing happens vs We get taller)',
      'identify: Why should we wear clean clothes? (Prevents rashes and boils vs To show off vs It does not matter)',
      'sort: Drag items to clean vs dirty habits (Clean: wash hands, brush teeth, bathe, clean nails | Dirty: dirty nails, unwashed hands, dirty clothes, not brushing)',
      'sort: Drag hygiene tools to what they do (Clean teeth: toothbrush | Wash hands: soap | Dry body: towel | Cut nails: nail clipper | Neat hair: comb)'
    ],
    extra: 'Teach: (1) Wash hands with soap before eating and after toilet. (2) Brush teeth twice daily - morning and night. (3) Bathe daily with soap. (4) Wear clean clothes. (5) Keep nails short and clean. (6) Comb hair. Misconceptions: "I do not need to wash hands if they look clean" (germs are invisible, wash with soap anyway), "brushing once is enough" (brush twice - morning and night), "long nails are fine" (dirt and germs hide under long nails).'
  },
  {
    name: 'PlantsGame', dir: 'evs',
    nodes: 'c1_evs_004 (Plants in my surroundings)',
    enr: ['D:\\cisce\\evs\\enrichment\\c1_evs_enrichment_part4.marker'],
    mascot: 'Gardener Gita',
    mascotDesc: 'a friendly young gardener with a straw hat, green apron, and watering can. She has a warm smile. Custom SVG, not an owl.',
    scene: 'garden scene with sky gradient, a garden bed with various plants, trees, shrubs, herbs, and butterflies',
    svg: [['TreeIcon','a tall tree with thick trunk and leaves'],['ShrubIcon','a short plant with thin woody stems'],['HerbIcon','a small plant with soft green stems'],['RootIcon','plant roots under the soil'],['StemIcon','a plant stem'],['LeafIcon','a green leaf'],['FlowerIcon','a colourful flower'],['FruitIcon','a fruit on a plant']],
    challenges: [
      'identify: Which plant is TALL with a THICK trunk? (Tree vs Shrub vs Herb)',
      'identify: Which plant is SHORT with THIN WOODY stems? (Shrub vs Tree vs Herb)',
      'identify: Which plant is SMALL with SOFT stems? (Herb vs Tree vs Shrub)',
      'sort: Drag plants to the right type (Tree: mango, banyan, neem | Shrub: rose, hibiscus | Herb: marigold, mint)',
      'identify: Which part of the plant is UNDER the soil? (Root vs Leaf vs Fruit)',
      'identify: Which part of the plant makes food using sunlight? (Leaf vs Root vs Stem)',
      'sort: Drag plant parts to what they do (Root: holds plant, drinks water | Stem: stands up, carries water | Leaf: makes food | Flower: makes seeds | Fruit: holds seeds)',
      'sort: Drag plant parts to above ground or under ground (Above: stem, leaf, flower, fruit | Under: root)'
    ],
    extra: 'Teach: (1) Plant types — trees (tall, thick trunk), shrubs (short, thin woody stems), herbs (small, soft stems). (2) Plant parts — root (under soil, holds plant, drinks water), stem (stands up, carries water), leaf (makes food), flower (colourful, makes seeds), fruit (holds seeds). Misconceptions: "small plant = herb, big plant = tree" (check stem too - rose is small but woody = shrub), "root is not a part" (root IS a part, hidden under soil), "all leaves are the same" (mango leaves are long, neem leaves are small).'
  },
  {
    name: 'PatternsGame', dir: 'maths',
    nodes: 'c1_math_027 (Simple patterns in shapes and numbers)',
    enr: ['D:\\cisce\\maths\\enrichment\\c1_maths_enrichment_part27.marker'],
    mascot: 'Pattern Pixie Milli',
    mascotDesc: 'a friendly young pattern fairy with a wand that makes shapes, colourful beads in her hair, and a warm smile. Custom SVG, not an owl.',
    scene: 'pattern scene with sky gradient, floating shapes (triangles, circles, squares), beads on a string, and number tiles',
    svg: [['TriangleIcon','a triangle shape'],['CircleIcon','a circle shape'],['SquareIcon','a square shape'],['BeadIcon','a colourful bead for patterns'],['NumberTileIcon','a number tile showing a digit'],['StarIcon','a star shape'],['HeartIcon','a heart shape'],['DiamondIcon','a diamond shape']],
    challenges: [
      'identify: What comes next in: triangle, circle, triangle, circle, ___? (Triangle vs Square vs Star)',
      'identify: What comes next in: 2, 4, 6, 8, ___? (10 vs 9 vs 11)',
      'identify: What comes next in: red, blue, red, blue, ___? (Red vs Green vs Yellow)',
      'sort: Drag shapes to complete the pattern (AB pattern: triangle goes first, circle goes second | AAB pattern: two squares then a circle)',
      'identify: What comes next in: 1, 3, 5, 7, ___? (9 vs 8 vs 10)',
      'identify: Is 3, 1, 7, 2, 9 a pattern? (No, it has no rule vs Yes, it counts vs Yes, it is a pattern)',
      'sort: Drag items to complete different patterns (AB: triangle-circle | AABB: star-star-heart-heart | ABC: red-blue-green)',
      'sort: Drag number patterns to the right rule (Count by 2: 2,4,6,8,10 | Count by 1: 1,2,3,4,5 | Count by 3: 3,6,9,12,15)'
    ],
    extra: 'Teach: (1) A pattern is when things repeat in the same order again and again. (2) Find the repeating unit (AB, AABB, ABC). (3) Number patterns count by a rule (by 1, by 2, by 3). (4) Look at the gap between numbers to find the rule. Misconceptions: "next item = last item I saw" (look at the whole repeating unit), "2,4,6,8 next is 9" (counts by 2, so 8+2=10), "any arrangement is a pattern" (a pattern must follow a repeating rule).'
  },
  {
    name: 'BalanceGame', dir: 'maths',
    nodes: 'c1_math_021 (Weight - compare heavy and light objects)',
    enr: ['D:\\cisce\\maths\\enrichment\\c1_maths_enrichment_part21.marker'],
    mascot: 'Scale Master Tara',
    mascotDesc: 'a friendly young scientist with a lab coat, a balance scale, and a magnifying glass. She has a warm smile and pigtails. Custom SVG, not an owl.',
    scene: 'balance scale scene with sky gradient, a balance scale in the center, various objects to compare, and a see-saw in the background',
    svg: [['BalanceScaleIcon','a balance scale with two pans'],['BookIcon','a heavy book'],['PencilIcon','a light pencil'],['StoneIcon','a heavy small stone'],['FeatherIcon','a light big feather'],['CottonIcon','a big light cotton ball'],['IronBallIcon','a small heavy iron ball'],['SeeSawIcon','a see-saw showing heavy and light']],
    challenges: [
      'identify: Which is HEAVIER — a book or a pencil? (Book vs Pencil vs Same)',
      'identify: Which is LIGHTER — a feather or a stone? (Feather vs Stone vs Same)',
      'identify: On a balance scale, which side goes DOWN? (The heavier side vs The lighter side vs Neither)',
      'sort: Drag objects to heavy or light (Heavy: book, stone, iron ball | Light: feather, pencil, cotton ball)',
      'identify: A big cotton ball and a small iron ball — which is heavier? (Iron ball vs Cotton ball vs Same)',
      'identify: Can we tell weight just by looking at SIZE? (No, we need to compare with balance vs Yes, bigger is always heavier vs Yes, smaller is always lighter)',
      'sort: Drag objects to the balance scale result (Goes down: heavy items | Goes up: light items | Same: equal weight items)',
      'sort: Drag comparisons to correct or incorrect (Correct: stone heavier than feather, book heavier than pencil | Incorrect: feather heavier than stone, pencil heavier than book)'
    ],
    extra: 'Teach: (1) Weight is how heavy or light something is. (2) A balance scale tips down on the heavier side. (3) Bigger does NOT always mean heavier — a small iron ball is heavier than a big cotton ball. (4) Always compare with the balance, not just by looking. Misconceptions: "bigger objects are always heavier" (big cotton ball is lighter than small iron ball), "same size = same weight" (coin and paper ball of same size weigh differently), "heavy means big" (small stone can be heavier than big feather).'
  },
  {
    name: 'AnimalsGame', dir: 'evs',
    nodes: 'c1_evs_003 (Animals in my surroundings)',
    enr: ['D:\\cisce\\evs\\enrichment\\c1_evs_enrichment_part3.marker'],
    mascot: 'Animal Lover Sonu',
    mascotDesc: 'a friendly young boy with a cap, a dog leash, and animal treats in his pocket. He has a warm smile. Custom SVG, not an owl.',
    scene: 'animal scene with sky gradient, a dog house, a cat on a fence, a cow in a field, trees, and birds flying',
    svg: [['DogIcon','a dog with floppy ears and tail'],['CatIcon','a cat with whiskers'],['CowIcon','a cow with horns and spots'],['GoatIcon','a goat with beard'],['BirdIcon','a bird with feathers and wings'],['FurIcon','fur texture showing mammal covering'],['FeatherIcon','a feather showing bird covering'],['BoneIcon','a bone for pet food']],
    challenges: [
      'identify: What sound does a DOG make? (Bark vs Meow vs Moo)',
      'identify: What sound does a CAT make? (Meow vs Bark vs Bleat)',
      'identify: What covering do BIRDS have? (Feathers vs Fur vs Scales)',
      'sort: Drag animals to the right sound (Bark: dog | Meow: cat | Moo: cow | Bleat: goat)',
      'identify: What covering do MAMMALS like dogs and cats have? (Fur vs Feathers vs Scales)',
      'identify: Where do PET animals live? (With us in our home vs In the forest vs On the street)',
      'sort: Drag animals to pet or street (Pet: dog, cat | Street: stray dog, stray cat | Both can be pets or street)',
      'sort: Drag animals to mammal or bird (Mammal: dog, cat, cow, goat | Bird: parrot, pigeon, crow, sparrow)'
    ],
    extra: 'Teach: (1) Animals are all around us — dogs, cats, cows, goats, birds. (2) Each animal has its own sound — dogs bark, cats meow, cows moo, goats bleat. (3) Mammals have fur, birds have feathers. (4) Mammals have 4 legs, birds have 2 legs and 2 wings. (5) Pets live with us, street animals live on their own. Misconceptions: "all animals make the same sound" (each has its own sound), "birds have fur" (birds have feathers, mammals have fur), "all animals are pets" (pets live with us, street animals live on their own).'
  },
  {
    name: 'SafetyGame', dir: 'evs',
    nodes: 'c1_evs_009 (Protection from accidents and hazards - safety rules)',
    enr: ['D:\\cisce\\evs\\enrichment\\c1_evs_enrichment_part9.marker'],
    mascot: 'Safety Star Sana',
    mascotDesc: 'a friendly young safety officer with a yellow vest, a whistle, a first-aid kit, and a warm smile. Custom SVG, not an owl.',
    scene: 'safety scene with sky gradient, a house with safety signs, a road with a zebra crossing, a traffic light, and a first-aid kit',
    svg: [['TrafficLightIcon','a traffic light with red, yellow, green'],['FirstAidIcon','a first-aid kit with a red cross'],['HelmetIcon','a safety helmet'],['MatchstickIcon','a matchstick (hazard)'],['KnifeIcon','a sharp knife (hazard)'],['SocketIcon','an electrical socket (hazard)'],['FootpathIcon','a footpath for safe walking'],['ZebraCrossingIcon','a zebra crossing for road safety']],
    challenges: [
      'identify: What should we do before crossing the road? (Look left-right-left and hold a grown-up hand vs Run fast vs Close eyes)',
      'identify: Should we touch matches or a lighted stove? (No, never without a grown-up vs Yes, it is fun vs Only sometimes)',
      'identify: What should we do with wet hands near electrical switches? (Keep them away vs Touch the switch vs Dry hands then touch)',
      'sort: Drag hazards to the right safety rule (Sharp objects: do not touch without grown-up | Fire: never play with matches | Electricity: keep wet hands away | Road: hold grown-up hand, use footpath)',
      'identify: Where should we walk on the road? (On the footpath vs On the road vs In the middle)',
      'identify: What should we do if we fall and get hurt? (Tell a grown-up and use first-aid vs Hide it vs Cry alone)',
      'sort: Drag items to safe vs unsafe (Safe: walk on footpath, hold hands, use zebra crossing | Unsafe: run on road, touch matches, play with knife, touch socket with wet hands)',
      'sort: Drag safety rules to the right place (Home: do not touch knife, do not play with matches | School: walk slowly on stairs, do not push | Road: use footpath, look left-right-left)'
    ],
    extra: 'Teach: (1) Sharp objects (knife, scissors, broken glass) — never touch without a grown-up. (2) Fire (matches, candles, stove) — never play with matches or go near a lighted stove. (3) Electricity (switches, sockets) — keep wet hands away, never put fingers in a socket. (4) Falls (stairs, chairs, wet floor) — walk slowly on stairs, never climb furniture. (5) Road (cars, buses) — hold a grown-up hand, walk on footpath, look left-right-left. Misconceptions: "a small matchstick cannot do any harm" (a single matchstick can light curtains in seconds), "wet hands are fine for switches" (water conducts electricity, keep wet hands away), "running on stairs is fun" (walking slowly on stairs prevents falls).'
  },
  {
    name: 'FoodGame', dir: 'evs',
    nodes: 'c1_evs_006 (My need for food - types of food, healthy food)',
    enr: ['D:\\cisce\\evs\\enrichment\\c1_evs_enrichment_part6.marker'],
    mascot: 'Chef Chintu',
    mascotDesc: 'a friendly young chef with a white hat, apron, a wooden spoon, and a warm smile. Custom SVG, not an owl.',
    scene: 'kitchen scene with sky gradient through a window, a table with food items, a plate with healthy food, and a fruit basket',
    svg: [['RiceIcon','a bowl of rice (energy-giving)'],['RotiIcon','a roti bread (energy-giving)'],['MilkIcon','a glass of milk (body-building)'],['EggIcon','an egg (body-building)'],['AppleIcon','an apple (protective)'],['CarrotIcon','a carrot (protective)'],['ChipsIcon','a chips packet (junk food)'],['ChocolateIcon','a chocolate bar (junk food)']],
    challenges: [
      'identify: Which food gives us ENERGY to play? (Rice and roti vs Apple vs Milk)',
      'identify: Which food helps us GROW tall and strong? (Milk and dal vs Chips vs Chocolate)',
      'identify: Which food protects us from getting sick? (Fruits and vegetables vs Cold drink vs Chips)',
      'sort: Drag foods to the right group (Energy-giving: rice, roti, potato, butter | Body-building: milk, dal, egg, paneer | Protective: orange, apple, banana, carrot, spinach)',
      'identify: Is eating too much chips and chocolate good for us? (No, it is junk food vs Yes, it is healthy vs Only on Mondays)',
      'identify: Why do we need food? (For energy, growth, and protection vs To play games vs To sleep)',
      'sort: Drag foods to healthy or junk (Healthy: rice, milk, apple, carrot, dal | Junk: chips, chocolate, cold drink, candy)',
      'sort: Drag food groups to what they do (Energy-giving: gives power to play | Body-building: helps grow tall and strong | Protective: guards from getting sick | Junk: tasty but too much sugar, salt, or oil)'
    ],
    extra: 'Teach: (1) Food is fuel for our body. (2) Three food groups — energy-giving (rice, roti, potato, butter), body-building (milk, dal, egg, paneer), protective (fruits and vegetables). (3) Junk food (chips, chocolate, cold drink, candy) is tasty but has too much sugar, salt, or oil — eat less. Misconceptions: "junk food is healthy because it tastes good" (junk food has too much sugar, salt, oil — eat less), "only milk makes us strong" (all body-building foods help — milk, dal, egg, paneer), "fruits are not important" (fruits and vegetables protect us from getting sick).'
  },
  {
    name: 'AdditionGame', dir: 'maths',
    nodes: 'c1_math_010 (Addition and subtraction up to 20, in steps)',
    enr: ['D:\\cisce\\maths\\enrichment\\c1_maths_enrichment_part10.marker'],
    mascot: 'Math Whiz Bunty',
    mascotDesc: 'a friendly young math wizard with a cap with numbers, a pencil behind his ear, and a warm smile. Custom SVG, not an owl.',
    scene: 'math scene with sky gradient, a number line on the ground, mangoes and toffees as counting objects, and floating plus and minus signs',
    svg: [['MangoIcon','a mango for counting'],['ToffeeIcon','a toffee for counting'],['PlusSignIcon','a plus sign for addition'],['MinusSignIcon','a minus sign for subtraction'],['NumberLineIcon','a number line from 1 to 20'],['BasketIcon','a basket for collecting items'],['AppleIcon','an apple for counting'],['NumberBlockIcon','a number block showing a digit']],
    challenges: [
      'identify: 3 mangoes + 4 mangoes = ? (7 vs 8 vs 6)',
      'identify: 8 toffees - 3 toffees = ? (5 vs 6 vs 4)',
      'identify: On a number line, to ADD we hop... (Forward vs Backward vs Up)',
      'sort: Drag addition problems to the right answer (3+4=7 | 5+5=10 | 2+6=8 | 9+3=12)',
      'identify: On a number line, to SUBTRACT we hop... (Backward vs Forward vs Down)',
      'identify: 7 + 0 = ? (7 vs 0 vs 8)',
      'sort: Drag subtraction problems to the right answer (8-3=5 | 10-4=6 | 9-2=7 | 12-5=7)',
      'sort: Drag mixed problems to addition or subtraction (Addition: 3+4, 5+5, 2+6 | Subtraction: 8-3, 10-4, 9-2)'
    ],
    extra: 'Teach: (1) Addition is putting two groups together and counting all. (2) Subtraction is taking some away. (3) Number line — hop forward to add, hop backward to subtract. (4) Count on: 3+4 means start at 3, count 4 more: 4,5,6,7. (5) Count back: 8-3 means start at 8, count back 3: 7,6,5. Misconceptions: "adding means any bigger number" (the sum must be the exact count), "subtraction always gives 1" (subtraction takes away the stated amount), "subtract bigger from smaller" (always start with the bigger number).'
  },
  {
    name: 'CountingGame', dir: 'maths',
    nodes: 'c1_math_001 (Numbers and numerals from 1 to 20)',
    enr: ['D:\\cisce\\maths\\enrichment\\c1_maths_enrichment_part1.marker'],
    mascot: 'Apple Lover Piku',
    mascotDesc: 'a friendly young girl with pigtails, a basket, and a love for apples. She has a warm smile. Custom SVG, not an owl.',
    scene: 'apple orchard scene with sky gradient, an apple tree with red apples, a basket, and floating number cards',
    svg: [['AppleIcon','a red apple'],['AppleTreeIcon','an apple tree with apples'],['BasketIcon','a basket for collecting apples'],['NumberCardIcon','a number card showing a digit'],['OneIcon','the number 1'],['FiveIcon','the number 5'],['TenIcon','the number 10'],['TwentyIcon','the number 20']],
    challenges: [
      'identify: How many apples are in a group of 5? (5 vs 4 vs 6)',
      'identify: Which number comes after 7? (8 vs 6 vs 9)',
      'identify: Which is MORE — 11 or 9? (11 vs 9 vs Same)',
      'sort: Drag number cards in order from 1 to 10 (1, 2, 3, 4, 5, 6, 7, 8, 9, 10)',
      'identify: What is the number after 15? (16 vs 14 vs 17)',
      'identify: Which is the BIGGEST number? (20 vs 12 vs 2)',
      'sort: Drag numbers to before or after (Before 5: 4, 3, 2, 1 | After 5: 6, 7, 8, 9, 10)',
      'sort: Drag numbers to teens or single digits (Single: 1, 5, 9 | Teens: 11, 15, 19)'
    ],
    extra: 'Teach: (1) A number tells HOW MANY things there are. (2) A numeral is the symbol we write (7, 15). (3) Count by touching each thing once and saying one number name. (4) Numbers 1-20 in order. (5) 11 is more than 9 even though 9 looks bigger. Misconceptions: "number and numeral are the same" (number is the idea, numeral is the symbol), "count in any order" (touch each thing once, say one number name in order), "9 is bigger than 11" (11 has two digits, it is more than 9).'
  },
  {
    name: 'ShapeSortGame', dir: 'maths',
    nodes: 'c1_math_013 (Sorting shapes), c1_math_016 (2D shapes - rectangle, square, triangle, circle)',
    enr: ['D:\\cisce\\maths\\enrichment\\c1_maths_enrichment_part13.marker', 'D:\\cisce\\maths\\enrichment\\c1_maths_enrichment_part16.marker'],
    mascot: 'Shape Sorter Riku',
    mascotDesc: 'a friendly young boy with a cap, a shape sorting box, and colourful shapes in his hands. He has a warm smile. Custom SVG, not an owl.',
    scene: 'shape scene with sky gradient, a shape sorting box with holes, floating shapes (circle, square, triangle, rectangle), and colourful blocks',
    svg: [['CircleIcon','a circle shape'],['SquareIcon','a square shape'],['TriangleIcon','a triangle shape'],['RectangleIcon','a rectangle shape'],['ShapeBoxIcon','a shape sorting box with holes'],['StarShapeIcon','a star shape (not a triangle)'],['BallIcon','a ball (3D, not a circle)'],['BangleIcon','a bangle that traces a circle']],
    challenges: [
      'identify: Which shape has 3 sides? (Triangle vs Square vs Circle)',
      'identify: Which shape has 4 EQUAL sides? (Square vs Rectangle vs Triangle)',
      'identify: Which shape is ROUND with no sides? (Circle vs Square vs Triangle)',
      'sort: Drag shapes to the right bin (3 sides: triangle | 4 equal sides: square | 4 unequal sides: rectangle | Round: circle)',
      'identify: How many sides does a RECTANGLE have? (4 vs 3 vs 0)',
      'identify: Is a square a special rectangle? (Yes, both have 4 sides but square has all equal vs No, they are different vs Only sometimes)',
      'sort: Drag shapes to 2D or not 2D (2D: circle, square, triangle, rectangle | Not 2D: ball (3D sphere), cone (3D))',
      'sort: Drag shapes by number of sides (3 sides: triangle | 4 sides: square, rectangle | 0 sides: circle)'
    ],
    extra: 'Teach: (1) A rectangle has 4 sides — opposite sides equal. (2) A square has 4 equal sides. (3) A triangle has 3 sides. (4) A circle is round — no sides, no corners. (5) A square IS a special rectangle. (6) 2D shapes are flat (circle, square, triangle, rectangle). Misconceptions: "square and rectangle are completely different" (a square IS a special rectangle), "circle is the same as a ball" (a ball is 3D, a circle is flat), "triangle is anything pointed" (a triangle has exactly 3 sides and 3 corners).'
  }
];

for (const g of games) {
  const config = {
    gameTitle: g.name,
    outputFile: `D:\\dream_app\\frontend\\components\\simulations\\${g.dir}\\${g.name}.tsx`,
    enrichmentFiles: g.enr,
    referenceFile: refFile,
    cisceNodes: g.nodes,
    mascotName: g.mascot,
    mascotDescription: g.mascotDesc,
    sceneDescription: g.scene,
    svgObjects: g.svg.map(s => ({ name: s[0], description: s[1] })),
    challengeTypes: g.challenges,
    extraInstructions: `IMPORTANT: Do NOT use speechManager.speak() anywhere in the game. Only use audioManager.play() for sound effects. Valid sound effects: pickup, drop-correct, drop-wrong, tap, success, error, celebration, hint. ${g.extra} Default width=720, height=560. Use named export (export function ${g.name}), NOT export default. Export interface ${g.name}Props with width?, height?, onComplete?: (score: number) => void.`
  };
  const configPath = path.join(baseDir, `fix-${g.name.toLowerCase()}.json`);
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log(`Created: ${configPath}`);
}
console.log(`\nCreated ${games.length} config files`);
