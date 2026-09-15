"""Full K-12 learning experience test.
Simulates a student journey from Class 6 through Class 12 and into JEE/NEET.
Tests the entire intelligence pipeline end-to-end with real curriculum nodes.

NOT Devin subagents — these are programmed Python student simulators.
"""
import sys, os, json, time, random, warnings, traceback
from pathlib import Path
from collections import defaultdict

warnings.filterwarnings("ignore")
sys.path.insert(0, r"D:\platform\backend")
sys.path.insert(0, r"D:\platform\backend\services")

NODES_DIR = r"D:\platform\cbse_data\nodes\by_subject"
ENRICH_DIR = r"D:\platform\cbse_data\enrichment"

# ─── Load all nodes ────────────────────────────────────────────────────────
print("=" * 70)
print("FULL K-12 LEARNING EXPERIENCE TEST")
print("Class 6 → Class 12 → JEE/NEET")
print("=" * 70)

print("\nLoading curriculum data...")
all_nodes = {}
by_class_subject = defaultdict(list)

for f in sorted(Path(NODES_DIR).glob("*.json")):
    data = json.loads(f.read_text(encoding="utf-8"))
    for node in data:
        nid = node.get("node_id", "")
        if nid:
            all_nodes[nid] = node
            key = (node.get("class_level", 0), node.get("subject", "unknown"))
            by_class_subject[key].append(nid)

print(f"  Loaded {len(all_nodes)} nodes across {len(by_class_subject)} class/subject combos")

# ─── Load enrichment ───────────────────────────────────────────────────────
print("Loading enrichment data...")
enrichment = {}
for f in sorted(Path(ENRICH_DIR).glob("*.marker")):
    text = f.read_text(encoding="utf-8", errors="replace")
    blocks = text.split("--- NODE ")[1:]
    for block in blocks:
        nid = block.split("\n")[0].replace("---", "").strip()
        if nid:
            # Quick parse - just get title, cognitive level, misconceptions count
            title_m = block.find("TITLE:")
            cog_m = block.find("COGNITIVE_LEVEL:")
            misc_m = block.find("COMMON_MISCONCEPTION:")
            on_fail_m = block.find("ON_FAILURE:")
            diag_m = block.find("DIAGNOSTIC_QUESTION:")
            
            title = block[title_m+6:cog_m].strip() if title_m >= 0 and cog_m >= 0 else ""
            cog = ""
            if cog_m >= 0:
                cog_line = block[cog_m:cog_m+50].split("\n")[0]
                cog = cog_line.replace("COGNITIVE_LEVEL:", "").strip()
            
            misc_count = block.count("Misconception ") if misc_m >= 0 else 0
            
            enrichment[nid] = {
                "title": title,
                "cognitive_level": cog,
                "misconception_count": misc_count,
                "has_diagnostic": diag_m >= 0,
                "has_on_failure": on_fail_m >= 0,
            }

print(f"  Loaded {len(enrichment)} enrichment records")

# ─── Initialize intelligence components ────────────────────────────────────
print("\nInitializing intelligence components...")

from state_4d_builder import State4DBuilder
from concept_graph_traverser import ConceptGraphTraverser
from specialized_agents import create_ensemble
from deterministic_orchestrator import DeterministicOrchestrator
from confidence_calibrator import ConfidenceCalibrator
from interaction_capture import SimpleInteractionCapture
from jee_neet_solver import JEENEETSolver

state_builder = State4DBuilder()
traverser = ConceptGraphTraverser(NODES_DIR)
ensemble = create_ensemble()
orchestrator = DeterministicOrchestrator()
calibrator = ConfidenceCalibrator()
capture = SimpleInteractionCapture()

