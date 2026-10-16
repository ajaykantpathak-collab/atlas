import sqlite3
con=sqlite3.connect(r"D:\platform\cbse_data\question_bank.db"); cur=con.cursor()
print("=== sample joined (question + official answer) ===")
rows=cur.execute("""SELECT q.doc_id,q.qno,q.q_type,q.text,o.letter,o.answer_text
 FROM questions q JOIN official_answers o ON o.doc_id=q.doc_id AND o.qno=q.qno
 LIMIT 4""").fetchall()
for r in rows:
    print("-",r[2], "| Q:", (r[3] or "")[:110].replace(chr(10)," "))
    print("   OFFICIAL:", repr(r[4]), (r[5] or "")[:110].replace(chr(10)," "))
print()
print("MCQ with official answer:", cur.execute("SELECT COUNT(*) FROM questions q JOIN official_answers o ON o.doc_id=q.doc_id AND o.qno=q.qno WHERE q.q_type=\"MCQ\"").fetchone()[0])
print("NUMERICAL with official answer:", cur.execute("SELECT COUNT(*) FROM questions q JOIN official_answers o ON o.doc_id=q.doc_id AND o.qno=q.qno WHERE q.q_type=\"NUMERICAL\"").fetchone()[0])
print("total q+official pairs:", cur.execute("SELECT COUNT(*) FROM questions q JOIN official_answers o ON o.doc_id=q.doc_id AND o.qno=q.qno").fetchone()[0])
print("total q+marking_steps pairs:", cur.execute("SELECT COUNT(DISTINCT q.doc_id||q.qno) FROM questions q JOIN marking_steps m ON m.doc_id=q.doc_id AND m.qno=q.qno").fetchone()[0])