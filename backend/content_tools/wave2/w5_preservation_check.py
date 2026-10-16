"""Pre-apply verification: prose preservation + full-diff eyeball dump."""
import difflib
import os
import re
import importlib.util

spec = importlib.util.spec_from_file_location(
    "scrub", r"D:\platform\deploy\backend\content_tools\wave2\w5_latex_scrub.py")
scrub = importlib.util.module_from_spec(spec)
spec.loader.exec_module(scrub)

CORPUS = r"D:\platform\deploy\content\cisce_nodes_v2"

WORD = re.compile(r"[A-Za-z]{3,}")
LATEX_WORDS = {"frac", "dfrac", "tfrac", "sqrt", "text", "mathrm", "mathit",
               "mathbf", "mathbb", "operatorname", "bar", "vec", "hat", "dot",
               "ddot", "tilde", "overline", "times", "cdot", "approx", "theta",
               "Delta", "alpha", "beta", "pi", "mu", "nu", "lambda", "omega",
               "rho", "tau", "sigma", "rightarrow", "Rightarrow", "leq", "geq",
               "neq", "pm", "infty", "circ", "degree", "sum", "log", "sin",
               "cos", "tan", "angle", "therefore", "textstyle", "displaystyle",
               "chi", "downarrow", "uparrow", "rightleftharpoons",
               "leftharpoons", "dots", "left", "right", "mid", "square", "iff",
               "implies", "varnothing", "sim", "lim", "equiv", "propto",
               "triangle", "parallel", "perp", "quad", "qquad", "big", "Big",
               "bigg", "Bigg", "bigl", "bigr", "Bigl", "Bigr", "prime", "deg",
               "gg", "ll", "cdots", "ldots", "mapsto", "in", "notin", "ast",
               "star", "bullet", "emptyset", "subseteq", "subset", "cup",
               "cap", "forall", "exists", "because", "partial", "nabla",
               "vdots", "varepsilon", "varphi", "zeta", "eta", "iota", "kappa",
               "blacksquare", "longrightarrow", "longleftarrow", "top",
               "leftrightarrow", "Leftrightarrow", "leftarrow", "leftrightarrow",
               "leftrightarrow", "bmod", "mod", "max", "min", "gcd", "lcm",
               "arcsin", "arccos", "arctan", "det", "exp", "cot", "sec", "csc",
               "lfloor", "rfloor", "lceil", "rceil", "Gamma", "Lambda", "Theta",
               "Sigma", "Phi", "Psi", "Omega", "Pi", "varnothing", "to"}

changed = []
problems = []
for fn in sorted(os.listdir(CORPUS)):
    if not scrub.LANE_RE.match(fn) or fn.split("_")[1] in scrub.PARKED:
        continue
    orig = open(os.path.join(CORPUS, fn), encoding="utf-8", newline="").read()
    new = scrub.transform_text(orig)
    if new == orig:
        continue
    changed.append(fn)
    wo = [w for w in WORD.findall(orig) if w not in LATEX_WORDS]
    wn = WORD.findall(new)
    set_o, set_n = set(wo), set(wn)
    lost = set_o - set_n
    if lost:
        problems.append((fn, sorted(lost)[:8]))

print(f"changed: {len(changed)}")
print(f"files losing prose words: {len(problems)}")
for fn, lost in problems[:10]:
    print(f"  {fn}: lost {lost}")
