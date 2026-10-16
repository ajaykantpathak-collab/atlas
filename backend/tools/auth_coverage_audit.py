"""tools/auth_coverage_audit.py -- scan all registered routes and report
which mutating endpoints (POST/PUT/PATCH/DELETE) lack auth dependencies.

Run: python -m tools.auth_coverage_audit
Output: a table of routes without auth, sorted by risk.

An endpoint "has auth" if its dependency graph includes any of:
  - get_current_user / require_role / require_self_or_staff
  - _caller_sub / _opt_bearer (soft auth — session ownership enforcement)
  - HTTPBearer / HTTPAuthorizationCredentials

An endpoint "lacks auth" if none of these appear in its dependency
chain AND it mutates state (POST/PUT/PATCH/DELETE).
"""
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(
    os.path.abspath(__file__)))))
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

AUTH_MARKERS = frozenset({
    "get_current_user", "require_role", "require_self_or_staff",
    "_caller_sub", "_opt_bearer", "HTTPBearer",
    "HTTPAuthorizationCredentials", "get_current_active_user",
    "get_current_user_or_guest", "_require_staff", "get_current_user_optional",
})

MUTATING = {"POST", "PUT", "PATCH", "DELETE"}


def _collect_deps(route) -> set:
    """Collect auth-marker names from a route's dependency graph."""
    deps = set()
    for dep in getattr(route, "dependant", None) and route.dependant.dependencies or []:
        dep_name = getattr(dep.call, "__name__", "") if dep.call else ""
        deps.add(dep_name)
        # recurse into nested dependencies
        for sub in getattr(dep, "dependencies", []):
            sub_name = getattr(sub.call, "__name__", "") if sub.call else ""
            deps.add(sub_name)
    return deps


def audit():
    from backend.main import app

    unauth_mutating = []
    total_mutating = 0
    total_authed = 0
    total_routes = 0

    for route in app.routes:
        if not hasattr(route, "methods") or not hasattr(route, "path"):
            continue
        for method in sorted(route.methods):
            if method in ("HEAD", "OPTIONS", "GET"):
                continue
            total_routes += 1
            if method not in MUTATING:
                continue
            total_mutating += 1
            deps = set()
            for dep in getattr(route, "dependant", None) and route.dependant.dependencies or []:
                dn = getattr(dep.call, "__name__", "") if dep.call else ""
                deps.add(dn)
                for sub in getattr(dep, "dependencies", []):
                    deps.add(getattr(sub.call, "__name__", "") if sub.call else "")

            has_auth = bool(deps & AUTH_MARKERS)
            if has_auth:
                total_authed += 1
            else:
                unauth_mutating.append({
                    "method": method,
                    "path": route.path,
                    "name": getattr(route, "name", "") or "",
                    "deps": sorted(deps),
                })

    return {
        "total_routes": total_routes,
        "total_mutating": total_mutating,
        "total_authed": total_authed,
        "unauth_mutating": unauth_mutating,
        "auth_coverage_pct": (
            round(100 * total_authed / total_mutating, 1)
            if total_mutating else 100.0
        ),
    }


if __name__ == "__main__":
    result = audit()
    import json
    print(json.dumps(result, indent=2))
    unauth = result["unauth_mutating"]
    if unauth:
        print(f"\n=== {len(unauth)} UNAUTHENTICATED MUTATING ENDPOINTS ===")
        for r in unauth:
            print(f"  {r['method']:6s} {r['path']:60s} deps={r['deps']}")
    print(f"\nAuth coverage: {result['auth_coverage_pct']}% of "
          f"{result['total_mutating']} mutating endpoints")
