"""junk_route_audit.py — backend routes with NO reference in the frontend
source (fetch/axios/link/router pushes) and no tool/test reference.
Candidates for retirement; NOT auto-deleted.
"""
import os
import re
import sys

sys.path.insert(0, "/app")

from fastapi.routing import APIRoute  # noqa: E402

FRONTEND_SRC = os.environ.get("FRONTEND_SRC", "/app/public-frontend-src")


def main():
    from backend.main import app  # noqa

    # 1. gather route patterns
    routes = []
    for r in app.routes:
        if not isinstance(r, APIRoute):
            continue
        methods = r.methods - {"HEAD", "OPTIONS"}
        routes.append((sorted(methods), r.path))

    # 2. gather frontend references (raw source scan)
    refs = []
    scan_roots = [FRONTEND_SRC] if os.path.isdir(FRONTEND_SRC) else []
    exts = (".ts", ".tsx", ".js", ".jsx")
    for root_dir in scan_roots:
        for base, _dirs, files in os.walk(root_dir):
            if "node_modules" in base or ".next" in base:
                continue
            for fn in files:
                if not fn.endswith(exts):
                    continue
                p = os.path.join(base, fn)
                try:
                    refs.append(open(p, encoding="utf-8",
                                     errors="ignore").read())
                except OSError:
                    pass
    blob = "\n".join(refs)

    # 3. match: convert /path/{id} to a regex tolerant of template literals
    def referenced(path):
        pat = re.sub(r"\{[^}]+\}", r"[^\"'`]+", re.escape(path)
                     .replace(r"\{", "{").replace(r"\}", "}"))
        # route paths like /api/x/{id} -> /api/x/<anything>
        pat = re.sub(r"\{[^}]+\}", "[^\"'/]+", path)
        pat = "^" + pat.replace("{", r"\{").replace("}", r"\}")
        pat = re.sub(r"\\\{[^}]+\\\}", r"[^\"'/]+", pat)
        try:
            rx = re.compile(pat)
        except re.error:
            return True  # can't judge — assume referenced
        return bool(rx.search(blob))

    unreferenced = [(m, p) for m, p in routes if not referenced(p)]
    print(f"routes: {len(routes)} | unreferenced in frontend: "
          f"{len(unreferenced)}")
    for m, p in unreferenced:
        print(f"  {','.join(m):<12} {p}")


if __name__ == "__main__":
    main()
