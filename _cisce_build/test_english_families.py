# -*- coding: utf-8 -*-
"""test_english_families.py -- hand-verified grammar cases for
model_english.  Every expected output below is hand-computed from the
corpus rules (enhanced_nodes_md/c*_gram_*, c*_engl_*, c6_english_* and
cisce_nodes_v2/c*_eng_icse_*).  Key hand checks:

  TENSE: "has been waiting" -> present perfect continuous (since-marker)
         "had finished"     -> past perfect (by-the-time ordering)
  TENSE CONVERT: writes -> wrote ; are playing -> were playing ;
         has finished -> will have finished
  VOICE (c8 corpus examples): The gardener planted the roses ->
         The roses were planted by the gardener.  Reverse likewise.
         is writing -> is being written ; have built -> has been built
  NARRATION (c8/c10 corpus): 'I am tired.' -> he was tired ;
         'Do you like tea?' -> asked if I liked tea ;
         'Where do you live?' -> asked where I lived ;
         'Do not touch the knife.' -> told ... not to touch the knife
  ERRORS: bunch of keys ARE -> IS ; am waiting since -> have been
         waiting ; didn't went -> didn't go ; Everyone have -> has ;
         There is three -> There are three ; neither of the boys were
         -> was ; Ten kilometres are -> is ; an useful -> a useful
  DEGREE (c10 frames): 'No other girl is as tall as Asha.' == 'Asha is
         taller than any other girl.'
  TOO...TO (c11): 'He was too tired to work.' == 'He was so tired that
         he could not work.'
  NON-FINITE (c8): 'To err is human.' -> infinitive (subject)
  FIGURES (corpus): 'like a coin' -> simile ; 'Life is a rollercoaster'
         -> metaphor ; 'The golden sun kissed...' -> personification ;
         'Bright blossoms bend beside the bubbling brook' ->
         alliteration

STEP CONTRACT (standard bar, enforced below on every matched case):
  len(steps) >= 3 AND sum(len(step)) >= 150 chars, shaped as
  method/rule line -> given restatement -> rule applied -> verification
  re-check -> interpretation.  Thin steps are a permanent test failure.
  NEGATIVE requirement: maths/science/accountancy probes and Devanagari
  input must NOT match, and taught-but-unimplemented topics (question
  tags, rhyme scheme) must be declined honestly.
"""
import sys
try:
    sys.path.insert(0, 'D:/platform')
    from backend.its.solver.english_families import model_english
except SyntaxError:
    # a sibling subject's solver file is mid-edit in the root tree;
    # fall back to the deploy tree copy (kept identical for english).
    for mod in [m for m in list(sys.modules)
                if m == 'backend' or m.startswith('backend.')]:
        del sys.modules[mod]
    sys.path = [p for p in sys.path if p != 'D:/platform']
    sys.path.insert(0, 'D:/platform/deploy')
    from backend.its.solver.english_families import model_english

APOS = chr(39)

