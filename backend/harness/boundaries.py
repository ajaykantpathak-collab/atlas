"""boundaries.py — import-boundary lint for the Atlas backend (Phase C).

Enforces the layering the 2026-09-30 solver-wedge incident made non-negotiable:
HTTP edge code must reach the solver THROUGH the services layer, and the AI
stratum must not quietly re-acquire solver/service internals.

Four violation classes (each = one finding, one line of output):

  AI_LEGACY_TO_SOLVER   any module in the AI stratum (backend.ai.*) or any
                        legacy stratum module (path contains a 'legacy'
                        segment) imports backend.its.solver.*
  AI_LEGACY_TO_SERVICES same zones importing backend.services.*, EXCEPT the
                        one sanctioned seam backend.services.llm_client
  ROUTER_DIRECT_SOLVER  backend.routers.* / backend.api.* importing
                        backend.its.solver.* directly instead of going
                        through backend.services.* (this is the wedge class:
                        routers that own solver lifecycle)
  ROUTER_CROSS_IMPORT   a module in backend.routers.* importing ANOTHER
                        edge module's internals (backend.routers.* or
                        backend.api.*).  Wiring belongs to main.py and the
                        routers/__init__ aggregator (package __init__ files
                        are exempt).  Carve-out: backend.api.* -> backend.api.*
                        shared helper imports (e.g. _assessment_sessions,
                        _require_staff) are an established pattern in this
                        tree and are deliberately NOT flagged.

Usage (coordinator wires this into CI — nothing is wired here):

  python -m backend.harness.boundaries check            # exit 0/1, findings listed
  python -m backend.harness.boundaries check --json     # machine-readable
  python -m backend.harness.boundaries check --root D:/platform/deploy/backend

Scan is AST-based (ast.walk catches imports nested inside functions too —
routers famously import lazily), stdlib-only, and never imports the scanned
code, so it is safe to run offline on any checkout.
"""

from __future__ import annotations

import argparse
import ast
import json
import os
import sys
import warnings
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Iterable, List, Optional, Sequence, Tuple

# --------------------------------------------------------------------------- #
# Rule configuration
# --------------------------------------------------------------------------- #
PKG_PREFIX = "backend."
AI_ZONE = "backend.ai."
SERVICES_ZONE = "backend.services."
ITS_SOLVER_ZONE = "backend.its.solver."
ROUTERS_ZONE = "backend.routers."
API_ZONE = "backend.api."
LEGACY_SEGMENT = "legacy"          # any package path component equal to this
SERVICES_EXCEPTIONS = {            # sanctioned seams out of the services wall
    "backend.services.llm_client",
}

CODE_AI_TO_SOLVER = "AI_LEGACY_TO_SOLVER"
CODE_AI_TO_SERVICES = "AI_LEGACY_TO_SERVICES"
CODE_ROUTER_SOLVER = "ROUTER_DIRECT_SOLVER"
CODE_ROUTER_CROSS = "ROUTER_CROSS_IMPORT"

ALL_CODES = (
    CODE_AI_TO_SOLVER,
    CODE_AI_TO_SERVICES,
    CODE_ROUTER_SOLVER,
    CODE_ROUTER_CROSS,
)

# Directory pruning: these are skipped at walk level for speed.  The FIRST
# three are caches that contain no source; the root-level ``_archive`` is dead
# code outside every constrained zone.  IMPORTANT: the exclusion is by PATH
# (pkg_root/_archive only) — a ``_archive``/``legacy`` segment ANYWHERE ELSE
# (e.g. backend/its/competency/_archive/legacy) stays fully in scope, because
# that is exactly where legacy-stratum modules live.
EXCLUDED_DIR_NAMES = {"__pycache__", ".pytest_cache", ".benchmarks"}


@dataclass(frozen=True)
class Violation:
    code: str
    file: str            # path as given to the linter (repo-relative ideally)
    line: int
    module: str          # importing module (dotted)
    imported: str        # imported module (dotted)
    rule: str

    def render(self) -> str:
        return f"{self.code} {self.file}:{self.line}: " \
               f"'{self.module}' imports '{self.imported}' — {self.rule}"


# --------------------------------------------------------------------------- #
# Zone predicates
# --------------------------------------------------------------------------- #
def module_name_for(path: Path, pkg_root: Path, pkg_prefix: str = PKG_PREFIX) -> str:
    """deploy/backend/routers/auth.py -> backend.routers.auth"""
    rel = path.relative_to(pkg_root).with_suffix("")
    parts = list(rel.parts)
    if parts[-1] == "__init__":
        parts = parts[:-1]
    if not parts:
        return pkg_prefix.rstrip(".")
    return pkg_prefix + ".".join(parts)


