// Call Opus 5 API to generate the master learning map
// This is an API call for analysis, not content generation
const fs = require('fs');
const https = require('https');

const API_KEY = 'sk-ant-opm-fHBMbyeWx8oBoWZj_iGi3zLbJ9bEVfpe';
const API_URL = 'https://api.opusmax.pro';
const MODEL = 'claude-opus-5';

const nodes = fs.readFileSync('D:\\cisce\\all_nodes_extracted.txt', 'utf8');
const templates = fs.readFileSync('D:\\dream_app\\frontend\\all_templates_extracted.txt', 'utf8');

const syllabus = `Class 1: bio(22), chem(4), cs(10), evs(13), geo(10), maths(28), physics(8)
Class 2: bio(15), chem(4), cs(12), evs(10), geo(10), maths(27), physics(10)
Class 3: bio(23), chem(8), cs(15), evs(10), geo(12), maths(40), physics(6)
Class 4: bio(20), chem(10), cs(18), evs(8), geo(14), maths(41), physics(13)
Class 5: bio(23), chem(12), cs(20), evs(8), geo(16), maths(67), physics(17)
Class 6: bio(27), chem(19), cs(26), evs(14), geo(18), histciv(65), maths(84), physics(37)
Class 7: bio(26), chem(20), cs(25), geo(19), histciv(58), maths(50), physics(36)
Class 8: bio(26), chem(20), cs(31), geo(12), histciv(70), maths(39), physics(37)
Class 9: bio(28), chem(54), commapp(17), commstud(42), cs(36), econ(46), econapp(20), evs(35), geo(30), histciv(69), maths(67), physics(48)
Class 10: appmath(1), bio(31), chem(120), commapp(32), commstud(46), cs(42), econ(42), econapp(33), evs(21), geo(21), histciv(48), maths(80), physics(43)
Class 11: acc(74), appmath(74), bio(72), biotech(55), bs(35), chem(92), comm(60), cs(85), econ(61), evs(28), geo(25), histciv(57), home(34), legal(30), massmedia(25), maths(108), physics(107), pol(28), psy(37), soc(30)
Class 12: acc(77), appmath(68), bio(71), biotech(55), bs(48), chem(104), comm(55), cs(85), econ(91), evs(22), geo(35), histciv(61), home(32), legal(20), massmedia(28), maths(109), physics(140), pol(32), psy(41), soc(35)
English: 0 nodes (no enrichment data exists yet)`;

const systemPrompt = `You are a master curriculum architect for the CISCE (ICSE/ISC) board. You are building a complete end-to-end learning map for a platform that teaches struggling students from Class 1 to Class 12.

The platform has 377 existing interactive components (games and simulations). There are 4,721 curriculum nodes across 23 subjects. Your job is to map every node to an existing template, identify gaps, and produce a master learning map.

DO NOT generate code. DO NOT generate template files. Your output is a STRATEGIC MAP document only.

## OUTPUT FORMAT

Produce a document with these exact sections:

### SECTION 1: COVERAGE SUMMARY
- Total nodes: 4721
- Total templates: 377
- Nodes with a matching template: [count]
- Nodes without any matching template: [count]
- Coverage percentage: [X]%

### SECTION 2: GAP ANALYSIS
List every node that has NO matching template. Group by subject. For each gap:
- Node ID
- Node title
- Subject
- Class
- Why no existing template fits
- What type of template would be needed

### SECTION 3: MISSING TEMPLATES
If gaps exist, list the minimum set of NEW templates needed to cover all gaps. For each:
- Template name (following existing naming conventions)
- Subject(s) it covers
- Class band (C1-5, C6-8, or C9-12)
- Description of what it teaches
- Which nodes it would cover

### SECTION 4: NODE-TO-TEMPLATE MAPPING
For each subject, list the templates used and node count per template. Do NOT list all 4721 mappings. Instead, for each subject provide:
- Subject name
- Total nodes
- Templates used (list template names with node count each)
- Uncovered nodes (if any)

### SECTION 5: PREREQUISITE GRAPH
List the 50 most important prerequisite chains across classes:
- What must be mastered before what
- Cross-subject dependencies
- Format: NODE_ID -> NODE_ID (reason)

### SECTION 6: LEARNING PATH
The recommended sequence a struggling student should follow:
- Class 1-5: What order to do subjects/topics
- Class 6-8: What order, what unlocks what
- Class 9-12: What order, what unlocks what
- How mastery in one class unlocks the next

### SECTION 7: ORPHANED TEMPLATES
List any of the 377 existing templates that have NO nodes mapping to them.

### SECTION 8: ENGLISH SUBJECT PLAN
English has 0 nodes. Design the node structure:
- What English topics CISCE requires per class
- How many nodes per class
- Which existing templates could be reused
- What new templates might be needed

### SECTION 9: QUALITY FLAGS
Flag any template where the template title seems to NOT match the nodes it should cover.

## RULES
1. Be precise. Read each node title and each template title carefully.
2. A template can cover multiple nodes.
3. A node maps to exactly ONE primary template.
4. If a node genuinely has no matching template, mark it as a gap.
5. Do not invent template names that don't exist in the list.
6. Focus on accuracy over completeness.`;

const userMessage = `Here is the data:

## CISCE SYLLABUS STRUCTURE (subjects per class with node counts)
${syllabus}

## ALL 4,721 NODES (format: subject|class|nodeId|title)
${nodes}

## ALL 377 EXISTING TEMPLATES (format: band|class|type|templateName|title)
${templates}

Now produce the master learning map document.`;

const requestBody = JSON.stringify({
  model: MODEL,
  max_tokens: 32000,
  system: systemPrompt,
  messages: [{ role: 'user', content: userMessage }]
});

console.log(`Request body size: ${requestBody.length} bytes (${Math.round(requestBody.length / 1024)} KB)`);
console.log(`Estimated input tokens: ${Math.round(requestBody.length / 4)}`);
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
  
  res.on('data', (chunk) => {
    data += chunk;
    process.stdout.write('.');
  });
  
  res.on('end', () => {
    console.log('\nResponse received!');
    try {
      const parsed = JSON.parse(data);
      if (parsed.content) {
        const textContent = parsed.content
          .filter(c => c.type === 'text')
          .map(c => c.text)
          .join('\n');
        
        const outputFile = 'D:\\dream_app\\frontend\\MASTER_LEARNING_MAP.md';
        fs.writeFileSync(outputFile, textContent, 'utf8');
        console.log(`\nMap saved to: ${outputFile}`);
        console.log(`Output size: ${textContent.length} chars (${Math.round(textContent.length / 1024)} KB)`);
        console.log(`\nUsage:`, JSON.stringify(parsed.usage, null, 2));
        
        // Print first 3000 chars as preview
        console.log('\n=== PREVIEW (first 3000 chars) ===');
        console.log(textContent.substring(0, 3000));
      } else if (parsed.error) {
        console.log('API Error:', JSON.stringify(parsed, null, 2));
      } else {
        console.log('Unexpected response:', JSON.stringify(parsed, null, 2).substring(0, 2000));
      }
    } catch (e) {
      console.log('Parse error:', e.message);
      console.log('Raw response (first 2000 chars):', data.substring(0, 2000));
    }
  });
});

req.on('error', (e) => {
  console.log('Request error:', e.message);
});

req.write(requestBody);
req.end();
