import sys
sys.path.insert(0, "/app")

from backend.its.solver.bank_answer import normalize
from backend.database import get_sync_engine
from sqlalchemy import text

eng = get_sync_engine()
with eng.connect() as cx:
    row = cx.execute(text(
        "SELECT norm_text FROM board_questions WHERE id = "
        "'480f51a3-cc14-4488-87d5-555b08f5ce72'")).fetchone()
db_n = row.norm_text if row else None
py_n = normalize(
    'Explain in your own words what the hawk means by '
    '"There is no sophistry in my body" and why this statement is justified.')
print("db:", repr(db_n[:100]))
print("py:", repr(py_n[:100]))
print("equal:", db_n == py_n)
if db_n and db_n != py_n:
    for i, (a, b) in enumerate(zip(db_n, py_n)):
        if a != b:
            print(f"diverge@{i}: db={db_n[max(0,i-20):i+20]!r} py={py_n[max(0,i-20):i+20]!r}")
            break
    print("lens:", len(db_n), len(py_n))
