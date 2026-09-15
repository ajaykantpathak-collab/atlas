"""Phase 1: Ask Fable to design a self-evolving intelligent learning system."""
import urllib.request, json, ssl, os

KEY = os.environ.get("CLAUDE_REASONING_KEY", "sk-ant-co-gIEUzRWw_mtUpxKk668B1lzJe3XntCna")
URL = os.environ.get("CLAUDE_REASONING_URL", "https://api.claudeopus.pro/v1/messages")

GOAL = """You are designing the intelligence layer for a K-12 learning platform (CBSE/CISCE, classes 6-12, 19,000 curriculum nodes, 25+ subjects).

CURRENT STATE:
- 8-node Socratic pipeline exists but uses hardcoded templates (not AI)
- BKT + IRT + AFM knowledge tracing engine exists (real math, works)
- Qdrant vector search for content retrieval exists
- 1,250 enrichment markers with educational content
- 462 interactive simulations
- Diagnostic engine, remediation service, question selector all built but static
- PostgreSQL + ClickHouse for analytics
- The platform serves Indian students in English and Hindi

GOAL:
Design a self-evolving intelligence system that:
1. Gets smarter with every student interaction
2. Learns which teaching strategies actually work (not just which look good)
3. Discovers real concept dependencies from student data (not just curriculum specs)
4. Builds a growing database of misconceptions discovered from real errors
5. Self-calibrates question difficulty and learning paths
6. Flags its own content gaps when students consistently struggle
7. Adapts to each student's learning style over time
8. Remains fast (<200ms response for real-time tutoring)

CONSTRAINTS:
- Python, FastAPI, PostgreSQL, ClickHouse, Qdrant
- Claude API (model: fable) for reasoning calls
- Must integrate with existing services (don't break what works)
- Budget: ~6M Claude tokens total
- Must work for both English and Hindi content
- Must handle 10,000+ concurrent students

DELIVERABLE:
1. Propose the architecture (components, data flow, feedback loops)
2. Explain how each part learns and evolves over time
3. Identify what data to collect from each interaction
4. Design the nightly/minutely learning jobs
5. Explain how the system gets better at scale (more students = smarter)
6. Identify risks and failure modes
7. Propose a phased rollout (what to build first, what can wait)

Be specific. Name the tables, the jobs, the algorithms. Don't hand-wave.
Think about what makes this DIFFERENT from a static LLM wrapper. The key insight is: the system should remember what worked and what didn't, and use that memory to improve future interactions.

Output your design as a detailed technical document."""

ctx = ssl.create_default_context()
body = json.dumps({
    "model": "fable",
    "max_tokens": 16000,
    "system": "You are a world-class AI systems architect who has built adaptive learning systems at scale. You think deeply about feedback loops, data flywheels, and self-improving systems. You are practical - you design things that can actually be built and deployed.",
    "messages": [{"role": "user", "content": GOAL}]
}).encode("utf-8")

req = urllib.request.Request(URL, data=body, method="POST")
req.add_header("x-api-key", KEY)
req.add_header("Content-Type", "application/json")
req.add_header("anthropic-version", "2023-06-01")

print("Asking Fable to design the system...")
try:
    with urllib.request.urlopen(req, timeout=600, context=ctx) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        text = ""
        for block in data.get("content", []):
            if block.get("type") == "text":
                text = block.get("text", "")
                break
        usage = data.get("usage", {})
        print(f"Tokens: {usage}")
        print(f"Generated {len(text)} chars, {text.count(chr(10))} lines")
        out_path = r"D:\platform\backend\services\_design_doc.md"
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(text)
        print(f"DESIGN SAVED to {out_path}")
        print("=" * 60)
        print(text[:5000])
        if len(text) > 5000:
            print(f"\n... ({len(text) - 5000} more chars)")
except urllib.error.HTTPError as e:
    print(f"HTTP {e.code}: {e.read().decode()[:500]}")
except Exception as e:
    print(f"ERROR: {str(e)[:500]}")
