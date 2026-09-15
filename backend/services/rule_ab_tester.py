import json
import math
import os
import random
import statistics
from dataclasses import dataclass, field
from datetime import datetime, date
from typing import Optional


@dataclass
class ABTest:
    test_name: str
    control_rule: str
    variant_rule: str
    status: str = "running"
    start_date: str = ""
    end_date: str = ""
    control_interactions: int = 0
    variant_interactions: int = 0
    control_mastery_gain: float = 0.0
    variant_mastery_gain: float = 0.0
    control_next_item_correctness: float = 0.0
    variant_next_item_correctness: float = 0.0
    control_mastery_observations: list = field(default_factory=list)
    variant_mastery_observations: list = field(default_factory=list)
    control_correctness_observations: list = field(default_factory=list)
    variant_correctness_observations: list = field(default_factory=list)
    winner: str = "none"
    confidence_level: float = 0.0
    min_sample_size: int = 30


def _betainc_reg(a: float, b: float, x: float) -> float:
    if x < 0.0 or x > 1.0:
        raise ValueError("x must be in [0, 1]")
    if x == 0.0:
        return 0.0
    if x == 1.0:
        return 1.0

    ln_beta = (math.lgamma(a) + math.lgamma(b) - math.lgamma(a + b))
    front = math.exp(math.log(x) * a + math.log(1.0 - x) * b - ln_beta) / a

    if x < (a + 1.0) / (a + b + 2.0):
        return front * _betainc_cont_frac(a, b, x)
    else:
        return 1.0 - front * _betainc_cont_frac(b, a, 1.0 - x)


def _betainc_cont_frac(a: float, b: float, x: float, max_iter: int = 200, tol: float = 1e-12) -> float:
    qab = a + b
    qap = a + 1.0
    qam = a - 1.0
    c = 1.0
    d = 1.0 - qab * x / qap
    if abs(d) < 1e-30:
        d = 1e-30
    d = 1.0 / d
    h = d
    for m in range(1, max_iter + 1):
        m2f = 2.0 * m
        aa = m * (b - m) * x / ((qam + m2f) * (a + m2f))
        d = 1.0 + aa * d
        if abs(d) < 1e-30:
            d = 1e-30
        c = 1.0 + aa / c
        if abs(c) < 1e-30:
            c = 1e-30
        d = 1.0 / d
        h *= d * c
        aa = -(a + m) * (qab + m) * x / ((a + m2f) * (qap + m2f))
        d = 1.0 + aa * d
        if abs(d) < 1e-30:
            d = 1e-30
        c = 1.0 + aa / c
        if abs(c) < 1e-30:
            c = 1e-30
        d = 1.0 / d
        delta = d * c
        h *= delta
        if abs(delta - 1.0) < tol:
            break
    return h


def _t_cdf(t_val: float, df: float) -> float:
    x = df / (t_val ** 2 + df)
    ib = _betainc_reg(df / 2.0, 0.5, x)
    if t_val >= 0:
        return 1.0 - 0.5 * ib
    return 0.5 * ib


def welch_t_test(control_data: list, variant_data: list) -> dict:
    n1 = len(control_data)
    n2 = len(variant_data)
    if n1 < 2 or n2 < 2:
        return {"t_stat": 0.0, "df": 0.0, "p_value": 1.0, "significant": False}

    m1 = statistics.mean(control_data)
    m2 = statistics.mean(variant_data)
    if n1 > 1:
        v1 = statistics.variance(control_data)
    else:
        v1 = 0.0
    if n2 > 1:
        v2 = statistics.variance(variant_data)
    else:
        v2 = 0.0

    se = math.sqrt(v1 / n1 + v2 / n2)
    if se == 0.0:
        if m1 != m2:
            return {"t_stat": float("inf"), "df": 0.0, "p_value": 0.0, "significant": True}
        return {"t_stat": 0.0, "df": 0.0, "p_value": 1.0, "significant": False}

    t_stat = (m1 - m2) / se
    num = (v1 / n1 + v2 / n2) ** 2
    denom = (v1 ** 2) / (n1 ** 2 * (n1 - 1)) + (v2 ** 2) / (n2 ** 2 * (n2 - 1))
    if denom == 0.0:
        df = n1 + n2 - 2.0
    else:
        df = num / denom

    p_value = 2.0 * (1.0 - _t_cdf(abs(t_stat), df))
    return {
        "t_stat": t_stat,
        "df": df,
        "p_value": p_value,
        "significant": p_value < 0.05,
        "control_mean": m1,
        "variant_mean": m2,
    }


