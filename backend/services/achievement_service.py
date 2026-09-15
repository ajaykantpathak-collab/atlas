"""Achievement service for the DREAM_APP educational platform.

Handles achievement listing, detail, stats, unlock checking, and
seeding of default achievements.
"""

import math
from datetime import datetime, timezone
from typing import Optional

from sqlalchemy import select, func, and_
from sqlalchemy.ext.asyncio import AsyncSession

from backend.models.achievement import Achievement, UserAchievement
from backend.models.assessment import ExamAttempt
from backend.models.progress import ActivityLog, MasteryRecord, StudySession
from backend.models.user import User

# Default achievements to seed
DEFAULT_ACHIEVEMENTS: list[dict] = [
    {
        "achievement_id": "first_lesson",
        "title": "First Steps",
        "description": "Complete your first lesson",
        "icon_name": "footprints",
        "tier": "bronze",
        "xp_reward": 50,
        "max_progress": 1,
    },
    {
        "achievement_id": "quiz_master_10",
        "title": "Quiz Novice",
        "description": "Answer 10 quiz questions correctly",
        "icon_name": "help-circle",
        "tier": "bronze",
        "xp_reward": 100,
        "max_progress": 10,
    },
    {
        "achievement_id": "quiz_master_50",
        "title": "Quiz Master",
        "description": "Answer 50 quiz questions correctly",
        "icon_name": "award",
        "tier": "silver",
        "xp_reward": 250,
        "max_progress": 50,
    },
    {
        "achievement_id": "streak_7",
        "title": "Week Warrior",
        "description": "Maintain a 7-day streak",
        "icon_name": "flame",
        "tier": "bronze",
        "xp_reward": 100,
        "max_progress": 7,
    },
    {
        "achievement_id": "streak_30",
        "title": "Monthly Dedication",
        "description": "Maintain a 30-day streak",
        "icon_name": "flame",
        "tier": "silver",
        "xp_reward": 500,
        "max_progress": 30,
    },
    {
        "achievement_id": "xp_500",
        "title": "Rising Star",
        "description": "Earn 500 XP",
        "icon_name": "star",
        "tier": "bronze",
        "xp_reward": 50,
        "max_progress": 500,
    },
    {
        "achievement_id": "xp_2000",
        "title": "XP Hunter",
        "description": "Earn 2000 XP",
        "icon_name": "zap",
        "tier": "silver",
        "xp_reward": 200,
        "max_progress": 2000,
    },
    {
        "achievement_id": "exam_first",
        "title": "Exam Pioneer",
        "description": "Complete your first exam",
        "icon_name": "file-text",
        "tier": "bronze",
        "xp_reward": 100,
        "max_progress": 1,
    },
    {
        "achievement_id": "exam_topper",
        "title": "Exam Topper",
        "description": "Score 90% or above on an exam",
        "icon_name": "trophy",
        "tier": "gold",
        "xp_reward": 300,
        "max_progress": 1,
    },
    {
        "achievement_id": "mastery_10",
        "title": "Concept Builder",
        "description": "Master 10 knowledge nodes",
        "icon_name": "brain",
        "tier": "silver",
        "xp_reward": 200,
        "max_progress": 10,
    },
    {
        "achievement_id": "tutor_session",
        "title": "Socratic Learner",
        "description": "Complete a tutor session",
        "icon_name": "message-circle",
        "tier": "bronze",
        "xp_reward": 50,
        "max_progress": 1,
    },
    {
        "achievement_id": "review_50",
        "title": "Review Champion",
        "description": "Complete 50 spaced-repetition reviews",
        "icon_name": "refresh-cw",
        "tier": "silver",
        "xp_reward": 200,
        "max_progress": 50,
    },
]


