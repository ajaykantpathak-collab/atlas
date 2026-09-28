# -*- coding: utf-8 -*-
"""test_hindi_families.py -- hand-verified textbook-style cases for
model_hindi.  Every expected value below is hand-checked against the
corpus's own teaching nodes (closed world):

  संधि   विद्यालय = विद्या + आलय (दीर्घ)      [c11_hin_isc_01_002]
         राम + अयण -> दीर्घ (अ + आ = आ)       [c12_hin_isc_01_003]
         इति + आदि -> यण; कमलेश = कमल + ईश (गुण)
  समास   राजकुमार = राजा का कुमार (षष्ठी त.)  [c11_hin_isc_01_002]
         विद्यालय-प्रांगण = विद्यालय का प्रांगण [c11_hin_isc_01_003]
         त्रिलोक द्विगु; नीलकंठ बहुव्रीहि; महात्मा कर्मधारय;
         प्रतिदिन अव्ययीभाव; राम-लक्ष्मण द्वंद्व
  अलंकार कसौटी क्रम [c9_hin_icse_04_003 Q3]: चाँद-सा -> उपमा;
         मुख-कमल मुरझाया -> रूपक; लहरें आसमान छू -> अतिशयोक्ति;
         कनक-कनक / मोहन-मुख-मंदिर -> अनुप्रास; सोने/सोने -> यमक
         [c10_hin_ks_cbse_01_006]
  काल    'पढ़ी' भूतकाल [c9_hin_icse_04_001]; खेल रहे हैं -> खेल रहे थे
         [c9_hin_icse_04_004]; सीता गाती थी -> सीता गाएगी
         [c10_hin_icse_04_001]
  वाच्य  3-step rule [c8_hin_icse_03_003]: राम ने पत्र लिखा ->
         पत्र राम द्वारा लिखा गया [c11_hin_isc_01_003];
         राम फल खाता है -> फल राम द्वारा खाया जाता है
         [c11_hin_isc_01_002]; सोया जाता है -> भाववाच्य [c8_03_003]
  कारक   'ने' = कर्ता [c7_hin_icse_03_002]
  लिंग-वचन  लड़का->लड़की, शेर->शेरनी, माला->मालाएँ, बात->बातें
         [c8_hin_icse_03_002 A3]
  उपसर्ग-प्रत्यय  छील-चाल [c7_hin_icse_03_004]: निर्मल = निर् + मल,
         असंभव = अ + संभव; सुंदरता = सुंदर + ता; बचपन = बच्चा + पन
  मुहावरे-लोकोक्ति  [c7_hin_icse_03_003, c10_hin_icse_04_001/003,
         c10_hin_ks_cbse_01_010]: लोहे के चने चबाना, नाक कटना,
         आँख का तारा, नौ-दो ग्यारह, अंधों में काना राजा, आम के आम...
  तत्सम-तद्भव  [c8_hin_icse_03_001]: क्षेत्र->खेत, बन->वन, हस्त->हाथ
  साहित्य  author facts from the corpus parichay nodes only:
         झाँसी की रानी -> सुभद्रा कुमारी चौहान [c9_ga_11];
         साखी -> कबीर दास [icse_15]; आषाढ़ का एक दिन -> मोहन राकेश
         [isc_03]; कामायनी -> जयशंकर प्रसाद [c10_ks_01_001]
  वाक्य भेद  क्रिया + जोड़-धागा कसौटी [c8_hin_icse_03_003]:
         'कहा कि' -> मिश्र; और-join -> संयुक्त; बच्चे खेल रहे हैं -> सरल
  'ने'-शुद्धि  both-conditions rule [c9_hin_icse_04_002 A3]:
         राम ने स्कूल गया -> राम स्कूल गया; मोहन ने सो गया -> मोहन सो गया;
         सीता चित्र बनाया -> सीता ने चित्र बनाया;
         राम ने रोटी खाता है -> राम रोटी खाता है
  मेल-शुद्धि  वह जाते हैं -> जाता है [c12_hin_isc_01_004];
         लड़कियाँ पढ़ता है -> पढ़ती हैं [c7_hin_icse_03_001]

STEP CONTRACT (standard bar, enforced below on every matched case):
  len(steps) >= 3 AND sum(len(step)) >= 150 chars, shaped as
  method/rule line -> given restatement -> computation shown ->
  verification check -> interpretation.  Thin steps are a permanent
  test failure.  Every family must DECLINE on English-grammar, maths
  and other-subject probes (negative battery below).
"""
import sys
try:
    sys.path.insert(0, 'D:/platform')
    from backend.its.solver.hindi_families import model_hindi
