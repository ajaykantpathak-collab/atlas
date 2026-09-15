"""Seed the exam-simulator and quiz banks from the board_questions bank.

Builds, deterministically and idempotently, from ``board_questions``
grouped by (class_level, subject) for classes 6-12:

1. ``exams`` + ``exam_sections`` — one published exam per (class, subject)
   with 15-20 questions pulled from the bank. Correct answers, options,
   marks, topics and linked knowledge nodes are preserved on each embedded
   question so the grader (AssessmentService.submit_exam) can score it.
2. ``quiz_questions`` — board questions attached to knowledge nodes of the
   same (class, subject), up to 5 per node. Only answerable questions
   (correct_answer / model_answer present) are used so the quiz grader can
   compare answers.

Usage:
    set PLATFORM_DATABASE_URL=sqlite+aiosqlite:///<repo>/backend_local.db
    python -m backend.tools.seed_exam_banks

The rows this script manages are identified by the ``bq-c<class>-<subject>``
exam_id prefix (exams) and by node_ids of classes 6-12 (quiz questions), so
re-running refreshes them without touching any other data.
"""

from __future__ import annotations

import json
import os
import sqlite3
import sys
import uuid

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(
    os.path.abspath(__file__)))))

from backend.utils.question_text import is_merged_record, strip_pipeline_markers

_REPO_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(
    os.path.abspath(__file__))))
DEFAULT_SQLITE_URL = "sqlite+aiosqlite:///" + os.path.join(
    _REPO_ROOT, "backend_local.db").replace("\\", "/")

MIN_CLASS, MAX_CLASS = 6, 12
EXAM_MIN_QUESTIONS = 15
EXAM_MAX_QUESTIONS = 20
QUIZ_PER_NODE = 5
EXAM_ID_PREFIX = "bq-"
CBSE_BOARD = "CBSE"
CBSE_EXAM_CLASS = 10     # the board=="CBSE" class-10 pass

SUBJECT_NAMES = {
    "acc": "Accountancy",
    "bio": "Biology",
    "bs": "Business Studies",
    "chem": "Chemistry",
    "comm": "Commerce",
    "commapp": "Commercial Applications",
    "commstud": "Commercial Studies",
    "cs": "Computer Science",
    "econ": "Economics",
    "econapp": "Economic Applications",
    "eng": "English",
    "hist": "History",
    "histciv": "History & Civics",
    "home": "Home Science",
    "legal": "Legal Studies",
    "massmedia": "Mass Media",
    "maths": "Mathematics",
    "phy": "Physics",
    "physics": "Physics",
    "pol": "Political Science",
    "psy": "Psychology",
    "soc": "Sociology",
}


def _resolve_db_path() -> str:
    url = ""
    for name in ("PLATFORM_DATABASE_URL", "DATABASE_URL", "POSTGRES_URL"):
        val = os.environ.get(name, "")
        if val:
            url = val
            break
    if not url:
        url = DEFAULT_SQLITE_URL
    if not url.startswith("sqlite"):
        print(f"Refusing to seed a non-sqlite database: {url}")
        sys.exit(1)
    path = url.split("///", 1)[1] if "///" in url else url.split(":", 2)[-1]
    return path


def _has_text(value) -> bool:
    return value is not None and str(value).strip() != ""


def _wrap_slice(pool: list, start: int, count: int) -> list:
    """Deterministic cyclic slice — spreads start points when the pool is
    smaller than nodes * count."""
    n = len(pool)
    if n == 0:
        return []
    idxs = [(start + k) % n for k in range(min(count, n))]
    return [pool[i] for i in idxs]


