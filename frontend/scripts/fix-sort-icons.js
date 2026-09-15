// fix-sort-icons.js — Replace emoji in SortCard with custom SVG icons
// For each Class 1 game, adds a renderSortIcon helper and wires it into SortCard

const fs = require('fs');
const path = require('path');

const class1Dir = 'D:\\dream_app\\frontend\\components\\simulations\\class1';

// Mapping: game file name → array of [keywordPattern, IconComponentName]
// The renderSortIcon function will check if item.id includes the keyword
const iconMaps = {
  'AdditionGame.tsx': [
    ['mango', 'MangoIcon'], ['toffee', 'ToffeeIcon'], ['apple', 'AppleIcon'],
    ['add', 'MangoIcon'], ['sub', 'ToffeeIcon'], ['a1', 'MangoIcon'], ['a2', 'MangoIcon'],
    ['a3', 'AppleIcon'], ['a4', 'AppleIcon'], ['m1', 'ToffeeIcon'], ['m2', 'ToffeeIcon'],
    ['s1', 'ToffeeIcon'], ['s2', 'ToffeeIcon'], ['s3', 'AppleIcon'], ['s4', 'AppleIcon'],
  ],
  'AirGame.tsx': [
    ['balloon', 'BalloonIcon'], ['kite', 'KiteIcon'], ['windmill', 'WindmillIcon'],
    ['bottle', 'BottleIcon'], ['tree', 'TreeIcon'], ['factory', 'FactoryIcon'],
    ['breathe', 'TreeIcon'], ['breeze', 'WindmillIcon'], ['car', 'FactoryIcon'],
    ['clean', 'TreeIcon'], ['dirty', 'FactoryIcon'], ['fly', 'KiteIcon'],
    ['has-air', 'BalloonIcon'], ['no-air', 'BottleIcon'], ['rock', 'BottleIcon'],
    ['sealed', 'BottleIcon'], ['spin', 'WindmillIcon'], ['wind', 'WindmillIcon'],
  ],
  'AnimalsGame.tsx': [
    ['dog', 'DogIcon'], ['bark', 'DogIcon'], ['cat', 'CatIcon'], ['meow', 'CatIcon'],
    ['cow', 'CowIcon'], ['moo', 'CowIcon'], ['goat', 'GoatIcon'], ['bleat', 'GoatIcon'],
    ['bird', 'BirdIcon'], ['parrot', 'BirdIcon'], ['crow', 'BirdIcon'],
    ['mammal', 'DogIcon'], ['pet', 'DogIcon'], ['street', 'CatIcon'],
  ],
  'AnimalTypesGame.tsx': [
    ['dog', 'DogIcon'], ['pet', 'DogIcon'], ['lion', 'LionIcon'], ['wild', 'LionIcon'],
    ['cow', 'CowIcon'], ['domestic', 'CowIcon'], ['land', 'CowIcon'],
    ['fish', 'FishIcon'], ['water', 'FishIcon'], ['scales', 'FishIcon'],
    ['bird', 'BirdIcon'], ['air', 'BirdIcon'], ['wings', 'BirdIcon'],
    ['elephant', 'ElephantIcon'], ['trunk', 'ElephantIcon'],
  ],
  'BalanceGame.tsx': [
    ['book', 'BookIcon'], ['pencil', 'PencilIcon'], ['stone', 'StoneIcon'],
    ['feather', 'FeatherIcon'], ['iron', 'StoneIcon'], ['block', 'BookIcon'],
    ['heavy', 'StoneIcon'], ['light', 'FeatherIcon'], ['down', 'StoneIcon'],
    ['up', 'FeatherIcon'], ['correct', 'BalanceScaleIcon'], ['incorrect', 'BalanceScaleIcon'],
    ['level', 'BalanceScaleIcon'], ['c1', 'BookIcon'], ['c2', 'PencilIcon'],
    ['i1', 'StoneIcon'], ['i2', 'FeatherIcon'],
  ],
  'BodyGame.tsx': [
    ['eye', 'EyeIcon'], ['sight', 'EyeIcon'], ['ear', 'EarIcon'], ['hearing', 'EarIcon'],
    ['nose', 'NoseIcon'], ['smell', 'NoseIcon'], ['mouth', 'MouthIcon'], ['tongue', 'MouthIcon'],
    ['taste', 'MouthIcon'], ['hand', 'HandIcon'], ['arm', 'HandIcon'], ['elbow', 'HandIcon'],
    ['knee', 'HandIcon'], ['leg', 'HandIcon'], ['face', 'EyeIcon'],
  ],
  'CleanlinessGame.tsx': [
    ['soap', 'SoapIcon'], ['wash', 'SoapIcon'], ['hands', 'SoapIcon'],
    ['brush', 'ToothbrushIcon'], ['teeth', 'ToothbrushIcon'], ['tool-brush', 'ToothbrushIcon'],
    ['towel', 'TowelIcon'], ['tool-towel', 'TowelIcon'],
    ['clipper', 'NailClipperIcon'], ['nails', 'NailClipperIcon'], ['tool-clipper', 'NailClipperIcon'],
    ['comb', 'CombIcon'], ['hair', 'CombIcon'],
    ['bathe', 'SoapIcon'], ['body', 'SoapIcon'], ['clean', 'SoapIcon'],
    ['dirty', 'NailClipperIcon'], ['morning', 'ToothbrushIcon'], ['night', 'ToothbrushIcon'],
    ['meals', 'SoapIcon'],
  ],
  'ComputerBasicsGame.tsx': [
    ['mon', 'MonitorIcon'], ['monitor', 'MonitorIcon'], ['screen', 'MonitorIcon'],
    ['cpu', 'CpuIcon'], ['brain', 'CpuIcon'],
    ['kb', 'KeyboardIcon'], ['keyboard', 'KeyboardIcon'], ['input', 'KeyboardIcon'],
    ['mou', 'MouseIcon'], ['mouse', 'MouseIcon'],
    ['lap', 'LaptopIcon'], ['laptop', 'LaptopIcon'],
    ['tablet', 'TabletIcon'], ['phone', 'SmartphoneIcon'], ['smartphone', 'SmartphoneIcon'],
    ['computer', 'DesktopIcon'], ['not-computer', 'BookIcon'],
    ['book', 'BookIcon'], ['pencil', 'BookIcon'],
    ['mic', 'MouseIcon'], ['prn', 'MonitorIcon'], ['spk', 'MonitorIcon'],
    ['output', 'MonitorIcon'],
  ],
  'ComputerInputGame.tsx': [
    ['m-dev', 'MouseClickIcon'], ['mouse', 'MouseClickIcon'], ['point', 'MouseClickIcon'],
    ['k-dev', 'KeyboardIcon'], ['keyboard', 'KeyboardIcon'], ['type', 'KeyboardIcon'],
    ['space', 'SpacebarIcon'], ['enter', 'EnterKeyIcon'], ['delete', 'DeleteKeyIcon'],
    ['u-dev', 'UsbDriveIcon'], ['store', 'UsbDriveIcon'],
    ['safe', 'SafetyShieldIcon'], ['gentle', 'SafetyShieldIcon'], ['wash', 'SafetyShieldIcon'],
    ['bang', 'DeleteKeyIcon'], ['juice', 'DeleteKeyIcon'], ['unsafe', 'DeleteKeyIcon'],
  ],
  'EarthWeatherGame.tsx': [
    ['sun', 'SunIcon'], ['sunny', 'SunIcon'], ['cap', 'CapIcon'],
    ['cloud', 'CloudIcon'], ['rain', 'RainIcon'], ['rainy', 'RainIcon'],
    ['raincoat', 'RaincoatIcon'], ['sweater', 'SweaterIcon'], ['cold', 'SweaterIcon'],
    ['wind', 'WindIcon'], ['mountain', 'EarthIcon'], ['plain', 'EarthIcon'],
    ['river', 'RainIcon'], ['pond', 'RainIcon'], ['water', 'RainIcon'],
    ['land', 'EarthIcon'], ['earth', 'EarthIcon'],
  ],
  'NeighbourhoodGame.tsx': [
    ['sch', 'SchoolIcon'], ['school', 'SchoolIcon'], ['learn', 'SchoolIcon'],
    ['hos', 'HospitalIcon'], ['sick', 'HospitalIcon'],
    ['prk', 'ParkIcon'], ['park', 'ParkIcon'], ['play', 'ParkIcon'],
    ['mkt', 'MarketIcon'], ['market', 'MarketIcon'], ['buy', 'MarketIcon'],
    ['high', 'HillIcon'], ['hill', 'HillIcon'],
    ['low', 'PlainIcon'], ['plain', 'PlainIcon'], ['flat', 'PlainIcon'],
    ['flow', 'PlainIcon'], ['still', 'HillIcon'],
  ],
  'PlantsGame.tsx': [
    ['tree', 'TreeIcon'], ['mango', 'TreeIcon'],
    ['shrub', 'ShrubIcon'], ['rose', 'ShrubIcon'],
    ['herb', 'HerbIcon'], ['marigold', 'HerbIcon'],
    ['root', 'HerbIcon'], ['leaf', 'ShrubIcon'], ['stem', 'TreeIcon'],
  ],
  'PlantTypesGame.tsx': [
    ['mango', 'MangoTreeIcon'], ['tree', 'MangoTreeIcon'], ['land', 'MangoTreeIcon'],
    ['lotus', 'LotusIcon'], ['water', 'LotusIcon'],
    ['money', 'MoneyPlantIcon'], ['climber', 'MoneyPlantIcon'],
    ['carrot', 'CarrotIcon'], ['root', 'CarrotIcon'],
    ['spinach', 'SpinachIcon'], ['leaf', 'SpinachIcon'],
    ['pea', 'PeaIcon'], ['seed', 'PeaIcon'],
    ['tulsi', 'TulsiIcon'], ['medicinal', 'TulsiIcon'],
    ['neem', 'NeemIcon'],
    ['banana', 'BananaIcon'], ['apple', 'AppleIcon'], ['fruit', 'AppleIcon'],
    ['food', 'AppleIcon'],
  ],
  'SafetyGame.tsx': [
    ['knife', 'KnifeIcon'], ['sharp', 'KnifeIcon'], ['home-knife', 'KnifeIcon'],
    ['match', 'MatchstickIcon'], ['fire', 'MatchstickIcon'],
    ['socket', 'SocketIcon'], ['electric', 'SocketIcon'], ['wet-switch', 'SocketIcon'],
    ['stairs', 'FirstAidIcon'], ['climb-chair', 'FirstAidIcon'],
    ['road', 'TrafficLightIcon'], ['hand', 'TrafficLightIcon'],
    ['safe', 'FirstAidIcon'], ['unsafe', 'MatchstickIcon'],
    ['home', 'FirstAidIcon'], ['school', 'FirstAidIcon'],
  ],
  'SunMoonGame.tsx': [
    ['sun', 'SunIcon'], ['sunny', 'SunIcon'], ['summer', 'SunIcon'],
    ['sunglasses', 'SunIcon'], ['day', 'SunIcon'],
    ['moon', 'MoonIcon'], ['night', 'MoonIcon'], ['moonwatch', 'MoonIcon'],
    ['star', 'StarIcon'],
    ['winter', 'SnowflakeIcon'], ['snow', 'SnowflakeIcon'], ['icecream', 'SnowflakeIcon'],
    ['rainy', 'SnowflakeIcon'], ['umbrella', 'SnowflakeIcon'],
    ['sweater', 'SnowflakeIcon'], ['cloud', 'StarIcon'],
    ['school', 'SunIcon'], ['sleep', 'MoonIcon'], ['play', 'SunIcon'],
  ],
  'TransportGame.tsx': [
    ['car', 'CarIcon'], ['roll', 'CarIcon'], ['land', 'CarIcon'],
    ['bus', 'BusIcon'],
    ['train', 'TrainIcon'],
    ['boat', 'BoatIcon'], ['raft', 'BoatIcon'], ['float', 'BoatIcon'], ['water', 'BoatIcon'],
    ['ship', 'ShipIcon'], ['ferry', 'ShipIcon'],
    ['plane', 'AeroplaneIcon'], ['air', 'AeroplaneIcon'], ['fly', 'AeroplaneIcon'],
    ['heli', 'HelicopterIcon'], ['balloon', 'HelicopterIcon'], ['glider', 'HelicopterIcon'],
    ['bicycle', 'BicycleIcon'],
  ],
  'WaterGame.tsx': [
    ['well', 'WellIcon'], ['source', 'WellIcon'],
    ['tap', 'TapIcon'], ['close-tap', 'TapIcon'], ['let-run', 'TapIcon'],
    ['river', 'RiverIcon'],
    ['rain', 'RainIcon'],
    ['pond', 'PondIcon'],
    ['tanker', 'TankerIcon'], ['tank', 'TankerIcon'],
    ['bathe', 'TapIcon'], ['cook', 'TapIcon'], ['sweep', 'PondIcon'],
    ['save', 'TapIcon'], ['waste', 'TapIcon'], ['reuse', 'RiverIcon'],
    ['overflow', 'TapIcon'], ['fold', 'TapIcon'],
    ['chair', 'WellIcon'], ['tv', 'WellIcon'], ['not-source', 'WellIcon'],
    ['no-water', 'WellIcon'],
  ],
};

