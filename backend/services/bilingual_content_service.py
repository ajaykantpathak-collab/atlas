"""Phase 7.4: Bilingual content service.

Serves enrichment content in English or Hindi based on the student's
language preference. Falls back to English if Hindi translation is
not yet available.

Features:
  - Get content by node_id in specified language
  - Get content by subject/class in specified language
  - Search content in specified language
  - Automatic fallback to English if Hindi not available
  - Track which fields have Hindi translations available
  - Serve diagnostic questions in specified language

Usage:
    from backend.services.bilingual_content_service import BilingualContentService

    service = BilingualContentService()
    content = service.get_content(node_id="c10_bio_008", lang="hi")
    contents = service.get_by_subject(subject="bio", class_level=10, lang="hi")
"""

import os
import json
import logging
import psycopg2
from psycopg2.extras import RealDictCursor
from dataclasses import dataclass, field
from typing import Optional, List

logger = logging.getLogger(__name__)


@dataclass
class BilingualContent:
    """Bilingual content item."""
    node_id: str
    title: str
    subject: str
    class_level: int
    chapter: Optional[str] = None
    # English fields
    definition: str = ""
    text_walkthrough: str = ""
    eli5: str = ""
    common_misconception: str = ""
    mastery_criteria: str = ""
    diagnostic_questions: list = field(default_factory=list)
    # Hindi fields
    definition_hi: str = ""
    text_walkthrough_hi: str = ""
    eli5_hi: str = ""
    common_misconception_hi: str = ""
    mastery_criteria_hi: str = ""
    diagnostic_questions_hi: list = field(default_factory=list)
    # Metadata
    translation_status: str = "pending"
    translation_reviewed: bool = False
    # Language availability
    hindi_available: bool = False

    def get_in_language(self, lang: str) -> dict:
        """Get content fields in the specified language.

        Falls back to English if Hindi is not available.

        Args:
            lang: 'en' or 'hi'

        Returns:
            Dict with content fields in the requested language.
        """
        if lang == "hi" and self.hindi_available:
            return {
                "node_id": self.node_id,
                "title": self.title,
                "subject": self.subject,
                "class_level": self.class_level,
                "chapter": self.chapter,
                "definition": self.definition_hi or self.definition,
                "text_walkthrough": self.text_walkthrough_hi or self.text_walkthrough,
                "eli5": self.eli5_hi or self.eli5,
                "common_misconception": self.common_misconception_hi or self.common_misconception,
                "mastery_criteria": self.mastery_criteria_hi or self.mastery_criteria,
                "diagnostic_questions": self._get_dq_in_lang("hi"),
                "lang": "hi",
                "fallback_used": not self.hindi_available,
            }
        else:
            return {
                "node_id": self.node_id,
                "title": self.title,
                "subject": self.subject,
                "class_level": self.class_level,
                "chapter": self.chapter,
                "definition": self.definition,
                "text_walkthrough": self.text_walkthrough,
                "eli5": self.eli5,
                "common_misconception": self.common_misconception,
                "mastery_criteria": self.mastery_criteria,
                "diagnostic_questions": self._get_dq_in_lang("en"),
                "lang": "en",
                "fallback_used": lang == "hi" and not self.hindi_available,
            }

    def _get_dq_in_lang(self, lang: str) -> list:
        """Get diagnostic questions in the specified language."""
        if lang == "hi" and self.diagnostic_questions_hi:
            result = []
            for q in self.diagnostic_questions_hi:
                item = {
                    "number": q.get("number"),
                    "cognitive_type": q.get("cognitive_type"),
                    "question": q.get("question_hi", q.get("question")),
                    "answer": q.get("answer_hi", q.get("answer")),
                }
                result.append(item)
            return result
        else:
            return [
                {
                    "number": q.get("number"),
                    "cognitive_type": q.get("cognitive_type"),
                    "question": q.get("question"),
                    "answer": q.get("answer"),
                }
                for q in self.diagnostic_questions
            ]