class RuleABTester:
    def __init__(self, storage_path: str = None):
        if storage_path is None:
            storage_path = r"D:\platform\cbse_data\ab_tests.json"
        self.storage_path = storage_path
        self.tests: dict[str, ABTest] = {}
        self.assignments: dict[str, dict[str, str]] = {}
        self._load()

    def _load(self):
        try:
            os.makedirs(os.path.dirname(self.storage_path), exist_ok=True)
            with open(self.storage_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                for t in data.get("tests", []):
                    ab = ABTest(
                        test_name=t["test_name"],
                        control_rule=t["control_rule"],
                        variant_rule=t["variant_rule"],
                        status=t.get("status", "running"),
                        start_date=t.get("start_date", ""),
                        end_date=t.get("end_date", ""),
                        control_interactions=t.get("control_interactions", 0),
                        variant_interactions=t.get("variant_interactions", 0),
                        control_mastery_gain=t.get("control_mastery_gain", 0.0),
                        variant_mastery_gain=t.get("variant_mastery_gain", 0.0),
                        control_next_item_correctness=t.get("control_next_item_correctness", 0.0),
                        variant_next_item_correctness=t.get("variant_next_item_correctness", 0.0),
                        control_mastery_observations=t.get("control_mastery_observations", []),
                        variant_mastery_observations=t.get("variant_mastery_observations", []),
                        control_correctness_observations=t.get("control_correctness_observations", []),
                        variant_correctness_observations=t.get("variant_correctness_observations", []),
                        winner=t.get("winner", "none"),
                        confidence_level=t.get("confidence_level", 0.0),
                        min_sample_size=t.get("min_sample_size", 30),
                    )
                    self.tests[ab.test_name] = ab
                self.assignments = data.get("assignments", {})
        except (FileNotFoundError, json.JSONDecodeError):
            self.tests = {}
            self.assignments = {}

    def _save(self):
        os.makedirs(os.path.dirname(self.storage_path), exist_ok=True)
        tests_list = []
        for ab in self.tests.values():
            tests_list.append({
                "test_name": ab.test_name,
                "control_rule": ab.control_rule,
                "variant_rule": ab.variant_rule,
                "status": ab.status,
                "start_date": ab.start_date,
                "end_date": ab.end_date,
                "control_interactions": ab.control_interactions,
                "variant_interactions": ab.variant_interactions,
                "control_mastery_gain": ab.control_mastery_gain,
                "variant_mastery_gain": ab.variant_mastery_gain,
                "control_next_item_correctness": ab.control_next_item_correctness,
                "variant_next_item_correctness": ab.variant_next_item_correctness,
                "control_mastery_observations": ab.control_mastery_observations,
                "variant_mastery_observations": ab.variant_mastery_observations,
                "control_correctness_observations": ab.control_correctness_observations,
                "variant_correctness_observations": ab.variant_correctness_observations,
                "winner": ab.winner,
                "confidence_level": ab.confidence_level,
                "min_sample_size": ab.min_sample_size,
            })
        with open(self.storage_path, "w", encoding="utf-8") as f:
            json.dump({"tests": tests_list, "assignments": self.assignments}, f, indent=2)

    def create_test(self, test_name: str, control_rule: str, variant_rule: str, min_sample_size: int = 30) -> ABTest:
        if test_name in self.tests:
            raise ValueError(f"Test '{test_name}' already exists.")
        today_str = date.today().isoformat()
        ab = ABTest(
            test_name=test_name,
            control_rule=control_rule,
            variant_rule=variant_rule,
            status="running",
            start_date=today_str,
            min_sample_size=min_sample_size,
        )
        self.tests[test_name] = ab
        self.assignments[test_name] = {}
        self._save()
        return ab

    def assign_student(self, test_name: str, student_id: str) -> str:
        if test_name not in self.tests:
            raise ValueError(f"Test '{test_name}' not found.")
        if test_name not in self.assignments:
            self.assignments[test_name] = {}
        if student_id in self.assignments[test_name]:
            return self.assignments[test_name][student_id]
        assignment = random.choice(["control", "variant"])
        self.assignments[test_name][student_id] = assignment
        self._save()
        return assignment

    def record_outcome(self, test_name: str, variant: str, mastery_gain: float, next_item_correct: float):
        if test_name not in self.tests:
            raise ValueError(f"Test '{test_name}' not found.")
        if variant not in ("control", "variant"):
            raise ValueError("variant must be 'control' or 'variant'")

        ab = self.tests[test_name]
        ab.control_interactions if variant == "control" else ab.variant_interactions
        if variant == "control":
            ab.control_interactions += 1
            ab.control_mastery_gain += mastery_gain
            ab.control_next_item_correctness += next_item_correct
            ab.control_mastery_observations.append(mastery_gain)
            ab.control_correctness_observations.append(next_item_correct)
        else:
            ab.variant_interactions += 1
            ab.variant_mastery_gain += mastery_gain
            ab.variant_next_item_correctness += next_item_correct
            ab.variant_mastery_observations.append(mastery_gain)
            ab.variant_correctness_observations.append(next_item_correct)
        self._save()

    def check_significance(self, test_name: str) -> dict:
        if test_name not in self.tests:
            raise ValueError(f"Test '{test_name}' not found.")
        ab = self.tests[test_name]
        min_n = ab.min_sample_size

        result = {
            "test_name": test_name,
            "simple_significant": False,
            "welch_significant": False,
            "welch_result": None,
            "control_mean_mastery": None,
            "variant_mean_mastery": None,
            "control_mean_correctness": None,
            "variant_mean_correctness": None,
            "control_interactions": ab.control_interactions,
            "variant_interactions": ab.variant_interactions,
        }

        if ab.control_interactions > 0 and ab.variant_interactions > 0:
            cm = ab.control_mastery_gain / ab.control_interactions
            vm = ab.variant_mastery_gain / ab.variant_interactions
            cc = ab.control_next_item_correctness / ab.control_interactions
            vc = ab.variant_next_item_correctness / ab.variant_interactions
            result["control_mean_mastery"] = cm
            result["variant_mean_mastery"] = vm
            result["control_mean_correctness"] = cc
            result["variant_mean_correctness"] = vc

            if (ab.control_interactions >= min_n and ab.variant_interactions >= min_n):
                diff = abs(cm - vm)
                if diff > 0.1:
                    result["simple_significant"] = True

        if (len(ab.control_mastery_observations) >= min_n
                and len(ab.variant_mastery_observations) >= min_n):
            wt = welch_t_test(ab.control_mastery_observations, ab.variant_mastery_observations)
            result["welch_result"] = wt
            result["welch_significant"] = wt["significant"]
            ab.confidence_level = 1.0 - wt["p_value"]

        return result

    def declare_winner(self, test_name: str) -> str:
        if test_name not in self.tests:
            raise ValueError(f"Test '{test_name}' not found.")
        ab = self.tests[test_name]
        sig = self.check_significance(test_name)

        welch_sig = sig.get("welch_significant", False)
        simple_sig = sig.get("simple_significant", False)
        wt = sig.get("welch_result")

        if welch_sig or simple_sig:
            cm = sig.get("control_mean_mastery", 0.0)
            vm = sig.get("variant_mean_mastery", 0.0)
            cc = sig.get("control_mean_correctness", 0.0)
            vc = sig.get("variant_mean_correctness", 0.0)
            mastery_winner = "variant" if vm > cm else "control"
            correctness_winner = "variant" if vc > cc else "control"
            if mastery_winner == correctness_winner:
                ab.winner = mastery_winner
            else:
                ab.winner = mastery_winner
            ab.confidence_level = max(ab.confidence_level, 0.95 if welch_sig else 0.0)
        else:
            ab.winner = "none"

        ab.status = "completed"
        ab.end_date = date.today().isoformat()
        self._save()
        return ab.winner

    def get_active_tests(self) -> list[ABTest]:
        return [t for t in self.tests.values() if t.status == "running"]

    def get_completed_tests(self) -> list[ABTest]:
        return [t for t in self.tests.values() if t.status == "completed"]

    def auto_check_all(self) -> dict:
        results = {}
        for test_name, ab in list(self.tests.items()):
            if ab.status == "running":
                sig = self.check_significance(test_name)
                welch_sig = sig.get("welch_significant", False)
                simple_sig = sig.get("simple_significant", False)
                if welch_sig or simple_sig:
                    winner = self.declare_winner(test_name)
                    results[test_name] = {"action": "winner_declared", "winner": winner, "significance": sig}
                else:
                    results[test_name] = {"action": "no_winner", "significance": sig}
        return results