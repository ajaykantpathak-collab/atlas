"""misconception_writer.py — promotes discovered error clusters into the catalog.

MetaBrain's discover_misconceptions() finds clusters of identical wrong
answers (concept + error_type + response_pattern) shared by >= 3 students.
Those clusters are raw patterns — they need a name, a description, a
remediation hint, and a severity before misconception_matcher.py can use
them mid-session.

This module is the write path:

    novel cluster (from ApplyLoop action "write_misconception")
        -> build a classification prompt for the LLM
        -> LLM returns {name, description, remediation, severity}
        -> validate against catalog schema
        -> append to the misconception store (JSON under _cache/, same
           pattern as spiral_service) flagged source="discovered"
        -> matcher picks it up next session

Safety:
  * LLM output is validated against a strict schema; malformed entries are
    quarantined, not written
  * dedup on (concept, error_type, response_pattern) — the matcher never
    sees duplicates
  * every discovered misconception carries affected_students + sample_count
    so a human can later audit by impact
"""

from __future__ import annotations

import json
import logging
import os
import re
from dataclasses import dataclass, field
from typing import Any, Optional

logger = logging.getLogger(__name__)

_CACHE_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "_cache")
_CATALOG_PATH = os.path.join(_CACHE_DIR, "misconceptions_discovered.json")

_CLASSIFY_PROMPT = """You are a learning-science classifier for a K-12 tutoring system.

A nightly mining job found this recurring wrong-answer pattern across students:

  Concept:          {concept}
  Error type:       {error_type}
  Response pattern: {response_pattern}
  Affected:         {affected_students} students ({sample_events} events)

Classify it into a misconception catalog entry. Return ONLY JSON:

{{
  "name": "short_snake_case_name",
  "description": "what the student wrongly believes (1-2 sentences)",
  "remediation": "the one-line correction a tutor should give first",
  "severity": "critical|high|medium|low",
  "diagnostic_probe": "a single question that would confirm this misconception"
}}
"""

_VALID_SEVERITIES = {"critical", "high", "medium", "low"}
_REQUIRED_KEYS = {"name", "description", "remediation", "severity", "diagnostic_probe"}


# ---------------------------------------------------------------------------
# Data
# ---------------------------------------------------------------------------

@dataclass
class CatalogEntry:
    concept: str
    error_type: str
    response_pattern: str
    name: str
    description: str
    remediation: str
    severity: str
    diagnostic_probe: str
    affected_students: int
    sample_events: int
    source: str = "discovered"       # discovered | curated
    status: str = "active"           # active | quarantined | retired


@dataclass
class WriteResult:
    written: list[CatalogEntry] = field(default_factory=list)
    quarantined: list[dict] = field(default_factory=list)
    skipped_dupes: int = 0


# ---------------------------------------------------------------------------
# Catalog store (JSON, same _cache pattern as spiral_service)
# ---------------------------------------------------------------------------

def _load_catalog() -> list[dict]:
    try:
        with open(_CATALOG_PATH, encoding="utf-8") as f:
            return json.load(f)
    except (OSError, json.JSONDecodeError):
        return []


def _save_catalog(rows: list[dict]) -> None:
    os.makedirs(_CACHE_DIR, exist_ok=True)
    with open(_CATALOG_PATH, "w", encoding="utf-8") as f:
        json.dump(rows, f, indent=2)


def _catalog_keys(rows: list[dict]) -> set[tuple]:
    return {(r.get("concept"), r.get("error_type"), r.get("response_pattern"))
            for r in rows}


# ---------------------------------------------------------------------------
# Writer
# ---------------------------------------------------------------------------

class MisconceptionWriter:
    """Turns raw error clusters into validated catalog entries.

    `llm_call` is injected (async or sync callable str->str) so this module
    never imports an LLM client — it works with whatever renderer/provider
    the platform wires in.
    """

    def __init__(self, llm_call: Any = None):
        self.llm_call = llm_call

    # -- LLM step --------------------------------------------------------

    def build_prompt(self, cluster: dict) -> str:
        return _CLASSIFY_PROMPT.format(
            concept=cluster.get("concept", ""),
            error_type=cluster.get("error_type", ""),
            response_pattern=cluster.get("response_pattern", ""),
            affected_students=cluster.get("affected_students", 0),
            sample_events=cluster.get("sample_events", 0),
        )

    def classify(self, cluster: dict) -> Optional[dict]:
        """Ask the LLM to name/describe the cluster. Returns parsed JSON or None."""
        if self.llm_call is None:
            return None
        try:
            raw = self.llm_call(self.build_prompt(cluster))
            if not raw:
                return None
            m = re.search(r"\{.*\}", raw, re.S)
            if not m:
                return None
            return json.loads(m.group(0))
        except Exception as exc:  # LLM/network/json failures all quarantine
            logger.warning("misconception classify failed: %s", exc)
            return None

    # -- validation -------------------------------------------------------

    @staticmethod
    def validate(entry: dict) -> list[str]:
        """Return list of problems; empty = valid."""
        problems = []
        missing = _REQUIRED_KEYS - set(entry)
        if missing:
            problems.append(f"missing keys: {sorted(missing)}")
        if entry.get("severity") not in _VALID_SEVERITIES:
            problems.append(f"bad severity: {entry.get('severity')}")
        name = str(entry.get("name", ""))
        if not re.fullmatch(r"[a-z][a-z0-9_]{2,60}", name or ""):
            problems.append(f"name not snake_case: {name!r}")
        if len(str(entry.get("description", ""))) < 20:
            problems.append("description too short")
        return problems

    # -- main write path ---------------------------------------------------

    def write(self, clusters: list[dict]) -> WriteResult:
        """Process clusters from the apply loop into the catalog."""
        result = WriteResult()
        rows = _load_catalog()
        existing = _catalog_keys(rows)

        for cl in clusters:
            key = (cl.get("concept"), cl.get("error_type"), cl.get("response_pattern"))
            if key in existing:
                result.skipped_dupes += 1
                continue

            classified = self.classify(cl)
            if classified is None:
                result.quarantined.append({**cl, "reason": "llm_classification_failed"})
                continue

            problems = self.validate(classified)
            if problems:
                result.quarantined.append({**cl, "reason": "; ".join(problems)})
                continue

            entry = CatalogEntry(
                concept=cl.get("concept", ""),
                error_type=cl.get("error_type", ""),
                response_pattern=cl.get("response_pattern", ""),
                name=classified["name"],
                description=classified["description"],
                remediation=classified["remediation"],
                severity=classified["severity"],
                diagnostic_probe=classified["diagnostic_probe"],
                affected_students=cl.get("affected_students", 0),
                sample_events=cl.get("sample_events", 0),
            )
            rows.append(entry.__dict__)
            existing.add(key)
            result.written.append(entry)

        if result.written:
            _save_catalog(rows)
            logger.info("misconception_writer: %d new entries, %d quarantined, %d dupes",
                        len(result.written), len(result.quarantined), result.skipped_dupes)
        return result

    # -- read side for misconception_matcher -------------------------------

    @staticmethod
    def active_entries() -> list[dict]:
        """Entries the matcher should use. Callers merge with the curated catalog."""
        return [r for r in _load_catalog() if r.get("status") == "active"]
