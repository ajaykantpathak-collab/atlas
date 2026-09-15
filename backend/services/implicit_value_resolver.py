"""
implicit_value_resolver.py — Layer 2 (B3): Infer unstated quantities from rules.

Deterministic. No LLM. Rule-based pattern matching.

Loads YAML rules from implicit_rules/ and applies them to the problem text.
When a pattern matches, the corresponding implicit value is bound.

Author: Platform Backend Team
"""

from __future__ import annotations

import re
import os
from dataclasses import dataclass, field
from pathlib import Path
from typing import Optional

import yaml

from .stem_problem import Quantity


@dataclass
class ImplicitBinding:
    """One resolved implicit value."""
    symbol: str
    value: Optional[float]
    unit: str
    reason: str
    rule_id: str
    confidence: float
    relation: Optional[str] = None  # e.g. "v = 2*u" if value is derived

    def to_quantity(self) -> Quantity:
        return Quantity(
            symbol=self.symbol,
            name=self.symbol,
            value=self.value,
            unit=self.unit,
            is_implicit=True,
        )


class ImplicitValueResolver:
    """Layer 2 (B3): Resolve implicit values from rule patterns."""

    def __init__(self, rules_path: str = None):
        if rules_path is None:
            rules_path = str(Path(__file__).parent.parent / "implicit_rules")
        self.rules_path = rules_path
        self.rules: list[dict] = []
        self._load_rules()

    def _load_rules(self) -> None:
        """Load all YAML rule files from the rules directory."""
        rules_dir = Path(self.rules_path)
        if not rules_dir.exists():
            return

        for yaml_file in rules_dir.rglob("*.yaml"):
            try:
                data = yaml.safe_load(yaml_file.read_text(encoding="utf-8"))
                if data and "rules" in data:
                    for rule in data["rules"]:
                        rule["_source_file"] = str(yaml_file)
                        self.rules.append(rule)
            except Exception as e:
                import logging
                logging.getLogger(__name__).warning(
                    f"Failed to load implicit rules from {yaml_file}: {e}"
                )

        # Sort by priority (highest first)
        self.rules.sort(key=lambda r: r.get("priority", 0), reverse=True)

    def resolve(
        self,
        text: str,
        concept_tags: list[str] = None,
        already_bound: dict[str, float] = None,
    ) -> list[ImplicitBinding]:
        """Apply rules to text and return implicit bindings.

        Args:
            text: Normalized problem text
            concept_tags: Concept tags from the concept extractor
            already_bound: Symbols already bound by explicit extraction

        Returns:
            List of implicit bindings to add to the problem
        """
        if not self.rules:
            return []

        concept_tags = concept_tags or []
        already_bound = already_bound or {}
        text_lower = text.lower()

        bindings: list[ImplicitBinding] = []
        bound_symbols: set[str] = set(already_bound.keys())

        for rule in self.rules:
            # Check if any pattern matches
            patterns = rule.get("patterns", [])
            matched = False
            for pattern in patterns:
                if pattern.lower() in text_lower:
                    matched = True
                    break

            if not matched:
                continue

            # Check exceptions — if any exception pattern is in text, skip
            exceptions = rule.get("exceptions", [])
            if exceptions:
                for exc in exceptions:
                    if exc.lower() in text_lower:
                        matched = False
                        break
            if not matched:
                continue

            # Check conditions
            conditions = rule.get("conditions", [])
            if not self._check_conditions(conditions, concept_tags, bound_symbols):
                continue

            # Apply bindings
            for binding in rule.get("bindings", []):
                symbol = binding.get("symbol", "")
                if symbol in bound_symbols:
                    continue  # Don't override

                value = binding.get("value")
                relation = binding.get("relation")

                impl = ImplicitBinding(
                    symbol=symbol,
                    value=value,
                    unit=binding.get("unit", ""),
                    reason=binding.get("reason", ""),
                    rule_id=rule.get("rule_id", ""),
                    confidence=rule.get("confidence", 1.0),
                    relation=relation,
                )
                bindings.append(impl)
                bound_symbols.add(symbol)

        return bindings

    def _check_conditions(
        self,
        conditions: list[str],
        concept_tags: list[str],
        bound_symbols: set[str],
    ) -> bool:
        """Check if all conditions are met for a rule."""
        for cond in conditions:
            cond = cond.strip()

            # "concept_tag in [...]"
            if cond.startswith("concept_tag in"):
                # Extract the list
                m = re.search(r'\[([^\]]+)\]', cond)
                if m:
                    required = [t.strip().strip('"').strip("'") for t in m.group(1).split(",")]
                    if not any(tag in concept_tags for tag in required):
                        return False

            # "not already_bound["symbol"]"
            elif cond.startswith("not already_bound"):
                m = re.search(r'\["([^"]+)"\]', cond)
                if m:
                    sym = m.group(1)
                    if sym in bound_symbols:
                        return False

            # "already_bound["symbol"]"
            elif cond.startswith("already_bound"):
                m = re.search(r'\["([^"]+)"\]', cond)
                if m:
                    sym = m.group(1)
                    if sym not in bound_symbols:
                        return False

        return True

    def resolve_to_quantities(
        self,
        text: str,
        concept_tags: list[str] = None,
        already_bound: dict[str, float] = None,
    ) -> list[Quantity]:
        """Resolve and return as Quantity objects."""
        bindings = self.resolve(text, concept_tags, already_bound)
        return [b.to_quantity() for b in bindings if b.value is not None]


# Singleton
_resolver = None


def get_resolver(rules_path: str = None) -> ImplicitValueResolver:
    global _resolver
    if _resolver is None:
        _resolver = ImplicitValueResolver(rules_path)
    return _resolver


def resolve_implicit(
    text: str,
    concept_tags: list[str] = None,
    already_bound: dict[str, float] = None,
) -> list[ImplicitBinding]:
    """Convenience function."""
    return get_resolver().resolve(text, concept_tags, already_bound)
