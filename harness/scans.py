"""scans.py — G5 static scanners (six detectors + seed-mode for DEMO-6).

  control_chars   — .py/.md/.json/.txt under deploy/backend (full) + a
                    sampled slice of deploy/content: invalid UTF-8 or control
                    bytes outside \\t\\n\\r (catches \\x08 — the 2026-10-12
                    physics_families.py boot-blocker — plus \\x00, \\x1b).
  nan_literals    — AST walk of changed .py: float("nan"), nan/NaN/Infinity
                    names, 1e999 literals, in student-facing modules.
  display_id_leak — node-ID patterns in solver/router string literals;
                    payload keys/URL paths are accepted-by-design and
                    excluded; only display-text hits are flagged.
  silent_pass     — reports current PIN_TOTALS from the G2 source; warn
                    (never fail) on increases; G2 itself fails on regressions.
  oversize_warn   — warn-only: solver files > 12,000 lines.
  parse_check     — ast.parse every changed .py.

Seed-mode (DEMO-6): python harness/scans.py <scanner> <file>...
"""
from __future__ import annotations

import ast
import json
import random
import re
import sys
from pathlib import Path
from typing import Dict, List, Optional, Tuple

import common as C

NODE_ID_RX = re.compile(
    r"\bc\d{1,2}_[a-z]{2,5}_(?:cbse|isc|icse)_\d{2}_\d{3}\b")
ALLOWED_ID_KEYS = {"id", "node_id", "ids", "node_ids", "url", "href", "link",
                   "key", "ref", "source", "origin", "parent_id", "question_id",
                   "node", "stem", "next", "prev", "root", "left", "right"}
DISPLAY_KEYS = {"title", "text", "prompt", "message", "explanation", "question",
                "hint", "body", "content", "answer", "label", "caption",
                "description", "summary", "display", "subtitle", "header",
                "banner", "toast", "subtitle_text"}
OVERSIZE_LINES = 12000


class Finding:
    def __init__(self, scanner: str, path: str, detail: str):
        self.scanner, self.path, self.detail = scanner, path, detail

    def line(self) -> str:
        return f"[{self.scanner}] {self.path}: {self.detail}"


# --------------------------------------------------------------------------- #
# control_chars
# --------------------------------------------------------------------------- #
_CTRL_RX = re.compile(rb"[\x00-\x08\x0b\x0c\x0e-\x1f]")
_CTRL_NAMES = {0x08: "\\x08 (backspace — the 2026-10-12 boot-blocker)",
               0x00: "\\x00", 0x1B: "\\x1b (ESC)"}


def _control_bytes_findings(path: Path, rel: str) -> List[Finding]:
    out: List[Finding] = []
    try:
        raw = path.read_bytes()
    except OSError as exc:
        return [Finding("control_chars", rel, f"unreadable: {exc}")]
    try:
        raw.decode("utf-8")
    except UnicodeDecodeError as exc:
        out.append(Finding("control_chars", rel,
                           f"invalid UTF-8 at byte {exc.start}"))
    hits = {}
    for m in _CTRL_RX.finditer(raw):
        b = m.group(0)[0]
        hits.setdefault(b, m.start())
        if len(hits) >= 8:
            break
    for b, first in sorted(hits.items()):
        out.append(Finding("control_chars", rel,
                           f"control byte {_CTRL_NAMES.get(b, f'\\\\x{b:02x}')} "
                           f"first at offset {first}"))
    return out


DEFAULT_EXCLUDE_DIRS = {"__pycache__", ".pytest_cache", ".git", "node_modules",
                        "_trash", "backups", "_work_wsd"}


