"""prompt_registry.py — versioned renderer prompts with effectiveness tracking.

Renderers (claude_renderer, gemma_renderer) currently use static prompts.
Without versioning there is nothing to evolve — a prompt that produces
confusing explanations stays in production forever because nobody can tell
it apart from a good one.

This module gives every agent's prompt a lineage:

    PromptVersion(text, version_id, parent_id, effectiveness_stats)
        -> registry keyed by (agent_name, purpose)
        -> cohort assignment: which students see which version
        -> outcome recording: mastery_gain per version
        -> promotion: version beats incumbent with confidence -> becomes active

Evolution model:
  * The incumbent serves ~80% of traffic; challengers share the remaining 20%
    (epsilon-greedy exploration — simple, predictable, auditable)
  * A challenger is promoted when its mean mastery_gain beats the incumbent
    by >= PROMOTE_MARGIN over >= MIN_OBSERVATIONS observations
  * Retired versions are kept for rollback

Persistence: JSON under _cache/prompt_registry.json (same pattern as
spiral_service — survives restarts, no DB migration needed).
"""

from __future__ import annotations

import json
import logging
import os
import random
import uuid
from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Any, Optional

logger = logging.getLogger(__name__)

_CACHE_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "_cache")
_REGISTRY_PATH = os.path.join(_CACHE_DIR, "prompt_registry.json")

EXPLORE_RATE = 0.20          # 20% of traffic sees challengers
MIN_OBSERVATIONS = 50        # outcomes before a version can be judged
PROMOTE_MARGIN = 0.05        # challenger must beat incumbent by >= 5% gain


# ---------------------------------------------------------------------------
# Data
# ---------------------------------------------------------------------------

@dataclass
class PromptVersion:
    version_id: str
    text: str
    parent_id: Optional[str] = None
    status: str = "challenger"          # active | challenger | retired
    created_at: str = ""
    observations: int = 0
    total_gain: float = 0.0
    gains: list[float] = field(default_factory=list, repr=False)

    @property
    def mean_gain(self) -> float:
        return self.total_gain / self.observations if self.observations else 0.0


@dataclass
class PromptSlot:
    """All versions competing for one (agent, purpose) pair."""
    agent_name: str
    purpose: str                         # e.g. "scaffold_hint", "feedback_wrap"
    versions: dict[str, PromptVersion] = field(default_factory=dict)
    active_id: str = ""

    def active(self) -> Optional[PromptVersion]:
        return self.versions.get(self.active_id)

    def challengers(self) -> list[PromptVersion]:
        return [v for v in self.versions.values() if v.status == "challenger"]


# ---------------------------------------------------------------------------
# Registry
# ---------------------------------------------------------------------------

