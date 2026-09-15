"""Phase 7.2: Hindi translation generator for enrichment content.

Generates Hindi translations for enrichment_content fields using DeepSeek API.
Batch-processes all pending rows and stores translations in the *_hi columns.

Translation strategy:
  - Use DeepSeek API (deepseek-v4-flash for speed, deepseek-v4-pro for quality)
  - Translate: definition, text_walkthrough, eli5, common_misconception,
    mastery_criteria
  - Preserve technical terms (formulas, equations, variable names)
  - Mark each row as 'translated' or 'reviewed' after processing
  - Batch processing with rate limiting and retry logic

Usage:
    from backend.services.hindi_translation_generator import HindiTranslationGenerator

    gen = HindiTranslationGenerator()
    count = gen.translate_pending(limit=100)  # Translate 100 rows
    count = gen.translate_all()                # Translate all pending rows
"""

import os
import time
import json
import logging
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Optional
from dataclasses import dataclass

logger = logging.getLogger(__name__)

# Load environment
from pathlib import Path
_env_file = Path(r"D:\dream_app\.env")
if _env_file.exists():
    with open(_env_file) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip())


@dataclass
class TranslationResult:
    """Result of translating one row."""
    node_id: str
    success: bool
    fields_translated: int
    error: str = ""


class HindiTranslationGenerator:
    """Generates Hindi translations for enrichment content using DeepSeek API.

    Features:
      - Batch processing with rate limiting
      - Retry logic for API failures
      - Preserves technical terms (formulas, equations)
      - Marks rows as 'translated' after processing
      - Optional human review flagging
    """

    # Fields to translate
    FIELDS = [
        "definition",
        "text_walkthrough",
        "eli5",
        "common_misconception",
        "mastery_criteria",
    ]

    def __init__(
        self,
        model: str = "deepseek-v4-flash",
        api_key: Optional[str] = None,
        base_url: Optional[str] = None,
        max_retries: int = 3,
        rate_limit_delay: float = 0.5,
    ):
        self.model = model
        self.api_key = api_key or os.environ.get("DEEPSEEK_API_KEY", "")
        self.base_url = base_url or os.environ.get("DEEPSEEK_BASE_URL", "https://api.deepseek.com")
        self.max_retries = max_retries
        self.rate_limit_delay = rate_limit_delay
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

    def _call_llm(self, system_prompt: str, user_prompt: str) -> Optional[str]:
        """Call DeepSeek API with retry logic."""
        import urllib.request
        import urllib.error

        url = f"{self.base_url}/v1/chat/completions"
        payload = json.dumps({
            "model": self.model,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            "temperature": 0.3,  # Low temperature for consistent translations
            "max_tokens": 2000,
        }).encode("utf-8")

        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.api_key}",
        }

        for attempt in range(self.max_retries):
            try:
                req = urllib.request.Request(url, data=payload, headers=headers, method="POST")
                with urllib.request.urlopen(req, timeout=30) as response:
                    result = json.loads(response.read().decode("utf-8"))
                    return result["choices"][0]["message"]["content"]
            except urllib.error.HTTPError as e:
                logger.warning(f"API error (attempt {attempt+1}): {e.code} {e.reason}")
                if attempt < self.max_retries - 1:
                    time.sleep(2 ** attempt)  # Exponential backoff
            except Exception as e:
                logger.warning(f"Request error (attempt {attempt+1}): {e}")
                if attempt < self.max_retries - 1:
                    time.sleep(2 ** attempt)

        return None

    def _translate_field(self, english_text: str, field_name: str) -> Optional[str]:
        """Translate a single field from English to Hindi.

        Preserves technical terms, formulas, and equations.
        """
        if not english_text or not english_text.strip():
            return None

        system_prompt = (
            "You are a professional English-to-Hindi translator specializing in "
            "educational content for Indian school students (Classes 1-12, CISCE/ICSE board). "
            "Translate the given text from English to Hindi. "
            "Rules:\n"
            "1. Preserve all mathematical formulas, equations, and variable names as-is "
            "   (e.g., F=ma, x², sin(θ), H₂O)\n"
            "2. Preserve all chemical formulas and equations\n"
            "3. Use simple, clear Hindi appropriate for school students\n"
            "4. Keep technical terms in parentheses where helpful "
            "   (e.g., बल (force))\n"
            "5. Do NOT add any explanation or commentary — only translate\n"
            "6. Return ONLY the Hindi translation, nothing else\n"
        )

        user_prompt = (
            f"Translate the following {field_name} from English to Hindi.\n"
            f"Preserve all formulas, equations, and technical terms.\n\n"
            f"English text:\n{english_text}\n\n"
            f"Hindi translation:"
        )

        result = self._call_llm(system_prompt, user_prompt)
        if result:
            # Clean up: remove any leading/trailing quotes or whitespace
            result = result.strip().strip('"').strip("'").strip()
        return result

    def translate_row(self, row: dict) -> TranslationResult:
        """Translate all fields for a single row.

        Args:
            row: Dict with node_id and the English field values.

        Returns:
            TranslationResult with success status.
        """
        node_id = row["node_id"]
        translations = {}
        fields_translated = 0

        for field in self.FIELDS:
            english_text = row.get(field)
            if english_text and english_text.strip():
                hindi_text = self._translate_field(english_text, field)
                if hindi_text:
                    translations[f"{field}_hi"] = hindi_text
                    fields_translated += 1
                time.sleep(self.rate_limit_delay)  # Rate limit

        if fields_translated == 0:
            return TranslationResult(
                node_id=node_id, success=False,
                fields_translated=0, error="No fields translated"
            )

        # Update database
        conn = self._get_connection()
        cur = conn.cursor()

        try:
            set_clauses = ", ".join([f"{k} = %s" for k in translations.keys()])
            set_clauses += ", translation_status = 'translated', updated_at = NOW()"
            values = list(translations.values()) + [node_id]

            sql = f"UPDATE enrichment_content SET {set_clauses} WHERE node_id = %s"
            cur.execute(sql, values)
            conn.commit()
        except Exception as e:
            conn.rollback()
            return TranslationResult(
                node_id=node_id, success=False,
                fields_translated=fields_translated, error=str(e)
            )
        finally:
            cur.close()

        return TranslationResult(
            node_id=node_id, success=True,
            fields_translated=fields_translated
        )

    def get_pending_rows(self, limit: int = 100, offset: int = 0) -> list:
        """Get rows pending translation.

        Args:
            limit: Maximum number of rows to fetch.
            offset: Offset for pagination.

        Returns:
            List of row dicts.
        """
        conn = self._get_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)

        fields_sql = ", ".join(self.FIELDS)
        cur.execute(f"""
            SELECT node_id, {fields_sql}
            FROM enrichment_content
            WHERE translation_status = 'pending'
            ORDER BY class_level, subject, node_id
            LIMIT %s OFFSET %s
        """, (limit, offset))

        rows = [dict(r) for r in cur.fetchall()]
        cur.close()
        return rows

    def count_pending(self) -> int:
        """Count rows pending translation."""
        conn = self._get_connection()
        cur = conn.cursor()
        cur.execute("SELECT count(*) FROM enrichment_content WHERE translation_status = 'pending'")
        count = cur.fetchone()[0]
        cur.close()
        return count

    def count_translated(self) -> int:
        """Count rows that have been translated."""
        conn = self._get_connection()
        cur = conn.cursor()
        cur.execute("SELECT count(*) FROM enrichment_content WHERE translation_status = 'translated'")
        count = cur.fetchone()[0]
        cur.close()
        return count

    def translate_pending(self, limit: int = 100, offset: int = 0) -> int:
        """Translate a batch of pending rows.

        Args:
            limit: Maximum number of rows to translate.
            offset: Offset for pagination.

        Returns:
            Number of successfully translated rows.
        """
        rows = self.get_pending_rows(limit=limit, offset=offset)
        if not rows:
            logger.info("No pending rows to translate")
            return 0

        logger.info(f"Translating {len(rows)} rows (offset={offset})")
        success_count = 0

        for i, row in enumerate(rows):
            result = self.translate_row(row)
            if result.success:
                success_count += 1
                logger.info(f"  [{i+1}/{len(rows)}] ✓ {result.node_id}: {result.fields_translated} fields")
            else:
                logger.warning(f"  [{i+1}/{len(rows)}] ✗ {result.node_id}: {result.error}")

        logger.info(f"Batch complete: {success_count}/{len(rows)} translated")
        return success_count

    def translate_all(self, batch_size: int = 50) -> int:
        """Translate all pending rows in batches.

        Args:
            batch_size: Number of rows per batch.

        Returns:
            Total number of successfully translated rows.
        """
        total_pending = self.count_pending()
        logger.info(f"Total pending: {total_pending} rows")

        total_success = 0
        offset = 0

        while offset < total_pending:
            batch_success = self.translate_pending(limit=batch_size, offset=offset)
            total_success += batch_success
            offset += batch_size

            # Check if we've processed all pending rows
            remaining = self.count_pending()
            if remaining == 0:
                break

        logger.info(f"All done: {total_success} rows translated")
        return total_success

    def mark_reviewed(self, node_id: str) -> bool:
        """Mark a row as human-reviewed.

        Args:
            node_id: The node ID to mark as reviewed.

        Returns:
            True if successful.
        """
        conn = self._get_connection()
        cur = conn.cursor()
        try:
            cur.execute("""
                UPDATE enrichment_content
                SET translation_reviewed = TRUE,
                    translation_status = 'reviewed',
                    updated_at = NOW()
                WHERE node_id = %s
            """, (node_id,))
            conn.commit()
            return cur.rowcount > 0
        except Exception as e:
            conn.rollback()
            logger.error(f"Failed to mark reviewed: {e}")
            return False
        finally:
            cur.close()

    def close(self):
        """Close database connection."""
        if self._conn and not self._conn.closed:
            self._conn.close()
