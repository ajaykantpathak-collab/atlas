"""PostgreSQL loader — loads parsed JSONL data into the dream_app database.

SAFETY RULES:
  - NEVER delete or update existing records
  - Use INSERT ... ON CONFLICT DO NOTHING for enrichment (upsert by node_id)
  - Check for existing questions by source_file before bulk inserting
  - Create new tables for misconceptions (additive, no existing table)
  - All operations are idempotent — running twice produces the same result
  - Report statistics before and after

Tables:
  - enrichment_content (existing) — add 2,672 new nodes (23 subjects vs 4)
  - board_questions (existing) — add ~28K new questions with source_type
  - misconceptions (NEW) — 7,034 misconception records
  - node_mappings (NEW) — 23,795 record-to-node mappings
"""

import json
import sys
import psycopg2
import psycopg2.extras
from pathlib import Path
from collections import defaultdict

OUTPUT_DIR = Path(r"D:\platform\parsed_output")
DB_URL = "postgresql://dream_user:dream_secure_2024@localhost:5432/dream_app"


def load_jsonl(filepath: Path) -> list:
    if not filepath.exists():
        return []
    records = []
    with open(filepath, encoding="utf-8-sig") as f:
        for line in f:
            if line.strip():
                records.append(json.loads(line))
    return records


def get_existing_counts(conn):
    """Get current row counts for all tables."""
    cur = conn.cursor()
    counts = {}
    for table in ["enrichment_content", "board_questions", "class_level_content"]:
        cur.execute(f"SELECT count(*) FROM {table}")
        counts[table] = cur.fetchone()[0]
    cur.execute("SELECT DISTINCT subject FROM enrichment_content ORDER BY subject")
    counts["enrichment_subjects"] = [r[0] for r in cur.fetchall()]
    cur.execute("SELECT DISTINCT subject FROM board_questions ORDER BY subject")
    counts["question_subjects"] = [r[0] for r in cur.fetchall()]
    cur.close()
    return counts


def create_new_tables(conn):
    """Create new tables for misconceptions and node_mappings (if they don't exist)."""
    cur = conn.cursor()

    # Misconceptions table
    cur.execute("""
        CREATE TABLE IF NOT EXISTS misconceptions (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            misconception_id VARCHAR(100),
            misconception_text TEXT NOT NULL,
            correction TEXT NOT NULL,
            why_wrong TEXT,
            diagnostic_question TEXT,
            diagnostic_answer TEXT,
            remediation TEXT,
            target_nodes JSON,
            topic VARCHAR(500),
            frequency VARCHAR(50),
            source_ref TEXT,
            subject VARCHAR(50),
            class_level INTEGER,
            source_file TEXT,
            source_format VARCHAR(50),
            parser_id VARCHAR(50),
            parser_version VARCHAR(20),
            record_id VARCHAR(32) UNIQUE,
            created_at TIMESTAMPTZ DEFAULT NOW()
        )
    """)
    cur.execute("CREATE INDEX IF NOT EXISTS idx_misconceptions_subject ON misconceptions(subject)")
    cur.execute("CREATE INDEX IF NOT EXISTS idx_misconceptions_class ON misconceptions(class_level)")
    cur.execute("CREATE INDEX IF NOT EXISTS idx_misconceptions_format ON misconceptions(source_format)")

    # Node mappings table
    cur.execute("""
        CREATE TABLE IF NOT EXISTS node_mappings (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            record_id VARCHAR(32) NOT NULL,
            content_type VARCHAR(50) NOT NULL,
            source_file TEXT,
            source_format VARCHAR(50),
            node_id VARCHAR(100) NOT NULL,
            mapping_layer VARCHAR(20) NOT NULL,
            confidence VARCHAR(20) NOT NULL,
            source_field VARCHAR(50),
            overlap_count INTEGER,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            UNIQUE(record_id, node_id)
        )
    """)
    cur.execute("CREATE INDEX IF NOT EXISTS idx_node_mappings_node ON node_mappings(node_id)")
    cur.execute("CREATE INDEX IF NOT EXISTS idx_node_mappings_record ON node_mappings(record_id)")
    cur.execute("CREATE INDEX IF NOT EXISTS idx_node_mappings_content_type ON node_mappings(content_type)")

    conn.commit()
    cur.close()


