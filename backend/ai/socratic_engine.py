"""Structured Socratic engine for the DREAM_APP tutor.

Turns pre-written enrichment content into interactive, step-by-step
Socratic dialogue — no LLM, no hallucination, pure structured teaching.

Data sources used (all from EnrichmentContent):
  - text_walkthrough: chunked into teaching steps with checkpoint questions
  - definition: served as reference, not dumped
  - eli5: served as simplified explanation
  - common_misconception: used for misconception-driven probing
  - diagnostic_questions: used for test mode and drill
  - on_failure: converted to guided questions (not statements)

Engine phases:
  1. CHUNKED_TEACH: Break walkthrough into paragraphs, serve one at a time
     with a checkpoint question. Student must answer before next chunk.
  2. HINT: 3-level progressive hint system
     Level 1: on_failure remediation text (guiding question)
     Level 2: walkthrough excerpt (deeper explanation)
     Level 3: full model answer from diagnostic_questions
  3. MISCONCEPTION_PROBE: When misconception_matcher fires, convert the
     correction into a leading question instead of a statement.
  4. GUIDED_REMEDIATION: on_failure text converted to questions
"""
from __future__ import annotations

import re
import textwrap
from dataclasses import dataclass, field
from typing import Optional


# --------------------------------------------------------------------------- #
# Data structures
# --------------------------------------------------------------------------- #

@dataclass
class TeachingChunk:
    """One paragraph of walkthrough content with an optional checkpoint."""
    index: int
    content: str
    checkpoint_question: Optional[str] = None
    checkpoint_answer_keywords: list[str] = field(default_factory=list)
    is_last: bool = False


@dataclass
class SocraticSession:
    """State for a Socratic teaching session."""
    node_id: str
    phase: str = "teach"  # teach / checkpoint / diagnostic / hint / remediate
    chunks: list[TeachingChunk] = field(default_factory=list)
    current_chunk: int = 0
    hint_level: dict[int, int] = field(default_factory=dict)  # {q_num: hint_level}
    checkpoint_attempts: int = 0
    # For diagnostic mode
    diag_current_q: int = 0
    diag_answers: dict = field(default_factory=dict)
    diag_results: dict = field(default_factory=dict)
    diag_failed: list = field(default_factory=list)


# --------------------------------------------------------------------------- #
# Walkthrough chunker
# --------------------------------------------------------------------------- #

def chunk_walkthrough(walkthrough: str) -> list[TeachingChunk]:
    """Break a walkthrough into teaching chunks.

    The walkthrough is already written in paragraphs. Each paragraph
    becomes a chunk. We detect natural checkpoint opportunities by
    looking for:
    - Questions in the text (sentences ending with ?)
    - Key definitions (sentences with "is" / "are" / "means" / "defined as")
    - Worked examples (paragraphs starting with "Worked example")
    - Summary paragraphs (starting with "Putting it all together" / "Note")

    For each chunk, we generate a checkpoint question that tests
    understanding of that chunk's key concept.
    """
    if not walkthrough:
        return []

    # Split into paragraphs (double newline or single newline after a period)
    raw_paragraphs = re.split(r'\n\n+', walkthrough.strip())
    # Also handle single-newline paragraphs that are clearly separate
    if len(raw_paragraphs) <= 1:
        # Try splitting on sentence boundaries for very long single paragraphs
        raw_paragraphs = _split_long_paragraph(walkthrough)

    chunks = []
    for i, para in enumerate(raw_paragraphs):
        para = para.strip()
        if not para or len(para) < 50:
            continue

        checkpoint = _generate_checkpoint(para, i, len(raw_paragraphs))
        answer_keywords = _extract_keywords(para)

        chunks.append(TeachingChunk(
            index=i,
            content=para,
            checkpoint_question=checkpoint,
            checkpoint_answer_keywords=answer_keywords,
            is_last=(i == len(raw_paragraphs) - 1),
        ))

    return chunks


def _split_long_paragraph(text: str) -> list[str]:
    """Split a very long paragraph into smaller chunks at sentence boundaries."""
    # Split on sentences, group into ~300-char chunks
    sentences = re.split(r'(?<=[.!?])\s+', text)
    chunks = []
    current = []
    current_len = 0
    for sent in sentences:
        current.append(sent)
        current_len += len(sent)
        if current_len >= 300:
            chunks.append(" ".join(current))
            current = []
            current_len = 0
    if current:
        chunks.append(" ".join(current))
    return chunks


