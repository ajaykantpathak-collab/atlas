"""Smoke-test de_latex on the real constructs found in the corpus."""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from de_latex import to_plain, residual_report

CASES = [
    r"$\overrightarrow{AB}$",
    r"A **ray** ... denoted by $\overrightarrow{AB}$ where A is the initial point.",
    r"$\overline{AB} \cong \overline{BA}$",
    r"\( 2\pi r h + 2\pi r^2 = 2\pi r (r + h) \)",
    r"\(\bar{x} = \frac{\sum f_i x_i}{\sum f_i}\)",
    r"\(PQ = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}\)",
    r"$75^\circ + 15^\circ = 90^\circ$ and $75^\circ = 5 \times 15^\circ$",
    r"$y = \frac{70}{3}$ or $23\frac{1}{3}$",
    r"$P \leftrightarrow X$, $Q \leftrightarrow Y$",
    r"$\sin(\theta) = 1.67/4 = 0.4175 \Rightarrow \theta \approx 24.7^\circ$",
    r"$\vec{F_1} = (3\hat{i} + 4\hat{j})$ N",
    r"$\frac{a_1}{a_2} \neq \frac{b_1}{b_2}$",
    r"$x \in \{6, 7, 8, \dots, 20\}$",
    r"\(0.101001000100001\ldots\)",
    r"$a \le b \le c$, then $a + b > c$",
    r"\(f_{\text{max}} = \mu mg = 0.4 \times 70 \times 10 = 280\ \text{N}\)",
    r"\(T^2 \propto r^3\) (Kepler's third law)",
    r"\(a_1, b_1, a_2, b_2 \neq 0\)",
    r"\(v_{\text{design}} = \sqrt{rg \tan \theta}\)",
    r"$\angle 1 + \angle 2 = 90^\circ$",
    r"$5 \div 0 = \infty$",
    r"$2^a 5^b$ with $\max(a,b)=2$",
    r"$\mathbb{Z} = \{\dots, -3, -2, -1, 0, 1, 2, 3, \dots\}$",
    r"\(W_{\text{net}} = \Delta K = \frac{1}{2}mv^2 - \frac{1}{2}mu^2\)",
    r"\(\frac{GM}{r^2} = \frac{4\pi^2 r}{T^2}\)",
    r"\(x \geq 2\)",
    r"$\triangle PQS$ and $\triangle RQS$ share side QS",
    r"N_{n-1} = 3 * N_{n-2}",  # plain — must pass through unchanged
    # regression cases from real residuals
    r"$5^\circ\text{C}$ to $-8^\circ\text{C}$",
    r"\( 150 \, \text{g} = 0.150 \, \text{kg} \)",
    r"\( \sqrt[3]{8} \)",
    r"c9_math_ch1_2: Need to plot points and understand coordinate representation.",
    r"m_{\text{cyclist}} = 60 \, \text{kg}",
    r"\( T \cos 30^\circ = mg \)",
]

for c in CASES:
    p = to_plain(c)
    issues = residual_report(p)
    print(("OK " if not issues else "RESID") + " | " + p[:150])
    for i in issues:
        print("      !", i)
