// Fix RadioTVSim.tsx - remove duplicated questions and fix broken options
const fs = require('fs');
const filePath = 'D:\\dream_app\\frontend\\components\\simulations\\c9_12\\RadioTVSim.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Find the broken question 8 options that has the backtick string bleeding in
// and remove everything from there through the duplicated questions 6,7,8
const brokenStart = content.indexOf("'To make the room look modern and dark',\n        'To absorb sound waves and prevent reverberation',\n        `It is a musical signature");

if (brokenStart === -1) {
  console.log('Could not find broken section start');
  process.exit(1);
}

// Find the end of the duplicated section - the closing ],
const brokenEnd = content.indexOf("    }\n  ],\n  masteryCriteria:", brokenStart);

if (brokenEnd === -1) {
  console.log('Could not find broken section end');
  process.exit(1);
}

// The correct question 8 that should replace the broken+duplicated section
const correctQ8 = `        "To make the room look modern and dark",
        'To absorb sound waves and prevent reverberation',
        "To amplify the presenter's voice naturally",
        'To block external traffic noise from entering'
      ],
      hint: 'Hard, polished surfaces reflect sound waves, creating echoes (reverberation) that ruin vocal clarity. Soft, porous materials trap sound energy.',
      misconceptionTrigger: '0'
    }
  ],`;

// Find where to start the replacement - we need to go back to the 'options: [' line
const optionsStart = content.lastIndexOf('options: [', brokenStart);

// Replace from options: [ through the broken section end
const before = content.substring(0, optionsStart);
const after = content.substring(brokenEnd + '    }\n  ],'.length);

content = before + 'options: [\n' + correctQ8 + after;

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed RadioTVSim.tsx questions section');
