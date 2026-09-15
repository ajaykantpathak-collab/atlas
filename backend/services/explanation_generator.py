from __future__ import annotations

import json
import os
import urllib.request
import urllib.error
import urllib.parse
from dataclasses import dataclass, field
from typing import Optional


# ---------------------------------------------------------------------------
# 4-D Student State
# ---------------------------------------------------------------------------

@dataclass
class StudentState4D:
    comprehension: float = 0.5
    speed: float = 0.5
    accuracy: float = 0.5
    topic_proficiency: float = 0.5

    def get_level(self) -> str:
        avg = (self.comprehension + self.speed + self.accuracy + self.topic_proficiency) / 4
        if avg < 0.33:
            return "struggling"
        elif avg < 0.66:
            return "average"
        return "advanced"

    def get_detail_level(self) -> str:
        if self.comprehension < 0.4:
            return "detailed"
        elif self.comprehension < 0.7:
            return "moderate"
        return "concise"

    def validate(self) -> tuple[bool, Optional[str]]:
        for name, val in [
            ("comprehension", self.comprehension),
            ("speed", self.speed),
            ("accuracy", self.accuracy),
            ("topic_proficiency", self.topic_proficiency),
        ]:
            if not 0.0 <= val <= 1.0:
                return False, f"{name}={val} out of range [0.0, 1.0]"
        return True, None


# ---------------------------------------------------------------------------
# Data Classes
# ---------------------------------------------------------------------------

@dataclass
class ExplanationStep:
    step_number: int
    title: str
    content: str
    formula_used: str = ""
    computation: str = ""
    insight: str = ""
    common_mistake: str = ""

    def to_dict(self) -> dict:
        return {
            "step_number": self.step_number,
            "title": self.title,
            "content": self.content,
            "formula_used": self.formula_used,
            "computation": self.computation,
            "insight": self.insight,
            "common_mistake": self.common_mistake,
        }

    @classmethod
    def from_dict(cls, d: dict) -> "ExplanationStep":
        return cls(
            step_number=d["step_number"],
            title=d["title"],
            content=d["content"],
            formula_used=d.get("formula_used", ""),
            computation=d.get("computation", ""),
            insight=d.get("insight", ""),
            common_mistake=d.get("common_mistake", ""),
        )


