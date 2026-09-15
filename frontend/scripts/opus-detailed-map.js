// Second Opus call: detailed mapping for all uncovered nodes + unified learning path
const fs = require('fs');
const https = require('https');

const API_KEY = 'sk-ant-opm-fHBMbyeWx8oBoWZj_iGi3zLbJ9bEVfpe';
const MODEL = 'claude-opus-5';

const nodes = fs.readFileSync('D:\\cisce\\all_nodes_extracted.txt', 'utf8');
const templates = fs.readFileSync('D:\\dream_app\\frontend\\all_templates_extracted.txt', 'utf8');
const firstMap = fs.readFileSync('D:\\dream_app\\frontend\\MASTER_LEARNING_MAP.md', 'utf8');

const systemPrompt = `You are a master curriculum architect for CISCE (ICSE/ISC). In the first round, you produced a master learning map identifying ~481 uncovered nodes out of 4,721 total, and recommended 40 new templates.

Now you must produce the DEFINITIVE, DETAILED mapping. No estimates. No "approximately". Every single uncovered node must be assigned to a specific template (existing or new).

EXCLUDE English and Hindi entirely — those are handled separately.

## OUTPUT FORMAT — produce these exact sections:

### SECTION A: DEFINITIVE NEW TEMPLATE LIST
List every new template that must be built. For EACH template:
1. Template name (exact, following naming conventions: *Sim for C9-12, *Simulation for C6-8, *Game for C1-5)
2. Class band (C1-5, C6-8, or C9-12)
3. Subject(s)
4. Exact node IDs it covers (list every node ID)
5. What the simulation teaches (2-3 sentences)
6. Key interactive elements (what does the student DO?)
7. Priority (1=critical, 2=important, 3=gap filler)

### SECTION B: UNCOVERED NODE ASSIGNMENTS
For EVERY node that was uncovered in round 1, assign it to exactly one template:
Format: NODE_ID | SUBJECT | CLASS | TITLE | ASSIGNED_TEMPLATE | NEW_OR_EXISTING

List all ~481 nodes. Do not skip any. Do not say "etc" or "and more".

### SECTION C: EXISTING TEMPLATE CONSOLIDATION
List templates that should be merged or renamed:
- Template 1 + Template 2 -> Merged name (reason)
- Old name -> New name (reason)

### SECTION D: UNIFIED C1-12 LEARNING PATH
The definitive sequence. For each class (1-12):
1. What subjects are available
2. What order to study them
3. What specific nodes/templates unlock what
4. Mastery gates (what score unlocks next class)
5. Cross-subject dependencies

Format as a week-by-week or term-by-term plan for each class.

### SECTION E: TEMPLATE BUILD PRIORITY
Rank all new templates by impact:
- Which 10 templates should be built FIRST (cover most nodes)
- Which 10 next
- Which remaining ones last

### SECTION F: FULL TEMPLATE CODE — TOP 3 MOST CRITICAL
Generate complete, production-ready React + TypeScript code for the 3 most critical new templates from Section A (the ones covering the most nodes).

Each template MUST follow these rules:
- 'use client' directive at top
- Only React hooks and framer-motion imports (no other external libraries)
- NO imports of: three, planck, matter-js, pixi, katex, jsxgraph
- Default export
- Props interface accepting enrichment data (nodeId, title, definition, eli5, misconceptions, diagnosticQuestions, masteryCriteria, onComplete)
- Minimum 800 lines
- Detailed SVG visualization (topic-specific, not generic)
- At least 5 challenges with variant retry logic
- Detailed theory section
- Animated SVG
- Adaptive difficulty (foundation/standard/advanced)
- localStorage persistence (mastery score + next review date)
- Progress tracking
- Spaced repetition
- Guided discovery
- Misconception feedback from enrichment data
- Real-world activity suggestion
- onComplete callback: (score: number) => void
- No generic "Try again" feedback
- No emoji-only visualizations

Output each template as a separate code block with the filename as a header:
## FILE: components/simulations/c9_12/TemplateName.tsx
\`\`\`tsx
[full code here]
\`\`\`

## RULES
1. EXACT counts. No estimates.
2. Every uncovered node gets a template assignment.
3. A new template must cover at least 3 nodes (don't create 1-node templates).
4. If a node can be covered by an existing template with minor adaptation, mark it as EXISTING.
5. Only create a NEW template if no existing template can be adapted.
6. Exclude English and Hindi completely.
7. Generated templates must be COMPLETE and COMPILABLE — no placeholders, no TODOs, no "...".
8. Each generated template must pass TypeScript strict mode.`;

const userMessage = `## ROUND 1 OUTPUT (your previous analysis)
${firstMap}

## ALL 4,721 NODES (excluding English)
${nodes}

## ALL 377 EXISTING TEMPLATES
${templates}

Now produce the definitive detailed mapping. Every uncovered node assigned. Every new template specified exactly.`;

const requestBody = JSON.stringify({
  model: MODEL,
  max_tokens: 64000,
  system: systemPrompt,
  messages: [{ role: 'user', content: userMessage }]
});

console.log(`Request body size: ${requestBody.length} bytes (${Math.round(requestBody.length / 1024)} KB)`);
console.log('Sending to Opus 5...');

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
  console.log(`HTTP Status: ${res.statusCode}`);
  res.on('data', (chunk) => { data += chunk; process.stdout.write('.'); });
  res.on('end', () => {
    console.log('\nResponse received!');
    try {
      const parsed = JSON.parse(data);
      if (parsed.content) {
        const textContent = parsed.content.filter(c => c.type === 'text').map(c => c.text).join('\n');
        const outputFile = 'D:\\dream_app\\frontend\\DETAILED_LEARNING_MAP.md';
        fs.writeFileSync(outputFile, textContent, 'utf8');
        console.log(`Map saved to: ${outputFile}`);
        console.log(`Output size: ${textContent.length} chars (${Math.round(textContent.length / 1024)} KB)`);
        console.log(`Usage:`, JSON.stringify(parsed.usage, null, 2));

        // Extract and save generated template code blocks
        const codeBlockRegex = /## FILE: ([^\n]+)\n```tsx\n([\s\S]*?)```/g;
        let match;
        let templateCount = 0;
        while ((match = codeBlockRegex.exec(textContent)) !== null) {
          const filePath = match[1].trim();
          const code = match[2];
          const fullPath = 'D:\\dream_app\\frontend\\' + filePath.replace(/\//g, '\\');
          try {
            fs.writeFileSync(fullPath, code, 'utf8');
            console.log(`Template saved: ${fullPath} (${code.length} chars, ${code.split('\n').length} lines)`);
            templateCount++;
          } catch (e) {
            console.log(`Failed to save ${fullPath}: ${e.message}`);
          }
        }
        console.log(`\nTemplates extracted: ${templateCount}`);

        console.log('\n=== PREVIEW (first 5000 chars) ===');
        console.log(textContent.substring(0, 5000));
      } else if (parsed.error) {
        console.log('API Error:', JSON.stringify(parsed, null, 2));
      }
    } catch (e) {
      console.log('Parse error:', e.message);
      console.log('Raw (first 2000):', data.substring(0, 2000));
    }
  });
});

req.on('error', (e) => console.log('Request error:', e.message));
req.write(requestBody);
req.end();
