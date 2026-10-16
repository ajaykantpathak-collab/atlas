"""MISSING-FROM-DEPLOY diff — repo files absent from the deploy tree.
Read-only: reports counts + paths, writes MISSING_FROM_DEPLOY.txt."""
import os

SKIP_DIRS = {"node_modules", ".next", "__pycache__", ".git", "_archive",
             "_trash", ".venv", "venv", ".pytest_cache", "c6_12_chem_backups",
             "_authoring", "md_backup", "_shots", "_shots_authed", "_audit_artifacts"}
SKIP_FILES = {".env", ".env.local", "package-lock.json"}
SKIP_EXT = (".tsbuildinfo", ".log")

pairs = [("backend", "deploy/backend"),
         ("frontend", "deploy/frontend"),
         ("content", "deploy/content")]

report = []
total = 0
for src, dst in pairs:
    src_p, dst_p = os.path.join(r"D:\platform", src), os.path.join(r"D:\platform", dst)
    missing = []
    for dp, dns, fns in os.walk(src_p):
        dns[:] = [d for d in dns if d not in SKIP_DIRS]
        rel_dp = os.path.relpath(dp, src_p)
        dst_dp = os.path.join(dst_p, rel_dp)
        for f in fns:
            if f in SKIP_FILES or f.endswith(SKIP_EXT):
                continue
            rel = os.path.normpath(os.path.join(rel_dp, f))
            df = os.path.join(dst_p, rel_dp, f)
            if not os.path.isfile(df):
                missing.append(os.path.join(src, rel).replace("\\", "/"))
            elif os.path.getsize(df) != os.path.getsize(os.path.join(dp, f)):
                missing.append(os.path.join(src, rel).replace("\\", "/") + "  [SIZE-DIFF]")
    if missing:
        report.append((src, missing))
        total += len(missing)

out = [f"# MISSING FROM DEPLOY — {total} files", ""]
for src, missing in report:
    out.append(f"## {src}/ ({len(missing)} missing)")
    out += [f"- {m}" for m in missing[:200]]
    if len(missing) > 200:
        out.append(f"- …+{len(missing)-200} more")
    out.append("")
open(os.path.join(r"D:\platform", "MISSING_FROM_DEPLOY.txt"), "w", encoding="utf-8").write("\n".join(out))
print(f"TOTAL missing/differing: {total}")
for src, missing in report:
    print(f"  {src}: {len(missing)}")