def _question_payload(row, node_id: str | None) -> dict:
    """Embedded question dict — the grader reads id/question/options/marks/
    type/correct_answer/topic/node_id; the detail view exposes the first five.

    Seed-boundary hygiene: pipeline markers (TOPIC_TAG:, TARGET_NODE:,
    ANSWER: keys...) are stripped from the question text; the answer
    never ships inside the stem."""
    (qid, qtype, qtext, options, correct, model_answer, marks,
     chapter, subject, _cls) = row
    answer = correct if _has_text(correct) else (model_answer or "")
    return {
        "id": str(qid),
        "question": strip_pipeline_markers(qtext),
        "options": options if isinstance(options, list) else None,
        "marks": int(marks or 1),
        "type": qtype or "short_answer",
        "correct_answer": answer,
        "topic": chapter or SUBJECT_NAMES.get(subject, subject),
        "node_id": node_id,
    }


def _load_rows(cur, class_level: int, subject: str) -> list:
    return cur.execute(
        """
        SELECT id, question_type, question_text, options, correct_answer,
               model_answer, marks, chapter, subject, class_level
        FROM board_questions
        WHERE class_level = ? AND subject = ?
        ORDER BY id
        """,
        (class_level, subject),
    ).fetchall()


def _load_clean_rows(cur, class_level: int, subject: str) -> list:
    """Rows fit for an exam/quiz: merged records (>= 2 TOPIC_TAG
    markers -- two mined questions concatenated) are dropped outright;
    everything else passes through marker stripping at payload time."""
    return [r for r in _load_rows(cur, class_level, subject)
            if not is_merged_record(r[2])]


def _drop_empty_exams(cur) -> int:
    """Refuse-to-publish sweep: delete any exam that carries zero
    questions (no exam_sections rows).  Drops the empty 80-mark
    papers regardless of which pass seeded them."""
    cur.execute(
        "DELETE FROM exam_sections WHERE exam_id IN "
        "(SELECT id FROM exams e WHERE NOT EXISTS "
        "(SELECT 1 FROM exam_sections s WHERE s.exam_id = e.id))"
    )
    cur.execute(
        "DELETE FROM exams WHERE NOT EXISTS "
        "(SELECT 1 FROM exam_sections s WHERE s.exam_id = exams.id)"
    )
    return cur.rowcount


