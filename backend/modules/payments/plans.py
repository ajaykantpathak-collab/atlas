#!/usr/bin/env python3
"""modules/payments/plans.py — the tier catalog (single source of truth).

Owner pricing strategy (freemium, India-first, Play Store):
  * free    — classes 6-8 full access; classes 9-12 limited to 3 missions/day.
              The free tier is genuinely useful — it is the top of the funnel,
              not a cripple-ware teaser. Never dark-pattern it smaller.
  * scholar — Rs 199/mo: full 9-12 + ALL premium sims.
  * topper  — Rs 399/mo: scholar + examiner-style grading + priority doubts.

Amounts are in PAISE (Razorpay's unit). ``display_price`` is the honest,
GST-inclusive string shown on /pricing. To change pricing at launch, edit
here and redeploy — the /api/payments/plans endpoint reads this table, so
the pricing page can never drift from what the backend will actually charge.
"""
from __future__ import annotations

from typing import Any

TIER_ORDER: dict[str, int] = {"free": 0, "scholar": 1, "topper": 2}

BILLING_CYCLE_DAYS = 30  # one "month" of entitlement, renewal extends from max(now, valid_until)

PLANS: dict[str, dict[str, Any]] = {
    "free": {
        "id": "free",
        "name": "Free",
        "tagline": "Everything a class 6-8 student needs. Forever.",
        "amount_paise": 0,
        "display_price": "Free",
        "display_period": "",
        "features": [
            "Full access for classes 6-8: AI tutor, missions, labs, games",
            "Classes 9-12: 3 missions every day, always",
            "Check-ups and progress passport",
            "Offline PWA — works on flaky connections",
            "No card required, no trial that quietly starts charging",
        ],
        "limits": {"c9_12_missions_per_day": 3},
    },
    "scholar": {
        "id": "scholar",
        "name": "Scholar",
        "tagline": "For class 9-12 students who want the whole syllabus.",
        "amount_paise": 19900,  # Rs 199.00
        "display_price": "Rs 199",
        "display_period": "/month",
        "features": [
            "Everything in Free",
            "Unlimited classes 9-12 missions — every subject, every chapter",
            "All premium sims in the Lab and Commerce playgrounds",
            "Board-question practice bank (253,000+ real questions)",
            "Cancel anytime — access stays on till the month you paid for ends",
        ],
        "limits": {},
    },
    "topper": {
        "id": "topper",
        "name": "Topper",
        "tagline": "Examiner-strict feedback, before the board exam does it for free.",
        "amount_paise": 39900,  # Rs 399.00
        "display_price": "Rs 399",
        "display_period": "/month",
        "features": [
            "Everything in Scholar",
            "Examiner-style grading on written answers (step-marking, not a red X)",
            "Priority doubt queue — your question jumps the line",
            "Exam-ready diagnostics across the full paper pattern",
            "Cancel anytime — same honest rules",
        ],
        "limits": {},
    },
}

PAID_PLAN_IDS = ("scholar", "topper")


def plan_or_none(plan_id: str) -> dict[str, Any] | None:
    return PLANS.get(plan_id)


def is_paid(plan_id: str) -> bool:
    return plan_id in PAID_PLAN_IDS


def tier_at_least(tier: str, minimum: str) -> bool:
    """True when ``tier`` grants at least ``minimum``'s access."""
    return TIER_ORDER.get(tier, 0) >= TIER_ORDER.get(minimum, 99)


def public_plans(configured: bool) -> list[dict[str, Any]]:
    """The catalog shape served by GET /api/payments/plans."""
    out = []
    for pid in ("free", "scholar", "topper"):
        p = PLANS[pid]
        out.append(
            {
                "id": p["id"],
                "name": p["name"],
                "tagline": p["tagline"],
                "amount_paise": p["amount_paise"],
                "display_price": p["display_price"],
                "display_period": p["display_period"],
                "currency": "INR",
                "features": p["features"],
                "popular": pid == "scholar",
            }
        )
    return out