def _generate_checkpoint(para: str, index: int, total: int) -> Optional[str]:
    """Generate a specific checkpoint question for a paragraph.

    Extracts the actual subject matter from the paragraph to create a
    question that is specific to that chunk, not a generic template.
    """
    para_lower = para.lower()

    # Worked example → ask student to predict
    if para_lower.startswith("worked example"):
        # Try to extract what the example is about
        example_match = re.search(r'worked example[:\s]+(.+?)(?:\.|$)', para, re.IGNORECASE)
        subject = example_match.group(1).strip() if example_match else "this problem"
        return f"Before I show the worked example — what do you think the answer will be for {subject[:60]}?"

    # "Putting it all together" → synthesis question
    if "putting it all together" in para_lower or "note the scope" in para_lower:
        return "Can you summarize the key idea from what we've covered so far?"

    # Definition paragraphs → ask for the definition
    def_match = re.search(r'([A-Z][a-z]+(?:\s+[a-z]+)?)\s+is\s+(?:defined as|called)\s', para)
    if def_match:
        term = def_match.group(1).strip().lower()
        return f"In your own words, what is {term}? Try to explain it without looking back."

    # Extract the main subject from the first sentence
    first_sentence = para.split('.')[0].strip()
    # Remove leading transition phrases
    for prefix in ["Let us ", "Now ", "So ", "For ", "In ", "The ", "This ", "Here "]:
        if first_sentence.startswith(prefix):
            first_sentence = first_sentence[len(prefix):]
            break

    # Formula/derivation paragraphs → ask about the specific formula
    # Only match physics-specific formula names, not generic math like sqrt
    formula_match = re.search(r'([VvIi]_\w+|V_rms|I_rms|omega|form factor)\s*=\s*([^.,;]+)', para)
    if formula_match:
        formula_name = formula_match.group(1).strip()
        return f"What does {formula_name} represent, and why is it important here?"

    if any(kw in para_lower for kw in ["v_rms", "v_0", "i_rms", "i_0", "rms value", "root mean square"]):
        return "What is RMS and why do we use it instead of the simple average?"

    if any(kw in para_lower for kw in ["peak value", "peak voltage", "peak current", "maximum value"]):
        return "What is the peak value, and how does it relate to the sinusoidal waveform?"

    if any(kw in para_lower for kw in ["form factor", "peak factor", "crest factor"]):
        return "What is the form factor (or peak factor) and what does it tell us about the waveform?"

    if any(kw in para_lower for kw in ["derive", "derivation", "integral"]):
        return "Can you outline the key steps in this derivation? What's the starting point?"

    # Law/principle paragraphs → ask about the principle
    if any(kw in para_lower for kw in ["law states", "principle", "rule"]):
        return "What does this law or principle tell us? State it in your own words."

    # Comparison/contrast paragraphs
    if any(kw in para_lower for kw in ["because", "whereas", "unlike", "difference"]):
        return "What is the key difference or relationship being explained here?"

    # Mole concept specific
    if any(kw in para_lower for kw in ["avogadro", "mole", "molar"]):
        return "What is Avogadro's number and what does one mole represent?"

    # Default: ask about the main point using the first sentence
    if index == 0:
        return f"What concept is being introduced here? Can you identify the main idea?"
    if index == total - 1:
        return "What was the most important takeaway from this entire explanation?"

    # Vary checkpoint questions to avoid repetition
    # Use different question templates based on chunk index
    _CHECKPOINT_TEMPLATES = [
        "Before we move on — what do you think is the key point from: \"{snippet}...\"?",
        "Can you put this in your own words: \"{snippet}...\"?",
        "What did you learn from this section: \"{snippet}...\"?",
        "How would you explain this to a friend: \"{snippet}...\"?",
        "What's the main idea here: \"{snippet}...\"?",
    ]
    snippet = first_sentence[:50].strip()
    if snippet:
        template = _CHECKPOINT_TEMPLATES[index % len(_CHECKPOINT_TEMPLATES)]
        return template.format(snippet=snippet)
    return "Can you explain what you understood from this section?"


