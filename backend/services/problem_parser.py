import json
import os
import re
import urllib.request
import urllib.error
from dataclasses import dataclass, field, asdict
from typing import Optional, List, Dict, Any


@dataclass
class ParsedProblem:
    raw_text: str
    subject: Optional[str]
    exam_type: Optional[str]
    givens: List[Dict[str, Any]] = field(default_factory=list)
    unknowns: List[Dict[str, Any]] = field(default_factory=list)
    concepts: List[str] = field(default_factory=list)
    constraints: List[str] = field(default_factory=list)
    difficulty: str = "medium"
    estimated_steps: int = 3

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


class ProblemParser:
    URL = "https://api.claudeopus.pro/v1/messages"
    KEY = os.environ.get("FABLE_API_KEY", "")
    MODEL = "fable"

    CONCEPT_KEYWORDS: Dict[str, Dict[str, List[str]]] = {
        "physics": {
            "mechanics": ["force", "velocity", "acceleration", "momentum", "impulse",
                          "energy", "work", "power", "kinematics", "newton", "gravity",
                          "friction", "projectile", "circular motion", "rotation",
                          "torque", "angular", "simple harmonic motion", "shm"],
            "thermodynamics": ["thermodynamics", "heat", "temperature", "entropy",
                               "carnot", "isothermal", "adiabatic", "gas law",
                               "kinetic theory", "calorimetry"],
            "electromagnetism": ["electric field", "magnetic field", "current",
                                 "voltage", "resistance", "capacitor", "inductor",
                                 "electromagnetic induction", "gauss law", "ampere",
                                 "faraday", "ohm", "kirchhoff", "emf"],
            "optics": ["reflection", "refraction", "lens", "mirror", "prism",
                       "dispersion", "interference", "diffraction", "polarization",
                       "wave optics", "snell", "total internal reflection"],
            "modern_physics": ["photoelectric", "compton", "de broglie", "heisenberg",
                               "bohr", "atomic", "nuclear", "radioactivity",
                               "semiconductor", "logic gates", "photodiode"],
            "waves": ["wave", "sound", "frequency", "wavelength", "doppler",
                      "resonance", "standing wave", "beats"],
            "fluid_mechanics": ["fluid", "pressure", "buoyancy", "viscosity",
                                "surface tension", " bernoulli", "poiseuille"],
        },
        "chemistry": {
            "physical_chemistry": ["thermodynamics", "equilibrium", "kinetics",
                                   "electrochemistry", "chemical bonding",
                                   "molecular orbital", "hybridization", "enthalpy",
                                   "entropy", "gibbs", "pH", "buffer", "colligative",
                                   "solution", "rate law", "order of reaction",
                                   "nernst", "conductivity"],
            "organic_chemistry": ["alkane", "alkene", "alkyne", "aromatic",
                                  "benzene", "reaction mechanism", "substitution",
                                  "elimination", "addition", "carbocation",
                                  "grignard", "aldehyde", "ketone", "carboxylic",
                                  "amine", "alcohol", "ether", "ester",
                                  "stereochemistry", "chiral", "isomerism",
                                  "haloalkane", "phenol"],
            "inorganic_chemistry": ["periodic table", "d block", "f block",
                                    "coordination compound", "complex",
                                    "metallurgy", "extraction", "hydrogen",
                                    "s block", "p block", "salt analysis",
                                    "qualitative analysis", "bonding in metals"],
            "biochemistry": ["amino acid", "protein", "enzyme", "DNA", "RNA",
                             "vitamin", "carbohydrate", "lipid", "metabolism"],
        },
        "mathematics": {
            "algebra": ["quadratic", "polynomial", "sequence", "series",
                        "binomial", "permutation", "combination", "probability",
                        "determinant", "matrix", "complex number", "vector",
                        "binomial theorem", "arithmetic progression", "geometric progression",
                        "relations", "functions", "inverse", "inequality"],
            "calculus": ["derivative", "integration", "limit", "continuity",
                         "differentiability", "maxima", "minima", "taylor",
                         "maclaurin", "definite integral", "area under curve",
                         "differential equation", "partial derivative"],
            "geometry": ["triangle", "circle", "conic", "parabola", "ellipse",
                         "hyperbola", "straight line", "coordinate geometry",
                         "3d geometry", "distance", "angle", "similarity",
                         "congruence", "trigonometry"],
            "trigonometry": ["sin", "cos", "tan", "inverse trig", "trigonometric",
                             "identity", "equation", "solution of triangle"],
        },
        "biology": {
            "cell_biology": ["cell", "organelle", "mitosis", "meiosis",
                             "membrane", "nucleus", "chromosome", "DNA replication",
                             "cell division", "cytoskeleton"],
            "genetics": ["mendel", "inheritance", "genotype", "phenotype",
                         "linkage", "crossing over", "mutation", "DNA",
                         "RNA", "transcription", "translation", "codon",
                         "gene expression", "epigenetics"],
            "ecology": ["ecosystem", "food web", "biodiversity", "biogeochemical",
                        "carbon cycle", "nitrogen cycle", "population",
                        "community", "habitat", "ecological succession"],
            "physiology": ["photosynthesis", "respiration", "transpiration",
                           "digestion", "circulation", "excretion", "nervous",
                           "hormone", "endocrine", "neuron", "reflex"],
            "biochemistry": ["enzyme", "protein", "carbohydrate", "lipid",
                             "metabolism", "glycolysis", "krebs", "ATP",
                             "amino acid", "vitamin"],
            "botany": ["plant", "root", "stem", "leaf", "flower",
                       "pollination", "seed", "fruit", "tissue culture",
                       "phytohormone"],
            "zoology": ["animal", "nervous system", "reproductive system",
                        "embryology", "immune system", "blood", "skeleton",
                        "muscle", "locomotion"],
        },
    }

    EXAM_KEYWORDS = {
        "jee_main": ["jee main", "jee-main", "joint entrance main"],
        "jee_advanced": ["jee advanced", "jee-advanced", "iit", "joint entrance advanced"],
        "neet": ["neet", "national eligibility entrance test", "medical entrance"],
        "bitsat": ["bitsat", "bits pilani"],
        "wbjee": ["wbjee", "west bengal"],
        "cuet": ["cuet", "common university entrance test"],
    }

    UNIT_PATTERNS = [
        (r"(\d+\.?\d*)\s*(m(?:eters?)?|m\b)", "m"),
        (r"(\d+\.?\d*)\s*(cm)", "cm"),
        (r"(\d+\.?\d*)\s*(km)", "km"),
        (r"(\d+\.?\d*)\s*(mm)", "mm"),
        (r"(\d+\.?\d*)\s*(kg)\b", "kg"),
        (r"(\d+\.?\d*)\s*(g(?:rams?)?|g\b)", "g"),
        (r"(\d+\.?\d*)\s*(mg)", "mg"),
        (r"(\d+\.?\d*)\s*(s(?:econds?)?|s\b)", "s"),
        (r"(\d+\.?\d*)\s*(min(?:utes?)?|min\b)", "min"),
        (r"(\d+\.?\d*)\s*(h(?:ours?)?|h\b)", "h"),
        (r"(\d+\.?\d*)\s*(N(?:ewtons?)?|N\b)", "N"),
        (r"(\d+\.?\d*)\s*(J(?:oules?)?|J\b)", "J"),
        (r"(\d+\.?\d*)\s*(W(?:atts?)?|W\b)", "W"),
        (r"(\d+\.?\d*)\s*(Pa(?:scals?)?)\b", "Pa"),
        (r"(\d+\.?\d*)\s*(atm(?:ospheres?)?)\b", "atm"),
        (r"(\d+\.?\d*)\s*(L(?:iters?)?|L\b)", "L"),
        (r"(\d+\.?\d*)\s*(m(?:/s|per second))\b", "m/s"),
        (r"(\d+\.?\d*)\s*(m/s\^?2|m/s²)\b", "m/s²"),
        (r"(\d+\.?\d*)\s*(°C|Celsius)\b", "°C"),
        (r"(\d+\.?\d*)\s*(K(?:elvin)?)\b", "K"),
        (r"(\d+\.?\d*)\s*(mol)\b", "mol"),
        (r"(\d+\.?\d*)\s*(M|mol/L)\b", "M"),
        (r"(\d+\.?\d*)\s*(eV)\b", "eV"),
        (r"(\d+\.?\d*)\s*(C(?:oulombs?)?|C\b)", "C"),
        (r"(\d+\.?\d*)\s*(V(?:olts?)?|V\b)", "V"),
        (r"(\d+\.?\d*)\s*(A(?:mperes?)?|A\b)", "A"),
        (r"(\d+\.?\d*)\s*(Ω|ohms?)\b", "Ω"),
        (r"(\d+\.?\d*)\s*(Hz)\b", "Hz"),
        (r"(\d+\.?\d*)\s*(rad(?:ians?)?)\b", "rad"),
        (r"(\d+\.?\d*)\s*(°|degrees?)\b", "°"),
        (r"(\d+\.?\d*)\s*(N/m)\b", "N/m"),
        (r"(\d+\.?\d*)\s*(J/kg)\b", "J/kg"),
        (r"(\d+\.?\d*)\s*(J/(?:mol\s*)?K)\b", "J/(mol·K)"),
    ]

    VARIABLE_PATTERN = re.compile(
        r'([A-Za-z]\w*)\s*[=:]\s*([\d]+(?:\.\d+)?(?:\s*×\s*10\^?[-+]?\d+)?)\s*([^\s,;.?!\)]*)'
    )

    def __init__(self, api_key: Optional[str] = None, use_api: bool = True):
        self.api_key = api_key or self.KEY
        self.use_api = use_api

    def parse(self, problem_text: str, subject: Optional[str] = None) -> ParsedProblem:
        exam_type = self._identify_exam(problem_text)
        detected_subject = subject or self._detect_subject(problem_text)

        if self.use_api:
            try:
                return self._parse_with_api(problem_text, detected_subject, exam_type)
            except Exception:
                pass

        return self._parse_with_regex(problem_text, detected_subject, exam_type)

    def _identify_exam(self, text: str) -> Optional[str]:
        lower = text.lower()
        for exam, keywords in self.EXAM_KEYWORDS.items():
            for kw in keywords:
                if kw in lower:
                    return exam
        return None

    def _detect_subject(self, text: str) -> Optional[str]:
        subject_indicators = {
            "physics": ["force", "velocity", "acceleration", "current", "voltage",
                        "energy", "momentum", "wavelength", "refraction", "electric",
                        "magnetic", "newton", "ohm", "thermodynamics"],
            "chemistry": ["molecule", "compound", "reaction", "acid", "base",
                          "organic", "inorganic", "atom", "mole", "oxidation",
                          "reduction", "equilibrium", "bonding"],
            "mathematics": ["integral", "derivative", "equation", "polynomial",
                            "matrix", "determinant", "probability", "sequence",
                            "calculus", "geometry", "algebra"],
            "biology": ["cell", "gene", "DNA", "protein", "ecosystem", "photosynthesis",
                        "mitochondria", "chloroplast", "enzyme", "neuron"],
        }
        scores = {}
        lower = text.lower()
        for subj, keywords in subject_indicators.items():
            scores[subj] = sum(1 for kw in keywords if kw in lower)
        if max(scores.values()) > 0:
            return max(scores, key=scores.get)
        return None

    def _parse_with_api(self, text: str, subject: Optional[str],
                        exam_type: Optional[str]) -> ParsedProblem:
        system_prompt = (
            "You are a precise JEE/NEET problem parser. "
            "Return ONLY a valid JSON object with these exact keys:\n"
            "{\n"
            '  "raw_text": "original problem text",\n'
            '  "subject": "physics|chemistry|mathematics|biology|null",\n'
            '  "exam_type": "jee_main|jee_advanced|neet|null",\n'
            '  "givens": [{"quantity": str, "value": str, "unit": str, "symbol": str}],\n'
            '  "unknowns": [{"quantity": str, "symbol": str, "unit": str}],\n'
            '  "concepts": [str],\n'
            '  "constraints": [str],\n'
            '  "difficulty": "easy|medium|hard",\n'
            '  "estimated_steps": int\n'
            "}\n"
            "Fill every field. For unknowns where unit is not explicit, use 'unknown'. "
            "For symbols, use standard notation (m, v, a, F, etc.). "
            "Extract ALL given numerical quantities."
        )

        payload = json.dumps({
            "model": self.MODEL,
            "max_tokens": 2000,
            "system": system_prompt,
            "messages": [
                {"role": "user", "content": f"Parse this JEE/NEET problem:\n\n{text}"}
            ],
        }).encode("utf-8")

        req = urllib.request.Request(
            self.URL,
            data=payload,
            headers={
                "Content-Type": "application/json",
                "x-api-key": self.api_key,
                "anthropic-version": "2023-06-01",
            },
            method="POST",
        )

        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = json.loads(resp.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            body = e.read().decode("utf-8", errors="replace")
            raise RuntimeError(f"API error {e.code}: {body}")

        content = data["content"][0]["text"]
        match = re.search(r'\{.*\}', content, re.DOTALL)
        if not match:
            raise ValueError("No JSON found in API response")

        parsed_json = json.loads(match.group())

        return ParsedProblem(
            raw_text=parsed_json.get("raw_text", text),
            subject=subject or parsed_json.get("subject"),
            exam_type=exam_type or parsed_json.get("exam_type"),
            givens=parsed_json.get("givens", []),
            unknowns=parsed_json.get("unknowns", []),
            concepts=parsed_json.get("concepts", []),
            constraints=parsed_json.get("constraints", []),
            difficulty=parsed_json.get("difficulty", "medium"),
            estimated_steps=parsed_json.get("estimated_steps", 3),
        )

    def _parse_with_regex(self, text: str, subject: Optional[str],
                          exam_type: Optional[str]) -> ParsedProblem:
        givens = self.extract_givens(text)
        unknowns = self.extract_unknowns(text)
        concepts = self.identify_concepts(text, subject)
        constraints = self._extract_constraints(text)
        difficulty = self.classify_difficulty(text)
        steps = self._estimate_steps(text, givens, unknowns, concepts)

        return ParsedProblem(
            raw_text=text,
            subject=subject,
            exam_type=exam_type,
            givens=givens,
            unknowns=unknowns,
            concepts=concepts,
            constraints=constraints,
            difficulty=difficulty,
            estimated_steps=steps,
        )

    def extract_givens(self, text: str) -> List[Dict[str, Any]]:
        givens = []
        seen = set()

        for pattern, unit in self.UNIT_PATTERNS:
            for m in re.finditer(pattern, text, re.IGNORECASE):
                val = m.group(1)
                raw_unit = m.group(2) if m.lastindex >= 2 else unit
                symbol = self._unit_to_symbol(raw_unit)
                key = (val, raw_unit)
                if key not in seen:
                    seen.add(key)
                    quantity = self._infer_quantity(raw_unit, text, m.start())
                    givens.append({
                        "quantity": quantity,
                        "value": val,
                        "unit": raw_unit,
                        "symbol": symbol,
                    })

        for m in self.VARIABLE_PATTERN.finditer(text):
            sym, val, unit = m.group(1), m.group(2), m.group(3).strip()
            if sym not in seen and len(sym) <= 5:
                seen.add(sym)
                givens.append({
                    "quantity": self._infer_quantity(unit, text, m.start()) or sym,
                    "value": val,
                    "unit": unit or "unknown",
                    "symbol": sym,
                })

        return givens

    def extract_unknowns(self, text: str) -> List[Dict[str, Any]]:
        unknowns = []
        patterns = [
            r"find\s+(?:the\s+)?([a-zA-Z]\w*)\b",
            r"calculate\s+(?:the\s+)?([a-zA-Z]\w*)\b",
            r"determine\s+(?:the\s+)?([a-zA-Z]\w*)\b",
            r"what\s+is\s+(?:the\s+)?([a-zA-Z]\w*)\b",
            r"value\s+of\s+([a-zA-Z]\w*)\b",
            r"([a-zA-Z]\w*)\s+=\s*\?",
            r"find\s+(?:the\s+)?(?:velocity|speed|acceleration|force|energy|"
            r"momentum|power|current|voltage|resistance|wavelength|frequency|"
            r"pressure|temperature|time|distance|displacement|mass|charge|"
            r"height|angle|area|volume|density|work|heat|potential)\s+of",
        ]
        seen = set()
        givens_symbols = {g["symbol"] for g in self.extract_givens(text)}

        for pat in patterns:
            for m in re.finditer(pat, text, re.IGNORECASE):
                sym = m.group(1)
                if sym.lower() in ("the", "a", "an", "is", "if", "at", "in",
                                    "on", "of", "for", "to", "by"):
                    continue
                if sym not in seen and sym not in givens_symbols:
                    seen.add(sym)
                    unit = self._infer_unit_from_symbol(sym)
                    quantity = self._symbol_to_quantity(sym)
                    unknowns.append({
                        "quantity": quantity,
                        "symbol": sym,
                        "unit": unit,
                    })

        q_words = re.findall(
            r"(?:velocity|speed|acceleration|force|energy|momentum|power|"
            r"current|voltage|resistance|wavelength|frequency|pressure|"
            r"temperature|time|distance|displacement|mass|charge|height|"
            r"angle|area|volume|density|work|heat|potential|tension|stress|"
            r"strain|specific heat|molarity|molality|pH|rate|efficiency)",
            text, re.IGNORECASE
        )
        for qw in q_words:
            sym = self._quantity_to_symbol(qw)
            if sym not in seen:
                seen.add(sym)
                unknowns.append({
                    "quantity": qw.lower(),
                    "symbol": sym,
                    "unit": self._infer_unit_from_symbol(sym),
                })

        return unknowns

    def identify_concepts(self, text: str, subject: Optional[str] = None) -> List[str]:
        concepts = []
        lower = text.lower()
        subjects = [subject] if subject else list(self.CONCEPT_KEYWORDS.keys())

        for subj in subjects:
            if subj not in self.CONCEPT_KEYWORDS:
                continue
            for concept, keywords in self.CONCEPT_KEYWORDS[subj].items():
                for kw in keywords:
                    if re.search(r'\b' + re.escape(kw) + r'\b', lower):
                        if concept not in concepts:
                            concepts.append(concept)
                        break

        return concepts

    def classify_difficulty(self, text: str) -> str:
        hard_indicators = [
            "derive", "prove", "multistep", "combin", "integrat",
            "differential equation", "conceptual", "trick", "complex",
            "advanced", "non-trivial", "three-dimensional", "vector triple",
        ]
        easy_indicators = [
            "define", "list", "identify", "name", "direct formula",
            "simple", "basic", "straightforward",
        ]

        lower = text.lower()
        hard_count = sum(1 for ind in hard_indicators if ind in lower)
        easy_count = sum(1 for ind in easy_indicators if ind in lower)

        word_count = len(text.split())
        if word_count > 150:
            hard_count += 1
        if word_count > 250:
            hard_count += 1

        if hard_count > easy_count + 1:
            return "hard"
        elif easy_count > hard_count + 1:
            return "easy"
        return "medium"

    def _extract_constraints(self, text: str) -> List[str]:
        constraints = []
        patterns = [
            r"(?:given|assuming|considering|if|suppose)\s+(?:that\s+)?([^.;\n]+)",
            r"(?:neglect\s+\w+)",
            r"(?:ideal\s+\w+)",
            r"(?:smooth\s+surface)",
            r"(?:at\s+rest|from\s+rest)",
            r"(?:no\s+friction|no\s+air\s+resistance)",
            r"(?:constant\s+\w+)",
            r"(?:rigid\s+\w+)",
            r"(?:massless\s+\w+)",
            r"(?:adiabatic|isothermal|isobaric|isochoric)",
            r"(?:g\s*=\s*[\d.]+)",
        ]
        seen = set()
        for pat in patterns:
            for m in re.finditer(pat, text, re.IGNORECASE):
                constraint = m.group(0).strip()
                if constraint not in seen:
                    seen.add(constraint)
                    constraints.append(constraint)
        return constraints

    def _estimate_steps(self, text: str, givens: List, unknowns: List,
                        concepts: List[str]) -> int:
        base = max(1, len(unknowns))
        base += len(concepts) - 1
        base += len(text.split()) // 80
        return max(1, min(10, base))

    def _unit_to_symbol(self, unit: str) -> str:
        mapping = {
            "meters": "m", "meter": "m", "cm": "cm", "km": "km", "mm": "mm",
            "kg": "kg", "grams": "g", "gram": "g", "mg": "mg",
            "seconds": "s", "second": "s", "min": "min", "minute": "min",
            "hours": "h", "hour": "h",
            "newtons": "N", "newton": "N",
            "joules": "J", "joule": "J",
            "watts": "W", "watt": "W",
            "pascals": "Pa", "pascal": "Pa",
            "liters": "L", "liter": "L", "litre": "L",
            "m/s": "m/s", "m/s²": "m/s²",
            "°C": "°C", "kelvin": "K",
            "mol": "mol", "M": "M",
            "eV": "eV",
            "coulombs": "C", "coulomb": "C",
            "volts": "V", "volt": "V",
            "amperes": "A", "ampere": "A",
            "ohms": "Ω", "ohm": "Ω",
            "hz": "Hz",
            "radians": "rad", "radian": "rad",
            "degrees": "°", "degree": "°",
        }
        return mapping.get(unit.lower(), unit)

    def _infer_quantity(self, unit: str, text: str, pos: int) -> str:
        unit_lower = unit.lower()
        unit_quantity_map = {
            "m": "length", "cm": "length", "km": "length", "mm": "length",
            "kg": "mass", "g": "mass", "mg": "mass",
            "s": "time", "min": "time", "h": "time",
            "n": "force",
            "j": "energy", "w": "power",
            "pa": "pressure",
            "l": "volume",
            "m/s": "velocity", "m/s²": "acceleration",
            "°c": "temperature", "k": "temperature",
            "mol": "amount", "m": "concentration",
            "ev": "energy",
            "c": "charge", "v": "voltage", "a": "current", "Ω": "resistance",
            "hz": "frequency",
            "rad": "angle", "°": "angle",
        }
        return unit_quantity_map.get(unit_lower, "unknown")

    def _infer_unit_from_symbol(self, symbol: str) -> str:
        mapping = {
            "v": "m/s", "u": "m/s", "a": "m/s²", "t": "s",
            "m": "kg", "F": "N", "E": "J", "P": "W",
            "p": "Pa", "I": "A", "V": "V", "R": "Ω",
            "λ": "m", "f": "Hz", "h": "m", "d": "m",
            "s": "m", "q": "C", "T": "K", "θ": "°",
            "ω": "rad/s", "τ": "N·m",
        }
        return mapping.get(symbol, "unknown")

    def _symbol_to_quantity(self, symbol: str) -> str:
        mapping = {
            "v": "velocity", "u": "initial_velocity", "a": "acceleration",
            "t": "time", "m": "mass", "F": "force", "E": "energy",
            "P": "power", "p": "pressure", "I": "current", "V": "voltage",
            "R": "resistance", "λ": "wavelength", "f": "frequency",
            "h": "height", "d": "distance", "s": "displacement",
            "q": "charge", "T": "temperature", "θ": "angle",
            "ω": "angular_velocity", "τ": "torque",
        }
        return mapping.get(symbol, symbol)

    def _quantity_to_symbol(self, quantity: str) -> str:
        mapping = {
            "velocity": "v", "speed": "v",
            "acceleration": "a",
            "force": "F",
            "energy": "E",
            "momentum": "p",
            "power": "P",
            "current": "I",
            "voltage": "V",
            "resistance": "R",
            "wavelength": "λ",
            "frequency": "f",
            "pressure": "P",
            "temperature": "T",
            "time": "t",
            "distance": "d",
            "displacement": "s",
            "mass": "m",
            "charge": "q",
            "height": "h",
            "angle": "θ",
        }
        return mapping.get(quantity.lower(), quantity[0].lower())


def main():
    import sys
    if len(sys.argv) < 2:
        print("Usage: python problem_parser.py <problem_text> [subject]")
        sys.exit(1)

    problem_text = " ".join(sys.argv[1:-1]) if len(sys.argv) > 2 else sys.argv[1]
    subject = sys.argv[-1] if len(sys.argv) > 2 and sys.argv[-1] in (
        "physics", "chemistry", "mathematics", "biology") else None

    parser = ProblemParser()
    result = parser.parse(problem_text, subject)
    print(json.dumps(result.to_dict(), indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()