def control_chars(backend_root: Path, content_root: Path,
                  sample_n: int = 500,
                  exclude_dirs=None) -> Tuple[List[Finding], List[Finding], int]:
    """Scan backend tree (full) + content sample. Returns (hard, warn,
    scanned). Findings under non-served dirs (_trash, backups, caches) are
    warnings — they must not gate every batch, but they are reported."""
    from concurrent.futures import ThreadPoolExecutor

    exclude = exclude_dirs if exclude_dirs is not None else DEFAULT_EXCLUDE_DIRS
    findings: List[Finding] = []
    scanned = 0
    exts = {".py", ".md", ".json", ".txt"}
    if not backend_root.is_absolute():
        backend_root = C.ROOT / backend_root
    if not content_root.is_absolute():
        content_root = C.ROOT / content_root

    def rel(p: Path) -> str:
        try:
            return p.relative_to(C.ROOT).as_posix()
        except ValueError:
            return str(p)

    targets: List[Path] = [p for p in backend_root.rglob("*")
                           if p.suffix.lower() in exts and p.is_file()
                           and not (exclude & set(p.parts))]
    if content_root.exists():
        files = [p for p in content_root.rglob("*")
                 if p.suffix.lower() in exts and p.is_file()]
        random.Random(20261012).shuffle(files)  # deterministic sample
        targets += files[:sample_n]
    scanned = len(targets)
    allow = _byte_rx_allowlist()
    with ThreadPoolExecutor(max_workers=8) as pool:
        results = list(pool.map(lambda p: (rel(p), _control_bytes_findings(p, rel(p))),
                                targets))
    hard: List[Finding] = []
    warn: List[Finding] = []
    for r, fs in results:
        for f in fs:
            if any(x in Path(r).parts for x in
                   ("_trash", "backups", "__pycache__", ".pytest_cache")):
                warn.append(f)
            elif r in allow and _hit_byte(f) in allow[r]:
                warn.append(Finding("control_chars", r,
                                    f"WARN allowlisted intentional use: "
                                    f"{f.detail} (reason: {allow[r][_hit_byte(f)]})"))
            else:
                hard.append(f)
    return hard, warn, scanned


def _hit_byte(finding: Finding) -> Optional[int]:
    m = re.search(r"\\x([0-9a-f]{2})", finding.detail)
    if m:
        return int(m.group(1), 16)
    return 8 if "\\x08" in finding.detail else None


def _byte_rx_allowlist() -> Dict[str, Dict[int, str]]:
    """path -> {byte -> reason} for INTENTIONAL control-byte use. Explicit,
    reviewed, printed in every G5 log; never silent."""
    try:
        cfg = C.load_config()
    except Exception:
        return {}
    out: Dict[str, Dict[int, str]] = {}
    for e in cfg.get("scans", {}).get("control_byte_allowlist", []):
        out[e["path"]] = {int(b, 16): e["reason"] for b in e["bytes"]}
    return out


# --------------------------------------------------------------------------- #
# parse_check
# --------------------------------------------------------------------------- #
def parse_check(files: List[str]) -> List[Finding]:
    out: List[Finding] = []
    for rel in files:
        if not rel.endswith(".py"):
            continue
        p = C.ROOT / rel
        try:
            ast.parse(p.read_text(encoding="utf-8", errors="replace"))
        except SyntaxError as exc:
            out.append(Finding("parse_check", rel,
                               f"SyntaxError line {exc.lineno}: {exc.msg}"))
    return out


# --------------------------------------------------------------------------- #
# nan_literals
# --------------------------------------------------------------------------- #
_NAN_NAMES = {"nan", "NaN", "Infinity", "inf", "-inf", "-Infinity"}


def nan_literals(files: List[str],
                 student_facing_globs: Tuple[str, ...] = ()) -> List[Finding]:
    out: List[Finding] = []
    for rel in files:
        if not rel.endswith(".py"):
            continue
        if student_facing_globs and not any(g in rel.replace("\\", "/")
                                            for g in student_facing_globs):
            continue
        p = C.ROOT / rel
        try:
            tree = ast.parse(p.read_text(encoding="utf-8", errors="replace"))
        except SyntaxError:
            continue  # parse_check reports it
        for node in ast.walk(tree):
            if isinstance(node, ast.Name) and node.id in _NAN_NAMES \
                    and isinstance(node.ctx, ast.Load):
                out.append(Finding("nan_literals", rel,
                                   f"line {node.lineno}: bare NaN/Inf name "
                                   f"`{node.id}` in student-facing module"))
            elif isinstance(node, ast.Call) and isinstance(node.func, ast.Name) \
                    and node.func.id == "float" and node.args:
                arg = node.args[0]
                if isinstance(arg, ast.Constant) and isinstance(arg.value, str) \
                        and arg.value.lower() in ("nan", "inf", "-inf", "infinity"):
                    out.append(Finding("nan_literals", rel,
                                       f"line {node.lineno}: float("
                                       f"{arg.value!r}) literal"))
            elif isinstance(node, ast.Constant) and isinstance(node.value, float) \
                    and (node.value != node.value or node.value in
                         (float("inf"), float("-inf"))):
                out.append(Finding("nan_literals", rel,
                                   f"line {node.lineno}: non-finite float "
                                   f"literal (1e999-style)"))
    return out


