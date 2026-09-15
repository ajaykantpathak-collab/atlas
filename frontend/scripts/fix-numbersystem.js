// Fix NumberSystemConverterSimulation.tsx - remove duplicated/triplicated definition content
const fs = require('fs');
const filePath = 'D:\\dream_app\\frontend\\components\\simulations\\c6_8\\NumberSystemConverterSimulation.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// The definition starts with: definition: `The binary number system...
// The first backtick close is at: ...0 and 1.`The binary number system...
// Then the content is duplicated again, ending with: ...0 and 1.,
// We need to keep only the first copy and close with `,

// Find the first backtick after the definition starts
const defStart = content.indexOf("definition: `The binary number system");
if (defStart === -1) {
  console.log('Could not find definition start');
  process.exit(1);
}

// Find the first backtick close (the one in the middle of the content)
// It's after "0 and 1." followed by "The binary number system"
const firstClose = content.indexOf("0 and 1.`The binary number system", defStart);
if (firstClose === -1) {
  console.log('Could not find first backtick close');
  process.exit(1);
}

// Find the end of the duplicated content (the comma after the last "0 and 1.")
// Search from the firstClose forward for "0 and 1.," 
const dupEnd = content.indexOf("0 and 1.,", firstClose);
if (dupEnd === -1) {
  console.log('Could not find duplication end');
  process.exit(1);
}

// Keep everything up to "0 and 1." (before the backtick), then close with `,
const before = content.substring(0, firstClose + "0 and 1.".length);
const after = content.substring(dupEnd + "0 and 1.,".length);

content = before + "`," + after;

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed NumberSystemConverterSimulation.tsx definition');
