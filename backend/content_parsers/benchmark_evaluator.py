"""Benchmark — old (keyword+MiniLM) vs new (3-tier v3) answer evaluation.

Tests 200 student answers across question types and subjects:
  - 40 MCQ answers (20 correct, 20 wrong)
  - 40 numerical answers (20 correct, 20 wrong)
  - 40 true/false answers (20 correct, 20 wrong)
  - 40 math expression answers (20 correct, 20 wrong)
  - 20 chemical formula answers (10 correct, 10 wrong)
  - 20 fill-blank answers (10 correct, 10 wrong)

Metrics:
  - Accuracy: correct verdict (correct/incorrect) vs ground truth
  - Tier distribution: how many answers handled by each tier
  - Latency: average evaluation time per answer
  - LLM calls: how many escalated to Tier 3

Output:
  D:\\platform\\parsed_output\\eval_benchmark_results.json
"""

import asyncio
import json
import time
import sys
from pathlib import Path
from dataclasses import dataclass, asdict

sys.path.insert(0, r"D:\platform")

OUTPUT_DIR = Path(r"D:\platform\parsed_output")


# ---------------------------------------------------------------------------
# Test cases — 200 total
# ---------------------------------------------------------------------------

TEST_ANSWERS = []

# 40 MCQ (20 correct, 20 wrong)
MCQ_QUESTIONS = [
    ("What is the SI unit of force?", "Newton", ["Pascal", "Joule", "Newton", "Watt"], "C"),
    ("Which gas is most abundant in Earth's atmosphere?", "Nitrogen", ["Oxygen", "Nitrogen", "CO2", "Argon"], "B"),
    ("What is the powerhouse of the cell?", "Mitochondria", ["Nucleus", "Mitochondria", "Ribosome", "Golgi"], "B"),
    ("Who proposed the theory of relativity?", "Einstein", ["Newton", "Einstein", "Galileo", "Bohr"], "B"),
    ("What is the chemical formula for water?", "H2O", ["CO2", "H2O", "NaCl", "O2"], "B"),
    ("What is the value of pi (approx)?", "3.14", ["2.14", "3.14", "4.14", "1.14"], "B"),
    ("Which planet is known as the Red Planet?", "Mars", ["Venus", "Mars", "Jupiter", "Saturn"], "B"),
    ("What is the speed of light (approx)?", "3×10^8 m/s", ["3×10^8 m/s", "3×10^6 m/s", "3×10^10 m/s", "3×10^4 m/s"], "A"),
    ("What is Ohm's Law?", "V=IR", ["V=IR", "V=I/R", "V=IR^2", "V=I+R"], "A"),
    ("Which is a renewable energy source?", "Solar", ["Coal", "Solar", "Petroleum", "Natural Gas"], "B"),
    # Add 10 more MCQs
    ("What is the pH of pure water?", "7", ["1", "7", "14", "0"], "B"),
    ("Which organ pumps blood?", "Heart", ["Lungs", "Heart", "Liver", "Kidney"], "B"),
    ("What is 2^10?", "1024", ["512", "1024", "2048", "256"], "B"),
    ("Which is the largest planet?", "Jupiter", ["Earth", "Mars", "Jupiter", "Venus"], "C"),
    ("What is the chemical symbol for gold?", "Au", ["Au", "Ag", "Gd", "Go"], "A"),
    ("Who wrote 'Romeo and Juliet'?", "Shakespeare", ["Dickens", "Shakespeare", "Austen", "Tolkien"], "B"),
    ("What is the freezing point of water?", "0°C", ["0°C", "100°C", "32°C", "-10°C"], "A"),
    ("Which gas do plants absorb?", "CO2", ["O2", "CO2", "N2", "H2"], "B"),
    ("What is Newton's first law?", "Inertia", ["Inertia", "Gravity", "Momentum", "Friction"], "A"),
    ("Which is a noble gas?", "Helium", ["Oxygen", "Helium", "Chlorine", "Sodium"], "B"),
]

for i, (q, correct, options, correct_letter) in enumerate(MCQ_QUESTIONS):
    # Correct answer
    TEST_ANSWERS.append({
        "id": f"mcq_c_{i}",
        "question_type": "mcq",
        "student_answer": correct_letter,
        "model_answer": correct,
        "correct_option": correct_letter,
        "options": options,
        "max_marks": 1,
        "expected_marks": 1,
        "expected_tier": "1",
    })
    # Wrong answer (pick a different option)
    wrong_letter = "A" if correct_letter != "A" else "B"
    TEST_ANSWERS.append({
        "id": f"mcq_w_{i}",
        "question_type": "mcq",
        "student_answer": wrong_letter,
        "model_answer": correct,
        "correct_option": correct_letter,
        "options": options,
        "max_marks": 1,
        "expected_marks": 0,
        "expected_tier": "1",
    })