# (question, expected_structure, expected_answer_substring)
CASES = [
    # ---- tense identification (12-cell grid) ----
    ("Identify the tense: 'She has been waiting for two hours.'",
     "TENSE_IDENTIFY", "present perfect continuous"),
    ("Name the tense: 'By the time the guests arrived, we had finished cooking.'",
     "TENSE_IDENTIFY", "past perfect"),
    ("Identify the tense: 'The sun rises in the east.'",
     "TENSE_IDENTIFY", "simple present"),
    ("Identify the tense: 'They went to the market yesterday.'",
     "TENSE_IDENTIFY", "simple past"),
    ("Identify the tense: 'She will be travelling to Delhi tomorrow.'",
     "TENSE_IDENTIFY", "future continuous"),
    ("Identify the tense: 'I will have finished my homework by evening.'",
     "TENSE_IDENTIFY", "future perfect"),
    # ---- tense conversion ----
    ("Change into simple past tense: 'She writes a letter.'",
     "TENSE_CONVERT", "She wrote a letter."),
    ("Change into past continuous tense: 'They are playing cricket.'",
     "TENSE_CONVERT", "They were playing cricket."),
    ("Change into future perfect tense: 'He has finished his work.'",
     "TENSE_CONVERT", "He will have finished his work."),
    ("Change into simple future tense: 'The farmers harvest the crop.'",
     "TENSE_CONVERT", "The farmers will harvest the crop."),
    # ---- voice (all taught frames) ----
    ("Change the voice: 'The gardener planted the roses.'",
     "VOICE_CHANGE", "The roses were planted by the gardener."),
    ("Change into passive voice: 'She is writing a letter.'",
     "VOICE_CHANGE", "A letter is being written by her."),
    ("Change into passive voice: 'They have built a bridge.'",
     "VOICE_CHANGE", "A bridge has been built by them."),
    ("Change into passive voice: 'You must finish the work.'",
     "VOICE_CHANGE", "The work must be finished by you."),
    ("Change the voice: 'The roses were planted by the gardener.'",
     "VOICE_CHANGE", "The gardener planted the roses."),
    ("Change the voice: 'A letter is being written by her.'",
     "VOICE_CHANGE", "She is writing a letter."),
    # ---- narration (statements / questions / commands) ----
    ('Change into indirect speech: He said, "I am tired."',
     "NARRATION_CHANGE", "He said that he was tired."),
    ('Change into indirect speech: She said to me, "Do you like tea?"',
     "NARRATION_CHANGE", "asked me if I liked tea"),
    ('Change into indirect speech: He said to me, "Where do you live?"',
     "NARRATION_CHANGE", "asked me where I lived"),
    ("Change into indirect speech: The mother said to the child, 'Do not touch the knife.'",
     "NARRATION_CHANGE", "not to touch the knife"),
    ('Change into indirect speech: He said, "I will come tomorrow."',
     "NARRATION_CHANGE", "he would come the next day"),
    ('Change into indirect speech: Mohan says, "I am busy."',
     "NARRATION_CHANGE", "Mohan says that he is busy."),
    ('Change into indirect speech: He said to me, "Did you finish your homework?"',
     "NARRATION_CHANGE", "if I had finished my homework"),
    # ---- error spotting (corpus trap catalog) ----
    ("Spot the error and correct the sentence: 'The bunch of keys are on the table.'",
     "ERROR_SPOTTING", "bunch of keys is"),
    ("Find the error: 'I am waiting since morning.'",
     "ERROR_SPOTTING", "I have been waiting"),
    ("Correct the sentence: 'He didn't went to school yesterday.'",
     "ERROR_SPOTTING", "didn't go"),
    ("Spot the error: 'Everyone have finished their homework.'",
     "ERROR_SPOTTING", "Everyone has finished"),
    ("Correct the following sentence: 'She was cooking and eats dinner.'",
     "ERROR_SPOTTING", "was cooking and ate dinner"),
    ("Spot the error: 'There is three books on the table.'",
     "ERROR_SPOTTING", "There are three books"),
    ("Spot the error: 'Neither of the boys were present.'",
     "ERROR_SPOTTING", "Neither of the boys was"),
    ("Spot the error: 'Ten kilometres are a long walk.'",
     "ERROR_SPOTTING", "Ten kilometres is"),
    ("Spot the error: 'She gave me an useful book.'",
     "ERROR_SPOTTING", "a useful book"),
    ("Spot the error: 'He is knowing the answer.'",
     "ERROR_SPOTTING", "He knows the answer"),
    # ---- degrees of comparison (c10 fixed frames) ----
    ("Change into comparative degree: 'No other girl is as tall as Asha.'",
     "DEGREE_TRANSFORM", "Asha is taller than any other girl."),
    ("Change into positive degree: 'Asha is taller than any other girl.'",
     "DEGREE_TRANSFORM", "No other girl is as tall as Asha."),
    ("Change into superlative degree: 'Asha is taller than any other girl in the class.'",
     "DEGREE_TRANSFORM", "the tallest girl in the class"),
    ("Change into comparative degree: 'Very few boys are as brave as Sam.'",
     "DEGREE_TRANSFORM", "braver than most other boys"),
    # ---- too...to <-> so...that (c11 frames) ----
    ("Rewrite using so...that: 'He was too tired to work.'",
     "TOO_TO_SO_THAT", "He was so tired that he could not work."),
    ("Rewrite using too...to: 'He was so tired that he could not work.'",
     "TOO_TO_SO_THAT", "He was too tired to work."),
    ("Rewrite using so...that: 'She is too young to drive.'",
     "TOO_TO_SO_THAT", "so young that she cannot drive"),
    # ---- affirmative <-> negative / exclamatory <-> assertive ----
    ("Change into negative: 'He is always honest.'",
     "AFFIRM_NEG", "never dishonest"),
    ("Change into affirmative: 'He is never punctual.'",
     "AFFIRM_NEG", "always late"),
    ("Change into assertive: 'What a beautiful view!'",
     "EXCLAMATORY_ASSERTIVE", "It is a very beautiful view."),
    ("Change into exclamatory: 'It is a very beautiful view.'",
     "EXCLAMATORY_ASSERTIVE", "What a beautiful view!"),
    ("Change into assertive: 'How beautiful the scene is!'",
     "EXCLAMATORY_ASSERTIVE", "The scene is very beautiful."),
    # ---- clause type (simple/compound/complex) ----
    ("Identify the sentence type: 'Because it rained heavily, the match was cancelled.'",
     "CLAUSE_TYPE", "complex"),
    ("Identify the sentence type: 'He was poor but he was honest.'",
     "CLAUSE_TYPE", "compound"),
    ("Identify the sentence type: 'The little girl sings sweetly.'",
     "CLAUSE_TYPE", "simple"),
    # ---- non-finites (c8 corpus: to err is human) ----
    ("Identify the non-finite verb: 'To err is human.'",
     "NONFINITE_IDENTIFY", "to err -- infinitive"),
    ("Identify the gerund: 'He is fond of swimming.'",
     "NONFINITE_IDENTIFY", "swimming -- gerund"),
    ("Identify the participle: 'The broken chair was repaired.'",
     "NONFINITE_IDENTIFY", "broken -- participle"),
    ("Identify the non-finite: 'He enjoys reading books.'",
     "NONFINITE_IDENTIFY", "reading -- gerund"),
    # ---- conditionals (c11 types) ----
    ("Identify the conditional: 'If it rains, we will stay at home.'",
     "CONDITIONAL_TYPE", "Type 1"),
    ("Identify the conditional type: 'If he had studied, he would have passed.'",
     "CONDITIONAL_TYPE", "Type 3"),
    ("Identify the conditional: 'If I were a bird, I would fly.'",
     "CONDITIONAL_TYPE", "Type 2"),
    ("Fill in the blank: 'If it ___ (rain), we will stay at home.'",
     "CONDITIONAL_TYPE", "If it rains, we will stay at home."),
    ("Fill in the blank: 'If I ___ (be) a bird, I would fly.'",
     "CONDITIONAL_TYPE", "If I were a bird"),
    # ---- determiners (a/an sound, countability, distance) ----
    ("Fill in the blank with a suitable article: 'He gave me ___ useful book (a/an).'",
     "DETERMINER_CHOICE", "He gave me a useful book."),
    ("Fill in the blank: 'He returned after ___ hour (a/an).'",
     "DETERMINER_CHOICE", "after an hour."),
    ("Fill in the blank with the correct determiner: 'There is ___ milk in the jug (few/a little).'",
     "DETERMINER_CHOICE", "a little milk"),
    ("Fill in the blank: '___ books here are mine (This/These).'",
     "DETERMINER_CHOICE", "These books here are mine."),
    ("Fill in the blank with the correct determiner: '___ house over there is ours (This/That).'",
     "DETERMINER_CHOICE", "That house over there is ours."),
    # ---- preposition collocations (c12 corpus list) ----
    ("Fill in the blank with the correct preposition: 'It depends ___ the weather (on/in/at).'",
     "PREPOSITION_COLLOCATION", "depends on the weather"),
    ("Fill in the blank with the correct preposition: 'She is good ___ mathematics (at/in/to).'",
     "PREPOSITION_COLLOCATION", "good at mathematics"),
    ("Fill in the blank with the correct preposition: 'He insists ___ paying the bill (on/in/at).'",
     "PREPOSITION_COLLOCATION", "insists on paying"),
    # ---- conjunction logic (c6: wrong joiner = wrong logic) ----
    ("Fill in the blank with the correct conjunction: 'I was tired, ___ I slept at once (but/so).'",
     "CONJUNCTION_CHOICE", "I was tired, so I slept"),
    ("Fill in the blank with the correct conjunction: 'She stayed at home ___ it was raining heavily (because/so).'",
     "CONJUNCTION_CHOICE", "because it was raining"),
    ("Fill in the blank with the correct conjunction: 'He is poor ___ honest (but/and).'",
     "CONJUNCTION_CHOICE", "poor but honest"),
    # ---- figures of speech (corpus examples) ----
    ("Identify the figure of speech: 'The moon is like a coin.'",
     "FIGURE_OF_SPEECH", "simile"),
    ("Identify the literary device: 'Life is a rollercoaster.'",
     "FIGURE_OF_SPEECH", "metaphor"),
    ("Identify the figure of speech: 'The golden sun kissed the cold morning dew on the banana leaves.'",
     "FIGURE_OF_SPEECH", "personification"),
    ("Identify the literary device: 'Bright blossoms bend beside the bubbling brook.'",
     "FIGURE_OF_SPEECH", "alliteration"),
    ("Identify the figure of speech: 'I have told you a million times to clean your room.'",
     "FIGURE_OF_SPEECH", "hyperbole"),
    # ---- honesty: in-domain asks that must DECLINE ----
    ("Correct the sentence: 'The bunch of keys is on the table.'",
     None, None),                      # no error present
    ("Correct the sentence: 'She has been working since morning.'",
     None, None),                      # already correct
    ("Identify the figure of speech: 'The field was green.'",
     None, None),                      # literal sentence, no device
    ("Add a question tag: 'She is coming to the party.'",
     None, None),                      # taught nowhere in the corpus
    ("What is the rhyme scheme of the poem?",
     None, None),                      # needs pronunciation knowledge
    ("Who wrote the play Julius Caesar?",
     None, None),                      # literature comparator
    ("Explain the theme of friendship in this chapter.",
     None, None),                      # text-grounded analysis
    # ---- honesty: other-subject probes must NOT match ----
    ("Solve the quadratic equation x^2 - 5x + 6 = 0.",
     None, None),
    ("Calculate the pH of a 0.01 M HCl solution.",
     None, None),
    ("A car accelerates uniformly at 2 m/s2 from rest. Find its velocity after 5 seconds.",
     None, None),
    ("Two dice are thrown. Find the probability of getting a sum of 8.",
     None, None),
    ("Find the compound interest on 10000 rupees at 10 percent per annum for 2 years.",
     None, None),
    ("A firm's fixed cost is 5000 rupees and variable cost per unit is 20 rupees. Find the break-even quantity.",
     None, None),
    ("Name the gas released during photosynthesis.",
     None, None),
    ("If 10000 J of energy is available to producers, how much reaches the tertiary consumers?",
     None, None),
    ("In a cross Tt x Tt, what is the probability of a recessive offspring?",
     None, None),
    ("The area of a circle is 154 cm2. Find its radius.",
     None, None),
]

