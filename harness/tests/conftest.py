import sys
from pathlib import Path

# harness modules import each other flat (common, digest, ...)
HARNESS_DIR = Path(__file__).resolve().parent.parent
if str(HARNESS_DIR) not in sys.path:
    sys.path.insert(0, str(HARNESS_DIR))