# 40 Numerical (20 correct, 20 wrong)
NUMERICAL_QUESTIONS = [
    ("What is 5 + 3?", "8"),
    ("What is 12 × 4?", "48"),
    ("What is 100 / 4?", "25"),
    ("What is 7^2?", "49"),
    ("What is sqrt(144)?", "12"),
    ("What is 15% of 200?", "30"),
    ("What is 3.14 × 2?", "6.28"),
    ("What is 10! / 9!?", "10"),
    ("What is log(100)?", "2"),
    ("What is 2^5?", "32"),
    ("What is 9 × 9?", "81"),
    ("What is 1000 - 456?", "544"),
    ("What is 1/4 + 1/4?", "0.5"),
    ("What is 5!?", "120"),
    ("What is the area of a circle with r=2?", "12.566"),
    ("What is 20% of 50?", "10"),
    ("What is 6^3?", "216"),
    ("What is sqrt(81)?", "9"),
    ("What is 144/12?", "12"),
    ("What is 3.5 × 4?", "14"),
]

for i, (q, correct) in enumerate(NUMERICAL_QUESTIONS):
    TEST_ANSWERS.append({
        "id": f"num_c_{i}",
        "question_type": "numerical",
        "student_answer": correct,
        "model_answer": correct,
        "max_marks": 2,
        "expected_marks": 2,
        "expected_tier": "1",
    })
    # Wrong answer
    try:
        wrong = str(float(correct) + 10)
    except ValueError:
        wrong = "999"
    TEST_ANSWERS.append({
        "id": f"num_w_{i}",
        "question_type": "numerical",
        "student_answer": wrong,
        "model_answer": correct,
        "max_marks": 2,
        "expected_marks": 0,
        "expected_tier": "1",
    })

# 40 True/False (20 correct, 20 wrong)
TF_QUESTIONS = [
    ("Water boils at 100°C at sea level.", "true"),
    ("The Earth is flat.", "false"),
    ("Photosynthesis produces oxygen.", "true"),
    ("Light travels faster than sound.", "true"),
    ("Atoms are the smallest particles.", "false"),
    ("Gravity is a fundamental force.", "true"),
    ("The Sun is a planet.", "false"),
    ("DNA stands for Deoxyribonucleic Acid.", "true"),
    ("Sound cannot travel in a vacuum.", "true"),
    ("Mercury is the hottest planet.", "false"),
    ("Humans have 206 bones.", "true"),
    ("The Pacific is the largest ocean.", "true"),
    ("Gold is a liquid at room temperature.", "false"),
    ("Plants respire only at night.", "false"),
    ("The Great Wall is visible from space.", "false"),
    ("Oxygen is flammable.", "false"),
    ("The heart has 4 chambers.", "true"),
    ("Sound travels faster in water than air.", "true"),
    ("All metals are solid at room temperature.", "false"),
    ("The Moon orbits the Earth.", "true"),
]

for i, (q, correct) in enumerate(TF_QUESTIONS):
    TEST_ANSWERS.append({
        "id": f"tf_c_{i}",
        "question_type": "true_false",
        "student_answer": correct,
        "model_answer": correct,
        "max_marks": 1,
        "expected_marks": 1,
        "expected_tier": "1",
    })
    # Wrong answer
    wrong = "false" if correct == "true" else "true"
    TEST_ANSWERS.append({
        "id": f"tf_w_{i}",
        "question_type": "true_false",
        "student_answer": wrong,
        "model_answer": correct,
        "max_marks": 1,
        "expected_marks": 0,
        "expected_tier": "1",
    })

# 40 Math expressions (20 correct, 20 wrong)
MATH_QUESTIONS = [
    ("Expand (x+1)^2", "x^2 + 2x + 1"),
    ("Simplify sin^2(x) + cos^2(x)", "1"),
    ("Differentiate x^3", "3x^2"),
    ("Integrate 2x", "x^2"),
    ("Factor x^2 - 1", "(x-1)(x+1)"),
    ("Simplify 2x + 3x", "5x"),
    ("Expand (x+2)^2", "x^2 + 4x + 4"),
    ("Differentiate sin(x)", "cos(x)"),
    ("Simplify x^2 * x^3", "x^5"),
    ("Factor x^2 - 4", "(x-2)(x+2)"),
    ("Differentiate e^x", "e^x"),
    ("Integrate 1/x", "ln(x)"),
    ("Simplify (x^2)^3", "x^6"),
    ("Expand (2x+1)^2", "4x^2 + 4x + 1"),
    ("Differentiate cos(x)", "-sin(x)"),
    ("Simplify 3x - x", "2x"),
    ("Factor x^2 + 2x + 1", "(x+1)^2"),
    ("Differentiate ln(x)", "1/x"),
    ("Simplify x^3 / x", "x^2"),
    ("Expand (x-1)^2", "x^2 - 2x + 1"),
]

