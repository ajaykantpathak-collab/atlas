// data.js — rotating content pools. Every load picks a specimen.
// Seeded-free: true random per load (this is the concept demo, not the
// deterministic product — the product stays seeded per student).
window.ATLAS_DATA = (function () {
  const pick = a => a[Math.floor(Math.random() * a.length)];

  const PROOFS = [
    {
      subject: "Physics · Class 10 · CBSE", chapter: "Human eye & colourful world",
      q: "Explain why the sky appears blue. What would change if the atmosphere were much thinner?",
      marks: 3, diff: ["Medium", "med"],
      lines: [
        "Sunlight scatters off air molecules. Blue light scatters",
        "most because its wavelength is shortest, so the sky",
        "looks blue from every direction.",
        "With a thinner atmosphere there would be less scattering —",
        "the sky would look darker, almost black like on the Moon."
      ],
      ticks: [8, 98], note: "— Rayleigh named? [1] off",
      remark: "Good physics. Name the effect next time.", score: "Verified · 2/3"
    },
    {
      subject: "Mathematics · Class 12 · CBSE", chapter: "Applications of derivatives",
      q: "Find the rate of change of the area of a circle with respect to its radius when r = 5 cm.",
      marks: 2, diff: ["Easy", "easy"],
      lines: [
        "A = πr², so dA/dr = 2πr",
        "At r = 5: dA/dr = 10π cm²/cm",
        "≈ 31.4 cm²/cm."
      ],
      ticks: [8, 98], note: "— state the unit: [1] back next time",
      remark: "Clean method. Units are marks too.", score: "Verified · 2/2"
    },
    {
      subject: "Chemistry · Class 11 · CBSE", chapter: "Thermodynamics",
      q: "Define enthalpy of formation. Why is it zero for an element in its standard state?",
      marks: 2, diff: ["Medium", "med"],
      lines: [
        "Enthalpy change when 1 mole of a compound forms",
        "from its elements in their standard states.",
        "An element needs no formation — it already is,",
        "so ΔfH° = 0 by convention."
      ],
      ticks: [8, 98], note: "— 'by convention' earns the mark ✓",
      remark: "Sharp. Convention questions trip most students.", score: "Verified · 2/2"
    },
    {
      subject: "Biology · Class 10 · CBSE", chapter: "Life processes",
      q: "Why do herbivores have longer small intestines than carnivores?",
      marks: 3, diff: ["Hard", "hard"],
      lines: [
        "Grass is mostly cellulose — slow to digest,",
        "so it needs more time and a longer path.",
        "Meat digests faster, so carnivores manage",
        "with a shorter intestine."
      ],
      ticks: [8, 98], note: "— who makes cellulase? [1] off",
      remark: "Right idea. Name the microbe next time.", score: "Verified · 2/3"
    }
  ];

  const PRACTICE = [
    {
      head: "Mathematics · Class 10 · CBSE", topic: "Real numbers · competency",
      qnum: "3.", marks: 1, diff: ["Easy", "easy"],
      q: "If two positive integers a and b are written as a = x³y² and b = xy³, where x, y are prime numbers, then HCF(a, b) is:",
      opts: ["xy", "xy²", "x³y³", "x²y²"], correct: 1,
      long: { qnum: "4.", q: "Prove that √5 is irrational.", marks: 3, diff: ["Medium", "med"],
              ph: "Write your proof here — ruled like your answer book…" }
    },
    {
      head: "Science · Class 9 · CBSE", topic: "Force & laws of motion",
      qnum: "7.", marks: 1, diff: ["Easy", "easy"],
      q: "A cricket ball of mass 0.15 kg moving at 20 m/s is stopped in 0.1 s. The force applied is:",
      opts: ["3 N", "30 N", "300 N", "0.3 N"], correct: 1,
      long: { qnum: "8.", q: "State Newton's third law with one daily-life example.", marks: 2, diff: ["Easy", "easy"],
              ph: "Law + example — both carry a mark…" }
    },
    {
      head: "Chemistry · Class 11 · CBSE", topic: "Chemical bonding",
      qnum: "5.", marks: 1, diff: ["Medium", "med"],
      q: "The shape of the SF₄ molecule is:",
      opts: ["Tetrahedral", "Square planar", "See-saw", "Trigonal pyramidal"], correct: 2,
      long: { qnum: "6.", q: "Explain why the bond angle in NH₃ is less than in CH₄.", marks: 2, diff: ["Medium", "med"],
              ph: "Lone pairs push harder — show that…" }
    }
  ];

  const EXAMS = [
    {
      head: "Mathematics · Class 12 · Sample Paper",
      mcq: { qnum: "1.", marks: 1, diff: ["Easy", "easy"], tag: "Relations & Functions",
             q: "The binary operation * on {1,2,3,4} defined as a*b = min(a,b) is:",
             opts: ["Commutative only", "Associative only", "Both commutative and associative", "Neither commutative nor associative"],
             correct: 2, sub: "Binary Operations" },
      saq: { qnum: "17.", marks: 2, diff: ["Medium", "med"],
             q: "Show that the relation R on ℝ defined by R = {(a,b): a ≤ b²} is neither reflexive, symmetric nor transitive.",
             ph: "Counterexamples carry the marks — pick them carefully…" }
    },
    {
      head: "Physics · Class 12 · Sample Paper",
      mcq: { qnum: "1.", marks: 1, diff: ["Easy", "easy"], tag: "Electric Charges",
             q: "The SI unit of electric flux is:",
             opts: ["N·C⁻¹·m²", "N·m²·C⁻¹", "V·m", "Both (b) and (c)"],
             correct: 3, sub: "Electric flux" },
      saq: { qnum: "17.", marks: 2, diff: ["Medium", "med"],
             q: "Two point charges repel each other with 8×10⁻³ N in air. Find the force if they're placed in a medium of εr = 4.",
             ph: "Force scales by 1/εr — one line of working…" }
    }
  ];

  const SOLVES = [
    {
      head: "Physics · Class 10 · Electricity", marks: 3, diff: ["Easy", "easy"],
      q: "A 6 Ω resistor and a 3 Ω resistor are connected in parallel across a 12 V battery. Find the current drawn from the battery.",
      steps: [
        ["Parallel resistance: 1/R = 1/6 + 1/3 = 1/2 → R = 2 Ω", "✓ combination formula — method mark"],
        ["Ohm's law: I = V/R = 12/2", "✓ correct substitution"],
        ["I = 6 A", "✓ unit stated — full marks"]
      ],
      check: "R_eq check: 6‖3 → 2.000 Ω · I check: 12/2 → 6.000 A · PASS", score: "Verified · 3/3"
    },
    {
      head: "Mathematics · Class 9 · Quadrilaterals", marks: 3, diff: ["Medium", "med"],
      q: "The angles of a quadrilateral are in the ratio 3:5:9:13. Find all the angles.",
      steps: [
        ["Let angles be 3x, 5x, 9x, 13x", "✓ ratio set up"],
        ["3x+5x+9x+13x = 360° → 30x = 360° → x = 12°", "✓ angle-sum property used"],
        ["Angles: 36°, 60°, 108°, 156°", "✓ all four found — full marks"]
      ],
      check: "Sum check: 36+60+108+156 → 360.000° · ratio preserved · PASS", score: "Verified · 3/3"
    },
    {
      head: "Chemistry · Class 10 · Chemical reactions", marks: 3, diff: ["Easy", "easy"],
      q: "Balance the equation: Fe + H₂O → Fe₃O₄ + H₂",
      steps: [
        ["Balance Fe first: 3Fe + H₂O → Fe₃O₄ + H₂", "✓ start with metals — board order"],
        ["Balance O: 3Fe + 4H₂O → Fe₃O₄ + H₂", "✓ oxygen balanced"],
        ["Balance H: 3Fe + 4H₂O → Fe₃O₄ + 4H₂", "✓ fully balanced — full marks"]
      ],
      check: "Atom count LHS=RHS: Fe 3·3, O 4·4, H 8·8 · PASS", score: "Verified · 3/3"
    }
  ];

  const DASH = [
    { greet: "Good afternoon, Aarav.", mission: "Light your first star.",
      sub: "All sky. No stars yet. Pick any topic and make it yours tonight.",
      rows: [
        ["Streak", "No streak yet — today starts one", "0 days"],
        ["XP", "First activity writes the first XP", "0"],
        ["Topics mastered", "Practice cards banked", "0 / 2,309"],
        ["Mastery", "A quick check-up sets the baseline", "0%"],
        ["Daily goal", "10 questions a day is a standard start", "not set"]
      ],
      hw: [["Chemistry — Mole Concept problems 1–10", "S. Iyer", "Mon 12 Oct"],
           ["English — Hornbill Ch.2 comprehension", "R. Kapoor", "Wed 14 Oct"]] },
    { greet: "Good evening, Aarav.", mission: "One star is lit. Keep it burning.",
      sub: "Streaks die at midnight — 20 minutes keeps yours alive.",
      rows: [
        ["Streak", "7 days and counting", "7 days"],
        ["XP", "Level 4 — 340 to next", "1,240"],
        ["Topics mastered", "Electricity is almost yours", "14 / 2,309"],
        ["Mastery", "Trending up this week", "31%"],
        ["Daily goal", "6 of 10 done", "6/10"]
      ],
      hw: [["Physics — Numericals on resistance 1–8", "S. Iyer", "Tue 13 Oct"],
           ["Maths — Trigonometry identities", "R. Kapoor", "Fri 16 Oct"]] }
  ];

  const FEELERS = [
    { head: "Quick feeler — no marks", chap: "Electric Current",
      q: "Define electric current and state its SI unit. What does 1 ampere represent in terms of charge and time?",
      hook: "Every phone charger you've ever used is rated in amperes. The 2 A on your charger brick is literally this chapter — a count of charge flowing per second. Tonight you'll compute it for a real circuit." },
    { head: "Quick feeler — no marks", chap: "Chemical Reactions",
      q: "What tells you a chemical reaction has happened? Name two observable signs.",
      hook: "The rust on your school gate, the curd setting overnight, the color change in a cut apple — you've watched a hundred reactions without naming one. Today you learn the signs." },
    { head: "Quick feeler — no marks", chap: "Real Numbers",
      q: "Is every irrational number a real number? Is every real number irrational?",
      hook: "√2 was once so disturbing that legend says its discoverer was drowned for it. Tonight you meet the numbers that broke Greek mathematics." }
  ];

  const STAMPS = [
    ["Ohm's Law", "Mastered", "08 Oct 2026 · verified 5/5"],
    ["First Star", "Lit", "09 Oct 2026 · galaxy event"],
    ["Streak", "7 Days", "10 Oct 2026 · verified"],
    ["Exam Sim", "82%", "05 Oct 2026 · verified"],
    ["Socratic", "Solved it", "03 Oct 2026 · self-derived"]
  ];
  const UNCLAIMED = ["Electric circuits", "Magnetic effects", "Light — reflection", "Acids & bases", "Real numbers"];

  const JUNIOR = [
    { q: "How many fingers on 2 hands? 🖐️🖐️", opts: ["5", "10", "20"], correct: 1,
      yes: "Yes! 5 + 5 = 10 ⭐ 🎉", no: "Almost — count the fingers on both hands together. Try again!" },
    { q: "Which is bigger — 7 or 4? 🐘🐭", opts: ["4", "7", "Same"], correct: 1,
      yes: "Right! 7 is bigger — the elephant wins! ⭐ 🎉", no: "Count it: 1,2,3,4… then 5,6,7. Which came later? Try again!" },
    { q: "3 birds sit on a tree. 1 flies away. How many stay? 🐦", opts: ["2", "3", "4"], correct: 0,
      yes: "Exactly! 3 − 1 = 2 birds stay. ⭐ 🎉", no: "Imagine it — one flies off. How many are left? Try again!" }
  ];

  const SCENES = [
    { id: "orbit", n: "01", name: "Solar System", tag: "Astronomy", grade: "Grades 6–9",
      title: "Solar System",
      lede: "A star, eight worlds, and a thin disk of leftover ice. Gravity writes ellipses. Distance writes time.",
      facts: [
        "Inner worlds are rocky. Outer worlds are gas and ice giants.",
        "Kepler's law: closer planets sweep faster. Mercury sprints. Neptune crawls.",
        "If the Sun were a grapefruit, Earth would be a peppercorn about 15 meters away."
      ],
      pointer: "Your pointer is a passing mass — nudge a world off its path, watch gravity remember the orbit." },
    { id: "band", n: "02", name: "Milky Way", tag: "Astronomy", grade: "Grades 6–9",
      title: "Milky Way",
      lede: "Two hundred billion suns arranged in a spiral you live inside. Every star you see belongs to it.",
      facts: [
        "The Sun orbits the galactic center once every ~230 million years.",
        "Most stars have planets — the galaxy holds more worlds than people.",
        "The Milky Way's dust lanes are its construction sites: that's where stars are born."
      ],
      pointer: "Drag through the band — you're inside this. Everything you call night is one arm of it." },
    { id: "hole", n: "03", name: "Black Hole", tag: "Astronomy", grade: "Grades 9–12",
      title: "Black Hole",
      lede: "A region where gravity wins so completely that even light can't leave. Space itself falls inward.",
      facts: [
        "The event horizon is a point of no return — not a surface, a boundary in causality.",
        "Time dilates near the edge: an outside clock sees you freeze as you fall.",
        "The bright ring is the photon sphere — light itself trapped in orbit."
      ],
      pointer: "Move your pointer through the disk — watch spacetime lens around the mass." }
  ];

  return { pick, PROOFS, PRACTICE, EXAMS, SOLVES, DASH, FEELERS, STAMPS, UNCLAIMED, JUNIOR, SCENES };
})();
