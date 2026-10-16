import sqlite3,sys,os,traceback
sys.path.insert(0,r"D:\platform")
os.environ.setdefault("SOLVER_LLM_MODE","off")
con=sqlite3.connect(r"D:\platform\cbse_data\question_bank.db"); cur=con.cursor()
rows=cur.execute("""SELECT q.text,o.letter,o.answer_text FROM questions q
 JOIN official_answers o ON o.doc_id=q.doc_id AND o.qno=q.qno
 WHERE q.q_type=\"MCQ\" AND length(q.text)>25 LIMIT 12""").fetchall()
print("sampled MCQs:",len(rows))
try:
    from backend.its.solver.answer_pipeline import answer
    print("pipeline imported OK")
except Exception as e:
    print("IMPORT FAIL:",e); traceback.print_exc(); sys.exit(0)
ok=decl=wrong=err=0
for i,(qt,letter,atext) in enumerate(rows):
    try:
        r=answer(qt)
        tier=getattr(r,"tier",None) or getattr(r,"status",None)
        ans=getattr(r,"answer",None)
        print("\n[%d] Q: %s" % (i, (qt or "")[:100].replace(chr(10)," ")))
        print("    OFFICIAL=%s | tier=%s | ans=%r" % (letter,tier,(str(ans)[:70] if ans is not None else None)))
        if ans is None: decl+=1
        else: ok+=1
    except Exception as e:
        err+=1; print("\n[%d] ERROR %s" % (i,e))
print("\n--- SUMMARY ---")
print("returned an answer : %d" % ok)
print("declined/None      : %d" % decl)
print("errors             : %d" % err)