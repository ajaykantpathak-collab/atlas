// Fix sim-engine component props in generated files
// Replaces wrong props (show, text) with correct pattern (conditional render, message, onComplete)
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'components', 'simulations', 'c6_12');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

let totalFixed = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Fix HintBubble: <HintBubble show={X} text={Y} /> → {X && <HintBubble message={Y} onComplete={() => setX(false)} />}
  // Pattern 1: <HintBubble show={showHint} text={currentHint} />
  if (content.includes('<HintBubble') && content.includes('show=')) {
    content = content.replace(
      /<HintBubble\s+show=\{(\w+)\}\s+text=\{([^}]+)\}\s*\/>/g,
      '{$1 && <HintBubble message={$2} onComplete={() => set$1(false)} />}'
    );
    // Pattern 2: <HintBubble show={showHint} text="..." />
    content = content.replace(
      /<HintBubble\s+show=\{(\w+)\}\s+text="([^"]+)"\s*\/>/g,
      '{$1 && <HintBubble message="$2" onComplete={() => set$1(false)} />}'
    );
    // Pattern 3: multi-line
    content = content.replace(
      /<HintBubble\s+show=\{(\w+)\}\s+text=\{([^}]+)\}\s*>/g,
      '{$1 && <HintBubble message={$2} onComplete={() => set$1(false)}>'
    );
    modified = true;
  }

  // Fix Confetti: <Confetti show={X} /> → {X && <Confetti onComplete={() => setX(false)} />}
  if (content.includes('<Confetti') && content.includes('show=')) {
    content = content.replace(
      /<Confetti\s+show=\{(\w+)\}\s*\/>/g,
      '{$1 && <Confetti onComplete={() => set$1(false)} />}'
    );
    content = content.replace(
      /<Confetti\s+show=\{(\w+)\}\s*>/g,
      '{$1 && <Confetti onComplete={() => set$1(false)}>'
    );
    modified = true;
  }

  // Fix SuccessBanner: <SuccessBanner show={X} text={Y} /> → {X && <SuccessBanner message={Y} onComplete={() => setX(false)} />}
  if (content.includes('<SuccessBanner') && content.includes('show=')) {
    content = content.replace(
      /<SuccessBanner\s+show=\{(\w+)\}\s+text=\{([^}]+)\}\s*\/>/g,
      '{$1 && <SuccessBanner message={$2} onComplete={() => set$1(false)} />}'
    );
    content = content.replace(
      /<SuccessBanner\s+show=\{(\w+)\}\s+text="([^"]+)"\s*\/>/g,
      '{$1 && <SuccessBanner message="$2" onComplete={() => set$1(false)} />}'
    );
    content = content.replace(
      /<SuccessBanner\s+show=\{(\w+)\}\s+text=\{([^}]+)\}\s*>/g,
      '{$1 && <SuccessBanner message={$2} onComplete={() => set$1(false)}>'
    );
    modified = true;
  }

  // Fix SparkleBurst: <SparkleBurst show={X} x={Y} y={Z} /> → {X && <SparkleBurst x={Y} y={Z} onComplete={() => setX(false)} />}
  if (content.includes('<SparkleBurst') && content.includes('show=')) {
    content = content.replace(
      /<SparkleBurst\s+show=\{(\w+)\}\s+x=\{([^}]+)\}\s+y=\{([^}]+)\}\s*\/>/g,
      '{$1 && <SparkleBurst x={$2} y={$3} onComplete={() => set$1(false)} />}'
    );
    content = content.replace(
      /<SparkleBurst\s+show=\{(\w+)\}\s+x=\{([^}]+)\}\s+y=\{([^}]+)\}\s*>/g,
      '{$1 && <SparkleBurst x={$2} y={$3} onComplete={() => set$1(false)}>'
    );
    modified = true;
  }

  // Fix slider syntax: type="range" min="5" max="X} max={Y} → type="range" min={5} max={Y}
  // This fixes the broken slider attributes
  const sliderPattern = /type="range"\s+min="(\d+)"\s+max="[^"]*}\s+max=\{(\d+)\}/g;
  if (sliderPattern.test(content)) {
    content = content.replace(sliderPattern, 'type="range" min={$1} max={$2}');
    modified = true;
  }

  // Fix any remaining: text= prop on HintBubble/SuccessBanner (without show)
  if (content.includes('<HintBubble') && content.includes('text=')) {
    content = content.replace(/<HintBubble\s+text=/g, '<HintBubble message=');
    modified = true;
  }
  if (content.includes('<SuccessBanner') && content.includes('text=')) {
    content = content.replace(/<SuccessBanner\s+text=/g, '<SuccessBanner message=');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalFixed++;
    console.log(`Fixed: ${file}`);
  }
}

console.log(`\nTotal files fixed: ${totalFixed}/${files.length}`);
