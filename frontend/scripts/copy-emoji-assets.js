/**
 * copy-emoji-assets.js
 *
 * Copies specific OpenMoji SVG files to public/assets/emoji/ for use in the game.
 * OpenMoji is licensed under CC BY-SA 4.0 — attribution required.
 *
 * Attribution: All emojis designed by OpenMoji (https://openmoji.org)
 * License: CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0/)
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'node_modules', 'openmoji', 'color', 'svg');
const DEST_DIR = path.join(__dirname, '..', 'public', 'assets', 'emoji');

// Ensure dest exists
if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true });
}

// Map of friendly names to OpenMoji hex codes
const EMOJI_MAP = {
  // Counting objects
  'apple': '1F34E',
  'mango': '1F96D',
  'cupcake': '1F9C1',
  'cake': '1F382',
  'star': '2B50',
  'ball': '26BD',
  'coin': '1FA99',
  'fish': '1F41F',
  'flower': '1F339',
  'tulip': '1F337',
  'sunflower': '1F33B',

  // Animals
  'bird': '1F426',
  'frog': '1F438',
  'rabbit': '1F430',
  'deer': '1F98C',
  'butterfly': '1F98B',
  'owl': '1F989',
  'dog': '1F415',
  'cat': '1F408',
  'tiger': '1F405',
  'monkey': '1F412',
  'elephant': '1F418',
  'lion': '1F981',

  // Nature / world
  'tree': '1F333',
  'sun': '2600',
  'sun-face': '1F31E',
  'cloud': '2601',
  'cloud-rain': '1F327',
  'rainbow': '1F308',
  'leaf': '1F343',
  'seedling': '1F331',
  'plant': '1FAB4',
  'herb': '1F33F',
  'cactus': '1F335',
  'full-moon': '1F315',
  'snowflake': '2744',
  'snowman': '2603',
  'mountain': '26F0',
  'volcano': '1F30B',
  'ocean': '1F30A',
  'earth': '1F30F',
  'umbrella': '2602',
  'recycle': '267B',

  // Buildings / world elements
  'house': '1F3E0',
  'fountain': '26F2',
  'bridge': '1F309',
  'windmill': '1F3ED', // factory — closest to windmill
  'trophy': '1F3C6',

  // Food
  'pizza': '1F355',

  // Science
  'test-tube': '1F9EA',
  'microscope': '1F52C',
  'thermometer': '1F321',
  'light-bulb': '1F4A1',
  'rocket': '1F680',

  // Celebrations
  'sparkles': '2728',
  'confetti': '1F38A',
  'party-popper': '1F389',
  'heart': '2764',
  'fire': '1F525',

  // UI
  'water': '1F4A7', // droplet
};

let copied = 0;
let missing = 0;

Object.entries(EMOJI_MAP).forEach(([name, hex]) => {
  // OpenMoji filenames: hexcode.svg (with - for variation selectors)
  const filename = hex + '.svg';
  const srcPath = path.join(SRC_DIR, filename);
  const destPath = path.join(DEST_DIR, name + '.svg');

  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    copied++;
  } else {
    console.error('MISSING: ' + name + ' (' + filename + ')');
    missing++;
  }
});

// Write license/attribution file
const licenseContent = `OpenMoji Attribution
===================

All emoji images in this directory are from the OpenMoji project.

Source: https://openmoji.org
GitHub: https://github.com/hfg-gmuend/openmoji
License: CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0/)

Attribution:
"All emojis designed by OpenMoji (https://openmoji.org) — License: CC BY-SA 4.0"

Copied: ${new Date().toISOString().split('T')[0]}
`;

fs.writeFileSync(path.join(DEST_DIR, 'LICENSE.txt'), licenseContent);

console.log(`Copied ${copied} emoji SVGs to public/assets/emoji/`);
if (missing > 0) console.log(`${missing} emoji were not found`);
