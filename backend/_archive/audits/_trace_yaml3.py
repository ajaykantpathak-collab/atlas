"""Check what yaml module dask sees during registry init."""
import sys, os, importlib, importlib.util
from pathlib import Path

sys.path.insert(0, '.')
os.environ['DATABASE_URL'] = 'postgresql+asyncpg://dream_user:dream_secure_2024@localhost:5432/dream_app'

# Pre-import yaml to make sure it's in sys.modules
import yaml
print(f"Pre-import: yaml = {sys.modules.get('yaml')}")
print(f"  safe_load = {hasattr(yaml, 'safe_load')}")

# Now simulate what happens: insert solver dirs into sys.path
# and see if yaml gets corrupted
solvers_dir = Path('solvers')

# Insert all solver subject dirs into sys.path (like registry does)
for subject_dir in sorted(solvers_dir.iterdir()):
    if not subject_dir.is_dir() or subject_dir.name.startswith('_'):
        continue
    p = str(subject_dir)
    if p not in sys.path:
        sys.path.insert(0, p)

print(f"\nAfter sys.path manipulation:")
print(f"  yaml = {sys.modules.get('yaml')}")
print(f"  safe_load = {hasattr(sys.modules.get('yaml'), 'safe_load')}")

# Now try to import dask (which pint will do)
print(f"\nTrying to import dask...")
try:
    import dask
    print(f"dask imported OK")
except Exception as e:
    print(f"dask import FAILED: {e}")
    y = sys.modules.get('yaml')
    print(f"  yaml after fail: {y}")
    print(f"  yaml file: {getattr(y, '__file__', 'NONE')}")
    print(f"  yaml attrs: {[a for a in dir(y) if not a.startswith('_')][:10]}")
    # Check if yaml was replaced
    print(f"  yaml id: {id(y)}")
    print(f"  original yaml id: {id(yaml)}")