@dataclass
class Explanation:
    problem_id: str
    steps: list[ExplanationStep] = field(default_factory=list)
    final_answer: str = ""
    key_insights: list[str] = field(default_factory=list)
    time_estimate: int = 10
    difficulty_rating: str = "Medium"
    given: str = ""
    to_find: str = ""
    approach: str = ""
    language: str = "en"
    api_error: Optional[str] = None

    def to_dict(self) -> dict:
        return {
            "problem_id": self.problem_id,
            "steps": [s.to_dict() for s in self.steps],
            "final_answer": self.final_answer,
            "key_insights": self.key_insights,
            "time_estimate": self.time_estimate,
            "difficulty_rating": self.difficulty_rating,
            "given": self.given,
            "to_find": self.to_find,
            "approach": self.approach,
            "language": self.language,
        }

    @classmethod
    def from_dict(cls, d: dict) -> "Explanation":
        steps = [ExplanationStep.from_dict(s) for s in d.get("steps", [])]
        return cls(
            problem_id=d["problem_id"],
            steps=steps,
            final_answer=d.get("final_answer", ""),
            key_insights=d.get("key_insights", []),
            time_estimate=d.get("time_estimate", 10),
            difficulty_rating=d.get("difficulty_rating", "Medium"),
            given=d.get("given", ""),
            to_find=d.get("to_find", ""),
            approach=d.get("approach", ""),
            language=d.get("language", "en"),
        )

    def to_json(self) -> str:
        return json.dumps(self.to_dict(), ensure_ascii=False, indent=2)

    def render_text(self) -> str:
        lines: list[str] = []
        w = 70
        lines.append("=" * w)
        lines.append(f"  Problem ID : {self.problem_id}")
        lines.append(f"  Difficulty : {self.difficulty_rating}  |  Est. Time: {self.time_estimate} min")
        lines.append("=" * w)
        if self.api_error:
            lines.append(f"\n[Note: API unavailable — template explanation. ({self.api_error})]\n")
        lines.append("")
        if self.given:
            lines.append("GIVEN:")
            for g in self.given.split("\n"):
                lines.append(f"  {g}")
            lines.append("")
        if self.to_find:
            lines.append("TO FIND:")
            for t in self.to_find.split("\n"):
                lines.append(f"  {t}")
            lines.append("")
        if self.approach:
            lines.append("APPROACH:")
            for a in self.approach.split("\n"):
                lines.append(f"  {a}")
            lines.append("")
        for step in self.steps:
            lines.append("-" * w)
            lines.append(f"  Step {step.step_number}: {step.title}")
            lines.append("-" * w)
            if step.formula_used:
                lines.append(f"  Formula  : {step.formula_used}")
            lines.append(f"  Solution : {step.content}")
            if step.computation:
                lines.append(f"  Compute  : {step.computation}")
            if step.insight:
                lines.append(f"  Insight  : {step.insight}")
            if step.common_mistake:
                lines.append(f"  Watch Out: {step.common_mistake}")
            lines.append("")
        lines.append("=" * w)
        lines.append(f"  ANSWER: {self.final_answer}")
        lines.append("=" * w)
        if self.key_insights:
            lines.append("")
            lines.append("KEY INSIGHTS:")
            for ki in self.key_insights:
                lines.append(f"  * {ki}")
            lines.append("")
        return "\n".join(lines)

    def render_html(self) -> str:
        esc = lambda s: (
            s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
        )
        parts: list[str] = []
        parts.append(f'<div class="explanation" data-problem="{esc(self.problem_id)}">')
        parts.append(f'  <h2>Problem: {esc(self.problem_id)}</h2>')
        parts.append(f'  <p class="meta">Difficulty: <strong>{esc(self.difficulty_rating)}</strong>'
                     f' | Est. Time: {self.time_estimate} min</p>')
        if self.api_error:
            parts.append(f'  <p class="note">Template-based (API unavailable: {esc(self.api_error)})</p>')
        if self.given:
            parts.append("  <div class='section given'>")
            parts.append(f"    <h3>Given</h3><ul>")
            for item in self.given.split("\n"):
                parts.append(f"      <li>{esc(item)}</li>")
            parts.append("    </ul></div>")
        if self.to_find:
            parts.append("  <div class='section to-find'>")
            parts.append(f"    <h3>To Find</h3><ul>")
            for item in self.to_find.split("\n"):
                parts.append(f"      <li>{esc(item)}</li>")
            parts.append("    </ul></div>")
        if self.approach:
            parts.append("  <div class='section approach'>")
            parts.append(f"    <h3>Approach</h3><p>{esc(self.approach)}</p></div>")
        parts.append('  <div class="steps">')
        for step in self.steps:
            parts.append('    <div class="step">')
            parts.append(f'      <h4>Step {step.step_number}: {esc(step.title)}</h4>')
            if step.formula_used:
                parts.append(f'      <div class="formula"><strong>Formula:</strong> {esc(step.formula_used)}</div>')
            parts.append(f'      <div class="content">{esc(step.content)}</div>')
            if step.computation:
                parts.append(f'      <div class="computation"><strong>Computation:</strong> {esc(step.computation)}</div>')
            if step.insight:
                parts.append(f'      <div class="insight"><strong>Insight:</strong> {esc(step.insight)}</div>')
            if step.common_mistake:
                parts.append(f'      <div class="mistake"><strong>Common Mistake:</strong> {esc(step.common_mistake)}</div>')
            parts.append("    </div>")
        parts.append("  </div>")
        parts.append(f'  <div class="final-answer"><strong>Answer:</strong> {esc(self.final_answer)}</div>')
        if self.key_insights:
            parts.append('  <div class="key-insights"><h3>Key Insights</h3><ul>')
            for ki in self.key_insights:
                parts.append(f"    <li>{esc(ki)}</li>")
            parts.append("  </ul></div>")
        parts.append("</div>")
        return "\n".join(parts)


# ---------------------------------------------------------------------------
# Explanation Generator
# ---------------------------------------------------------------------------

