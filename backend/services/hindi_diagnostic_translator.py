"""Phase 7.3: Translate diagnostic questions to Hindi.

Adds a diagnostic_questions_hi column and translates the question/answer
fields of each diagnostic question to Hindi using DeepSeek API.

Usage:
    from backend.services.hindi_translation_generator import HindiDiagnosticTranslator

    translator = HindiDiagnosticTranslator()
    count = translator.translate_pending(limit=100)
"""
import os
import time
import json
import logging
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Optional
from dataclasses import dataclass

from backend.services.hindi_translation_generator import HindiTranslationGenerator

logger = logging.getLogger(__name__)


class HindiDiagnosticTranslator(HindiTranslationGenerator):
    """Translates diagnostic questions (JSON arrays) to Hindi.

    Extends HindiTranslationGenerator to handle the diagnostic_questions
    JSON field, which contains an array of {question, answer, ...} objects.
    """

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._ensure_column()

    def _ensure_column(self):
        """Ensure diagnostic_questions_hi column exists."""
        conn = self._get_connection()
        cur = conn.cursor()
        cur.execute("""
            SELECT column_name FROM information_schema.columns
            WHERE table_name = 'enrichment_content' AND column_name = 'diagnostic_questions_hi'
        """)
        exists = cur.fetchone()
        if not exists:
            cur.execute("ALTER TABLE enrichment_content ADD COLUMN diagnostic_questions_hi JSON")
            conn.commit()
            logger.info("Added diagnostic_questions_hi column")
        cur.close()

    def translate_diagnostic_questions(self, questions: list) -> Optional[list]:
        """Translate a list of diagnostic questions to Hindi.

        Args:
            questions: List of {question, answer, ...} dicts.

        Returns:
            Translated list of dicts, or None on failure.
        """
        if not questions:
            return None

        translated = []
        for q in questions:
            if not isinstance(q, dict):
                continue

            q_hi = dict(q)  # Copy original

            # Translate question
            if q.get("question"):
                q_hi_text = self._translate_field(q["question"], "diagnostic question")
                if q_hi_text:
                    q_hi["question_hi"] = q_hi_text
                time.sleep(self.rate_limit_delay)

            # Translate answer
            if q.get("answer"):
                a_hi_text = self._translate_field(q["answer"], "diagnostic answer")
                if a_hi_text:
                    q_hi["answer_hi"] = a_hi_text
                time.sleep(self.rate_limit_delay)

            translated.append(q_hi)

        return translated if translated else None

    def get_pending_dq_rows(self, limit: int = 100, offset: int = 0) -> list:
        """Get rows with untranslated diagnostic questions."""
        conn = self._get_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("""
            SELECT node_id, diagnostic_questions
            FROM enrichment_content
            WHERE diagnostic_questions IS NOT NULL
              AND diagnostic_questions_hi IS NULL
              AND translation_status = 'translated'
            ORDER BY class_level, subject, node_id
            LIMIT %s OFFSET %s
        """, (limit, offset))
        rows = [dict(r) for r in cur.fetchall()]
        cur.close()
        return rows

    def count_pending_dq(self) -> int:
        """Count rows with untranslated diagnostic questions."""
        conn = self._get_connection()
        cur = conn.cursor()
        cur.execute("""
            SELECT count(*) FROM enrichment_content
            WHERE diagnostic_questions IS NOT NULL
              AND diagnostic_questions_hi IS NULL
              AND translation_status = 'translated'
        """)
        count = cur.fetchone()[0]
        cur.close()
        return count

    def translate_dq_pending(self, limit: int = 100, offset: int = 0) -> int:
        """Translate diagnostic questions for pending rows.

        Args:
            limit: Maximum rows to process.
            offset: Pagination offset.

        Returns:
            Number of successfully translated rows.
        """
        rows = self.get_pending_dq_rows(limit=limit, offset=offset)
        if not rows:
            logger.info("No pending diagnostic questions to translate")
            return 0

        logger.info(f"Translating diagnostic questions for {len(rows)} rows")
        success = 0

        for i, row in enumerate(rows):
            node_id = row["node_id"]
            questions = row["diagnostic_questions"]

            if isinstance(questions, str):
                try:
                    questions = json.loads(questions)
                except json.JSONDecodeError:
                    logger.warning(f"  [{i+1}] Invalid JSON for {node_id}")
                    continue

            translated = self.translate_diagnostic_questions(questions)

            if translated:
                conn = self._get_connection()
                cur = conn.cursor()
                try:
                    cur.execute("""
                        UPDATE enrichment_content
                        SET diagnostic_questions_hi = %s, updated_at = NOW()
                        WHERE node_id = %s
                    """, (json.dumps(translated), node_id))
                    conn.commit()
                    success += 1
                    logger.info(f"  [{i+1}/{len(rows)}] ✓ {node_id}: {len(translated)} questions")
                except Exception as e:
                    conn.rollback()
                    logger.error(f"  [{i+1}] DB error for {node_id}: {e}")
                finally:
                    cur.close()
            else:
                logger.warning(f"  [{i+1}/{len(rows)}] ✗ {node_id}: translation failed")

        logger.info(f"DQ batch complete: {success}/{len(rows)}")
        return success