def seed_exams(cur, groups: list[tuple[int, str]], node_ids_by_group: dict,
               board: str = "CISCE",
               only_class: int | None = None) -> int:
    # each board pass manages ONLY its own exam codes: the CISCE sweep
    # leaves the `-cbse-` twins alone and vice versa
    if board == CBSE_BOARD:
        managed = (f"{EXAM_ID_PREFIX}c%-cbse-%",)
        stale_where = "exam_id LIKE ?"
        stale_params: tuple = managed
    else:
        stale_where = "exam_id LIKE ? AND exam_id NOT LIKE '%-cbse-%'"
        stale_params = (f"{EXAM_ID_PREFIX}c%",)
    cur.execute(
        "DELETE FROM exam_sections WHERE exam_id IN "
        f"(SELECT id FROM exams WHERE {stale_where})",
        stale_params,
    )
    cur.execute(f"DELETE FROM exams WHERE {stale_where}", stale_params)

    created = 0
    for class_level, subject in groups:
        if only_class is not None and class_level != only_class:
            continue
        rows = _load_clean_rows(cur, class_level, subject)
        if not rows:
            continue
        answerable = [r for r in rows if _has_text(r[4]) or _has_text(r[5])]
        plain = [r for r in rows if r not in answerable]
        pool = answerable + plain  # prefer gradable questions first
        # Interleave question types for a varied paper.
        by_type: dict[str, list] = {}
        for r in pool:
            by_type.setdefault(r[1] or "short_answer", []).append(r)
        ordered: list = []
        type_keys = sorted(by_type)
        while len(ordered) < min(EXAM_MAX_QUESTIONS, len(pool)):
            for tk in type_keys:
                if by_type[tk]:
                    ordered.append(by_type[tk].pop(0))
                    if len(ordered) >= min(EXAM_MAX_QUESTIONS, len(pool)):
                        break
        if len(ordered) < EXAM_MIN_QUESTIONS:
            continue  # not enough substance for a real exam

        nodes = node_ids_by_group.get((class_level, subject), [])
        section_questions: dict[str, list] = {"A": [], "B": []}
        node_cycle = 0
        for r in ordered:
            node_id = nodes[node_cycle % len(nodes)] if nodes else None
            node_cycle += 1
            bucket = "A" if (r[6] or 1) <= 3 else "B"
            section_questions[bucket].append(_question_payload(r, node_id))

        subject_name = SUBJECT_NAMES.get(subject, subject)
        total_marks = sum(q["marks"] for qs in section_questions.values() for q in qs)
        topics: list[str] = []
        for q in [x for qs in section_questions.values() for x in qs]:
            t = q["topic"]
            if t and t not in topics:
                topics.append(t)
        topics = topics[:8]

        section_meta = {
            "A": (
                "Section A — Short Answer",
                "Answer all questions. Each question carries the marks shown.",
            ),
            "B": (
                "Section B — Long Answer",
                "Answer all questions with full working. Step marks are awarded.",
            ),
        }
        built_sections = []
        for sid in ("A", "B"):
            questions = section_questions[sid]
            if not questions:
                continue
            title, instructions = section_meta[sid]
            built_sections.append(
                (
                    sid,
                    title,
                    sum(q["marks"] for q in questions),
                    len(questions),
                    questions[0]["type"],
                    instructions,
                    json.dumps(questions),
                )
            )

        if not built_sections:
            # REFUSE TO PUBLISH: zero questions means zero sections --
            # an empty paper (e.g. an 80-mark header with no content)
            # must never reach a student.
            continue

        exam_id = str(uuid.uuid4())
        if board == CBSE_BOARD:
            exam_code = f"{EXAM_ID_PREFIX}c{class_level}-cbse-{subject}"
            exam_title = (f"{subject_name} — Class {class_level} "
                          f"CBSE Board Practice Exam")
        else:
            exam_code = f"{EXAM_ID_PREFIX}c{class_level}-{subject}"
            exam_title = (f"{subject_name} — Class {class_level} "
                          f"Board Practice Exam")

        cur.execute(
            """
            INSERT INTO exams (id, exam_id, title, board, class_level, subject,
                               duration_minutes, total_marks, sections_count,
                               difficulty, topics, is_published)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
            """,
            (
                exam_id,
                exam_code,
                exam_title,
                board,
                class_level,
                subject_name,
                max(45, min(180, total_marks)),
                total_marks,
                len(built_sections),
                "medium",
                json.dumps(topics),
            ),
        )

        for sid, title, marks, qcount, qtype, instructions, questions_json in built_sections:
            cur.execute(
                """
                INSERT INTO exam_sections (id, exam_id, section_id, title, marks,
                                           question_count, question_type,
                                           instructions, questions)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    str(uuid.uuid4()),
                    exam_id,
                    sid,
                    title,
                    marks,
                    qcount,
                    qtype,
                    instructions,
                    questions_json,
                ),
            )
        created += 1
    return created


def seed_quizzes(cur, groups: list[tuple[int, str]], node_ids_by_group: dict) -> int:
    managed_nodes = [
        nid for group, nids in node_ids_by_group.items() for nid in nids
    ]
    if managed_nodes:
        cur.execute(
            "DELETE FROM quiz_questions WHERE node_id IN "
            f"({','.join('?' * len(managed_nodes))})",
            managed_nodes,
        )

    created = 0
    for class_level, subject in groups:
        nodes = node_ids_by_group.get((class_level, subject), [])
        if not nodes:
            continue
        rows = _load_clean_rows(cur, class_level, subject)
        # Only answerable questions make useful quiz items.
        pool = [r for r in rows if _has_text(r[4]) or _has_text(r[5])]
        if not pool:
            continue
        for i, node_id in enumerate(nodes):
            start = (i * QUIZ_PER_NODE) % len(pool)
            for r in _wrap_slice(pool, start, QUIZ_PER_NODE):
                payload = _question_payload(r, node_id)
                if not payload["correct_answer"]:
                    continue
                cur.execute(
                    """
                    INSERT INTO quiz_questions (id, node_id, question,
                        question_type, options, correct_answer, explanation,
                        marks, marking_scheme, difficulty)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (
                        str(uuid.uuid4()),
                        node_id,
                        payload["question"],
                        payload["type"],
                        json.dumps(payload["options"])
                        if payload["options"] is not None
                        else None,
                        payload["correct_answer"],
                        None,
                        payload["marks"],
                        None,
                        "medium",
                    ),
                )
                created += 1
    return created


