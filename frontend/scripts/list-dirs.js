const fs = require('fs');
const path = require('path');
function ls(dir, prefix, d) {
  if (d < 0) return;
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    const s = fs.statSync(full);
    if (s.isDirectory()) {
      console.log(prefix + f + '/');
      ls(full, prefix + '  ', d - 1);
    } else {
      console.log(prefix + f);
    }
  });
}
ls('kenney_shapes', '', 2);
console.log('---');
ls('kenney_ui', '', 2);
