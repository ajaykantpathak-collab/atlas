// Async template generation pipeline — 2 templates per call, Opus 5
// Usage: node scripts/gen-templates.js <batchNumber>
const fs = require('fs');
const https = require('https');
const { execSync } = require('child_process');

const API_KEY = 'sk-ant-opm-fHBMbyeWx8oBoWZj_iGi3zLbJ9bEVfpe';
const MODEL = 'claude-opus-5';

// All 51 template specs from DETAILED_LEARNING_MAP.md
// Each batch has 2 templates
const BATCHES = [
  // Batch 1 — largest gaps
  [
    {
      name: 'ChemistryC10CompleteSim',
      file: 'components/simulations/c9_12/ChemistryC10CompleteSim.tsx',
      classBand: 'C9-12',
      subject: 'Chemistry',
      nodes: 'c10_chem_001 through c10_chem_080 (80 nodes)',
      teaches: 'The entire C10 Chemistry syllabus — periodic properties, bonding theories, acids/bases/salts, mole concept, gas laws, stoichiometry, electrolysis, metallurgy, and organic chemistry (hydrocarbons through carboxylic acids).',
      interactive: 'Periodic trends explorer; bond builder with electron dots; pH titration lab; mole calculator with stoichiometry; metal extraction simulator; organic molecule sketcher with IUPAC naming; electrolysis cell builder.',
      priority: 'Critical — 80 nodes, largest single gap'
    },
    {
      name: 'AccountsSim',
      file: 'components/simulations/c9_12/AccountsSim.tsx',
      classBand: 'C9-12',
      subject: 'Accounts',
      nodes: 'c11_acc_001 through c11_acc_074, c12_acc_001 through c12_acc_077 (151 nodes)',
      teaches: 'Complete double-entry bookkeeping system — journal, ledger, trial balance, subsidiary books, bank reconciliation, depreciation, bills of exchange, final accounts (trading/P&L/balance sheet), partnership accounts, company accounts, cash flow statements, and financial ratios.',
      interactive: 'Transaction-to-journal entry converter; ledger posting simulator; trial balance generator; BRS builder; depreciation calculator (SLM/WDV); final accounts preparer; ratio analyser.',
      priority: 'Critical — 151 nodes, zero template coverage'
    }
  ],
  // Batch 2
  [
    {
      name: 'ComputerProgSim',
      file: 'components/simulations/c9_12/ComputerProgSim.tsx',
      classBand: 'C9-12',
      subject: 'Computer Science',
      nodes: 'c6_cs through c12_cs (~200 nodes across C6-C12)',
      teaches: 'Complete computer science curriculum from C6 to C12 — algorithms, flowcharts, programming (Java), data structures, DBMS, networking, web technologies, software engineering, and emerging technologies.',
      interactive: 'Code editor with Java syntax; algorithm visualizer; data structure animator; SQL query runner; network topology builder; sorting algorithm comparison; project scaffold generator.',
      priority: 'Critical — ~200 nodes, zero C11-12 coverage'
    },
    {
      name: 'C11_C12_PhysicsAdvancedSim',
      file: 'components/simulations/c9_12/C11_C12_PhysicsAdvancedSim.tsx',
      classBand: 'C9-12',
      subject: 'Physics',
      nodes: 'c11_phy and c12_phy (~170 nodes)',
      teaches: 'Advanced physics for C11-C12 covering rotational motion, gravitation, elasticity, fluid mechanics, thermal properties, thermodynamics, kinetic theory, SHM, wave motion, electrostatics, EMI, AC circuits, EM waves, optics, modern physics, nuclear physics, semiconductors, and communication systems.',
      interactive: 'Rotational dynamics simulator; gravitation field mapper; thermodynamic cycle animator; SHM energy visualiser; EMI demonstrator; semiconductor device tester; communication system flow diagram.',
      priority: 'Critical — ~170 nodes'
    }
  ],
  // Batch 3
  [
    {
      name: 'BiologyC9_12_AdvancedSim',
      file: 'components/simulations/c9_12/BiologyC9_12_AdvancedSim.tsx',
      classBand: 'C9-12',
      subject: 'Biology',
      nodes: 'c9_bio through c12_bio (~170 nodes)',
      teaches: 'Complete secondary biology — cell biology, tissues, classification, plant physiology, human physiology, genetics, evolution, biotechnology, reproduction, molecular biology, immunology, ecology, and environmental biology.',
      interactive: 'Cell biology lab; genetic cross simulator; plant physiology monitor; human body system explorer; ecology niche mapper; evolution timeline; biotechnology tool box.',
      priority: 'Critical — ~170 nodes'
    },
    {
      name: 'PoliticalScienceSim',
      file: 'components/simulations/c9_12/PoliticalScienceSim.tsx',
      classBand: 'C9-12',
      subject: 'Political Science',
      nodes: 'c11_pol_001 through c11_pol_028, c12_pol_001 through c12_pol_032 (60 nodes)',
      teaches: 'State, government, constitutions, democracy, rights, governance, Indian political system, comparative government, and contemporary political issues.',
      interactive: 'Constitution builder; government structure explorer; rights and duties matcher; comparative government analyser; political ideology position mapper.',
      priority: 'Critical — 60 nodes, zero coverage'
    }
  ],
  // Batch 4
  [
    {
      name: 'SociologySim',
      file: 'components/simulations/c9_12/SociologySim.tsx',
      classBand: 'C9-12',
      subject: 'Sociology',
      nodes: 'c11_soc_001 through c11_soc_030, c12_soc_001 through c12_soc_030 (65 nodes)',
      teaches: 'Society, culture, social groups, stratification (class/caste), social institutions (family, marriage, religion), social change, and Indian social structure from Comte to contemporary issues.',
      interactive: 'Society structure mapper; stratification pyramid builder; kinship diagram creator; social change timeline; caste vs class comparator; ethnographic observation simulator.',
      priority: 'Critical — 65 nodes, zero coverage'
    },
    {
      name: 'LegalStudiesSim',
      file: 'components/simulations/c9_12/LegalStudiesSim.tsx',
      classBand: 'C9-12',
      subject: 'Legal Studies',
      nodes: 'c11_legal_001 through c11_legal_030, c12_legal_001 through c12_legal_020 (50 nodes)',
      teaches: 'Legal systems, criminal/civil law, contracts, property law, family law, human rights, judiciary, ADR mechanisms, legal maxims, and the Indian constitutional framework.',
      interactive: 'Court hierarchy explorer; case scenario analyser; contract drafter; legal maxim matching game; rights and remedies lookup; ADR method selector.',
      priority: 'Critical — 50 nodes, ~10% coverage'
    }
  ],
  // Batch 5
  [
    {
      name: 'ChemistryFoundationsSim',
      file: 'components/simulations/c6_8/ChemistryFoundationsSim.tsx',
      classBand: 'C6-8',
      subject: 'Chemistry',
      nodes: 'c6_chem_001 through c6_chem_019, c7_chem_001 through c7_chem_009, c8_chem_001 through c8_chem_005 (~40 nodes)',
      teaches: 'Matter composition, elements/compounds/mixtures, physical vs chemical changes, metals/non-metals, and the foundational language of chemistry (symbols, formulae).',
      interactive: 'Matter classifier; change detector (physical vs chemical); element/compound sorter; mixture separator lab; symbol-to-element matching game.',
      priority: 'Critical — prerequisite for all C9-12 chemistry'
    },
    {
      name: 'GeographyContentSim',
      file: 'components/simulations/c9_12/GeographyContentSim.tsx',
      classBand: 'C1-12',
      subject: 'Geography',
      nodes: 'c1_geo through c12_geo (~200 nodes across all classes)',
      teaches: 'Complete geography from neighbourhood awareness (C1) through physical geography (rocks, climate, landforms) to human geography (population, resources, agriculture, industries) and regional studies.',
      interactive: 'Globe explorer; map reader; landform identifier; climate data analyser; resource mapper; population pyramid builder; India regional study hub.',
      priority: 'Critical — highest cross-class span'
    }
  ]
];