def _extract_keywords(para: str) -> list[str]:
    """Extract key terms from a paragraph for checkpoint evaluation.

    Extracts only meaningful technical terms, not stopwords, generic words,
    narrative transition words, or regex artifacts.

    Strategy:
    1. Extract capitalized words from the original (proper nouns, technical terms)
    2. Extract words 6+ characters that aren't common English words
    3. Extract formulas and technical patterns
    4. Filter out narrative/transition words that aren't technical
    """
    # Comprehensive stopwords + narrative/transition words
    _STOP = {
        # Articles, pronouns, prepositions, conjunctions
        "the", "a", "an", "is", "are", "was", "were", "be", "been", "being",
        "have", "has", "had", "do", "does", "did", "will", "would", "could",
        "should", "may", "might", "must", "can", "shall", "to", "of", "in",
        "for", "on", "with", "at", "by", "from", "as", "into", "through",
        "during", "before", "after", "above", "below", "up", "down", "out",
        "off", "over", "under", "again", "further", "then", "once", "here",
        "there", "when", "where", "why", "how", "all", "each", "every",
        "both", "few", "more", "most", "other", "some", "such", "no", "not",
        "only", "own", "same", "so", "than", "too", "very", "just", "also",
        "but", "and", "or", "if", "because", "while", "this", "that",
        "these", "those", "it", "its", "they", "them", "their", "we", "you",
        "your", "he", "she", "his", "her", "which", "who", "whom", "what",
        # Narrative/transition words (the ones that caused "begin, stepping, back")
        "begin", "begins", "beginning", "started", "start", "starting",
        "stepping", "step", "steps", "stepped", "back", "forward",
        "let", "us", "now", "so", "thus", "hence", "therefore",
        "however", "although", "though", "still", "yet", "since",
        "moving", "goes", "going", "came", "come", "comes", "coming",
        "make", "makes", "made", "making", "take", "takes", "took", "taken",
        "get", "gets", "got", "getting", "give", "gives", "gave", "given",
        "know", "knows", "knew", "known", "knowing", "think", "thinks",
        "thought", "thinking", "said", "say", "says", "saying",
        "look", "looks", "looked", "looking", "see", "sees", "seen", "seeing",
        "want", "wants", "wanted", "needing", "need", "needs", "needed",
        "using", "used", "use", "uses", "called", "call", "calls",
        "known", "unknown", "certain", "particular", "general", "specific",
        "first", "second", "third", "last", "next", "previous", "final",
        "one", "two", "three", "four", "five", "six", "seven", "eight",
        "nine", "ten", "many", "much", "less", "least", "most",
        "here", "there", "where", "nowhere", "somewhere", "anywhere",
        "always", "never", "sometimes", "often", "usually", "rarely",
        # Meta words about the text/education
        "class", "node", "studied", "learned", "already", "mastered",
        "paragraph", "section", "chapter", "topic", "examiner", "exam",
        "board", "candidate", "analysis", "performance", "pupil", "expect",
        "note", "important", "useful", "derived", "number", "form", "factor",
        "short", "numerical", "derivation", "style", "question",
        "clean", "labelled", "sinusoid", "mark", "label", "state",
        "good", "habit", "identify", "whether", "quoted", "single",
        "common", "error", "treating", "jump", "straight",
        "domestic", "industrial", "rating", "bulb", "heater", "supply",
        "mains", "india", "indian", "hertz", "type", "respond", "directly",
        "natively", "contrast", "display", "scale", "wearing", "disguise",
        "electrical", "recognise", "returns", "instead", "pendulum",
        "displacement", "machinery", "exact", "mathematical", "quantities",
        "quantity", "half", "full", "cycle", "positive", "negative", "zero",
        "mean", "value", "root", "square", "average", "ratio", "calibrate",
        "rectifier", "instrument", "meter", "ammeter", "voltmeter",
        "generator", "output", "input", "iron", "wire", "hot",
        "like", "thing", "things", "stuff", "something", "anything",
        "everything", "nothing", "someone", "anyone", "everyone",
        "actually", "really", "quite", "rather", "fairly", "pretty",
        "maybe", "perhaps", "possibly", "probably", "definitely",
        "certainly", "surely", "truly", "indeed", "fact", "case",
        "point", "side", "part", "place", "area", "field", "world",
        "today", "yesterday", "tomorrow", "time", "day", "days", "year",
        "years", "week", "weeks", "month", "months",
        "becomes", "became", "becoming", "seems", "seemed", "appears",
        "appeared", "shown", "shows", "showing", "show",
        "found", "finds", "finding", "find", "keep", "keeps", "kept",
        "left", "leave", "leaves", "leaving", "put", "puts", "putting",
        "bring", "brings", "brought", "bringing", "turn", "turns", "turned",
        "become", "happens", "happened", "happening", "happen",
        "remembering", "remember", "remind", "reminds", "recap",
        "introduce", "introduced", "introducing", "introduction",
        "explain", "explains", "explained", "explaining", "explanation",
        "describe", "describes", "described", "describing",
        "discuss", "discusses", "discussed", "discussing",
        "consider", "considers", "considered", "considering",
        "imagine", "imagines", "imagined", "imagining",
        "suppose", "supposes", "supposed", "supposing",
        "assume", "assumes", "assumed", "assuming", "assumption",
        "ensure", "ensures", "ensured", "ensuring",
        "involve", "involves", "involved", "involving",
        "require", "requires", "required", "requiring",
        "produce", "produces", "produced", "producing",
        "represent", "represents", "represented", "representing",
        "express", "expresses", "expressed", "expressing",
        "measure", "measures", "measured", "measuring",
        "whether", "instead", "rather", "either", "neither",
        "another", "other", "same", "different", "similar",
        "between", "among", "within", "without", "against",
        "toward", "towards", "upon", "onto", "into",
        # Generic academic/process words that shouldn't be keywords
        "applied", "apply", "applying", "application", "applications",
        "formula", "method", "approach", "technique", "procedure",
        "result", "results", "solution", "solutions", "solve", "solved",
        "answer", "answers", "correct", "incorrect", "wrong", "right",
        "concept", "concepts", "idea", "ideas", "principle", "principles",
        "definition", "defined", "defining", "term", "terms",
        "example", "examples", "instance", "instances", "case",
        "practice", "practise", "exercise", "exercises",
        "understand", "understanding", "understood", "understandings",
        "learn", "learning", "learned", "learnt",
        "study", "studying", "studies",
        "review", "reviewing", "reviewed",
        "calculate", "calculating", "calculated", "calculation",
        "determine", "determining", "determined",
        "obtain", "obtaining", "obtained",
        "derive", "deriving", "derived",
        "substitute", "substituting", "substituted",
        "simplify", "simplifying", "simplified",
        "evaluate", "evaluating", "evaluated",
        "prove", "proving", "proved", "proven",
        "show", "showed", "shown", "showing",
        "given", "since", "because", "therefore", "hence",
        "however", "although", "though", "while", "whereas",
        "main", "key", "important", "essential", "crucial",
        "basic", "fundamental", "primary", "secondary",
        "various", "several", "many", "much", "few",
        "above", "below", "following", "previous", "next",
        "without", "within", "among", "between",
    }

    keywords = []

    # Strategy 1: Extract capitalized words from the ORIGINAL text (proper nouns, technical terms)
    # These are high-value — "Raoult", "Boyle", "Avogadro", "Newton" etc.
    cap_words = re.findall(r'\b([A-Z][a-z]{3,})\b', para)
    for w in cap_words:
        wl = w.lower()
        if wl not in _STOP and wl not in {"let", "now", "here", "this", "that", "when", "where", "what"}:
            keywords.append(wl)

    # Strategy 2: Extract words 6+ characters from lowercased text
    # Longer words are more likely to be technical terms
    words = re.findall(r'[a-z]{6,}', para.lower())
    for w in words:
        if w not in _STOP and w not in keywords:
            keywords.append(w)

    # Strategy 3: If we don't have enough, try 5-char words
    if len(keywords) < 4:
        words5 = re.findall(r'[a-z]{5}', para.lower())
        for w in words5:
            if w not in _STOP and w not in keywords:
                keywords.append(w)

    # Strategy 4: Extract formulas and technical patterns — high-value
    formulas = re.findall(
        r'\b[Vv]_[a-zA-Z]+|\b[Ii]_[a-zA-Z]+|sqrt\d?|omega|sin\w*|cos\w*|'
        r'[pfPFA]_[a-z]+|[0-9]+\s*[=/]\s*[0-9]+|=\s*[a-zA-Z0-9*/+-]+',
        para
    )
    keywords.extend(formulas)

    # Deduplicate, keep order, limit
    seen = set()
    unique = []
    for kw in keywords:
        if kw not in seen:
            seen.add(kw)
            unique.append(kw)
    return unique[:8]


