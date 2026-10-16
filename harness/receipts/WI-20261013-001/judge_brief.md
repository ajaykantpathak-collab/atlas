# Judge brief — WI-20261013-001

Fresh-context judge. You did NOT build this change.

## Judge protocol (verbatim §8 of the operating prompt)

The agent that wrote the patch never grades it. You must, independently:

1. Re-run G5 in full and at least one behavioral gate (G1 or G6) yourself.
2. Check the diff for: banned phrases ("should work", unexplained
   TODO/FIXME), claims in the plan not backed by a log, pin changes,
   scope creep beyond the plan's file list.
3. Emit harness/receipts/<WI>/judge_verdict.json:

{"work_item": "<WI>", "verdict": "PASS|FAIL",
 "independent_reruns": [{"gate": "G5", "exit": 0}],
 "issues": [{"severity": "blocker|major|minor", "desc": "...",
             "evidence": "file:line or log path"}],
 "ts_utc": "..."}

FAIL -> the builder returns to REWORK with your issue list attached. The
builder may not argue issues away; it may only return new evidence. Two
consecutive FAIL verdicts -> FAILED.

## The plan

```json
{
 "plan": {
  "path": "D:\\platform\\harness\\receipts\\WI-20261013-001\\plan.md",
  "sha256": "32ad93b13f629ed5298331c43f8397aa4a53d3d7864834c126092d08c5e24b2e"
 },
 "files_in_scope": [
  "deploy/backend/services/answer_telemetry.py",
  "deploy/backend/tests/test_answer_telemetry.py"
 ],
 "gates_expected": {
  "G1": {
   "applies": "apply",
   "reason": "new tests/test_answer_telemetry.py maps to the changed service"
  },
  "G2": {
   "applies": "apply",
   "reason": "backend .py changed"
  },
  "G3": {
   "applies": "apply",
   "reason": "backend .py changed"
  },
  "G4": {
   "applies": "apply",
   "reason": "services/ strings changed — docstrings + code"
  },
  "G5": {
   "applies": "apply"
  },
  "G6": {
   "applies": "not_applicable",
   "reason": "its/solver/** untouched; modeling_layer unchanged"
  },
  "G7": {
   "applies": "apply",
   "reason": "backend .py changed — dev boot + health"
  },
  "G8": {
   "applies": "not_applicable",
   "reason": "no frontend change"
  },
  "G9": {
   "applies": "not_applicable",
   "reason": "chisel CLI not installed on host — verified 2026-10-13"
  },
  "G10": {
   "applies": "apply",
   "reason": "executes at SOAK state"
  }
 },
 "wi_type": "IMPROVEMENT",
 "citation": "telemetry mining blocker, verified live 2026-10-13: `harness mine --since 7d`\nranked 214 refusal signatures from runtime_data/ops/answer_telemetry.jsonl,\nbut the solve-row schema carries NO question text and NO question hash\n(fields: text_len only — sample rows at lines 39572/37170, refusal clusters\n3056x \"needs a different approach\" / 1773x \"No canonical structure\nmatched\"). Corpus mining cannot "
}
```

## The plan document

```markdown
# WI — solve telemetry: privacy-preserving question_hash

## Type

IMPROVEMENT

## Citation (improvement valve / refactor baseline)

telemetry mining blocker, verified live 2026-10-13: `harness mine --since 7d`
ranked 214 refusal signatures from runtime_data/ops/answer_telemetry.jsonl,
but the solve-row schema carries NO question text and NO question hash
(fields: text_len only — sample rows at lines 39572/37170, refusal clusters
3056x "needs a different approach" / 1773x "No canonical structure
matched"). Corpus mining cannot group identical questions; candidates had
to be recovered by replaying sample_200 stems. This change adds a stable
sha256-based question_hash (16 hex, whitespace-normalized, lowercase) so
future mining groups by actual question while keeping the file
scrub-safe (no raw text, privacy property preserved per the existing
comment in record_solve).

## Files in scope

- deploy/backend/services/answer_telemetry.py
- deploy/backend/tests/test_answer_telemetry.py

## Gates expected (applicability matrix)

- G1 : apply            (new tests/test_answer_telemetry.py maps to the changed service)
- G2 : apply            (backend .py changed)
- G3 : apply            (backend .py changed)
- G4 : apply            (services/ strings changed — docstrings + code)
- G5 : apply
- G6 : not_applicable   (its/solver/** untouched; modeling_layer unchanged)
- G7 : apply            (backend .py changed — dev boot + health)
- G8 : not_applicable   (no frontend change)
- G9 : not_applicable   (chisel CLI not installed on host — verified 2026-10-13)
- G10: apply            (executes at SOAK state)

## Approach

1. Add `_question_hash(text)` helper (sha256 of whitespace-normalized
   lowercase text, first 16 hex; None for empty) to services/answer_telemetry.py
   and emit `question_hash` in record_solve rows.
2. New tests/test_answer_telemetry.py (mirrors the CL-06 capture pattern):
   hash present + 16 hex; stable under case/whitespace variation; None for
   empty text; raw text never present in the row.
3. Rollback: snapshot covers both files; the new test file deletes on
   rollback.

```

