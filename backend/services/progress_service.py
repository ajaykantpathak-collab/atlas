"""Progress tracking service for the DREAM_APP educational platform.

Implements:
  * Dashboard aggregation (XP, level, streak, recommendations, mastery, activity)
  * Progress overview and subject mastery
  * Activity logging and weekly activity / heatmap
  * Milestones
  * Bayesian Knowledge Tracing (BKT) mastery updates
  * Spaced repetition (SM-2) review queue and review submission
  * Offline content management
  * XP awarding, streak updates, and activity logging
"""

import math
from datetime import date, datetime, timedelta, timezone
from typing import Any, Optional

from sqlalchemy import select, func, and_
from sqlalchemy.ext.asyncio import AsyncSession

from backend.models.content import ContentBundle, KnowledgeNodeModel
from backend.models.progress import (
    ActivityLog,
    MasteryRecord,
    ReviewItem,
    StudySession,
)
from backend.models.user import User
from backend.services.content_service import ContentService

# BKT default parameters
BKT_P_TRANSIT = 0.1
BKT_P_SLIP = 0.1
BKT_P_GUESS = 0.2

# XP / level configuration
XP_PER_LEVEL = 100

# SM-2 constants
SM2_MIN_EF = 1.3


# ---------------------------------------------------------------------------
# Streak read model lives in services/streak_state.py (stdlib-only, dependency
# free) so routers can share it without importing the heavy service/model graph.
# It is re-exported here because this module owns the WRITER (`update_streak`),
# and therefore owns the day math that every read path must agree on.
# ---------------------------------------------------------------------------
from backend.services.streak_state import (  # noqa: E402
    STREAK_ACTIVE_TODAY,
    STREAK_AT_RISK,
    STREAK_LAPSED,
    STREAK_NONE,
    STREAK_UNKNOWN,
    classify_streak,
    unknown_streak,
)


def streak_read_state(
    streak_days: Any,
    last_activity_date: Optional[date],
    today: Optional[date] = None,
) -> dict[str, Any]:
    """Decay-aware view of a stored streak counter (see streak_state.py).

    `current_streak` is 0 for a lapsed streak, so no surface can present a
    streak as alive after the student has missed more than a day;
    `recorded_streak` keeps the raw counter so nothing is silently hidden.
    """
    return classify_streak(streak_days, last_activity_date, today)



