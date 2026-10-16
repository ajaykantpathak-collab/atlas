import sys
sys.path.insert(0, "/app")
from backend.main import app

ready = [r.path for r in app.routes if "ready" in getattr(r, "path", "")]
print("ready routes in loaded app:", ready)
print("total routes:", len(app.routes))
