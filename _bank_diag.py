import sys
import traceback
sys.path.insert(0, "/app")

from backend.its.solver import bank_answer as ba

q = ('Explain in your own words what the hawk means by '
     '"There is no sophistry in my body" and why this statement is justified.')

print("normalize:", ba.normalize(q)[:80])
try:
    eng = ba._engine()
    print("engine OK:", type(eng).__name__)
    from sqlalchemy import text
    with eng.connect() as cx:
        row = cx.execute(text(
            "SELECT count(*) FROM board_questions WHERE board='CBSE' "
            "AND norm_text = :nk"), {"nk": ba.normalize(q)}).fetchone()
        print("exact-norm rows:", row[0])
except Exception:
    traceback.print_exc()

hit = ba.lookup(q)
print("lookup:", "HIT" if hit else "MISS")
print("last_error:", ba._STATE.get("last_error"))