def _is_ai_zone(module: str) -> bool:
    return module.startswith(AI_ZONE)


def _is_legacy_zone(module: str) -> bool:
    return any(part == LEGACY_SEGMENT for part in module.split("."))


def _is_ai_or_legacy(module: str) -> bool:
    return _is_ai_zone(module) or _is_legacy_zone(module)


def _is_edge_zone(module: str) -> bool:
    """api/ + routers/ = the HTTP edge."""
    return module.startswith(ROUTERS_ZONE) or module.startswith(API_ZONE)


def lint_imports(
    module: str,
    imported_names: Iterable[str],
    *,
    is_init: bool = False,
    file: str = "<synthetic>",
) -> List[Violation]:
    """Pure rule core: given one module and the absolute names it imports,
    return the boundary violations.  Tests drive this directly with
    synthetic import strings; the AST scan feeds it from real files."""
    out: List[Violation] = []
    seen = set()
    for name in imported_names:
        if not name or not name.startswith(PKG_PREFIX):
            continue
        key = name
        if key in seen:
            continue
        seen.add(key)

        # 1 + 2 — AI/legacy stratum walls
        if _is_ai_or_legacy(module):
            if name.startswith(ITS_SOLVER_ZONE):
                out.append(Violation(
                    CODE_AI_TO_SOLVER, file, 0, module, name,
                    "AI/legacy stratum must not import its.solver directly"))
                continue
            if name.startswith(SERVICES_ZONE) and name not in SERVICES_EXCEPTIONS:
                out.append(Violation(
                    CODE_AI_TO_SERVICES, file, 0, module, name,
                    "AI/legacy stratum must reach services only via the "
                    "sanctioned seams " + ", ".join(sorted(SERVICES_EXCEPTIONS))))
                continue

        # 3 — edge must reach the solver through the services layer
        if _is_edge_zone(module) and name.startswith(ITS_SOLVER_ZONE):
            out.append(Violation(
                CODE_ROUTER_SOLVER, file, 0, module, name,
                "routers/api must reach the solver via backend.services.*, "
                "never import backend.its.solver.* directly"))
            continue

        # 4 — routers must not reach across to another edge module's
        #     internals (routers->routers, routers->api, api->routers).
        #     api->api helper sharing is a documented carve-out (see header).
        if not is_init and module.startswith(ROUTERS_ZONE) \
                and _is_edge_zone(name) and name != module:
            out.append(Violation(
                CODE_ROUTER_CROSS, file, 0, module, name,
                "router modules must not import another edge module's "
                "internals; wiring belongs in main.py / the package __init__ "
                "aggregator"))
            continue
        if not is_init and module.startswith(API_ZONE) \
                and name.startswith(ROUTERS_ZONE):
            out.append(Violation(
                CODE_ROUTER_CROSS, file, 0, module, name,
                "api modules must not import router internals; wiring "
                "belongs in main.py / the package __init__ aggregator"))
            continue
    return out


# --------------------------------------------------------------------------- #
# AST scan
# --------------------------------------------------------------------------- #
def collect_imports(tree: ast.AST) -> List[Tuple[str, int]]:
    """All absolute module names imported anywhere in the tree (function-level
    imports included), with line numbers."""
    found: List[Tuple[str, int]] = []
    for node in ast.walk(tree):
        if isinstance(node, ast.Import):
            for alias in node.names:
                found.append((alias.name, node.lineno))
        elif isinstance(node, ast.ImportFrom):
            # relative imports resolve against the importing module's package;
            # handled by the caller via module_to_import()
            if node.level == 0 and node.module:
                found.append((node.module, node.lineno))
    return found


def resolve_relative(module: str, is_init: bool, level: int, target: Optional[str]) -> Optional[str]:
    """Resolve a relative import (from .x import y) to an absolute module name.

    ``base`` ends up as the package the dots climb from: for a plain module
    that is its containing package; for an __init__ it is the package itself.
    Every further dot (level > 1) climbs one more package.
    """
    if level == 0:
        return target
    base = module.split(".")
    if not is_init and len(base) > 1:
        base = base[:-1]
    steps = level - 1
    if steps > 0:
        base = base[:-steps] if steps <= len(base) else []
    if target:
        return ".".join([*base, target]) if base else target
    return ".".join(base) if base else None


