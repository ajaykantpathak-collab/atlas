import json
import logging
import os
from dataclasses import dataclass, field
from typing import Optional

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("confidence_calibrator")

CONFIDENCE_TO_PROB = {1: 0.1, 2: 0.3, 3: 0.5, 4: 0.7, 5: 0.9}

NUDGES_OVERCONFIDENT = "You rated yourself confident but got this wrong. Let's review why."
NUDGES_UNDERCONFIDENT = "You got this right! You know more than you think."
NUDGES_WELL_CALIBRATED = ""


@dataclass
class CalibrationResult:
    calibration_score: float
    bias: str
    bias_magnitude: float
    per_concept_calibration: dict[str, float]
    sample_size: int


class ConfidenceCalibrator:
    def __init__(self, storage_path: str = r"D:\platform\cbse_data\confidence_data.json"):
        self._storage_path = storage_path
        self._data: dict[str, dict[str, list[dict]]] = {}
        self._load_storage()

    def _load_storage(self) -> None:
        try:
            if os.path.exists(self._storage_path):
                os.makedirs(os.path.dirname(self._storage_path), exist_ok=True)
                with open(self._storage_path, "r", encoding="utf-8") as f:
                    self._data = json.load(f)
                logger.info("Loaded confidence data from %s", self._storage_path)
            else:
                self._data = {}
                logger.info("No existing storage file found, starting fresh.")
        except Exception as e:
            logger.warning("Could not load storage file: %s. Starting with empty data.", e)
            self._data = {}

    def _save_storage(self) -> None:
        try:
            os.makedirs(os.path.dirname(self._storage_path), exist_ok=True)
            with open(self._storage_path, "w", encoding="utf-8") as f:
                json.dump(self._data, f, indent=2)
        except Exception as e:
            logger.warning("Could not persist storage: %s", e)

    def record_confidence(
        self,
        student_id: str,
        concept: str,
        confidence_rating: int,
        is_correct: bool,
    ) -> None:
        if confidence_rating not in CONFIDENCE_TO_PROB:
            raise ValueError(
                "confidence_rating must be 1-5, got %d" % confidence_rating
            )

        if student_id not in self._data:
            self._data[student_id] = {}
        if concept not in self._data[student_id]:
            self._data[student_id][concept] = []

        self._data[student_id][concept].append(
            {
                "confidence_rating": confidence_rating,
                "is_correct": is_correct,
            }
        )
        self._save_storage()
        logger.debug(
            "Recorded confidence for student %s, concept %s: rating=%d, correct=%s",
            student_id,
            concept,
            confidence_rating,
            is_correct,
        )

    def get_calibration(self, student_id: str) -> CalibrationResult:
        if student_id not in self._data or not self._data[student_id]:
            return CalibrationResult(
                calibration_score=0.0,
                bias="well_calibrated",
                bias_magnitude=0.0,
                per_concept_calibration={},
                sample_size=0,
            )

        all_responses: list[dict] = []
        for concept, responses in self._data[student_id].items():
            all_responses.extend(responses)

        sample_size = len(all_responses)
        if sample_size == 0:
            return CalibrationResult(
                calibration_score=0.0,
                bias="well_calibrated",
                bias_magnitude=0.0,
                per_concept_calibration={},
                sample_size=0,
            )

        ece = self._compute_ece(all_responses)
        avg_confidence = self._compute_avg_confidence(all_responses)
        avg_accuracy = self._compute_avg_accuracy(all_responses)
        bias, bias_magnitude = self._detect_bias(avg_confidence, avg_accuracy)

        per_concept_calibration: dict[str, float] = {}
        for concept, responses in self._data[student_id].items():
            if responses:
                concept_ece = self._compute_ece(responses)
                per_concept_calibration[concept] = round(concept_ece, 4)

        return CalibrationResult(
            calibration_score=round(ece, 4),
            bias=bias,
            bias_magnitude=round(bias_magnitude, 4),
            per_concept_calibration=per_concept_calibration,
            sample_size=sample_size,
        )

    def get_confidence_nudge(self, student_id: str, concept: str) -> str:
        if student_id not in self._data or concept not in self._data[student_id]:
            return ""

        responses = self._data[student_id][concept]
        if not responses:
            return ""

        bias, _, last_rating, last_correct = self._detect_bias_with_last(responses)
        if bias == "overconfident" and not last_correct:
            return NUDGES_OVERCONFIDENT
        elif bias == "underconfident" and last_correct:
            return NUDGES_UNDERCONFIDENT
        else:
            return NUDGES_WELL_CALIBRATED

    def get_optimal_challenge_level(
        self, student_id: str, concept: str, mastery: float
    ) -> float:
        calibration = self.get_calibration(student_id)

        if calibration.sample_size < 3:
            return max(0.0, min(1.0, mastery))

        if calibration.bias == "overconfident":
            adjusted = mastery + 0.2
        elif calibration.bias == "underconfident":
            adjusted = mastery - 0.15
        else:
            adjusted = mastery

        return max(0.0, min(1.0, adjusted))

    def get_class_calibration(self, student_ids: list[str]) -> CalibrationResult:
        all_responses: list[dict] = []
        for sid in student_ids:
            if sid in self._data:
                for concept, responses in self._data[sid].items():
                    all_responses.extend(responses)

        sample_size = len(all_responses)
        if sample_size == 0:
            return CalibrationResult(
                calibration_score=0.0,
                bias="well_calibrated",
                bias_magnitude=0.0,
                per_concept_calibration={},
                sample_size=0,
            )

        ece = self._compute_ece(all_responses)
        avg_confidence = self._compute_avg_confidence(all_responses)
        avg_accuracy = self._compute_avg_accuracy(all_responses)
        bias, bias_magnitude = self._detect_bias(avg_confidence, avg_accuracy)

        return CalibrationResult(
            calibration_score=round(ece, 4),
            bias=bias,
            bias_magnitude=round(bias_magnitude, 4),
            per_concept_calibration={},
            sample_size=sample_size,
        )

    def _compute_ece(self, responses: list[dict]) -> float:
        bins: dict[int, list[float]] = {1: [], 2: [], 3: [], 4: [], 5: []}
        for r in responses:
            rating = r["confidence_rating"]
            bins[rating].append(1.0 if r["is_correct"] else 0.0)

        total = len(responses)
        if total == 0:
            return 0.0

        ece = 0.0
        for rating in range(1, 6):
            bin_items = bins[rating]
            if not bin_items:
                continue
            avg_accuracy = sum(bin_items) / len(bin_items)
            avg_confidence = CONFIDENCE_TO_PROB[rating]
            weight = len(bin_items) / total
            ece += abs(avg_confidence - avg_accuracy) * weight

        return ece

    def _compute_avg_confidence(self, responses: list[dict]) -> float:
        if not responses:
            return 0.0
        return sum(CONFIDENCE_TO_PROB[r["confidence_rating"]] for r in responses) / len(
            responses
        )

    def _compute_avg_accuracy(self, responses: list[dict]) -> float:
        if not responses:
            return 0.0
        return sum(1.0 if r["is_correct"] else 0.0 for r in responses) / len(responses)

    def _detect_bias(self, avg_confidence: float, avg_accuracy: float) -> tuple[str, float]:
        threshold = 0.05
        diff = avg_confidence - avg_accuracy
        magnitude = abs(diff)

        if diff > threshold:
            return "overconfident", magnitude
        elif diff < -threshold:
            return "underconfident", magnitude
        else:
            return "well_calibrated", magnitude

    def _detect_bias_with_last(
        self, responses: list[dict]
    ) -> tuple[str, float, int, bool]:
        avg_confidence = self._compute_avg_confidence(responses)
        avg_accuracy = self._compute_avg_accuracy(responses)
        bias, magnitude = self._detect_bias(avg_confidence, avg_accuracy)
        last = responses[-1]
        return bias, magnitude, last["confidence_rating"], last["is_correct"]

    def get_student_concept_history(
        self, student_id: str, concept: str
    ) -> list[dict]:
        if student_id in self._data and concept in self._data[student_id]:
            return list(self._data[student_id][concept])
        return []