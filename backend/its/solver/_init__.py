"""ITS solver: Python loop + NER + calculus cascade.

IDENTITY BRIDGE (2026-10-06 dig): legacy fallbacks spell submodules
`its.solver.X` while the deploy layout imports them as
`backend.its.solver.X`.  A bare-first import used to materialize a
SECOND module identity — two STRUCTURE_SPECS registries, wave specs
registered into one, computes read from the other (9 KeyErrors in
combined pytest runs).  Here the bare names are FORCE-repointed at the
loaded backend.* modules (a fork has no external identity worth
keeping — that is the bug).  Deliberately no imports here: aliasing
must not re-enter the import machinery."""
import sys as _sys

if __name__.startswith("backend.its."):
    _me = _sys.modules.get(__name__)
    _pkg = __name__.rsplit(".", 1)[0]                       # 'backend.its'
    if _me is not None:
        _sys.modules["its.solver"] = _me
        _sys.modules["its"] = _sys.modules.get(_pkg, _me)
        for _k, _m in list(_sys.modules.items()):
            if _k.startswith("backend.its.") and _m is not None:
                _sys.modules["its." + _k[len("backend.its."):]] = _m