class PromptRegistry:
    """Versioned prompt store with exploration and promotion."""

    def __init__(self, path: str = _REGISTRY_PATH):
        self._path = path
        self._slots: dict[tuple, PromptSlot] = {}
        self._load()

    # -- registration ----------------------------------------------------

    def register(self, agent_name: str, purpose: str, text: str,
                 make_active: bool = True) -> PromptVersion:
        slot = self._slots.setdefault((agent_name, purpose),
                                      PromptSlot(agent_name, purpose))
        v = PromptVersion(
            version_id=f"pv_{uuid.uuid4().hex[:12]}",
            text=text,
            status="active" if make_active else "challenger",
            created_at=datetime.now(timezone.utc).isoformat(),
        )
        slot.versions[v.version_id] = v
        if make_active or not slot.active_id:
            if slot.active_id in slot.versions:
                slot.versions[slot.active_id].status = "retired"
            slot.active_id = v.version_id
        self._save()
        return v

    def add_challenger(self, agent_name: str, purpose: str, text: str) -> PromptVersion:
        """Register a mutated/LLM-written challenger (never auto-active)."""
        slot = self._slots.get((agent_name, purpose))
        parent = slot.active_id if slot else None
        v = self.register(agent_name, purpose, text, make_active=False)
        v.parent_id = parent
        self._save()
        return v

    # -- serving -----------------------------------------------------------

    def pick(self, agent_name: str, purpose: str) -> Optional[PromptVersion]:
        """Choose which version serves this request (epsilon-greedy)."""
        slot = self._slots.get((agent_name, purpose))
        if slot is None:
            return None
        challengers = slot.challengers()
        if challengers and random.random() < EXPLORE_RATE:
            return random.choice(challengers)
        return slot.active()

    # -- outcome recording --------------------------------------------------

    def record_outcome(self, agent_name: str, purpose: str,
                       version_id: str, mastery_gain: float) -> None:
        slot = self._slots.get((agent_name, purpose))
        if slot is None or version_id not in slot.versions:
            return
        v = slot.versions[version_id]
        v.observations += 1
        v.total_gain += mastery_gain
        v.gains.append(mastery_gain)
        self._maybe_promote(slot, v)
        self._save()

    def _maybe_promote(self, slot: PromptSlot, challenger: PromptVersion) -> None:
        incumbent = slot.active()
        if incumbent is None or challenger.status != "challenger":
            return
        if challenger.observations < MIN_OBSERVATIONS:
            return
        if incumbent.observations < MIN_OBSERVATIONS:
            return  # need comparable evidence both ways
        if challenger.mean_gain >= incumbent.mean_gain + PROMOTE_MARGIN:
            logger.info("prompt_registry: promoting %s over %s for %s/%s "
                        "(%.3f vs %.3f)", challenger.version_id,
                        incumbent.version_id, slot.agent_name, slot.purpose,
                        challenger.mean_gain, incumbent.mean_gain)
            incumbent.status = "retired"
            challenger.status = "active"
            slot.active_id = challenger.version_id
        elif challenger.mean_gain <= incumbent.mean_gain - PROMOTE_MARGIN:
            challenger.status = "retired"   # clearly worse — stop spending traffic

    # -- persistence ----------------------------------------------------------

    def _load(self) -> None:
        try:
            with open(self._path, encoding="utf-8") as f:
                raw = json.load(f)
            for key, sd in raw.items():
                agent, purpose = key.split("|", 1)
                slot = PromptSlot(agent, purpose, active_id=sd.get("active_id", ""))
                for vid, vd in sd.get("versions", {}).items():
                    slot.versions[vid] = PromptVersion(
                        version_id=vd["version_id"], text=vd["text"],
                        parent_id=vd.get("parent_id"), status=vd.get("status", "challenger"),
                        created_at=vd.get("created_at", ""),
                        observations=vd.get("observations", 0),
                        total_gain=vd.get("total_gain", 0.0),
                        gains=vd.get("gains", [])[-200:],  # cap stored history
                    )
                self._slots[(agent, purpose)] = slot
        except (OSError, json.JSONDecodeError):
            pass

    def _save(self) -> None:
        os.makedirs(os.path.dirname(self._path), exist_ok=True)
        raw = {}
        for (agent, purpose), slot in self._slots.items():
            raw[f"{agent}|{purpose}"] = {
                "active_id": slot.active_id,
                "versions": {
                    vid: {**{k: getattr(v, k) for k in
                             ("version_id", "text", "parent_id", "status",
                              "created_at", "observations", "total_gain")},
                          "gains": v.gains[-200:]}
                    for vid, v in slot.versions.items()
                },
            }
        try:
            with open(self._path, "w", encoding="utf-8") as f:
                json.dump(raw, f)
        except OSError:
            logger.warning("prompt_registry: save failed")

    # -- introspection --------------------------------------------------------

    def leaderboard(self, agent_name: str, purpose: str) -> list[dict]:
        slot = self._slots.get((agent_name, purpose))
        if slot is None:
            return []
        rows = [{
            "version_id": v.version_id, "status": v.status,
            "observations": v.observations, "mean_gain": round(v.mean_gain, 4),
        } for v in slot.versions.values()]
        return sorted(rows, key=lambda r: -r["mean_gain"])
