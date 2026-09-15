// Generate single template with Gemini 3.6-flash
const fs = require('fs');
const https = require('https');

const KEY = 'AQ.Ab8RN6JQsjDH9MWFSdbXUsWwRHBgUyilNKzK-1a0tFAPieMYCA';
const MODEL = 'gemini-3.5-flash';

const prompt = `You are a senior React/TypeScript engineer building interactive educational simulations for a CISCE learning platform. Generate ONE complete, compilable simulation component.

## CRITICAL API USAGE:
audioManager.play('tap') / audioManager.play('success') / audioManager.play('error') / audioManager.play('celebration') / audioManager.play('hint') / audioManager.play('pickup') / audioManager.play('drop-correct') / audioManager.play('drop-wrong') / audioManager.play('whoosh') / audioManager.play('sparkle') / audioManager.play('chime') / audioManager.play('pop')
speechManager.speak('text here') — call 5+ times
<HintBubble show={showHint} text={hint} /> / <Confetti show={showConfetti} /> / <SuccessBanner show={showSuccess} text="Done!" /> / <SparkleBurst show={showSparkle} x={400} y={300} />

## Requirements:
1. 'use client' at top
2. Imports: React, framer-motion, sim-engine (audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst), Draggable
3. Default export, Props interface with enrichment data
4. 800+ lines, topic-specific SVG, 8+ challenges, 5 teaching slides
5. adaptive difficulty, localStorage mastery_, spaced repetition, onComplete callback
6. No 'any' type

## TEMPLATE:
Name: PhysicsWorldSim
File: components/simulations/class1/PhysicsWorldSim.tsx
Class: C1-5
Subject: Physics
Nodes: c1_phy_007-008, c2_phy_009-010, c5_phy_012
Teaches: Sun and seasons, Earths tilt, day-night cycle, cardinal directions
Interactive: Drag Earth to orbit Sun, rotate Earth for day/night, compass game, shadow-length tracker

Output ONLY code in a single tsx code block.`;

const body = JSON.stringify({
  contents: [{ parts: [{ text: prompt }] }],
  generationConfig: { maxOutputTokens: 65536, temperature: 0.7 },
});

const req = https.request({
  hostname: 'generativelanguage.googleapis.com',
  path: `/v1beta/models/${MODEL}:generateContent?key=${KEY}`,
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
}, (res) => {
  let data = '';
  res.on('data', (c) => data += c);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      if (json.error) { console.log('Error:', json.error.message); return; }
      const text = json.candidates?.[0]?.content?.parts?.[0]?.text || '';
      let code = text.match(/```tsx\n([\s\S]*?)```/)?.[1] || text.match(/```\n([\s\S]*?)```/)?.[1] || text;
      fs.writeFileSync('D:\\dream_app\\frontend\\components\\simulations\\class1\\PhysicsWorldSim.tsx', code, 'utf8');
      console.log(`OK: ${code.split('\n').length} lines saved`);
    } catch (e) { console.log('Parse error:', e.message); }
  });
});
req.on('error', (e) => console.log('Error:', e.message));
req.write(body);
req.end();