# --------------------------------------------------------------------------- #
# Checkpoint evaluator
# --------------------------------------------------------------------------- #

def evaluate_checkpoint(
    student_answer: str,
    chunk: TeachingChunk,
) -> tuple[bool, str]:
    """Evaluate a student's checkpoint answer.

    Returns (correct, feedback).
    Uses scaffolding feedback instead of listing keywords — gives the student
    a fill-in-the-blank or a guiding question, not a list of terms.
    """
    if not student_answer.strip():
        return False, "Take a moment to think about it. What do you remember from what you just read?"

    answer_lower = student_answer.lower()
    keywords = chunk.checkpoint_answer_keywords

    if not keywords:
        if len(student_answer) > 20:
            return True, "Good — you're engaging with the material. Let's continue."
        return False, "Can you say a bit more about what you understood?"

    hits = [kw for kw in keywords if kw in answer_lower]
    hit_count = len(hits)
    total = max(len(keywords), 1)
    score = hit_count / total

    if score >= 0.4:
        _POSITIVE = [
            "Good! You captured the key ideas. Let's move to the next part.",
            "Well done! You're on the right track. Let's continue.",
            "Nice work — you understand the core concept. Moving on.",
            "Correct! You've got the main point. Let's build on it.",
            "Great! You're engaging well with the material. Next step.",
        ]
        _idx = hash(student_answer) % len(_POSITIVE)
        return True, _POSITIVE[_idx]
    elif score >= 0.2:
        # Scaffold: acknowledge what they got right, ask a guiding question
        got_right = [kw for kw in keywords if kw in answer_lower][:2]
        missed = [kw for kw in keywords if kw not in answer_lower][:2]
        ack = f"You mentioned {', '.join(got_right)} — that's relevant. " if got_right else ""
        if missed:
            return False, (
                f"{ack}Now think about this: what role does **{missed[0]}** play here? "
                f"Try to include that in your answer. Or type 'hint' for a clue."
            )
        return False, f"{ack}Can you say more about why this matters? Try again, or type 'hint'."
    else:
        if len(student_answer) > 50:
            return True, "I can see you're thinking about it. Let's continue and build on this."
        # Scaffold: give a fill-in-the-blank with the first keyword
        if keywords:
            return False, (
                f"Not quite. Here's a scaffold to build on:\n"
                f"The main idea here is about **{keywords[0]}**. "
                f"Can you write a sentence explaining what {keywords[0]} means in this context? "
                f"Or type 'hint' for a clue."
            )
        return False, "Not quite. Re-read the section above and try again, or type 'hint' for a clue."