# BRANCH_CASES: second battery exercising the remaining routing branches
# (reverse solves, other cells, other traps).  The STEP CONTRACT applies
# here too -- no family may be thin on any branch.
BRANCH_CASES = [
    ("Identify the tense: 'I am going to visit Goa next week.'",
     "TENSE_IDENTIFY"),
    ("Identify the tense: 'He had been living in Mumbai since 2010.'",
     "TENSE_IDENTIFY"),
    ("Change into present perfect tense: 'She wrote three letters.'",
     "TENSE_CONVERT"),
    ("Change into past perfect tense: 'The train left before I reached.'",
     "TENSE_CONVERT"),
    ("Change into passive voice: 'The chef had cooked the meal.'",
     "VOICE_CHANGE"),
    ("Change into passive voice: 'He will write a letter.'",
     "VOICE_CHANGE"),
    ("Change the voice: 'The meal has been cooked by the chef.'",
     "VOICE_CHANGE"),
    ("Change into indirect speech: She said, 'I am writing a poem.'",
     "NARRATION_CHANGE"),
    ("Change into indirect speech: They said, 'We have finished our work.'",
     "NARRATION_CHANGE"),
    ("Change into indirect speech: He said, 'I saw a snake yesterday.'",
     "NARRATION_CHANGE"),
    ("Spot the error: 'The quality of the mangoes were poor.'",
     "ERROR_SPOTTING"),
    ("Spot the error: 'He didn't came home last night.'",
     "ERROR_SPOTTING"),
    ("Spot the error: 'The dog wagged it's tail happily.'",
     "ERROR_SPOTTING"),
    ("Spot the error: 'Ram is married with Sita.'",
     "ERROR_SPOTTING"),
    ("Change into positive degree: 'Mumbai is the richest city in India.'",
     "DEGREE_TRANSFORM"),
    ("Change into superlative degree: 'No other boy in the class is as clever as Ravi.'",
     "DEGREE_TRANSFORM"),
    ("Rewrite using so...that: 'The boy is too short to reach the shelf.'",
     "TOO_TO_SO_THAT"),
    ("Change into negative: 'She is always kind.'",
     "AFFIRM_NEG"),
    ("Rewrite as assertive: 'It is a very lovely evening.'",
     "EXCLAMATORY_ASSERTIVE"),
    ("Identify the sentence type: 'I know that he is honest.'",
     "CLAUSE_TYPE"),
    ("Identify the sentence type: 'I was tired, so I slept at once.'",
     "CLAUSE_TYPE"),
    ("Identify the non-finite: 'Swimming is a good exercise.'",
     "NONFINITE_IDENTIFY"),
    ("Identify the non-finite: 'He wants to play cricket.'",
     "NONFINITE_IDENTIFY"),
    ("Identify the figure of speech: 'The waves danced on the shore.'",
     "FIGURE_OF_SPEECH"),
    ("Identify the figure of speech: 'The wind whispered through the trees.'",
     "FIGURE_OF_SPEECH"),
    ("Fill in the blank with the correct preposition: 'I agree ___ your proposal (with/to/on).'",
     "PREPOSITION_COLLOCATION"),
    ("Fill in the blank with the correct preposition: 'He is afraid ___ dogs (of/from/with).'",
     "PREPOSITION_COLLOCATION"),
    ("Fill in the blank with the correct conjunction: 'He worked hard ___ he failed (but/and).'",
     "CONJUNCTION_CHOICE"),
    ("Fill in the blank with the correct conjunction: 'Make a decision ___ go home (or/and).'",
     "CONJUNCTION_CHOICE"),
    ("Fill in the blank with the correct determiner: 'There is ___ water in the glass (much/many).'",
     "DETERMINER_CHOICE"),
]