except SyntaxError:
    # a sibling subject's solver file is mid-edit in the root tree;
    # fall back to the deploy tree copy (kept identical for hindi).
    for mod in [m for m in list(sys.modules)
                if m == 'backend' or m.startswith('backend.')]:
        del sys.modules[mod]
    sys.path = [p for p in sys.path if p != 'D:/platform']
    sys.path.insert(0, 'D:/platform/deploy')
    from backend.its.solver.hindi_families import model_hindi

# (question, expected_structure, expected_numeric, answer_substring)
CASES = [
    # ---- sandhi: viichchhed (taught split table) ----
    ("'विद्यालय' का संधि विच्छेद कीजिए।",
     "SANDHI_VICHCHHED", None, "विद्या + आलय"),
    ("'परीक्षा' का संधि विच्छेद कीजिए।",
     "SANDHI_VICHCHHED", None, "परि + ईक्षा"),
    ("'कमलेश' का संधि विच्छेद कीजिए।",
     "SANDHI_VICHCHHED", None, "कमल + ईश"),
    ("'पर्याप्त' का संधि विच्छेद कीजिए।",
     "SANDHI_VICHCHHED", None, "परि + आप्त"),
    # ---- sandhi: bhed from the given components ----
    ("'विद्या + आलय' में कौन-सी संधि है?",
     "SANDHI_VICHCHHED", None, "दीर्घ संधि"),
    ("'इति + आदि' में कौन-सी संधि है?",
     "SANDHI_VICHCHHED", None, "यण संधि"),
    ("'महा + ईश' में कौन-सी संधि है?",
     "SANDHI_VICHCHHED", None, "गुण संधि"),
    # ---- samas: vigrah + bhed ----
    ("'राजकुमार' का समास विग्रह और भेद बताइए।",
     "SAMAS_VIGRAH", None, "राजा का कुमार"),
    ("'विद्यालय-प्रांगण' का समास विग्रह कीजिए।",
     "SAMAS_VIGRAH", None, "विद्यालय का प्रांगण"),
    ("'त्रिलोक' का समास भेद बताइए।",
     "SAMAS_VIGRAH", None, "द्विगु"),
    ("'नीलकंठ' का समास विग्रह बताइए।",
     "SAMAS_VIGRAH", None, "बहुव्रीहि"),
    ("'महात्मा' का समास विग्रह कीजिए।",
     "SAMAS_VIGRAH", None, "कर्मधारय"),
    ("'प्रतिदिन' का समास बताइए।",
     "SAMAS_VIGRAH", None, "अव्ययीभाव"),
    ("'राम-लक्ष्मण' का समास भेद बताइए।",
     "SAMAS_VIGRAH", None, "द्वंद्व"),
    # ---- alankaar: the corpus kasauti lines ----
    ("'नदी का जल चाँद-सा चमक रहा था' — इसमें कौन-सा अलंकार है?",
     "ALANKAAR_CLASSIFY", None, "उपमा"),
    ("'मुख-कमल मुरझाया' में कौन-सा अलंकार है?",
     "ALANKAAR_CLASSIFY", None, "रूपक"),
    ("'नदी की लहरें आसमान छू लेती थीं' में अलंकार पहचानिए।",
     "ALANKAAR_CLASSIFY", None, "अतिशयोक्ति"),
    ("'कनक-कनक ते सौ गुनी, मादकता अधिकाय' में अलंकार बताइए।",
     "ALANKAAR_CLASSIFY", None, "अनुप्रास"),
    ("'सोने की सोई ने सोने नहीं दिया' में अलंकार बताइए।",
     "ALANKAAR_CLASSIFY", None, "यमक"),
    # ---- kaal: identify + convert ----
    ("'राम ने पुस्तक पढ़ी' में क्रिया का काल पहचानिए।",
     "KAAL_IDENTIFY", None, "भूतकाल"),
    ("'वह रोज़ विद्यालय जाता है' में काल बताइए।",
     "KAAL_IDENTIFY", None, "वर्तमान काल"),
    ("'मैं कल विद्यालय जाऊँगा' में कौन-सा काल है?",
     "KAAL_IDENTIFY", None, "भविष्यत्"),
    ("'लड़के खेल रहे हैं' को भूतकाल में बदलिए।",
     "KAAL_CONVERT", None, "खेल रहे थे"),
    ("'सीता गाती थी' को भविष्यत् काल में बदलिए।",
     "KAAL_CONVERT", None, "सीता गाएगी"),
    ("'वह जाता है' को भूतकाल में बदलिए।",
     "KAAL_CONVERT", None, "जाता था"),
    # ---- vaachya: identify + convert ----
    ("'राम ने किताब पढ़ी' में कौन-सा वाच्य है?",
     "VAACHYA_IDENTIFY", None, "कर्तृवाच्य"),
    ("'सोया जाता है' वाले वाक्य का वाच्य बताइए।",
     "VAACHYA_IDENTIFY", None, "भाववाच्य"),
    ("'राम ने पत्र लिखा' को कर्मवाच्य में बदलिए।",
     "VAACHYA_CONVERT", None, "पत्र राम द्वारा लिखा गया"),
    ("'राम फल खाता है' को कर्मवाच्य में बदलिए।",
     "VAACHYA_CONVERT", None, "खाया जाता है"),
    ("'पुस्तक राम द्वारा पढ़ी गई' को कर्तृवाच्य में बदलिए।",
     "VAACHYA_CONVERT", None, "राम ने पुस्तक पढ़ी"),
    # ---- kaarak chinh ----
    ("'राम ने किताब पढ़ी' में 'ने' कौन-सा कारक है?",
     "KARAK_CHINH", None, "कर्ता"),
    # ---- ling / vachan ----
    ("'लड़का' का स्त्रीलिंग बताइए।",
     "LING_VACHAN", None, "लड़की"),
    ("'शेर' का लिंग बदलिए।",
     "LING_VACHAN", None, "शेरनी"),
    ("'माला' का वचन बदलिए।",
     "LING_VACHAN", None, "मालाएँ"),
    ("'बात' का वचन बदलिए।",
     "LING_VACHAN", None, "बातें"),
    # ---- upasarg / pratyay (छील-चाल) ----
    ("'निर्मल' में उपसर्ग और मूल शब्द बताइए।",
     "UPASARG_PRATYAY", None, "निर् + मल"),
    ("'असंभव' में उपसर्ग पहचानिए।",
     "UPASARG_PRATYAY", None, "अ + संभव"),
    ("'सुंदरता' में प्रत्यय बताइए।",
     "PRATYAY_NIRMAN", None, "सुंदर + ता"),
    ("'बचपन' में प्रत्यय बताइए।",
     "PRATYAY_NIRMAN", None, "बच्चा + पन"),
    # ---- muhaavare / lokoktiyan ----
    ("'लोहे के चने चबाना' मुहावरे का अर्थ बताइए।",
     "MUHAAVARA_MEANING", None, "कठिन काम"),
    ("'नाक कटना' मुहावरे का अर्थ लिखिए।",
     "MUHAAVARA_MEANING", None, "अपमान"),
    ("'आँख का तारा' मुहावरे का अर्थ बताइए।",
     "MUHAAVARA_MEANING", None, "प्रिय"),
    ("'अंधों में काना राजा' लोकोक्ति का अर्थ बताइए।",
     "MUHAAVARA_MEANING", None, "सिरमौर"),
    # ---- tatsam / tadbhav ----
    ("'क्षेत्र' का तद्भव लिखिए।",
     "TATSAM_TADBHAV", None, "खेत"),
    ("'बन' का तत्सम रूप लिखिए।",
     "TATSAM_TADBHAV", None, "वन"),
    ("'हस्त' का तद्भव लिखिए।",
     "TATSAM_TADBHAV", None, "हाथ"),
    # ---- literature facts (corpus nodes only) ----
    ("'झाँसी की रानी' के कवि कौन हैं?",
     "LIT_FACT", None, "सुभद्रा कुमारी चौहान"),
    ("'साखी' के कवि कौन हैं?",
     "LIT_FACT", None, "कबीर दास"),
    ("'आषाढ़ का एक दिन' किसकी रचना है?",
     "LIT_FACT", None, "मोहन राकेश"),
    # ---- vaakya bhed ----
    ("'राम ने कहा कि वह आएगा' का वाक्य भेद बताइए।",
     "VAAKY_BHED", None, "मिश्र"),
    ("'सीता गाती है और नृत्य भी करती है' — वाक्य भेद बताइए।",
     "VAAKY_BHED", None, "संयुक्त"),
    ("'बच्चे खेल रहे हैं' का वाक्य भेद बताइए।",
     "VAAKY_BHED", None, "सरल"),
    # ---- 'ने' shuddhi (both-conditions rule) ----
    ("शुद्ध कीजिए: 'राम ने स्कूल गया'।",
     "NA_SHUDDHI", None, "राम स्कूल गया"),
    ("इस वाक्य की त्रुटि शुद्ध कीजिए: 'मोहन ने सो गया'।",
     "NA_SHUDDHI", None, "मोहन सो गया"),
    ("वाक्य में त्रुटि पहचानें: 'सीता चित्र बनाया'।",
     "NA_SHUDDHI", None, "सीता ने चित्र बनाया"),
    ("'राम ने रोटी खाता है' — त्रुटि शुद्ध कीजिए।",
     "NA_SHUDDHI", None, "राम रोटी खाता है"),
    # ---- vishay-kriya mel shuddhi ----
    ("'वह प्रतिदिन विद्यालय जाते हैं' को शुद्ध कीजिए।",
     "MEL_SHUDDHI", None, "जाता है"),
    ("'लड़कियाँ पढ़ता है' को शुद्ध कीजिए।",
     "MEL_SHUDDHI", None, "पढ़ती हैं"),
    # ---- honesty: in-domain asks with no closed-form answer ----
    ("मुझे निबंध लेखन का प्रारूप समझाइए।", None, None, None),
    ("इस कविता का भावार्थ लिखिए।", None, None, None),
    ("'मेघ आए' कविता में कौन-सा रस है?", None, None, None),
    # ---- honesty: must NOT match (other-subject probes) ----
    ("Solve the quadratic equation x^2 - 5x + 6 = 0.",
     None, None, None),
    ("A car accelerates uniformly at 2 m/s2 from rest. Find its velocity after 5 seconds.",
     None, None, None),
    ("Calculate the pH of a 0.01 M HCl solution.",
     None, None, None),
    ("In a cross Tt x Tt, what is the probability of the offspring being tt?",
     None, None, None),
    ("Identify the tense in the sentence she has been working here since 2010.",
     None, None, None),
    ("What is the passive voice of the sentence the cat chased the mouse?",
     None, None, None),
    ("Write the journal entry for goods sold on credit to Ramesh for 5000 rupees.",
     None, None, None),
    ("Convert the number 25 from decimal to binary.",
     None, None, None),
]

