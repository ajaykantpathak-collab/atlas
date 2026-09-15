// Fix RadioTVSim.tsx - fix broken template literals in variant question generator
const fs = require('fs');
const filePath = 'D:\\dream_app\\frontend\\components\\simulations\\c9_12\\RadioTVSim.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Fix broken template literals in variant questions
// Pattern: `...dB?` dB. What is the final output signal level in dB?;
// Should be: `...dB?`;
content = content.replace(/` dB\. What is the final output signal level in dB\?;/g, '`;');

// Pattern: `...dB.` dB.;
// Should be: `...dB.`;
content = content.replace(/` dB\.;/g, '`;');

// Pattern: `...dB?` dB?;
// Should be: `...dB?`;
content = content.replace(/` dB\?;/g, '`;');

// Pattern: (Please review carefully before submitting);
// Should be removed (it's leftover from broken template literal)
content = content.replace(/` \(Please review carefully before submitting\);/g, '`;');

// Fix duplicated CSS keyframes
content = content.replace(
  /<style>\{`\n\s*@keyframes dash \{\n\s*to \{\n\s*stroke-dashoffset: -40;\n\s*\}\n\s*\}\n\s*`\n\s*@keyframes dash \{\n\s*to \{\n\s*stroke-dashoffset: -40;\n\s*\}\n\s*\}\n\s*`}<\/style>/g,
  '<style>{`\n                    @keyframes dash {\n                      to {\n                        stroke-dashoffset: -40;\n                      }\n                    }\n                  `}</style>'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed RadioTVSim.tsx template literals and CSS');
