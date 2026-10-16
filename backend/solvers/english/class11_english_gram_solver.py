"""Class 11 English Grammar solver surface — backed by grammar_engine.

Thin graded wrapper: registers the class-11-appropriate grammar problem
types so subject+grade discovery (english/eng + class11_) reaches them.
"""

from typing import Any, Dict

from grammar_engine import ENGINES, GRADED_TOPICS

_GRADE = 11


def _make(topic: str):
    engine = ENGINES[topic]

    def _run(params=None, **kw):
        payload = dict(params or {})
        payload.update(kw)
        return engine(payload, grade=_GRADE)

    _run.__name__ = f"c11_gram_{topic}"
    return _run


SOLVER_REGISTRY = {f"c11_gram_{t}": _make(t) for t in GRADED_TOPICS[11]}