# BRANCH_CASES: second battery exercising the remaining routing branches
# (reverse directions, second families of a topic, other table rows).
# The STEP CONTRACT applies here too -- no family may be thin.
BRANCH_CASES = [
    # sandhi: more table rows + bhed from split
    ("'रामायण' का संधि विच्छेद कीजिए।", "SANDHI_VICHCHHED", None),
    ("'विद्यार्थी' का संधि विच्छेद कीजिए।", "SANDHI_VICHCHHED", None),
    ("'महेन्द्र' का संधि विच्छेद कीजिए।", "SANDHI_VICHCHHED", None),
    ("'राम + अयण' में कौन-सी संधि है?", "SANDHI_VICHCHHED", None),
    ("'प्रति + एक' में कौन-सी संधि है?", "SANDHI_VICHCHHED", None),
    # samas: remaining bhed branches
    ("'गंगाजल' का समास विग्रह बताइए।", "SAMAS_VIGRAH", None),
    ("'दशानन' का समास विग्रह बताइए।", "SAMAS_VIGRAH", None),
    ("'नीलकमल' का समास भेद बताइए।", "SAMAS_VIGRAH", None),
    ("'सप्ताह' का समास भेद बताइए।", "SAMAS_VIGRAH", None),
    ("'यथाशक्ति' का समास विग्रह बताइए।", "SAMAS_VIGRAH", None),
    ("'माता-पिता' का समास भेद बताइए।", "SAMAS_VIGRAH", None),
    # alankaar: second upama line + rule-based anupraasa
    ("'मुख कमल-सा निर्मल' में अलंकार बताइए।", "ALANKAAR_CLASSIFY", None),
    ("'मोहन के मुख मंदिर में' पंक्ति में अलंकार बताइए।",
     "ALANKAAR_CLASSIFY", None),
    # kaal: other persons/numbers
    ("'राम पुस्तक पढ़ता है' को भविष्यत् काल में बदलिए।",
     "KAAL_CONVERT", None),
    ("'राम पढ़ता है' को भूतकाल में बदलिए।", "KAAL_CONVERT", None),
    # vaachya: pronoun-agent + more rows
    ("'मैं आम खाता हूँ' को कर्मवाच्य में बदलिए।", "VAACHYA_CONVERT", None),
    ("'मीरा ने चित्र बनाया' को कर्मवाच्य में बदलिए।",
     "VAACHYA_CONVERT", None),
    ("'पत्र राम द्वारा लिखा गया' को कर्तृवाच्य में बदलिए।",
     "VAACHYA_CONVERT", None),
    ("'राम ने आम खाया' को कर्मवाच्य में बदलिए।", "VAACHYA_CONVERT", None),
    # kaarak: other chinh branches
    ("'राम कलम से लिखता है' में 'से' कौन-सा कारक है?",
     "KARAK_CHINH", None),
    ("'माँ के लिए कविता' में 'के लिए' कौन-सा कारक है?",
     "KARAK_CHINH", None),
    # ling/vachan: remaining rows + reverse vachan
    ("'बेटा' का स्त्रीलिंग लिखिए।", "LING_VACHAN", None),
    ("'घोड़ा' का लिंग बदलिए।", "LING_VACHAN", None),
    ("'लड़के' को एकवचन में बदलिए।", "LING_VACHAN", None),
    ("'बातें' को एकवचन में बदलिए।", "LING_VACHAN", None),
    # upasarg/pratyay: more corpus rows
    ("'दुर्गंध' में उपसर्ग और मूल शब्द बताइए।", "UPASARG_PRATYAY", None),
    ("'पराजय' में उपसर्ग पहचानिए।", "UPASARG_PRATYAY", None),
    ("'लिखावट' में प्रत्यय बताइए।", "PRATYAY_NIRMAN", None),
    ("'धनवान' में प्रत्यय बताइए।", "PRATYAY_NIRMAN", None),
    # muhaavare: more corpus rows
    ("'नौ-दो ग्यारह होना' मुहावरे का अर्थ बताइए।",
     "MUHAAVARA_MEANING", None),
    ("'आम के आम गुठलियों के दाम' मुहावरे का अर्थ बताइए।",
     "MUHAAVARA_MEANING", None),
    ("'नाक में दम करना' मुहावरे का अर्थ बताइए।",
     "MUHAAVARA_MEANING", None),
    # tatsam: more rules + reverse direction
    ("'नाम' का तद्भव लिखिए।", "TATSAM_TADBHAV", None),
    ("'वर्ष' का तद्भव लिखिए।", "TATSAM_TADBHAV", None),
    ("'खेत' का तत्सम रूप लिखिए।", "TATSAM_TADBHAV", None),
    # literature: more corpus-authoritative rows
    ("'कामायनी' किसकी रचना है?", "LIT_FACT", None),
    ("'काकी' कहानी के लेखक कौन हैं?", "LIT_FACT", None),
    ("'महायज्ञ का पुरस्कार' किसकी रचना है?", "LIT_FACT", None),
    # na-shuddhi: present-tense branch
    ("शुद्ध कीजिए: 'राम ने रोटी खाता है'।", "NA_SHUDDHI", None),
]

