"""
CISCE MATHS Class 12 - Deterministic Question Generator
Covers Relations and Functions (Nodes c12_math_001, c12_math_002, c12_math_003)
"""

import random
import math
import fractions
import itertools
from fractions import Fraction
from typing import List, Dict, Any, Optional, Tuple


# ============================================================
# UTILITY FUNCTIONS
# ============================================================

def seeded_random(seed: int) -> random.Random:
    """Return a seeded Random instance."""
    return random.Random(seed)


def generate_set(rng: random.Random, n: int, max_val: int = 10) -> List[int]:
    """Generate a set of n distinct integers."""
    return sorted(rng.sample(range(1, max_val + 1), n))


def relation_to_set(rel_str: str, elements: List[int]) -> List[Tuple[int, int]]:
    """Parse a simple relation string into list of tuples."""
    pairs = []

    return {"status": "ok", "note": "truncated"}
