const https = require('https');
const fs = require('fs');

const key = 'AQ.Ab8RN6JQsjDH9MWFSdbXUsWwRHBgUyilNKzK-1a0tFAPieMYCA';
const model = 'gemini-3.5-flash';

const template = {
  key: 'SolidStateSim',
  name: 'Solid State Lab',
  description: 'Crystal lattice builder (cubic, tetragonal, orthorhombic, hexagonal). Unit cell types (simple, body-centered, face-centered). Packing efficiency calculator. Void types (tetrahedral, octahedral). Defects in solids (Schottky, Frenkel).',
  nodes: 'C12: solid state, classification (crystalline, amorphous), unit cell, crystal systems, packing (hcp, ccp, bcc), packing efficiency, voids, defects (point, Schottky, Frenkel), properties.',
  controls: 'Crystal system selector, unit cell type selector, packing type selector, defect type selector.',
  readouts: 'Lattice type, Coordination number, Packing efficiency, Density, Number of atoms per unit cell',
  challenges: '1) What is the coordination number of bcc? 2) What is the packing efficiency of fcc? 3) What is a Schottky defect?',
};

const prompt = `You are an expert educational software engineer for CISCE Classes 9-12.
Create a React/TypeScript simulation component for: ${template.name}
Description: ${template.description}
Nodes: ${template.nodes}
Controls: ${template.controls}
Readouts: ${template.readouts}
Challenges: ${template.challenges}

Requirements:
- 'use client' directive at top
- Export interface with onComplete?: (score: number) => void
- SVG-based interactive visualization with gradients
- Adaptive difficulty (foundation/standard/advanced)
- localStorage progress tracking
- Spaced repetition (3, 7, 21 day review)
- Guided discovery (explore before formula)
- Progressive hint system (nudge -> formula -> worked example)
- Misconception feedback
- Real-world activity
- 600+ lines minimum
- Framer Motion animations
- TypeScript only, no markdown fences, no explanation

Output ONLY TypeScript/TSX code starting with 'use client';`;

const body = JSON.stringify({
  contents: [{ parts: [{ text: prompt }] }],
  generationConfig: { temperature: 0.7, maxOutputTokens: 65536, topP: 0.9 }
});

console.log('Calling Gemini', model, '...', prompt.length, 'chars');

const req = https.request({
  hostname: 'generativelanguage.googleapis.com',
  path: '/v1beta/models/' + model + ':generateContent?key=' + key,
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
}, (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    if (res.statusCode === 200) {
      const j = JSON.parse(data);
      const text = j.candidates?.[0]?.content?.parts?.[0]?.text || '';
      console.log('Output:', text.length, 'chars');
      let code = text;
      if (code.startsWith('```')) code = code.replace(/^```[a-z]*\n/, '').replace(/```$/, '');
      if (!code.startsWith("'use client'") && code.includes("'use client'")) {
        code = code.substring(code.indexOf("'use client'"));
      }
      if (code.startsWith("use client'")) code = "'" + code;
      const lines = code.split('\n').length;
      console.log('Lines:', lines);
      fs.writeFileSync('components/simulations/c9_12/SolidStateSim.tsx', code, 'utf-8');
      console.log('Saved!');
    } else {
      console.log('Error:', data.substring(0, 200));
    }
  });
});
req.write(body);
req.end();