def scan_tree(
    pkg_root: Path,
    *,
    pkg_prefix: str = PKG_PREFIX,
    file_filter=None,
) -> Tuple[List[Violation], int]:
    """Scan every .py under pkg_root; return (violations, files_scanned)."""
    violations: List[Violation] = []
    scanned = 0
    py_files: List[Path] = []
    root_archive = (pkg_root / "_archive").resolve()
    for dirpath, dirnames, filenames in os.walk(pkg_root):
        here = Path(dirpath)
        dirnames[:] = [
            d for d in dirnames
            if d not in EXCLUDED_DIR_NAMES
            and (here / d).resolve() != root_archive
        ]
        for fn in filenames:
            if fn.endswith(".py"):
                py_files.append(here / fn)
    py_files.sort()
    for path in py_files:
        if file_filter and not file_filter(path):
            continue
        rel_display = str(path)
        module = module_name_for(path, pkg_root, pkg_prefix)
        is_init = path.name == "__init__.py"
        with warnings.catch_warnings():
            warnings.simplefilter("ignore")  # SyntaxWarning noise in archives
            try:
                # utf-8-sig strips a leading BOM (U+FEFF): several shipped
                # files carry one and Python's import machinery accepts them,
                # so flagging BOM files as syntax errors would be a false
                # positive.
                tree = ast.parse(path.read_text(encoding="utf-8-sig",
                                                errors="replace"),
                                 filename=str(path))
            except SyntaxError as exc:
                # a file that doesn't parse is reported under a pseudo-code so
                # it cannot hide silently
                violations.append(Violation(
                    "SYNTAX_ERROR", rel_display, exc.lineno or 0, module, "",
                    f"file does not parse: {exc.msg}"))
                scanned += 1
                continue
        scanned += 1

        raw = collect_imports(tree)
        names: List[str] = [n for n, _ in raw]
        lines: Dict[str, int] = {}
        for n, ln in raw:
            lines.setdefault(n, ln)

        # relative imports (from . import x / from .auth import y)
        for node in ast.walk(tree):
            if isinstance(node, ast.ImportFrom) and node.level > 0:
                resolved = resolve_relative(module, is_init, node.level, node.module)
                if resolved:
                    names.append(resolved)
                    lines.setdefault(resolved, node.lineno)

        for v in lint_imports(module, names, is_init=is_init, file=rel_display):
            violations.append(Violation(
                v.code, v.file, lines.get(v.imported, v.line), v.module,
                v.imported, v.rule))
    violations.sort(key=lambda v: (v.file, v.line, v.code, v.imported))
    return violations, scanned


def default_pkg_root() -> Path:
    """deploy/backend — two levels up from this file (harness/boundaries.py)."""
    return Path(__file__).resolve().parents[1]


# --------------------------------------------------------------------------- #
# CLI
# --------------------------------------------------------------------------- #
def main(argv: Optional[Sequence[str]] = None) -> int:
    p = argparse.ArgumentParser(
        prog="backend.harness.boundaries",
        description="Import-boundary lint (AI/legacy walls, services-only "
                    "solver reach, no router cross-imports).",
    )
    sub = p.add_subparsers(dest="cmd", required=True)
    ck = sub.add_parser("check", help="scan and exit 0/1")
    ck.add_argument("--root", default=None,
                    help="package root to scan (default: the backend dir "
                         "this file lives in)")
    ck.add_argument("--json", action="store_true",
                    help="emit findings as JSON instead of text")
    args = p.parse_args(argv)

    root = Path(args.root).resolve() if args.root else default_pkg_root()
    violations, scanned = scan_tree(root)

    if args.json:
        print(json.dumps({
            "root": str(root),
            "files_scanned": scanned,
            "violations": [
                {"code": v.code, "file": v.file, "line": v.line,
                 "module": v.module, "imported": v.imported, "rule": v.rule}
                for v in violations
            ],
        }, indent=2))
    else:
        print(f"boundaries check — root={root} files={scanned}")
        if violations:
            for v in violations:
                print(f"  [{v.code}] {v.file}:{v.line}  "
                      f"{v.module} -> {v.imported}")
            print(f"{len(violations)} violation(s) across "
                  f"{len({v.file for v in violations})} file(s)")
        else:
            print("OK — no boundary violations")

    return 1 if violations else 0


if __name__ == "__main__":
    raise SystemExit(main())
