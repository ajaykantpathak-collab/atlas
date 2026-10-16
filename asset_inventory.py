"""INVENTORY + PROVENANCE — verify every world-class asset exists, and
determine the marking steps' board provenance (CBSE vs CISCE)."""
import os, json, sqlite3, glob

ROOT = r"D:\platform"
ok, bad = [], []

def chk(path, min_size=0, label=None):
    p = os.path.join(ROOT, path)
    if os.path.isfile(p) and os.path.getsize(p) >= min_size:
        ok.append((label or path, os.path.getsize(p)))
        return True
    bad.append(f"MISSING/small: {path}")
    return False

def chk_dir(path, pattern="*", min_count=1, label=None):
    files = glob.glob(os.path.join(ROOT, path, pattern))
    n = len(files)
    if n >= min_count:
        ok.append((label or f"{path} ({n} files)", 0))
        return files
    bad.append(f"MISSING/thin: {path} -> {n} files (expected >= {min_count})")
    return []

print("=== 1. question bank + marking steps provenance ===")
chk("cbse_data/question_bank.db", 1000000)
con = sqlite3.connect(os.path.join(ROOT, "cbse_data", "question_bank.db"))
cur = con.cursor()
tables = [r[0] for r in cur.execute("select name from sqlite_master where type='table'")]
print("tables:", tables)
for t in ("documents", "questions", "marking_steps"):
    if t in tables:
        print(f"  {t}: {cur.execute(f'select count(*) from {t}').fetchone()[0]} rows")
        cols = [c[1] for c in cur.execute(f"PRAGMA table_info({t})")]
        print("  cols:", cols[:10])
# provenance: where did documents come from
if "documents" in tables:
    cols = [c[1] for c in cur.execute("PRAGMA table_info(documents)")]
    src_col = next((c for c in cols if c in ("source", "source_file", "path", "board", "file")), None)
    if src_col:
        rows = cur.execute(f"select {src_col} from documents limit 8").fetchall()
        print("  document sources sample:", [r[0][:60] if r[0] else None for r in rows])
con.close()

print("=== 2. deploy copy of the bank ===")
chk("deploy/cbse_data/question_bank.db", 1000000)

print("=== 3. AI retrieval stack ===")
for f in ("backend/ai/_question_embeddings.npy", "backend/ai/_question_index.json",
          "backend/ai/_question_bank_cache.json"):
    chk(f, 100000)
print("qdrant container: up (verified earlier)")

print("=== 4. diagram specs ===")
chk("cbse_data/content/diagrams/diagrams_index.json", 10000)
try:
    d = json.load(open(os.path.join(ROOT, "cbse_data/content/diagrams/diagrams_index.json"), encoding="utf-8"))
    items = d if isinstance(d, list) else d.get("diagrams") or d.get("items") or list(d.values())
    print("  diagram entries:", len(items))
    imgs = 0
    for i in items[:400]:
        if isinstance(i, dict):
            for k in ("image", "img", "svg", "file", "path"):
                if i.get(k) and os.path.isfile(os.path.join(ROOT, "cbse_data/content/diagrams", str(i[k]))):
                    imgs += 1
                    break
    print("  referenced image files exist (sample 400):", imgs)
except Exception as e:
    print("  diagram index read:", e)

print("=== 5. diagnostics + misconceptions jsonl ===")
for f, n in (("parsed_output/diagnostics.jsonl", 4000), ("parsed_output/misconceptions.jsonl", 7000)):
    p = os.path.join(ROOT, f)
    if os.path.isfile(p):
        c = sum(1 for _ in open(p, encoding="utf-8", errors="ignore"))
        ok.append((f"{f} ({c} lines)", os.path.getsize(p)))
    else:
        bad.append(f"MISSING: {f}")

print("=== 6. study packs ===")
sp = os.path.join(ROOT, "parsed_output", "cbse_supporting_files_topicwise")
if os.path.isdir(sp):
    n = sum(len(fs) for _, _, fs in os.walk(sp))
    ok.append((f"study packs ({n} files)", 0))
else:
    bad.append(f"MISSING dir: parsed_output/cbse_supporting_files_topicwise")
print("=== 7. cross-board maps ===")
chk("cbse_data/cross_board/mappings", 0)
print("=== 8. orphan sims + quality ===")
print("  sims_v2 files:", len(glob.glob(os.path.join(ROOT, "frontend/components/sims_v2/**", "*.tsx"), recursive=True)))
chk("frontend/components/sims_v2/SIMS_V2_QUALITY.json", 100)

print()
print(f"OK: {len(ok)}  ISSUES: {len(bad)}")
for b in bad:
    print("⚠", b[:150])