## The diffs

```diff
--- a/deploy/backend/services/answer_telemetry.py
+++ b/deploy/backend/services/answer_telemetry.py
@@ -154,6 +154,18 @@
 def _stage_of(audit: Any) -> Optional[str]:
     route = getattr(audit, "route", None) or []
     return str(route[0]) if route else None
+
+
+def _question_hash(text: str) -> Optional[str]:
+    """Stable, privacy-preserving fingerprint of the question text:
+    sha256 of the whitespace-normalized lowercase text, first 16 hex
+    (same shape as student_hash). The row still never carries raw text —
+    this file must stay safe to analyze without a scrub pass — but corpus
+    mining can now group identical questions across rows."""
+    if not text:
+        return None
+    norm = " ".join(str(text).lower().split())
+    return hashlib.sha256(norm.encode("utf-8")).hexdigest()[:16]
 
 
 def record_solve(text: str, result: Any, latency_ms: float) -> None:
@@ -176,6 +188,9 @@
             # coarse shape only — never the raw question text (privacy:
             # this file must be safe to analyze without a scrub pass)
             "text_len": len(text or ""),
+            # stable fingerprint of the same text: grouping key for corpus
+            # mining without carrying the text itself
+            "question_hash": _question_hash(text),
         })
         _emit(row)
     except Exception as exc:  # noqa: BLE001

--- a/deploy/backend/tests/test_answer_telemetry.py
+++ b/deploy/backend/tests/test_answer_telemetry.py
@@ -1 +1,56 @@
-(new file — no pre-change blob)
+"""test_answer_telemetry.py — solve rows carry a stable, privacy-preserving
+question_hash (sha256 of whitespace-normalized lowercase text, 16 hex) and
+never the raw question text. Mirrors the CL-06 capture pattern."""
+from backend.services import answer_telemetry as tel
+
+
+class _Result:
+    label = "GUIDED_PRACTICE"
+    refusal_reason = "needs method"
+
+
+def _capture(monkeypatch):
+    captured = {}
+    monkeypatch.setattr(tel, "_emit", lambda row: captured.update(row))
+    return captured
+
+
+def test_solve_row_carries_question_hash(monkeypatch):
+    captured = _capture(monkeypatch)
+    tel.record_solve("Find x when 2x + 3 = 11", _Result(), 120.0)
+    h = captured.get("question_hash")
+    assert isinstance(h, str) and len(h) == 16
+    int(h, 16)  # hex
+
+
+def test_question_hash_stable_under_case_and_whitespace(monkeypatch):
+    captured = _capture(monkeypatch)
+    tel.record_solve("find x when 2x + 3 = 11", _Result(), 1.0)
+    h1 = captured["question_hash"]
+    captured.clear()
+    tel.record_solve("Find   x  when 2x + 3 = 11", _Result(), 1.0)
+    h2 = captured["question_hash"]
+    assert h1 == h2 and h1 is not None
+
+
+def test_question_hash_differs_across_questions(monkeypatch):
+    captured = _capture(monkeypatch)
+    tel.record_solve("What is the speed of light?", _Result(), 1.0)
+    h1 = captured["question_hash"]
+    captured.clear()
+    tel.record_solve("Solve for y: 3y - 4 = 11", _Result(), 1.0)
+    assert h1 != captured["question_hash"]
+
+
+def test_question_hash_none_for_empty_text(monkeypatch):
+    captured = _capture(monkeypatch)
+    tel.record_solve("", _Result(), 1.0)
+    assert captured["question_hash"] is None
+
+
+def test_raw_text_never_in_row(monkeypatch):
+    captured = _capture(monkeypatch)
+    q = "A notebook costs x rupees, you buy 3 and pay 20 fee, total 170"
+    tel.record_solve(q, _Result(), 1.0)
+    assert q not in str(captured)
+    assert captured["text_len"] == len(q)
```

