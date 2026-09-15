/**
 * Class 4 sims — EVS (Looking Around Class 4).
 * Themes: transport, animals & birds, plants, water, farming,
 * food, shelter, diversity, environment.
 */
import type { SimDef } from '../engine/types';

export const c4Transport: SimDef = {
    id: 'c4_transport', title: 'Going to School', subtitle: 'How do we travel?',
    classLevel: 4, subject: 'evs', topic: 'Transport',
    chapters: ['Looking Around-4 Ch1: Going to School', 'Ch8: Reaching Grandmother\'s House'],
    emoji: '🚌', theme: { bg: 'from-sky-100 to-blue-200', accent: 'sky', scene: 'transport' },
    scenario: { role: "a transport-expert", intro: "Land, water, air — every way to travel!", goal: "Sort all transport." },
    discovery: {
        question: "How do children cross a river to reach school where there is no bridge?",
        options: ["Ropeway or boat!", "They swim", "Cannot go"],
        answer: "Ropeway or boat!",
        hook: "People travel amazing ways! Let's explore transport.",
    },
    teaching: [
        { title: 'So Many Ways to Travel! 🚌', text: 'Walk, cycle, bus, boat, camel cart, even a ropeway over a river! Children travel many ways to school.', emoji: '🚌', bgColor: 'from-sky-400 to-blue-500' },
        { title: 'Travel by Land 🚲', text: 'Bicycles, buses, bullock carts, camels — land transport uses wheels or feet!', emoji: '🚲', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Travel by Water & Air ⛵', text: 'Boats and ferries cross rivers. Aeroplanes fly through the sky. Some children even cross water to reach school!', emoji: '⛵', bgColor: 'from-indigo-400 to-violet-500' },
    ],
    explore: { widget: "tray", prompt: "Sort transport — land, water, air!" },
    challenges: [
        { type: 'sort', question: 'Sort: LAND, WATER, or AIR transport?', options: [],
          sortItems: [
            { id: 't1', label: 'Bicycle', emoji: '🚲', correctBin: 'land' },
            { id: 't2', label: 'Boat', emoji: '⛵', correctBin: 'water' },
            { id: 't3', label: 'Aeroplane', emoji: '✈️', correctBin: 'air' },
            { id: 't4', label: 'Bus', emoji: '🚌', correctBin: 'land' },
            { id: 't5', label: 'Ship', emoji: '🚢', correctBin: 'water' },
          ],
          bins: [ { id: 'land', label: 'Land 🚲', color: '#ca8a04' }, { id: 'water', label: 'Water ⛵', color: '#3b82f6' },
                  { id: 'air', label: 'Air ✈️', color: '#8b5cf6' } ],
          hint: 'On the ground, on water, or in the sky?',
          misconception: 'Bicycle & bus = land. Boat & ship = water. Aeroplane = air!',
          workedExample: ['Ground = land.', 'Water = water.', 'Sky = air.'] },
        { type: 'mcq', question: 'In some places children cross a river using a...', answer: 'Ropeway or boat', options: ['Train', 'Ropeway or boat', 'Aeroplane'],
          hint: 'A rope stretched across the river!', misconception: 'Where there are no bridges, children use ropeways or boats to cross rivers!',
          workedExample: ['No bridge = cross by rope or boat.', 'Ropeway or boat.'] },
        { type: 'mcq', question: 'Which is the SLOWEST way to travel?', answer: 'Walking', options: ['Walking', 'Bus', 'Train'],
          hint: 'No wheels, no engine!', misconception: 'Walking is slowest — engines and wheels go much faster!',
          workedExample: ['Walking uses only feet.', 'Slowest way.'] },
    ],
    reflect: { prompts: ['What surprised you?', 'Tell a friend one thing you learned!'] },
    successLine: 'Travel star! ⭐', tryAgainLine: 'Land, water, or air?',
};

export const c4Animals: SimDef = {
    id: 'c4_animals', title: 'Ear to Ear', subtitle: 'Ears, hair, feathers!',
    classLevel: 4, subject: 'evs', topic: 'Animals and Birds',
    chapters: ['Looking Around-4 Ch2: Ear to Ear', 'Ch3: A Day with Nandu', 'Ch11: The Valley of Flowers'],
    emoji: '🦜', theme: { bg: 'from-green-100 to-emerald-200', accent: 'green', scene: 'animals' },
    scenario: { role: "an animal-scientist", intro: "Hair, feathers, scales — sort the coverings!", goal: "Classify every animal." },
    discovery: {
        question: "Does a fish have hair, feathers, or something else?",
        options: ["Scales - hard plates!", "Hair", "Feathers"],
        answer: "Scales - hard plates!",
        hook: "Each covering protects its animal! Let's sort them.",
    },
    teaching: [
        { title: 'Look at Their Ears! 🦜', text: 'Some animals have big ears you can see, some have tiny ear-holes, some have none you can see. Look ear to ear!', emoji: '🦜', bgColor: 'from-green-400 to-emerald-500' },
        { title: 'Skin, Hair, Feathers 🐊', text: 'Elephants have thick skin, dogs have hair, birds have feathers, fish have scales. Each covering protects them!', emoji: '🐊', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Big and Small 🐘', text: 'Nandu the elephant is huge! Animals come in all sizes — from an ant to a whale!', emoji: '🐘', bgColor: 'from-sky-400 to-blue-500' },
    ],
    // lexicon-driven: fresh sort + odd-one-out + which each run
    generate: {
        kind: 'lex', count: 5, level: 4,
        data: { kind: 'sort', sample: 4,
            bins: [ { id: 'hair', label: 'Hair/Fur 🐕', color: '#ca8a04' }, { id: 'feathers', label: 'Feathers 🦜', color: '#ec4899' },
                    { id: 'scales', label: 'Scales 🐟', color: '#06b6d4' } ],
            items: [
                { id: 'an1', label: 'Dog', emoji: '🐕', correctBin: 'hair' }, { id: 'an2', label: 'Sparrow', emoji: '🐦', correctBin: 'feathers' },
                { id: 'an3', label: 'Fish', emoji: '🐟', correctBin: 'scales' }, { id: 'an4', label: 'Cat', emoji: '🐈', correctBin: 'hair' },
                { id: 'an5', label: 'Parrot', emoji: '🦜', correctBin: 'feathers' }, { id: 'an6', label: 'Snake', emoji: '🐍', correctBin: 'scales' },
                { id: 'an7', label: 'Cow', emoji: '�', correctBin: 'hair' }, { id: 'an8', label: 'Crow', emoji: '🐦‍⬛', correctBin: 'feathers' },
                { id: 'an9', label: 'Lizard', emoji: '🦎', correctBin: 'scales' }, { id: 'an10', label: 'Horse', emoji: '🐴', correctBin: 'hair' },
            ] },
    },
    explore: { widget: "tray", prompt: "Sort animals by covering!" },
    challenges: [
        { type: 'mcq', question: 'Which animal has ears you CANNOT easily see?', answer: 'Bird', options: ['Elephant', 'Bird', 'Dog'],
          hint: 'Covered by feathers!', misconception: 'Bird ears are hidden under feathers — tiny ear-holes, not flaps!',
          workedExample: ['Birds have feathers covering ears.', 'Ears hidden.'] },
        { type: 'mcq', question: 'A fish\'s body is covered with...', answer: 'Scales', options: ['Hair', 'Scales', 'Feathers'],
          hint: 'Shiny overlapping plates!', misconception: 'Fish have scales — hard plates that protect them in water!',
          workedExample: ['Fish live in water.', 'Scales protect them.'] },
        { type: 'mcq', question: 'Mammals are covered with...', answer: 'Hair', options: ['Scales', 'Hair', 'Feathers'],
          hint: 'Cows, dogs, us!', misconception: 'Mammals have hair — scales are fish/reptiles, feathers are birds!',
          workedExample: ['Mammal → hair.', 'Fish → scales.', 'Bird → feathers.'] },
    ],
    reflect: { prompts: ['What surprised you?', 'Tell a friend one thing you learned!'] },
    successLine: 'Animal expert! ⭐', tryAgainLine: 'Hair, feathers, or scales?',
};

export const c4Trees: SimDef = {
    id: 'c4_trees', title: 'The Story of Amrita', subtitle: 'Save the trees!',
    classLevel: 4, subject: 'evs', topic: 'Trees and Environment',
    chapters: ['Looking Around-4 Ch4: The Story of Amrita', 'Ch21: Food and Fun'],
    emoji: '🌳', theme: { bg: 'from-emerald-100 to-green-200', accent: 'emerald', scene: 'trees' },
    scenario: { role: "a forest-guardian", intro: "Trees give air, homes, food — protect them!", goal: "Learn why trees matter." },
    discovery: {
        question: "If someone came to cut the trees near your home, what could you do?",
        options: ["Protect them - like Amrita hugged them!", "Nothing", "Help cut"],
        answer: "Protect them - like Amrita hugged them!",
        hook: "Trees give us air and homes - let's learn why we save them.",
    },
    teaching: [
        { title: 'Amrita Saved the Trees! 🌳', text: 'Amrita hugged the Khejadi trees so the king\'s men could not cut them. Trees give us life — protect them!', emoji: '🌳', bgColor: 'from-emerald-400 to-green-500' },
        { title: 'Trees Give Us 🍃', text: 'Oxygen to breathe, fruits to eat, shade to rest, wood to build, homes for birds!', emoji: '🍃', bgColor: 'from-lime-400 to-green-500' },
        { title: 'A Tree is a World 🌍', text: 'One tree is home to birds, insects, squirrels. Cutting one tree destroys many homes!', emoji: '🌍', bgColor: 'from-sky-400 to-blue-500' },
    ],
    explore: { lab: "grow", prompt: "Grow a forest — what do trees need?" },
    challenges: [
        { type: 'mcq', question: 'Why did Amrita hug the trees?', answer: 'To save them from being cut', options: ['To climb them', 'To save them from being cut', 'She was cold'],
          hint: 'The king\'s men wanted to cut them!', misconception: 'Amrita hugged the trees to protect them — the Chipko idea of saving trees by hugging!',
          workedExample: ['Men came to cut trees.', 'Amrita hugged them.', 'To save them.'] },
        { type: 'mcq', question: 'Which gas do trees give us to breathe?', answer: 'Oxygen', options: ['Carbon dioxide', 'Oxygen', 'Smoke'],
          hint: 'We breathe it in!', misconception: 'Trees make oxygen — the air we need to live!',
          workedExample: ['Trees breathe in CO₂.', 'Give out oxygen.', 'We breathe it.'] },
        { type: 'mcq', question: 'What happens if we cut all the trees?', answer: 'No oxygen, no homes, soil washes away', options: ['Nothing changes', 'No oxygen, no homes, soil washes away', 'More space to play'],
          hint: 'Think of everything trees do!', misconception: 'Cutting trees means no oxygen, animals lose homes, soil erodes — disaster!',
          workedExample: ['Trees give oxygen.', 'Trees are animal homes.', 'Roots hold soil.', 'Losing them = disaster.'] },
    ],
    reflect: { prompts: ['What surprised you?', 'Tell a friend one thing you learned!'] },
    successLine: 'Tree protector! ⭐', tryAgainLine: 'Trees give life!',
};

export const c4WaterBodies: SimDef = {
    id: 'c4_waterbodies', title: 'A River\'s Tale', subtitle: 'Too much, too little!',
    classLevel: 4, subject: 'evs', topic: 'Water and Rivers',
    chapters: ['Looking Around-4 Ch13: A River\'s Tale', 'Ch19: Too Much Water, Too Little Water'],
    emoji: '🏞️', theme: { bg: 'from-cyan-100 to-blue-200', accent: 'cyan', scene: 'river' },
    scenario: { role: "a river-keeper", intro: "Rivers flood and dry — learn their power!", goal: "Understand water bodies." },
    discovery: {
        question: "Can the SAME river bring too much water one year and too little another?",
        options: ["Yes - flood and drought!", "No always same", "Only flood"],
        answer: "Yes - flood and drought!",
        hook: "Rivers give life but can flood or dry up! Let's learn.",
    },
    teaching: [
        { title: 'The River\'s Journey 🏞️', text: 'A river starts small in the mountains, grows big, and meets the sea. It gives water to everyone on the way!', emoji: '🏞️', bgColor: 'from-cyan-400 to-blue-500' },
        { title: 'Too Much Water! 🌊', text: 'Floods come when too much rain falls — water fills homes and fields. Dangerous!', emoji: '🌊', bgColor: 'from-indigo-400 to-violet-500' },
        { title: 'Too Little Water! 🏜️', text: 'Drought comes when no rain falls — crops dry, animals thirst. Water must be saved!', emoji: '🏜️', bgColor: 'from-amber-400 to-orange-500' },
    ],
    explore: { lab: "cycle", prompt: "Try the lab — what do you discover?" },
    challenges: [
        { type: 'mcq', question: 'Where does a river usually begin?', answer: 'In the mountains', options: ['In the sea', 'In the mountains', 'In a city'],
          hint: 'Melting snow and rain high up!', misconception: 'Rivers start high in mountains — from melting snow and rain!',
          workedExample: ['Water flows downhill.', 'Starts high = mountains.'] },
        { type: 'mcq', question: 'A flood happens when there is...', answer: 'Too much water', options: ['No water', 'Too much water', 'Just enough water'],
          hint: 'Water overflows!', misconception: 'Flood = too much water overflowing into homes and fields!',
          workedExample: ['Heavy rain.', 'Water overflows.', 'Flood.'] },
        { type: 'mcq', question: 'A drought happens when there is...', answer: 'No rain for a long time', options: ['Too much rain', 'No rain for a long time', 'Snow only'],
          hint: 'Dry land, no water!', misconception: 'Drought = no rain for long — crops dry and water runs out!',
          workedExample: ['No rain.', 'Land dries.', 'Drought.'] },
        { type: 'mcq', question: 'How can we save water at home?', answer: 'Turn off taps and fix leaks', options: ['Leave taps running', 'Turn off taps and fix leaks', 'Waste it'],
          hint: 'Every drop counts!', misconception: 'Small habits — closing taps, fixing leaks, reusing water — save lots of water!',
          workedExample: ['Turn off taps.', 'Fix leaks.', 'Save water.'] },
    ],
    reflect: { prompts: ['What surprised you?', 'Tell a friend one thing you learned!'] },
    successLine: 'River friend! ⭐', tryAgainLine: 'Save every drop!',
};

export const c4Farm: SimDef = {
    id: 'c4_farm', title: 'Basva\'s Farm', subtitle: 'From seed to food!',
    classLevel: 4, subject: 'evs', topic: 'Farming and Food',
    chapters: ['Looking Around-4 Ch14: Basva\'s Farm', 'Ch15: From Market to Home', 'Ch20: Abdul in the Garden'],
    emoji: '🌾', theme: { bg: 'from-yellow-100 to-amber-200', accent: 'amber', scene: 'farm' },
    scenario: { role: "a farm-tracker", intro: "Food travels farm to plate — trace the journey!", goal: "Follow every food path." },
    discovery: {
        question: "Does food just appear in the market - or does it travel a long way?",
        options: ["Farm to market to home!", "Appears in market", "Made in shop"],
        answer: "Farm to market to home!",
        hook: "Many hands bring your food! Let's follow the journey.",
    },
    teaching: [
        { title: 'Life on a Farm! 🌾', text: 'Basva\'s farm grows onions. Seeds are sown, plants watered, crop harvested, then taken to market!', emoji: '🌾', bgColor: 'from-amber-400 to-yellow-500' },
        { title: 'Tools of Farming 🚜', text: 'Plough the soil, sow the seeds, water the field, harvest the crop — each step needs the right tool!', emoji: '🚜', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Farm to Market to Home 🏪', text: 'Food travels from the farm to the market to your home. Many people work to bring your food!', emoji: '🏪', bgColor: 'from-sky-400 to-blue-500' },
    ],
    explore: { widget: "tray", prompt: "Trace food from farm to plate!" },
    challenges: [
        { type: 'order', question: 'Put the farming steps in order!', options: [],
          sortItems: [
            { id: 'f1', label: 'Harvest crop', emoji: '🌾', correctBin: 's4' },
            { id: 'f2', label: 'Plough soil', emoji: '🚜', correctBin: 's1' },
            { id: 'f3', label: 'Water plants', emoji: '💧', correctBin: 's3' },
            { id: 'f4', label: 'Sow seeds', emoji: '🌱', correctBin: 's2' },
          ],
          bins: [ { id: 's1', label: '1st', color: '#ca8a04' }, { id: 's2', label: '2nd', color: '#16a34a' },
                  { id: 's3', label: '3rd', color: '#3b82f6' }, { id: 's4', label: '4th', color: '#ec4899' } ],
          hint: 'Prepare soil first, harvest last!',
          misconception: 'Order: plough → sow → water → harvest!',
          workedExample: ['Plough the soil.', 'Sow the seeds.', 'Water them.', 'Harvest the crop.'] },
        { type: 'mcq', question: 'What does a plough do?', answer: 'Turns and loosens the soil', options: ['Waters the plants', 'Turns and loosens the soil', 'Harvests the crop'],
          hint: 'First step of farming!', misconception: 'A plough turns and loosens soil so seeds can grow!',
          workedExample: ['Plough = soil tool.', 'Loosens the earth.'] },
        { type: 'mcq', question: 'How does food reach your home?', answer: 'Farm → market → home', options: ['Farm → market → home', 'Magically appears', 'Made in the kitchen'],
          hint: 'Many hands work to bring food!', misconception: 'Food travels farm → market → home — farmers, drivers, sellers all help!',
          workedExample: ['Grown on farm.', 'Sold at market.', 'Bought for home.'] },
    ],
    reflect: { prompts: ['What surprised you?', 'Tell a friend one thing you learned!'] },
    successLine: 'Farmer friend! ⭐', tryAgainLine: 'Soil first, then seeds!',
};

export const c4Food: SimDef = {
    id: 'c4_food', title: 'Food and Fun', subtitle: 'Eating together!',
    classLevel: 4, subject: 'evs', topic: 'Food and Festivals',
    chapters: ['Looking Around-4 Ch16: A Busy Month', 'Ch20: Eating Together', 'Ch24: Spicy Riddles'],
    emoji: '🍛', theme: { bg: 'from-rose-100 to-orange-200', accent: 'rose', scene: 'food' },
    scenario: { role: "a festival-host", intro: "Festivals bring food and togetherness!", goal: "Learn food and festivals." },
    discovery: {
        question: "Why do people eat TOGETHER at festivals - is it just about food?",
        options: ["Sharing brings people together!", "Only hunger", "No reason"],
        answer: "Sharing brings people together!",
        hook: "Food is about love and togetherness! Let's learn.",
    },
    teaching: [
        { title: 'Food Brings Us Together! 🍛', text: 'Festivals, weddings, langars — we eat together. Sharing food is sharing love!', emoji: '🍛', bgColor: 'from-rose-400 to-orange-500' },
        { title: 'Foods of India 🗺️', text: 'Every region has its food — dosa in the south, sarson da saag in the north, fish curry in the east!', emoji: '🗺️', bgColor: 'from-sky-400 to-blue-500' },
        { title: 'Spices and Riddles 🌶️', text: 'Turmeric, chilli, cumin — spices make food tasty and are in every spicy riddle!', emoji: '🌶️', bgColor: 'from-amber-400 to-red-500' },
    ],
    explore: { widget: "tray", prompt: "Sort festival foods!" },
    challenges: [
        { type: 'mcq', question: 'Why do we eat together at festivals?', answer: 'Sharing food brings people together', options: ['Only because we are hungry', 'Sharing food brings people together', 'There is no reason'],
          hint: 'It is about togetherness!', misconception: 'Eating together builds community — food is about sharing and love!',
          workedExample: ['Festivals = togetherness.', 'Shared food = shared joy.'] },
        { type: 'mcq', question: 'Dosa and idli are foods from which part of India?', answer: 'South India', options: ['North India', 'South India', 'West India'],
          hint: 'Rice and coconut region!', misconception: 'Dosa and idli are South Indian — made from rice and lentils!',
          workedExample: ['Dosa = South India.', 'Rice-based food.'] },
        { type: 'mcq', question: 'Turmeric makes food...', answer: 'Yellow', options: ['Blue', 'Yellow', 'Green'],
          hint: 'The yellow spice!', misconception: 'Turmeric is the yellow spice — used in curries!',
          workedExample: ['Turmeric = yellow powder.', 'Makes food yellow.'] },
    ],
    reflect: { prompts: ['What surprised you?', 'Tell a friend one thing you learned!'] },
    successLine: 'Foodie star! ⭐', tryAgainLine: 'Food brings us together!',
};

export const c4Diversity: SimDef = {
    id: 'c4_diversity', title: 'Home and Abroad', subtitle: 'Different but same!',
    classLevel: 4, subject: 'evs', topic: 'Diversity and Community',
    chapters: ['Looking Around-4 Ch22: The World in my Home', 'Ch25: Home and Abroad', 'Ch27: Chuskit Goes to School'],
    emoji: '🌍', theme: { bg: 'from-indigo-100 to-purple-200', accent: 'indigo', scene: 'diversity' },
    scenario: { role: "a unity-builder", intro: "Different people, foods, languages — India's strength!", goal: "Celebrate diversity." },
    discovery: {
        question: "Is it better if everyone is the same - or different?",
        options: ["Different is wonderful!", "Same is best", "Does not matter"],
        answer: "Different is wonderful!",
        hook: "Different friends, foods, languages - that is India's strength!",
    },
    teaching: [
        { title: 'So Many Ways to Live! 🌍', text: 'Different clothes, foods, languages, homes — India has so many ways of living, and all are wonderful!', emoji: '🌍', bgColor: 'from-indigo-400 to-purple-500' },
        { title: 'Everyone Can Learn 📚', text: 'Chuskit could not walk, but she still went to school. Everyone deserves a chance to learn!', emoji: '📚', bgColor: 'from-sky-400 to-blue-500' },
        { title: 'Brave Helpers 🎖️', text: 'Defence Officer Wahida served our country. People do brave and different jobs everywhere!', emoji: '🎖️', bgColor: 'from-rose-400 to-pink-500' },
    ],
    explore: { widget: "tray", prompt: "Celebrate different things!" },
    challenges: [
        { type: 'mcq', question: 'India has many languages, foods, and clothes. This shows...', answer: 'Rich diversity — all wonderful', options: ['Everyone should be the same', 'Rich diversity — all wonderful', 'Only one way is right'],
          hint: 'Different is beautiful!', misconception: 'India\'s many ways of living are its strength — diversity is wonderful!',
          workedExample: ['Many languages, foods.', 'Different = rich culture.', 'Diversity is wonderful.'] },
        { type: 'mcq', question: 'Chuskit could not walk. What did she still do?', answer: 'Went to school', options: ['Stayed home forever', 'Went to school', 'Gave up'],
          hint: 'She did not give up!', misconception: 'Chuskit went to school — everyone can learn with help and ramps!',
          workedExample: ['She could not walk.', 'Still went to school.', 'Everyone can learn.'] },
        { type: 'mcq', question: 'Why is it good to have friends who are different from us?', answer: 'We learn new things from each other', options: ['It is not good', 'We learn new things from each other', 'We should only have same friends'],
          hint: 'Different friends teach us!', misconception: 'Different friends show us new foods, games, and ideas — diversity teaches us!',
          workedExample: ['Different friends share different things.', 'We learn from each other.'] },
    ],
    reflect: { prompts: ['What surprised you?', 'Tell a friend one thing you learned!'] },
    successLine: 'Kind friend! ⭐', tryAgainLine: 'Different is wonderful!',
};

export const class4EvsSims: SimDef[] = [
    c4Transport, c4Animals, c4Trees, c4WaterBodies, c4Farm, c4Food, c4Diversity,
];