class ProgressService:
    """Progress tracking, mastery, review, and gamification service."""

    # ================================================================== #
    # Dashboard
    # ================================================================== #
    @staticmethod
    async def get_dashboard(db: AsyncSession, user_id: str) -> dict:
        """Aggregate XP, level, streak, recommended lessons, mastery, and activity."""
        user_result = await db.execute(select(User).where(User.id == user_id))
        user = user_result.scalar_one_or_none()
        if user is None:
            raise ValueError("User not found")

        total_xp = user.total_xp or 0
        level = math.floor(total_xp / XP_PER_LEVEL) + 1
        level_xp = total_xp % XP_PER_LEVEL

        recommended = await ContentService.get_recommended_lessons(db, user_id)
        mastery_subjects = await ProgressService.get_subject_mastery(db, user_id)
        recent_activity = await ProgressService.get_recent_activity(db, user_id, limit=5)

        # Decay-aware: the stored counter is NOT a current streak (see
        # streak_read_state). Never hand a lapsed counter to a dashboard.
        _streak = streak_read_state(
            getattr(user, "streak_days", 0),
            getattr(user, "last_activity_date", None),
        )

        return {
            "user": {
                "id": str(user.id),
                "name": user.name,
                "email": user.email,
                "role": user.role,
                "board": user.board,
                "class_level": user.class_level,
                "avatar_url": user.avatar_url,
                "is_premium": user.is_premium,
                "total_xp": total_xp,
                "current_level": level,
                "streak_days": _streak["current_streak"],
            },
            "total_xp": total_xp,
            "level": level,
            "level_xp": level_xp,
            "level_max": XP_PER_LEVEL,
            "streak": _streak["current_streak"],
            # Decay-aware extras for callers that need to tell "lapsed" apart
            # from "never practised" (ignored by DashboardSchema).
            "streak_recorded": _streak["recorded_streak"],
            "streak_state": _streak["state"],
            "recommended_lessons": recommended,
            "mastery_subjects": mastery_subjects,
            "recent_activity": recent_activity,
        }

    # ================================================================== #
    # Progress overview
    # ================================================================== #
    @staticmethod
    async def get_progress_overview(
        db: AsyncSession, user_id: str, time_range: str = "all"
    ) -> dict:
        """Return a high-level progress overview.

        ``time_range`` can be ``"week"``, ``"month"``, or ``"all"``.
        """
        # Fetch mastery records
        mastery_result = await db.execute(
            select(MasteryRecord).where(MasteryRecord.user_id == user_id)
        )
        mastery_records = list(mastery_result.scalars().all())

        total_nodes = len(mastery_records)
        mastered_nodes = sum(1 for m in mastery_records if m.mastery_probability >= 0.8)
        avg_mastery = (
            sum(m.mastery_probability for m in mastery_records) / total_nodes
            if total_nodes > 0
            else 0.0
        )

        # Study time
        now = datetime.now(timezone.utc)
        if time_range == "week":
            start = now - timedelta(days=7)
        elif time_range == "month":
            start = now - timedelta(days=30)
        else:
            start = datetime(2000, 1, 1, tzinfo=timezone.utc)

        session_result = await db.execute(
            select(StudySession).where(
                and_(
                    StudySession.user_id == user_id,
                    StudySession.started_at >= start,
                )
            )
        )
        sessions = list(session_result.scalars().all())
        total_seconds = sum(s.duration_seconds or 0 for s in sessions)
        study_time_hours = total_seconds // 3600

        subjects = await ProgressService.get_subject_mastery(db, user_id)

        return {
            "total_nodes": total_nodes,
            "mastered_nodes": mastered_nodes,
            "study_time_hours": study_time_hours,
            "avg_mastery": int(avg_mastery * 100),
            "subjects": subjects,
        }

    # ================================================================== #
    # Subject mastery
    # ================================================================== #
    @staticmethod
    def _parse_corpus_node_subject(node_id: str) -> Optional[str]:
        """Subject code out of a corpus node id.

        c10_bio_cbse_01_001 -> "bio"; c11_hin_ar_cbse_02_005 -> "hin_ar".
        Returns None for ids that match no corpus shape (the old toy
        knowledge_nodes ids like c10_sci_003_01).
        """
        import re as _re
        m = _re.match(
            r"^c(\d{1,2})_([a-z]+(?:_[a-z]+)*?)_(?:cbse|ch\d+|u\d+)"
            r"_\d{1,3}_\d{1,3}$",
            str(node_id or "").strip().lower())
        return m.group(2) if m else None

    async def get_subject_mastery(db: AsyncSession, user_id: str) -> list[dict]:
        """Return per-subject mastery breakdown.

        C10 audit [STUDENT-C10][P3 MASTERY-MAP-SIZE]: the map must measure
        the student against their REAL class syllabus (the enhanced-nodes
        corpus — 660 nodes for class 10), not the 7-row toy
        ``knowledge_nodes`` seed table the dashboard previously aggregated
        (a fresh class-10 account was told its syllabus was ~6 nodes).
        Totals now come from the corpus catalog for the user's class;
        mastered/learning counts still come from the user's actual mastery
        records, so the bars stay honest about what has been touched.
        """
        # Get all mastery records for the user
        mastery_result = await db.execute(
            select(MasteryRecord).where(MasteryRecord.user_id == user_id)
        )
        mastery_records = list(mastery_result.scalars().all())
        mastery_map: dict[str, float] = {
            mr.node_id: mr.mastery_probability for mr in mastery_records
        }

        # The user's class → the real catalog for that class
        class_level: Optional[int] = None
        try:
            row = (await db.execute(
                select(User.class_level).where(User.id == user_id)
            )).first()
            if row and row[0]:
                class_level = int(row[0])
        except Exception:
            class_level = None

        catalog: dict[str, int] = {}
        if class_level is not None:
            try:
                from backend.services.enhanced_nodes import load_index
                idx = load_index()
                counts = idx.per_class_subject_counts().get(
                    str(class_level), {})
                catalog = {str(k): int(v) for k, v in counts.items()}
            except Exception:
                catalog = {}

        if catalog:
            subject_data: dict[str, dict] = {
                subj: {
                    "subject": subj,
                    "total_nodes": total,
                    "mastered_nodes": 0,
                    "learning_nodes": 0,
                    "not_started_nodes": total,
                    "mastery_sum": 0.0,
                    "mastery_percentage": 0,
                    "weekly_change": 0,
                }
                for subj, total in sorted(catalog.items())
            }
            for mr in mastery_records:
                subj = ProgressService._parse_corpus_node_subject(mr.node_id)
                data = subject_data.get(subj or "")
                if data is None:
                    continue  # record outside this class's catalog
                mastery = mr.mastery_probability
                data["not_started_nodes"] = max(
                    0, data["not_started_nodes"] - 1)
                if mastery >= 0.8:
                    data["mastered_nodes"] += 1
                    data["mastery_sum"] += mastery
                else:
                    data["learning_nodes"] += 1
                    data["mastery_sum"] += mastery
            result = []
            for data in subject_data.values():
                if data["total_nodes"] > 0:
                    data["mastery_percentage"] = int(
                        (data["mastery_sum"] / data["total_nodes"]) * 100
                    )
                result.append(data)
            return result

        # Fallback (corpus index unavailable or class unknown): the legacy
        # knowledge_nodes aggregation.
        nodes_result = await db.execute(select(KnowledgeNodeModel))
        all_nodes = list(nodes_result.scalars().all())

        subject_data = {}
        for node in all_nodes:
            subj = node.subject
            if subj not in subject_data:
                subject_data[subj] = {
                    "subject": subj,
                    "total_nodes": 0,
                    "mastered_nodes": 0,
                    "learning_nodes": 0,
                    "not_started_nodes": 0,
                    "mastery_sum": 0.0,
                    "mastery_percentage": 0,
                    "weekly_change": 0,
                }
            data = subject_data[subj]
            data["total_nodes"] += 1
            mastery = mastery_map.get(node.node_id)
            if mastery is None:
                data["not_started_nodes"] += 1
            elif mastery >= 0.8:
                data["mastered_nodes"] += 1
                data["mastery_sum"] += mastery
            else:
                data["learning_nodes"] += 1
                data["mastery_sum"] += mastery

        result = []
        for data in subject_data.values():
            if data["total_nodes"] > 0:
                data["mastery_percentage"] = int(
                    (data["mastery_sum"] / data["total_nodes"]) * 100
                )
            result.append(data)
        return result

    # ================================================================== #
    # Activity
    # ================================================================== #
    @staticmethod
    async def get_recent_activity(
        db: AsyncSession, user_id: str, limit: int = 10
    ) -> list[dict]:
        """Return recent activity log entries as response dicts."""
        result = await db.execute(
            select(ActivityLog)
            .where(ActivityLog.user_id == user_id)
            .order_by(ActivityLog.created_at.desc())
            .limit(limit)
        )
        logs = list(result.scalars().all())
        return [
            {
                "id": str(log.id),
                "activity_type": log.activity_type,
                "title": log.title,
                "subject": log.subject,
                "score": log.score,
                "time": log.created_at.isoformat() if log.created_at else "",
            }
            for log in logs
        ]

    @staticmethod
    async def get_weekly_activity(db: AsyncSession, user_id: str) -> list[dict]:
        """Return activity counts for the last 7 days."""
        now = datetime.now(timezone.utc)
        start = now - timedelta(days=6)
        start = start.replace(hour=0, minute=0, second=0, microsecond=0)

        result = await db.execute(
            select(ActivityLog).where(
                and_(
                    ActivityLog.user_id == user_id,
                    ActivityLog.created_at >= start,
                )
            )
        )
        logs = list(result.scalars().all())

        day_counts: dict[str, int] = {}
        for i in range(7):
            day = start + timedelta(days=i)
            day_name = day.strftime("%a")
            day_counts[day_name] = 0

        for log in logs:
            if log.created_at:
                day_name = log.created_at.strftime("%a")
                if day_name in day_counts:
                    day_counts[day_name] += 1

        return [{"day": day, "value": count} for day, count in day_counts.items()]

    # ================================================================== #
    # Milestones
    # ================================================================== #
    @staticmethod
    async def get_milestones(db: AsyncSession, user_id: str) -> list[dict]:
        """Return milestone achievements for the user."""
        from backend.models.achievement import Achievement, UserAchievement

        result = await db.execute(
            select(UserAchievement, Achievement)
            .join(Achievement, UserAchievement.achievement_id == Achievement.id)
            .where(
                and_(
                    UserAchievement.user_id == user_id,
                    UserAchievement.unlocked == True,  # noqa: E712
                )
            )
            .order_by(UserAchievement.unlocked_at.desc())
        )
        rows = result.all()

        return [
            {
                "id": str(ua.id),
                "achievement_id": achievement.achievement_id,
                "title": achievement.title,
                "description": achievement.description,
                "icon_name": achievement.icon_name,
                "tier": achievement.tier,
                "xp_reward": achievement.xp_reward,
                "unlocked_at": ua.unlocked_at.isoformat()
                if ua.unlocked_at
                else None,
            }
            for ua, achievement in rows
        ]

    # ================================================================== #
    # Study heatmap
    # ================================================================== #
    @staticmethod
    async def get_study_heatmap(db: AsyncSession, user_id: str) -> list[dict]:
        """Return a daily activity heatmap for the last 365 days."""
        from backend.models.achievement import StreakRecord

        now = datetime.now(timezone.utc)
        start = now - timedelta(days=364)

        result = await db.execute(
            select(StreakRecord).where(
                and_(
                    StreakRecord.user_id == user_id,
                    StreakRecord.date >= start.date(),
                )
            )
        )
        records = list(result.scalars().all())

        return [
            {
                "date": rec.date.isoformat(),
                "completed": rec.completed,
                "activities_count": rec.activities_count,
            }
            for rec in records
        ]

    # ================================================================== #
    # Mastery (BKT)
    # ================================================================== #
    @staticmethod
    async def get_mastery_record(
        db: AsyncSession, user_id: str, node_id: str
    ) -> Optional[MasteryRecord]:
        """Return the mastery record for a user/node pair, or ``None``."""
        result = await db.execute(
            select(MasteryRecord).where(
                and_(
                    MasteryRecord.user_id == user_id,
                    MasteryRecord.node_id == node_id,
                )
            )
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def get_all_mastery_records(db: AsyncSession, user_id: str) -> list:
        """Return compact mastery rows for every node the user has touched.

        Repeated practice can leave several rows per ``node_id``; clients
        get ONE row per node with the best probability seen. Only nodes
        with real attempts are returned — the galaxy treats everything
        absent from this list as unexplored.
        """
        result = await db.execute(
            select(
                MasteryRecord.node_id,
                func.max(MasteryRecord.mastery_probability).label("mp"),
                func.max(MasteryRecord.attempts).label("attempts"),
            )
            .where(MasteryRecord.user_id == user_id)
            .group_by(MasteryRecord.node_id)
        )
        return [
            {
                "node_id": node_id,
                "mastery_probability": float(mp or 0.0),
                "attempts": int(attempts or 0),
            }
            for node_id, mp, attempts in result.all()
        ]

    @staticmethod
    async def update_mastery_bkt(
        db: AsyncSession, user_id: str, node_id: str, is_correct: bool
    ) -> float:
        """Update mastery using Bayesian Knowledge Tracing.

        BKT update formula:
          p_known = p_correct_given_known * p_known
                  + p_correct_given_unknown * (1 - p_known)
          then normalise.

        Returns the updated mastery probability.
        """
        record = await ProgressService.get_mastery_record(db, user_id, node_id)

        if record is None:
            record = MasteryRecord(
                user_id=user_id,
                node_id=node_id,
                mastery_probability=0.0,
                p_known=0.0,
                p_transit=BKT_P_TRANSIT,
                p_slip=BKT_P_SLIP,
                p_guess=BKT_P_GUESS,
                attempts=0,
            )
            db.add(record)

        p_known = record.p_known
        p_transit = record.p_transit
        p_slip = record.p_slip
        p_guess = record.p_guess

        # Step 1: posterior given observation
        if is_correct:
            p_known_given_obs = (p_known * (1 - p_slip)) / (
                p_known * (1 - p_slip) + (1 - p_known) * p_guess
            )
        else:
            p_known_given_obs = (p_known * p_slip) / (
                p_known * p_slip + (1 - p_known) * (1 - p_guess)
            )

        # Step 2: learning transition
        p_known = p_known_given_obs + (1 - p_known_given_obs) * p_transit

        # Normalise to [0, 1]
        p_known = max(0.0, min(1.0, p_known))

        record.p_known = p_known
        record.mastery_probability = p_known
        record.attempts += 1
        record.last_attempt_at = datetime.now(timezone.utc)

        await db.flush()
        return p_known

    # ================================================================== #
    # Spaced repetition (SM-2)
    # ================================================================== #
    @staticmethod
    async def schedule_practice_review(
        db: AsyncSession,
        user_id: str,
        node_id: str,
        concept_name: str,
        is_correct: bool,
    ) -> None:
        """Feed a practice answer into the SM-2 queue.

        Creates the node's ReviewItem on first sight (due tomorrow so a
        fresh concept always comes back once) and applies the SM-2 quality
        update for subsequent answers. Mastery is NOT touched here —
        practice's own BKT path already applied it for this answer.
        """
        if not node_id:
            return
        result = await db.execute(
            select(ReviewItem).where(
                and_(
                    ReviewItem.user_id == user_id,
                    ReviewItem.node_id == node_id,
                )
            )
        )
        item = result.scalar_one_or_none()
        quality = 4 if is_correct else 1
        today = date.today()
        created = item is None
        if created:
            # concept_name must be human-readable — the queue serializes it
            # to students. Prefer the node's authored title when the caller
            # only passed an internal id.
            name = concept_name
            if not name or name == node_id or name.startswith("c") and "_" in name:
                try:
                    from backend.models.enrichment import EnrichmentContent as _EC

                    ec = (
                        await db.execute(
                            select(_EC.title).where(_EC.node_id == node_id)
                        )
                    ).scalar_one_or_none()
                    if ec:
                        name = ec
                except Exception:
                    pass
            item = ReviewItem(
                user_id=user_id,
                node_id=node_id,
                concept_name=name or "Topic",
                easiness_factor=2.5,
                interval_days=1,
                repetitions=0,
                next_review_date=today + timedelta(days=1),
                review_history=[],
            )
            db.add(item)
            # First sighting already counts as the first review — a wrong
            # answer on first exposure still resurfaces tomorrow; a correct
            # one earns the normal first-rep interval.
        # SM-2 quality update (mirrors submit_review, minus mastery)
        ef = item.easiness_factor
        reps = item.repetitions
        interval = item.interval_days
        ef = ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
        ef = max(SM2_MIN_EF, ef)
        if quality < 3:
            reps = 0
            interval = 1
        else:
            reps += 1
            interval = 1 if reps == 1 else (6 if reps == 2 else round(interval * ef))
        item.easiness_factor = ef
        item.interval_days = interval
        item.repetitions = reps
        item.last_review_date = today
        item.next_review_date = today + timedelta(days=interval)
        # A fresh miss is due TODAY — the queue should surface "review what
        # you just got wrong" same-day rather than hiding it until tomorrow.
        if created and quality < 3:
            item.next_review_date = today
        history = item.review_history or []
        history.append(
            {"date": today.isoformat(), "quality": quality, "source": "practice"}
        )
        item.review_history = history

    @staticmethod
    async def get_review_queue(db: AsyncSession, user_id: str) -> list[ReviewItem]:
        """Return items due for review (next_review_date <= today)."""
        today = date.today()
        result = await db.execute(
            select(ReviewItem).where(
                and_(
                    ReviewItem.user_id == user_id,
                    ReviewItem.next_review_date <= today,
                )
            )
        )
        return list(result.scalars().all())

    @staticmethod
    async def submit_review(db: AsyncSession, user_id: str, data: dict) -> dict:
        """Submit a review answer and update the SM-2 schedule.

        Expected ``data`` keys: ``item_id``, ``quality`` (0-5),
        ``response_time_seconds`` (optional).
        """
        item_id = data.get("item_id")
        quality = int(data.get("quality", 3))
        quality = max(0, min(5, quality))

        result = await db.execute(
            select(ReviewItem).where(
                and_(
                    ReviewItem.id == item_id,
                    ReviewItem.user_id == user_id,
                )
            )
        )
        item = result.scalar_one_or_none()
        if item is None:
            raise ValueError("Review item not found")

        # SM-2 algorithm
        ef = item.easiness_factor
        reps = item.repetitions
        interval = item.interval_days

        # Update easiness factor
        ef = ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
        ef = max(SM2_MIN_EF, ef)

        if quality < 3:
            # Failed — reset repetitions
            reps = 0
            interval = 1
        else:
            reps += 1
            if reps == 1:
                interval = 1
            elif reps == 2:
                interval = 6
            else:
                interval = round(interval * ef)

        today = date.today()
        next_review = today + timedelta(days=interval)

        # Update review history
        history = item.review_history or []
        history.append(
            {
                "date": today.isoformat(),
                "quality": quality,
                "response_time_seconds": data.get("response_time_seconds"),
            }
        )

        item.easiness_factor = ef
        item.interval_days = interval
        item.repetitions = reps
        item.last_review_date = today
        item.next_review_date = next_review
        item.review_history = history

        await db.flush()

        # Update mastery
        is_correct = quality >= 3
        updated_mastery = await ProgressService.update_mastery_bkt(
            db, user_id, item.node_id, is_correct
        )

        # Award XP
        xp = 5 if is_correct else 1
        await ProgressService.award_xp(db, user_id, xp)

        return {
            "updated_interval": interval,
            "updated_easiness": ef,
            "next_review_date": next_review.isoformat(),
            "updated_mastery": updated_mastery,
        }

    @staticmethod
    async def get_review_stats(db: AsyncSession, user_id: str) -> dict:
        """Return review statistics for the user."""
        result = await db.execute(
            select(ReviewItem).where(ReviewItem.user_id == user_id)
        )
        items = list(result.scalars().all())
        today = date.today()

        due_count = sum(1 for i in items if i.next_review_date and i.next_review_date <= today)
        total_reviews = sum(len(i.review_history or []) for i in items)

        return {
            "total_items": len(items),
            "due_today": due_count,
            "total_reviews": total_reviews,
            "avg_easiness": (
                sum(i.easiness_factor for i in items) / len(items)
                if items
                else 2.5
            ),
        }

    # ================================================================== #
    # Offline content
    # ================================================================== #
    @staticmethod
    async def get_offline_content(db: AsyncSession, user_id: str) -> list[dict]:
        """Return content bundles marked as offline-available for the user.

        Currently returns all bundles with ``is_offline_available=True``,
        joined with their node info.
        """
        result = await db.execute(
            select(ContentBundle, KnowledgeNodeModel)
            .join(KnowledgeNodeModel, ContentBundle.node_id == KnowledgeNodeModel.id)
            .where(ContentBundle.is_offline_available == True)  # noqa: E712
        )
        rows = result.all()

        return [
            {
                "id": str(bundle.id),
                "node_id": node.node_id,
                "node_label": node.label,
                "content_type": bundle.content_type,
                "file_size_mb": bundle.file_size_mb,
                "is_offline_available": bundle.is_offline_available,
            }
            for bundle, node in rows
        ]

    @staticmethod
    async def download_content(
        db: AsyncSession, user_id: str, node_id: str
    ) -> dict:
        """Mark a node's content bundles as offline-available."""
        node = await ContentService.get_node(db, node_id)
        result = await db.execute(
            select(ContentBundle).where(ContentBundle.node_id == node.id)
        )
        bundles = list(result.scalars().all())

        for bundle in bundles:
            bundle.is_offline_available = True

        await db.flush()

        return {
            "node_id": node_id,
            "node_label": node.label,
            "bundles_marked": len(bundles),
            "message": f"Content for '{node.label}' is now available offline.",
        }

    @staticmethod
    async def remove_offline_content(
        db: AsyncSession, user_id: str, node_id: str
    ) -> dict:
        """Remove the offline-available flag from a node's content bundles."""
        node = await ContentService.get_node(db, node_id)
        result = await db.execute(
            select(ContentBundle).where(ContentBundle.node_id == node.id)
        )
        bundles = list(result.scalars().all())

        for bundle in bundles:
            bundle.is_offline_available = False

        await db.flush()

        return {
            "node_id": node_id,
            "node_label": node.label,
            "bundles_removed": len(bundles),
            "message": f"Offline content for '{node.label}' has been removed.",
        }

    # ================================================================== #
    # XP, streak, activity logging
    # ================================================================== #
    @staticmethod
    async def award_xp(db: AsyncSession, user_id: str, amount: int) -> User:
        """Add XP to the user and update their level.

        Level = floor(total_xp / 100) + 1
        """
        result = await db.execute(select(User).where(User.id == user_id))
        user = result.scalar_one_or_none()
        if user is None:
            raise ValueError("User not found")

        user.total_xp = (user.total_xp or 0) + amount
        user.current_level = math.floor(user.total_xp / XP_PER_LEVEL) + 1
        user.updated_at = datetime.now(timezone.utc)

        await db.flush()
        await db.refresh(user)
        return user

    @staticmethod
    async def update_streak(db: AsyncSession, user_id: str) -> User:
        """Update the user's daily streak.

        - If last_activity_date is yesterday → streak++
        - If last_activity_date is today → no change
        - If last_activity_date is older or None → reset to 1
        """
        from backend.models.achievement import StreakRecord

        result = await db.execute(select(User).where(User.id == user_id))
        user = result.scalar_one_or_none()
        if user is None:
            raise ValueError("User not found")

        today = date.today()
        yesterday = today - timedelta(days=1)
        last = user.last_activity_date

        if last is None or last < yesterday:
            user.streak_days = 1
        elif last == yesterday:
            user.streak_days = (user.streak_days or 0) + 1
        # else: last == today → no change

        user.last_activity_date = today

        # Upsert streak record for today
        streak_result = await db.execute(
            select(StreakRecord).where(
                and_(
                    StreakRecord.user_id == user_id,
                    StreakRecord.date == today,
                )
            )
        )
        streak_rec = streak_result.scalar_one_or_none()
        if streak_rec is None:
            streak_rec = StreakRecord(
                user_id=user_id,
                date=today,
                completed=True,
                activities_count=1,
            )
            db.add(streak_rec)
        else:
            streak_rec.completed = True
            streak_rec.activities_count += 1

        await db.flush()
        await db.refresh(user)
        return user

    @staticmethod
    async def log_activity(
        db: AsyncSession,
        user_id: str,
        activity_type: str,
        title: str,
        subject: Optional[str] = None,
        score: Optional[str] = None,
        metadata: Optional[dict] = None,
    ) -> ActivityLog:
        """Create an activity log entry."""
        log = ActivityLog(
            user_id=user_id,
            activity_type=activity_type,
            title=title,
            subject=subject,
            score=score,
            # NOTE: the column attr is `extra_data` (mapped to the DB
            # "metadata" column). Passing `metadata=` would silently set
            # SQLAlchemy's declarative MetaData attribute and drop the data.
            extra_data=metadata or {},
        )
        db.add(log)
        await db.flush()
        await db.refresh(log)
        return log