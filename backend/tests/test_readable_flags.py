"""
Gate A wiring guards for the review-queue and badge read paths.

These are SOURCE guards, not behavioural tests: `routers/progress.py` and
`api/dashboard.py` pull in the heavy service/model graph, which cannot be
imported under pytest on this box (see pytest.ini). The pure maths behind the
other metrics is covered behaviourally in test_honesty_metrics.py; here the risk
is a *read path regressing to a plausible substitute*, so the assertions pin the
exact source shape that prevents that.

Two defects are pinned:

1. `if not resp.retention_rate:` overwrote a GENUINE 0% retention with
   `accuracy * 100` — substituting a different, usually more flattering
   measurement for a real one.
2. The achievements endpoint returned an empty payload when BOTH read paths
   failed, so a child saw "0 badges earned" instead of "we could not load".
"""

from __future__ import annotations

import pathlib

_ROOT = pathlib.Path(__file__).resolve().parent.parent.parent
_BACKEND = pathlib.Path(__file__).resolve().parent.parent


def _read(rel: str) -> str:
    return (_ROOT / rel).read_text(encoding="utf-8")


class TestReviewStatsAreNotSubstituted:
    def test_retention_and_streak_default_to_none_not_zero(self):
        src = _read("backend/routers/progress.py")
        assert "retention_rate: Optional[float] = None" in src
        assert "streak: Optional[int] = None" in src
        # The old zero defaults are the thing being guarded against.
        assert "retention_rate: float = 0.0" not in src

    def test_derivation_is_is_none_not_a_falsy_check(self):
        """A real 0 must survive; only an absent value may be derived."""
        src = _read("backend/routers/progress.py")
        endpoint = src.split('"/review/stats"', 1)[1]
        endpoint = endpoint.split("@router.", 1)[0]
        assert "if resp.retention_rate is None" in endpoint
        assert "if not resp.retention_rate" not in endpoint
        assert "if resp.streak is None" in endpoint
        assert "if not resp.streak" not in endpoint

    def test_derivation_also_requires_a_real_source_value(self):
        """None must not become 0 by deriving from an empty accuracy/streak."""
        src = _read("backend/routers/progress.py")
        endpoint = src.split('"/review/stats"', 1)[1].split("@router.", 1)[0]
        assert "is None and resp.accuracy" in endpoint
        assert "is None and resp.streak_days" in endpoint


class TestBadgePayloadIsReadable:
    def test_response_declares_a_readable_flag(self):
        src = _read("backend/api/dashboard.py")
        assert "source_readable: bool" in src

    def test_endpoint_tracks_whether_a_read_actually_succeeded(self):
        src = _read("backend/api/dashboard.py")
        endpoint = src.split('"/student/{student_id}/achievements"', 1)[1]
        endpoint = endpoint.split("\n@router.", 1)[0]
        assert "read_ok = False" in endpoint
        assert "read_ok = True" in endpoint
        assert "source_readable=read_ok" in endpoint

    def test_the_single_real_read_path_sets_the_flag(self):
        """AUDIT FIX 2026-10-05: the endpoint used to have TWO paths — a
        "primary" calling get_earned_achievements() (a method that never
        existed) and a fallback querying columns the achievements table does
        not have — so nothing ever genuinely read. There is now exactly ONE
        path (the real service API the /api/achievements router shares) and
        it is the only thing allowed to set the flag."""
        src = _read("backend/api/dashboard.py")
        endpoint = src.split('"/student/{student_id}/achievements"', 1)[1]
        endpoint = endpoint.split("\n@router.", 1)[0]
        assert endpoint.count("read_ok = True") == 1
        # The one path is the real static service API, filtered to earned.
        assert 'AchievementService.get_achievements(' in endpoint
        assert 'filter="unlocked"' in endpoint


class TestKnownUnresolved:
    def test_review_item_shape_collision_is_still_open(self):
        """Documents a real, still-unfixed drift rather than hiding it.

        `ReviewItem` means three different things: the SM-2 record in
        `types/index.ts` (nodeId/easinessFactor/reviewHistory), the due-review
        projection in `lib/game-engine/analytics/types.ts`
        (topic/daysOverdue/masteryLevel), and a third shape the parked sim files
        expect (`id`/`easeFactor`/`dueDate`). `lib/srs.ts` re-exports the first
        as `SRSItem`, which is why the compiler reports them as mutually
        incompatible.

        NOT fixed here: renaming the game-engine type would change the errors in
        the 60 sim files that are parked by instruction, and would not resolve
        the third shape anyway. Revisit when those files are un-parked.
        """
        srs = _read("frontend/lib/srs.ts")
        engine = _read("frontend/lib/game-engine/analytics/types.ts")
        assert "ReviewItem as SRSItem" in srs
        assert "export interface ReviewItem" in engine
        # The collision is real: the two definitions are not the same shape.
        assert "daysOverdue" in engine
        assert "easinessFactor" not in engine