# STEP CONTRACT (standard bar): >= 3 steps, >= 150 total chars, with a
# method beat in step 1 and a verification beat somewhere.
MIN_STEPS = 3
MIN_STEP_CHARS = 150

import re as _re
_METHOD_RE = _re.compile(r"\b(law|formula|rule|method|identity|relation|"
                         r"principle|theorem|golden|equation|using|ratio|"
                         r"frame|grid|mechanics|algorithm)\b", _re.I)
_VERIFY_RE = _re.compile(r"\b(substitut\w*|check\w*|verif\w*|sanity|"
                         r"recomput\w*|tally\w*|cross-?check|balance[sd]?|"
                         r"re-?test\w*|re-?scan\w*|re-?count\w*|re-?read\w*|"
                         r"re-?check\w*|re-?built|back\b)\b", _re.I)

passed = failed = contract_fail = 0
details = []
families_seen = {}
ALL_CASES = CASES + [c + (None,) for c in BRANCH_CASES]
for text, exp_struct, exp_sub in ALL_CASES:
    r = model_english(text)
    ok = True
    why = []
    if exp_struct is None:
        if r.matched:
            ok = False
            why.append(f"expected no match, got {r.structure} "
                       f"({r.final_answer})")
    else:
        if not r.matched:
            ok = False
            why.append("UNMATCHED")
        else:
            families_seen[r.structure] = families_seen.get(
                r.structure, 0) + 1
            if r.structure != exp_struct:
                ok = False
                why.append(f"structure {r.structure} != {exp_struct}")
            if exp_sub is not None and \
                    exp_sub not in (r.final_answer or ""):
                ok = False
                why.append(f"answer {r.final_answer!r} missing "
                           f"{exp_sub!r}")
            # --- STEP CONTRACT assertions (every matched probe) ---
            steps = r.steps or []
            n_steps = len(steps)
            n_chars = sum(len(s) for s in steps)
            if n_steps < MIN_STEPS:
                ok = False
                why.append(f"CONTRACT: {r.structure} only {n_steps} "
                           f"steps (< {MIN_STEPS})")
            if n_chars < MIN_STEP_CHARS:
                ok = False
                why.append(f"CONTRACT: {r.structure} steps total "
                           f"{n_chars} chars (< {MIN_STEP_CHARS})")
            if steps and not _METHOD_RE.search(steps[0]):
                ok = False
                why.append(f"CONTRACT: {r.structure} no method beat in "
                           "step 1")
            if steps and not _VERIFY_RE.search(" ".join(steps)):
                ok = False
                why.append(f"CONTRACT: {r.structure} no verification "
                           "beat")
            if n_steps < MIN_STEPS or n_chars < MIN_STEP_CHARS:
                contract_fail += 1
    if ok:
        passed += 1
    else:
        failed += 1
        details.append((text[:70], "; ".join(why)))

# --- Devanagari guard: Hindi input must never fire an english family ---
hindi_probes = [
    "इस वाक्य का काल बताइए: 'वह स्कूल जाता है।'",
    "राम ने कहा कि वह थका हुआ था। इसे अप्रत्यक्ष कथन में बदलें।",
    "वाच्य बदलिए: 'पत्र लिखा जाता है।'",
]
hindi_ok = True
for hp in hindi_probes:
    r = model_english(hp)
    if r.matched:
        hindi_ok = False
        details.append((hp[:50], f"Devanagari matched {r.structure}"))
        failed += 1
    else:
        passed += 1

print(f"PASS {passed} | FAIL {failed}  (of {len(ALL_CASES)} grammar "
      f"cases: {len(CASES)} main + {len(BRANCH_CASES)} branch, plus "
      f"{len(hindi_probes)} Devanagari guards)")
print(f"step-contract violations: {contract_fail} "
      f"(min {MIN_STEPS} steps / {MIN_STEP_CHARS} chars per matched "
      f"case)")
print("families exercised:", len(families_seen), "->",
      ", ".join(sorted(families_seen)))
for d in details:
    print("  FAIL:", d)
sys.exit(1 if failed else 0)
