"""harness.py — Atlas Loop CLI (§12). Run from D:\\platform in Git Bash.

Exit codes: 0 ok · 2 gate/soak red or blocking SKIPPED · 3 illegal
transition · 4 missing evidence/receipt/snapshot · 5 judge FAIL ·
6 tamper alert · 7 ops threshold breach.
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import List, Optional

sys.path.insert(0, str(Path(__file__).resolve().parent))

import common as C  # noqa: E402


def main(argv: Optional[List[str]] = None) -> int:
    ap = argparse.ArgumentParser(prog="harness")
    sub = ap.add_subparsers(dest="cmd", required=True)

    # ---- ops layer ----
    p = sub.add_parser("digest"); p.add_argument("--date", default=None)
    p = sub.add_parser("backup"); p.add_argument("--full", action="store_true")
    p = sub.add_parser("restore-drill"); p.add_argument("backup_dir")
    p.add_argument("--keep", action="store_true")
    p = sub.add_parser("offhost-copy")  # LAUNCH-FIX-F4: off-host backup copy
    p = sub.add_parser("watch")
    p.add_argument("--sweep", action="store_true")
    p.add_argument("--install-print", action="store_true")

    # ---- change loop ----
    p = sub.add_parser("new"); p.add_argument("wi", nargs="?", default=None)
    p.add_argument("--title", required=True)
    p.add_argument("--lanes", default="")
    p = sub.add_parser("plan"); p.add_argument("wi")
    p.add_argument("--plan", required=True)
    p = sub.add_parser("snapshot"); p.add_argument("wi")
    p = sub.add_parser("advance"); p.add_argument("wi")
    p.add_argument("--to", required=True)
    p = sub.add_parser("verify"); p.add_argument("wi")
    p = sub.add_parser("review"); p.add_argument("wi")
    p.add_argument("--verdict", required=True)
    p = sub.add_parser("soak"); p.add_argument("wi")
    p = sub.add_parser("status"); p.add_argument("wi")
    p = sub.add_parser("rollback"); p.add_argument("wi")
    p = sub.add_parser("mine"); p.add_argument("--since", default="7d")
    p = sub.add_parser("corpus")
    p.add_argument("--add", action="store_true")
    p.add_argument("--from", dest="from_file")
    p.add_argument("--pick", type=int, default=1)
    p = sub.add_parser("ship-confirm"); p.add_argument("wi")
    p.add_argument("--manifest", required=True)
    sub.add_parser("gc")

    # ---- scans seed-mode (DEMO-6) ----
    p = sub.add_parser("scans"); p.add_argument("scanner")
    p.add_argument("files", nargs="+")

    args = ap.parse_args(argv)
    cfg = C.load_config()

    try:
        if args.cmd == "digest":
            import digest
            return digest.main(["--date", args.date] if args.date else [])
        if args.cmd == "backup":
            import backup
            return backup.main(["backup"] + (["--full"] if args.full else []))
        if args.cmd == "restore-drill":
            import backup
            return backup.main(["restore-drill", args.backup_dir]
                               + (["--keep"] if args.keep else []))
        if args.cmd == "offhost-copy":
            # LAUNCH-FIX-F4: copy newest backups off this host + verify
            # sha256 at the destination (audit §2 #3, same-disk backups).
            import ops.offhost as OH
            return OH.run_offhost(cfg)
        if args.cmd == "watch":
            import watch
            return watch.main(["--install-print"] if args.install_print else [])
        if args.cmd == "scans":
            import scans
            return scans.seed_mode(args.scanner, args.files)

        import runner as R
        if args.cmd == "new":
            lanes = [x.strip() for x in args.lanes.split(",") if x.strip()]
            if args.wi:
                import re
                if not R.WI_RX.match(args.wi):
                    C.eprint(f"[new] WI must match {R.WI_RX.pattern}")
                    return C.EXIT_ILLEGAL
                if R.wi_dir(cfg, args.wi).exists():
                    C.eprint(f"[new] {args.wi} already exists")
                    return C.EXIT_ILLEGAL
                # honour an explicit id: create with that name
                wi = R.new_wi(cfg, args.title, lanes)
                if wi != args.wi:
                    # rename the freshly created dir + receipts' work_item
                    src, dst = R.wi_dir(cfg, wi), R.wi_dir(cfg, args.wi)
                    src.rename(dst)
                    for p in dst.glob("*.json"):
                        d = json.loads(p.read_text(encoding="utf-8"))
                        d["work_item"] = args.wi
                        p.write_text(json.dumps(d, indent=1), encoding="utf-8")
                    wi = args.wi
            else:
                wi = R.new_wi(cfg, args.title, lanes)
            print(f"[new] {wi} created (INTAKE)")
            return C.EXIT_OK
        if args.cmd == "plan":
            return R.cmd_plan(cfg, args.wi, Path(args.plan))
        if args.cmd == "snapshot":
            import snapshots as S
            m = S.snapshot(cfg, args.wi)
            n = len(json.loads(m.read_text(encoding="utf-8"))["files"])
            print(f"[snapshot] {args.wi}: {n} file(s) -> {m}")
            return C.EXIT_OK
        if args.cmd == "advance":
            return R.cmd_advance(cfg, args.wi, args.to)
        if args.cmd == "verify":
            return R.cmd_verify(cfg, args.wi)
        if args.cmd == "review":
            return R.cmd_review(cfg, args.wi, Path(args.verdict))
        if args.cmd == "soak":
            return R.cmd_soak(cfg, args.wi)
        if args.cmd == "status":
            return R.cmd_status_all(cfg) if args.wi == "all" \
                else R.cmd_status(cfg, args.wi)
        if args.cmd == "rollback":
            return R.cmd_rollback(cfg, args.wi)
        if args.cmd == "mine":
            import mine
            return mine.main(["--since", args.since])
        if args.cmd == "corpus":
            if not args.from_file:
                C.eprint("[corpus] use: corpus --add --from candidates.jsonl")
                return C.EXIT_MISSING
            import corpus as K
            added = K.main_add_from(cfg, Path(args.from_file), args.pick)
            for res in added:
                c = res["case"]
                print(f"[corpus] {'deduped' if res['deduped'] else 'added'} "
                      f"{c['id']} status={c['status']} pinned={c['pinned_check']}")
            return C.EXIT_OK
        if args.cmd == "ship-confirm":
            return R.cmd_ship_confirm(cfg, args.wi, Path(args.manifest))
        if args.cmd == "gc":
            import snapshots as S
            removed = S.gc(cfg)
            print(f"[gc] pruned snapshots: {removed or 'none'}")
            return C.EXIT_OK
    except Exception as exc:
        code = getattr(exc, "code", None)
        if code is not None:  # runner.LoopError carries its exit code
            C.eprint(f"[harness] {exc}")
            return code
        raise
    return C.EXIT_OK


if __name__ == "__main__":
    raise SystemExit(main())
