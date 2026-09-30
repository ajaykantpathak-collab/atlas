#!/usr/bin/env python3
"""Live check that the generic lane is actually reachable from the tutor.

Proves the wiring end-to-end WITHOUT a server: calls the real
TutorService.quick_question and asserts the new layer answers. Kept out of
pytest because importing tutor_service pulls the heavy chain (see pytest.ini).

Usage: python scripts/verify_tutor_wiring.py
"""
from __future__ import annotations

import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

CASES = [
    ("Solve for x: 2x + 8 = 16.", "4", "generic_expression"),
    ("Find the value of the polynomial 2x^2 + 2x + 6 at x = 3.", "30",
     "generic_expression"),
]

# The post-routing lane reads `import os as _os`, which is function-local and
# sits inside a conditional. A conversational message skips that block, so this
# case is the regression test for UnboundLocalError.
CONVERSATIONAL = ["hi", "hello", "hey", "thanks", "ok", "bye"]


def main() -> int:
    t0 = time.time()
    from backend.services.tutor_service import TutorService
    print(f"imported TutorService in {time.time() - t0:.1f}s")

    failures = 0
    for question, expected, expect_method in CASES:
        # db=None on purpose: the generic layer must answer before any layer
        # that needs a session. If it does not, the call falls through and
        # this assertion fails — which is exactly the signal we want.
        # quick_question is async, so it must be awaited.
        import asyncio
        result = asyncio.run(
            TutorService.quick_question(None, question)
        )
        got = str((result or {}).get("answer", ""))
        method = (result or {}).get("method")
        ok = expected in got and method == expect_method
        print(f"  {'OK  ' if ok else 'FAIL'} {question!r}")
        print(f"       method={method!r} answer={got[:70]!r}")
        if not ok:
            failures += 1

    # A question the generic lane cannot handle must still be answered by the
    # existing funnel, NOT crash and NOT return nothing.
    import asyncio
    result = asyncio.run(
        TutorService.quick_question(None, "Tell me about the French Revolution")
    )
    print(f"  passthrough: method={result.get('method')!r} "
          f"has_answer={bool(result.get('answer'))}")
    if not result.get("answer"):
        failures += 1
        print("  FAIL: non-generic question lost its answer")

    # Conversational input skips the Layer -1 block, so it is the case that
    # catches an unbound `_os` in the post-routing lane.
    for greeting in CONVERSATIONAL:
        try:
            asyncio.run(TutorService.quick_question(None, greeting))
        except Exception as exc:
            failures += 1
            print(f"  FAIL  conversational {greeting!r} raised "
                  f"{type(exc).__name__}: {exc}")
            break
    else:
        print(f"  OK   {len(CONVERSATIONAL)} conversational inputs, no exception")

    print("\nWIRING OK" if not failures else f"\n{failures} WIRING FAILURE(S)")
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