# STEP CONTRACT (standard bar): >= 3 steps, >= 150 total chars, shaped
# method -> given -> computation -> verification -> interpretation.
MIN_STEPS = 3
MIN_STEP_CHARS = 150

# negative requirement (SOLVER_STEP_CONTRACT.md): every family must
# decline on other-subject probes; also asserts zero crashes on junk.
JUNK_PROBES = ["", "   ", "123", "संधि", "???", "alfahan asks what"]

passed = failed = contract_fail = 0
details = []
families_seen = {}
ALL_CASES = CASES + [c + (None,) for c in BRANCH_CASES]
for text, exp_struct, exp_num, exp_sub in ALL_CASES:
    r = model_hindi(text)
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
            if exp_num is not None:
                got = r.numeric_answer
                if got is None or abs(got - exp_num) > 1e-9:
                    ok = False
                    why.append(f"numeric {got} != {exp_num}")
            if exp_sub is not None and exp_sub not in (r.final_answer
                                                       or ""):
                ok = False
                why.append(f"answer {r.final_answer!r} missing "
                           f"{exp_sub!r}")
            # --- STEP CONTRACT assertions (every matched probe) ---
            n_steps = len(r.steps or [])
            n_chars = sum(len(s) for s in (r.steps or []))
            if n_steps < MIN_STEPS:
                ok = False
                why.append(f"CONTRACT: {r.structure} only {n_steps} "
                           f"steps (< {MIN_STEPS})")
            if n_chars < MIN_STEP_CHARS:
                ok = False
                why.append(f"CONTRACT: {r.structure} steps total "
                           f"{n_chars} chars (< {MIN_STEP_CHARS})")
            if n_steps < MIN_STEPS or n_chars < MIN_STEP_CHARS:
                contract_fail += 1
    if ok:
        passed += 1
    else:
        failed += 1
        details.append((text[:60], "; ".join(why)))

# junk robustness: no crashes, no matches
for junk in JUNK_PROBES:
    try:
        r = model_hindi(junk)
        if r is None or r.matched:
            failed += 1
            details.append((repr(junk), "junk probe matched or None"))
    except Exception as exc:  # a crash is a hard failure
        failed += 1
        details.append((repr(junk), f"crash: {type(exc).__name__}: {exc}"))

n_families = len(set(f["f"] for f in
                     ({"f": k} for k in families_seen))) or 0
print(f"PASS {passed} | FAIL {failed}  (of {len(ALL_CASES)}: "
      f"{len(CASES)} main + {len(BRANCH_CASES)} branch + "
      f"{len(JUNK_PROBES)} junk)")
print(f"step-contract violations: {contract_fail} "
      f"(min {MIN_STEPS} steps / {MIN_STEP_CHARS} chars per matched case)")
print("families exercised:",
      len(families_seen), "->", ", ".join(sorted(families_seen)))
for d in details:
    print("  FAIL:", d)
sys.exit(1 if failed else 0)
