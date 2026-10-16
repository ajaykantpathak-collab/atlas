"""route_auth_audit.py — enumerate every route with its auth posture and
flag (a) unauthenticated endpoints touching user/student data, (b) IDOR
shape: a path parameter that names an object (id) on a mutating/read
endpoint whose handler never references the current user.

Run INSIDE a backend container:  python /app/backend/tools/route_auth_audit.py
"""
import inspect
import re
import sys

sys.path.insert(0, "/app")

from fastapi.routing import APIRoute  # noqa: E402


def main():
    from backend.main import app  # noqa - imports the real app

    user_dep = re.compile(r"user", re.I)
    idor_shape = re.compile(r"\{(\w*id\w*)\}", re.I)
    public_ok = ("/health", "/ready", "/api/health", "/api/ready",
                 "/docs", "/openapi.json", "/redoc", "/")

    rows = []
    for r in app.routes:
        if not isinstance(r, APIRoute):
            continue
        path = r.path
        methods = ",".join(sorted(r.methods - {"HEAD", "OPTIONS"})) or "?"
        authed = any(user_dep.search(getattr(d, "__name__", ""))
                     for d in r.dependencies)
        if not authed and inspect.signature(r.endpoint).parameters:
            for p in inspect.signature(r.endpoint).parameters.values():
                ann = str(p.annotation)
                if "User" in ann or "get_current_user" in ann:
                    authed = True
                for dep in getattr(p, "metadata", []) or []:
                    pass
        # handler body: does it reference the user / ownership scoping?
        try:
            src = inspect.getsource(r.endpoint)
        except (OSError, TypeError):
            src = ""
        scopes_user = bool(re.search(
            r"user_id|user\.id|str\(user|_enforce_session_owner|"
            r"_load_owned_session|_require_session_owner|caller_sub|"
            r"_require_owner|owner_check|ensure_owner", src))
        has_path_id = bool(idor_shape.search(path))
        rows.append((methods, path, authed, scopes_user, has_path_id))

    unauth = [r for r in rows if not r[2] and not r[1].startswith(public_ok)]
    idor_risk = [r for r in rows if r[4] and not r[3] and r[0] != "GET"
                 and "auth" not in r[1].lower()]
    idor_get = [r for r in rows if r[4] and not r[3]
                and r[0] == "GET" and "auth" not in r[1].lower()]

    print(f"total routes: {len(rows)}")
    print(f"unauthenticated (non-public): {len(unauth)}")
    by_prefix = {}
    for m, p, a, s, i in unauth:
        pref = "/" + p.strip("/").split("/")[1 if p.count("/") > 1 else 0]
        by_prefix[pref] = by_prefix.get(pref, 0) + 1
    for k, v in sorted(by_prefix.items(), key=lambda kv: -kv[1])[:15]:
        print(f"  {v:>3}  {k}")
    print("\nIDOR-SHAPE mutators (path id, no user scoping in handler):")
    for m, p, a, s, i in idor_risk[:20]:
        print(f"  {m:<6} {p}")
    print("\nIDOR-SHAPE reads:")
    for m, p, a, s, i in idor_get[:20]:
        print(f"  {m:<6} {p}")


if __name__ == "__main__":
    main()
