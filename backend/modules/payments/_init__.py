#!/usr/bin/env python3
"""modules/payments — Atlas store presence + payments (LEARNING_DESIGN Build B 4+5).

Razorpay integration, TEST-MODE FIRST:

  * No merchant keys exist yet. Every money-touching endpoint degrades to
    ``503 {"detail": "payments not configured"}`` when the Razorpay env vars
    are unset — the product stays fully usable, the pricing page shows the
    waitlist state, and nothing ever half-charges.
  * When keys ARE set they are expected to be Razorpay TEST keys until the
    owner flips to live. The code never branches on test-vs-live: the same
    signature-checked flow runs either way, so the flip is an env change,
    not a code change.

Env vars (all optional until launch):
    RAZORPAY_KEY_ID          e.g. rzp_test_xxxxxxxx
    RAZORPAY_KEY_SECRET      order signature + API basic auth
    RAZORPAY_WEBHOOK_SECRET  webhook X-Razorpay-Signature check (separate
                             secret, set in the Razorpay dashboard)

Tiers (see plans.py): free | scholar (Rs 199/mo) | topper (Rs 399/mo).
"""

from backend.modules.payments.plans import PLANS  # noqa: F401

__all__ = ["PLANS"]
