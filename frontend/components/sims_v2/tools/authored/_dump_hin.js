const fs = require('fs');
const map = require('D:/platform/frontend/components/sims_v2/tools/authored/_c11_map.json');
const dir = 'C:/Users/Alesha4285/Desktop/enhanced_nodes/md_cache/';
function get(f, name) {
  const m = f.match(new RegExp('## ' + name + '\\r?\\n([\\s\\S]*?)(?=\\r?\\n## )'));
  return m ? m[1].trim().replace(/\s+/g, ' ') : '';
}
const want = ['c11_hin_ar_ch02','c11_hin_ar_ch03','c11_hin_ar_ch08','c11_hin_ar_ch10','c11_hin_ar_ch11','c11_hin_ar_ch12','c11_hin_ar_ch13','c11_hin_ar_ch15','c11_hin_ar_ch16','c11_hin_v_ch01','c11_hin_v_ch02','c11_hin_v_ch03','c11_hin_v_ch04','c11_hin_v_ch05'];
for (const ch of want) {
  const node = map[ch][0].n[0] + '.md';
  const f = fs.readFileSync(dir + node, 'utf8');
  console.log('=== ' + ch + ' | ' + map[ch][0].t);
  console.log('W:', get(f, 'WALKTHROUGH').slice(0, 320));
  console.log('M:', get(f, 'COMMON_MISCONCEPTION').slice(0, 220));
}
