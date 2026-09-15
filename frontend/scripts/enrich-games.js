/**
 * Enrich Game JSON — Adds all 7 upgrade metadata to each game file
 *
 * For each of the 133 games, adds:
 * - theme: SceneTheme based on subject
 * - storyArc: 5-beat story mapped to 8 challenges
 * - learningArtifact: ArtifactConfig based on subject
 * - slides[].diagram: DiagramConfig for each teaching slide
 * - challenges[].interactiveObjects: InteractiveObject[] for tap/drag
 * - challenges[].easierVariant / harderVariant: for adaptive difficulty
 * - worldMapNode: WorldMapNode for the living world map
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = 'D:/dream_app/frontend/data/games';

// ─── Subject Detection ────────────────────────────────────────

function detectSubject(nodes, gameFile) {
  // First try node IDs
  const nodeStr = nodes.join(' ');
  if (nodeStr.includes('math')) return 'maths';
  if (nodeStr.includes('bio')) return 'biology';
  if (nodeStr.includes('chem')) return 'chemistry';
  if (nodeStr.includes('phy')) return 'physics';
  if (nodeStr.includes('cs') || nodeStr.includes('computer')) return 'cs';
  if (nodeStr.includes('geo')) return 'geography';
  if (nodeStr.includes('evs')) return 'evs';

  // Fallback: detect from game file name
  const name = (gameFile || '').toLowerCase();
  if (name.includes('fraction') || name.includes('decimal') || name.includes('number') ||
      name.includes('addsub') || name.includes('muldiv') || name.includes('addition') ||
      name.includes('counting') || name.includes('balance') || name.includes('pattern') ||
      name.includes('measurement') || name.includes('shape') || name.includes('angle') ||
      name.includes('symmetry') || name.includes('factor') || name.includes('multiple') ||
      name.includes('integer') || name.includes('percentage') || name.includes('data') ||
      name.includes('area') || name.includes('perimeter') || name.includes('mental') ||
      name.includes('operations') || name.includes('lines') || name.includes('tessellation'))
    return 'maths';
  if (name.includes('plant') || name.includes('animal') || name.includes('bird') ||
      name.includes('insect') || name.includes('body') || name.includes('digest') ||
      name.includes('health') || name.includes('disease') || name.includes('skeletal') ||
      name.includes('circulatory') || name.includes('skin') || name.includes('nervous') ||
      name.includes('food') || name.includes('teeth') || name.includes('adaptation') ||
      name.includes('living') || name.includes('ecosystem') || name.includes('reproduction'))
    return 'biology';
  if (name.includes('matter') || name.includes('mixture') || name.includes('solution') ||
      name.includes('separation') || name.includes('states'))
    return 'chemistry';
  if (name.includes('light') || name.includes('sound') || name.includes('force') ||
      name.includes('friction') || name.includes('machine') || name.includes('energy') ||
      name.includes('work') || name.includes('float') || name.includes('sink') ||
      name.includes('air') || name.includes('water') || name.includes('sun') ||
      name.includes('moon') || name.includes('earth') || name.includes('solar') ||
      name.includes('eclipse') || name.includes('weather') || name.includes('sky'))
    return 'physics';
  if (name.includes('computer') || name.includes('internet') || name.includes('software') ||
      name.includes('powerpoint') || name.includes('word') || name.includes('paint') ||
      name.includes('windows') || name.includes('algorithm') || name.includes('logo') ||
      name.includes('scratch') || name.includes('file') || name.includes('memory') ||
      name.includes('system') || name.includes('history') || name.includes('browser'))
    return 'cs';
  if (name.includes('map') || name.includes('globe') || name.includes('continent') ||
      name.includes('ocean') || name.includes('india') || name.includes('climate') ||
      name.includes('landform') || name.includes('lat') || name.includes('long') ||
      name.includes('location') || name.includes('direction') || name.includes('resource') ||
      name.includes('environment'))
    return 'geography';
  if (name.includes('safety') || name.includes('clean') || name.includes('neighbourhood') ||
      name.includes('transport') || name.includes('economy') || name.includes('agriculture'))
    return 'evs';

  return 'general';
}

// ─── Theme Mapping (UPGRADE 6) ────────────────────────────────

const SUBJECT_THEME = {
  maths: 'classroom',
  biology: 'body',
  chemistry: 'lab',
  physics: 'lab',
  cs: 'classroom',
  geography: 'outdoor',
  evs: 'garden',
  general: 'default',
};

// Game-specific theme overrides based on game file name
const GAME_THEME_OVERRIDE = {
  CountingGame: 'orchard',
  AdditionGame: 'orchard',
  FoodGame: 'kitchen',
  FoodGroupsGame: 'kitchen',
  FoodShelterGame: 'kitchen',
  FoodTeethGame: 'body',
  AnimalsGame: 'zoo',
  AnimalTypesGame: 'zoo',
  BirdsGame: 'zoo',
  InsectsGame: 'garden',
  PlantsGame: 'garden',
  PlantTypesGame: 'garden',
  PlantUsesGame: 'garden',
  PlantReproductionGame: 'garden',
  LivingPlantsGame: 'garden',
  PlantsAirGame: 'garden',
  WaterGame: 'ocean',
  AirGame: 'outdoor',
  AirCleanGame: 'outdoor',
  AirVehiclesGame: 'city',
  TransportGame: 'city',
  NeighbourhoodGame: 'city',
  SafetyGame: 'city',
  SafetyCleanGame: 'city',
  CleanlinessGame: 'city',
  BodyGame: 'body',
  BodyFunctionsGame: 'body',
  DigestionGame: 'body',
  HealthGame: 'body',
  HealthDiseasesGame: 'body',
  CirculatoryGame: 'body',
  SkeletalGame: 'body',
  SkinNervousGame: 'body',
  SolarSystemGame: 'space',
  EarthSunGame: 'space',
  EarthWeatherGame: 'outdoor',
  EarthMotionsGame: 'space',
  EarthSkyGame: 'space',
  SunMoonGame: 'space',
  SunEnergyGame: 'space',
  WaterSunGame: 'ocean',
  LightGame: 'lab',
  LightEclipseGame: 'space',
  SoundNoiseGame: 'music',
  StatesMatterGame: 'lab',
  MatterGame: 'lab',
  MatterAirGame: 'lab',
  MixturesSeparationGame: 'lab',
  SolutionsFloatGame: 'ocean',
  FloatSinkGame: 'ocean',
  ForceFrictionGame: 'lab',
  SimpleMachinesGame: 'city',
  WorkEnergyGame: 'lab',
  PatternsGame: 'art',
  ShapesLinesGame: 'art',
  ShapeSortGame: 'art',
  ShapesSymmetryGame: 'art',
  ShapesTessellationGame: 'art',
  AnglesSymmetryGame: 'art',
  MeasurementGame: 'classroom',
  MapsLengthGame: 'outdoor',
  MapsIndiaGame: 'outdoor',
  DirectionsMapGame: 'outdoor',
  DirectionsMapsGame: 'outdoor',
  ContinentsGame: 'outdoor',
  ContinentsOceansGame: 'ocean',
  GlobeGame: 'outdoor',
  LandformsGame: 'outdoor',
  IndiaLocationGame: 'outdoor',
  IndiaClimateGame: 'outdoor',
  LatLongGame: 'space',
  ResourcesGame: 'outdoor',
  EnvironmentResourcesGame: 'garden',
  EnvironmentBodyGame: 'garden',
  EcosystemWasteGame: 'garden',
  AgricultureHygieneGame: 'garden',
  EconomyGame: 'market',
  MyEnvironmentGame: 'garden',
  LivingThingsGame: 'garden',
  LivingEVSGame: 'garden',
  AdaptationsGame: 'zoo',
  InternetGame: 'classroom',
  InternetBrowserGame: 'classroom',
  InternetLogoGame: 'classroom',
  ComputerBasicsGame: 'classroom',
  ComputerInputGame: 'classroom',
  ComputerFilesGame: 'classroom',
  ComputerSystemGame: 'classroom',
  ComputerMemoryGame: 'classroom',
  ComputerHistoryGame: 'classroom',
  SoftwareGame: 'classroom',
  PowerPointGame: 'classroom',
  PowerPointScratchGame: 'classroom',
  PaintFilesGame: 'classroom',
  WindowsWordGame: 'classroom',
  WordFormattingGame: 'classroom',
  WordAdvancedGame: 'classroom',
  AlgorithmsLogoGame: 'classroom',
  ChangesTransportGame: 'city',
};

// ─── Diagram Mapping (UPGRADE 1) ──────────────────────────────

function getDiagramForSlide(gameFile, slideIndex, slide, subject) {
  const title = (slide.title || '').toLowerCase();
  const text = (slide.text || '').toLowerCase();

  // Math diagrams
  if (subject === 'maths') {
    if (title.includes('number') || text.includes('place value') || text.includes('numeral'))
      return { type: 'place-value-chart', animate: true, data: { columns: ['Crores', 'Lakhs', 'Thousands', 'Ones'], digits: ['1', '2', '3', '4'] } };
    if (title.includes('fraction') || text.includes('fraction'))
      return { type: 'fraction-bar', animate: true, data: { numerator: 3, denominator: 4 } };
    if (title.includes('add') || text.includes('addition'))
      return { type: 'counting-objects', animate: true, data: { count: 5, shape: 'apple' } };
    if (title.includes('subtract') || text.includes('subtraction'))
      return { type: 'counting-objects', animate: true, data: { count: 5, shape: 'apple' } };
    if (title.includes('multiply') || text.includes('multiplication'))
      return { type: 'bar-chart', animate: true, data: { bars: [{ label: '1×3', value: 3 }, { label: '2×3', value: 6 }, { label: '3×3', value: 9 }] } };
    if (title.includes('divide') || text.includes('division'))
      return { type: 'fraction-pizza', animate: true, data: { slices: 8, filled: 4 } };
    if (title.includes('factor') || text.includes('multiple'))
      return { type: 'factor-tree', animate: true, data: { number: 12, factors: [3, 4] } };
    if (title.includes('decimal') || text.includes('decimal'))
      return { type: 'place-value-chart', animate: true, data: { columns: ['Ones', 'Tenths', 'Hundredths'], digits: ['3', '5', '2'] } };
    if (title.includes('percentage') || text.includes('percent'))
      return { type: 'fraction-bar', animate: true, data: { numerator: 75, denominator: 100 } };
    if (title.includes('integer') || text.includes('positive') || text.includes('negative'))
      return { type: 'number-line', animate: true, data: { min: -5, max: 5 } };
    if (title.includes('angle') || text.includes('symmetry'))
      return { type: 'shape-sorter', animate: true, data: { shapes: ['triangle', 'square', 'circle'] } };
    if (title.includes('shape') || title.includes('tessellation'))
      return { type: 'shape-sorter', animate: true, data: { shapes: ['triangle', 'square', 'circle', 'rectangle'] } };
    if (title.includes('pattern'))
      return { type: 'pattern-builder', animate: true, data: { pattern: ['red', 'blue', 'red', 'blue'], missingIndex: 3 } };
    if (title.includes('measurement') || title.includes('length') || title.includes('weight'))
      return { type: 'balance-scale', animate: true, data: { leftWeight: 5, rightWeight: 5 } };
    if (title.includes('area') || title.includes('perimeter'))
      return { type: 'shape-sorter', animate: true, data: { shapes: ['square', 'rectangle'] } };
    if (title.includes('time') || title.includes('calendar'))
      return { type: 'timeline', animate: true, data: { events: [{ time: '9:00', label: 'Start' }, { time: '12:00', label: 'Lunch' }, { time: '3:00', label: 'End' }] } };
    if (title.includes('data') || title.includes('graph'))
      return { type: 'bar-chart', animate: true, data: { bars: [{ label: 'A', value: 30 }, { label: 'B', value: 50 }, { label: 'C', value: 40 }] } };
    if (title.includes('balance') || text.includes('weight'))
      return { type: 'balance-scale', animate: true, data: { leftWeight: 5, rightWeight: 3 } };
    if (title.includes('compare') || text.includes('more') || text.includes('less'))
      return { type: 'bar-chart', animate: true, data: { bars: [{ label: 'A', value: 40 }, { label: 'B', value: 60 }] } };
    return { type: 'counting-objects', animate: true, data: { count: 5, shape: 'star' } };
  }

  // Biology / Body diagrams
  if (subject === 'biology' || subject === 'evs') {
    if (title.includes('body') || title.includes('digest') || text.includes('organ'))
      return { type: 'body-diagram', animate: true, data: { parts: ['Head', 'Chest', 'Arms', 'Legs'], highlightIndex: slideIndex } };
    if (title.includes('plant') || title.includes('leaf') || text.includes('root'))
      return { type: 'plant-parts', animate: true, data: {} };
    if (title.includes('animal') || title.includes('bird') || title.includes('insect'))
      return { type: 'food-chain', animate: true, data: { chain: ['Plant', 'Grasshopper', 'Frog', 'Snake'] } };
    if (title.includes('food') || title.includes('eat'))
      return { type: 'food-chain', animate: true, data: { chain: ['Plant', 'Goat', 'Lion'] } };
    if (title.includes('health') || title.includes('disease'))
      return { type: 'body-diagram', animate: true, data: { parts: ['Head', 'Chest', 'Arms', 'Legs'] } };
    if (title.includes('skeleton') || title.includes('bone') || title.includes('muscle'))
      return { type: 'body-diagram', animate: true, data: { parts: ['Skull', 'Spine', 'Ribs', 'Limbs'], highlightIndex: slideIndex } };
    if (title.includes('circulat') || title.includes('heart') || title.includes('blood'))
      return { type: 'body-diagram', animate: true, data: { parts: ['Heart', 'Arteries', 'Veins', 'Blood'], highlightIndex: slideIndex } };
    if (title.includes('skin') || title.includes('nervous') || title.includes('brain'))
      return { type: 'body-diagram', animate: true, data: { parts: ['Brain', 'Spinal Cord', 'Nerves', 'Skin'], highlightIndex: slideIndex } };
    if (title.includes('environment') || title.includes('ecosystem'))
      return { type: 'food-chain', animate: true, data: { chain: ['Sun', 'Plant', 'Herbivore', 'Carnivore'] } };
    return { type: 'body-diagram', animate: true, data: { parts: ['Head', 'Chest', 'Arms', 'Legs'], highlightIndex: slideIndex } };
  }

  // Physics / Chemistry diagrams
  if (subject === 'physics' || subject === 'chemistry') {
    if (title.includes('water') || text.includes('water'))
      return { type: 'water-cycle', animate: true, data: {} };
    if (title.includes('light') || title.includes('eclipse'))
      return { type: 'solar-system', animate: true, data: { planets: [{ name: 'Sun', color: 0xffd700, distance: 0, size: 15 }] } };
    if (title.includes('sound') || title.includes('noise'))
      return { type: 'generic-flow', animate: true, data: { steps: ['Source', 'Vibration', 'Wave', 'Ear'] } };
    if (title.includes('matter') || title.includes('state'))
      return { type: 'generic-flow', animate: true, data: { steps: ['Solid', 'Liquid', 'Gas'] } };
    if (title.includes('force') || title.includes('friction') || title.includes('machine'))
      return { type: 'balance-scale', animate: true, data: { leftWeight: 5, rightWeight: 5 } };
    if (title.includes('energy') || title.includes('work'))
      return { type: 'generic-flow', animate: true, data: { steps: ['Input', 'Process', 'Output'] } };
    if (title.includes('float') || title.includes('sink'))
      return { type: 'balance-scale', animate: true, data: { leftWeight: 3, rightWeight: 5 } };
    if (title.includes('mixture') || title.includes('solution'))
      return { type: 'generic-flow', animate: true, data: { steps: ['Mix', 'Dissolve', 'Filter', 'Separate'] } };
    if (title.includes('air'))
      return { type: 'water-cycle', animate: true, data: {} };
    return { type: 'generic-flow', animate: true, data: { steps: ['Observe', 'Experiment', 'Conclude'] } };
  }

  // Geography diagrams
  if (subject === 'geography') {
    if (title.includes('map') || title.includes('india') || title.includes('location'))
      return { type: 'map-india', animate: true, data: { region: { x: 0, y: 0, label: 'India' } } };
    if (title.includes('globe') || title.includes('earth'))
      return { type: 'solar-system', animate: true, data: { planets: [{ name: 'Earth', color: 0x4a90d9, distance: 70, size: 8 }] } };
    if (title.includes('continent') || title.includes('ocean'))
      return { type: 'map-india', animate: true, data: {} };
    if (title.includes('climate') || title.includes('weather'))
      return { type: 'water-cycle', animate: true, data: {} };
    if (title.includes('landform'))
      return { type: 'map-india', animate: true, data: {} };
    if (title.includes('resource'))
      return { type: 'generic-flow', animate: true, data: { steps: ['Natural', 'Process', 'Product'] } };
    return { type: 'map-india', animate: true, data: {} };
  }

  // CS diagrams
  if (subject === 'cs') {
    if (title.includes('computer') || title.includes('system'))
      return { type: 'generic-flow', animate: true, data: { steps: ['Input', 'Process', 'Output', 'Store'] } };
    if (title.includes('internet') || title.includes('browser'))
      return { type: 'generic-flow', animate: true, data: { steps: ['Request', 'Server', 'Response', 'Display'] } };
    if (title.includes('algorithm') || title.includes('logo'))
      return { type: 'generic-flow', animate: true, data: { steps: ['Start', 'Steps', 'Decision', 'End'] } };
    if (title.includes('file') || title.includes('word') || title.includes('powerpoint'))
      return { type: 'generic-flow', animate: true, data: { steps: ['Create', 'Edit', 'Format', 'Save'] } };
    return { type: 'generic-flow', animate: true, data: { steps: ['Input', 'Process', 'Output'] } };
  }

  // Default
  return { type: 'counting-objects', animate: true, data: { count: 5, shape: 'star' } };
}

// ─── Interactive Objects (UPGRADE 2) ──────────────────────────

function getInteractiveObjectsForChallenge(gameFile, challenge, subject) {
  const type = challenge.type || '';
  const question = (challenge.question || '').toLowerCase();

  // For identify challenges — create tappable objects from options
  if (type.startsWith('identify') && challenge.options && challenge.options.length > 0) {
    const objects = [];
    const optCount = challenge.options.length;
    const spacing = 1 / (optCount + 1);

    challenge.options.forEach((opt, i) => {
      const isCorrect = opt === challenge.answer;
      let kind = 'circle';
      let color = '#6c5ce7';

      // Determine object kind from question content
      if (question.includes('apple') || question.includes('count')) { kind = 'apple'; color = '#ff4444'; }
      else if (question.includes('star')) { kind = 'star'; color = '#ffd700'; }
      else if (question.includes('ball')) { kind = 'ball'; color = '#6c5ce7'; }
      else if (question.includes('shape') || question.includes('square')) { kind = 'square'; color = '#4ecdc4'; }
      else if (question.includes('triangle')) { kind = 'triangle'; color = '#ff6b6b'; }
      else if (question.includes('circle')) { kind = 'circle'; color = '#74c0fc'; }
      else if (question.includes('fraction') || question.includes('pizza')) { kind = 'pizza'; color = '#ffd700'; }
      else if (question.includes('plant') || question.includes('leaf')) { kind = 'leaf'; color = '#4a8b3a'; }
      else if (question.includes('flower')) { kind = 'flower'; color = '#ff69b4'; }
      else if (question.includes('water')) { kind = 'water-drop'; color = '#4a90d9'; }
      else { kind = 'circle'; color = isCorrect ? '#22c55e' : '#6c5ce7'; }

      objects.push({
        id: `obj_${i}`,
        kind,
        label: opt,
        x: spacing * (i + 1),
        y: 0.65,
        size: 55,
        color,
        isCorrect,
        interaction: 'tap',
      });
    });
    return objects;
  }

  // For sort challenges — create draggable objects from sortItems
  if (type.startsWith('sort') && challenge.sortItems && challenge.sortItems.length > 0) {
    const objects = [];
    const itemCount = challenge.sortItems.length;
    const spacing = 1 / (itemCount + 1);

    challenge.sortItems.forEach((item, i) => {
      let kind = 'circle';
      let color = '#6c5ce7';
      const label = (item.label || '').toLowerCase();

      if (label.includes('apple') || label.includes('fruit')) { kind = 'apple'; color = '#ff4444'; }
      else if (label.includes('leaf') || label.includes('plant')) { kind = 'leaf'; color = '#4a8b3a'; }
      else if (label.includes('flower')) { kind = 'flower'; color = '#ff69b4'; }
      else if (label.includes('water')) { kind = 'water-drop'; color = '#4a90d9'; }
      else if (label.includes('star')) { kind = 'star'; color = '#ffd700'; }
      else { kind = 'circle'; color = '#6c5ce7'; }

      objects.push({
        id: item.id || `sort_${i}`,
        kind,
        label: item.label,
        x: spacing * (i + 1),
        y: 0.85,
        size: 55,
        color,
        category: item.correctBin,
        interaction: 'drag-to-bin',
        targetBin: item.correctBin,
      });
    });
    return objects;
  }

  // For other challenge types with options — create tappable objects as fallback
  if (challenge.options && challenge.options.length > 0) {
    const objects = [];
    const optCount = challenge.options.length;
    const spacing = 1 / (optCount + 1);

    challenge.options.forEach((opt, i) => {
      const isCorrect = opt === challenge.answer;
      objects.push({
        id: `obj_${i}`,
        kind: 'circle',
        label: opt,
        x: spacing * (i + 1),
        y: 0.65,
        size: 55,
        color: isCorrect ? '#22c55e' : '#6c5ce7',
        isCorrect,
        interaction: 'tap',
      });
    });
    return objects;
  }

  // Fallback for challenges with no options and no sortItems
  // Generate 3 tappable objects: the answer + 2 generated distractors
  if (challenge.answer && challenge.answer !== 'sort') {
    const answer = challenge.answer;
    // Generate simple distractors
    const distractors = generateDistractors(answer, subject);
    const allOptions = [answer, ...distractors];
    // Shuffle
    for (let i = allOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
    }

    const objects = [];
    const spacing = 1 / (allOptions.length + 1);
    allOptions.forEach((opt, i) => {
      const isCorrect = opt === answer;
      objects.push({
        id: `obj_${i}`,
        kind: 'circle',
        label: opt,
        x: spacing * (i + 1),
        y: 0.65,
        size: 55,
        color: isCorrect ? '#22c55e' : '#6c5ce7',
        isCorrect,
        interaction: 'tap',
      });
    });
    return objects;
  }

  // Ultimate fallback: generate 3 placeholder tappable objects
  return [
    { id: 'obj_0', kind: 'circle', label: 'Option A', x: 0.25, y: 0.65, size: 55, color: '#6c5ce7', isCorrect: false, interaction: 'tap' },
    { id: 'obj_1', kind: 'circle', label: 'Option B', x: 0.5, y: 0.65, size: 55, color: '#6c5ce7', isCorrect: false, interaction: 'tap' },
    { id: 'obj_2', kind: 'circle', label: 'Option C', x: 0.75, y: 0.65, size: 55, color: '#6c5ce7', isCorrect: false, interaction: 'tap' },
  ];
}

// ─── Distractor Generator ─────────────────────────────────────

function generateDistractors(answer, subject) {
  // Try to generate numeric distractors
  const num = parseInt(answer, 10);
  if (!isNaN(num)) {
    const d1 = num > 1 ? num - 1 : num + 2;
    const d2 = num + 1;
    return [String(d1), String(d2)];
  }
  // Try to generate string distractors by modifying the answer
  if (answer.length > 2) {
    return [answer + ' (wrong)', 'Not ' + answer];
  }
  // Generic distractors
  return ['Option X', 'Option Y'];
}

// ─── Story Arc (UPGRADE 5) ────────────────────────────────────

function buildStoryArc(gameFile, subject, mascot) {
  const themes = {
    maths: 'A young mathematician discovers the power of numbers',
    biology: 'A curious explorer uncovers the secrets of living things',
    chemistry: 'A young scientist experiments with matter and materials',
    physics: 'A curious physicist explores the forces of nature',
    cs: 'A tech-savvy kid learns how computers work',
    geography: 'An adventurer travels across the world',
    evs: 'A nature lover discovers the world around them',
    general: 'A curious learner embarks on a journey of discovery',
  };

  return {
    theme: themes[subject] || themes.general,
    beats: [
      {
        name: 'setup',
        challengeIndices: [0, 1],
        sceneDescription: 'The mascot welcomes the student and introduces the topic',
        mascotDialogue: "Welcome! Let's explore this together!",
      },
      {
        name: 'inciting',
        challengeIndices: [2, 3],
        sceneDescription: 'A problem is presented that requires the new knowledge',
        mascotDialogue: 'Here is a challenge — can you figure it out?',
      },
      {
        name: 'rising',
        challengeIndices: [4, 5],
        sceneDescription: 'The challenges get harder as understanding deepens',
        mascotDialogue: 'You are getting better! Try these harder ones!',
      },
      {
        name: 'climax',
        challengeIndices: [6],
        sceneDescription: 'The hardest challenge — a real test of mastery',
        mascotDialogue: 'This is the big one! Show me what you have learned!',
      },
      {
        name: 'resolution',
        challengeIndices: [7],
        sceneDescription: 'The student demonstrates mastery and celebrates',
        mascotDialogue: 'Amazing! You have mastered this topic!',
      },
    ],
  };
}

// ─── Learning Artifact (UPGRADE 3) ────────────────────────────

function buildLearningArtifact(gameFile, subject) {
  const artifacts = {
    maths: { type: 'filling-chart', title: 'Math Master Chart', totalPieces: 8 },
    biology: { type: 'growing-tree', title: 'Knowledge Tree', totalPieces: 8 },
    chemistry: { type: 'filling-shelves', title: 'Science Shelf', totalPieces: 8 },
    physics: { type: 'filling-shelves', title: 'Physics Lab Shelf', totalPieces: 8 },
    cs: { type: 'building-structure', title: 'Computer Tower', totalPieces: 8 },
    geography: { type: 'building-map', title: 'World Map', totalPieces: 8 },
    evs: { type: 'growing-garden', title: 'Learning Garden', totalPieces: 8 },
    general: { type: 'collecting-stars', title: 'Star Collection', totalPieces: 8 },
  };
  return artifacts[subject] || artifacts.general;
}

// ─── World Map Node (UPGRADE 4) ───────────────────────────────

function buildWorldMapNode(game, subject, index) {
  const regions = {
    maths: 'Mathland',
    biology: 'Biosphere',
    chemistry: 'Chemistry Lab',
    physics: 'Physics Realm',
    cs: 'Tech City',
    geography: 'World Explorer',
    evs: 'Nature Park',
    general: 'Discovery Zone',
  };

  // Spread nodes across the map based on class and index
  const classOffset = (game.classLevel - 1) * 0.2;
  const indexOffset = (index % 10) * 0.08;
  const icons = {
    maths: '🔢', biology: '🌱', chemistry: '🧪', physics: '⚡',
    cs: '💻', geography: '🌍', evs: '🌿', general: '⭐',
  };

  return {
    nodeId: game.cisceNodes[0] || `c${game.classLevel}_${game.gameFile}`,
    region: regions[subject] || regions.general,
    mapX: 0.1 + indexOffset + classOffset * 0.5,
    mapY: 0.15 + classOffset + (index % 5) * 0.12,
    icon: icons[subject] || icons.general,
    prerequisites: index > 0 && game.cisceNodes.length > 1 ? [game.cisceNodes[1]] : [],
  };
}

// ─── Adaptive Difficulty Variants ─────────────────────────────

function buildAdaptiveVariants(challenge) {
  // For challenges with options, create easier/harder variants
  if (challenge.options && challenge.options.length > 2) {
    const wrongOptions = challenge.options.filter(o => o !== challenge.answer);
    if (wrongOptions.length > 0) {
      const easierOptions = [challenge.answer, wrongOptions[0]];
      // Shuffle
      if (Math.random() > 0.5) easierOptions.reverse();
      return {
        easierVariant: { options: easierOptions },
      };
    }
  }
  // For sort challenges, easier variant has fewer items
  if (challenge.sortItems && challenge.sortItems.length > 3) {
    return {
      easierVariant: { sortItems: challenge.sortItems.slice(0, 3) },
    };
  }
  return {};
}

// ─── Main Enrichment ──────────────────────────────────────────

function enrichGame(game, index) {
  const subject = detectSubject(game.cisceNodes, game.gameFile);
  const gameFile = game.gameFile;

  // 1. Theme (UPGRADE 6)
  game.theme = GAME_THEME_OVERRIDE[gameFile] || SUBJECT_THEME[subject] || 'default';

  // 2. Story Arc (UPGRADE 5) — always overwrite to ensure correct subject
  game.storyArc = buildStoryArc(gameFile, subject, game.mascot);

  // 3. Learning Artifact (UPGRADE 3) — always overwrite to ensure correct subject
  game.learningArtifact = buildLearningArtifact(gameFile, subject);

  // 4. World Map Node (UPGRADE 4) — always overwrite to ensure correct subject
  game.worldMapNode = buildWorldMapNode(game, subject, index);

  // 5. Slide Diagrams (UPGRADE 1) — always overwrite to ensure correct subject
  if (game.slides) {
    game.slides.forEach((slide, i) => {
      slide.diagram = getDiagramForSlide(gameFile, i, slide, subject);
    });
  }

  // 6. Interactive Objects (UPGRADE 2) + Adaptive Variants — always overwrite
  if (game.challenges) {
    game.challenges.forEach((challenge, i) => {
      // Always generate interactive objects
      challenge.interactiveObjects = getInteractiveObjectsForChallenge(gameFile, challenge, subject);

      // Always generate adaptive difficulty variants
      const variants = buildAdaptiveVariants(challenge);
      if (variants.easierVariant) {
        challenge.easierVariant = variants.easierVariant;
      } else if (challenge.easierVariant) {
        // Keep existing if no new one generated
      } else {
        // Create a minimal easier variant (repeat hint as guidance)
        challenge.easierVariant = { hint: 'Take it slow. ' + (challenge.hint || '') };
      }

      // Story beat for this challenge
      if (game.storyArc) {
        const beat = game.storyArc.beats.find(b => b.challengeIndices.includes(i));
        if (beat) {
          challenge.storyBeat = beat.name;
        }
      }
    });
  }

  // 7. Subject field
  game.subject = subject;

  return game;
}

// ─── Run ──────────────────────────────────────────────────────

const manifest = JSON.parse(fs.readFileSync(path.join(DATA_DIR, '_manifest.json'), 'utf8'));
let enriched = 0;
let errors = 0;

manifest.forEach((entry, index) => {
  const filePath = path.join(DATA_DIR, entry.dataFile);
  try {
    const game = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const enrichedGame = enrichGame(game, index);
    fs.writeFileSync(filePath, JSON.stringify(enrichedGame, null, 2), 'utf8');
    enriched++;
  } catch (err) {
    console.error(`Error enriching ${entry.dataFile}: ${err.message}`);
    errors++;
  }
});

console.log(`\nEnriched: ${enriched}/${manifest.length} games`);
console.log(`Errors: ${errors}`);

// Verify one enriched file
const sample = JSON.parse(fs.readFileSync(path.join(DATA_DIR, manifest[0].dataFile), 'utf8'));
console.log('\n--- Sample: ' + manifest[0].gameFile + ' ---');
console.log('theme:', sample.theme);
console.log('subject:', sample.subject);
console.log('storyArc:', sample.storyArc ? sample.storyArc.theme : 'MISSING');
console.log('learningArtifact:', sample.learningArtifact ? sample.learningArtifact.title : 'MISSING');
console.log('worldMapNode:', sample.worldMapNode ? sample.worldMapNode.region : 'MISSING');
console.log('slide 1 diagram:', sample.slides[0]?.diagram?.type || 'MISSING');
console.log('challenge 1 interactiveObjects:', sample.challenges[0]?.interactiveObjects?.length || 0, 'objects');
console.log('challenge 1 easierVariant:', sample.challenges[0]?.easierVariant ? 'YES' : 'NO');