# --------------------------------------------------------------------------- #
# Hybrid checkpoint evaluator (MiniLM + keyword overlap)
# --------------------------------------------------------------------------- #

async def evaluate_checkpoint_hybrid(
    student_answer: str,
    chunk: TeachingChunk,
) -> tuple[bool, str]:
    """Evaluate a checkpoint answer using hybrid semantic + keyword matching.

    Strategy:
      1. Fast keyword check first — if clearly correct (>=40%), accept immediately
      2. If clearly wrong (<20%) and short answer, reject with keyword hint
      3. For uncertain cases, use MiniLM semantic similarity against the
         chunk content as the "model answer" — this catches students who
         understand the concept but use different words
      4. Falls back to keyword-based evaluation if the hybrid evaluator fails
    """
    if not student_answer.strip():
        return False, "Take a moment to think about it. What do you remember from what you just read?"

    answer_lower = student_answer.lower()
    keywords = chunk.checkpoint_answer_keywords

    # --- Fast path: keyword matching ---
    if not keywords:
        if len(student_answer) > 20:
            return True, "Good — you're engaging with the material. Let's continue."
        return False, "Can you say a bit more about what you understood?"

    hits = [kw for kw in keywords if kw in answer_lower]
    hit_count = len(hits)
    total = max(len(keywords), 1)
    kw_score = hit_count / total

    # Clear pass — accept immediately (no API call needed)
    if kw_score >= 0.4:
        _POSITIVE_HYBRID = [
            "Good! You captured the key ideas. Let's move to the next part.",
            "Well done! You're on the right track. Let's continue.",
            "Nice work — you understand the core concept. Moving on.",
            "Correct! You've got the main point. Let's build on it.",
            "Great! You're engaging well with the material. Next step.",
        ]
        _idx = hash(student_answer) % len(_POSITIVE_HYBRID)
        return True, _POSITIVE_HYBRID[_idx]

    # Clear fail with short answer — scaffold with fill-in-the-blank (no API call)
    if kw_score < 0.2 and len(student_answer) < 50:
        if keywords:
            return False, (
                f"Not quite. Here's a scaffold to build on:\n"
                f"The main idea here is about **{keywords[0]}**. "
                f"Can you write a sentence explaining what {keywords[0]} means in this context? "
                f"Or type 'hint' for a clue."
            )
        return False, "Not quite. Re-read the section above and try again, or type 'hint' for a clue."

    # --- Uncertain: use hybrid semantic evaluator ---
    model_answer = chunk.content[:500]
    if chunk.checkpoint_question:
        model_answer = f"Q: {chunk.checkpoint_question}\nA: {model_answer}"

    try:
        from backend.ai.hybrid_evaluator import evaluate_answer as evaluate_answer_hybrid
        result = await evaluate_answer_hybrid(
            student_answer=student_answer,
            model_answer=model_answer,
            question_type="free_text",
            question_text=chunk.checkpoint_question or "",
        )
        if result.correct or result.score >= 0.35:
            _POSITIVE_LLM = [
                "Good! You captured the key ideas. Let's move to the next part.",
                "Well done! You're on the right track. Let's continue.",
                "Nice work — you understand the core concept. Moving on.",
                "Correct! You've got the main point. Let's build on it.",
                "Great! You're engaging well with the material. Next step.",
            ]
            _idx = hash(student_answer) % len(_POSITIVE_LLM)
            return True, _POSITIVE_LLM[_idx]
        elif result.partial or result.score >= 0.2:
            got_right = [kw for kw in keywords if kw in answer_lower][:2]
            missed = [kw for kw in keywords if kw not in answer_lower][:2]
            ack = f"You mentioned {', '.join(got_right)} — that's relevant. " if got_right else ""
            if missed:
                return False, (
                    f"{ack}Now think about this: what role does **{missed[0]}** play here? "
                    f"Try to include that in your answer. Or type 'hint' for a clue."
                )
            return False, f"{ack}Can you say more about why this matters? Try again, or type 'hint'."
        else:
            if keywords:
                return False, (
                    f"Not quite. Here's a scaffold to build on:\n"
                    f"The main idea here is about **{keywords[0]}**. "
                    f"Can you write a sentence explaining what {keywords[0]} means in this context? "
                    f"Or type 'hint' for a clue."
                )
            return False, "Not quite. Re-read the section above and try again, or type 'hint' for a clue."
    except Exception:
        if kw_score >= 0.2:
            got_right = [kw for kw in keywords if kw in answer_lower][:2]
            missed = [kw for kw in keywords if kw not in answer_lower][:2]
            ack = f"You mentioned {', '.join(got_right)} — that's relevant. " if got_right else ""
            if missed:
                return False, (
                    f"{ack}Now think about this: what role does **{missed[0]}** play here? "
                    f"Try to include that in your answer. Or type 'hint' for a clue."
                )
            return False, f"{ack}Can you say more about why this matters? Try again, or type 'hint'."
        if len(student_answer) > 50:
            return True, "I can see you're thinking about it. Let's continue and build on this."
        if keywords:
            return False, (
                f"Not quite. Here's a scaffold to build on:\n"
                f"The main idea here is about **{keywords[0]}**. "
                f"Can you write a sentence explaining what {keywords[0]} means in this context? "
                f"Or type 'hint' for a clue."
            )
        return False, "Not quite. Re-read the section above and try again, or type 'hint' for a clue."