## The gate results (latest VERIFY receipt)

```json
[
 {
  "id": "G5",
  "name": "static scans (control/nan/id/parse/pins/oversize)",
  "ok": false,
  "exit": 1,
  "seconds": 30.5,
  "skipped": false,
  "reason": "",
  "log": "harness/receipts/WI-20261013-001/logs/G5_scans.log",
  "log_sha256": "30f7fd2d6be592b3109abd9848e3036534b17e3bb96280f78e678fa2f6be9159",
  "hard_findings": 1
 },
 {
  "id": "G1",
  "name": "pytest tests/test_answer_telemetry.py",
  "ok": true,
  "exit": 0,
  "seconds": 15.3,
  "skipped": false,
  "reason": "",
  "log": "harness/receipts/WI-20261013-001/logs/G1_pytest.log",
  "log_sha256": "58f9209b30a6c9a86d799ff3571436047c61a7b5823b19d08284b1f21726cb2f",
  "tests": [
   "tests/test_answer_telemetry.py"
  ]
 },
 {
  "id": "G2",
  "name": "PIN_TOTALS monotonic (no silent pass)",
  "ok": false,
  "exit": 1,
  "seconds": 17.0,
  "skipped": false,
  "reason": "",
  "log": "harness/receipts/WI-20261013-001/logs/G2_pins.log",
  "log_sha256": "35b9a92400c72053be6ef970c89f35564f39729ba136f57cd4363c3af0ddd82b"
 },
 {
  "id": "G3",
  "name": "import lint (boundaries)",
  "ok": false,
  "exit": 1,
  "seconds": 76.7,
  "skipped": false,
  "reason": "",
  "log": "harness/receipts/WI-20261013-001/logs/G3_boundaries.log",
  "log_sha256": "68f0fed1772cf8ea694e0c2dbae8a36637eccd801f27119d1002a90a8627a472"
 },
 {
  "id": "G4",
  "name": "antislop scrub on new/changed student-facing strings",
  "ok": false,
  "exit": 1,
  "seconds": 0.4,
  "skipped": false,
  "reason": "",
  "log": "harness/receipts/WI-20261013-001/logs/G4_slop.log",
  "log_sha256": "daaad88f9cc4df1df70e77d7fd01ee96cac929bd5741abc2d23c389f94269bb8",
  "scope_files": 1,
  "violations": 1
 },
 {
  "id": "G6",
  "name": "not applicable per plan matrix",
  "ok": true,
  "exit": 0,
  "seconds": 0.0,
  "skipped": true,
  "reason": "its/solver/** untouched; modeling_layer unchanged"
 },
 {
  "id": "G9",
  "name": "not applicable per plan matrix",
  "ok": true,
  "exit": 0,
  "seconds": 0.0,
  "skipped": true,
  "reason": "chisel CLI not installed on host \u2014 verified 2026-10-13"
 },
 {
  "id": "G7",
  "name": "dev boot + health (SAFE TO SERVE + /api/health 200)",
  "ok": false,
  "exit": 1,
  "seconds": 365.4,
  "skipped": false,
  "reason": "",
  "log": "harness/receipts/WI-20261013-001/logs/G7_boot.log",
  "log_sha256": "da4ceb08a8b2b76ebddc4598621849dfd4c4f8998a90091ddf5b0442fe4dd0b1",
  "pid": 20992,
  "healthy": false,
  "smoke_ok": true
 },
 {
  "id": "G8",
  "name": "not applicable per plan matrix",
  "ok": true,
  "exit": 0,
  "seconds": 0.0,
  "skipped": true,
  "reason": "no frontend change"
 },
 {
  "id": "G10",
  "name": "soak thresholds",
  "ok": true,
  "exit": 0,
  "seconds": 0.0,
  "skipped": false,
  "reason": "",
  "linked": false,
  "note": "executes at SOAK state; VERIFY linked no recent receipt"
 }
]
```

Gate logs live under the paths in each gate entry (relative to D:\platform); read them.

## Your output

Write `harness/receipts/WI-20261013-001/judge_verdict.json` using the schema above, then hand it back to the coordinator.