# --------------------------------------------------------------------------- #
# display_id_leak
# --------------------------------------------------------------------------- #
def display_id_leak(files: List[str]) -> List[Finding]:
    out: List[Finding] = []
    for rel in files:
        if not rel.endswith(".py"):
            continue
        norm = rel.replace("\\", "/")
        if not any(g in norm for g in ("its/solver/", "routers/", "services/",
                                       "api/", "backend/api/")):
            continue
        p = C.ROOT / rel
        try:
            tree = ast.parse(p.read_text(encoding="utf-8", errors="replace"))
        except SyntaxError:
            continue
        parent_of: Dict[int, ast.AST] = {}
        for n in ast.walk(tree):
            for ch in ast.iter_child_nodes(n):
                parent_of[id(ch)] = n
        for node in ast.walk(tree):
            if not (isinstance(node, ast.Constant) and isinstance(node.value, str)):
                continue
            s = node.value
            m = NODE_ID_RX.search(s)
            if not m:
                continue
            parent = parent_of.get(id(node))
            verdict, why = _classify_literal(s, m, node, parent, parent_of)
            if verdict == "display":
                out.append(Finding("display_id_leak", rel,
                                   f"line {node.lineno}: node id `{m.group(0)}` "
                                   f"in display text: {s[:80]!r} ({why})"))
    return out


def _classify_literal(s: str, m: re.Match, node, parent, parent_of) -> Tuple[str, str]:
    whole_id = s.strip() == m.group(0)
    if isinstance(parent, ast.Dict):
        # value position? find key with same index
        for i, v in enumerate(parent.values):
            if v is node:
                k = parent.keys[i] if i < len(parent.keys) else None
                if isinstance(k, ast.Constant) and isinstance(k.value, str):
                    if k.value in ALLOWED_ID_KEYS and whole_id:
                        return "payload", f"dict value under payload key {k.value!r}"
                    if k.value in DISPLAY_KEYS:
                        return "display", f"dict value under display key {k.value!r}"
                if whole_id:
                    return "payload", "value is exactly an id (opaque fetch key)"
                return "display", "id embedded in longer dict-value string"
    if isinstance(parent, ast.JoinedStr):  # f-string
        return "display", "id interpolated into display f-string"
    if isinstance(parent, ast.BinOp) and isinstance(parent.op, ast.Mod):
        return "display", "id in %-formatted display string"
    if isinstance(parent, ast.Compare):
        return "payload", "id used in comparison (lookup)"
    if isinstance(parent, ast.Call):
        return "payload", "id passed as call argument (opaque key)"
    if whole_id:
        return "payload", "value is exactly an id (opaque fetch key)"
    return "display", "id embedded in longer string"


# --------------------------------------------------------------------------- #
# silent_pass + oversize_warn
# --------------------------------------------------------------------------- #
PIN_RX = re.compile(r"PIN_TOTALS[^={]*=\s*\{?")


def _extract_pin_totals(text: str) -> Optional[Dict[str, int]]:
    """Brace-match the PIN_TOTALS dict; handles 'PIN_TOTALS: dict = {'
    annotations and nested braces. Returns {} shape ints or {'TOTAL': n}."""
    m = PIN_RX.search(text)
    if not m:
        return None
    rest = text[m.end() - 1:]
    if rest.startswith("{"):
        depth, end = 0, None
        for i, ch in enumerate(rest):
            if ch == "{":
                depth += 1
            elif ch == "}":
                depth -= 1
                if depth == 0:
                    end = i
                    break
        if end is None:
            return {}
        body = rest[:end + 1]
        return {k: int(v) for k, v in
                re.findall(r"['\"]([^'\"]+)['\"]\s*:\s*(\d+)", body)}
    n = re.match(r"\s*(\d+)", text[m.end():])
    return {"TOTAL": int(n.group(1))} if n else {}