class ExplanationGenerator:
    """
    Generates JEE/NEET-style step-by-step explanations using the Claude API
    (fable), with a template-based fallback when the API is unavailable.

    Uses urllib.request for all HTTP communication — no third-party libraries.
    """

    DIFFICULTY_TIME = {"Easy": 3, "Medium": 6, "Hard": 10}

    def __init__(
        self,
        api_key: Optional[str] = None,
        api_url: str = "https://api.anthropic.com/v1/messages",
        model: str = "claude-sonnet-4-20250514",
    ) -> None:
        self.api_key = api_key or os.environ.get("ANTHROPIC_API_KEY", "")
        self.api_url = api_url
        self.model = model
        self._last_raw: Optional[str] = None

    # ------------------------------------------------------------------
    # Public API
    # ------------------------------------------------------------------

    def generate(
        self,
        problem: dict,
        decomposition: dict,
        solutions: list,
        verification: dict,
        language: str = "en",
        student_state: Optional[StudentState4D] = None,
    ) -> Explanation:
        """
        Generate an Explanation for the given solved problem.

        Parameters
        ----------
        problem       : dict with keys like 'id', 'text', 'given', 'to_find', etc.
        decomposition : dict describing how the problem was broken into sub-steps.
        solutions     : list of intermediate/final solution objects.
        verification  : dict with correctness/confidence info.
        language      : 'en' or 'hi'.
        student_state : 4-D state dict or StudentState4D instance controlling
                        explanation depth and style.
        """
        if student_state is None:
            student_state = StudentState4D()
        elif isinstance(student_state, dict):
            student_state = StudentState4D(**student_state)

        ok, err = student_state.validate()
        if not ok:
            raise ValueError(f"Invalid student_state: {err}")

        explanation = self._try_api(
            problem, decomposition, solutions, verification,
            language, student_state,
        )
        if explanation is None:
            explanation = self._build_template(
                problem, decomposition, solutions, verification,
                language, student_state,
            )
        self._finalise(explanation, problem, student_state)
        return explanation

    # ------------------------------------------------------------------
    # API path
    # ------------------------------------------------------------------

    def _try_api(
        self, problem, decomposition, solutions, verification,
        language, student_state: StudentState4D,
    ) -> Optional[Explanation]:
        if not self.api_key:
            return None
        try:
            raw = self._call_api(problem, decomposition, solutions,
                                 verification, language, student_state)
            data = self._parse_response(raw)
            if data is None:
                return None
            data.setdefault("language", language)
            data.setdefault("api_error", None)
            return Explanation.from_dict(data)
        except Exception as exc:
            return Explanation(
                problem_id=str(problem.get("id", "unknown")),
                language=language,
                api_error=str(exc),
            )

    def _call_api(
        self, problem, decomposition, solutions, verification,
        language, student_state: StudentState4D,
    ) -> str:
        level = student_state.get_level()
        detail = student_state.get_detail_level()
        system_prompt = self._build_system_prompt(language, level, detail)
        user_prompt = self._build_user_prompt(
            problem, decomposition, solutions, verification, language, student_state,
        )

        payload = json.dumps({
            "model": self.model,
            "max_tokens": 4096,
            "system": system_prompt,
            "messages": [{"role": "user", "content": user_prompt}],
        }).encode("utf-8")

        req = urllib.request.Request(
            self.api_url,
            data=payload,
            headers={
                "Content-Type": "application/json",
                "x-api-key": self.api_key,
                "anthropic-version": "2023-06-01",
            },
            method="POST",
        )
        with urllib.request.urlopen(req, timeout=60) as resp:
            raw = resp.read().decode("utf-8")
        self._last_raw = raw
        return raw

    @staticmethod
    def _parse_response(raw: str) -> Optional[dict]:
        data = json.loads(raw)
        content_blocks = data.get("content", [])
        text = "".join(b.get("text", "") for b in content_blocks)
        text = text.strip()
        if text.startswith("{") and text.endswith("}"):
            try:
                return json.loads(text)
            except json.JSONDecodeError:
                pass
        if text.startswith("```"):
            text = "\n".join(text.split("\n")[1:])
        if text.endswith("```"):
            text = "\n".join(text.split("\n")[:-1])
        if text.startswith("{") and text.endswith("}"):
            try:
                return json.loads(text)
            except json.JSONDecodeError:
                pass
        return {
            "problem_id": "unknown",
            "given": "Parsed from API response.",
            "to_find": "See solution steps.",
            "approach": "See solution steps.",
            "steps": [{"step_number": 1, "title": "Solution",
                       "content": text[:2000], "insight": ""}],
            "final_answer": "See steps.",
            "key_insights": [],
            "time_estimate": 6,
            "difficulty_rating": "Medium",
        }

    # ------------------------------------------------------------------
    # Prompt construction
    # ------------------------------------------------------------------

    def _build_system_prompt(self, language: str, level: str, detail: str) -> str:
        lang_note = (
            "Generate the explanation in HINDI (using Devanagari script). "
            "Keep ALL mathematical symbols, variable names, formulas, and "
            "technical terms in English. Example: "
            "\"समस्या में v₀ = 20 m/s दिया गया है।[...]\""
            if language == "hi"
            else "Generate the explanation in English."
        )
        level_note = {
            "struggling": (
                "The student is STRUGGLING. Write EXTREMELY detailed steps. "
                "Break every algebraic manipulation into individual lines. "
                "Use simple, everyday language. Explain WHY each formula "
                "applies. Add multiple Common Mistake warnings."
            ),
            "average": (
                "The student is AVERAGE. Write clear, well-explained steps. "
                "Show key computations. Add Insight and Common Mistake callouts "
                "for non-obvious steps."
            ),
            "advanced": (
                "The student is ADVANCED. Write CONCISE steps focused on "
                "key insights and elegant solution strategies. Skip routine "
                "algebraic manipulations; highlight only the critical moves."
            ),
        }.get(level, "")

        detail_note = {
            "detailed": "Include EVERY arithmetic substitution explicitly.",
            "moderate": "Show key substitutions; summarise routine arithmetic.",
            "concise": "Show only the essential substitutions; no arithmetic.",
        }.get(detail, "")

        return (
            "You are an expert JEE/NEET mathematics and physics tutor. "
            "Your job is to produce a structured, step-by-step explanation "
            "for a solved problem.\n\n"
            f"Language rule: {lang_note}\n\n"
            f"Student level: {level_note}\n\n"
            f"Detail level: {detail_note}\n\n"
            "OUTPUT FORMAT — return a valid JSON object with these exact keys:\n"
            '  "given"           — str; bullet-style list of known quantities\n'
            '  "to_find"         — str; bullet-style list of unknowns\n'
            '  "approach"        — str; 2-4 sentence strategy overview\n'
            '  "steps"           — list of objects, each having:\n'
            '      "step_number"  — int\n'
            '      "title"        — short descriptive title\n'
            '      "content"      — str; the full explanation of this step\n'
            '      "formula_used" — str; formula (LaTeX OK) or empty\n'
            '      "computation"  — str; arithmetic/algebra or empty\n'
            '      "insight"      — str; why this step is important or empty\n'
            '      "common_mistake" — str; typical student error or empty\n'
            '  "final_answer"    — str; the answer clearly boxed in text\n'
            '  "key_insights"    — list of str; the most important takeaways\n'
            '  "time_estimate"   — int; estimated minutes (3-15)\n'
            '  "difficulty_rating" — one of "Easy", "Medium", "Hard"\n\n'
            "Rules:\n"
            "  - Steps must be numbered consecutively from 1.\n"
            "  - Formulas must be physically correct.\n"
            "  - Final answer must match the verified solution.\n"
            "  - Output ONLY the JSON. No markdown fences, no preamble.\n"
        )

    def _build_user_prompt(
        self, problem, decomposition, solutions, verification, language, student_state,
    ) -> str:
        parts: list[str] = []
        parts.append(f"Language: {language}")
        parts.append(f"Student level: {student_state.get_level()}")
        parts.append("")
        parts.append("=== PROBLEM ===")
        for k in ("id", "subject", "topic", "difficulty"):
            if k in problem:
                parts.append(f"{k}: {problem[k]}")
        parts.append(f"text: {problem.get('text', problem.get('question', ''))}")
        parts.append("")
        if problem.get("given"):
            parts.append(f"Given quantities: {problem['given']}")
        if problem.get("to_find"):
            parts.append(f"To find: {problem['to_find']}")
        parts.append("")
        parts.append("=== DECOMPOSITION ===")
        parts.append(json.dumps(decomposition, ensure_ascii=False, indent=2))
        parts.append("")
        parts.append("=== SOLUTIONS ===")
        for i, sol in enumerate(solutions):
            parts.append(f"Solution {i + 1}: {json.dumps(sol, ensure_ascii=False)}")
        parts.append("")
        parts.append("=== VERIFICATION ===")
        parts.append(json.dumps(verification, ensure_ascii=False, indent=2))
        parts.append("")
        parts.append("Now produce the structured JSON explanation.")
        return "\n".join(parts)

    # ------------------------------------------------------------------
    # Template fallback
    # ------------------------------------------------------------------

    def _build_template(
        self, problem, decomposition, solutions, verification,
        language: str, student_state: StudentState4D,
    ) -> Explanation:
        pid = str(problem.get("id", problem.get("problem_id", "unknown")))
        diff = problem.get("difficulty", "Medium")
        text = problem.get("text", problem.get("question", ""))
        given_raw = problem.get("given", "")
        to_find_raw = problem.get("to_find", "")
        level = student_state.get_level()
        detail = student_state.get_detail_level()
        final_ans = self._extract_answer(solutions, verification)

        if language == "hi":
            exp = self._hindi_template(
                pid, diff, text, given_raw, to_find_raw,
                final_ans, level, detail, problem,
            )
        else:
            exp = self._english_template(
                pid, diff, text, given_raw, to_find_raw,
                final_ans, level, detail, problem,
            )
        exp.language = language
        return exp

    # ---- English templates -----------------------------------------------

    def _english_template(
        self, pid, diff, text, given_raw, to_find_raw,
        final_ans, level, detail, problem,
    ) -> Explanation:
        exp = Explanation(problem_id=pid, difficulty_rating=diff)
        exp.given = given_raw or self._default_given_en(problem)
        exp.to_find = to_find_raw or "Find the required quantity."
        exp.approach = (
            "This is a standard JEE-style problem. "
            "We identify the relevant formula, substitute the known values, "
            "and solve step by step."
        )
        if level == "struggling":
            exp.steps = self._steps_en_detailed(pid, text, problem, final_ans)
        elif level == "average":
            exp.steps = self._steps_en_moderate(pid, text, problem, final_ans)
        else:
            exp.steps = self._steps_en_concise(pid, text, problem, final_ans)
        exp.final_answer = final_ans
        exp.key_insights = self._insights_en(problem)
        return exp

    def _steps_en_detailed(self, pid, text, problem, ans) -> list[ExplanationStep]:
        fm = problem.get("formula", "Relevant formula from the topic")
        return [
            ExplanationStep(
                step_number=1,
                title="Read and Understand the Problem",
                content=(
                    "Before applying any formula, carefully read the problem. "
                    "Identify what information is given and what is being asked. "
                    f"The problem states: '{text[:200]}...'. "
                    "This step is crucial because misreading the problem is the "
                    "most common reason for incorrect answers in JEE exams."
                ),
                insight="Always list given quantities explicitly before proceeding.",
                common_mistake="Skipping the problem statement and jumping straight to formulas.",
            ),
            ExplanationStep(
                step_number=2,
                title="List Known Quantities (Given)",
                content=(
                    "From the problem, we can identify the following known "
                    "quantities. Write each with its symbol and value."
                ),
                formula_used="",
                computation="Refer to the Given section.",
                insight="Writing quantities systematically prevents sign errors and omissions.",
                common_mistake="Forgetting units or using inconsistent unit systems.",
            ),
            ExplanationStep(
                step_number=3,
                title="Identify the Formula",
                content=(
                    "Based on the topic and the quantities involved, select the "
                    "appropriate formula. The formula connects the known and unknown "
                    "quantities."
                ),
                formula_used=fm,
                insight="JEE tests formula recall under time pressure. "
                        "Practise deriving formulas from first principles.",
                common_mistake="Using the wrong formula variant (e.g. average speed vs. "
                               "instantaneous speed).",
            ),
            ExplanationStep(
                step_number=4,
                title="Substitute Values",
                content=(
                    "Now substitute each known value into the formula. "
                    "Be careful with signs (especially for vectors) and units."
                ),
                formula_used=fm,
                computation="Substitute values step by step.",
                insight="Carry units through every step — they act as a built-in check.",
                common_mistake="Sign errors in kinematic equations (e.g. using +g when "
                               "downward is negative).",
            ),
            ExplanationStep(
                step_number=5,
                title="Simplify and Solve",
                content=(
                    "Simplify the expression algebraically first, then evaluate "
                    "numerically. Check that the result is dimensionally consistent."
                ),
                computation="Algebraic simplification → numerical evaluation.",
                insight="Dimensional analysis catches unit and formula errors immediately.",
                common_mistake="Arithmetic errors when evaluating — always double-check.",
            ),
            ExplanationStep(
                step_number=6,
                title="Verify and Conclude",
                content=(
                    f"The calculated answer is {ans}. "
                    "Verify it makes physical/mathematical sense. "
                    "Check order of magnitude and sign."
                ),
                insight="A quick sanity check (ballpark estimate) catches gross errors.",
                common_mistake="Accepting an answer that is dimensionally wrong.",
            ),
        ]

    def _steps_en_moderate(self, pid, text, problem, ans) -> list[ExplanationStep]:
        fm = problem.get("formula", "Relevant formula from the topic")
        return [
            ExplanationStep(
                step_number=1,
                title="Analyze the Problem",
                content=(
                    f"Identify given: see Given section. "
                    f"Identify required: see To Find section. "
                    f"Topic: {problem.get('topic', 'General')}."
                ),
                formula_used="",
            ),
            ExplanationStep(
                step_number=2,
                title="Select Formula",
                content="Choose the formula that relates all known and unknown quantities.",
                formula_used=fm,
                insight="Key formula selection — confirm all variables are covered.",
            ),
            ExplanationStep(
                step_number=3,
                title="Substitute and Solve",
                content="Substitute values and solve for the unknown.",
                formula_used=fm,
                computation="(shown in detailed version — substitute and simplify).",
                common_mistake="Sign errors or unit inconsistencies.",
            ),
            ExplanationStep(
                step_number=4,
                title="Final Answer",
                content=f"Computing gives the required result.",
                insight="Always verify the answer is reasonable.",
            ),
        ]

    def _steps_en_concise(self, pid, text, problem, ans) -> list[ExplanationStep]:
        fm = problem.get("formula", "Relevant formula")
        return [
            ExplanationStep(
                step_number=1,
                title="Apply Formula Directly",
                content=(
                    f"Given: see Given. Target: see To Find. "
                    f"Apply {fm} with the given values."
                ),
                formula_used=fm,
                computation=f"→ {ans}",
                insight="Direct application with careful substitution.",
            ),
        ]

    @staticmethod
    def _insights_en(problem) -> list[str]:
        topic = problem.get("topic", "")
        return [
            f"This problem tests understanding of {topic}." if topic
            else "Mastering this type builds strong foundations.",
            "Always check units before substituting into formulas.",
            "Dimensional analysis is a powerful verification tool.",
        ]

    # ---- Hindi templates -----------------------------------------------

    def _hindi_template(
        self, pid, diff, text, given_raw, to_find_raw,
        final_ans, level, detail, problem,
    ) -> Explanation:
        exp = Explanation(problem_id=pid, difficulty_rating=diff)
        exp.given = given_raw or self._default_given_hi(problem)
        exp.to_find = to_find_raw or "अज्ञात राशि ज्ञात करें।"
        exp.approach = (
            "यह JEE-प्रारूप की समस्या है। प्रासंगिक सूत्र चुनें, "
            "दिए गए मान स्थानापन्न करें, और क्रमिक रूप से हल करें।"
        )
        if level == "struggling":
            exp.steps = self._steps_hi_detailed(pid, text, problem, final_ans)
        elif level == "average":
            exp.steps = self._steps_hi_moderate(pid, text, problem, final_ans)
        else:
            exp.steps = self._steps_hi_concise(pid, text, problem, final_ans)
        exp.final_answer = final_ans
        exp.key_insights = self._insights_hi(problem)
        return exp

    def _steps_hi_detailed(self, pid, text, problem, ans) -> list[ExplanationStep]:
        fm = problem.get("formula", "प्रासंगिक सूत्र")
        topic = problem.get("topic", "विषय")
        return [
            ExplanationStep(
                step_number=1,
                title="समस्या को ध्यान से पढ़ें",
                content=(
                    "सूत्र लगाने से पहले समस्या को ध्यान से पढ़ें। "
                    "जो जानकारी दी गई है और क्या जानना है, इसका पता लगाएं। "
                    f"यह {topic} से संबंधित प्रश्न है। "
                    "JEE में गलत उत्तर का सबसे बड़ा कारण समस्या की गलत समझ है।"
                ),
                insight="हमेशा दी गई राशियों की सूची बनाकर रखें।",
                common_mistake="सूत्र की ओर सीधे跳 Manual करना और गणना की त्रुटि।",
            ),
            ExplanationStep(
                step_number=2,
                title="दी गई राशियों की सूची",
                content=(
                    "समस्या से निम्नलिखित राशियां ज्ञात हैं: "
                    "सूत्र में इन्हें सही साइन और इकाई के साथ स्थानापन्न करें।"
                ),
                formula_used="",
                insight="राशियों की सूची से चिह्न और इकाई त्रुटि कम होती है।",
                common_mistake="इकाइयों का असंगत उपयोग करना।",
            ),
            ExplanationStep(
                step_number=3,
                title="सूत्र चुनें",
                content=(
                    f"विषय '{topic}' के आधार पर उपयुक्त सूत्र चुनें। "
                    "सूत्र दी गई और अज्ञात राशियों को जोड़ता है।"
                ),
                formula_used=fm,
                insight="JEE में सूत्र याद रखना महत्वपूर्ण है। "
                        "सूत्रों को मूल सिद्धांत से अभ्यास करें।",
                common_mistake="गलत सूत्र प्रकार का उपयोग करना।",
            ),
            ExplanationStep(
                step_number=4,
                title="मान स्थानापन्न करें",
                content=(
                    "सभी ज्ञात मानों को सूत्र में स्थानापन्न करें। "
                    "साइन (विशेषकर वेक्टर के लिए) और इकाइयों पर ध्यान दें।"
                ),
                formula_used=fm,
                computation="मानों को क्रमिक रूप से स्थानापन्न करें।",
                insight="इकाइयां हर चरण में बीच में त्रुटि पकड़ने का तरीका हैं।",
                common_mistake="काइनेमेटिक समीकरणों में साइन त्रुटि (+g बजाय -g)।",
            ),
            ExplanationStep(
                step_number=5,
                title="सरल करें और हल करें",
                content=(
                    "पहले बीजीय रूप से सरल करें, फिर संख्यात्मक मान निकालें। "
                    "परिणाम की आयामी स्थिरता जांचें।"
                ),
                computation="बीजीय सरलीकरण → संख्यात्मक मूल्यांकन।",
                insight="आयामी विश्लेषण त्रुटियों को तुरंत पकड़ता है।",
                common_mistake="गणना में अंकगणित त्रुटि — हमेशा दोबारा जांचें।",
            ),
            ExplanationStep(
                step_number=6,
                title="उत्तर सत्यापित करें",
                content=(
                    f"गणना से उत्तर {ans} आता है। "
                    "जांचें कि यह भौतिक/गणितीय रूप से तर्कसंगत है। "
                    "क्रम का मान और साइन की जांच करें।"
                ),
                insight="अंदाज़ा (ballpark estimate) गैर त्रुटियों को पकड़ता है।",
                common_mistake="आयामी रूप से गलत उत्तर को स्वीकार करना।",
            ),
        ]

    def _steps_hi_moderate(self, pid, text, problem, ans) -> list[ExplanationStep]:
        fm = problem.get("formula", "सूत्र")
        topic = problem.get("topic", "विषय")
        return [
            ExplanationStep(
                step_number=1,
                title="समस्या का विश्लेषण",
                content=(
                    f"दी गई राशियां: 'Given' अनुभाग देखें। "
                    f"अज्ञात: 'To Find' अनुभाग देखें। विषय: {topic}."
                ),
                formula_used="",
            ),
            ExplanationStep(
                step_number=2,
                title="सूत्र चयन",
                content="सभी ज्ञात और अज्ञात राशियों को जोड़ने वाला सूत्र चुनें।",
                formula_used=fm,
                insight="मुख्य सूत्र चयन — सभी चल जांचें।",
            ),
            ExplanationStep(
                step_number=3,
                title="स्थानापन्नन और हल",
                content="मान स्थानापन्न करें और अज्ञात के लिए हल करें।",
                formula_used=fm,
                computation="मान स्थानापन्न करें और हल करें।",
                common_mistake="साइन त्रुटि या इकाई असंगति।",
            ),
            ExplanationStep(
                step_number=4,
                title="अंतिम उत्तर",
                content=f"गणना से परिणाम प्राप्त होता है।",
                insight="हमेशा जांचें कि उत्तर तर्कसंगत है।",
            ),
        ]

    def _steps_hi_concise(self, pid, text, problem, ans) -> list[ExplanationStep]:
        fm = problem.get("formula", "सूत्र")
        return [
            ExplanationStep(
                step_number=1,
                title="सूत्र लागू करें",
                content=(
                    f"दी गई राशियों को {fm} में स्थानापन्न करें और सीधे हल करें।"
                ),
                formula_used=fm,
                computation=f"→ {ans}",
                insight="सीधा स्थानापन्नन — सावधानी से।",
            ),
        ]

    @staticmethod
    def _insights_hi(problem) -> list[str]:
        topic = problem.get("topic", "")
        return [
            f"यह प्रश्न '{topic}' की समझ परखता है।" if topic
            else "इस प्रकार के प्रश्नों का अभ्यास ज्यादा मजबूत आधार बनाता है।",
            "सूत्र में मान स्थानापन्न करने से पहले हमेशा इकाइयों की जांच करें।",
            "आयामी विश्लेषण (Dimensional Analysis) एक शक्तिशाली सत्यापन उपकरण है।",
        ]

    # ---- Shared template helpers ----------------------------------------

    @staticmethod
    def _default_given_en(problem: dict) -> str:
        parts: list[str] = []
        if problem.get("given"):
            parts.append(str(problem["given"]))
        if problem.get("values"):
            for k, v in problem["values"].items():
                parts.append(f"{k} = {v}")
        return "\n".join(parts) or "See problem statement."

    @staticmethod
    def _default_given_hi(problem: dict) -> str:
        parts: list[str] = []
        if problem.get("given"):
            parts.append(str(problem["given"]))
        if problem.get("values"):
            for k, v in problem["values"].items():
                parts.append(f"{k} = {v}")
        return "\n".join(parts) or "समस्या कथन देखें।"

    @staticmethod
    def _extract_answer(solutions: list, verification: dict) -> str:
        if verification.get("final_answer"):
            return str(verification["final_answer"])
        if solutions:
            last = solutions[-1]
            if isinstance(last, dict):
                for key in ("answer", "result", "value", "final", "x"):
                    if key in last:
                        return str(last[key])
                return str(last)
        return "See solution steps."

    def _finalise(
        self, exp: Explanation, problem: dict,
        student_state: StudentState4D,
    ) -> None:
        diff = problem.get("difficulty", "Medium")
        exp.difficulty_rating = diff
        exp.time_estimate = self.DIFFICULTY_TIME.get(diff, 6)
        if not exp.steps:
            exp.steps = [
                ExplanationStep(
                    step_number=1,
                    title="Solution",
                    content="Step-by-step solution not available.",
                    insight="",
                )
            ]
        if not exp.final_answer:
            exp.final_answer = self._extract_answer([], {})
        next_num = len(exp.steps) + 1
        for i, step in enumerate(exp.steps):
            if step.step_number == 0:
                step.step_number = i + 1
            elif step.step_number > next_num:
                next_num = step.step_number + 1
        if not exp.key_insights:
            exp.key_insights = [
                "Understanding the concept is more important than memorising formulas.",
                "Always verify your answer makes sense.",
            ]