class BilingualContentService:
    """Service for serving bilingual (English/Hindi) content.

    Retrieves content from the enrichment_content table and serves it
    in the requested language with automatic fallback to English.
    """

    def __init__(self):
        self._conn = None

    def _get_connection(self):
        """Get database connection."""
        if self._conn is None or self._conn.closed:
            self._conn = psycopg2.connect(
                host="localhost",
                port="5432",
                database="dream_app",
                user="dream_user",
                password=os.environ.get("POSTGRES_PASSWORD", "dream_secure_2024"),
            )
        return self._conn

    def _row_to_content(self, row: dict) -> BilingualContent:
        """Convert a database row to BilingualContent."""
        # Parse diagnostic questions
        dq = row.get("diagnostic_questions")
        if isinstance(dq, str):
            try:
                dq = json.loads(dq)
            except json.JSONDecodeError:
                dq = []
        dq = dq or []

        dq_hi = row.get("diagnostic_questions_hi")
        if isinstance(dq_hi, str):
            try:
                dq_hi = json.loads(dq_hi)
            except json.JSONDecodeError:
                dq_hi = []
        dq_hi = dq_hi or []

        # Check if Hindi is available
        hindi_available = (
            row.get("translation_status") == "translated"
            or row.get("translation_status") == "reviewed"
        ) and (
            row.get("definition_hi")
            or row.get("eli5_hi")
            or row.get("text_walkthrough_hi")
        )

        return BilingualContent(
            node_id=row["node_id"],
            title=row["title"],
            subject=row["subject"],
            class_level=row["class_level"],
            chapter=row.get("chapter"),
            definition=row.get("definition") or "",
            text_walkthrough=row.get("text_walkthrough") or "",
            eli5=row.get("eli5") or "",
            common_misconception=row.get("common_misconception") or "",
            mastery_criteria=row.get("mastery_criteria") or "",
            diagnostic_questions=dq,
            definition_hi=row.get("definition_hi") or "",
            text_walkthrough_hi=row.get("text_walkthrough_hi") or "",
            eli5_hi=row.get("eli5_hi") or "",
            common_misconception_hi=row.get("common_misconception_hi") or "",
            mastery_criteria_hi=row.get("mastery_criteria_hi") or "",
            diagnostic_questions_hi=dq_hi,
            translation_status=row.get("translation_status", "pending"),
            translation_reviewed=row.get("translation_reviewed", False),
            hindi_available=hindi_available,
        )

    def get_content(self, node_id: str, lang: str = "en") -> Optional[dict]:
        """Get content for a single node in the specified language.

        Args:
            node_id: The curriculum node ID.
            lang: 'en' or 'hi'. Falls back to 'en' if Hindi unavailable.

        Returns:
            Content dict in the requested language, or None if not found.
        """
        conn = self._get_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)

        cur.execute("""
            SELECT * FROM enrichment_content WHERE node_id = %s
        """, (node_id,))

        row = cur.fetchone()
        cur.close()

        if not row:
            return None

        content = self._row_to_content(dict(row))
        return content.get_in_language(lang)

    def get_by_subject(
        self,
        subject: str,
        class_level: int,
        lang: str = "en",
        limit: int = 50,
        offset: int = 0,
    ) -> List[dict]:
        """Get content by subject and class level in the specified language.

        Args:
            subject: Subject code (e.g., 'bio', 'maths', 'physics').
            class_level: Class level (1-12).
            lang: 'en' or 'hi'.
            limit: Maximum results.
            offset: Pagination offset.

        Returns:
            List of content dicts in the requested language.
        """
        conn = self._get_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)

        cur.execute("""
            SELECT * FROM enrichment_content
            WHERE subject = %s AND class_level = %s
            ORDER BY chapter, node_id
            LIMIT %s OFFSET %s
        """, (subject, class_level, limit, offset))

        rows = cur.fetchall()
        cur.close()

        return [self._row_to_content(dict(r)).get_in_language(lang) for r in rows]

    def search(
        self,
        query: str,
        lang: str = "en",
        subject: Optional[str] = None,
        class_level: Optional[int] = None,
        limit: int = 20,
    ) -> List[dict]:
        """Search content by text query in the specified language.

        Searches in both English and Hindi fields.

        Args:
            query: Search query.
            lang: 'en' or 'hi'.
            subject: Optional subject filter.
            class_level: Optional class level filter.
            limit: Maximum results.

        Returns:
            List of content dicts in the requested language.
        """
        conn = self._get_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)

        # Build query — search in both English and Hindi fields
        conditions = []
        params = []

        # Search in English fields
        en_fields = ["definition", "text_walkthrough", "eli5", "title"]
        en_conditions = " OR ".join([f"{f} ILIKE %s" for f in en_fields])
        conditions.append(f"({en_conditions})")
        params.extend([f"%{query}%"] * len(en_fields))

        # Search in Hindi fields
        hi_fields = ["definition_hi", "text_walkthrough_hi", "eli5_hi"]
        hi_conditions = " OR ".join([f"{f} ILIKE %s" for f in hi_fields])
        conditions.append(f"({hi_conditions})")
        params.extend([f"%{query}%"] * len(hi_fields))

        where = " OR ".join(conditions)

        if subject:
            where += " AND subject = %s"
            params.append(subject)
        if class_level:
            where += " AND class_level = %s"
            params.append(class_level)

        params.append(limit)

        cur.execute(f"""
            SELECT * FROM enrichment_content
            WHERE {where}
            ORDER BY node_id
            LIMIT %s
        """, params)

        rows = cur.fetchall()
        cur.close()

        return [self._row_to_content(dict(r)).get_in_language(lang) for r in rows]

    def get_translation_stats(self) -> dict:
        """Get translation statistics.

        Returns:
            Dict with counts of pending, translated, and reviewed rows.
        """
        conn = self._get_connection()
        cur = conn.cursor()

        cur.execute("""
            SELECT translation_status, count(*) as cnt
            FROM enrichment_content
            GROUP BY translation_status
        """)
        status_counts = {row[0]: row[1] for row in cur.fetchall()}

        cur.execute("""
            SELECT count(*) FROM enrichment_content
            WHERE diagnostic_questions_hi IS NOT NULL
        """)
        dq_translated = cur.fetchone()[0]

        cur.execute("SELECT count(*) FROM enrichment_content")
        total = cur.fetchone()[0]

        cur.close()

        return {
            "total": total,
            "pending": status_counts.get("pending", 0),
            "translated": status_counts.get("translated", 0),
            "reviewed": status_counts.get("reviewed", 0),
            "diagnostic_questions_translated": dq_translated,
            "hindi_coverage": (status_counts.get("translated", 0) + status_counts.get("reviewed", 0)) / total if total > 0 else 0,
        }

    def close(self):
        """Close database connection."""
        if self._conn and not self._conn.closed:
            self._conn.close()
