/**
 * Extract sortItems and bins from original TSX game files
 * and merge them into the extracted JSON files.
 *
 * The TSX files have inline data like:
 *   sortItems: [
 *     { id: 'a1', label: '3 + 4 = ?', emoji: '🥭', correctBin: '7' },
 *     ...
 *   ],
 *   bins: [
 *     { id: '7', label: 'Sum: 7', color: '#F59E0B' },
 *     ...
 *   ],
 */

const fs = require('fs');
const path = require('path');

const SIM_DIR = 'D:/dream_app/frontend/components/simulations';
const DATA_DIR = 'D:/dream_app/frontend/data/games';
const PUBLIC_DIR = 'D:/dream_app/frontend/public/data/games';
const CLASSES = ['class1', 'class2', 'class3', 'class4', 'class5'];

// ─── Parse sortItems and bins from TSX content ──────────────

function extractSortData(tsxContent) {
  const results = [];

  // Find all challenge blocks that contain sortItems
  // We need to find each sortItems array and its corresponding bins array
  // Strategy: find each "sortItems:" occurrence, parse the array after it,
  // then find the nearest "bins:" after it and parse that array.

  const sortItemsRegex = /sortItems:\s*\[/g;
  let match;

  while ((match = sortItemsRegex.exec(tsxContent)) !== null) {
    const sortItemsStart = match.index + match[0].length;
    const sortItemsText = extractArrayContent(tsxContent, sortItemsStart);
    const sortItems = parseSortItems(sortItemsText);

    // Find bins after this sortItems
    const binsSearchStart = sortItemsStart + sortItemsText.length;
    const binsMatch = /bins:\s*\[/.exec(tsxContent.substring(binsSearchStart));
    let bins = [];
    if (binsMatch && binsMatch.index < 500) { // bins should be close to sortItems
      const binsStart = binsSearchStart + binsMatch.index + binsMatch[0].length;
      const binsText = extractArrayContent(tsxContent, binsStart);
      bins = parseBins(binsText);
    }

    results.push({ sortItems, bins });
  }

  return results;
}

// Extract content between [ and ] accounting for nested brackets
function extractArrayContent(text, startIdx) {
  let depth = 1;
  let idx = startIdx;
  let inString = false;
  let stringChar = '';

  while (idx < text.length && depth > 0) {
    const ch = text[idx];
    if (inString) {
      if (ch === stringChar && text[idx - 1] !== '\\') {
        inString = false;
      }
    } else {
      if (ch === "'" || ch === '"' || ch === '`') {
        inString = true;
        stringChar = ch;
      } else if (ch === '[') {
        depth++;
      } else if (ch === ']') {
        depth--;
      }
    }
    idx++;
  }

  return text.substring(startIdx, idx - 1);
}

// Parse sortItems array content into objects
function parseSortItems(arrayContent) {
  const items = [];
  // Match each object: { id: '...', label: '...', emoji: '...', correctBin: '...' }
  // The fields can be in any order
  const objRegex = /\{([^}]+)\}/g;
  let m;
  while ((m = objRegex.exec(arrayContent)) !== null) {
    const objContent = m[1];
    const idMatch = objContent.match(/id:\s*['"`]([^'"`]+)['"`]/);
    const labelMatch = objContent.match(/label:\s*['"`]([^'"`]+)['"`]/);
    const emojiMatch = objContent.match(/emoji:\s*['"`]([^'"`]+)['"`]/);
    const correctBinMatch = objContent.match(/correctBin:\s*['"`]([^'"`]+)['"`]/);
    if (idMatch && labelMatch && correctBinMatch) {
      items.push({
        id: idMatch[1],
        label: labelMatch[1],
        emoji: emojiMatch ? emojiMatch[1] : '',
        correctBin: correctBinMatch[1],
      });
    }
  }
  return items;
}

// Parse bins array content into objects
function parseBins(arrayContent) {
  const bins = [];
  // Match each object: { id: '...', label: '...', color: '...' }
  const objRegex = /\{[^}]*id:\s*['"`]([^'"`]+)['"`][^}]*label:\s*['"`]([^'"`]+)['"`][^}]*\}/g;
  let m;
  while ((m = objRegex.exec(arrayContent)) !== null) {
    // Try to extract color
    const colorMatch = arrayContent.match(new RegExp(`id:\\s*['"\`]${escapeRegex(m[1])}['"\`][^}]*color:\\s*['"\`]([^'"\`]+)['"\`]`));
    bins.push({
      id: m[1],
      label: m[2],
      color: colorMatch ? colorMatch[1] : '#6c5ce7',
    });
  }
  return bins;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ─── Main ───────────────────────────────────────────────────

function main() {
  const manifest = JSON.parse(fs.readFileSync(path.join(DATA_DIR, '_manifest.json'), 'utf8'));
  let fixed = 0;
  let stillBroken = 0;
  let errors = 0;

  for (const entry of manifest) {
    const gameFile = entry.gameFile;
    const classLevel = entry.classLevel;
    const classDir = `class${classLevel}`;
    const tsxPath = path.join(SIM_DIR, classDir, `${gameFile}.tsx`);

    if (!fs.existsSync(tsxPath)) {
      console.error(`  TSX not found: ${tsxPath}`);
      errors++;
      continue;
    }

    const tsxContent = fs.readFileSync(tsxPath, 'utf8');
    const sortData = extractSortData(tsxContent);

    if (sortData.length === 0) {
      continue; // No sort challenges in this game
    }

    // Load the JSON file
    const jsonPath = path.join(DATA_DIR, entry.dataFile);
    const game = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

    // Find sort challenges in the JSON and assign sortItems/bins
    let sortIdx = 0;
    let gameFixed = 0;

    for (let i = 0; i < game.challenges.length; i++) {
      const ch = game.challenges[i];
      const isSort = ch.type && (ch.type.startsWith('sort') || ch.type === 'sort');
      const hasNoOptions = !ch.options || ch.options.length === 0;
      const hasNoSortItems = !ch.sortItems || ch.sortItems.length === 0;

      if (isSort && hasNoOptions) {
        // Always update sort challenges with sort data (to get emojis)
        if (sortIdx < sortData.length && sortData[sortIdx].sortItems.length > 0) {
          ch.sortItems = sortData[sortIdx].sortItems;
          ch.bins = sortData[sortIdx].bins;
          sortIdx++;
          gameFixed++;
        } else if (hasNoSortItems) {
          stillBroken++;
          console.error(`  No sort data for ${entry.dataFile} ch${i} (type=${ch.type})`);
        }
      }
    }

    if (gameFixed > 0) {
      // Save to both data/ and public/data/
      fs.writeFileSync(jsonPath, JSON.stringify(game, null, 2));
      const publicPath = path.join(PUBLIC_DIR, entry.dataFile);
      if (fs.existsSync(publicPath)) {
        fs.writeFileSync(publicPath, JSON.stringify(game, null, 2));
      }
      fixed += gameFixed;
      console.log(`  ${entry.dataFile}: fixed ${gameFixed} sort challenges`);
    }
  }

  console.log(`\n=== RESULTS ===`);
  console.log(`Fixed: ${fixed} sort challenges`);
  console.log(`Still broken: ${stillBroken}`);
  console.log(`Errors: ${errors}`);
}

main();
