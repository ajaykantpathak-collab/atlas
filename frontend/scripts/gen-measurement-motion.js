// Build prompts for measurement-lab and motion-cart, then call Gemini
const fs = require('fs');
const path = require('path');
const https = require('https');

const KEYS = {
  '1': 'AQ.Ab8RN6LDccrCPDvyQ4nFydMGXEz0XYJexA1VBgyA1AKvmnUEwg',
  '2': 'AQ.Ab8RN6KNABGpFE0AN7Mgsu0wWlMTd94M-ZfNncE0W7Iz41TKdA',
};

function buildPrompt(templateName, componentName, subject, topic, enrichmentData) {
  const refTemplate = fs.readFileSync(path.join(__dirname, 'ref-template.txt'), 'utf8');
  const nodes = JSON.parse(enrichmentData).slice(0, 5);
  return `You are generating a React/TypeScript simulation component for a CISCE Class 6-8 science learning platform.

TASK: Generate a complete ${componentName}.tsx component about ${topic}.

This is for STRUGGLING students. It must TEACH through interaction, not just decorate.

CRITICAL: Follow this EXACT template structure from the reference file below. Use Tailwind CSS classes (NOT inline styles). Light theme (white bg, slate text, blue accents).

The component MUST have these sections in this order:
1. HEADER — node ID badge, title, score badge
2. TABS — 3 tabs: "💡 Simple Explanation (ELI5)", "📖 ${subject} Theory", "⚠️ Common Misconceptions" with AnimatePresence
3. MAIN GRID — grid-cols-1 lg:grid-cols-[1fr_320px]:
   - LEFT: SVG simulation canvas with mode selector buttons + reset button
   - RIGHT: Live Readouts card (with EDITABLE number inputs that update the simulation) + Controls card (sliders with min/max labels)
4. PROGRESSIVE CHALLENGES — full width, with formula display, answer input (number/text/mcq), feedback with step-by-step working, check answer, next, hint
5. REAL-WORLD ACTIVITY — full width, textarea for observation, submit button

STRICT REQUIREMENTS:
- 'use client' at top
- import React, { useState, useEffect, useRef, useCallback } from 'react'
- import { motion, AnimatePresence } from 'framer-motion'
- Export interface ${componentName}Props with: nodeId?, title?, definition?, eli5?, misconceptions?, diagnosticQuestions?, masteryCriteria?, onComplete?
- diagnosticQuestions items: number, bloomLevel, question, answer, answerType ('number'|'text'|'mcq'), unit?, formula?, working?, options?, hint?
- Default props MUST use the REAL enrichment data from the first node below
- 3 progressive challenges: recall -> apply -> evaluate
- Each challenge MUST require interacting with the simulation
- Each challenge MUST show formula, working (step-by-step), and meaningful feedback
- Live readouts MUST be editable <input type="number"> fields that update the simulation
- Sliders MUST have min/max explanatory labels
- Reset button to restore defaults
- SVG must show a topic-specific interactive visualization
- Mode selector buttons for different aspects of the topic
- All Tailwind classes, NO inline styles except for SVG attributes
- Must compile with TypeScript (no 'any' types, no unused imports, no LaTeX in JSX)
- Target 700-900 lines
- Do NOT use LaTeX notation — use plain text

CHALLENGE DESIGN:
- Derive the 3 challenges from the enrichment diagnostic questions below
- Challenge 1 (recall): Set a value in the simulation and read a readout. Numeric answer.
- Challenge 2 (apply): Calculation problem based on the topic. Show formula, provide values, student calculates. Numeric answer with unit.
- Challenge 3 (evaluate): Change something in the simulation and explain. Text answer.
- Each challenge's "working" field must show step-by-step solution
- Each challenge's "hint" must guide the student to use the simulation

Here is the REAL ENRICHMENT DATA. Use the first node's content for default props:

--- ENRICHMENT DATA ---
${JSON.stringify(nodes, null, 2)}
--- END ENRICHMENT DATA ---

Here is the REFERENCE TEMPLATE (LightRaySimulation.tsx) — follow its EXACT structure:

--- REFERENCE TEMPLATE ---
${refTemplate}
--- END REFERENCE TEMPLATE ---

Generate the COMPLETE ${componentName}.tsx file. Output ONLY the TypeScript code, no markdown fences, no explanations.`;
}

function callGemini(promptFile, outputFile, keyIndex) {
  return new Promise((resolve, reject) => {
    const apiKey = KEYS[keyIndex];
    const prompt = fs.readFileSync(promptFile, 'utf8');
    const body = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: 65536, temperature: 0.7 },
    });
    const options = {
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/gemini-flash-lite-latest:generateContent?key=${apiKey}`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`API error ${res.statusCode}: ${data.substring(0, 300)}`));
          return;
        }
        try {
          const json = JSON.parse(data);
          const text = json.candidates?.[0]?.content?.parts?.[0]?.text || '';
          const cleaned = text.replace(/^```tsx?\n/, '').replace(/\n```$/, '');
          fs.writeFileSync(outputFile, cleaned);
          resolve({ file: outputFile, lines: cleaned.split('\n').length, chars: cleaned.length });
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}`));
        }
      });
    });
    req.on('error', (e) => reject(new Error(`Request error: ${e.message}`)));
    req.write(body);
    req.end();
  });
}

async function main() {
  const templates = [
    { template: 'measurement-lab', component: 'MeasurementLabSimulation', subject: 'Physics', topic: 'Measurement (length, mass, time, temperature, area, density measurement with rulers, balances, thermometers, graph paper)' },
    { template: 'motion-cart', component: 'MotionCartSimulation', subject: 'Physics', topic: 'Motion (speed, velocity, uniform/non-uniform motion, circular motion, periodic motion, force, friction, gravity, weight)' },
  ];

  for (const tpl of templates) {
    const enrichFile = path.join(__dirname, 'enrichment-data', `${tpl.template}.json`);
    const enrichmentData = fs.readFileSync(enrichFile, 'utf8');
    const prompt = buildPrompt(tpl.template, tpl.component, tpl.subject, tpl.topic, enrichmentData);
    const promptFile = path.join(__dirname, 'prompts', `prompt-${tpl.template}-full.txt`);
    fs.writeFileSync(promptFile, prompt);
    console.log(`Prompt for ${tpl.component}: ${prompt.length} chars`);
  }

  // Call Gemini in parallel
  const promises = templates.map((tpl, idx) => {
    const promptFile = path.join(__dirname, 'prompts', `prompt-${tpl.template}-full.txt`);
    const outputFile = path.join(__dirname, '..', 'components', 'simulations', 'c6_8', `${tpl.component}.tsx`);
    const keyIndex = idx + 1;
    console.log(`Calling Gemini (key ${keyIndex}) for ${tpl.component}...`);
    return callGemini(promptFile, outputFile, keyIndex);
  });

  const results = await Promise.all(promises);
  results.forEach(r => console.log(`OK: ${path.basename(r.file)} (${r.lines} lines, ${r.chars} chars)`));
}

main().catch(err => { console.error('FATAL:', err.message); process.exit(1); });