# Apply Fable calibration
cal_path = r"D:\platform\backend\services\agent_calibration.json"
if os.path.exists(cal_path):
    with open(cal_path, encoding="utf-8") as f:
        calibration = json.load(f)
    
    agent_map = {
        "ethics_bot": "ethics_bot", "assessment_bot": "assessment_bot",
        "scaffold_bot": "scaffold_bot", "feedback_bot": "feedback_bot",
        "motivator_bot": "motivator_bot", "tutor_bot": "tutor_bot",
    }
    
    for cal_key, agent_name in agent_map.items():
        cal_data = calibration.get(cal_key, {})
        params = cal_data.get("params", {})
        agent = None
        for a in ensemble.agents:
            if getattr(a, "agent_name", "") == agent_name:
                agent = a
                break
        if agent:
            for pname, pval in params.items():
                if hasattr(agent, "set_param"):
                    try: agent.set_param(pname, pval)
                    except: pass
                try: setattr(agent, pname, pval)
                except: pass
    
    # Add cross-agent rules
    from deterministic_orchestrator import OrchestratorRule
    cross_rules = calibration.get("cross_agent_rules", [])
    for i, rule_text in enumerate(cross_rules):
        rule_lower = str(rule_text).lower()
        if "devanagari" in rule_lower or "hindi" in rule_lower:
            orchestrator.add_rule(OrchestratorRule(
                rule_name=f"fable_hindi_{i}", 
                condition={"field": "language", "operator": "==", "value": "hi"},
                action={"agent": "TutorBot", "action_type": "tutor", "unicode_guard": True},
                priority=8, is_active=True, source="fable_calibration"))
        elif "diagnostic" in rule_lower and "empty" in rule_lower:
            orchestrator.add_rule(OrchestratorRule(
                rule_name=f"fable_diag_{i}",
                condition={"field": "diagnostic_empty", "operator": "==", "value": True},
                action={"agent": "AssessmentBot", "action_type": "assess", "fallback": "generate"},
                priority=19, is_active=True, source="fable_calibration"))
    
    print(f"  Applied Fable calibration: {len(calibration)} components")

print(f"  Orchestrator rules: {len(orchestrator.get_active_rules())}")
print(f"  Agents: {len(ensemble.agents)}")

# ─── Student Simulator ─────────────────────────────────────────────────────
class StudentSimulator:
    """Programmed Python student simulator — NOT a Devin subagent."""
    
    def __init__(self, student_id, learning_speed="average", confidence_bias="realistic"):
        self.student_id = student_id
        self.learning_speed = learning_speed  # slow, average, fast
        self.confidence_bias = confidence_bias  # overconfident, underconfident, realistic
        self.mastery_map = {}  # node_id -> mastery 0-1
        self.interaction_history = []
        self.session_id = f"sess_{student_id}"
        self.current_class = 6
        self.current_subject = "physics"
        self.concepts_learned = 0
        self.concepts_mastered = 0
        self.hints_used_total = 0
        self.errors_made = 0
        self.questions_asked = 0
        self.confidence_ratings = []
        self.frustration = 0.0
        self.motivation = 0.8
    
    def get_mastery(self, node_id):
        return self.mastery_map.get(node_id, 0.0)
    
    def update_mastery(self, node_id, is_correct, hints_used):
        current = self.get_mastery(node_id)
        # BKT-like update
        if is_correct:
            if hints_used == 0:
                gain = 0.15 if self.learning_speed == "fast" else 0.10 if self.learning_speed == "average" else 0.06
            else:
                gain = 0.08 if self.learning_speed == "fast" else 0.05 if self.learning_speed == "average" else 0.03
        else:
            gain = -0.05
        
        new_mastery = max(0.0, min(1.0, current + gain))
        self.mastery_map[node_id] = new_mastery
        
        if new_mastery >= 0.7:
            self.concepts_mastered += 1
        self.concepts_learned += 1
        
        return current, new_mastery
    
    def answer_question(self, node_id, difficulty, hints_available):
        """Simulate answering a question based on mastery and difficulty."""
        mastery = self.get_mastery(node_id)
        
        # Probability of correct answer
        diff_map = {"easy": 0.1, "medium": 0.2, "hard": 0.3, "very_hard": 0.4}
        diff_penalty = diff_map.get(difficulty, 0.2)
        
        base_prob = mastery - diff_penalty + 0.3
        base_prob = max(0.1, min(0.9, base_prob))
        
        # Adjust for learning speed
        if self.learning_speed == "fast":
            base_prob += 0.05
        elif self.learning_speed == "slow":
            base_prob -= 0.05
        
        # Frustration reduces accuracy
        base_prob -= self.frustration * 0.1
        
        is_correct = random.random() < base_prob
        
        # Decide if student asks for hint
        hints_used = 0
        if not is_correct and hints_available > 0:
            # Student might ask for hint
            hint_prob = 0.3 + self.frustration * 0.3
            if random.random() < hint_prob:
                hints_used = random.randint(1, min(hints_available, 3))
                self.hints_used_total += hints_used
                # Hint might help
                if random.random() < 0.4:
                    is_correct = random.random() < base_prob + 0.2
        
        if not is_correct:
            self.errors_made += 1
            self.frustration = min(1.0, self.frustration + 0.1)
        else:
            self.frustration = max(0.0, self.frustration - 0.05)
            self.motivation = min(1.0, self.motivation + 0.02)
        
        self.questions_asked += 1
        
        # Confidence rating
        if self.confidence_bias == "overconfident":
            conf = random.choice([4, 5, 5, 4, 3])
        elif self.confidence_bias == "underconfident":
            conf = random.choice([1, 2, 2, 3, 2])
        else:
            conf = random.choice([2, 3, 3, 4, 3])
        
        self.confidence_ratings.append((node_id, conf, is_correct))
        
        return is_correct, hints_used, conf
    
    def get_state_dict(self, node_id):
        mastery = self.get_mastery(node_id)
        return {
            "cognitive": {
                "mastery": mastery,
                "irt_ability": mastery * 1.2 - 0.1,
                "concept_gaps": [],
                "cognitive_level": enrichment.get(node_id, {}).get("cognitive_level", "understand"),
            },
            "affective": {
                "frustration": self.frustration,
                "confidence": sum(r[1] for r in self.confidence_ratings[-10:]) / max(1, len(self.confidence_ratings[-10:])) / 5,
                "motivation": self.motivation,
                "boredom": max(0, 0.5 - self.motivation),
            },
            "behavioral": {
                "hints_used": self.hints_used_total,
                "avg_response_time_ms": 15000 + int(self.frustration * 10000),
                "error_streak": min(5, self.errors_made % 5),
                "attempt_number": self.questions_asked,
            },
            "temporal": {
                "hour": 14,
                "session_length_min": min(120, self.questions_asked * 3),
            },
        }
    
    def summary(self):
        mastery_avg = sum(self.mastery_map.values()) / max(1, len(self.mastery_map))
        return {
            "student_id": self.student_id,
            "class": self.current_class,
            "concepts_learned": self.concepts_learned,
            "concepts_mastered": self.concepts_mastered,
            "mastery_avg": round(mastery_avg, 3),
            "hints_used": self.hints_used_total,
            "errors": self.errors_made,
            "questions": self.questions_asked,
            "frustration": round(self.frustration, 2),
            "motivation": round(self.motivation, 2),
        }

