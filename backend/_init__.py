"""Package marker + import bootstrap.

The backend was written with flat imports (``from services.x import ...``,
``from database import ...``) that assume the ``backend/`` directory itself
is on ``sys.path``. This bootstrap makes that true no matter which entry
point is used (``uvicorn backend.main:app``, ``python -m backend.app``, or
``import backend.api.progress`` from the repo root), so every module imports
identically everywhere. Idempotent by design.
"""

import os
import sys

_HERE = os.path.dirname(os.path.abspath(__file__))
if _HERE not in sys.path:
    sys.path.insert(0, _HERE)
