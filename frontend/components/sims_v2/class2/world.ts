/**
 * Class 2 sims — World Around Us themes (leveled up from Class 1).
 * Seasons & weather, animal homes, food sources, helpers, directions,
 * games we play — matching Class 2 integrated EVS units.
 */
import type { SimDef } from '../engine/types';

export const c2Seasons: SimDef = {
    id: 'c2_seasons', title: 'Seasons and Weather', subtitle: 'Hot, cold, rainy!',
    classLevel: 2, subject: 'evs', topic: 'Seasons',
    chapters: ['World Around Us: Seasons'],
    emoji: '🌦️', theme: { bg: 'from-gold-100 to-gold-200', accent: 'sky', scene: 'seasons' },
    scenario: { role: "a weather-watcher", intro: "Seasons change weather, food, and clothes!", goal: "Match seasons to their signs." },
    discovery: {
        question: "Do we wear the same clothes in summer and winter?",
        options: ["No - season changes clothes!", "Yes always same", "Only color changes"],
        answer: "No - season changes clothes!",
        hook: "Seasons change what we wear and eat! Let's learn.",
    },
    observe: { prompt: "What changes with each season?", options: ["Clothes, food, weather", "Only the sun", "Nothing"], answer: "Clothes, food, weather" },
    teaching: [
        { title: 'Three Main Seasons! 🌦️', text: 'India has three main seasons: summer (hot), monsoon (rainy), and winter (cold). Each changes what we wear and eat!', emoji: '🌦️', bgColor: 'from-gold-400 to-gold-500' },
        { title: 'Summer ☀️', text: 'Hot and sunny! We wear cotton clothes, drink nimbu pani, and eat mangoes and ice cream!', emoji: '☀️', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Monsoon 🌧️', text: 'Rain, rain! We carry umbrellas, wear raincoats, and watch frogs jump and peacocks dance!', emoji: '🌧️', bgColor: 'from-gold-400 to-gold-500' },
        { title: 'Winter ❄️', text: 'Cold days! We wear woolen sweaters, drink hot milk, and eat peanuts and gajak!', emoji: '❄️', bgColor: 'from-gold-400 to-gold-500' },
    ],
    explore: { lab: "grow", prompt: "Give the plant sun or water — what does each season bring?" },
    challenges: [
        { type: 'sort', question: 'Sort things by the season they belong to!', options: [],
          sortItems: [
            { id: 'sn1', label: 'Mango', emoji: '🥭', correctBin: 'summer' },
            { id: 'sn2', label: 'Umbrella', emoji: '☂️', correctBin: 'monsoon' },
            { id: 'sn3', label: 'Sweater', emoji: '🧶', correctBin: 'winter' },
            { id: 'sn4', label: 'Ice cream', emoji: '🍦', correctBin: 'summer' },
            { id: 'sn5', label: 'Raincoat', emoji: '🧥', correctBin: 'monsoon' },
          ],
          bins: [ { id: 'summer', label: 'Summer ☀️', color: '#f59e0b' }, { id: 'monsoon', label: 'Monsoon 🌧️', color: '#3b82f6' },
                  { id: 'winter', label: 'Winter ❄️', color: '#60a5fa' } ],
          hint: 'Hot, rainy, or cold?',
          misconception: 'Mango & ice cream = summer. Umbrella & raincoat = monsoon. Sweater = winter!',
          workedExample: ['Think of the weather.', 'Match each thing to its season.'] },
        { type: 'mcq', question: 'Which animal loves the monsoon and dances in rain?', answer: 'Peacock', options: ['Dog', 'Peacock', 'Cat'],
          hint: 'It has beautiful feathers!', misconception: 'Peacocks dance when rain comes — a famous monsoon sight!',
          workedExample: ['Monsoon = rain.', 'Peacocks dance in rain.'] },
        { type: 'mcq', question: 'What should we wear in winter?', answer: 'Woolen sweater', options: ['Cotton shirt', 'Woolen sweater', 'Swimsuit'],
          hint: 'What keeps you warm?', misconception: 'Wool keeps us warm in winter — cotton is for summer!',
          workedExample: ['Winter = cold.', 'Wool keeps warmth.', 'Woolen sweater.'] },
        { type: 'interact', question: "Grow the monsoon plant!", options: [],
          interactGoal: { instruction: 'sun=60 water=90', widget: 'grow', validate: 'grow:sun=60,water=90' },
          hint: 'Do it on the widget!', misconception: 'Make the widget match the goal exactly!',
          workedExample: ['Read the goal.', 'Adjust the widget.', 'Check it!'] },

    ],
    reflect: { prompts: ['What surprised you?', 'Tell a friend one thing you learned!'] },
    successLine: 'Weather watcher! ⭐', tryAgainLine: 'Which season?',
};

export const c2Homes: SimDef = {
    id: 'c2_homes', title: 'Animal Homes', subtitle: 'Where do they live?',
    classLevel: 2, subject: 'evs', topic: 'Animal Homes',
    chapters: ['World Around Us: Animal Homes'],
    emoji: '🏠', theme: { bg: 'from-amber-100 to-orange-200', accent: 'amber', scene: 'homes' },
    scenario: { role: "a home-finder", intro: "Every animal has a home — nest, den, burrow!", goal: "Match animals to homes." },
    discovery: {
        question: "Does a bird live in a kennel - or does every animal have its OWN home?",
        options: ["Each has its own home!", "Bird in kennel", "Any home"],
        answer: "Each has its own home!",
        hook: "Nests, dens, hives, burrows - every animal has its home!",
    },
    teaching: [
        { title: 'Every Animal Has a Home! 🏠', text: 'Birds live in nests, dogs in kennels, lions in dens, bees in hives. Each home suits the animal!', emoji: '🏠', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Homes in Nature 🌳', text: 'Nests in trees, burrows underground, webs on corners, hives on branches — nature builds many homes!', emoji: '🌳', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'We Build Homes Too 🏗️', text: 'We build homes for our animals — cowsheds for cows, stables for horses, aquariums for fish!', emoji: '🏗️', bgColor: 'from-gold-400 to-gold-500' },
    ],
    explore: { widget: "tray", prompt: "Match animals to their homes!" },
    challenges: [
        { type: 'sort', question: 'Match each animal to its home!', options: [],
          sortItems: [
            { id: 'h1', label: 'Bird', emoji: '🐦', correctBin: 'nest' },
            { id: 'h2', label: 'Bee', emoji: '🐝', correctBin: 'hive' },
            { id: 'h3', label: 'Lion', emoji: '🦁', correctBin: 'den' },
            { id: 'h4', label: 'Spider', emoji: '🕷️', correctBin: 'web' },
            { id: 'h5', label: 'Fish', emoji: '🐟', correctBin: 'water' },
          ],
          bins: [ { id: 'nest', label: 'Nest 🪺', color: '#ca8a04' }, { id: 'hive', label: 'Hive 🍯', color: '#f59e0b' },
                  { id: 'den', label: 'Den 🕳️', color: '#78716c' }, { id: 'web', label: 'Web 🕸️', color: '#64748b' },
                  { id: 'water', label: 'Water 🌊', color: '#3b82f6' } ],
          hint: 'Where does each one live?',
          misconception: 'Bird→nest, bee→hive, lion→den, spider→web, fish→water!',
          workedExample: ['Bird → nest.', 'Bee → hive.', 'Lion → den.', 'Spider → web.', 'Fish → water.'] },
        { type: 'mcq', question: 'Where does a rabbit live?', answer: 'In a burrow underground', options: ['In a nest', 'In a burrow underground', 'On a web'],
          hint: 'It digs in the ground!', misconception: 'Rabbits dig burrows — tunnels under the ground are their homes!',
          workedExample: ['Rabbits dig.', 'Underground tunnels = burrows.'] },
        { type: 'mcq', question: 'A cowshed is a home for...', answer: 'Cows', options: ['Hens', 'Cows', 'Dogs'],
          hint: 'The name gives it away!', misconception: 'Cowshed = cow + shed — a shelter we build for cows!',
          workedExample: ['Break the word: cow + shed.', 'Shed = shelter.', 'Home for cows.'] },
        { type: 'interact', question: "How many homes? Count 5!", options: [],
          interactGoal: { instruction: 'Tray shows 5', widget: 'tray', validate: 'tray:count=5' },
          hint: 'Do it on the widget!', misconception: 'Make the widget match the goal exactly!',
          workedExample: ['Read the goal.', 'Adjust the widget.', 'Check it!'] },

    ],
    reflect: { prompts: ['What surprised you?', 'Tell a friend one thing you learned!'] },
    successLine: 'Home expert! ⭐', tryAgainLine: 'Think where they live!',
};

export const c2Helpers: SimDef = {
    id: 'c2_helpers', title: 'People Who Help Us', subtitle: 'Community helpers!',
    classLevel: 2, subject: 'evs', topic: 'Community Helpers',
    chapters: ['World Around Us: Helpers'],
    emoji: '👨‍⚕️', theme: { bg: 'from-gold-100 to-gold-200', accent: 'blue', scene: 'helpers' },
    scenario: { role: "a community-helper", intro: "Farmers, doctors, teachers — everyone helps!", goal: "Learn who does what." },
    discovery: {
        question: "Who grows the food on your plate - the cook or someone before?",
        options: ["The farmer!", "The cook only", "The shopkeeper"],
        answer: "The farmer!",
        hook: "Many helpers work before food reaches us! Let's meet them.",
    },
    teaching: [
        { title: 'Helpers All Around! 👨‍⚕️', text: 'Doctors, teachers, police, farmers, sweepers, drivers — many people help us every day!', emoji: '👨‍⚕️', bgColor: 'from-gold-400 to-gold-500' },
        { title: 'Each Has a Tool 🧰', text: 'A doctor has a stethoscope, a farmer has a plough, a teacher has a blackboard, a cobbler has leather tools!', emoji: '🧰', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Thank Our Helpers 🙏', text: 'Helpers work hard for us. Say thank you, be polite, and respect every job!', emoji: '🙏', bgColor: 'from-rose-400 to-pink-500' },
    ],
    explore: { widget: "tray", prompt: "Match helpers to their tools!" },
    challenges: [
        { type: 'sort', question: 'Match the helper to their tool!', options: [],
          sortItems: [
            { id: 'hp1', label: 'Doctor', emoji: '👨‍⚕️', correctBin: 'steth' },
            { id: 'hp2', label: 'Farmer', emoji: '👨‍🌾', correctBin: 'plough' },
            { id: 'hp3', label: 'Teacher', emoji: '👩‍🏫', correctBin: 'board' },
            { id: 'hp4', label: 'Barber', emoji: '💇', correctBin: 'scissors' },
          ],
          bins: [ { id: 'steth', label: 'Stethoscope 🩺', color: '#3b82f6' }, { id: 'plough', label: 'Plough 🚜', color: '#ca8a04' },
                  { id: 'board', label: 'Blackboard 📋', color: '#64748b' }, { id: 'scissors', label: 'Scissors ✂️', color: '#ec4899' } ],
          hint: 'What does each helper use?',
          misconception: 'Doctor→stethoscope, farmer→plough, teacher→blackboard, barber→scissors!',
          workedExample: ['Doctor → stethoscope.', 'Farmer → plough.', 'Teacher → blackboard.', 'Barber → scissors.'] },
        { type: 'mcq', question: 'Who grows our food?', answer: 'Farmer', options: ['Doctor', 'Farmer', 'Driver'],
          hint: 'Works in the fields!', misconception: 'Farmers grow crops in fields — they feed everyone!',
          workedExample: ['Food grows on farms.', 'Farmers work the fields.', 'Farmer.'] },
        { type: 'mcq', question: 'Who keeps our streets clean?', answer: 'Sweeper', options: ['Teacher', 'Sweeper', 'Pilot'],
          hint: 'They clean every morning!', misconception: 'Sweepers clean streets and public places — an important job!',
          workedExample: ['Who cleans streets?', 'The sweeper.'] },
        { type: 'interact', question: "Helpers: count 4!", options: [],
          interactGoal: { instruction: 'Tray shows 4', widget: 'tray', validate: 'tray:count=4' },
          hint: 'Do it on the widget!', misconception: 'Make the widget match the goal exactly!',
          workedExample: ['Read the goal.', 'Adjust the widget.', 'Check it!'] },

    ],
    reflect: { prompts: ['What surprised you?', 'Tell a friend one thing you learned!'] },
    successLine: 'Helper hero! ⭐', tryAgainLine: 'What do they do?',
};

export const c2Directions: SimDef = {
    id: 'c2_directions', title: 'Near, Far and Directions', subtitle: 'Left, right, up, down!',
    classLevel: 2, subject: 'evs', topic: 'Directions and Positions',
    chapters: ['World Around Us: Directions'],
    emoji: '🧭', theme: { bg: 'from-green-100 to-emerald-200', accent: 'green', scene: 'directions' },
    scenario: { role: "a navigator", intro: "North, south, east, west — find your way!", goal: "Use directions correctly." },
    discovery: {
        question: "The sun rises every morning in the same direction - which way?",
        options: ["East!", "West", "North"],
        answer: "East!",
        hook: "Sun rises in the East - a direction we can always find!",
    },
    teaching: [
        { title: 'Left and Right! 🧭', text: 'Your LEFT hand makes an L shape. Your RIGHT hand writes. Know your left from right!', emoji: '🧭', bgColor: 'from-green-400 to-emerald-500' },
        { title: 'Up, Down, Near, Far ⬆️', text: 'Up is above, down is below. Near is close, far is away. These words tell us where things are!', emoji: '⬆️', bgColor: 'from-gold-400 to-gold-500' },
        { title: 'Directions ☀️', text: 'The sun rises in the EAST and sets in the WEST. East, West, North, South are the four directions!', emoji: '☀️', bgColor: 'from-amber-400 to-orange-500' },
    ],
    explore: { lab: "jump", prompt: "Hop the directions — north, south, east, west!" },
    challenges: [
        { type: 'mcq', question: 'The sun rises in which direction?', answer: 'East', options: ['West', 'East', 'North'],
          hint: 'Morning sun!', misconception: 'The sun always rises in the East — East is where mornings begin!',
          workedExample: ['Morning = sunrise.', 'Sunrise direction = East.'] },
        { type: 'mcq', question: 'The sun sets in which direction?', answer: 'West', options: ['East', 'West', 'South'],
          hint: 'Evening sun goes down!', misconception: 'The sun sets in the West — opposite of where it rises!',
          workedExample: ['Evening = sunset.', 'Sunset direction = West.'] },
        { type: 'mcq', question: 'Your LEFT hand makes which letter shape?', answer: 'L', options: ['R', 'L', 'J'],
          hint: 'L for Left!', misconception: 'Left hand thumb + finger makes an L — L for Left!',
          workedExample: ['Hold up your left hand.', 'It makes an L shape.', 'L = Left.'] },
        { type: 'mcq', question: '"The cat is far from the tree" means the cat is...', answer: 'Away from the tree', options: ['Next to the tree', 'Away from the tree', 'Under the tree'],
          hint: 'Far = not close!', misconception: 'Far means away — near means close!',
          workedExample: ['Far = away.', 'The cat is away from the tree.'] },
        { type: 'interact', question: "Hop 6 steps to the shop!", options: [],
          interactGoal: { instruction: 'Frog to 6', widget: 'jump', validate: 'jump:pos=6' },
          hint: 'Do it on the widget!', misconception: 'Make the widget match the goal exactly!',
          workedExample: ['Read the goal.', 'Adjust the widget.', 'Check it!'] },

    ],
    reflect: { prompts: ['What surprised you?', 'Tell a friend one thing you learned!'] },
    successLine: 'Direction star! ⭐', tryAgainLine: 'Sun rises in the...?',
};

export const class2WorldSims: SimDef[] = [
    c2Seasons, c2Homes, c2Helpers, c2Directions,
];