const SYSTEM_PROMPT = `You are a senior React/TypeScript engineer building interactive educational simulations for a CISCE learning platform. You generate COMPLETE, COMPILABLE, production-ready simulation components.

## STRICT REQUIREMENTS — every template MUST satisfy ALL of these:

1. 'use client' directive at the very top
2. ONLY these imports allowed:
   - React: import React, { useState, useEffect, useRef, useCallback } from 'react'
   - framer-motion: import { motion, AnimatePresence } from 'framer-motion'
   - From '../../../lib/sim-engine': audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst
   - From '../../sim-primitives/Draggable': Draggable (if drag interaction needed)
3. NO other external libraries. NO three, planck, matter-js, pixi, katex, jsxgraph, howler (audioManager handles that internally).
4. Default export of the component.
5. Props interface accepting enrichment data:
   interface TemplateNameProps {
     nodeId?: string;
     title?: string;
     definition?: string;
     eli5?: string;
     misconceptions?: Array<{ belief: string; correction: string }>;
     diagnosticQuestions?: Array<{
       number: number; bloomLevel: string; question: string; answer: string;
       answerType?: 'number' | 'text' | 'mcq'; unit?: string; formula?: string;
       working?: string; options?: string[]; hint?: string;
     }>;
     masteryCriteria?: string;
     onComplete?: (score: number) => void;
   }
6. DEFAULT_PROPS object with rich, topic-specific content (definition, eli5, misconceptions, diagnosticQuestions) — at least 5 misconceptions and 8 diagnostic questions.
7. Minimum 800 lines of substantive code (not padding).
8. Detailed SVG visualization — topic-specific, NOT generic. Custom SVG components for the subject matter (e.g., for chemistry: molecules, beakers, periodic table cells; for accounts: journal entries, ledger T-accounts, balance sheets; for physics: force vectors, circuit diagrams, waveforms).
9. At least 8 challenges with progressive difficulty (beginner → advanced), each with: question, answer, options (3-4 for MCQ), hint, misconception feedback.
10. Theory section with at least 5 teaching slides covering the definition and walkthrough.
11. Adaptive difficulty: 'foundation' | 'standard' | 'advanced' — student can switch, affects challenge complexity.
12. localStorage persistence: save mastery score and next review date under key 'mastery_<nodeId>'.
13. Spaced repetition: show review badge if due.
14. Guided discovery: hints reveal incrementally, not all at once.
15. Misconception feedback: when student answers wrong, show the SPECIFIC misconception from the data, not generic "try again".
16. Real-world activity suggestion at the end.
17. onComplete callback: call onComplete(score) when all challenges done, where score = max(0, 100 - errors*5).
18. Auto-hint after 10 seconds of inactivity using a useRef timer.
19. Progress tracking: show current challenge / total, score, errors.
20. TypeScript strict mode compatible — no 'any', no unused vars, no missing types.

## OUTPUT FORMAT
Output ONLY the code. No explanations before or after. Start with 'use client' and end with the final closing of the default export. The code will be saved directly to a .tsx file.

## FILE HEADER
For each template, output:
\`\`\`tsx:FILE_PATH
[full code]
\`\`\`

Where FILE_PATH is the exact path provided. Output each template separated by a clear delimiter line of exactly: ===END_TEMPLATE===`;

