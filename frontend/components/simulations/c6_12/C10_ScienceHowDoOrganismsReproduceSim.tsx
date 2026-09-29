'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 10 Science -- How do Organisms Reproduce?
 *
 * Asexual multiplication races (fission / budding / fragmentation / spores)
 * vs sexual reproduction's slower pace but high variation. Plus a variation
 * engine that shows WHY variation matters, and a flower/seed module covering
 * pollination and fertilisation.
 *
 * Deep layout (master-class, 5 tabs):
 *   1. Discover      -- predict-then-test walks
 *   2. Multiplication Lab -- original growth engine, preserved + extended
 *                            (doubling time, side-by-side table)
 *   3. Variation & Seeds -- clone-vs-reshuffle trait engine + flower
 *                            pollination walk-through
 *   4. Challenge     -- 3-tier quiz with hints
 *   5. Truths        -- misconceptions + honest summary
 * Self-contained: react + tailwind only.
 */

type TabKey = 'discover' | 'multiply' | 'variation' | 'challenge' | 'truths';
type Mode = 'fission' | 'budding' | 'fragmentation' | 'spore' | 'sexual';

const TABS: { id: TabKey; label: string; emoji: string }[] = [
  { id: 'discover', label: '1 \u00b7 Predict', emoji: '\u26a1' },
  { id: 'multiply', label: '2 \u00b7 Multiplication Lab', emoji: '\ud83c\udf31' },
  { id: 'variation', label: '3 \u00b7 Variation & Seeds', emoji: '\ud83c\udf3a' },
  { id: 'challenge', label: '4 \u00b7 Challenge', emoji: '\ud83c\udfaf' },
  { id: 'truths', label: '5 \u00b7 Truths', emoji: '\ud83e\udee0' },
];

const MODES: Record<
  Mode,
  { label: string; organism: string; factor: number; intervalMin: number; variation: number; blurb: string }
> = {
  fission: { label: 'Binary fission', organism: 'Amoeba / bacteria', factor: 2, intervalMin: 20, variation: 2, blurb: 'One cell splits into two equal daughters. Growth is exponential: 2^n.' },
  budding: { label: 'Budding', organism: 'Yeast / Hydra', factor: 1.6, intervalMin: 45, variation: 2, blurb: 'A bud pinches off the parent; the parent keeps dividing too.' },
  fragmentation: { label: 'Fragmentation', organism: 'Spirogyra / Planaria', factor: 2, intervalMin: 90, variation: 2, blurb: 'Each broken piece regrows into a whole organism.' },
  spore: { label: 'Spore formation', organism: 'Rhizopus (bread mould)', factor: 3, intervalMin: 120, variation: 3, blurb: 'Sporangia release thousands of spores, each able to start a colony.' },
  sexual: { label: 'Sexual reproduction', organism: 'Flowering plants / animals', factor: 1, intervalMin: 0, variation: 100, blurb: 'Two gametes fuse; each offspring is a unique reshuffle of DNA.' },
};

const FLOWER_STEPS = [
  {
    title: '1 \u00b7 Pollen lands',
    body: 'A pollen grain (the male gamete carrier) sticks to the sticky STIGMA, usually delivered by wind or a pollinator from another flower -- cross-pollination beats self-pollination for variation.',
    emoji: '\ud83c\udf2c\ufe0f',
  },
  {
    title: '2 \u00b7 Pollen tube grows',
    body: 'The pollen grain germinates: a tube digs down through the STYLE toward the ovary, carrying two male gametes.',
    emoji: '\ud83c\udf31',
  },
  {
    title: '3 \u00b7 Fertilisation',
    body: 'One male gamete fuses with the EGG cell (making the embryo\u2019s first cell, 2n); the other fuses with two polar nuclei (making 3n endosperm -- the seed\u2019s packed lunch). Double fertilisation is unique to flowering plants.',
    emoji: '\u26a8\ufe0f',
  },
  {
    title: '4 \u00b7 Seed and fruit',
    body: 'The ovule hardens into a SEED; the ovary swells into a FRUIT. The seed holds embryo + food reserve + coat -- a survival capsule carrying the reshuffled DNA.',
    emoji: '\ud83c\udf3b',
  },
];

// ==========================================
// CHALLENGES
// ==========================================

interface Challenge {
  id: string;
  tier: 'foundation' | 'standard' | 'advanced';
  skill: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hints: string[];
}