for i, (q, correct) in enumerate(MATH_QUESTIONS):
    TEST_ANSWERS.append({
        "id": f"math_c_{i}",
        "question_type": "short_answer",
        "student_answer": correct,
        "model_answer": correct,
        "max_marks": 3,
        "expected_marks": 3,
        "expected_tier": "1b",
    })
    # Wrong answer (different expression)
    wrong_answers = ["x^2", "0", "x", "2x", "x^3", "sin(x)"]
    wrong = wrong_answers[i % len(wrong_answers)]
    TEST_ANSWERS.append({
        "id": f"math_w_{i}",
        "question_type": "short_answer",
        "student_answer": wrong,
        "model_answer": correct,
        "max_marks": 3,
        "expected_marks": 0,
        "expected_tier": "1b",
    })

# 20 Chemical formulas (10 correct, 10 wrong)
CHEM_QUESTIONS = [
    ("What is the formula for water?", "H2O"),
    ("What is the formula for carbon dioxide?", "CO2"),
    ("What is the formula for sodium chloride?", "NaCl"),
    ("What is the formula for methane?", "CH4"),
    ("What is the formula for sulfuric acid?", "H2SO4"),
    ("What is the formula for ammonia?", "NH3"),
    ("What is the formula for glucose?", "C6H12O6"),
    ("What is the formula for hydrogen peroxide?", "H2O2"),
    ("What is the formula for hydrochloric acid?", "HCl"),
    ("What is the formula for nitric acid?", "HNO3"),
]

for i, (q, correct) in enumerate(CHEM_QUESTIONS):
    TEST_ANSWERS.append({
        "id": f"chem_c_{i}",
        "question_type": "short_answer",
        "student_answer": correct,
        "model_answer": correct,
        "max_marks": 1,
        "expected_marks": 1,
        "expected_tier": "1b",
    })
    # Wrong answer
    wrong_chems = ["NaOH", "KCl", "H2", "O2", "C2H6", "H3PO4", "NaHCO3", "CaO", "HBr", "H2CO3"]
    wrong = wrong_chems[i]
    TEST_ANSWERS.append({
        "id": f"chem_w_{i}",
        "question_type": "short_answer",
        "student_answer": wrong,
        "model_answer": correct,
        "max_marks": 1,
        "expected_marks": 0,
        "expected_tier": "1b",
    })

# 20 Fill-blank (10 correct, 10 wrong)
FB_QUESTIONS = [
    ("The process by which plants make food is called ___.", "photosynthesis"),
    ("The SI unit of electric current is ___.", "ampere"),
    ("The chemical symbol for sodium is ___.", "Na"),
    ("The hardest natural substance is ___.", "diamond"),
    ("The gas responsible for greenhouse effect is ___.", "CO2"),
    ("The powerhouse of the cell is ___.", "mitochondria"),
    ("The force that keeps planets in orbit is ___.", "gravity"),
    ("The number of chromosomes in humans is ___.", "46"),
    ("The speed of light is approximately ___ m/s.", "3×10^8"),
    ("The pH of a neutral solution is ___.", "7"),
]

for i, (q, correct) in enumerate(FB_QUESTIONS):
    TEST_ANSWERS.append({
        "id": f"fb_c_{i}",
        "question_type": "fill_blank",
        "student_answer": correct,
        "model_answer": correct,
        "max_marks": 1,
        "expected_marks": 1,
        "expected_tier": "1",
    })
    # Wrong answer
    wrong_answers = ["respiration", "volt", "K", "iron", "O2", "nucleus", "friction", "23", "1000", "14"]
    wrong = wrong_answers[i]
    TEST_ANSWERS.append({
        "id": f"fb_w_{i}",
        "question_type": "fill_blank",
        "student_answer": wrong,
        "model_answer": correct,
        "max_marks": 1,
        "expected_marks": 0,
        "expected_tier": "1",
    })


# ---------------------------------------------------------------------------
# Benchmark runner
# ---------------------------------------------------------------------------

@dataclass
class BenchmarkResult:
    test_id: str
    question_type: str
    expected_marks: int
    expected_tier: str
    actual_marks: int
    actual_tier: str
    strategy: str
    correct_verdict: bool  # Did we get the right pass/fail?
    latency_ms: float
    error: str = ""


