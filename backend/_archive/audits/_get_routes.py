"""Get all content API routes."""
import json, urllib.request
r = urllib.request.urlopen("http://localhost:8000/openapi.json", timeout=10)
data = json.loads(r.read())
for path in sorted(data.get("paths", {}).keys()):
    if "/api/content" in path:
        methods = list(data["paths"][path].keys())
        print(f"{methods} {path}")