def main() -> None:
    db_path = _resolve_db_path()
    print(f"Seeding exam/quiz banks into: {db_path}")
    con = sqlite3.connect(db_path)
    cur = con.cursor()

    groups = [
        (int(c), s)
        for c, s in cur.execute(
            """
            SELECT class_level, subject FROM board_questions
            WHERE class_level BETWEEN ? AND ?
            GROUP BY class_level, subject
            ORDER BY class_level, subject
            """,
            (MIN_CLASS, MAX_CLASS),
        ).fetchall()
    ]
    print(f"Groups (class, subject) in bank: {len(groups)}")

    nodes = cur.execute(
        """
        SELECT node_id, class_level, subject FROM knowledge_nodes
        WHERE class_level BETWEEN ? AND ?
        ORDER BY class_level, subject, node_id
        """,
        (MIN_CLASS, MAX_CLASS),
    ).fetchall()
    node_ids_by_group: dict[tuple[int, str], list[str]] = {}
    for nid, c, s in nodes:
        node_ids_by_group.setdefault((int(c), s), []).append(nid)

    exams = seed_exams(cur, groups, node_ids_by_group, board="CISCE")
    # board=="CBSE" class-10 pass: CBSE students get their own class-10
    # papers built from the same bank (the exam_code carries -cbse-).
    cbse_groups = [(c, s) for c, s in groups if c == CBSE_EXAM_CLASS]
    cbse = seed_exams(cur, cbse_groups, node_ids_by_group,
                      board=CBSE_BOARD, only_class=CBSE_EXAM_CLASS)
    quizzes = seed_quizzes(cur, groups, node_ids_by_group)
    dropped_empty = _drop_empty_exams(cur)
    con.commit()

    total_exams = cur.execute("SELECT COUNT(*) FROM exams").fetchone()[0]
    published = cur.execute(
        "SELECT COUNT(*) FROM exams WHERE is_published = 1"
    ).fetchone()[0]
    sections = cur.execute("SELECT COUNT(*) FROM exam_sections").fetchone()[0]
    quiz_total = cur.execute("SELECT COUNT(*) FROM quiz_questions").fetchone()[0]
    quiz_nodes = cur.execute(
        "SELECT COUNT(DISTINCT node_id) FROM quiz_questions"
    ).fetchone()[0]

    print(f"Exams created this run: {exams} "
          f"(+{cbse} CBSE class-{CBSE_EXAM_CLASS})")
    print(f"Empty 0-question exams dropped: {dropped_empty}")
    print(f"Exams total: {total_exams} (published: {published})")
    print(f"Exam sections total: {sections}")
    print(f"Quiz questions inserted this run: {quizzes}")
    print(f"Quiz questions total: {quiz_total} across {quiz_nodes} nodes")

    sample = cur.execute(
        """
        SELECT e.exam_id, e.class_level, e.subject, e.total_marks,
               COUNT(s.id) AS sections
        FROM exams e LEFT JOIN exam_sections s ON s.exam_id = e.id
        GROUP BY e.id ORDER BY e.class_level, e.subject LIMIT 8
        """
    ).fetchall()
    for row in sample:
        print(f"  sample exam: {row}")
    con.close()
    print("Done.")


if __name__ == "__main__":
    main()