# --------------------------------------------------------------------------- #
# Progressive hint system
# --------------------------------------------------------------------------- #

def build_hint(
    level: int,
    question_num: int,
    enrichment,
) -> str:
    """Build a progressive hint for a diagnostic question.

    Level 1: Guiding question from on_failure (doesn't give answer)
    Level 2: Deeper explanation from walkthrough or definition
    Level 3: Full model answer from diagnostic_questions
    """
    on_failure = enrichment.on_failure or []
    diag_questions = enrichment.diagnostic_questions or []

    # Find the on_failure entry for this question
    failure_entry = next(
        (f for f in on_failure if f.get("question_number") == question_num),
        None,
    )

    # Find the diagnostic question
    diag_q = next(
        (q for q in diag_questions if q.get("number") == question_num),
        None,
    )

    if level == 1:
        # Level 1: Convert on_failure to a guiding question
        if failure_entry:
            rem_text = failure_entry.get("remediation_text", "")
            review_nodes = failure_entry.get("review_node_ids", [])
            # Convert the remediation statement into a question
            guiding_q = _convert_remediation_to_question(rem_text, review_nodes)
            return f"**Hint:**\n\n{guiding_q}"
        return "Think about what concept this question is testing. What have you learned about it so far?"

    elif level == 2:
        # Level 2: Excerpt from walkthrough or definition
        if failure_entry:
            rem_text = failure_entry.get("remediation_text", "")
            rem_text = _sanitize_teacher_content(rem_text)
            if rem_text:
                return f"**Deeper hint:**\n\n{rem_text}"
        # Fall back to ELI5
        if enrichment.eli5:
            return f"**Simplified explanation:**\n\n{enrichment.eli5}"
        return "Re-read the walkthrough section for this topic. Type 'show answer' if you're still stuck."

    elif level == 3:
        # Level 3: Full model answer
        if diag_q and diag_q.get("answer"):
            return f"**Model Answer:**\n\n{diag_q['answer']}"
        return "The model answer for this question is not available."

    return "No more hints available. Type 'show answer' to see the answer."


