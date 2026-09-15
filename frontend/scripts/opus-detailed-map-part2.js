// Third Opus call: Sections B-F of the detailed mapping
const fs = require('fs');
const https = require('https');

const API_KEY = 'sk-ant-opm-fHBMbyeWx8oBoWZj_iGi3zLbJ9bEVfpe';
const MODEL = 'claude-opus-5';

const nodes = fs.readFileSync('D:\\cisce\\all_nodes_extracted.txt', 'utf8');
const templates = fs.readFileSync('D:\\dream_app\\frontend\\all_templates_extracted.txt', 'utf8');
const firstMap = fs.readFileSync('D:\\dream_app\\frontend\\MASTER_LEARNING_MAP.md', 'utf8');
const detailedMap = fs.readFileSync('D:\\dream_app\\frontend\\DETAILED_LEARNING_MAP.md', 'utf8');

const systemPrompt = `You are a master curriculum architect for CISCE (ICSE/ISC). In Round 1 you produced a master learning map. In Round 2 you produced Section A (51 new templates with exact node assignments).

Now produce Sections B through F. Do NOT redo Section A.

EXCLUDE English and Hindi entirely.

## OUTPUT FORMAT — produce these exact sections:

### SECTION B: UNCOVERED NODE ASSIGNMENTS
For EVERY node that was uncovered in round 1 (~481 nodes), assign it to exactly one template.
Format: NODE_ID | SUBJECT | CLASS | TITLE | ASSIGNED_TEMPLATE | NEW_OR_EXISTING

List ALL of them. Do not skip any. Do not say "etc" or "and more". Group by subject.

### SECTION C: EXISTING TEMPLATE CONSOLIDATION
List templates that should be merged or renamed:
- Template 1 + Template 2 -> Merged name (reason)
- Old name -> New name (reason)
Also list any templates that are redundant (two templates covering the same topic).

### SECTION D: UNIFIED C1-12 LEARNING PATH
The definitive sequence. For EACH class (1-12), provide:
1. Term 1 (what to study, in order, with node IDs)
2. Term 2 (what to study, in order, with node IDs)
3. Term 3 (what to study, in order, with node IDs)
4. Mastery gate: what score/completion unlocks the next class
5. Cross-subject dependencies for this class

Be specific. Use node IDs, not just topic names.

### SECTION E: TEMPLATE BUILD PRIORITY
Rank all 51 new templates by impact:
- Tier 1: First 10 to build (cover most nodes, most critical subjects)
- Tier 2: Next 10
- Tier 3: Remaining 31

For each tier, list template names in order with the node count they cover.

### SECTION F: REGISTRY DESIGN
Design the node-to-template registry structure. This is the data structure that the app will use to look up which template to render for a given node. Provide:
1. The TypeScript interface for the registry entry
2. A sample of 20 registry entries (covering different subjects and class bands)
3. How the registry should be loaded (static import vs API vs JSON file)

## RULES
1. EXACT counts. No estimates. No "approximately".
2. Every uncovered node gets a template assignment.
3. Exclude English and Hindi completely.
4. Use node IDs from the provided data, do not invent node IDs.`;

const userMessage = `## ROUND 1 OUTPUT (master map)
${firstMap}

## ROUND 2 OUTPUT (Section A — 51 new templates)
${detailedMap}

## ALL 4,721 NODES (excluding English)
${nodes}

## ALL 377 EXISTING TEMPLATES
${templates}

Now produce Sections B through F. Every uncovered node assigned. Complete learning path. Build priority. Registry design.`;

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
        const outputFile = 'D:\\dream_app\\frontend\\DETAILED_LEARNING_MAP_PART2.md';
        fs.writeFileSync(outputFile, textContent, 'utf8');
        console.log(`Map saved to: ${outputFile}`);
        console.log(`Output size: ${textContent.length} chars (${Math.round(textContent.length / 1024)} KB)`);
        console.log(`Usage:`, JSON.stringify(parsed.usage, null, 2));
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
