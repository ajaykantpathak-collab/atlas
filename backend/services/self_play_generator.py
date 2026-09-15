import json, os, random, time, urllib.request
from dataclasses import dataclass, field, asdict
from typing import Optional, List, Dict
from datetime import datetime

CONCEPTS = {
    "Physics": ["Kinematics","Laws of Motion","Work Energy Power","Rotational Motion",
                "Gravitation","Thermodynamics","Electrostatics","Current Electricity",
                "Magnetic Effect","EMI","Optics","Modern Physics","SHM","Waves","Fluids"],
    "Chemistry": ["Atomic Structure","Chemical Bonding","Periodic Table","Thermochemistry",
                 "Equilibrium","Kinetics","Electrochemistry","Solutions","Coordination Compounds",
                 "Organic Compounds","Hydrocarbons","Haloalkanes","Alcohols","Aldehydes",
                 "Amines","Biomolecules","Polymers","Surface Chemistry","Metallurgy"],
    "Mathematics": ["Sets Relations Functions","Trigonometry","Complex Numbers",
                   "Matrices Determinants","Sequence Series","Limits Continuity",
                   "Differentiability","Integration","Differential Equations",
                   "Probability","Statistics","Coordinate Geometry","Conic Sections",
                   "Vector Algebra","3D Geometry","Binomial Theorem","Mathematical Induction",
                   "Straight Lines","Circles"]
}

STRATEGIES = ["concept_combination","parameter_variation","constraint_addition",
              "context_switch","difficulty_escalation"]

@dataclass
class GeneratedProblem:
    problem_id: str
    problem_text: str
    subject: str
    concepts: List[str]
    difficulty: str
    solution: Dict
    verification: Dict
    is_valid: bool
    generation_method: str