def _convert_remediation_to_question(rem_text: str, review_nodes: list[str]) -> str:
    """Convert a remediation statement into a guiding question.

    Instead of telling the student "Review node X to recall Y",
    ask them "Do you remember what Y is?"
    """
    # Sanitize teacher-facing content
    rem_text = _sanitize_teacher_content(rem_text)
    if not rem_text:
        return "Think about what concept this question is testing. What have you learned about it so far?"

    # Extract the key concept from the remediation text
    # Pattern: "Review ... to recall that X" or "Review ... the student needs to understand that X"
    patterns = [
        r'recall that (.+?)(?:\.|$)',
        r'understand that (.+?)(?:\.|$)',
        r'needs to understand (.+?)(?:\.|$)',
        r'must connect (.+?)(?:\.|$)',
        r'must understand (.+?)(?:\.|$)',
        r'Re-explain that (.+?)(?:\.|$)',
        r'Re-do (.+?)(?:\.|$)',
    ]

    for pattern in patterns:
        match = re.search(pattern, rem_text, re.IGNORECASE)
        if match:
            concept = match.group(1).strip()
            # Truncate at first sentence boundary if too long
            if len(concept) > 150:
                concept = concept[:147] + "..."
            return f"Think about this: {concept}\n\nCan you connect this to the question above?"

    # If no pattern matched, give the remediation text as-is but framed as a question
    if len(rem_text) > 200:
        rem_text = rem_text[:197] + "..."
    return f"Here's something to think about:\n\n{rem_text}\n\nHow does this relate to the question?"


def _sanitize_teacher_content(text: str) -> str:
    """Remove teacher-facing meta-commentary from hint text.

    Filters out phrases like:
    - "The student has confused..."
    - "The student likely..."
    - "The student needs to..."
    - "Re-explain with concrete numbers..."
    """
    if not text:
        return ""

    # Remove sentences that are teacher-facing
    teacher_patterns = [
        r'The student has[^.]+\.',
        r'The student likely[^.]+\.',
        r'The student needs[^.]+\.',
        r'The student may[^.]+\.',
        r'The student must[^.]+\.',
        r'Re-explain[^.]+\.',
        r'Re-do[^.]+\.',
        r'Review the prerequisite[^.]+\.',
        r'Re-read the derivation[^.]+\.',
        # Remove incorrect Van't Hoff factor statements
        r'When a solute dissociates[^.]+\.',
        r'The Van\'?t Hoff factor[^.]+\.',
        r'the molality should not[^.]+\.',
        r'the molarity used in colligative[^.]+\.',
    ]

    cleaned = text
    for pattern in teacher_patterns:
        cleaned = re.sub(pattern, '', cleaned, flags=re.IGNORECASE)

    # Clean up leftover fragments
    cleaned = re.sub(r'\s+', ' ', cleaned).strip()
    # Remove leading connectors like "and ", "then " left after removal
    cleaned = re.sub(r'^(and|then|but|or)\s+', '', cleaned, flags=re.IGNORECASE).strip()

    return cleaned


# --------------------------------------------------------------------------- #
# Misconception probe
# --------------------------------------------------------------------------- #

