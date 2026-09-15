const fs = require('fs');
const path = require('path');

const dir = 'D:/platform/cbse_data/upper_primary_text';

const subjectFiles = {
    'Physics-at-Upper-Primary-Level-1.txt': 'Physics',
    'Chemistry-at-Upper-Primary-Level-1.txt': 'Chemistry',
    'Biology-at-the-upper-Primary-Level.txt': 'Biology',
    'Geography-at-Upper-Primary-Level.txt': 'Geography',
    'History-and-Civics-at-Upper-Primary-Level.txt': 'History_Civics',
    'Module-II-Maths.txt': 'Mathematics',
};

const allResults = {};

for (const [fname, subject] of Object.entries(subjectFiles)) {
    const fpath = path.join(dir, fname);
    if (!fs.existsSync(fpath)) continue;
    const content = fs.readFileSync(fpath, 'utf8');
    const clean = content.replace(/\s+/g, ' ');

    // Find Theme patterns - the syllabus lists themes like:
    // "Theme: Physical Quantities and Measurement"
    // "the Theme, 'Physical Quantities and Measurement', covers"
    const themes = new Set();

    // Pattern 1: Theme, 'Name', covers
    let m;
    const p1 = /Theme,?\s*['"]([^'"]{5,80})['"]?,?\s*(?:covers|deals|includes|begin|is)/gi;
    while ((m = p1.exec(clean)) !== null) themes.add(m[1].trim());

    // Pattern 2: Theme: Name (followed by class or key concepts)
    const p2 = /Theme:\s*([A-Z][a-zA-Z\s\-,&()]{5,80}?)(?:\.|,|;|\s+Class|\s+Theme|\s+Key|\s+Suggested|\s+Sub)/gi;
    while ((m = p2.exec(clean)) !== null) {
        let t = m[1].trim();
        if (!t.match(/^(begins|Key|with|covers|deals|includes|Suggested|the)/i) &&
            !t.match(/Concepts|Transactional|Learning Resources/i)) {
            themes.add(t);
        }
    }

    // Pattern 3: Theme Name - look for capitalized phrases after "Theme"
    const p3 = /Theme\s+([A-Z][a-z]+(?:\s+[A-Z]?[a-z]+){0,10})/g;
    while ((m = p3.exec(clean)) !== null) {
        let t = m[1].trim();
        if (t.length > 8 && t.length < 100 &&
            !t.match(/^(begins|Key|with|covers|deals|includes|Suggested|the)/i) &&
            !t.match(/Concepts|Transactional|Learning Resources/i)) {
            themes.add(t);
        }
    }

    // Also extract key concepts mentioned in the text
    // Look for patterns like "covers key concepts related to X, Y, Z"
    const concepts = new Set();
    const cp = /key concepts (?:related to |such as |like )([^.]{10,500})/gi;
    while ((m = cp.exec(clean)) !== null) {
        const conceptText = m[1].trim();
        // Split by semicolons or commas
        const parts = conceptText.split(/[;]/);
        for (const part of parts) {
            const trimmed = part.trim().replace(/^(and|or|the|a|an)\s+/i, '');
            if (trimmed.length > 10 && trimmed.length < 200) {
                concepts.add(trimmed);
            }
        }
    }

    const themeList = [...themes].sort();
    const conceptList = [...concepts].sort();

    allResults[subject] = { themes: themeList, concepts: conceptList };

    console.log(`=== ${subject} (${themeList.length} themes, ${conceptList.length} concept groups) ===`);
    for (const t of themeList) console.log(`  THEME: ${t}`);
    for (const c of conceptList.slice(0, 10)) console.log(`  CONCEPT: ${c.substring(0, 120)}`);
    console.log('');
}

// Save results
fs.writeFileSync('D:/platform/cbse_data/upper_primary_themes.json', JSON.stringify(allResults, null, 2));
console.log('Saved to D:/platform/cbse_data/upper_primary_themes.json');