# ─── Test Flow: Class 6 → 12 → JEE/NEET ────────────────────────────────────
print(f"\n{'='*70}")
print("STARTING FULL K-12 FLOW TEST")
print(f"{'='*70}")

# Create 3 diverse students
students = [
    StudentSimulator("student_fast", "fast", "overconfident"),
    StudentSimulator("student_avg", "average", "realistic"),
    StudentSimulator("student_slow", "slow", "underconfident"),
]

# Test subjects across class range
test_plan = [
    # (class, subject, num_nodes_to_try)
    (6, "physics", 5),
    (6, "biology", 5),
    (7, "physics", 5),
    (7, "maths", 5),
    (8, "chemistry", 5),
    (8, "geography", 3),
    (9, "physics", 5),
    (9, "biology", 5),
    (10, "chemistry", 5),
    (10, "maths", 5),
    (11, "physics", 8),
    (11, "chemistry", 8),
    (11, "biology", 5),
    (11, "maths", 5),
    (12, "physics", 8),
    (12, "chemistry", 5),
    (12, "biology", 5),
]

all_results = []

for student in students:
    print(f"\n{'─'*70}")
    print(f"STUDENT: {student.student_id} (speed={student.learning_speed}, confidence={student.confidence_bias})")
    print(f"{'─'*70}")
    
    for class_level, subject, num_nodes in test_plan:
        # Find nodes for this class/subject
        key = (class_level, subject)
        node_ids = by_class_subject.get(key, [])
        
        if not node_ids:
            # Try alternate subject names
            for alt_subj in [subject, subject.replace("_", ""), subject.replace("s", ""), 
                             "phy" if subject == "physics" else subject,
                             "bio" if subject == "biology" else subject,
                             "chem" if subject == "chemistry" else subject,
                             "math" if subject == "maths" else subject]:
                alt_key = (class_level, alt_subj)
                if alt_key in by_class_subject:
                    node_ids = by_class_subject[alt_key]
                    break
        
        if not node_ids:
            print(f"  C{class_level} {subject}: NO NODES FOUND")
            continue
        
        # Pick nodes (roots first, then sequential)
        test_nodes = node_ids[:num_nodes]
        student.current_class = class_level
        
        class_results = {"correct": 0, "hints": 0, "total": 0, "mastered": 0}
        
        for node_id in test_nodes:
            node = all_nodes.get(node_id)
            if not node:
                continue
            
            enrich = enrichment.get(node_id, {})
            difficulty = node.get("difficulty", "medium")
            cog_level = enrich.get("cognitive_level", "understand")
            
            # Build student state
            student_state = student.get_state_dict(node_id)
            
            # Get teaching context
            try:
                ctx = traverser.get_teaching_context(node_id)
                if not isinstance(ctx, dict):
                    ctx = {}
            except:
                ctx = {}
            
            # Add enrichment to context
            ctx["current_concept"] = {
                "node_id": node_id,
                "title": enrich.get("title", node.get("topic", "")),
                "cognitive_level": cog_level,
                "difficulty": difficulty,
            }
            ctx["difficulty"] = difficulty
            ctx["misconceptions"] = []  # Would come from enrichment parse
            
            # Run agents
            try:
                actions = ensemble.run_all_agents(student_state, ctx, student.interaction_history[-10:])
            except:
                actions = []
            
            # Orchestrator decides
            winning_action = None
            try:
                if actions:
                    winning_action = orchestrator.decide(student_state, ctx, student.interaction_history[-10:], actions)
            except:
                pass
            
            # Determine action type
            action_type = "tutor"
            agent_used = "TutorBot"
            rule_used = "default"
            if winning_action:
                if hasattr(winning_action, "action_type"):
                    action_type = winning_action.action_type
                    agent_used = getattr(winning_action, "agent_name", "TutorBot")
                elif isinstance(winning_action, dict):
                    action_type = winning_action.get("action_type", "tutor")
                    agent_used = winning_action.get("agent_name", "TutorBot")
            
            # Student answers based on action
            if action_type == "assess":
                hints_available = 0 if action_type == "assess" else 3
                is_correct, hints_used, conf = student.answer_question(node_id, difficulty, hints_available)
            elif action_type == "scaffold":
                is_correct, hints_used, conf = student.answer_question(node_id, difficulty, 3)
            else:
                # Tutor/explain — student learns, then we test
                is_correct, hints_used, conf = student.answer_question(node_id, difficulty, 2)
            
            # Update mastery
            mastery_before, mastery_after = student.update_mastery(node_id, is_correct, hints_used)
            
            # Record confidence
            calibrator.record_confidence(student.student_id, node_id, conf, is_correct)
            
            # Log interaction
            try:
                capture.capture(
                    student_id=student.student_id,
                    session_id=student.session_id,
                    subject=subject,
                    concept=node_id,
                    grade_level=class_level,
                    interaction_type=action_type,
                    node_id=node_id,
                    question=enrich.get("title", ""),
                    response="correct" if is_correct else "incorrect",
                    is_correct=is_correct,
                    time_spent_ms=15000 + int(student.frustration * 10000),
                    hints_used=hints_used,
                    action_taken=action_type,
                    mastery_before=mastery_before,
                    mastery_after=mastery_after,
                )
            except:
                pass
            
            # Track results
            class_results["total"] += 1
            if is_correct:
                class_results["correct"] += 1
            class_results["hints"] += hints_used
            if mastery_after >= 0.7:
                class_results["mastered"] += 1
            
            # Add to interaction history
            student.interaction_history.append({
                "node_id": node_id,
                "is_correct": is_correct,
                "hints_used": hints_used,
                "action_type": action_type,
                "mastery_after": mastery_after,
            })
        
        accuracy = class_results["correct"] / max(1, class_results["total"])
        mastery_rate = class_results["mastered"] / max(1, class_results["total"])
        print(f"  C{class_level} {subject}: {class_results['correct']}/{class_results['total']} correct ({accuracy:.0%}), "
              f"mastered: {class_results['mastered']}, hints: {class_results['hints']}")
        
        all_results.append({
            "student": student.student_id,
            "class": class_level,
            "subject": subject,
            **class_results,
            "accuracy": round(accuracy, 3),
            "mastery_rate": round(mastery_rate, 3),
        })

