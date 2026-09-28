"""Join question_bank.db (sqlite) answers onto Postgres board_questions.

Matches questions by token-set fingerprint: builds an inverted index of
sqlite question tokens, shortlists candidates per PG row, verifies with
>=0.65 token overlap, then copies marking steps + official answers.
"""
import asyncio
import re
import sqlite3
from collections import defaultdict

from sqlalchemy import select

from backend.database import async_session
from backend.models import BoardQuestion

SQLITE = "/data/question_bank.db"
MIN_OVERLAP = 0.65


def norm(t: str) -> set[str]:
    return {w for w in re.sub(r"[^a-z0-9 ]", " ", t.lower()).split() if len(w) > 2}


def overlap(a: set, b: set) -> float:
    if not a or not b:
        return 0.0
    small, big = (a, b) if len(a) <= len(b) else (b, a)
    return len(small & big) / len(small)


def load_sqlite():
    c = sqlite3.connect(SQLITE)
    questions = {}          # qid -> token set
    q_doc = {}              # qid -> doc_id
    for qid, doc, qno, text in c.execute(
            "select id, doc_id, qno, text from questions"):
        questions[qid] = norm(text or "")
        q_doc[qid] = (doc, qno)
    steps = defaultdict(list)
    for doc, qno, sno, text in c.execute(
            "select doc_id, qno, step_no, text from marking_steps order by step_no"):
        steps[(doc, qno)].append(text)
    answers = {}
    for doc, qno, letter, ans in c.execute(
            "select doc_id, qno, letter, answer_text from official_answers"):
        answers[(doc, qno)] = f"{letter} {ans}" if letter else ans
    # inverted index: token -> qids (keep only tokens in <5% of questions)
    inv = defaultdict(list)
    for qid, toks in questions.items():
        for t in toks:
            inv[t].append(qid)
    inv = {t: ids for t, ids in inv.items() if len(ids) <= 3000}
    return questions, q_doc, steps, answers, inv


async def main():
    questions, q_doc, steps, answers, inv = load_sqlite()
    print(f"sqlite: {len(questions)} questions, {len(steps)} step groups, "
          f"{len(answers)} official answers")

    async with async_session() as db:
        rows = (await db.execute(select(BoardQuestion).where(
            BoardQuestion.model_answer.is_(None)))).scalars().all()
        print(f"pg rows needing answers: {len(rows)}")

        matched = 0
        for row in rows:
            toks = norm(row.question_text or "")
            if len(toks) < 4:
                continue
            # shortlist: qids sharing the row's rarest tokens
            cand = defaultdict(int)
            for t in toks:
                for qid in inv.get(t, ()):
                    cand[qid] += 1
            if not cand:
                continue
            best, best_s = None, 0.0
            for qid, _ in sorted(cand.items(), key=lambda x: -x[1])[:60]:
                s = overlap(toks, questions[qid])
                if s > best_s:
                    best, best_s = qid, s
            if best is None or best_s < MIN_OVERLAP:
                continue
            key = q_doc[best]
            if key in steps:
                row.model_answer = "\n".join(steps[key])[:4000]
                if not row.marking_scheme:
                    row.marking_scheme = "\n".join(
                        f"Step {i+1}: {t}" for i, t in enumerate(steps[key]))[:2000]
            if key in answers and not row.correct_answer:
                row.correct_answer = answers[key][:2000]
            if row.model_answer or row.correct_answer:
                matched += 1
            if matched % 2000 == 0 and matched:
                print(f"  matched {matched}...")
                await db.commit()
        await db.commit()
        print(f"done: {matched} rows updated")


if __name__ == "__main__":
    asyncio.run(main())
