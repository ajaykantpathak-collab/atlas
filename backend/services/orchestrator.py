"""Adaptive learning orchestrator — ONE next-best-action per student.

All the teaching machinery (SM-2 review, misconception remediation,
BKT mastery, the prerequisite graph, corpus diagnostics) exists but
was disconnected: the student had to choose between review / practice
/ learn / diagnostic surfaces themselves. This service is the missing
decision layer — given the student's state it answers a single
question: "what should I do next?"

Decision order (first match wins):

1. review     — an SM-2 item is due right now (spaced repetition beats
                everything: forgetting is the highest-cost failure)
2. remediate  — a recent attempt was wrong and the node hasn't been
                recovered since (serve the misconception path)
3. teach      — weakest in-progress node below teach-threshold; if an
                unmastered prerequisite exists, teach THAT first
                (prerequisite-aware routing via the Neo4j graph)
4. practice   — mid-band mastery (knows it, hasn't consolidated it)
5. explore    — nothing pending → a fresh node to start / diagnose

Every branch returns student-safe identifiers: title + slug only —
internal node ids never leave this service.
"""
from __future__ import annotations

import logging
from typing import Any, Optional

from sqlalchemy import select, desc, func

from backend.models.enrichment import BoardQuestion, EnrichmentContent
from backend.models.progress import MasteryRecord, ReviewItem

logger = logging.getLogger(__name__)

# Mastery bands (BKT p_known)
_TEACH_BELOW = 0.45       # below this the node needs teaching, not practice
_PRACTICE_BELOW = 0.78    # below this the node needs consolidation
_PREREQ_WEAK = 0.40       # a prerequisite under this must be taught first
_REMEDIATION_WINDOW = 40  # recent attempts to inspect for unresolved wrongs