def load_enrichment(conn, records):
    """Load enrichment records into enrichment_content table.
    
    Uses INSERT ... ON CONFLICT (node_id) DO NOTHING to skip existing nodes.
    """
    cur = conn.cursor()
    inserted = 0
    skipped = 0

    for r in records:
        node_id = r.get("node_id")
        if not node_id:
            continue

        # Check if node already exists
        cur.execute("SELECT 1 FROM enrichment_content WHERE node_id = %s", (node_id,))
        if cur.fetchone():
            skipped += 1
            continue

        # Insert new node
        cur.execute("""
            INSERT INTO enrichment_content (
                node_id, title, subject, class_level, chapter,
                definition, text_walkthrough, eli5, common_misconception,
                diagnostic_questions, on_failure, examples,
                cognitive_level, mastery_criteria, scope_boundary,
                source_file, board, difficulty
            ) VALUES (
                %s, %s, %s, %s, %s,
                %s, %s, %s, %s,
                %s, %s, %s,
                %s, %s, %s,
                %s, 'CISCE', 'medium'
            )
        """, (
            node_id,
            r.get("title"),
            r.get("subject"),
            r.get("class_level"),
            None,  # chapter
            r.get("definition"),
            r.get("text_walkthrough"),
            r.get("eli5"),
            r.get("common_misconception"),
            json.dumps(r.get("diagnostic_questions")) if r.get("diagnostic_questions") else None,
            json.dumps(r.get("on_failure")) if r.get("on_failure") else None,
            r.get("examples"),
            r.get("cognitive_level"),
            r.get("mastery_criteria"),
            r.get("scope_boundary"),
            r.get("source_file"),
        ))
        inserted += 1

    conn.commit()
    cur.close()
    return inserted, skipped


def load_questions(conn, records, source_type):
    """Load question records into board_questions table.
    
    Checks for existing questions by source_file + question_text to avoid duplicates.
    """
    cur = conn.cursor()
    inserted = 0
    skipped = 0

    # Get existing source_files for this source_type
    cur.execute(
        "SELECT DISTINCT source_file FROM board_questions WHERE source_type = %s",
        (source_type,)
    )
    existing_files = set(r[0] for r in cur.fetchall() if r[0])

    # Group records by source_file
    by_file = defaultdict(list)
    for r in records:
        sf = r.get("source_file")
        if sf:
            by_file[sf].append(r)

    for sf, file_records in by_file.items():
        if sf in existing_files:
            skipped += len(file_records)
            continue

        for r in file_records:
            try:
                cur.execute("""
                    INSERT INTO board_questions (
                        question_number, node_tags, subject, class_level, chapter, section,
                        question_type, question_text, options, correct_answer, model_answer,
                        marks, marking_scheme, difficulty, source_type, source_file, board
                    ) VALUES (
                        %s, %s, %s, %s, %s, %s,
                        %s, %s, %s, %s, %s,
                        %s, %s, %s, %s, %s, 'CISCE'
                    )
                """, (
                    r.get("question_number"),
                    json.dumps(r.get("target_nodes") or r.get("node_tags") or []) or None,
                    r.get("subject"),
                    r.get("class_level"),
                    None,  # chapter
                    r.get("section"),
                    r.get("question_type") or "short_answer",
                    r.get("question_text"),
                    json.dumps(r.get("options")) if r.get("options") else None,
                    r.get("correct_answer") or r.get("answer"),
                    r.get("model_answer"),
                    r.get("marks") or 1,
                    r.get("mark_allocation") or r.get("marking_scheme"),
                    "medium",  # difficulty
                    source_type,
                    r.get("source_file"),
                ))
                inserted += 1
            except Exception as e:
                conn.rollback()
                cur = conn.cursor()
                skipped += 1

    conn.commit()
    cur.close()
    return inserted, skipped


def load_misconceptions(conn, records):
    """Load misconception records into misconceptions table."""
    cur = conn.cursor()
    inserted = 0
    skipped = 0

    for r in records:
        record_id = r.get("record_id")
        if not record_id:
            continue

        # Check if already exists
        cur.execute("SELECT 1 FROM misconceptions WHERE record_id = %s", (record_id,))
        if cur.fetchone():
            skipped += 1
            continue

        try:
            cur.execute("""
                INSERT INTO misconceptions (
                    misconception_id, misconception_text, correction, why_wrong,
                    diagnostic_question, diagnostic_answer, remediation,
                    target_nodes, topic, frequency, source_ref,
                    subject, class_level, source_file, source_format,
                    parser_id, parser_version, record_id
                ) VALUES (
                    %s, %s, %s, %s,
                    %s, %s, %s,
                    %s, %s, %s, %s,
                    %s, %s, %s, %s,
                    %s, %s, %s
                )
            """, (
                r.get("misconception_id"),
                r.get("misconception_text"),
                r.get("correction"),
                r.get("why_wrong"),
                r.get("diagnostic_question"),
                r.get("diagnostic_answer"),
                r.get("remediation"),
                json.dumps(r.get("target_nodes", [])),
                r.get("topic"),
                r.get("frequency"),
                r.get("source_ref"),
                r.get("subject"),
                r.get("class_level"),
                r.get("source_file"),
                r.get("source_format"),
                r.get("parser_id"),
                r.get("parser_version"),
                record_id,
            ))
            inserted += 1
        except Exception as e:
            conn.rollback()
            cur = conn.cursor()
            skipped += 1

    conn.commit()
    cur.close()
    return inserted, skipped