# ---------------------------------------------------------------------------
# Module-level convenience
# ---------------------------------------------------------------------------

def generate_explanation(
    problem: dict,
    decomposition: dict,
    solutions: list,
    verification: dict,
    language: str = "en",
    student_state: Optional[dict | StudentState4D] = None,
    api_key: Optional[str] = None,
) -> Explanation:
    generator = ExplanationGenerator(api_key=api_key)
    return generator.generate(
        problem, decomposition, solutions, verification,
        language=language, student_state=student_state,
    )


# ---------------------------------------------------------------------------
# Demo
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    sample_problem: dict = {
        "id": "PHY-KIN-042",
        "subject": "Physics",
        "topic": "Kinematics",
        "difficulty": "Medium",
        "text": (
            "A car accelerates uniformly from rest at 3 m/s² for 10 seconds. "
            "Find the distance covered."
        ),
        "given": "u = 0 m/s, a = 3 m/s², t = 10 s",
        "to_find": "Distance s covered",
        "formula": "s = ut + ½at²",
        "values": {"u": "0", "a": "3", "t": "10"},
    }

    sample_decomposition: dict = {
        "type": "straightforward_application",
        "steps": ["Identify formula", "Substitute", "Compute"],
    }

    sample_solutions: list = [
        {"formula": "s = ut + ½at²", "substitution": "s = 0×10 + ½×3×100"},
        {"intermediate": 150, "unit": "m"},
        {"answer": "150 m", "final": True},
    ]

    sample_verification: dict = {
        "is_correct": True,
        "final_answer": "150 m",
        "confidence": 0.98,
        "method": "analytical",
    }

    student_state = StudentState4D(
        comprehension=0.55, speed=0.5, accuracy=0.6, topic_proficiency=0.5,
    )
    ok, err = student_state.validate()
    assert ok, err

    gen = ExplanationGenerator()
    explanation = gen.generate(
        problem=sample_problem,
        decomposition=sample_decomposition,
        solutions=sample_solutions,
        verification=sample_verification,
        language="en",
        student_state=student_state,
    )

    print(explanation.render_text())

    print("\n--- Hindi version ---\n")
    explanation_hi = gen.generate(
        problem=sample_problem,
        decomposition=sample_decomposition,
        solutions=sample_solutions,
        verification=sample_verification,
        language="hi",
        student_state=student_state,
    )
    print(explanation_hi.render_text())

    print("\n--- Advanced student (English) ---\n")
    adv_state = StudentState4D(comprehension=0.9, speed=0.85, accuracy=0.9, topic_proficiency=0.85)
    explanation_adv = gen.generate(
        problem=sample_problem,
        decomposition=sample_decomposition,
        solutions=sample_solutions,
        verification=sample_verification,
        language="en",
        student_state=adv_state,
    )
    print(explanation_adv.render_text())

    print("\n--- JSON output ---\n")
    print(explanation.to_json())

    print("\n--- HTML output ---\n")
    print(explanation.render_html())