"""Trace what breaks yaml during solver registry initialization."""
import sys, os, importlib.util
from pathlib import Path

sys.path.insert(0, '.')
os.environ['DATABASE_URL'] = 'postgresql+asyncpg://dream_user:dream_secure_2024@localhost:5432/dream_app'

import yaml
print(f"Before solvers: yaml.safe_load = {hasattr(yaml, 'safe_load')}")
print(f"yaml module: {sys.modules.get('yaml')}")
print(f"yaml file: {getattr(sys.modules.get('yaml'), '__file__', 'NO FILE')}")

solvers_dir = Path('solvers')
broken = False
for subject_dir in sorted(solvers_dir.iterdir()):
    if not subject_dir.is_dir() or subject_dir.name.startswith('_'):
        continue
    for pyfile in sorted(subject_dir.glob('class*_*.py')):
        if pyfile.name.startswith('_'):
            continue
        stem = pyfile.stem
        if not (stem.endswith('_solver') or stem.endswith('_questions')):
            continue

        # Check yaml before each import
        y = sys.modules.get('yaml')
        if y and not hasattr(y, 'safe_load'):
            print(f"\n*** yaml broken BEFORE importing {stem} ***")
            print(f"    yaml module: {y}")
            print(f"    yaml file: {getattr(y, '__file__', 'NO FILE')}")
            print(f"    yaml attrs: {[a for a in dir(y) if not a.startswith('_')][:10]}")
            # Find what's in sys.modules with 'yaml'
            for k, v in list(sys.modules.items()):
                if 'yaml' in k.lower():
                    print(f"    sys.modules['{k}'] = {v}")
            broken = True
            break

        # Insert parent dir into sys.path like the registry does
        parent_dir = str(pyfile.parent)
        if parent_dir not in sys.path:
            sys.path.insert(0, parent_dir)

        try:
            mod_name = f'solvers._plugins.{stem}'
            spec = importlib.util.spec_from_file_location(mod_name, pyfile)
            mod = importlib.util.module_from_spec(spec)
            sys.modules[mod_name] = mod
            spec.loader.exec_module(mod)
        except Exception as e:
            if 'yaml' in str(e):
                print(f"\n*** yaml error at {stem}: {e} ***")
                y = sys.modules.get('yaml')
                print(f"    yaml module after error: {y}")
                print(f"    yaml file: {getattr(y, '__file__', 'NO FILE')}")
                print(f"    yaml attrs: {[a for a in dir(y) if not a.startswith('_')][:10]}")
                for k, v in list(sys.modules.items()):
                    if 'yaml' in k.lower():
                        print(f"    sys.modules['{k}'] = {v}")
                broken = True
                break
    if broken:
        break

if not broken:
    print("\nNo yaml breakage detected!")