const CHALLENGES: Challenge[] = [
  // --- foundation ---
  {
    id: 'ch_01',
    tier: 'foundation',
    skill: 'DNA copying',
    question: 'The most basic requirement of ANY reproduction event is:',
    options: [
      'two parents',
      'a DNA copy that is passed to the next generation, along with the cellular apparatus to run it',
      'water for the offspring',
      'seeds or spores',
    ],
    correctIndex: 1,
    explanation:
      'Reproduction at its core is DNA replication plus cell division. Even binary fission runs on it. Two parents are optional; the copying is not.',
    hints: [
      'What do the offspring inherit that lets it be a working organism?',
      'Which molecule carries the blueprint?',
      'A faithful (but not perfectly faithful) DNA copy.',
    ],
  },
  {
    id: 'ch_02',
    tier: 'foundation',
    skill: 'Asexual definition',
    question: 'Binary fission, budding, fragmentation and spore formation are all examples of:',
    options: [
      'sexual reproduction needing gametes',
      'asexual reproduction -- one parent, offspring genetically near-identical (clones)',
      'vegetative propagation only',
      'regeneration in injured tissue',
    ],
    correctIndex: 1,
    explanation:
      'All four are asexual: no gametes, one parent, minimal variation (only from copying errors). The Multiplication Lab races all four.',
    hints: [
      'How many parents does each involve?',
      'Compare the variation % shown for each mode in the lab.',
      'Asexual -- clones.',
    ],
  },
  {
    id: 'ch_03',
    tier: 'foundation',
    skill: 'Exponential growth',
    question: 'A bacterium dividing every 20 minutes starts from 1 cell. After 3 hours (9 doublings) the population is:',
    options: ['18', '512', '256', '1024'],
    correctIndex: 1,
    explanation:
      '2\u2079 = 512. The lab\u2019s log-scale curve straightens this explosive growth into a line -- exponential growth always looks linear on a log plot.',
    hints: [
      '3 hours = 180 minutes = how many 20-minute cycles?',
      'Population = 2^n after n doublings.',
      '2\u2079 = 512.',
    ],
  },
  // --- standard ---
  {
    id: 'ch_04',
    tier: 'standard',
    skill: 'Variation value',
    question: 'A bacterial colony is grown from one cell (all clones). A new antibiotic arrives. Why can the WHOLE colony die?',
    options: [
      'Antibiotics kill clones preferentially',
      'With near-zero variation, if one cell\u2019s biochemistry is vulnerable, ALL cells share that vulnerability -- no variant survives to carry on',
      'Clones are physically weaker',
      'Antibiotics block cell division only in clones',
    ],
    correctIndex: 1,
    explanation:
      'Clonality is a monoculture of risk. In a sexual population, the pre-existing variation guarantees SOME individuals differ enough to survive -- the population pays reproduction\u2019s speed for an insurance policy.',
    hints: [
      'What do all clones share with each other?',
      'Which population is more likely to contain an individual with resistance?',
      'Uniform vulnerability -- no diversity shield.',
    ],
  },
  {
    id: 'ch_05',
    tier: 'standard',
    skill: 'Flower anatomy',
    question: 'After fertilisation in a flowering plant, which parts become the SEED and the FRUIT?',
    options: [
      'ovary \u2192 seed; ovule \u2192 fruit',
      'ovule \u2192 seed; ovary \u2192 fruit',
      'stigma \u2192 seed; style \u2192 fruit',
      'pollen \u2192 seed; anther \u2192 fruit',
    ],
    correctIndex: 1,
    explanation:
      'Ovule hardens into the seed (with embryo + endosperm + coat); the surrounding ovary swells into the fruit. The Variation & Seeds tab walks the whole route.',
    hints: [
      'Which structure held the egg cell?',
      'Which structure is the flower\u2019s "womb" holding the ovules?',
      'Ovule \u2192 seed, ovary \u2192 fruit.',
    ],
  },
  {
    id: 'ch_06',
    tier: 'standard',
    skill: 'Reading the model',
    question: 'In the lab, spore mode (factor 3, interval 120 min) beats fission (factor 2, interval 20 min) only after MANY cycles. What honest lesson about the model does this carry?',
    options: [
      'Spores are always the fastest reproducers',
      'Both the multiplication factor AND the cycle time matter -- real population growth is exp(t / generation-time), not just "big numbers per step"',
      'Fission is modelled incorrectly',
      'Time plays no role in population size',
    ],
    correctIndex: 1,
    explanation:
      'Per hour: fission doubles 3\u00d7 (2\u00b3 = 8\u00d7 per hour); spores triple but only every 2 h (\u221a9 = 3\u00d7 per hour). Fission wins on RATE even though spores win per EVENT. Real ecology always prices in generation time.',
    hints: [
      'Compute growth per HOUR for each mode, not per cycle.',
      'Fission: 2 every 20 min \u2192 8 per hour. Spores: 3 every 120 min \u2192 1.73 per hour.',
      'Fission\u2019s short cycle beats spore\u2019s big factor.',
    ],
  },
  // --- advanced ---
  {
    id: 'ch_07',
    tier: 'advanced',
    skill: 'Meiosis & fertilisation',
    question: 'Gametes are produced by meiosis and carry HALF the chromosome number. Why must gametes be haploid?',
    options: [
      'Half-sized cells swim faster',
      'So that fertilisation restores the diploid number -- otherwise each generation would double its DNA',
      'Because diploid cells cannot divide at all',
      'So the egg can feed the sperm',
    ],
    correctIndex: 1,
    explanation:
      'n + n = 2n. Human: 23 + 23 = 46 chromosomes. If gametes were diploid, children would have 92, grandchildren 184 -- DNA doubling per generation is impossible for a working cell.',
    hints: [
      'What happens to chromosome count when two gametes fuse?',
      'The count must stay constant across generations.',
      'Haploid + haploid = diploid: n + n = 2n.',
    ],
  },
  {
    id: 'ch_08',
    tier: 'advanced',
    skill: 'Double fertilisation',
    question: 'In flowering plants, ONE pollen grain delivers TWO male gametes because:',
    options: [
      'one is a spare in case the first fails',
      'one fertilises the egg (2n embryo) and the other fertilises the two polar nuclei (3n endosperm) -- double fertilisation feeds the embryo',
      'flowers need twice the DNA of animals',
      'one gamete becomes the fruit',
    ],
    correctIndex: 1,
    explanation:
      'The 3n ENDOSPERM is a genetically distinct, nutrient-storing tissue built fresh each seed -- the seed\u2019s packed lunch, produced only when a seed is actually coming. No flowering-plant seed lacks it (coconut water is liquid endosperm).',
    hints: [
      'What does a germinating seedling need before it can photosynthesise?',
      'Which tissue stores that food?',
      'Embryo (2n) + endosperm (3n) -- both from one pollen grain.',
    ],
  },
  {
    id: 'ch_09',
    tier: 'advanced',
    skill: 'Synthesis',
    question: 'The chapter\u2019s deepest claim: "variation is useful for the SPECIES, not necessarily for the individual." Which lab observation best dramatizes this?',
    options: [
      'Sexual offspring appear in many colours (clones stay green) -- the diversity is a population-level insurance policy whose value only shows under environmental change',
      'Sexual organisms reproduce faster',
      'Clones are always larger',
      'Variation makes individuals immortal',
    ],
    correctIndex: 0,
    explanation:
      'Any single sexual offspring is a gamble; the PORTFOLIO of offspring survives whatever the environment does. Speed vs insurance is the entire trade-off -- and the reason both strategies still exist on Earth.',
    hints: [
      'Whose survival does variation protect when a new disease or temperature arrives?',
      'One clone dies in the new world; SOME variant survives.',
      'Population insurance, not individual advantage.',
    ],
  },
  // ─── Class 10 board-depth additions: reproduction diagnostics ───
  {
    id: 'ch_depth_repr_asexual_claim',
    tier: 'standard',
    skill: 'Evaluation',
    question:
      'Evaluate: "Since asexual reproduction produces offspring faster and with less energy, it is the superior mode of reproduction."',
    options: [
      'Partly true on speed, false overall -- asexual clones carry identical DNA, so one lethal disease or climate change can erase the whole lineage; sexual reproduction trades speed for variation that future-proofs the species',
      'True -- faster always means better',
      'False -- asexual reproduction is slow and costly',
      'True because bacteria never go extinct',
    ],
    correctIndex: 0,
    explanation:
      'Speed and low energy are real advantages of asexual reproduction in stable environments. The fatal flaw: no variation. If the environment shifts, every genetically identical offspring shares the same vulnerability. Sexual reproduction is slower and costlier but reshuffles genes each generation -- a species-level insurance policy.',
    hints: [
      'What do ALL clones share that variants do not?',
      'One disease + identical genes = ?',
      'Judge "superior" against a CHANGING environment, not a fixed one.',
    ],
  },
  {
    id: 'ch_depth_repr_fission_modes',
    tier: 'standard',
    skill: 'Distinguish',
    question:
      'Why is binary fission "irregular" in Amoeba but "transverse" in Paramecium? Which organism shows MULTIPLE fission, and how do the two modes compare?',
    options: [
      'Amoeba (no fixed shape) divides in any plane; Paramecium\'s slipper shape fixes a transverse plane; the malarial parasite Plasmodium undergoes multiple fission inside a red blood cell -- many nuclei form in one cytoplasm before one parent yields many daughters at once',
      'Both divide longitudinally; Plasmodium buds',
      'Amoeba divides transversely; Paramecium is a multicellular animal',
      'Multiple fission means two identical daughter cells'
    ],
    correctIndex: 0,
    explanation:
      'Compare binary vs multiple fission: (a) daughter cells -- 2 vs many; (b) nuclear divisions -- one mitosis vs repeated divisions inside a cyst/cell; (c) conditions -- favourable vs unfavourable (encystment). Observation: prepare a hay-infusion culture (hay in pond water, 3-5 days in sunlight), mount a drop, and watch Paramecium divide across its middle every few hours.',
    hints: [
      'Body symmetry decides the cutting plane.',
      'Plasmodium = malaria; inside RBCs it multiplies as sporozoites.',
      'One parent, one event, MANY offspring = multiple fission.'
    ],
  },
  {
    id: 'ch_depth_repr_frag_regen',
    tier: 'standard',
    skill: 'Distinguish',
    question:
      'Why do fragmentation and regeneration work only in organisms with simple body organisation? Evaluate cutting a starfish into five pieces to "make five starfish".',
    options: [
      'Simple bodies lack specialised tissues, so any piece can regrow the whole; a starfish cut through the central disc may regrow, but random chopping without the disc usually kills the pieces -- regeneration needs specific parts and is not guaranteed multiplication',
      'Complex animals can regrow from any tissue fragment',
      'Starfish cannot regenerate at all',
      'Fragmentation and regeneration are identical processes'
    ],
    correctIndex: 0,
    explanation:
      'Fragmentation (Spirogyra, simple worms): the body breaks randomly and EACH fragment grows a new organism -- possible only when no organ is indispensable. Regeneration (Hydra, Planaria, starfish arms): specialised cells proliferate and redifferentiate. Investigation design: cut a freshwater flatworm into three pieces, keep them in aerated pond water, record regrowth over 2 weeks -- controlled comparison of head/middle/tail pieces.',
    hints: [
      'Could a piece of YOUR arm grow a new you? Why not?',
      'Which piece of a planarian regrows fastest?',
      'Regeneration is repair plus, not instant cloning.'
    ],
  },
  {
    id: 'ch_depth_repr_budding_yeast_hydra',
    tier: 'foundation',
    skill: 'Distinguish',
    question:
      'Compare budding in yeast and Hydra: parent cellularity, fate of the bud, and the leather-in-cupboard white growth. Which kitchen experiment shows yeast budding?',
    options: [
      'Yeast is unicellular: a bud pinches off as a daughter CELL (sometimes staying in chains); Hydra is multicellular: an outgrowth of differentiated tissue detaches as a whole new animal. The white cottony growth is Rhizopus MOULD growing by SPORE formation. Kitchen demo: sugar + warm water + yeast, observe buds and chains under a microscope within hours',
      'Both parents are multicellular; buds become gametes',
      'Yeast buds into hyphae; Hydra divides by fission',
      'The leather growth is yeast; spores are yeast offspring'
    ],
    correctIndex: 0,
    explanation:
      'The leather fuzz is Rhizopus: upright hyphal branches (sporangiophores) bear round sporangia full of spores -- spore formation suits dispersal through air to new substrates, while budding multiplies IN PLACE. Compare dispersal: spores are tiny, wind-borne and drought-resistant; a bud stays attached until mature. Timeline for the yeast demo: mix 1 spoon sugar in warm water, add yeast, cover -- budding visible at 2-4 hours, chains by next morning.',
    hints: [
      'One cell budding vs a tissue outgrowth budding.',
      'Fuzzy shoe-leather growth = sporangia, not buds.',
      'Yeast loves sugar + warmth -- watch the first buds.'
    ],
  },
  {
    id: 'ch_depth_repr_flower_whorls',
    tier: 'foundation',
    skill: 'Recall',
    question:
      'Name the four whorls of a typical flower from outside in, and which two are the "essential" whorls?',
    options: [
      'Calyx (sepals), corolla (petals), androecium (stamens), gynoecium (carpels); the essential whorls are androecium + gynoecium because they make the gametes',
      'Petals, sepals, thorns, leaves -- essential: petals',
      'Calyx, corolla, receptacle, pedicel -- essential: calyx',
      'All four whorls are equally essential in every flower',
    ],
    correctIndex: 0,
    explanation:
      'Outer two whorls are accessory (protect, attract); the male androecium (anther = pollen = male gametes) and female gynoecium (ovary = ovules = female gametes) are essential. Petaloid sepals exception: in some flowers sepals are coloured and petal-like while true petals are absent -- a student writing "sepals are always green" loses the mark. Observation activity: collect a bisexual flower (mustard) and a unisexual pair (maize/cucumber): count whorls, cut a longitudinal section of the ovary to see ovules on the placenta along the ridge (marginal placentation in mustard).',
    hints: [
      'Outside-in: green, bright, male, female.',
      '"Essential" = cannot be dispensed with for reproduction.',
      'Colourful SEPALS exist -- check bougainvillea.'
    ],
  },
  {
    id: 'ch_depth_repr_pollination_modes',
    tier: 'standard',
    skill: 'Analysis',
    question:
      'Maize makes masses of light, smooth pollen with a feathery exposed stigma; Vallisneria releases pollen into water; the sunflower lures insects. Match each to its pollination mode and adaptations.',
    options: [
      'Maize = wind pollination (light dry abundant pollen, feathery stigma to catch drifting grains); Vallisneria = water pollination (pollen drifts on the water surface to female flowers); sunflower = insect pollination (sticky spiny pollen, nectar, bright inflorescence)',
      'All three are wind pollinated',
      'Maize is insect pollinated; Vallisneria is wind pollinated',
      'Sunflower pollinates underground'
    ],
    correctIndex: 0,
    explanation:
      'Each vector reshapes the flower: wind = small, smooth, countless pollen + exposed stigmas; water = waterproof pollen released near the surface; insects = sticky pollen that clings to bodies + reward (nectar). School-garden design to test self vs cross pollination in petunia: bag one flower bud (exclude insects) -- if it still sets seed, self-pollination; cross-bag two plants with hand transfer for cross; compare seed set.',
    hints: [
      'Ask: how far must pollen travel, and through what medium?',
      'Feathery stigmas are a fishing net for AIRBORNE grains.',
      'Bagged flowers answer the self/cross question.'
    ],
  },
  {
    id: 'ch_depth_repr_seed_endosperm',
    tier: 'standard',
    skill: 'Analysis',
    question:
      'Why is a mature pea seed non-endospermic while a castor seed is endospermic? Classify maize, bean, groundnut and coconut with a simple investigation.',
    options: [
      'In pea the endosperm was consumed by the growing embryo, food stored in the cotyledons; castor RETAINS endosperm as its food store. Maize and castor = endospermic (albuminous); bean, groundnut = non-endospermic; coconut has both (solid endosperm + liquid)',
      'Pea seeds have no stored food at all',
      'Castor and pea are identical inside',
      'Endosperm is a pest inside the seed'
    ],
    correctIndex: 0,
    explanation:
      'Fate of endosperm decides the class: absorbed by cotyledons (non-endospermic/albuminous-free: pea, bean, groundnut) vs retained (endospermic: maize, castor, wheat, coconut). Investigation: soak the four seeds overnight, dissect and iodine-stain cut faces -- the stained (starchy) store shows WHERE the food lives: cotyledon layers vs central endosperm. Note the iodine stain makes the comparison visible, not the taste.',
    hints: [
      'Where does the baby plant\'s lunchbox sit?',
      'Iodine stains starch blue-black -- map the store.',
      'Coconut water IS liquid endosperm.'
    ],
  },
  {
    id: 'ch_depth_repr_male_system',
    tier: 'standard',
    skill: 'Recall',
    question:
      'Name the male sex organ and its two functions; why do the testes sit OUTSIDE the body in the scrotum; and trace a sperm from production to exit.',
    options: [
      'Testes: make sperm AND secrete testosterone; the scrotum keeps them about 2-3 deg C below body temperature (sperm production fails at core heat); sperm path: seminiferous tubules -> epididymis (matures, stored) -> vas deferens -> urethra (through the prostate and Cowper/bulbourethral glands, joining seminal vesicle fluid to make semen) -> out',
      'Testes only store sperm; scrotum is decorative; sperm exit via the kidney',
      'The scrotum keeps testes warm to speed sperm production',
      'Semen is made entirely in the epididymis'
    ],
    correctIndex: 0,
    explanation:
      'Design demo of the temperature point: a warm-water and cool-water comparison of "enzyme works best below 37 deg C" makes the logic visible. Gland secretions: seminal vesicles add most of the fluid (fructose energy), prostate adds alkaline milky fluid, bulbourethral glands pre-flush the urethra -- together = semen. The urethra is shared by urine and semen, but a sphincter prevents both at once -- they cannot be expelled together.',
    hints: [
      'Two functions: cells (sperm) + hormone (testosterone).',
      'Slightly cooler is critical -- why trousers are not inside the body.',
      'Follow the tube: tubules -> epididymis -> vas deferens -> urethra.'
    ],
  },
  {
    id: 'ch_depth_repr_female_system',
    tier: 'standard',
    skill: 'Distinguish',
    question:
      'Name the female gonads and their two functions; compare the uterine wall layers; and evaluate "the vagina is just a passive tube."',
    options: [
      'Ovaries: release ova AND secrete estrogen/progesterone; the uterus has muscular myometrium (expels at birth) and lining endometrium (thickens monthly, sheds as menstruation), with the cervix as the neck; the vagina is NOT passive -- its acidic secretions and muscular walls aid sperm transport and defence',
      'Ovaries only carry eggs to the uterus; endometrium never changes',
      'The cervix is where the baby is fertilised',
      'The vagina plays no role until birth'
    ],
    correctIndex: 0,
    explanation:
      'Board diagram: ovary -> fallopian tube (fertilisation site) -> uterus (implantation) -> cervix -> vagina. The ovary is gonad + endocrine gland in one; the myometrium contracts during labour; the endometrium is rebuilt every cycle under hormone control. Draw the labelled path of an ovum: ovary released at ovulation -> tube cilia sweep -> uterus; if unfertilised, the lining sheds.',
    hints: [
      'Gonad = gametes + hormones, same as testes.',
      'Two uterine layers, two very different jobs.',
      'Follow the ovum arrow through all five stations.'
    ],
  },
  {
    id: 'ch_depth_repr_fertilisation_placenta',
    tier: 'advanced',
    skill: 'Analysis',
    question:
      'Where exactly does fertilisation occur, and is the claim "the placenta lets maternal and foetal blood mix" true? Also: why is the corpus luteum still needed after implantation?',
    options: [
      'Fertilisation happens in the ampulla of the fallopian tube (motile cilia and nutrients suit the meeting); the placenta does NOT mix blood -- the two circulations stay separated by a thin placental barrier through which glucose, oxygen and wastes diffuse; the corpus luteum keeps secreting progesterone until the placenta takes over',
      'Fertilisation happens in the uterus; blood mixes freely; the corpus luteum is discarded at implantation',
      'Fertilisation happens in the ovary; the placenta filters all substances perfectly',
      'The yolk sac feeds the baby for all nine months'
    ],
    correctIndex: 0,
    explanation:
      'The placenta is exchange, not mixing: large surface area + thin membranes allow selective diffusion of nutrients, oxygen, antibodies -- and unfortunately some drugs, alcohol, viruses. Timeline: yolk sac feeds the embryo in weeks 2-4; by weeks 8-12 the placenta assumes the role, after which the corpus luteum can retire. Household demo of selective exchange: a thistle funnel or dialysis tubing with starch/glucose solutions -- small molecules pass, big ones cannot.',
    hints: [
      'Tube, not womb -- the ampulla.',
      'Mother\'s blood and baby\'s blood never touch. Why must they not?',
      'Placenta = customs checkpoint, not an open border.'
    ],
  },
  {
    id: 'ch_depth_repr_contraception',
    tier: 'standard',
    skill: 'Evaluation',
    question:
      'Name four contraceptive methods with their category, explain why a condom does double duty, and compare surgical vs natural methods for a couple wanting to delay a first child by two years.',
    options: [
      'Condom (barrier), oral pills (chemical/hormonal), Copper-T/IUCD (intrauterine), vasectomy/tubectomy (surgical); a condom blocks sperm AND blocks sexually transmitted infection exchange -- the only method that does both; for a two-year delay, a REVERSIBLE method (condom, pills, IUCD) beats vasectomy/tubectomy which are near-permanent',
      'All contraceptives are surgical; condoms prevent pregnancy only',
      'Natural withdrawal is the most reliable method known',
      'Oral pills also protect against HIV'
    ],
    correctIndex: 0,
    explanation:
      'Categories: barrier, chemical/hormonal, intrauterine device, surgical. Effectiveness ranking: surgical (vasectomy/tubectomy ~99.9%) > IUCD > hormonal pills > condoms > natural rhythm/withdrawal (high failure). Evaluate "contraception is only for population control": false -- it also protects maternal health (spacing births), enables education/career planning and prevents STIs (condoms). Awareness activity: plot typical failure rates per 100 users per year on a bar chart from WHO data -- visual, factual, judgement-free.',
    hints: [
      'Reversibility is the deciding word for a two-year plan.',
      'Only the barrier method also stops virus/bacteria exchange.',
      'Hormonal pills change the cycle; they cannot stop a virus.'
    ],
  },
  {
    id: 'ch_depth_repr_stds',
    tier: 'advanced',
    skill: 'Evaluation',
    question:
      'Name the causative agent of syphilis; why do oral pills fail against STDs; and evaluate "if both partners test HIV-negative right after an exposure, they can stop using condoms."',
    options: [
      'Syphilis = the bacterium Treponema pallidum; pills change hormones and cannot block viruses/bacteria, so only barriers prevent STDs; the HIV claim is FALSE -- antibodies may take weeks to appear (window period), so immediate negatives can be falsely reassuring; a painless genital ulcer 3 weeks after exposure is primary syphilis and must be treated, not ignored',
      'Syphilis is a virus; pills block all infections; immediate HIV tests are fully conclusive',
      'Syphilis is a protozoan; the ulcer heals itself safely by definition',
      'Condoms are unnecessary once marriage occurs'
    ],
    correctIndex: 0,
    explanation:
      'Consequences ladder: untreated chlamydia -> pelvic inflammatory disease and infertility in women; untreated HPV -> cervical cancer risk; untreated syphilis -> late-stage heart/brain damage. "ABC" poster design: A = Abstain/Be faithful, B = Be faithful/Barrier (condom), C = Consult a doctor early -- one sentence each plus a helpline number. The window period is the single most-tested HIV fact: test again after the recommended interval.',
    hints: [
      'Bacteria vs virus decides which medicine and which prevention work.',
      'No antibodies yet is not the same as no virus.',
      'A painless ulcer is the disease\'s first warning light.'
    ],
  }
];

