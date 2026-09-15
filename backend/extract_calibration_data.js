// Extract misconception + diagnostic data from enrichment markers for Fable calibration
const fs = require('fs');
const path = require('path');

const enrichDir = 'D:/platform/cbse_data/enrichment';
const files = fs.readdirSync(enrichDir).filter(f => f.endsWith('.marker'));

const bySubject = {};
let totalParsed = 0;

for (const f of files) {
    const text = fs.readFileSync(path.join(enrichDir, f), 'utf8');
    const blocks = text.split('--- NODE ').slice(1);
    
    for (const block of blocks) {
        const lines = block.split('\n');
        const nodeId = lines[0].replace(/---/g, '').trim();
        if (!nodeId) continue;
        
        const parts = nodeId.split('_');
        const subject = parts[1] || 'unknown';
        
        // Extract misconceptions (between COMMON_MISCONCEPTION and ON_FAILURE or next field)
        let miscText = '';
        const miscStart = block.indexOf('COMMON_MISCONCEPTION:');
        if (miscStart >= 0) {
            const afterMisc = block.substring(miscStart + 21);
            const nextField = afterMisc.search(/\n(ON_FAILURE|DIAGNOSTIC_QUESTION|COGNITIVE_LEVEL|MASTERY_CRITERIA|SCOPE_BOUNDARY|TEXT_WALKTHROUGH|--- NODE)/);
            miscText = nextField >= 0 ? afterMisc.substring(0, nextField).trim() : afterMisc.trim();
        }
        
        // Extract diagnostic question
        let diagText = '';
        const diagStart = block.indexOf('DIAGNOSTIC_QUESTION:');
        if (diagStart >= 0) {
            const afterDiag = block.substring(diagStart + 20);
            const nextField = afterDiag.search(/\n(COMMON_MISCONCEPTION|ON_FAILURE|COGNITIVE_LEVEL|MASTERY_CRITERIA|SCOPE_BOUNDARY|TEXT_WALKTHROUGH|--- NODE)/);
            diagText = nextField >= 0 ? afterDiag.substring(0, nextField).trim() : afterDiag.trim();
        }
        
        // Extract cognitive level
        const cogMatch = block.match(/COGNITIVE_LEVEL:\s*(\w+)/);
        const cogLevel = cogMatch ? cogMatch[1] : 'unknown';
        
        // Extract title
        const titleMatch = block.match(/TITLE:\s*(.+)/);
        const title = titleMatch ? titleMatch[1].trim() : '';
        
        if (miscText || diagText) {
            totalParsed++;
            if (!bySubject[subject]) bySubject[subject] = [];
            bySubject[subject].push({
                node_id: nodeId,
                subject: subject,
                title: title,
                cognitive_level: cogLevel,
                misconceptions: miscText.substring(0, 600),
                diagnostic: diagText.substring(0, 600),
            });
        }
    }
}

console.log('Total samples with misconception/diagnostic data:', totalParsed);
console.log('By subject:');
for (const [s, arr] of Object.entries(bySubject).sort((a, b) => b[1].length - a[1].length)) {
    console.log('  ' + s + ': ' + arr.length);
}

// Pick 5 representative samples per subject
const representative = [];
for (const [subject, arr] of Object.entries(bySubject)) {
    if (arr.length <= 5) {
        representative.push(...arr);
    } else {
        // Pick evenly distributed samples
        const step = Math.floor(arr.length / 5);
        for (let i = 0; i < 5; i++) {
            representative.push(arr[i * step]);
        }
    }
}

console.log('\nRepresentative samples for Fable:', representative.length);

// Save
fs.writeFileSync('D:/platform/cbse_data/agent_calibration_data.json', JSON.stringify(representative, null, 2));
console.log('Saved to: D:/platform/cbse_data/agent_calibration_data.json');
console.log('File size:', Math.round(fs.statSync('D:/platform/cbse_data/agent_calibration_data.json').size / 1024), 'KB');
