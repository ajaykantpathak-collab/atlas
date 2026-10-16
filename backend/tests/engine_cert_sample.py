"""ENGINE-CERT sample builder — the stratified 200-question bank sample.

20 subject/class pairs x 10 rows each, drawn from `board_questions`
(rows with a board answer key, question_text > 20 chars).  The order is
a fixed md5(id) permutation -> pseudo-random but REPRODUCIBLE across
processes, so the clean run and the poisoned run solve byte-identical
question lists.

Writes: tests/_engine_cert_sample.json
"""

import json
import os
import sys

sys.path.insert(0, r"D:\platform\deploy")

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                   "_engine_cert_sample.json")

# 20 pairs, verified to each hold >= 10 key-carrying rows (2026-10-03).
PAIRS = [
    ("math", 10), ("phy", 11), ("chem", 11), ("bio", 10), ("cs", 11),
    ("engl", 10), ("hist", 10), ("civ", 9), ("geo", 10), ("eco", 10),
    ("acc", 11), ("bs", 11), ("biotech", 11), ("psy", 11), ("leg", 11),
    ("soc", 11), ("ip", 11), ("stat", 11), ("hin_a", 11), ("eng_k", 12),
]

# The 10 subjects CERT 2 times (first 10 of the sample order).
LATENCY_PAIRS = PAIRS[:10]


def build() -> None:
    import psycopg2
    pw = [l.strip().split("=", 1)[1]
          for l in open(r"D:\platform\deploy\.env", encoding="utf-8")
          if l.startswith("POSTGRES_PASSWORD=")][0]
    conn = psycopg2.connect(host="127.0.0.1", port=5432, dbname="dream_app",
                            user="dream_user", password=pw)
    cur = conn.cursor()
    sample = []
    for subj, cls in PAIRS:
        cur.execute(
            "SELECT id, question_text FROM board_questions "
            "WHERE subject=%s AND class_level=%s "
            "AND correct_answer IS NOT NULL AND correct_answer <> '' "
            "AND length(question_text) > 20 "
            "ORDER BY md5(id::text) LIMIT 10", (subj, cls))
        rows = cur.fetchall()
        assert len(rows) == 10, f"{subj} {cls}: only {len(rows)} rows"
        for qid, qt in rows:
            sample.append({"qid": str(qid), "subject": subj,
                           "class_level": cls, "question": qt})
    conn.close()
    json.dump({"pairs": PAIRS, "latency_pairs": LATENCY_PAIRS,
               "questions": sample},
              open(OUT, "w", encoding="utf-8"), ensure_ascii=True,
              indent=0)
    print(f"wrote {len(sample)} questions -> {OUT}")


if __name__ == "__main__":
    build()