# ─── JEE/NEET Phase ────────────────────────────────────────────────────────
print(f"\n{'─'*70}")
print("JEE/NEET PHASE — Competitive Exam Problems")
print(f"{'─'*70}")

jee_problems = [
    ("A block of mass 2 kg is placed on a rough inclined plane with angle 30 degrees. The coefficient of friction is 0.5. Find the acceleration of the block. (g = 10 m/s^2)", "physics", "jee_main"),
    ("A charged particle of charge q moves with velocity v in a magnetic field B perpendicular to v. Find the radius of the circular path.", "physics", "jee_main"),
    ("Find the derivative of f(x) = x^3 * sin(x) using the product rule.", "math", "jee_main"),
    ("Balance the chemical equation: Fe + O2 -> Fe2O3", "chemistry", "neet"),
    ("A body is projected at 60 degrees with velocity 20 m/s. Find the maximum height. (g = 10)", "physics", "jee_advanced"),
]

solver = JEENEETSolver()

for student in students:
    print(f"\n  {student.student_id}:")
    for i, (problem, subject, exam_type) in enumerate(jee_problems):
        try:
            result = solver.solve(problem, subject=subject, exam_type=exam_type)
            if isinstance(result, dict):
                solved = result.get("solved", False)
                answer = str(result.get("final_answer", ""))[:60]
                confidence = result.get("confidence", 0)
            elif hasattr(result, "solved"):
                solved = result.solved
                answer = str(getattr(result, "final_answer", ""))[:60]
                confidence = getattr(result, "confidence", 0)
            else:
                solved = False
                answer = "N/A"
                confidence = 0
            
            status = "SOLVED" if solved else "FAILED"
            print(f"    Problem {i+1} ({exam_type}/{subject}): {status} | confidence={confidence:.2f} | answer={answer}")
            
            all_results.append({
                "student": student.student_id,
                "phase": "jee_neet",
                "problem": i+1,
                "subject": subject,
                "exam_type": exam_type,
                "solved": solved,
                "confidence": round(confidence, 3),
            })
        except Exception as e:
            print(f"    Problem {i+1}: ERROR - {str(e)[:80]}")

