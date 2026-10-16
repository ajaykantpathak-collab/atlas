import sys
sys.path.insert(0, "/app")
from backend.its.solver.bank_answer import lookup, normalize
from backend.database import get_sync_engine
from sqlalchemy import text

q = ('Explain in your own words what the hawk means by '
     '"There is no sophistry in my body" and why this statement is justified.')
nk = normalize(q)
print("norm:", nk[:90])
eng = get_sync_engine()
with eng.connect() as cx:
    rows = cx.execute(text(
        "SELECT id, left(question_text,80) AS q, similarity(norm_text, :nk) AS sim "
        "FROM board_questions WHERE board='CBSE' AND norm_text % :nk "
        "ORDER BY sim DESC LIMIT 3"), {"nk": nk}).fetchall()
for r in rows:
    print(f"sim={r.sim:.3f} | {r.q}")
h = lookup(q)
print("lookup anchor:", h and h["anchor"])
print("lookup answer:", h and str(h["answer"])[:80])