class LearningOrchestrator:
    """Picks the next best action for a student across the whole loop."""

    # ------------------------------------------------------------------ #
    # helpers
    # ------------------------------------------------------------------ #

    @staticmethod
    async def _node_card(db, node_id: str) -> Optional[dict]:
        """Student-facing node descriptor — title + slug only."""
        if not node_id:
            return None
        ec = (
            await db.execute(
                select(
                    EnrichmentContent.node_id,
                    EnrichmentContent.title,
                    EnrichmentContent.slug,
                    EnrichmentContent.subject,
                    EnrichmentContent.class_level,
                ).where(EnrichmentContent.node_id == node_id)
            )
        ).first()
        if ec is None:
            return None
        title = ec[1] or ec[0]
        return {
            "title": title,
            "slug": ec[2],
            "subject": ec[3],
            "class_level": ec[4],
            "link": f"/learn/{ec[2]}" if ec[2] else None,
        }

    @staticmethod
    async def _node_for_corpus_qid(db, corpus_qid: str) -> Optional[str]:
        """corpus:<uuid> attempt seed → the node it was extracted from."""
        try:
            import uuid as _uuid

            rid = _uuid.UUID(corpus_qid.replace("corpus:", ""))
            row = (
                await db.execute(
                    select(BoardQuestion.node_tags).where(
                        BoardQuestion.id == rid
                    )
                )
            ).first()
            tags = row[0] if row else None
            return tags[0] if tags else None
        except Exception:
            return None

    # ------------------------------------------------------------------ #
    # the decision
    # ------------------------------------------------------------------ #

    @classmethod
    async def next_step(cls, db, user_id) -> dict[str, Any]:
        """Return the single next-best action for `user_id`."""

        # ── 1. review — an SM-2 item is due ────────────────────────────
        try:
            from backend.services.progress_service import ProgressService

            due = await ProgressService.get_review_queue(db, user_id)
            if due:
                card = await cls._node_card(db, getattr(due[0], "node_id", None))
                return {
                    "action": "review",
                    "reason": "Spaced-repetition review is due — catch it "
                              "before it fades.",
                    "node": card,
                    "link": "/dashboard#review",
                }
        except Exception as exc:
            logger.debug("orchestrator review step skipped: %s", exc)

        # ── 2. remediate — recent wrong answer never recovered ─────────
        try:
            from backend.database import Attempt
            from backend.services.identity_bridge import ensure_student_row

            # Attempt.student_id references students.id, not users.id —
            # bridge the identity first (row already exists for anyone
            # who has practised; ensure_student_row is read-mostly here).
            student_row = await ensure_student_row(db, user_id)
            if student_row is None:
                raise ValueError("no student row")

            rows = (
                await db.execute(
                    select(
                        Attempt.correct, Attempt.question_seed
                    )
                    .where(Attempt.student_id == student_row.id)
                    .order_by(desc(Attempt.created_at))
                    .limit(_REMEDIATION_WINDOW)
                )
            ).all()
            recovered: set[str] = set()
            for correct, seed in rows:
                seed = seed or ""
                if not seed.startswith("corpus:"):
                    continue
                node = await cls._node_for_corpus_qid(db, seed)
                if not node:
                    continue
                if correct:
                    recovered.add(node)
                elif node not in recovered:
                    card = await cls._node_card(db, node)
                    if card:
                        return {
                            "action": "remediate",
                            "reason": "Your last answer here missed a key "
                                      "idea — let's fix the misconception "
                                      "before moving on.",
                            "node": card,
                            "link": card.get("link"),
                        }
        except Exception as exc:
            logger.debug("orchestrator remediate step skipped: %s", exc)

        # ── 3 + 4. teach / practice — weakest in-progress node ─────────
        try:
            mastery_rows = (
                await db.execute(
                    select(
                        MasteryRecord.node_id,
                        MasteryRecord.p_known,
                    )
                    .where(
                        MasteryRecord.user_id == user_id,
                        MasteryRecord.attempts > 0,
                    )
                    .order_by(MasteryRecord.p_known.asc())
                    .limit(25)
                )
            ).all()
        except Exception as exc:
            logger.debug("orchestrator mastery fetch failed: %s", exc)
            mastery_rows = []

        weakest = next(
            (r for r in mastery_rows if r[1] < _TEACH_BELOW), None
        )
        if weakest is not None:
            node_id = weakest[0]
            # Prerequisite-aware: if an unmastered prereq exists, teach it
            # FIRST — teaching a node over a missing foundation is the
            # classic failure mode.
            try:
                from backend.services.graph_service import GraphService

                prereqs = await GraphService.get_all_prerequisites(
                    node_id, 3)
                if prereqs:
                    ids = [p.get("id") or p.get("node_id") or p
                           for p in prereqs][:30]
                    weak = (
                        await db.execute(
                            select(MasteryRecord.node_id)
                            .where(
                                MasteryRecord.user_id == user_id,
                                MasteryRecord.node_id.in_(ids),
                                MasteryRecord.p_known < _PREREQ_WEAK,
                            )
                        )
                    ).scalars().all()
                    if weak:
                        card = await cls._node_card(db, weak[0])
                        if card:
                            return {
                                "action": "teach",
                                "reason": "This topic builds on a foundation "
                                          "you haven't locked yet — we "
                                          "start there first.",
                                "node": card,
                                "link": card.get("link"),
                            }
            except Exception as exc:
                logger.debug("orchestrator prereq check skipped: %s", exc)

            card = await cls._node_card(db, node_id)
            if card:
                return {
                    "action": "teach",
                    "reason": "Mastery is still forming here — a guided "
                              "walkthrough and worked examples will help.",
                    "node": card,
                    "link": card.get("link"),
                }

        mid = next(
            (r for r in mastery_rows if r[1] < _PRACTICE_BELOW), None
        )
        if mid is not None:
            card = await cls._node_card(db, mid[0])
            if card:
                return {
                    "action": "practice",
                    "reason": "You know the idea — now consolidate it with "
                              "a few targeted questions.",
                    "node": card,
                    "link": "/practice",
                }

        # ── 5. explore — nothing pending ───────────────────────────────
        return {
            "action": "explore",
            "reason": "You're caught up. Pick a new topic or run a "
                      "diagnostic to expand your map.",
            "node": None,
            "link": "/learn",
        }