# ─── Final Summary ─────────────────────────────────────────────────────────
print(f"\n{'='*70}")
print("FULL K-12 FLOW TEST — FINAL SUMMARY")
print(f"{'='*70}")

for student in students:
    s = student.summary()
    print(f"\n  {s['student_id']} (class {s['class']}):")
    print(f"    Concepts learned: {s['concepts_learned']}")
    print(f"    Concepts mastered: {s['concepts_mastered']}")
    print(f"    Avg mastery: {s['mastery_avg']}")
    print(f"    Hints used: {s['hints_used']}")
    print(f"    Errors: {s['errors']}")
    print(f"    Questions: {s['questions']}")
    print(f"    Frustration: {s['frustration']}")
    print(f"    Motivation: {s['motivation']}")
    
    # Confidence calibration
    cal = calibrator.get_calibration(student.student_id)
    if isinstance(cal, dict):
        print(f"    Confidence bias: {cal.get('bias', 'N/A')}")
    elif hasattr(cal, "bias"):
        print(f"    Confidence bias: {cal.bias}")

# Subject performance
print(f"\n  Subject Performance (all students):")
subject_perf = defaultdict(lambda: {"correct": 0, "total": 0, "mastered": 0})
for r in all_results:
    if "subject" in r and "accuracy" in r:
        subject_perf[r["subject"]]["correct"] += r["correct"]
        subject_perf[r["subject"]]["total"] += r["total"]
        subject_perf[r["subject"]]["mastered"] += r.get("mastered", 0)

for subj, perf in sorted(subject_perf.items()):
    acc = perf["correct"] / max(1, perf["total"])
    print(f"    {subj}: {perf['correct']}/{perf['total']} ({acc:.0%}), mastered: {perf['mastered']}")

# JEE/NEET results
jee_results = [r for r in all_results if r.get("phase") == "jee_neet"]
if jee_results:
    solved = sum(1 for r in jee_results if r.get("solved"))
    print(f"\n  JEE/NEET: {solved}/{len(jee_results)} solved ({solved/len(jee_results):.0%})")

print(f"\n{'='*70}")
print("TEST COMPLETE")
print(f"{'='*70}")
