// Fix RadioTVSim.tsx - remove remaining duplicated sections in PROGRESS
const fs = require('fs');
const filePath = 'D:\\dream_app\\frontend\\components\\simulations\\c9_12\\RadioTVSim.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Remove broken leftover 1: "const savedReview = \n    if (savedMastery) { ... }"
// This is between the first savedMastery block and the correct savedReview
content = content.replace(
  /    \}\n\n    const savedReview = \n    if \(savedMastery\) \{\n      try \{\n        const parsed = JSON\.parse\(savedMastery\);\n        setPreviousAttempt\(parsed\);\n        setMasteryScore\(parsed\.score\);\n      \} catch \(e\) \{\n        console\.error\('Error parsing mastery progress', e\);\n      \}\n    \}\n\n    const savedReview = localStorage\.getItem\(/g,
  '    }\n\n    const savedReview = localStorage.getItem('
);

// Remove broken leftover 2: "if (savedReview) { setNextReviewDate(savedReview); } }, [nodeId]);"
// that appears between the first saveMasteryProgress start and the second one
content = content.replace(
  /    \};\n    \n    if \(savedReview\) \{\n      setNextReviewDate\(savedReview\);\n    \}\n  \}, \[nodeId\]\);\n\n  const saveMasteryProgress = \(finalScore: number\) => \{/g,
  '    };\n\n  const saveMasteryProgress = (finalScore: number) => {'
);

// Remove broken leftover 3: The first broken saveMasteryProgress copy
// "localStorage.setItem(c912_mastery_${nodeId}` ..." through "const reviewDateString = "
// Keep the second correct copy
content = content.replace(
  /    localStorage\.setItem\(c912_mastery_\$\{nodeId\}`, JSON\.stringify\(masteryData\)\);\n    setMasteryScore\(finalScore\);\n\n    \/\/ Spaced Repetition calculation\n    let daysToAdd = 3;\n    if \(finalScore >= 90\) daysToAdd = 21;\n    else if \(finalScore >= 70\) daysToAdd = 7;\n    const reviewDate = new Date\(\);\n    reviewDate\.setDate\(today\.getDate\(\) \+ daysToAdd\);\n    const reviewDateString = \n    setMasteryScore\(finalScore\);\n\n    \/\/ Spaced Repetition calculation\n    let daysToAdd = 3;\n    if \(finalScore >= 90\) daysToAdd = 21;\n    else if \(finalScore >= 70\) daysToAdd = 7;\n    const reviewDate = new Date\(\);\n    reviewDate\.setDate\(today\.getDate\(\) \+ daysToAdd\);\n    const reviewDateString = reviewDate\.toLocaleDateString/g,
  '    localStorage.setItem(`c912_mastery_${nodeId}`, JSON.stringify(masteryData));\n    setMasteryScore(finalScore);\n\n    // Spaced Repetition calculation\n    let daysToAdd = 3;\n    if (finalScore >= 90) daysToAdd = 21;\n    else if (finalScore >= 70) daysToAdd = 7;\n    const reviewDate = new Date();\n    reviewDate.setDate(today.getDate() + daysToAdd);\n    const reviewDateString = reviewDate.toLocaleDateString'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed RadioTVSim.tsx remaining duplications');
