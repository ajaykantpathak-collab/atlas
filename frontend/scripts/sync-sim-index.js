/**
 * sync-sim-index — dev/build convenience: copies the frontend's SIM_INDEX.json
 * to the backend cache so the two never drift. Runs before `npm run build`.
 *
 * Inside the Docker frontend build there is no ../backend — that's expected:
 * the backend image carries its own synced copy (backend/_cache/sim_index.json).
 * This script therefore NEVER fails the build; it syncs only when both
 * locations exist (local dev machine).
 */
const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'components', 'sims_v2', 'SIM_INDEX.json');
const dstDir = path.join(__dirname, '..', '..', 'backend', '_cache');

try {
  if (fs.existsSync(src) && fs.existsSync(dstDir)) {
    fs.copyFileSync(src, path.join(dstDir, 'sim_index.json'));
    console.log('sim_index synced to backend/_cache');
  } else {
    console.log('sim_index sync skipped (backend cache not present in this context)');
  }
} catch (e) {
  console.log('sim_index sync skipped:', e.message);
}