async def run_benchmark():
    """Run the answer evaluation benchmark."""
    from backend.services.answer_evaluator_v3 import AnswerEvaluatorV3

    print("Benchmark — Answer Evaluation V3 (3-tier + 1b)")
    print("=" * 70)
    print(f"Total test answers: {len(TEST_ANSWERS)}")

    evaluator = AnswerEvaluatorV3()
    results = []

    # Run all tests
    print(f"\nRunning {len(TEST_ANSWERS)} evaluations...")
    for i, test in enumerate(TEST_ANSWERS):
        try:
            result = await evaluator.evaluate(
                student_answer=test["student_answer"],
                model_answer=test["model_answer"],
                question_type=test.get("question_type"),
                max_marks=test["max_marks"],
                correct_option=test.get("correct_option"),
                options=test.get("options"),
            )

            # Check if verdict is correct (marks match expected)
            correct_verdict = (result.marks_awarded > 0) == (test["expected_marks"] > 0)

            bench_result = BenchmarkResult(
                test_id=test["id"],
                question_type=test["question_type"],
                expected_marks=test["expected_marks"],
                expected_tier=test["expected_tier"],
                actual_marks=result.marks_awarded,
                actual_tier=result.tier,
                strategy=result.strategy,
                correct_verdict=correct_verdict,
                latency_ms=result.latency_ms,
                error=result.error or "",
            )
            results.append(bench_result)

            if (i + 1) % 40 == 0:
                correct_count = sum(1 for r in results if r.correct_verdict)
                print(f"  [{i+1}/{len(TEST_ANSWERS)}] {correct_count}/{len(results)} correct so far")

        except Exception as e:
            results.append(BenchmarkResult(
                test_id=test["id"],
                question_type=test["question_type"],
                expected_marks=test["expected_marks"],
                expected_tier=test["expected_tier"],
                actual_marks=-1,
                actual_tier="error",
                strategy="error",
                correct_verdict=False,
                latency_ms=0,
                error=str(e),
            ))

    # Compute metrics
    total = len(results)
    correct_verdicts = sum(1 for r in results if r.correct_verdict)
    accuracy = correct_verdicts / total

    # Per-tier distribution
    tier_counts = {}
    for r in results:
        tier_counts[r.actual_tier] = tier_counts.get(r.actual_tier, 0) + 1

    # Per-question-type accuracy
    type_accuracy = {}
    for r in results:
        qt = r.question_type
        if qt not in type_accuracy:
            type_accuracy[qt] = {"correct": 0, "total": 0}
        type_accuracy[qt]["total"] += 1
        if r.correct_verdict:
            type_accuracy[qt]["correct"] += 1

    # Latency stats
    avg_latency = sum(r.latency_ms for r in results) / total
    tier1_latency = [r.latency_ms for r in results if r.actual_tier == "1"]
    tier1b_latency = [r.latency_ms for r in results if r.actual_tier == "1b"]

    # Print summary
    print(f"\n{'='*70}")
    print(f"BENCHMARK RESULTS")
    print(f"{'='*70}")
    print(f"\nOverall accuracy: {accuracy:.1%} ({correct_verdicts}/{total})")
    print(f"\nTier distribution:")
    for tier, count in sorted(tier_counts.items()):
        print(f"  Tier {tier}: {count} ({count/total:.1%})")
    print(f"\nPer question type:")
    for qt, stats in sorted(type_accuracy.items()):
        acc = stats["correct"] / stats["total"]
        print(f"  {qt:15s}: {acc:.1%} ({stats['correct']}/{stats['total']})")
    print(f"\nLatency:")
    print(f"  Overall: {avg_latency:.1f}ms avg")
    if tier1_latency:
        print(f"  Tier 1:  {sum(tier1_latency)/len(tier1_latency):.1f}ms avg ({len(tier1_latency)} answers)")
    if tier1b_latency:
        print(f"  Tier 1b: {sum(tier1b_latency)/len(tier1b_latency):.1f}ms avg ({len(tier1b_latency)} answers)")

    # Save results
    output = {
        "total": total,
        "accuracy": accuracy,
        "tier_distribution": tier_counts,
        "type_accuracy": {k: {"accuracy": v["correct"]/v["total"], **v} for k, v in type_accuracy.items()},
        "avg_latency_ms": avg_latency,
        "results": [asdict(r) for r in results],
    }

    output_file = OUTPUT_DIR / "eval_benchmark_results.json"
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, ensure_ascii=False, default=str)

    print(f"\nResults saved to: {output_file}")


if __name__ == "__main__":
    asyncio.run(run_benchmark())
