"""conftest.py -- test-session environment.

The router's per-question time budget exists so production never blocks
on a slow question; a skipped stage degrades to honest guided practice.
Under pytest the same machine is far slower (imports, model warm-up,
parallel agents), which would flap verified answers into guided ones for
timing reasons alone -- so tests run with a generous budget.  Production
default stays 5.0 seconds.
"""

import os

os.environ.setdefault("ROUTER_TIME_BUDGET", "60.0")