class SelfPlayGenerator:
    def __init__(self, strategy_library=None, symbolic_solver=None, verification_engine=None):
        self.strategy_library = strategy_library or STRATEGIES
        self.symbolic_solver = symbolic_solver
        self.verification_engine = verification_engine
        self.save_path = r"D:\platform\cbse_data\generated_problems.json"
        self.stats: Dict[str, Dict[str, Dict[str, int]]] = {}
        self.counter = 0
        self._load_problems()

    def _load_problems(self):
        if os.path.exists(self.save_path):
            with open(self.save_path) as f:
                data = json.load(f)
                for p in data.get("problems", []):
                    gp = GeneratedProblem(**p)
                    self.counter = max(self.counter, int(gp.problem_id.split("_")[-1]) + 1)
                self.stats = data.get("stats", {})

    def _save(self):
        if not os.path.exists(os.path.dirname(self.save_path)):
            os.makedirs(os.path.dirname(self.save_path), exist_ok=True)
        data = {"problems": [asdict(p) for p in getattr(self, '_all_problems', [])],
                "stats": self.stats,
                "last_updated": datetime.now().isoformat()}
        with open(self.save_path, "w") as f:
            json.dump(data, f, indent=2)

    def _update_stats(self, subject, difficulty, success):
        self.stats.setdefault(subject, {}).setdefault(difficulty, {"total": 0, "success": 0})
        s = self.stats[subject][difficulty]
        s["total"] += 1
        if success:
            s["success"] += 1

    def _call_api(self, prompt):
        payload = json.dumps({
            "model": "fable",
            "max_tokens": 2000,
            "messages": [{"role": "user", "content": prompt}]
        }).encode()
        req = urllib.request.Request(
            url="https://api.claudeopus.pro/v1/messages",
            data=payload,
            headers={"Content-Type": "application/json",
                     "x-api-key": os.environ.get("FABLE_API_KEY", ""),
                     "anthropic-version": "2023-06-01"},
            method="POST"
        )
        with urllib.request.urlopen(req, timeout=60) as r:
            return json.loads(r.read().decode())

    def _build_prompt(self, subject, difficulty, concepts, strategy) -> str:
        c = ", ".join(concepts)
        return f"""Generate a JEE/NEET {subject} problem (difficulty: {difficulty}) covering concepts: {c}.
Strategy: {strategy}

Return valid JSON only:
{{"problem_text": "...", "solution": {{"answer": "...", "steps": ["..."]}}, "options": ["A","B","C","D"]}}"""

    def _parse_response(self, text: str) -> Optional[Dict]:
        try:
            start, end = text.index("{"), text.rindex("}") + 1
            return json.loads(text[start:end])
        except Exception:
            return None

    def generate(self, subject: str, difficulty: str, num_concepts: int = 3) -> GeneratedProblem:
        concepts = random.sample(CONCEPTS.get(subject, []), min(num_concepts, len(CONCEPTS.get(subject, []))))
        strategy = random.choice(self.strategy_library)
        prompt = self._build_prompt(subject, difficulty, concepts, strategy)
        problem_text, solution, options = "", {}, []
        try:
            resp = self._call_api(prompt)
            content = resp.get("content", [{}])[0].get("text", "")
            parsed = self._parse_response(content)
            if parsed:
                problem_text = parsed.get("problem_text", "")
                solution = parsed.get("solution", {})
                options = parsed.get("options", [])
        except Exception as e:
            solution = {"error": str(e)}

        pid = f"GP_{subject[0]}_{self.counter:06d}"
        self.counter += 1
        problem = GeneratedProblem(
            problem_id=pid, problem_text=problem_text, subject=subject,
            concepts=concepts, difficulty=difficulty, solution=solution,
            verification={"options": options}, is_valid=False, generation_method=strategy
        )
        problem.is_valid = self.validate(problem)
        self._update_stats(subject, difficulty, problem.is_valid)
        if not hasattr(self, '_all_problems'):
            self._all_problems = []
        self._all_problems.append(problem)
        self._save()
        return problem

    def generate_batch(self, count: int, subject: str = None) -> List[GeneratedProblem]:
        results = []
        for _ in range(count):
            subj = subject or random.choice(list(CONCEPTS.keys()))
            diffs = ["Easy", "Medium", "Hard"] if subj == "Physics" else ["Easy", "Medium", "Hard"]
            prob = self.generate(subj, random.choice(diffs))
            results.append(prob)
        return results

    def validate(self, problem: GeneratedProblem) -> bool:
        if not problem.problem_text.strip():
            return False
        if len(problem.concepts) < 1:
            return False
        if not problem.solution.get("answer"):
            return False
        if self.symbolic_solver:
            try:
                if not self.symbolic_solver(problem.problem_text, problem.solution):
                    return False
            except Exception:
                pass
        return True

    def success_rate(self, subject: str = None, difficulty: str = None) -> float:
        total = succ = 0
        for sub, diffs in self.stats.items():
            if subject and sub != subject:
                continue
            for dif, s in diffs.items():
                if difficulty and dif != difficulty:
                    continue
                total += s["total"]
                succ += s["success"]
        return succ / total if total else 0.0

    def summary(self) -> str:
        lines = ["=== Self-Play Generator Stats ==="]
        for sub, diffs in self.stats.items():
            lines.append(f"\n[{sub}]")
            for dif, s in diffs.items():
                rate = s["success"] / s["total"] * 100 if s["total"] else 0
                lines.append(f"  {dif}: {s['success']}/{s['total']} ({rate:.1f}%)")
        lines.append(f"\nOverall: {self.success_rate()*100:.1f}%")
        return "\n".join(lines)

def main():
    gen = SelfPlayGenerator()
    print("Generating 5 sample problems...")
    problems = gen.generate_batch(5)
    for p in problems:
        status = "VALID" if p.is_valid else "INVALID"
        print(f"[{status}] {p.problem_id} | {p.subject} | {p.difficulty} | {p.generation_method}")
        print(f"  Concepts: {', '.join(p.concepts)}")
        print(f"  Problem: {p.problem_text[:100]}...")
        print()
    print(gen.summary())

if __name__ == "__main__":
    main()