// Games that already pass (no emoji in sort cards)
const skipGames = ['CountingGame.tsx', 'FoodGame.tsx', 'PatternsGame.tsx', 'ShapeSortGame.tsx'];

function patchGame(filePath) {
  const fileName = path.basename(filePath);
  if (skipGames.includes(fileName)) {
    console.log(`SKIP: ${fileName} (already uses SVG)`);
    return;
  }
  const map = iconMaps[fileName];
  if (!map) {
    console.log(`SKIP: ${fileName} (no icon map)`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // Check if already patched
  if (content.includes('renderSortIcon')) {
    console.log(`SKIP: ${fileName} (already patched)`);
    return;
  }

  // Check if it has {item.emoji} or {emoji} in SortCard
  const hasEmoji = content.includes('{item.emoji}') || content.includes('{emoji}');
  if (!hasEmoji) {
    console.log(`SKIP: ${fileName} (no emoji in sort cards)`);
    return;
  }

  // Build the renderSortIcon function
  const conditions = map.map(([kw, icon]) =>
    `  if (id.includes('${kw}')) return <${icon} size={size} />;`
  ).join('\n');

  const renderFn = `\nfunction renderSortIcon(id: string, size: number = 48) {\n${conditions}\n  return null;\n}\n`;

  // Find the SortCard function and insert renderSortIcon before it
  const sortCardMatch = content.match(/(\nfunction SortCard)/);
  if (sortCardMatch) {
    content = content.replace(sortCardMatch[1], renderFn + sortCardMatch[1]);
  } else {
    // Try to find it another way — insert before the main component
    const mainMatch = content.match(/(\n(?:export )?function \w+Game)/);
    if (mainMatch) {
      content = content.replace(mainMatch[1], renderFn + mainMatch[1]);
    }
  }

  // Replace {item.emoji} with {renderSortIcon(item.id, 48)}
  content = content.replace(/\{item\.emoji\}/g, '{renderSortIcon(item.id, 48)}');
  // Replace {emoji} with {renderSortIcon(id, 48)} — but only in SortCard context
  // Be careful: {emoji} might appear in teaching slides too
  // Only replace if it's in a SortCard context (look for the pattern in the sort card)
  content = content.replace(/<span style=\{\{ fontSize: \d+ \}\}>\{emoji\}<\/span>/g,
    '{renderSortIcon(id, 48)}');
  content = content.replace(/<span className="text-3xl">\{emoji\}<\/span>/g,
    '{renderSortIcon(id, 48)}');
  content = content.replace(/<span style=\{\{ fontSize: \d+ \}\}>\{item\.emoji\}<\/span>/g,
    '{renderSortIcon(item.id, 48)}');

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`PATCHED: ${fileName}`);
}

// Process all games in class1 directory
const files = fs.readdirSync(class1Dir).filter(f => f.endsWith('.tsx'));
for (const file of files) {
  patchGame(path.join(class1Dir, file));
}
console.log('\nDone!');
