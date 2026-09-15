const fs = require('fs');
const p = 'components/sims_v2/tools/authored_content.json';
const j = JSON.parse(fs.readFileSync(p, 'utf8'));
const add = {
"c10_phy_ch01": {
  title: "Electricity",
  subtitle: "Build circuits, measure current, and learn why your house wiring is designed the way it is.",
  role: "an apprentice electrician checking a newly wired room",
  intro: "A house has tripped its breaker three times this week. Your job: find what's wrong with the circuit logic before anyone touches a wire.",
  goal: "Predict current, voltage and resistance in any circuit you build — and explain why series and parallel behave so differently.",
  discovery: {
    question: "Two identical bulbs — one wired in series, one in parallel. Which setup glows brighter, and why does the answer surprise most people?",
    options: ["Parallel — each bulb gets the full voltage", "Series — the current is stronger", "They glow the same — bulbs are identical", "Series — the voltage adds up"],
    answer: "Parallel — each bulb gets the full voltage",
    hook: "Most students think 'more components = more power'. In series the current must fight through both bulbs — parallel gives each its own path."
  },
  mission: "On the circuit lab: build a series and a parallel circuit — measure what happens to brightness when you remove one bulb from each.",
  finale: "Ohm's law isn't a formula to memorise — it's the reason your house is wired in parallel and why a fuse is a calculated sacrifice."
},
"c10_phy_ch04": {
  title: "Light: Reflection and Refraction",
  subtitle: "Bend light with lenses and mirrors until you can predict exactly where the image lands.",
  role: "an optician designing a prescription",
  intro: "A patient can't read the board past 3 metres. Before you grind a single lens, you need to know exactly what shape bends light back onto the retina.",
  goal: "Trace rays through any lens or mirror — predict image position, size and whether it's real or virtual.",
  discovery: {
    question: "A spoon in a glass of water looks bent at the waterline. The spoon is perfectly straight — so what actually changed?",
    options: ["Light changed speed crossing air to water, so its path bent", "Water magnifies the spoon", "The glass distorts the image", "Reflection off the water surface doubles it"],
    answer: "Light changed speed crossing air to water, so its path bent",
    hook: "The bend isn't an illusion of the glass — light literally slows down in water, and changing speed means changing direction."
  },
  mission: "On the lens lab: move the object from beyond 2F to between F and the lens — watch the image flip from real-and-shrinking to virtual-and-magnified.",
  finale: "Every camera, telescope, microscope and pair of spectacles is one idea: light obeys rules, and rules can be bent into instruments."
},
"c10_chem_ch01": {
  title: "Chemical Reactions and Equations",
  subtitle: "Learn to read reactions like sentences — and balance them so no atom goes missing.",
  role: "a lab chemist documenting an experiment",
  intro: "Your iron nail left in copper sulphate turned coppery brown overnight. Your job: write the equation that explains where the copper came from.",
  goal: "Identify reaction types on sight and balance any equation without losing an atom.",
  discovery: {
    question: "You burn 10g of magnesium and the ash weighs MORE than 10g. Where did the extra mass come from?",
    options: ["Oxygen from the air joined the magnesium", "Burning creates matter", "The scale is wrong", "Heat adds weight"],
    answer: "Oxygen from the air joined the magnesium",
    hook: "Most students think burning makes things disappear. Mass is never created or destroyed — the missing mass was in the air all along."
  },
  mission: "Balance three equations in the lab — start with the unbalanced skeleton and place coefficients until every atom counts.",
  finale: "A balanced equation is a promise: atoms are never lost, only rearranged. Every industry from steel to medicine runs on that promise."
},
"c10_bio_ch03": {
  title: "How Do Organisms Reproduce",
  subtitle: "From cell division to fertilisation — how life copies itself, and why it never copies perfectly.",
  role: "a plant breeder developing a new variety",
  intro: "You have a rose that flowers brilliantly but never sets seed. Your job: decide whether to propagate it asexually or cross it — and what each choice does to variation.",
  goal: "Compare asexual and sexual reproduction — and explain why variation is survival's insurance policy.",
  discovery: {
    question: "A single bacterium becomes a billion identical copies overnight — yet a species of bacteria can still out-evolve antibiotics. Where does the variation come from?",
    options: ["Mutation during copying — imperfect division creates differences", "They reproduce sexually too", "The antibiotic creates the variation", "Variation only happens in animals"],
    answer: "Mutation during copying — imperfect division creates differences",
    hook: "Most students think asexual copies are always identical. Copying billions of times means billions of chances to be slightly different."
  },
  mission: "On the reproduction lab: run one asexual cycle and one sexual cycle — count how much variation each produces.",
  finale: "Reproduction is life's way of saying: copy yourself, but not perfectly — the imperfections are how species survive what they can't predict."
},
"c10_bio_ch04": {
  title: "Heredity and Evolution",
  subtitle: "Why you have your grandmother's eyes — and how small changes over millennia built every species alive.",
  role: "a genetic counsellor explaining a family trait",
  intro: "A couple asks why their child has a trait neither parent shows. Your job: trace the recessive allele that hid for a generation.",
  goal: "Predict trait inheritance with Punnett logic and explain how selection turns small variations into new species.",
  discovery: {
    question: "Two brown-eyed parents have a blue-eyed child. Neither parent's eyes are blue — so whose eyes did the child inherit?",
    options: ["Both parents carried a hidden blue-eye gene", "A grandparent's gene skipped generations", "The mutation happened at birth", "Eye colour isn't inherited"],
    answer: "Both parents carried a hidden blue-eye gene",
    hook: "Recessive traits don't vanish — they hide. Two carriers can both look one way while silently carrying the other."
  },
  mission: "On the heredity lab: cross two heterozygous parents and watch the 3:1 ratio emerge from hundreds of offspring.",
  finale: "You are the running total of every inheritance since life began — heredity explains your eyes, and evolution explains why eyes exist at all."
},
"c9_physics_ch02": {
  title: "Motion",
  subtitle: "Distance, displacement, speed, velocity — the vocabulary that turns 'it moved' into physics.",
  role: "a sports analyst timing a sprinter",
  intro: "Two runners finish 100m together — but one's speed graph tells a completely different story. Your job: read the graph and find who actually ran faster when.",
  goal: "Read and build distance-time and velocity-time graphs — extract speed, acceleration and displacement on sight.",
  discovery: {
    question: "You drive 40 km to school and back home. Odometer says 80 km. Physicist says your displacement is zero. Who's right?",
    options: ["Both — displacement measures position change, not travel", "The odometer — distance is what matters", "The physicist — the trip was wasted", "Neither — displacement is always half the distance"],
    answer: "Both — displacement measures position change, not travel",
    hook: "Distance and displacement are different questions — one asks 'how far did you travel', the other 'how far did you end up'."
  },
  mission: "On the motion lab: draw a velocity-time graph for a car that speeds up, cruises, and brakes — read the displacement from the area.",
  finale: "Graphs are where motion becomes readable — every GPS, every crash test, every rocket trajectory is a story told in slopes and areas."
},
"c9_physics_ch03": {
  title: "Force and 
