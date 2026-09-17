

## CURRENT PASS — active handoff (2026-09-17)

### DONE this pass (verified)
- All 18 API families mounted/linked; diagnostics/exams/junior/teacher/parent live in Docker
- Remediation loop, answer-writing + grammar tiers, id-remapping service, tutor WS protocol
- Lumen scenes, Atlas, My Galaxy rebuilt; 99.96% gold corpus (4 stragglers left, see below)
- LLM keys wired into deploy/.env.production (Gemini + DeepSeek + GLM + Freellm)

### THE LAST 4 NODES (0.04%)
c11_hin_v_cbse_01_001, c11_soc_cbse_01_001, c12_hs_cbse_01_001 (missing prereq_ids — md section
body was empty, now filled via fix_prereq_bodies.py + fix_final3.py) and c8_engl_ch5_17
(misconception written via fix_final4.py). REBUILD backend/_cache/enhanced_nodes_index.json
(rm + load_index) and recount with depth_audit_now.py — expect 9,099/9,099.

### OPEN BUG — ask-lane retrieval ranking (Phase 4 follow-up)
/api/tutor-graph/ask -> _teach_lane (backend/api/competency_tutor.py:534) matches literary
nodes for off-topic questions via generic-word overlap (the simple-explainer table +
enhanced-nodes corpus search at :580). Deployed mitigation: longest-question-term anchor at
the corpus gate. STILL NEEDED: require the anchor term in the simple-explainer/misconception
lanes too, and score corpus hits by idf-weighted term coverage (see
backend/services/id_remapping.py scoring for the pattern). Verify: /ask 'photosynthesis'
must never return a literature node.

### QUEUED (owner-approved direction)
- teacher+parent relaunch after a slot frees (rate-limit deaths)
- db-init one-shot: fixed in source (init_db import path + extend_existing) — verify on next fresh deploy
- C: drive compaction: pause Docker, compact docker_data.vhdx (~+25 GB), restart
- LLM key IS present in deploy/.env.production (Gemini/DeepSeek/GLM/Freellm) — verify tutor replies are LLM-grade after backends restart with keys