def silent_pass(wsa_test_path: Path, last_known_path: Path
                ) -> Tuple[List[Finding], Dict[str, int]]:
    text = wsa_test_path.read_text(encoding="utf-8", errors="replace")
    findings: List[Finding] = []
    counts: Dict[str, int] = {}
    extracted = _extract_pin_totals(text)
    if extracted is None:
        findings.append(Finding("silent_pass", str(wsa_test_path),
                                "PIN_TOTALS not found in G2 source"))
        return findings, counts
    counts = extracted
    last = {}
    if last_known_path.exists():
        try:
            last = json.loads(last_known_path.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            last = {}
    for k, v in counts.items():
        if k in last and v > last[k]:
            # warn-only: pins may only go DOWN; G2 fails on regressions,
            # the scanner surfaces increases for review
            findings.append(Finding("silent_pass", str(wsa_test_path),
                                    f"WARN pin {k} increased {last[k]} -> {v}"))
    last_known_path.parent.mkdir(parents=True, exist_ok=True)
    last_known_path.write_text(json.dumps(counts, indent=1), encoding="utf-8")
    return findings, counts


def oversize_warn(solver_dir: Path) -> List[Finding]:
    out: List[Finding] = []
    if not solver_dir.exists():
        return out
    for p in solver_dir.rglob("*.py"):
        n = sum(1 for _ in open(p, "rb"))
        if n > OVERSIZE_LINES:
            out.append(Finding("oversize_warn",
                               p.relative_to(C.ROOT).as_posix(),
                               f"WARN {n} lines > {OVERSIZE_LINES} "
                               "(physics_families.py cautionary tale)"))
    return out


# --------------------------------------------------------------------------- #
# run_all (G5)
# --------------------------------------------------------------------------- #
def run_all(cfg: Dict[str, Any], files: List[str]) -> List[Finding]:
    findings: List[Finding] = []
    findings += parse_check(files)
    cc_hard, cc_warn, scanned = control_chars(
        C.ROOT / "deploy" / "backend", C.ROOT / "deploy" / "content",
        cfg["scans"]["content_sample_files"])
    findings += cc_hard
    findings += nan_literals(files, tuple(cfg["scans"]["student_facing_globs"]))
    findings += display_id_leak(files)
    findings += silent_pass(C.ROOT / "deploy" / "backend" / "tests" /
                            "test_wsa_no_silent_pass.py",
                            C.HARNESS / "ops" / "pin_totals_last.json")[0]
    findings += oversize_warn(C.ROOT / "deploy" / "backend" / "its" / "solver")
    findings.append(Finding("control_chars", "(summary)",
                            f"scanned {scanned} files (backend full + content "
                            f"sample {cfg['scans']['content_sample_files']}); "
                            f"{len(cc_warn)} WARN-only findings in non-served "
                            f"dirs (trash/backups/caches): "
                            + "; ".join(sorted({f.path for f in cc_warn})[:5])))
    return findings


def seed_mode(name: str, files: List[str]) -> int:
    """DEMO-6 seed-mode: run ONE scanner on explicit files, print findings."""
    cfg = C.load_config()
    findings: List[Finding] = []
    if name == "control_chars":
        for f in files:
            findings += _control_bytes_findings(Path(f), f)
    elif name == "nan_literals":
        findings = nan_literals(files, tuple(cfg["scans"]["student_facing_globs"]))
    elif name == "display_id_leak":
        findings = display_id_leak(files)
    elif name == "parse_check":
        findings = parse_check(files)
    else:
        print(f"unknown scanner {name}")
        return 2
    for f in findings:
        print(f.line())
    hard = [f for f in findings if "WARN" not in f.detail and "(summary)" not in f.detail]
    print(f"[scans] {name}: {len(hard)} hard finding(s), {len(files)} file(s)")
    return 1 if hard else 0


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("usage: python harness/scans.py <scanner> <file> [...]")
        raise SystemExit(2)
    raise SystemExit(seed_mode(sys.argv[1], sys.argv[2:]))
