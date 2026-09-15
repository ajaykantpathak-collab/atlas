/**
 * Story definitions — one story per topic.
 *
 * Each story wraps learning in a narrative context:
 * - A mascot character relevant to the topic
 * - A setting (bakery, lab, farm, etc.)
 * - Story-framed questions ("Bunty baked 3 cupcakes..." instead of "What is 3+4?")
 * - Success messages that reference the story
 *
 * Research shows narrative integration improves both engagement
 * and learning (Habgood & Ainsworth, 2011; Rowe et al., 2010).
 */

import type { StoryContext } from './types';

export const STORIES: Record<string, StoryContext> = {
  // ─── Math stories ──────────────────────────────────────

  addition: {
    topic: 'addition',
    mascotName: 'Bunty',
    mascotEmoji: '👨‍🍳',
    setting: 'Bakery',
    settingBgColor: 0xfef3c7,
    settingTopColor: 0xfde68a,
    settingBottomColor: 0xfbbf24,
    intro: "Hi! I'm Bunty the Baker. Help me count my cupcakes for the party!",
    successMessage: "You helped Bunty bake enough cupcakes for the party! 🧁",
    frameQuestion: (q) => q, // Questions already use story framing
    itemWord: 'cupcakes',
    itemEmoji: '🧁',
  },

  subtraction: {
    topic: 'subtraction',
    mascotName: 'Pinky',
    mascotEmoji: '👩‍🌾',
    setting: 'Fruit Market',
    settingBgColor: 0xfecaca,
    settingTopColor: 0xfca5a5,
    settingBottomColor: 0xef4444,
    intro: "Hi! I'm Pinky the Fruit Seller. Help me count my mangoes!",
    successMessage: "You helped Pinky count her fruits correctly! 🥭",
    frameQuestion: (q) => q,
    itemWord: 'mangoes',
    itemEmoji: '🥭',
  },

  multiplication: {
    topic: 'multiplication',
    mascotName: 'Raju',
    mascotEmoji: '🧑‍🌾',
    setting: 'Farm',
    settingBgColor: 0xd9f99d,
    settingTopColor: 0xbbf7d0,
    settingBottomColor: 0x22c55e,
    intro: "Hi! I'm Raju the Farmer. Help me arrange my vegetables in rows!",
    successMessage: "You helped Raju arrange his vegetable rows! 🥕",
    frameQuestion: (q) => q,
    itemWord: 'vegetables',
    itemEmoji: '🥕',
  },

  division: {
    topic: 'division',
    mascotName: 'Meena',
    mascotEmoji: '👩‍🏫',
    setting: 'Classroom',
    settingBgColor: 0xbfdbfe,
    settingTopColor: 0x93c5fd,
    settingBottomColor: 0x3b82f6,
    intro: "Hi! I'm Meena the Teacher. Help me share pencils equally among students!",
    successMessage: "You helped Meena share the pencils fairly! ✏️",
    frameQuestion: (q) => q,
    itemWord: 'pencils',
    itemEmoji: '✏️',
  },

  fractions: {
    topic: 'fractions',
    mascotName: 'Chef Mario',
    mascotEmoji: '👨‍🍳',
    setting: 'Pizza Kitchen',
    settingBgColor: 0xfed7aa,
    settingTopColor: 0xfdba74,
    settingBottomColor: 0xf97316,
    intro: "Ciao! I'm Chef Mario. Help me cut the pizzas into equal slices!",
    successMessage: "You helped Chef Mario cut the perfect pizza slices! 🍕",
    frameQuestion: (q) => q,
    itemWord: 'pizzas',
    itemEmoji: '🍕',
  },

  number_line: {
    topic: 'number_line',
    mascotName: 'Hoppy',
    mascotEmoji: '🐸',
    setting: 'Pond',
    settingBgColor: 0xa5f3fc,
    settingTopColor: 0x67e8f9,
    settingBottomColor: 0x06b6d4,
    intro: "Ribbit! I'm Hoppy the Frog. Help me hop across the lily pads!",
    successMessage: "You helped Hoppy hop across all the lily pads! 🐸",
    frameQuestion: (q) => q,
    itemWord: 'lily pads',
    itemEmoji: '🪷',
  },

  angles: {
    topic: 'angles',
    mascotName: 'Builder Bob',
    mascotEmoji: '👷',
    setting: 'Construction Site',
    settingBgColor: 0xfde68a,
    settingTopColor: 0xfcd34d,
    settingBottomColor: 0xd97706,
    intro: "Hi! I'm Builder Bob. Help me measure angles to build the house!",
    successMessage: "You helped Builder Bob measure all the angles! 📐",
    frameQuestion: (q) => q,
    itemWord: 'walls',
    itemEmoji: '🧱',
  },

  perimeter: {
    topic: 'perimeter',
    mascotName: 'Gardener Geeta',
    mascotEmoji: '👩‍🌾',
    setting: 'Garden',
    settingBgColor: 0xd9f99d,
    settingTopColor: 0xbbf7d0,
    settingBottomColor: 0x16a34a,
    intro: "Hi! I'm Geeta the Gardener. Help me measure the fence around my garden!",
    successMessage: "You helped Geeta measure the garden fence! 🌿",
    frameQuestion: (q) => q,
    itemWord: 'fence',
    itemEmoji: '🚧',
  },

  area: {
    topic: 'area',
    mascotName: 'Painter Priya',
    mascotEmoji: '👩‍🎨',
    setting: 'Art Studio',
    settingBgColor: 0xe9d5ff,
    settingTopColor: 0xd8b4fe,
    settingBottomColor: 0xa855f7,
    intro: "Hi! I'm Priya the Painter. Help me measure the canvas to paint!",
    successMessage: "You helped Priya measure her canvas! 🎨",
    frameQuestion: (q) => q,
    itemWord: 'canvas',
    itemEmoji: '🖼️',
  },

  percentage: {
    topic: 'percentage',
    mascotName: 'Shopkeeper Sam',
    mascotEmoji: '🧑‍💼',
    setting: 'Shop',
    settingBgColor: 0xfce7f3,
    settingTopColor: 0xfbcfe8,
    settingBottomColor: 0xec4899,
    intro: "Hi! I'm Sam the Shopkeeper. Help me calculate discounts!",
    successMessage: "You helped Sam calculate all the discounts! 🏷️",
    frameQuestion: (q) => q,
    itemWord: 'items',
    itemEmoji: '📦',
  },

  decimals: {
    topic: 'decimals',
    mascotName: 'Banker Bala',
    mascotEmoji: '🧑‍💼',
    setting: 'Bank',
    settingBgColor: 0xdcfce7,
    settingTopColor: 0xbbf7d0,
    settingBottomColor: 0x16a34a,
    intro: "Hi! I'm Bala the Banker. Help me count rupees and paise!",
    successMessage: "You helped Bala count the money correctly! 💰",
    frameQuestion: (q) => q,
    itemWord: 'rupees',
    itemEmoji: '💰',
  },

  integers: {
    topic: 'integers',
    mascotName: 'Explorer Esha',
    mascotEmoji: '🧗',
    setting: 'Mountains',
    settingBgColor: 0xe0e7ff,
    settingTopColor: 0xc7d2fe,
    settingBottomColor: 0x6366f1,
    intro: "Hi! I'm Esha the Explorer. Help me climb up and dig down!",
    successMessage: "You helped Esha navigate above and below sea level! ⛰️",
    frameQuestion: (q) => q,
    itemWord: 'steps',
    itemEmoji: '🥾',
  },

  prime_composite: {
    topic: 'prime_composite',
    mascotName: 'Detective Dev',
    mascotEmoji: '🕵️',
    setting: 'Detective Office',
    settingBgColor: 0xf3f4f6,
    settingTopColor: 0xe5e7eb,
    settingBottomColor: 0x6b7280,
    intro: "Hi! I'm Detective Dev. Help me find the prime suspects!",
    successMessage: "You helped Detective Dev crack the number case! 🔍",
    frameQuestion: (q) => q,
    itemWord: 'clues',
    itemEmoji: '🔍',
  },

  patterns: {
    topic: 'patterns',
    mascotName: 'Designer Dia',
    mascotEmoji: '👩‍🎨',
    setting: 'Design Studio',
    settingBgColor: 0xfce7f3,
    settingTopColor: 0xfbcfe8,
    settingBottomColor: 0xdb2777,
    intro: "Hi! I'm Dia the Designer. Help me find the pattern in my designs!",
    successMessage: "You helped Dia complete the pattern! 🎨",
    frameQuestion: (q) => q,
    itemWord: 'beads',
    itemEmoji: '📿',
  },

  roman_numerals: {
    topic: 'roman_numerals',
    mascotName: 'Historian Hari',
    mascotEmoji: '🧑‍🏫',
    setting: 'Ancient Rome',
    settingBgColor: 0xfef3c7,
    settingTopColor: 0xfde68a,
    settingBottomColor: 0xb45309,
    intro: "Salve! I'm Hari the Historian. Help me read the ancient Roman numbers!",
    successMessage: "You helped Hari read the ancient Roman numerals! 🏛️",
    frameQuestion: (q) => q,
    itemWord: 'tablets',
    itemEmoji: '📜',
  },

  symmetry: {
    topic: 'symmetry',
    mascotName: 'Artist Arjun',
    mascotEmoji: '👨‍🎨',
    setting: 'Art Gallery',
    settingBgColor: 0xf3e8ff,
    settingTopColor: 0xe9d5ff,
    settingBottomColor: 0x9333ea,
    intro: "Hi! I'm Arjun the Artist. Help me find the line of symmetry!",
    successMessage: "You helped Arjun find all the symmetrical lines! 🎭",
    frameQuestion: (q) => q,
    itemWord: 'paintings',
    itemEmoji: '🖼️',
  },

  shapes_3d: {
    topic: 'shapes_3d',
    mascotName: 'Architect Anu',
    mascotEmoji: '👩‍💼',
    setting: 'Architecture Office',
    settingBgColor: 0xe0e7ff,
    settingTopColor: 0xc7d2fe,
    settingBottomColor: 0x4f46e5,
    intro: "Hi! I'm Anu the Architect. Help me identify 3D shapes for my building!",
    successMessage: "You helped Anu identify all the 3D shapes! 🏢",
    frameQuestion: (q) => q,
    itemWord: 'blocks',
    itemEmoji: '🧊',
  },

  // ─── Science stories ───────────────────────────────────

  mixing: {
    topic: 'mixing',
    mascotName: 'Dr. Mix',
    mascotEmoji: '🧑‍🔬',
    setting: 'Laboratory',
    settingBgColor: 0xd1fae5,
    settingTopColor: 0xa7f3d0,
    settingBottomColor: 0x10b981,
    intro: "Hello! I'm Dr. Mix. Help me classify these mixtures in my lab!",
    successMessage: "You helped Dr. Mix classify all the mixtures! 🧪",
    frameQuestion: (q) => q,
    itemWord: 'mixtures',
    itemEmoji: '🧪',
  },

  circulatory: {
    topic: 'circulatory',
    mascotName: 'Dr. Heart',
    mascotEmoji: '🫀',
    setting: 'Inside the Body',
    settingBgColor: 0xfecaca,
    settingTopColor: 0xfca5a5,
    settingBottomColor: 0xdc2626,
    intro: "Hello! I'm Dr. Heart. Guide the blood cell on its journey through the heart!",
    successMessage: "You guided the blood cell through the entire circulatory system! 🫀",
    frameQuestion: (q) => q,
    itemWord: 'blood cells',
    itemEmoji: '🔴',
  },

  plant_growth: {
    topic: 'plant_growth',
    mascotName: 'Farmer Singh',
    mascotEmoji: '🧑‍🌾',
    setting: 'Farm',
    settingBgColor: 0xd9f99d,
    settingTopColor: 0xbbf7d0,
    settingBottomColor: 0x16a34a,
    intro: "Sat Sri Akal! I'm Farmer Singh. Help me grow my crops!",
    successMessage: "You helped Farmer Singh grow healthy crops! 🌾",
    frameQuestion: (q) => q,
    itemWord: 'crops',
    itemEmoji: '🌱',
  },

  physical_chemical: {
    topic: 'physical_chemical',
    mascotName: 'Prof. Change',
    mascotEmoji: '🧑‍🔬',
    setting: 'Science Lab',
    settingBgColor: 0xe0e7ff,
    settingTopColor: 0xc7d2fe,
    settingBottomColor: 0x4f46e5,
    intro: "Hello! I'm Professor Change. Help me sort physical and chemical changes!",
    successMessage: "You helped the Professor sort all the changes! ⚗️",
    frameQuestion: (q) => q,
    itemWord: 'experiments',
    itemEmoji: '⚗️',
  },

  natural_disaster: {
    topic: 'natural_disaster',
    mascotName: 'Rescue Rita',
    mascotEmoji: '🦸',
    setting: 'Emergency Center',
    settingBgColor: 0xfee2e2,
    settingTopColor: 0xfecaca,
    settingBottomColor: 0xef4444,
    intro: "Hello! I'm Rescue Rita. Help me match safety measures to disasters!",
    successMessage: "You helped Rita prepare for all the disasters! 🛡️",
    frameQuestion: (q) => q,
    itemWord: 'safety kits',
    itemEmoji: '🛡️',
  },

  air_composition: {
    topic: 'air_composition',
    mascotName: 'Sky Scientist Sana',
    mascotEmoji: '👩‍🔬',
    setting: 'Sky Observatory',
    settingBgColor: 0xbfdbfe,
    settingTopColor: 0x93c5fd,
    settingBottomColor: 0x3b82f6,
    intro: "Hello! I'm Sana the Sky Scientist. Help me build the atmosphere!",
    successMessage: "You helped Sana build the perfect atmosphere! 💨",
    frameQuestion: (q) => q,
    itemWord: 'gases',
    itemEmoji: '💨',
  },

  environment: {
    topic: 'environment',
    mascotName: 'Eco Eva',
    mascotEmoji: '🌱',
    setting: 'Forest',
    settingBgColor: 0xd9f99d,
    settingTopColor: 0xbbf7d0,
    settingBottomColor: 0x16a34a,
    intro: "Hello! I'm Eva the Eco Explorer. Help me sort living and non-living things!",
    successMessage: "You helped Eva sort all the environmental components! 🌍",
    frameQuestion: (q) => q,
    itemWord: 'items',
    itemEmoji: '🌍',
  },

  transport: {
    topic: 'transport',
    mascotName: 'Captain Karan',
    mascotEmoji: '🧑‍✈️',
    setting: 'Transport Hub',
    settingBgColor: 0xbfdbfe,
    settingTopColor: 0x93c5fd,
    settingBottomColor: 0x2563eb,
    intro: "Hello! I'm Captain Karan. Help me sort vehicles into transport categories!",
    successMessage: "You helped Karan sort all the vehicles! 🚗",
    frameQuestion: (q) => q,
    itemWord: 'vehicles',
    itemEmoji: '✈️',
  },

  computer_history: {
    topic: 'computer_history',
    mascotName: 'Tech Historian Tara',
    mascotEmoji: '👩‍💻',
    setting: 'Computer Museum',
    settingBgColor: 0xf3e8ff,
    settingTopColor: 0xe9d5ff,
    settingBottomColor: 0x7c3aed,
    intro: "Hello! I'm Tara the Tech Historian. Help me arrange computers on a timeline!",
    successMessage: "You helped Tara build the computer timeline! 💻",
    frameQuestion: (q) => q,
    itemWord: 'computers',
    itemEmoji: '💻',
  },

  body_parts: {
    topic: 'body_parts',
    mascotName: 'Dr. Body',
    mascotEmoji: '🧑‍⚕️',
    setting: 'Clinic',
    settingBgColor: 0xd1fae5,
    settingTopColor: 0xa7f3d0,
    settingBottomColor: 0x059669,
    intro: "Hello! I'm Dr. Body. Help me identify the parts of the body!",
    successMessage: "You helped Dr. Body identify all the body parts! 🫶",
    frameQuestion: (q) => q,
    itemWord: 'organs',
    itemEmoji: '🫀',
  },
};

/**
 * Get the story for a topic. Falls back to a generic story.
 */
export function getStory(topic: string): StoryContext {
  const normalized = topic.toLowerCase().replace(/\s+/g, '_');
  // Try exact match
  if (STORIES[normalized]) return STORIES[normalized];
  // Try partial matches
  for (const key of Object.keys(STORIES)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return STORIES[key];
    }
  }
  // Generic fallback
  return {
    topic,
    mascotName: 'Owl',
    mascotEmoji: '🦉',
    setting: 'Learning Forest',
    settingBgColor: 0xd9f99d,
    settingTopColor: 0xbbf7d0,
    settingBottomColor: 0x16a34a,
    intro: "Hi! I'm your learning buddy. Let's learn together!",
    successMessage: "Great job! You did it! 🎉",
    frameQuestion: (q) => q,
    itemWord: 'items',
    itemEmoji: '⭐',
  };
}
