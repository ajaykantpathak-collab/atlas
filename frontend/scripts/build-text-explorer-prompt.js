// Build the TextExplorer prompt and call Gemini
const fs = require('fs');
const path = require('path');

const enrichment = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'enrichment-data', 'text-explorer.json'), 'utf8')
).slice(0, 5);
const refTemplate = fs.readFileSync(path.join(__dirname, 'ref-template.txt'), 'utf8');

const prompt = `You are generating a React/TypeScript simulation component for a CISCE Class 6-8 science learning platform.

TASK: Generate a complete TextExplorerSimulation.tsx component. This is a TEXT-BASED EXPLORER for topics that are conceptual and don't need a physics-style interactive simulation. It covers Chemistry topics (metals, non-metals, air, oxygen, water, carbon, hydrogen, electronic configuration, valency, chemical equations) and Computer Science topics (hardware, software, Excel, Word, PowerPoint, networking, databases, number systems, viruses, cloud computing).

This is for STRUGGLING students. It must TEACH through structured reading, interactive diagrams, and guided exploration.

CRITICAL: Follow this EXACT template structure from the reference file below. Use Tailwind CSS classes (NOT inline styles). Light theme (white bg, slate text, blue accents).

The component MUST have these sections in this order:
1. HEADER — node ID badge, title, score badge
2. TABS — 3 tabs: ELI5, Subject Theory, Common Misconceptions with AnimatePresence
3. MAIN GRID — grid-cols-1 lg:grid-cols-[1fr_320px]:
   - LEFT: Interactive concept diagram (SVG with clickable sections) + mode selector buttons + reset button
   - RIGHT: Key Facts card (with EDITABLE number inputs) + Properties card (interactive checklist or comparison table)
4. PROGRESSIVE CHALLENGES — full width, with key-fact display, answer input (number/text/mcq), feedback with step-by-step working, check answer, next, hint
5. REAL-WORLD ACTIVITY — full width, textarea for observation, submit button

STRICT REQUIREMENTS:
- 'use client' at top
- import React, { useState, useEffect, useRef, useCallback } from 'react'
- import { motion, AnimatePresence } from 'framer-motion'
- Export interface TextExplorerSimulationProps with: nodeId?, title?, definition?, eli5?, misconceptions?, diagnosticQuestions?, masteryCriteria?, onComplete?
- diagnosticQuestions items: number, bloomLevel, question, answer, answerType ('number'|'text'|'mcq'), unit?, formula?, working?, options?, hint?
- Default props MUST use the REAL enrichment data from the first node below
- 3 progressive challenges: recall -> apply -> evaluate
- Each challenge MUST require interacting with the concept diagram or key facts
- Each challenge MUST show key fact, working (step-by-step), and meaningful feedback
- Live readouts MUST be editable <input type="number"> fields that update the diagram
- Reset button to restore defaults
- SVG must show a topic-specific interactive concept diagram with clickable sections
- Mode selector buttons for different aspects of the topic
- All Tailwind classes, NO inline styles except for SVG attributes
- Must compile with TypeScript (no 'any' types, no unused imports, no LaTeX in JSX)
- Target 700-900 lines

CHALLENGE DESIGN:
- Derive the 3 challenges from the enrichment diagnostic questions below
- Challenge 1 (recall): Click a section of the diagram or set a value. Numeric or MCQ answer.
- Challenge 2 (apply): Problem based on the topic. Show key fact, provide values, student calculates. Numeric answer with unit.
- Challenge 3 (evaluate): Explore different modes and explain. Text answer.
- Each challenge's "working" field must show step-by-step solution
- Each challenge's "hint" must guide the student to use the diagram

Here is the REAL ENRICHMENT DATA. Use the first node's content for default props:

--- ENRICHMENT DATA ---
${JSON.stringify(enrichment, null, 2)}
--- END ENRICHMENT DATA ---

Here is the REFERENCE TEMPLATE (LightRaySimulation.tsx) — follow its EXACT structure, styling, and patterns:

--- REFERENCE TEMPLATE ---
${refTemplate}
--- END REFERENCE TEMPLATE ---

Generate the COMPLETE TextExplorerSimulation.tsx file. Output ONLY the TypeScript code, no markdown fences, no explanations.`;

const promptFile = path.join(__dirname, 'prompts', 'prompt-text-explorer-full.txt');
fs.writeFileSync(promptFile, prompt);
console.log('Prompt written:', prompt.length, 'chars');