function generateUserPrompt(templates) {
  // Load existing template names so Opus knows what already exists
  let existingNames = '';
  try {
    existingNames = fs.readFileSync('D:\\dream_app\\frontend\\all_templates_extracted.txt', 'utf8');
  } catch (e) {
    existingNames = '(unable to load existing template list)';
  }

  let prompt = `Generate ${templates.length} complete simulation templates. Each must be 800+ lines, compilable TypeScript/React.\n\n`;
  prompt += `## EXISTING TEMPLATES (do NOT duplicate these — the templates below are NEW and do not exist yet):\n`;
  prompt += existingNames.substring(0, 8000) + '\n\n';
  prompt += `## TEMPLATES TO GENERATE (these are NEW — they do not exist in the list above):\n\n`;
  templates.forEach((t, i) => {
    prompt += `## TEMPLATE ${i + 1}: ${t.name}\n`;
    prompt += `- File path: ${t.file}\n`;
    prompt += `- Class band: ${t.classBand}\n`;
    prompt += `- Subject: ${t.subject}\n`;
    prompt += `- Nodes covered: ${t.nodes}\n`;
    prompt += `- What it teaches: ${t.teaches}\n`;
    prompt += `- Key interactive elements: ${t.interactive}\n`;
    prompt += `- Priority: ${t.priority}\n\n`;
  });
  prompt += `Generate all ${templates.length} templates now. Each in its own code block with the file path header. Separated by ===END_TEMPLATE===.`;
  return prompt;
}

