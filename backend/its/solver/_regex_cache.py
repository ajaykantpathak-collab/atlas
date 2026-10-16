"""_regex_cache.py — WS-E/CLOSE CL-10+CL-21: stdlib regex cache guard.

The family-registry sweep compiles ~1,200 DISTINCT pattern strings per stem
(measured: 36,882 compilations / 30 stems in WS-H profile_deterministic).
Two failure modes made that catastrophic:

1. Default re._MAXCACHE = 512 < the ~1,800-pattern vocabulary -> every stem
   recompiles nearly everything (68% of sweep cost).
2. quantulum3.parser lazily imported on the solve path pulls numpy.f2py,
   whose crackfortran.py sets re._MAXCACHE = 50 process-wide -> near-total
   recompilation per stem.

ensure() raises the cache to _MIN and is called (a) at modeling_layer
import so the whole sweep inherits it, and (b) inside parse_quantities
immediately after the lazy quantulum3 import, restoring whatever f2py
shrunk. Compiled objects persist for the process lifetime — one compile
per distinct pattern, total.
"""
import re

_MIN = 8192


def ensure() -> None:
    if getattr(re, "_MAXCACHE", 512) < _MIN:
        re._MAXCACHE = _MIN


ensure()
