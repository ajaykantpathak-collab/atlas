/**
 * copy-kenney-assets.js
 * Copies useful Kenney CC0 assets to public/assets/kenney/
 */
const fs = require('fs');
const path = require('path');

const DEST = 'public/assets/kenney';

// Shape characters — bodies, faces, tiles
const shapeSrc = 'kenney_shapes/PNG/Default';
const shapeDest = path.join(DEST, 'shapes');
if (!fs.existsSync(shapeDest)) fs.mkdirSync(shapeDest, { recursive: true });

const usefulShapes = [
  'blue_body_circle', 'blue_body_square', 'blue_body_rhombus', 'blue_body_squircle',
  'green_body_circle', 'green_body_square', 'green_body_rhombus', 'green_body_squircle',
  'red_body_circle', 'red_body_square', 'red_body_rhombus', 'red_body_squircle',
  'yellow_body_circle', 'yellow_body_square', 'yellow_body_rhombus', 'yellow_body_squircle',
  'purple_body_circle', 'purple_body_square', 'pink_body_circle', 'pink_body_square',
  'face_a', 'face_b', 'face_c', 'face_d', 'face_e', 'face_f',
  'facial_part_mouth_happy', 'facial_part_mouth_sad', 'facial_part_mouth_angry',
  'facial_part_eye_open', 'facial_part_eye_closed_down',
  'tile_background_grass', 'tile_background_tree_large', 'tile_background_tree_small',
  'tile_cloud', 'tile_coin', 'tile_exclamation', 'shadow',
];

let shapeCount = 0;
usefulShapes.forEach(name => {
  const src = path.join(shapeSrc, name + '.png');
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(shapeDest, name + '.png'));
    shapeCount++;
  }
});

// UI Pack — buttons, stars, arrows, checkboxes
const uiColors = ['Green', 'Blue', 'Red', 'Yellow', 'Grey'];
const uiDest = path.join(DEST, 'ui');
if (!fs.existsSync(uiDest)) fs.mkdirSync(uiDest, { recursive: true });

const usefulUI = [
  'button_rectangle_flat', 'button_rectangle_gradient', 'button_rectangle_gloss',
  'button_round_flat', 'button_round_gradient', 'button_round_gloss',
  'button_square_flat', 'button_square_gradient',
  'star', 'star_outline',
  'icon_checkmark', 'icon_cross', 'icon_circle', 'icon_square',
  'check_round_color', 'check_square_color',
  'arrow_basic_e', 'arrow_basic_w', 'arrow_basic_n', 'arrow_basic_s',
];

let uiCount = 0;
uiColors.forEach(color => {
  usefulUI.forEach(name => {
    const src = path.join('kenney_ui/PNG', color, 'Default', name + '.png');
    if (fs.existsSync(src)) {
      const destName = color.toLowerCase() + '_' + name + '.png';
      fs.copyFileSync(src, path.join(uiDest, destName));
      uiCount++;
    }
  });
});

// Copy fonts
const fontSrc = 'kenney_ui/Font';
const fontDest = path.join(DEST, 'fonts');
if (!fs.existsSync(fontDest)) fs.mkdirSync(fontDest, { recursive: true });
fs.readdirSync(fontSrc).filter(f => f.endsWith('.ttf')).forEach(f => {
  fs.copyFileSync(path.join(fontSrc, f), path.join(fontDest, f));
});

// Copy sounds
const soundSrc = 'kenney_ui/Sounds';
const soundDest = path.join(DEST, 'sounds');
if (!fs.existsSync(soundDest)) fs.mkdirSync(soundDest, { recursive: true });
fs.readdirSync(soundSrc).filter(f => f.endsWith('.ogg')).forEach(f => {
  fs.copyFileSync(path.join(soundSrc, f), path.join(soundDest, f));
});

// Write license
const license = `Kenney Asset Packs — License
=============================

All assets in this directory are from Kenney.nl and licensed under CC0 (Public Domain).

Source: https://kenney.nl
License: CC0 1.0 Universal (http://creativecommons.org/publicdomain/zero/1.0/legalcode)

Attribution ("Kenney.nl" or "www.kenney.nl") is appreciated but not mandatory.

Packs used:
- Animal Pack Redux (30 animals, CC0)
- Food Kit (200+ food items, CC0)
- Shape Characters (100+ shape parts, CC0)
- UI Pack (430+ UI elements, CC0)

Copied: ${new Date().toISOString().split('T')[0]}
`;
fs.writeFileSync(path.join(DEST, 'LICENSE.txt'), license);

console.log(`Copied: ${shapeCount} shapes, ${uiCount} UI elements, fonts, sounds`);