class AchievementService:
    """Achievement and gamification service."""

    # ------------------------------------------------------------------ #
    # Listing & detail
    # ------------------------------------------------------------------ #
    @staticmethod
    async def get_achievements(
        db: AsyncSession, user_id: str, filter: Optional[str] = None
    ) -> dict:
        """Return all achievements with the user's unlock status.

        ``filter`` can be ``"unlocked"``, ``"locked"``, or ``None`` (all).
        """
        # Ensure achievements are seeded
        await AchievementService.seed_achievements(db)

        result = await db.execute(select(Achievement))
        all_achievements = list(result.scalars().all())

        # Fetch user's achievement records
        ua_result = await db.execute(
            select(UserAchievement).where(UserAchievement.user_id == user_id)
        )
        ua_map: dict[str, UserAchievement] = {
            str(ua.achievement_id): ua for ua in ua_result.scalars().all()
        }

        achievements = []
        unlocked_count = 0
        total_xp = 0

        for achievement in all_achievements:
            ua = ua_map.get(str(achievement.id))
            unlocked = ua.unlocked if ua else False
            progress = ua.progress if ua else 0
            unlocked_at = ua.unlocked_at.isoformat() if ua and ua.unlocked_at else None

            if filter == "unlocked" and not unlocked:
                continue
            if filter == "locked" and unlocked:
                continue

            if unlocked:
                unlocked_count += 1
                total_xp += achievement.xp_reward

            achievements.append(
                {
                    "id": str(achievement.id),
                    "achievement_id": achievement.achievement_id,
                    "title": achievement.title,
                    "description": achievement.description or "",
                    "icon_name": achievement.icon_name or "",
                    "tier": achievement.tier,
                    "xp_reward": achievement.xp_reward,
                    "unlocked": unlocked,
                    "unlocked_at": unlocked_at,
                    "progress": progress,
                    "max_progress": achievement.max_progress,
                }
            )

        return {
            "achievements": achievements,
            "unlocked_count": unlocked_count,
            "total_xp": total_xp,
        }

    @staticmethod
    async def get_achievement(
        db: AsyncSession, user_id: str, achievement_id: str
    ) -> dict:
        """Return a single achievement with the user's progress.

        ``achievement_id`` can be either the UUID ``id`` or the string
        ``achievement_id`` field.
        """
        await AchievementService.seed_achievements(db)

        # Try by string achievement_id first, then by UUID
        result = await db.execute(
            select(Achievement).where(
                Achievement.achievement_id == achievement_id
            )
        )
        achievement = result.scalar_one_or_none()

        if achievement is None:
            result = await db.execute(
                select(Achievement).where(Achievement.id == achievement_id)
            )
            achievement = result.scalar_one_or_none()

        if achievement is None:
            raise ValueError(f"Achievement '{achievement_id}' not found")

        ua_result = await db.execute(
            select(UserAchievement).where(
                and_(
                    UserAchievement.user_id == user_id,
                    UserAchievement.achievement_id == achievement.id,
                )
            )
        )
        ua = ua_result.scalar_one_or_none()

        return {
            "id": str(achievement.id),
            "achievement_id": achievement.achievement_id,
            "title": achievement.title,
            "description": achievement.description or "",
            "icon_name": achievement.icon_name or "",
            "tier": achievement.tier,
            "xp_reward": achievement.xp_reward,
            "unlocked": ua.unlocked if ua else False,
            "unlocked_at": ua.unlocked_at.isoformat() if ua and ua.unlocked_at else None,
            "progress": ua.progress if ua else 0,
            "max_progress": achievement.max_progress,
        }

    # ------------------------------------------------------------------ #
    # Stats
    # ------------------------------------------------------------------ #
    @staticmethod
    async def get_stats(db: AsyncSession, user_id: str) -> dict:
        """Return achievement statistics for the user."""
        data = await AchievementService.get_achievements(db, user_id)
        total = len(data["achievements"])
        unlocked = data["unlocked_count"]

        # Tier breakdown
        tier_counts: dict[str, dict] = {}
        for ach in data["achievements"]:
            tier = ach["tier"]
            if tier not in tier_counts:
                tier_counts[tier] = {"total": 0, "unlocked": 0}
            tier_counts[tier]["total"] += 1
            if ach["unlocked"]:
                tier_counts[tier]["unlocked"] += 1

        return {
            "total_achievements": total,
            "unlocked_count": unlocked,
            "completion_percentage": int((unlocked / total * 100)) if total > 0 else 0,
            "total_xp_from_achievements": data["total_xp"],
            "tier_breakdown": tier_counts,
        }

    # ------------------------------------------------------------------ #
    # Unlock checking
    # ------------------------------------------------------------------ #
    @staticmethod
    async def check_and_unlock(db: AsyncSession, user_id: str) -> list[dict]:
        """Check all achievements for unlock conditions.

        Evaluates progress for each achievement based on user activity
        and unlocks any that meet their criteria.  Returns a list of
        newly-unlocked achievement dicts.
        """
        await AchievementService.seed_achievements(db)

        # Gather user stats for evaluation
        user_result = await db.execute(select(User).where(User.id == user_id))
        user = user_result.scalar_one_or_none()
        if user is None:
            raise ValueError("User not found")

        # Quiz correct count
        quiz_result = await db.execute(
            select(func.count(ActivityLog.id)).where(
                and_(
                    ActivityLog.user_id == user_id,
                    ActivityLog.activity_type == "quiz",
                    ActivityLog.score == "correct",
                )
            )
        )
        quiz_correct = quiz_result.scalar() or 0

        # Exam attempts
        exam_result = await db.execute(
            select(func.count(ExamAttempt.id)).where(
                ExamAttempt.user_id == user_id
            )
        )
        exam_count = exam_result.scalar() or 0

        # Best exam percentage
        best_exam_result = await db.execute(
            select(func.max(ExamAttempt.percentage)).where(
                ExamAttempt.user_id == user_id
            )
        )
        best_exam_pct = best_exam_result.scalar() or 0.0

        # Mastered nodes (mastery >= 0.8)
        mastery_result = await db.execute(
            select(func.count(MasteryRecord.id)).where(
                and_(
                    MasteryRecord.user_id == user_id,
                    MasteryRecord.mastery_probability >= 0.8,
                )
            )
        )
        mastered_nodes = mastery_result.scalar() or 0

        # Study sessions
        session_result = await db.execute(
            select(func.count(StudySession.id)).where(
                StudySession.user_id == user_id
            )
        )
        session_count = session_result.scalar() or 0

        # Review count (from review activity logs)
        review_result = await db.execute(
            select(func.count(ActivityLog.id)).where(
                and_(
                    ActivityLog.user_id == user_id,
                    ActivityLog.activity_type == "review",
                )
            )
        )
        review_count = review_result.scalar() or 0

        # Lesson count (from lesson activity logs)
        lesson_result = await db.execute(
            select(func.count(ActivityLog.id)).where(
                and_(
                    ActivityLog.user_id == user_id,
                    ActivityLog.activity_type == "lesson",
                )
            )
        )
        lesson_count = lesson_result.scalar() or 0

        # Build a progress map keyed by achievement_id
        progress_map: dict[str, int] = {
            "first_lesson": lesson_count,
            "quiz_master_10": quiz_correct,
            "quiz_master_50": quiz_correct,
            "streak_7": user.streak_days or 0,
            "streak_30": user.streak_days or 0,
            "xp_500": user.total_xp or 0,
            "xp_2000": user.total_xp or 0,
            "exam_first": exam_count,
            "exam_topper": 1 if best_exam_pct >= 90 else 0,
            "mastery_10": mastered_nodes,
            "tutor_session": session_count,
            "review_50": review_count,
        }

        # Fetch all achievements
        result = await db.execute(select(Achievement))
        all_achievements = list(result.scalars().all())

        # Fetch or create user achievement records
        ua_result = await db.execute(
            select(UserAchievement).where(UserAchievement.user_id == user_id)
        )
        ua_map: dict[str, UserAchievement] = {
            str(ua.achievement_id): ua for ua in ua_result.scalars().all()
        }

        newly_unlocked: list[dict] = []
        now = datetime.now(timezone.utc)

        for achievement in all_achievements:
            ua = ua_map.get(str(achievement.id))
            if ua is not None and ua.unlocked:
                continue  # already unlocked

            current_progress = progress_map.get(achievement.achievement_id, 0)
            max_progress = achievement.max_progress or 1
            clamped_progress = min(current_progress, max_progress)

            if ua is None:
                ua = UserAchievement(
                    user_id=user_id,
                    achievement_id=achievement.id,
                    unlocked=False,
                    progress=0,
                )
                db.add(ua)

            ua.progress = clamped_progress

            if clamped_progress >= max_progress and not ua.unlocked:
                ua.unlocked = True
                ua.unlocked_at = now

                # Award XP
                user.total_xp = (user.total_xp or 0) + achievement.xp_reward
                user.current_level = math.floor(user.total_xp / 100) + 1

                newly_unlocked.append(
                    {
                        "id": str(achievement.id),
                        "achievement_id": achievement.achievement_id,
                        "title": achievement.title,
                        "description": achievement.description or "",
                        "icon_name": achievement.icon_name or "",
                        "tier": achievement.tier,
                        "xp_reward": achievement.xp_reward,
                        "unlocked": True,
                        "unlocked_at": now.isoformat(),
                        "progress": clamped_progress,
                        "max_progress": achievement.max_progress,
                    }
                )

        if newly_unlocked:
            await db.flush()

        return newly_unlocked

    # ------------------------------------------------------------------ #
    # Seeding
    # ------------------------------------------------------------------ #
    @staticmethod
    async def seed_achievements(db: AsyncSession) -> None:
        """Create default achievements if they don't already exist."""
        result = await db.execute(select(Achievement))
        existing = {a.achievement_id for a in result.scalars().all()}

        for ach_data in DEFAULT_ACHIEVEMENTS:
            if ach_data["achievement_id"] not in existing:
                achievement = Achievement(
                    achievement_id=ach_data["achievement_id"],
                    title=ach_data["title"],
                    description=ach_data["description"],
                    icon_name=ach_data["icon_name"],
                    tier=ach_data["tier"],
                    xp_reward=ach_data["xp_reward"],
                    max_progress=ach_data["max_progress"],
                )
                db.add(achievement)

        await db.flush()