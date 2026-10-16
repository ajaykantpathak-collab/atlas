#!/bin/bash
# Resilient semantic index builder: resume from checkpoint; skip poison batches.
cd /d/platform/deploy/backend
MAX=60
for i in $(seq 1 $MAX); do
  python its/solver/semantic_qa.py build >> /d/platform/_qa_idx_full.log 2>&1
  ec=$?
  if [ $ec -eq 0 ]; then
    echo "BUILD COMPLETE at attempt $i" >> /d/platform/_qa_idx_full.log
    exit 0
  fi
  echo "attempt $i exited $ec — skipping 512 rows and resuming" >> /d/platform/_qa_idx_full.log
  python - << 'PYEOF' >> /d/platform/_qa_idx_full.log 2>&1
import json
p = r'D:\platform\deploy\backend\_qa_idx_ckpt.json'
try:
    d = json.load(open(p, encoding='utf-8'))
except Exception:
    d = {"offset": 0}
d["offset"] = int(d.get("offset", 0)) + 512
json.dump(d, open(p, "w"))
PYEOF
  sleep 5
done
echo "MAX ATTEMPTS REACHED" >> /d/platform/_qa_idx_full.log
