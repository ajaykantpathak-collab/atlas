"""mine.py — telemetry -> corpus_candidates.jsonl (§11).

Groups refusal rows by (refusal_reason, subject, stage, text_len bucket),
ranks by frequency, and writes ranked candidates with a real origin
(file + line_no + ts). The telemetry schema has NO question text — the
mined candidate names the refusal signature; question recovery happens
by replaying sample_200 stems (or reproducing via stage) and is recorded
on the candidate when the agent enriches it.
"""
from __future__ import annotations

import argparse
import re
from collections import defaultdict
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

import common as C


def bucket_len(n: Optional[int]) -> str:
    if not isinstance(n, (int, float)):
        return "unk"
    n = int(n)
    for hi, tag in ((40, "xshort"), (120, "short"), (300, "mid"),
                    (800, "long")):
        if n <= hi:
            return tag
    return "xlong"


def mine(cfg: Dict[str, Any], since: str = "7d",
         telemetry_path: Optional[Path] = None) -> List[Dict[str, Any]]:
    m = re.match(r"(\d+)d", since)
    days = int(m.group(1)) if m else 7
    cutoff = C.now_utc() - timedelta(days=days)
    path = telemetry_path or C.cfg_path(cfg, "telemetry")
    groups: Dict[Tuple, Dict[str, Any]] = defaultdict(
        lambda: {"count": 0, "example": None, "line_no": 0})
    with open(path, "r", encoding="utf-8", errors="replace") as fh:
        for line_no, line in enumerate(fh, 1):
            try:
                row = json.loads(line)
            except Exception:
                continue
            rr = row.get("refusal_reason")
            if not rr:
                continue
            ts = C.parse_utc(row.get("ts", ""))
            if ts is None or ts < cutoff:
                continue
            key = (str(rr), str(row.get("subject")), str(row.get("stage")),
                   bucket_len(row.get("text_len")))
            g = groups[key]
            g["count"] += 1
            if g["example"] is None or ts > g["example"]["ts_utc_dt"]:
                g["example"] = {"ts_utc_dt": ts, "line_no": line_no,
                                "row": row}
    out: List[Dict[str, Any]] = []
    for (reason, subject, stage, blen), g in groups.items():
        ex = g["example"]
        out.append({
            "signature": f"{reason[:60]} | {subject} | {stage} | {blen}",
            "count": g["count"],
            "refusal_reason": reason,
            "subject": None if subject == "None" else subject,
            "stage": None if stage == "None" else stage,
            "text_len_bucket": blen,
            "origin": {"file": str(path), "line_no": ex["line_no"],
                       "ts_utc": C.iso_utc(ex["ts_utc_dt"])},
            "question_text": None,  # recovery required (schema has no text)
            "expected": {"tier": "VERIFIED"},
        })
    out.sort(key=lambda r: -r["count"])
    dest = cases_dir(cfg) / "corpus_candidates.jsonl"
    dest.parent.mkdir(parents=True, exist_ok=True)
    with open(dest, "w", encoding="utf-8") as fh:
        for r in out:
            fh.write(json.dumps(r, ensure_ascii=False) + "\n")
    out_path = dest
    for r in out:
        r["candidates_path"] = str(out_path)
    return out


def cases_dir(cfg: Dict[str, Any]) -> Path:
    return C.cfg_path(cfg, "corpus_cases").parent


def main(argv: Optional[List[str]] = None) -> int:
    import json as _json
    ap = argparse.ArgumentParser(prog="harness mine")
    ap.add_argument("--since", default="7d")
    args = ap.parse_args(argv)
    cfg = C.load_config()
    rows = mine(cfg, args.since)
    print(f"[mine] {args.since}: {len(rows)} refusal signature(s) ranked")
    for r in rows[:10]:
        print(f"  {r['count']:5d}x  {r['signature'][:90]}")
        print(f"         origin line {r['origin']['line_no']} "
              f"ts {r['origin']['ts_utc']}")
    print(f"[mine] candidates -> "
          f"{cases_dir(cfg) / 'corpus_candidates.jsonl'}")
    return C.EXIT_OK


import json  # noqa: E402  (used by mine streaming)

if __name__ == "__main__":
    raise SystemExit(main())