def load_node_mappings(conn, mappings):
    """Load node mappings into node_mappings table."""
    cur = conn.cursor()
    inserted = 0
    skipped = 0

    for m in mappings:
        record_id = m.get("record_id")
        content_type = m.get("content_type")
        source_file = m.get("source_file")
        source_format = m.get("source_format")

        for mn in m.get("mapped_nodes", []):
            try:
                cur.execute("""
                    INSERT INTO node_mappings (
                        record_id, content_type, source_file, source_format,
                        node_id, mapping_layer, confidence, source_field, overlap_count
                    ) VALUES (
                        %s, %s, %s, %s,
                        %s, %s, %s, %s, %s
                    )
                    ON CONFLICT (record_id, node_id) DO NOTHING
                """, (
                    record_id,
                    content_type,
                    source_file,
                    source_format,
                    mn.get("node_id"),
                    mn.get("layer"),
                    mn.get("confidence"),
                    mn.get("source_field"),
                    mn.get("overlap_count"),
                ))
                if cur.rowcount > 0:
                    inserted += 1
                else:
                    skipped += 1
            except Exception as e:
                conn.rollback()
                cur = conn.cursor()
                skipped += 1

    conn.commit()
    cur.close()
    return inserted, skipped


def main():
    print("PostgreSQL Loader — Loading Parsed Data into dream_app Database")
    print("=" * 70)

    conn = psycopg2.connect(DB_URL)

    # Get before counts
    print("\nBefore counts:")
    before = get_existing_counts(conn)
    for k, v in before.items():
        print(f"  {k}: {v}")

    # Create new tables
    print("\nCreating new tables (misconceptions, node_mappings)...")
    create_new_tables(conn)
    print("  Done.")

    # Load enrichment
    print("\nLoading enrichment nodes...")
    enrichment = load_jsonl(OUTPUT_DIR / "enrichment.jsonl")
    ins, skip = load_enrichment(conn, enrichment)
    print(f"  Inserted: {ins}, Skipped (already exist): {skip}")

    # Load question_bank as question_bank source_type
    print("\nLoading question_bank questions...")
    qb = load_jsonl(OUTPUT_DIR / "question_bank.jsonl")
    ins, skip = load_questions(conn, qb, "question_bank")
    print(f"  Inserted: {ins}, Skipped: {skip}")

    # Load diagnostics as diagnostic source_type
    print("\nLoading diagnostics questions...")
    diag = load_jsonl(OUTPUT_DIR / "diagnostics.jsonl")
    ins, skip = load_questions(conn, diag, "diagnostic")
    print(f"  Inserted: {ins}, Skipped: {skip}")

    # Load papers as mock_paper / past_paper / board_style
    print("\nLoading papers...")
    papers = load_jsonl(OUTPUT_DIR / "papers.jsonl")
    # Split by source_format to assign correct source_type
    papers_by_type = defaultdict(list)
    for p in papers:
        fmt = p.get("source_format", "")
        if "mock" in fmt:
            papers_by_type["mock_paper"].append(p)
        elif "past" in fmt:
            papers_by_type["past_paper"].append(p)
        elif "board_style" in fmt or "board" in fmt:
            papers_by_type["board_style"].append(p)
        else:
            papers_by_type["question_paper"].append(p)

    for st, recs in papers_by_type.items():
        ins, skip = load_questions(conn, recs, st)
        print(f"  {st}: Inserted: {ins}, Skipped: {skip}")

    # Load drill_banks as drill_bank source_type
    print("\nLoading drill_banks questions...")
    drills = load_jsonl(OUTPUT_DIR / "drill_banks.jsonl")
    ins, skip = load_questions(conn, drills, "drill_bank")
    print(f"  Inserted: {ins}, Skipped: {skip}")

    # Load misconceptions
    print("\nLoading misconceptions...")
    misc = load_jsonl(OUTPUT_DIR / "misconceptions.jsonl")
    ins, skip = load_misconceptions(conn, misc)
    print(f"  Inserted: {ins}, Skipped: {skip}")

    # Load node mappings
    print("\nLoading node mappings...")
    mappings = load_jsonl(OUTPUT_DIR / "node_mappings.jsonl")
    ins, skip = load_node_mappings(conn, mappings)
    print(f"  Inserted: {ins}, Skipped: {skip}")

    # Get after counts
    print("\nAfter counts:")
    after = get_existing_counts(conn)
    for k, v in after.items():
        print(f"  {k}: {v}")

    # Print deltas
    print("\nDeltas:")
    for table in ["enrichment_content", "board_questions", "class_level_content"]:
        delta = after[table] - before[table]
        print(f"  {table}: +{delta}")

    conn.close()
    print("\nDone.")


if __name__ == "__main__":
    main()