def build_misconception_probe(
    misconception_text: str,
    student_answer: str,
) -> str:
    """Convert a misconception correction into a Socratic probing question.

    Instead of saying "You're wrong, here's the correction",
    ask a leading question that guides the student to discover the error.
    """
    # Extract the correction from the misconception text
    # Pattern: "Correction: X" or "This is wrong because X"
    correction_match = re.search(
        r'Correction:\s*(.+?)(?:\n|$)',
        misconception_text,
        re.IGNORECASE | re.DOTALL,
    )

    if correction_match:
        correction = correction_match.group(1).strip()
        # Find a key relationship in the correction (e.g., "V_0 = 230sqrt2")
        formula_match = re.search(r'([A-Za-z_]+\s*=\s*[\d.]+\s*\*?\s*sqrt\(?[\d.]+\)?)', correction)
        if formula_match:
            formula = formula_match.group(1)
            return (
                f"Let me ask you something: if the mains is called '230 V', "
                f"and the relationship is {formula}, "
                f"then which value is 230 — the peak or the RMS?\n\n"
                f"Think about it and tell me what you conclude."
            )

        # Find a "because" clause to turn into a question
        because_match = re.search(r'because\s+(.+?)(?:\.|$)', correction, re.IGNORECASE)
        if because_match:
            reason = because_match.group(1).strip()
            return (
                f"Here's something to consider: {reason}\n\n"
                f"Given this, do you think your answer needs to change? Why or why not?"
            )

        # Default: present the correction as a question
        if len(correction) > 200:
            correction = correction[:197] + "..."
        return (
            f"Consider this: {correction}\n\n"
            f"Does this change your answer? Think about why."
        )

    # If no correction pattern found, return the misconception text framed as a question
    if len(misconception_text) > 200:
        misconception_text = misconception_text[:197] + "..."
    return (
        f"Here's something to think about:\n\n{misconception_text}\n\n"
        f"Does this help you see where your answer might need adjustment?"
    )


# --------------------------------------------------------------------------- #
# Socratic teaching flow
# --------------------------------------------------------------------------- #

def start_socratic_teaching(enrichment) -> dict:
    """Start a Socratic teaching session for a node.

    Returns the first chunk + checkpoint question.
    """
    chunks = chunk_walkthrough(enrichment.text_walkthrough or "")
    if not chunks:
        # No walkthrough — fall back to definition
        return {
            "phase": "teach",
            "content": enrichment.definition or enrichment.eli5 or "No content available.",
            "checkpoint": None,
            "chunk_index": 0,
            "total_chunks": 0,
            "is_last": True,
        }

    first = chunks[0]
    content = first.content
    if first.checkpoint_question:
        content += f"\n\n---\n\n**Checkpoint:** {first.checkpoint_question}\n\nType your answer, or 'next' to skip:"

    return {
        "phase": "checkpoint",
        "content": content,
        "checkpoint": first.checkpoint_question,
        "chunk_index": 0,
        "total_chunks": len(chunks),
        "is_last": first.is_last,
    }


def next_socratic_chunk(chunks: list[TeachingChunk], current: int) -> dict:
    """Serve the next teaching chunk."""
    next_idx = current + 1
    if next_idx >= len(chunks):
        return {
            "phase": "teach",
            "content": "That's the end of the walkthrough! You can now type 'test me' to check your understanding, or ask any question.",
            "checkpoint": None,
            "chunk_index": next_idx,
            "total_chunks": len(chunks),
            "is_last": True,
        }

    chunk = chunks[next_idx]
    content = chunk.content
    if chunk.checkpoint_question:
        content += f"\n\n---\n\n**Checkpoint:** {chunk.checkpoint_question}\n\nType your answer, or 'next' to skip:"

    return {
        "phase": "checkpoint",
        "content": content,
        "checkpoint": chunk.checkpoint_question,
        "chunk_index": next_idx,
        "total_chunks": len(chunks),
        "is_last": chunk.is_last,
    }


# --------------------------------------------------------------------------- #
# Guided remediation (on_failure as questions)
# --------------------------------------------------------------------------- #

def build_guided_remediation(
    question_num: int,
    enrichment,
) -> str:
    """Build a guided remediation message for a failed question.

    Converts the on_failure text into a series of guiding questions
    instead of a statement to be read passively.
    """
    on_failure = enrichment.on_failure or []
    entry = next(
        (f for f in on_failure if f.get("question_number") == question_num),
        None,
    )

    if not entry:
        return "Let's review this concept. Type 'walkthrough' for a step-by-step explanation."

    rem_text = entry.get("remediation_text", "")
    review_nodes = entry.get("review_node_ids", [])

    # Build guiding questions from the remediation text
    guiding_q = _convert_remediation_to_question(rem_text, review_nodes)

    parts = [
        f"Let me guide you through this.\n",
        f"{guiding_q}",
    ]

    if review_nodes:
        # Note: review_nodes are raw node IDs — we show a friendly message
        # without exposing the IDs. The tutor_service will resolve titles.
        parts.append(
            f"\n\nIf you need a deeper review, I can take you through a prerequisite topic. "
            f"Type 'review' to go there, or try answering the question above."
        )

    return "\n".join(parts)