function callOpus(templates, batchNum) {
  return new Promise((resolve, reject) => {
    const userPrompt = generateUserPrompt(templates);
    const requestBody = JSON.stringify({
      model: MODEL,
      max_tokens: 64000,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }]
    });

    console.log(`[Batch ${batchNum}] Sending ${templates.length} templates to Opus 5...`);
    console.log(`[Batch ${batchNum}] Request size: ${Math.round(requestBody.length / 1024)} KB`);

    const options = {
      hostname: 'api.opusmax.pro',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'anthropic-version': '2023-06-01'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      console.log(`[Batch ${batchNum}] HTTP ${res.statusCode}`);
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) {
            console.log(`[Batch ${batchNum}] API Error:`, JSON.stringify(parsed.error));
            reject(parsed.error);
            return;
          }
          if (!parsed.content) {
            reject(new Error('No content in response'));
            return;
          }
          const textContent = parsed.content.filter(c => c.type === 'text').map(c => c.text).join('\n');
          resolve({ text: textContent, usage: parsed.usage });
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(requestBody);
    req.end();
  });
}

function extractTemplates(text) {
  const templates = [];
  // Match ```tsx:FILE_PATH ... ``` blocks
  const regex = /```tsx:([^\n]+)\n([\s\S]*?)```/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    templates.push({ filePath: match[1].trim(), code: match[2] });
  }
  // Also try without :FILE_PATH (just ```tsx)
  if (templates.length === 0) {
    const regex2 = /```tsx\n([\s\S]*?)```/g;
    while ((match = regex2.exec(text)) !== null) {
      templates.push({ filePath: null, code: match[1] });
    }
  }
  return templates;
}

async function main() {
  const batchNum = parseInt(process.argv[2] || '1');
  const batchIndex = batchNum - 1;

  if (batchIndex < 0 || batchIndex >= BATCHES.length) {
    console.log(`Usage: node scripts/gen-templates.js <1-${BATCHES.length}>`);
    process.exit(1);
  }

  const templates = BATCHES[batchIndex];
  console.log(`\n=== BATCH ${batchNum} ===`);
  console.log(`Templates: ${templates.map(t => t.name).join(', ')}`);

  const startTime = Date.now();
  const result = await callOpus(templates, batchNum);
  const elapsed = Math.round((Date.now() - startTime) / 1000);

  console.log(`\n[Batch ${batchNum}] Response received in ${elapsed}s`);
  console.log(`[Batch ${batchNum}] Output: ${result.text.length} chars (${Math.round(result.text.length / 1024)} KB)`);
  console.log(`[Batch ${batchNum}] Usage:`, JSON.stringify(result.usage));

  const extracted = extractTemplates(result.text);
  console.log(`[Batch ${batchNum}] Templates extracted: ${extracted.length}`);

  const savedFiles = [];
  for (let i = 0; i < extracted.length; i++) {
    const t = extracted[i];
    const expectedTemplate = templates[i];
    const filePath = t.filePath || (expectedTemplate ? expectedTemplate.file : null);
    if (!filePath) {
      console.log(`[Batch ${batchNum}] Template ${i + 1}: NO FILE PATH — skipping`);
      continue;
    }
    const fullPath = 'D:\\dream_app\\frontend\\' + filePath.replace(/\//g, '\\');
    try {
      fs.writeFileSync(fullPath, t.code, 'utf8');
      const lineCount = t.code.split('\n').length;
      console.log(`[Batch ${batchNum}] Template ${i + 1} saved: ${filePath} (${lineCount} lines, ${t.code.length} chars)`);
      savedFiles.push({ path: fullPath, lines: lineCount, name: expectedTemplate ? expectedTemplate.name : `template_${i + 1}` });
    } catch (e) {
      console.log(`[Batch ${batchNum}] Failed to save ${fullPath}: ${e.message}`);
    }
  }

  // Save raw response for debugging
  const rawFile = `D:\\dream_app\\frontend\\scripts\\batch_${batchNum}_raw.txt`;
  fs.writeFileSync(rawFile, result.text, 'utf8');
  console.log(`[Batch ${batchNum}] Raw response saved: ${rawFile}`);

  console.log(`\n=== BATCH ${batchNum} COMPLETE ===`);
  console.log(`Saved: ${savedFiles.length} files`);
  savedFiles.forEach(f => console.log(`  - ${f.name}: ${f.lines} lines`));

  // Write summary for verification step
  const summaryFile = `D:\\dream_app\\frontend\\scripts\\batch_${batchNum}_summary.json`;
  fs.writeFileSync(summaryFile, JSON.stringify({ batchNum, savedFiles, usage: result.usage, elapsed }, null, 2));
}

main().catch(e => {
  console.error('FATAL:', e);
  process.exit(1);
});
