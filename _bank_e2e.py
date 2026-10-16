import json
import sys
import urllib.request

sys.path.insert(0, "/app")
from backend.database import get_sync_engine
from sqlalchemy import text

eng = get_sync_engine()
with eng.connect() as cx:
    q = cx.execute(text(
        "SELECT question_text FROM board_questions WHERE board='CBSE' "
        "AND subject='eng_w' AND length(question_text) BETWEEN 80 AND 220 "
        "AND length(coalesce(model_answer,''))>30 ORDER BY random() "
        "LIMIT 1")).scalar()

body = json.dumps({"text": q}).encode()
req = urllib.request.Request(
    "http://localhost:8001/api/practice/deterministic/solve",
    data=body, headers={"Content-Type": "application/json"})
d = json.loads(urllib.request.urlopen(req, timeout=90).read())
print("tier:", d["tier"], "| anchor:", d["audit"].get("anchor"))
print("answer:", str(d.get("answer"))[:90])