// ==========================================
// MISCONCEPTIONS
// ==========================================

const MISCONCEPTIONS: { misconception: string; correction: string }[] = [
  {
    misconception: 'Asexual reproduction produces perfectly identical offspring.',
    correction:
      'Near-identical. DNA copying always carries small error rates -- that is the lab\u2019s 2% variation floor. "Clone" means extremely similar, not atomically identical.',
  },
  {
    misconception: 'Sexual reproduction needs two organisms; asexual needs one, so sexual is always "better".',
    correction:
      'Neither is better in absolute terms. Asexual wins on speed and certainty in stable niches (most of the biosphere is bacterial). Sexual wins on diversity under change. Evolution keeps BOTH because Earth offers both kinds of environments.',
  },
  {
    misconception: 'Pollination and fertilisation are the same event.',
    correction:
      'Pollination is TRANSPORT: pollen landing on the stigma. Fertilisation is FUSION: gametes actually meeting inside the ovule, after the pollen tube grows. Pollination can fail to fertilise -- different events, days apart.',
  },
  {
    misconception: 'The seed is the plant\u2019s baby; nothing happens before germination.',
    correction:
      'The EMBRYO inside the seed is the next generation already -- a complete miniature plant (root-shoot axis, first leaves) formed at fertilisation. Germination is not the start of a new organism; it is the resumption of growth of one that already exists.',
  },
  {
    misconception: 'Variation arises because organisms "want" or "try" to adapt.',
    correction:
      'Variation arises from random DNA-copy errors and random reshuffling during meiosis. The environment then SELECTS among variants -- it does not direct them. Antibiotic resistance pre-exists in the population; the drug only reveals it.',
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================

export function C10_ScienceHowDoOrganismsReproduceSim() {
  const [tab, setTab] = useState<TabKey>('discover');

  // ── multiplication lab state (original preserved) ──
  const [mode, setMode] = useState<Mode>('fission');
  const [generations, setGenerations] = useState(10);
  const [startCount, setStartCount] = useState(1);

  // ── variation engine state ──
  const [offspringCount, setOffspringCount] = useState(12);
  const [stress, setStress] = useState<number>(3); // environment severity 0..6
  const [reshuffleSeed, setReshuffleSeed] = useState(1);

  // ── discover / challenge / truths state ──
  const [predicted, setPredicted] = useState<number | null>(null);
  const [flowerStep, setFlowerStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [hintLevel, setHintLevel] = useState<Record<string, number>>({});
  const [tierFilter, setTierFilter] = useState<'all' | Challenge['tier']>('all');
  const [openMisc, setOpenMisc] = useState<number | null>(null);

  // ── growth numerics (original formulas preserved) ──
  const info = MODES[mode];
  const population = useMemo(
    () => Math.round(startCount * Math.pow(info.factor, generations)),
    [startCount, generations, info.factor]
  );
  const hours = ((generations * info.intervalMin) / 60).toFixed(1);
  const digitCount = String(population).length;
  const cellsShown = Math.min(64, Math.max(1, Math.min(population, 64)));
  // doubling time in hours for the current mode
  const doublingHours = (info.intervalMin * Math.log(2)) / Math.log(info.factor) / 60;
  // growth per hour (factor^(60/interval))
  const perHour = Math.pow(info.factor, 60 / Math.max(info.intervalMin, 1));

  // side-by-side comparison at the same wall-clock time
  const comparison = useMemo(() => {
    const hoursFixed = Math.max(2, generations * info.intervalMin / 60);
    return (Object.keys(MODES) as Mode[]).map((k) => {
      const cfg = MODES[k];
      const cycles = cfg.intervalMin > 0 ? Math.max(0, Math.floor((hoursFixed * 60) / cfg.intervalMin)) : 0;
      const pop = k === 'sexual' ? startCount + Math.floor(cycles / 12) : Math.round(startCount * Math.pow(cfg.factor, cycles));
      return { mode: k, hours: hoursFixed, pop };
    });
  }, [generations, info.intervalMin, startCount]);

  // ── variation engine: clones vs reshuffle ──
  // each individual has 3 traits (0..5). Asexual: children copy parent (small drift).
  // Sexual: each child is a random mix of two "parents".
  const traits = useMemo(() => {
    const rng = (i: number) => {
      const x = Math.sin(i * 127.1 + reshuffleSeed * 311.7) * 43758.5453;
      return x - Math.floor(x);
    };
    const clones = Array.from({ length: offspringCount }, (_, i) => {
      const drift = rng(i) < 0.15 ? 1 : 0; // occasional copying error
      return { t: [(5 + drift) % 6, 2, 4], id: `c${i}` };
    });
    const sexual = Array.from({ length: offspringCount }, (_, i) => {
      const p1 = Math.floor(rng(i * 3) * 6);
      const p2 = Math.floor(rng(i * 3 + 1) * 6);
      const p3 = Math.floor(rng(i * 3 + 2) * 6);
      return { t: [p1, p2, p3], id: `s${i}` };
    });
    return { clones, sexual };
  }, [offspringCount, reshuffleSeed]);

  // survival under stress: an individual survives if its trait set covers the stress demands
  const survival = useMemo(() => {
    const survive = (t: number[]) => t.every((v) => v !== stress % 6);
    return {
      clones: traits.clones.filter((c) => survive(c.t)).length,
      sexual: traits.sexual.filter((c) => survive(c.t)).length,
    };
  }, [traits, stress]);

  const score = useMemo(() => {
    let right = 0;
    let attempted = 0;
    Object.entries(answers).forEach(([id, choice]) => {
      const ch = CHALLENGES.find((c) => c.id === id);
      if (ch) {
        attempted += 1;
        if (choice === ch.correctIndex) right += 1;
      }
    });
    return { right, attempted };
  }, [answers]);

  const visibleChallenges = CHALLENGES.filter((c) => tierFilter === 'all' || c.tier === tierFilter);

  const pickAnswer = (id: string, idx: number) => {
    if (revealed[id]) return;
    setAnswers((a) => ({ ...a, [id]: idx }));
    setRevealed((r) => ({ ...r, [id]: true }));
  };

  const cellSvg = () => {
    const arr = Array.from({ length: cellsShown });
    return (
      <div className="grid grid-cols-8 gap-1.5">
        {arr.map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-full border-2 flex items-center justify-center transition-all duration-300"
            style={{
              borderColor:
                mode === 'sexual'
                  ? ['#f472b6', '#38bdf8', '#a78bfa', '#34d399', '#fbbf24'][i % 5]
                  : '#4ade80',
              background:
                mode === 'sexual'
                  ? `${['#f472b6', '#38bdf8', '#a78bfa', '#34d399', '#fbbf24'][i % 5]}22`
                  : '#4ade8022',
            }}
          >
            {mode === 'sexual' && <span className="text-[8px]">{'\u273b'}</span>}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* header */}
      <div className="flex flex-wrap items-center gap-3 pb-3 mb-3 border-b border-slate-800">
        <span className="text-3xl p-2 bg-emerald-950/80 rounded-2xl border border-emerald-700">\ud83c\udf31</span>
        <div className="flex-1 min-w-[220px]">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Class 10 -- How do Organisms Reproduce?
          </span>
          <h1 className="text-xl md:text-2xl font-extrabold">Multiplication Speed vs Variation</h1>
        </div>
        <span className="font-mono text-xs text-slate-500">{MODES[mode].label}</span>
      </div>

      {/* tab bar */}
      <nav className="flex flex-wrap gap-1.5 mb-4">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`min-h-9 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              tab === t.id
                ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-900/40'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-600'
            }`}
          >
            <span className="mr-1">{t.emoji}</span>
            {t.label}
          </button>
        ))}
      </nav>

      {/* ============================================================ */}
      {/* TAB 1: DISCOVER                                              */}
      {/* ============================================================ */}
      {tab === 'discover' && (
        <div className="space-y-4">
          <div className="p-5 bg-slate-900/70 rounded-2xl border border-emerald-900/60">
            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-2">Predict before you play</p>
            <p className="text-sm text-slate-200 leading-relaxed">
              A stable pond and a rapidly drying pond each hold one asexual and one sexual species. In
              WHICH pond does the sexual species\u2019 slowness pay off?
            </p>
            <div className="mt-3 space-y-2">
              {[
                'The stable pond -- variety always wins',
                'The changing pond -- pre-existing variation gives some individuals a chance the clones never had',
                'Neither -- sexual species always lose',
                'Both ponds identically',
              ].map((opt, i) => {
                const chosen = predicted === i;
                const isCorrect = i === 1;
                let cls = 'border-slate-700 bg-slate-900 hover:border-emerald-600';
                if (predicted !== null && isCorrect) cls = 'border-emerald-600 bg-emerald-950/40';
                else if (chosen && !isCorrect) cls = 'border-rose-600 bg-rose-950/40';
                return (
                  <button
                    key={i}
                    onClick={() => setPredicted(i)}
                    disabled={predicted !== null}
                    className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm transition-all disabled:cursor-default ${cls}`}
                  >
                    <span className="font-mono text-xs text-slate-500 mr-2">{'ABCD'[i]}</span>
                    {opt}
                    {predicted !== null && isCorrect && <span className="ml-2 text-emerald-400 font-bold text-xs">\u2713</span>}
                  </button>
                );
              })}
            </div>
            {predicted !== null && (
              <div className="mt-3 p-3 rounded-xl bg-amber-950/40 border border-amber-800 text-xs text-amber-200 leading-relaxed">
                Diversity is insurance whose premium is speed. Verify in the Variation tab: raise the
                environmental stress and watch the clone family die together while reshuffled families
                keep survivors.
                <button onClick={() => setTab('variation')} className="ml-2 underline font-bold text-amber-300">
                  Open Variation Engine \u2192
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                t: 'Walk 1: Price the generations',
                d: 'Multiplication Lab: switch modes at fixed generations, then read the hours. Ten spore cycles cost a full day; ten fission cycles cost 3.3 hours.',
              },
              {
                t: 'Walk 2: Rate vs factor',
                d: 'Read the growth-per-hour card: fission\u2019s humble \u00d78/hour beats spore\u2019s flashy \u00d73-per-2-hours. Population maths always prices in time.',
              },
              {
                t: 'Walk 3: Follow the pollen',
                d: 'Variation & Seeds: step through pollination \u2192 tube \u2192 double fertilisation \u2192 seed. Four clicks, one seed.',
              },
            ].map((s, i) => (
              <div key={i} className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
                <p className="text-xs font-bold text-slate-200 mb-1">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-black mr-1.5">{i + 1}</span>
                  {s.t}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: MULTIPLICATION LAB (original sim preserved + ext)     */}
      {/* ============================================================ */}
      {tab === 'multiply' && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-bold text-emerald-300">{info.organism}</p>
                <p className="text-[11px] text-slate-500">{info.blurb}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wider text-slate-500">Population after {generations} cycles</p>
                <p className="font-mono font-black text-2xl text-emerald-300">{population.toExponential(2)}</p>
                <p className="text-[10px] text-slate-500">= {digitCount}-digit number, in {hours} h</p>
              </div>
            </div>

            {/* growth curve (original, preserved) */}
            <svg viewBox="0 0 440 180" className="w-full" role="img" aria-label="growth curve">
              <line x1={30} y1={150} x2={430} y2={150} stroke="#475569" strokeWidth={2} />
              <line x1={30} y1={20} x2={30} y2={150} stroke="#475569" strokeWidth={2} />
              {(() => {
                const pts: string[] = [];
                for (let g = 0; g <= generations; g++) {
                  const p = startCount * Math.pow(info.factor, g);
                  const logP = Math.log10(Math.max(p, 1));
                  const maxLog = Math.log10(Math.max(startCount * Math.pow(info.factor, generations), 1));
                  const x = 30 + (g / Math.max(generations, 1)) * 400;
                  const y = 150 - (logP / Math.max(maxLog, 1)) * 120;
                  pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
                }
                return (
                  <g>
                    <polyline points={pts.join(' ')} fill="none" stroke="#4ade80" strokeWidth={3}
                      strokeLinejoin="round" className="transition-all duration-300" />
                    {pts.map((pt, i) => {
                      const [x, y] = pt.split(',');
                      if (generations <= 12 || i % 2 === 0)
                        return <circle key={i} cx={x} cy={y} r={3} fill="#bbf7d0" />;
                      return null;
                    })}
                  </g>
                );
              })()}
              <text x={230} y={168} textAnchor="middle" fontSize={10} fill="#64748b">generations</text>
              <text x={12} y={90} fontSize={10} fill="#64748b" transform="rotate(-90 12 90)">log(population)</text>
            </svg>

            <div className="mt-3">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">
                {mode === 'sexual' ? 'Every offspring is genetically unique (shown by colour)' : 'Clones: identical DNA down the line'}
              </p>
              {cellSvg()}
              {population > 64 && (
                <p className="text-[10px] text-slate-600 mt-1">...showing 64 of a very large number</p>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
              <div className="grid grid-cols-2 gap-1.5">
                {(Object.keys(MODES) as Mode[]).map((mm) => (
                  <button
                    key={mm}
                    onClick={() => setMode(mm)}
                    className={`py-1.5 rounded-lg text-[10px] font-bold ${mode === mm ? 'bg-emerald-600' : 'bg-slate-800 hover:bg-slate-700'} ${mm === 'sexual' ? 'col-span-2' : ''}`}
                  >
                    {MODES[mm].label}
                  </button>
                ))}
              </div>
              <div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Reproductive cycles</span>
                  <span className="font-mono font-bold text-emerald-400">{generations}</span>
                </div>
                <input type="range" min={1} max={25} value={generations} aria-label="generations"
                  onChange={(e) => setGenerations(Number(e.target.value))} className="w-full accent-emerald-500" />
              </div>
              <div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Starting individuals</span>
                  <span className="font-mono font-bold text-gold-400">{startCount}</span>
                </div>
                <input type="range" min={1} max={10} value={startCount} aria-label="start count"
                  onChange={(e) => setStartCount(Number(e.target.value))} className="w-full accent-gold-500" />
              </div>
              <div className="bg-slate-950 rounded-xl px-3 py-2 border border-slate-800 flex justify-between text-xs">
                <span className="text-slate-400">Variation per offspring</span>
                <span className={`font-bold ${mode === 'sexual' ? 'text-fuchsia-300' : 'text-slate-400'}`}>{info.variation}%</span>
              </div>
            </div>

            {/* new readouts: rate & doubling */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-950 rounded-xl px-3 py-2 border border-slate-800">
                <p className="text-[10px] uppercase tracking-wider text-slate-500">Growth per hour</p>
                <p className="font-mono font-bold text-lg text-gold-300">
                  {info.intervalMin > 0 ? `\u00d7${perHour.toFixed(1)}` : '--'}
                </p>
              </div>
              <div className="bg-slate-950 rounded-xl px-3 py-2 border border-slate-800">
                <p className="text-[10px] uppercase tracking-wider text-slate-500">Doubling time</p>
                <p className="font-mono font-bold text-lg text-amber-300">
                  {info.intervalMin > 0 ? `${doublingHours.toFixed(1)} h` : 'n/a'}
                </p>
              </div>
            </div>

            {/* same-clock comparison table */}
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden">
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="bg-slate-950 text-slate-500">
                    <th className="text-left px-3 py-1.5 font-semibold">mode</th>
                    <th className="text-right px-3 py-1.5 font-semibold">population after {comparison[0].hours.toFixed(1)} h</th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  {comparison.map((row) => (
                    <tr key={row.mode} className={`border-t border-slate-800 ${row.mode === mode ? 'bg-emerald-950/40' : ''}`}>
                      <td className="px-3 py-1.5 text-slate-300">{MODES[row.mode].label}</td>
                      <td className="px-3 py-1.5 text-right text-emerald-300">{row.pop.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-[10px] text-slate-600 px-3 py-1.5">
                All modes given the SAME wall-clock time -- per-cycle size is nothing without cycle speed.
              </p>
            </div>

            <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
              <p className="font-bold text-slate-300 mb-1">Teaching note</p>
              <p>
                DNA copying is the heart of reproduction. Asexual copying is fast and near-perfect, so
                populations explode but stay clones -- one disease can wipe them all. Sexual
                reproduction halves the speed but reshuffles genes every time, giving variation for
                natural selection to act on. That trade-off is why complex life pays the price of two
                parents.
              </p>
            </div>

            <div className="bg-emerald-950/40 rounded-2xl border border-emerald-800/50 p-4 text-xs">
              <p className="font-bold text-emerald-300 mb-1">What to try</p>
              <p>1. Bacteria (20 min cycle) from 1 cell: how many after 10 hours? Slide to find 2\u00b3\u2070 \u2248 10\u2079.</p>
              <p className="mt-1">2. Compare fission and spore mode at 20 cycles -- how many times faster does Rhizopus multiply?</p>
              <p className="mt-1">3. Which mode gives the largest population in EXACTLY 6 hours? Does the winner match your intuition before reading the table?</p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: VARIATION & SEEDS                                     */}
      {/* ============================================================ */}
      {tab === 'variation' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                The variation engine: same parents, two strategies
              </p>
              <div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Environmental stress (which trait kills)</span>
                  <span className="font-mono font-bold text-rose-400">level {stress}</span>
                </div>
                <input type="range" min={0} max={5} value={stress} aria-label="stress level"
                  onChange={(e) => setStress(Number(e.target.value))} className="w-full accent-rose-500" />
              </div>
              <div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Offspring per family</span>
                  <span className="font-mono font-bold text-gold-400">{offspringCount}</span>
                </div>
                <input type="range" min={4} max={24} value={offspringCount} aria-label="offspring count"
                  onChange={(e) => setOffspringCount(Number(e.target.value))} className="w-full accent-gold-500" />
              </div>
              <button
                onClick={() => setReshuffleSeed((s) => s + 1)}
                className="w-full min-h-9 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold"
              >
                Reshuffle (new generation)
              </button>
            </div>

            {/* family display */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900/70 rounded-2xl border border-slate-800 p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-green-400 mb-2">
                  clones (asexual)
                </p>
                <div className="grid grid-cols-6 gap-1">
                  {traits.clones.map((c) => {
                    const dead = c.t.every((v) => v !== stress % 6);
                    return (
                      <div
                        key={c.id}
                        className={`aspect-square rounded-full border-2 transition-all duration-300 ${dead ? 'bg-emerald-700/40 border-emerald-500' : 'bg-slate-950 border-slate-700 opacity-25'}`}
                        title={`traits ${c.t.join(', ')}`}
                      />
                    );
                  })}
                </div>
                <p className="mt-2 font-mono text-xs">
                  <span className={survival.clones > 0 ? 'text-emerald-300 font-bold' : 'text-rose-400 font-bold'}>
                    {survival.clones}/{offspringCount} survive
                  </span>
                  <span className="text-slate-600 text-[10px] ml-1">all share one genome</span>
                </p>
              </div>
              <div className="bg-slate-900/70 rounded-2xl border border-slate-800 p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-fuchsia-400 mb-2">
                  reshuffled (sexual)
                </p>
                <div className="grid grid-cols-6 gap-1">
                  {traits.sexual.map((c) => {
                    const dead = c.t.every((v) => v !== stress % 6);
                    const hue = (c.t[0] * 60 + c.t[1] * 30 + c.t[2] * 12) % 360;
                    return (
                      <div
                        key={c.id}
                        className={`aspect-square rounded-full border-2 transition-all duration-300 ${dead ? '' : 'opacity-25 border-slate-700 bg-slate-950'}`}
                        style={dead ? { background: `hsl(${hue} 70% 45%)`, borderColor: `hsl(${hue} 80% 60%)` } : {}}
                        title={`traits ${c.t.join(', ')}`}
                      />
                    );
                  })}
                </div>
                <p className="mt-2 font-mono text-xs">
                  <span className={survival.sexual > 0 ? 'text-emerald-300 font-bold' : 'text-rose-400 font-bold'}>
                    {survival.sexual}/{offspringCount} survive
                  </span>
                  <span className="text-slate-600 text-[10px] ml-1">every genome unique</span>
                </p>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed px-1">
              Raise the stress: the clone family stands or falls TOGETHER. The reshuffled family loses
              some but keeps survivors -- the whole point of sex, in one grid.
            </p>
          </div>

          <div className="space-y-4">
            {/* flower walk-through */}
            <div className="bg-slate-900/80 rounded-2xl border border-pink-900/50 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-pink-400 mb-3">
                From pollen to seed (click through)
              </p>
              <div className="flex gap-1.5 mb-3">
                {FLOWER_STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setFlowerStep(i)}
                    className={`flex-1 h-2 rounded-full transition-all ${i <= flowerStep ? 'bg-pink-500' : 'bg-slate-800'}`}
                    aria-label={`step ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex items-start gap-3">
                <span className="text-4xl">{FLOWER_STEPS[flowerStep].emoji}</span>
                <div>
                  <p className="text-sm font-bold text-slate-100">{FLOWER_STEPS[flowerStep].title}</p>
                  <p className="text-xs text-slate-400 leading-relaxed mt-1">{FLOWER_STEPS[flowerStep].body}</p>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => setFlowerStep((s) => Math.max(0, s - 1))}
                  disabled={flowerStep === 0}
                  className="min-h-9 px-3 rounded-lg bg-slate-800 text-xs font-bold disabled:opacity-40"
                >
                  back
                </button>
                <button
                  onClick={() => setFlowerStep((s) => Math.min(FLOWER_STEPS.length - 1, s + 1))}
                  disabled={flowerStep === FLOWER_STEPS.length - 1}
                  className="min-h-9 px-3 rounded-lg bg-pink-600 hover:bg-pink-500 text-xs font-bold disabled:opacity-40"
                >
                  next step
                </button>
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
              <p className="font-bold text-slate-300 mb-1">The arithmetic of two parents</p>
              <p>
                Humans: 46 chromosomes \u2192 gametes 23 (meiosis halves) \u2192 child 46 (fertilisation
                adds). With 23 independent chromosome pairs, ONE couple can theoretically make 2\u00b2\u00b3
                \u2248 8 million chromosomally distinct children -- before counting crossing-over. Variation
                is not a side effect; it is the product.
              </p>
            </div>

            <div className="bg-emerald-950/40 rounded-2xl border border-emerald-800/50 p-4 text-xs">
              <p className="font-bold text-emerald-300 mb-1">What to try</p>
              <p>1. Find a stress level where BOTH families lose everyone. What does that honestly teach about the limits of variation?</p>
              <p className="mt-1">2. Set offspring to 4 and stress high. Whose survival odds collapse faster -- and what real-world strategy fixes it (hint: why do salmon lay thousands of eggs)?</p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 4: CHALLENGE                                             */}
      {/* ============================================================ */}
      {tab === 'challenge' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs text-slate-400 mr-1">
              Score: <span className="font-mono font-bold text-emerald-300">{score.right}</span>/{score.attempted || 0}
            </p>
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold border bg-emerald-950 text-emerald-300 border-emerald-800">
              {score.right} correct
            </span>
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold border bg-slate-800 text-slate-300 border-slate-700">
              {CHALLENGES.length} questions
            </span>
            <div className="ml-auto flex gap-1.5">
              {(['all', 'foundation', 'standard', 'advanced'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTierFilter(t)}
                  className={`min-h-9 px-3 rounded-lg text-[11px] font-bold capitalize transition-all ${
                    tierFilter === t ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {visibleChallenges.map((ch, qi) => {
            const chosen = answers[ch.id];
            const isRevealed = revealed[ch.id];
            const hints = hintLevel[ch.id] ?? 0;
            return (
              <div
                key={ch.id}
                className={`p-4 rounded-2xl border ${
                  isRevealed
                    ? chosen === ch.correctIndex
                      ? 'bg-emerald-950/30 border-emerald-800'
                      : 'bg-rose-950/30 border-rose-800'
                    : 'bg-slate-900/70 border-slate-800'
                }`}
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border ${
                      ch.tier === 'foundation'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : ch.tier === 'standard'
                        ? 'bg-amber-950 text-amber-300 border-amber-800'
                        : 'bg-rose-950 text-rose-300 border-rose-800'
                    }`}
                  >
                    {ch.tier}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500">{ch.skill}</span>
                  <span className="text-[10px] text-slate-600 ml-auto">Q{qi + 1}</span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed mb-2.5">{ch.question}</p>
                <div className="space-y-1.5">
                  {ch.options.map((opt, i) => {
                    let cls = 'border-slate-700 bg-slate-950 hover:border-emerald-600';
                    if (isRevealed && i === ch.correctIndex) cls = 'border-emerald-600 bg-emerald-950/60';
                    else if (isRevealed && i === chosen) cls = 'border-rose-600 bg-rose-950/60';
                    return (
                      <button
                        key={i}
                        onClick={() => pickAnswer(ch.id, i)}
                        disabled={isRevealed}
                        className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm transition-all disabled:cursor-default ${cls}`}
                      >
                        <span className="font-mono text-xs text-slate-500 mr-2">{'ABCD'[i]}</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {!isRevealed && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    <button
                      onClick={() => setHintLevel((h) => ({ ...h, [ch.id]: Math.min(3, hints + 1) }))}
                      disabled={hints >= 3}
                      className="min-h-9 px-3 rounded-lg bg-amber-950/60 border border-amber-800 text-[11px] font-bold text-amber-300 disabled:opacity-40"
                    >
                      {hints === 0 ? 'I need a hint' : `more (${hints}/3)`}
                    </button>
                    {hints > 0 && (
                      <p className="text-[11px] text-amber-200/90 leading-relaxed w-full px-1">{ch.hints[hints - 1]}</p>
                    )}
                  </div>
                )}
                {isRevealed && (
                  <div className="mt-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <span className={chosen === ch.correctIndex ? 'font-bold text-emerald-400' : 'font-bold text-rose-400'}>
                      {chosen === ch.correctIndex ? 'Correct. ' : 'Not yet. '}
                    </span>
                    {ch.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 5: TRUTHS                                                */}
      {/* ============================================================ */}
      {tab === 'truths' && (
        <div className="space-y-4">
          <div className="space-y-3">
            {MISCONCEPTIONS.map((mm, i) => (
              <div key={i} className="rounded-2xl border border-rose-900/60 bg-rose-950/20 overflow-hidden">
                <button
                  onClick={() => setOpenMisc((cur) => (cur === i ? null : i))}
                  className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-rose-950/40 transition-colors"
                >
                  <span className="text-rose-400 font-black text-lg leading-none">\u2717</span>
                  <span className="text-sm font-bold text-rose-200 flex-1">{mm.misconception}</span>
                  <span className="text-slate-500 text-xs">{openMisc === i ? '\u25b2' : '\u25bc'}</span>
                </button>
                {openMisc === i && (
                  <div className="px-4 pb-4">
                    <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800 text-xs text-emerald-200 leading-relaxed">
                      <span className="font-bold text-emerald-300">The truth: </span>
                      {mm.correction}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-5 bg-slate-900/70 rounded-2xl border border-slate-800">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">If you remember three lines</p>
            <ol className="space-y-2 text-sm text-slate-300 leading-relaxed list-decimal ml-5">
              <li>Reproduction = faithful-but-not-perfect DNA copying + cellular machinery.</li>
              <li>Asexual buys speed with uniformity; sexual buys diversity at the price of speed.</li>
              <li>Variation protects the SPECIES, not the individual -- insurance, not superpower.</li>
            </ol>
            <div className="mt-3 flex gap-2">
              <button onClick={() => setTab('multiply')} className="min-h-11 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-sm font-bold">
                Back to the Multiplication Lab
              </button>
              <button onClick={() => { setMode('fission'); setGenerations(10); setStartCount(1); }} className="min-h-11 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-bold">
                Reset the colony
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default C10_ScienceHowDoOrganismsReproduceSim;
