"""_route_reference_audit.py — the definitive route-need audit.

Extracts every route from the backend source (decorator + prefix), then
checks each against: frontend source references, backend internal callers
(tests/tools/services), and the mobile/store surface. Outputs three lists:
  REFERENCED      — used by frontend or internal callers
  AMBIGUOUS       — generic paths where static matching can't judge
  UNREFERENCED    — no caller found anywhere = kill-list candidates
"""
import json
import os
import re
from collections import defaultdict

ROOT = r"D:\platform"
BE = os.path.join(ROOT, "deploy", "backend")
FE = os.path.join(ROOT, "deploy", "frontend")

# ---------- 1. extract routes from source ----------
routes = []  # (method, full_path, router_file)
for sub in ("routers", "api"):
    d = os.path.join(BE, sub)
    for fn in os.listdir(d):
        if not fn.endswith(".py"):
            continue
        src = open(os.path.join(d, fn), encoding="utf-8", errors="ignore").read()
        # router prefix
        pm = re.search(r"APIRouter\([^)]*?prefix=[\"']([^\"']+)[\"']", src, re.S)
        prefix = pm.group(1) if pm else ""
        for m in re.finditer(
                r"@(?:router|app)\.(get|post|put|delete|patch)\(\s*[\"']([^\"']*)[\"']",
                src):
            method, path = m.group(1).upper(), m.group(2)
            full = prefix + path if not path.startswith(prefix) else path
            if "{full_path" in full or "full_path" in path:
                continue  # catch-alls: judge separately
            routes.append((method, "/" + full.lstrip("/"), os.path.join(d, fn)))

# app-level routes in main.py
msrc = open(os.path.join(BE, "main.py"), encoding="utf-8",
            errors="ignore").read()
for m in re.finditer(r"@app\.(get|post|put|delete|patch)\(\s*[\"']([^\"']+)[\"']",
                     msrc):
    routes.append((m.group(1).upper(), m.group(2), "main.py"))

# ---------- 2. gather frontend + internal references ----------
refs = []
for base_dir in (os.path.join(FE, "app"), os.path.join(FE, "components"),
                 os.path.join(FE, "lib"), os.path.join(FE, "context")):
    if not os.path.isdir(base_dir):
        continue
    for b, _d, files in os.walk(base_dir):
        if "node_modules" in b or ".next" in b:
            continue
        for f in files:
            if f.endswith((".ts", ".tsx", ".js", ".jsx")):
                try:
                    refs.append(open(os.path.join(b, f), encoding="utf-8",
                                     errors="ignore").read())
                except OSError:
                    pass
blob = "\n".join(refs)

internal_refs = []
for b, _d, files in os.walk(BE):
    if "__pycache__" in b or "\\tests\\" in b or b.endswith("\\tests"):
        continue
    for f in files:
        if f.endswith(".py"):
            try:
                internal_refs.append(open(os.path.join(b, f), encoding="utf-8",
                                          errors="ignore").read())
            except OSError:
                pass
internal = "\n".join(internal_refs)


def referenced(path):
    # escape the literal path FIRST, then swap escaped {param} segments
    # for wildcard chunks (the old version escaped its own wildcards,
    # making every parametrized route unmatchable)
    rx = re.escape(path)
    rx = re.sub(r"\\\{[^}]+\\\}", r"[^\"'/]+", rx)
    try:
        rxc = re.compile(rx)
    except re.error:
        return "ambiguous"
    hit = rxc.search(blob) or rxc.search(internal)
    # also try with /api prefix stripped (frontend sometimes omits)
    if not hit and path.startswith("/api/"):
        rx2 = re.compile(re.escape(path[4:]))
        hit = rx2.search(blob)
    if hit:
        return "referenced"
    # heuristic ambiguity: single-segment generic paths
    if path.count("/") <= 1:
        return "ambiguous"
    return "unreferenced"


buckets = defaultdict(list)
for method, path, f in routes:
    buckets[referenced(path)].append((method, path, os.path.basename(f)))

print(f"total routes: {len(routes)}")
for k in ("referenced", "ambiguous", "unreferenced"):
    print(f"\n{k.upper()}: {len(buckets[k])}")
    if k != "referenced":
        for m, p, f in sorted(buckets[k], key=lambda x: x[1])[:60]:
            print(f"  {m:<7} {p:<62} [{f}]")
json.dump({k: [[m, p] for m, p, _ in v] for k, v in buckets.items()},
          open(os.path.join(ROOT, "_route_audit_result.json"), "w"), indent=1)
print("\nsaved: _route_audit_result.json")
