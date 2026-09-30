#!/usr/bin/env python3
"""
Static route audit for the Next.js app (ATLAS_10x10_PLAN.md, route-sprawl item).

Catches, without booting the app:
  1. Internal links pointing at routes that do not exist  -> dead nav links.
  2. Pages no link ever reaches                          -> orphan routes.
  3. Route groups / dynamic segments, reported separately so they are not
     mistaken for breakage.

This is deliberately static: booting the stack (and the crawl that would
normally catch a broken sidebar link) is Docker work, and per the sequencing
rule Docker comes last.

Usage:  python scripts/audit_routes.py [--json]
Exit code 1 if any dead link is found.
"""

from __future__ import annotations

import json
import pathlib
import re
import sys

FRONTEND = pathlib.Path(__file__).resolve().parent.parent / "frontend"
APP = FRONTEND / "app"

# Route groups: (student) is not part of the URL. NOT anchored — a group can
# appear in any segment, e.g. premium/(student)/learn -> /premium/learn.
GROUP = re.compile(r"/\([^)]+\)")
# Navigation forms only. `router.push`/`router.replace` are required to be
# qualified on purpose: a bare `replace(` alternative matched plain
# String.replace calls like `bgColor.replace('/15', 'bg-mint-500/15')` and
# reported Tailwind opacity classes as dead routes.
HREF = re.compile(
    r"""(?:href\s*=\s*["'{`]\s*"""
    r"""|href\s*:\s*["'`]\s*"""
    r"""|router\.(?:push|replace)\(\s*["'`]\s*)"""
    r"""(/[A-Za-z0-9_./\[\]\-]*)"""
)
DYNAMIC = re.compile(r"\[")

# Paths that are served by the backend or are assets, not app routes.
EXTERNAL_PREFIXES = ("/api/", "/_next/", "/public/", "/static/")


def _norm(path: str) -> str:
    """Normalise a filesystem-ish route path to a URL path.

    Two traps this handles:
      * Windows separators: `(student)\\learn` must become `/learn`, not
        `\\learn` — otherwise every grouped route looks like a broken link.
      * the app root, whose relative path is `.`, must be `/` and not `/.`.
    """
    raw = str(path).replace("\\", "/").strip()
    if raw in (".", "", "/"):
        return "/"
    route = "/" + raw.strip("/")
    while True:  # strip route groups, possibly nested: /(a)/(b)/x
        stripped = GROUP.sub("", route, count=1)
        if stripped == route:
            break
        route = stripped
    return route.rstrip("/") or "/"


def app_routes() -> set[str]:
    routes: set[str] = set()
    for page in APP.rglob("page.tsx"):
        rel = page.parent.relative_to(APP)
        routes.add(_norm(str(rel)))
    return routes


def scanned_files() -> list[pathlib.Path]:
    files: list[pathlib.Path] = []
    for sub in ("app", "components", "lib", "services", "hooks", "stores"):
        root = FRONTEND / sub
        if root.is_dir():
            files.extend(root.rglob("*.tsx"))
            files.extend(root.rglob("*.ts"))
    return files


def links_to() -> dict[str, list[str]]:
    """Map target route -> source files that link to it."""
    out: dict[str, list[str]] = {}
    for path in scanned_files():
        try:
            text = path.read_text(encoding="utf-8", errors="ignore")
        except OSError:
            continue
        for raw in HREF.findall(text):
            if raw.startswith(EXTERNAL_PREFIXES):
                continue
            target = _norm(raw)
            out.setdefault(target, []).append(
                str(path.relative_to(FRONTEND)).replace("\\", "/")
            )
    return out


def _is_referenced(route: str, targets: set[str]) -> bool:
    """Is this page reachable from a link?

    A dynamic page is reached through its parent pattern: `/learn/${id}` is
    captured as `/learn/`, so `/learn/[topicId]` must count as referenced.
    Without the prefix rule every dynamic route reads as an orphan.
    """
    if route in targets:
        return True
    stem = route.rstrip("/")
    return any(t != "/" and stem.startswith(t.rstrip("/") + "/") for t in targets)


def main() -> int:
    routes = app_routes()
    targets = links_to()

    dynamic = sorted(t for t in targets if DYNAMIC.search(t))
    dead = {
        t: sorted(set(srcs))
        for t, srcs in targets.items()
        if t not in routes and not DYNAMIC.search(t)
    }
    referenced = set(targets)
    orphans = sorted(
        r for r in routes if r != "/" and r != "/login" and not _is_referenced(r, referenced)
    )

    if "--json" in sys.argv:
        print(json.dumps({
            "routes": len(routes),
            "dead_links": dead,
            "dynamic_targets": dynamic,
            "orphan_routes": orphans,
        }, indent=2))
    else:
        print(f"routes:            {len(routes)}")
        print(f"link targets:      {len(targets)}")
        print(f"dynamic targets:   {len(dynamic)}  (checked at runtime, not statically)")
        print(f"DEAD LINKS:        {len(dead)}")
        for target, srcs in sorted(dead.items()):
            print(f"  {target}")
            for src in srcs[:3]:
                print(f"      <- {src}")
        print(f"unreferenced pages:{len(orphans)}")
        for route in orphans:
            print(f"  {route}")

    return 1 if dead else 0


if __name__ == "__main__":
    raise SystemExit(main())
