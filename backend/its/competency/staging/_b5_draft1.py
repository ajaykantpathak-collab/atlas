# Batch 5 drafts: keww136, keww137 (Woven Words) + khan101, khan102 (Antral)
import _b5_helper as H

# ------------------------------------------------------------------ #
# keww136 -- The Story, E.M. Forster
# ------------------------------------------------------------------ #
C = []
C.append(H.concept(
    "keww.136.1", "Story as the Backbone of the Novel", "The Story",
    "Forster holds that narration of happenings is the one factor every novel "
    "shares, however different their ambitions; he pictures it as a backbone "
    "inside the creature of the novel, carrying every higher growth on its frame.",
    "",
    "Strip away character, dialogue and ideas, and the sequence of events is "
    "what remains of any novel; that is why Forster calls story-telling the "
    "fundamental aspect.",
    "keww136.txt opening voice-trio and backbone/tape-worm lines",
    ["why does Forster call the story the fundamental aspect of the novel",
     "how does Forster describe the place of story-telling inside a novel",
     "what do the three voices at the start of the essay say about the novel",
     "explain the backbone and tape-worm image used for the story",
     "can a novel dispense with the story according to Forster",
     "what does the essay say about readers who demand a good story"],
    "verify_property",
    [H.vstep(1, "identify the three attitudes", "one voice shrugs the novel off as mere busy entertainment, another swallows whole libraries of it, the third admits with a sigh that the novel tells a story"),
     H.vstep(2, "test the claim against the genre", "every novel, however experimentally written, still must present happenings one after another"),
     H.vstep(3, "apply the body image", "the story runs through the novel like a backbone, less lovely than the limbs it supports but indispensable to them")]))

C.append(H.concept(
    "keww.136.2", "Defining the Story: Time-Sequence Narrative", "The Story",
    "A story, in Forster's working definition, is a narration of events arranged "
    "in their time order after knocking out the value dimension of life; judged "
    "purely as story its single merit is making the audience want to learn what "
    "happens next.",
    "",
    "Sequence in time is the story's only organising principle; it answers "
    "curiosity about what came after, not questions of weight or worth.",
    "keww136.txt definition passage after the Scheherazade discussion",
    ["define a story as Forster defines it in the essay",
     "what is the one merit a story can claim as a story",
     "why does Forster strip value out of his definition of story",
     "distinguish story from plot with Forster's own kind of example",
     "how does daily life differ from a story in its handling of time",
     "why does Forster rate the story as the highest common factor of novels"],
    "verify_property",
    [H.vstep(1, "state the definition", "events arranged in their time-sequence form the story, the organ of primitive curiosity"),
     H.vstep(2, "separate the merit", "as story it can claim only the merit of making the listener ask what happens next"),
     H.vstep(3, "contrast with life by value", "life is lived by values as well as by the clock, but the story judges nothing and simply orders moments into a line")]))

C.append(H.concept(
    "keww.136.3", "Scheherazade and the Ancient Appetite for Story", "The Story",
    "Forster reaches back to the campfire listener tired from fighting the "
    "mammoth and to Scheherazade, who saved her life night after night by "
    "stopping each tale at dawn, to show that the hunger to know what happens "
    "next is as old as the human race.",
    "",
    "The cliff-hanger is a life-or-death device in the Arabian Nights frame "
    "tale, and every modern reader is still the gaping audience of that story.",
    "keww136.txt campfire and Scheherazade passages and the Arabian Nights note",
    ["how does the essay connect the story-telling instinct with primitive man",
     "what device does Scheherazade use to postpone her execution",
     "why are readers compared with Scheherazade's husband the sultan",
     "what does the essay say about judging the sultan's curiosity",
     "explain the reference to the one thousand and one nights in the essay",
     "what makes the suspense of a serial tale so powerful for audiences"],
    "verify_property",
    [H.vstep(1, "recall the frame story", "the sultan's bride escapes dawn execution because her unfinished tale leaves him desperate for its ending"),
     H.vstep(2, "read the device", "each sunrise break is the oldest cliff-hanger, proof that curiosity about the next event rules listeners"),
     H.vstep(3, "generalise to the reader", "novel-readers queueing for the next chapter re-enact the sultan's suspense, an appetite Forster calls atavistic")]))

C.append(H.concept(
    "keww.136.4", "Life in Time and by Value; the Novel's Double Allegiance",
    "The Story",
    "Daily life seems to run on the clock yet is really shaped by value, an "
    "unmeasured intensity of moments; the novel, Forster argues, owes allegiance "
    "to both, but while a philosopher may deny time, the novelist must obey it "
    "or the story collapses.",
    "",
    "Memory keeps the past as a cloud of feeling, not a timetable, and the "
    "novel lives in both orders at once, ordering events in time while "
    "illuminating them with value.",
    "keww136.txt daily-life passage and the double-allegiance lines",
    ["what is the difference between living in time and living by value",
     "why must a novel keep its allegiance to time even when a philosopher may deny it",
     "how does the essay describe memory and anticipation as against the clock",
     "what happens to a novelist who mishandles the time-sequence",
     "explain the double allegiance of the novel according to Forster",
     "how do experimental writers stretch or bend time in fiction"],
    "verify_property",
    [H.vstep(1, "split the two orders", "time delivers events in sequence, value makes some instants swell and others shrink; memory stores the second, the clock the first"),
     H.vstep(2, "apply to fiction", "the good novel narrates life in time and at the same time renders life by values, never surrendering the sequence"),
     H.vstep(3, "note the limits", "an experimenter such as the author of Tristram Shandy or Proust with his shifting clocks still has to keep the reader sure of what followed what")]))

W = [H.we(
    "we_keww136_1", "keww136.txt definition and sultan passages",
    "keww.136.2",
    "In your own words, state what a story is and the single merit it can "
    "claim as a story, using Forster's reasoning.",
    {},
    [H.vstep(1, "state the definition", "a story is a narrative of events arranged in their time-sequence, with value knocked out"),
     H.vstep(2, "give its one merit", "it makes the audience want to know what happens next, the merit the sultan's curiosity displays"),
     H.vstep(3, "close with the analogy", "readers are therefore like the sultan gaping at dawn for the rest of the tale")],
    qtype="short_answer"),
     H.we(
    "we_keww136_2", "keww136.txt daily-life and double-allegiance passage",
    "keww.136.4",
    "Explain Forster's distinction between life in time and life by value, "
    "and why the novel must honour both.",
    {},
    [H.vstep(1, "contrast the orders", "time is the Monday-to-Tuesday order, value is the swelling of an hour into a cloud or a sun of feeling"),
     H.vstep(2, "show daily life", "daily life pretends to be chronological but is lived by values"),
     H.vstep(3, "draw the conclusion", "the novel narrates life in time and by value together; dropping time makes it unintelligible, dropping value makes it empty")],
    qtype="short_answer")]

E = [H.ex("ex_keww136_1", "keww136.txt Understanding the text questions, reworded",
          ["why does the first voice at the lecture dismiss the novel and the second depend on it",
           "trace the human interest in story back to the campfire as the essay does",
           "what does the essay find ludicrous about judging the sultan's appetite for stories",
           "how does the Scheherazade frame tale dramatise the power of suspense",
           "discuss the treatment of time in novels you know, taking off from the essay's references"]),
     H.ex("ex_keww136_2", "keww136.txt Appreciation and Further reading, reworded",
          ["why does Forster call the story a tape-worm rather than only a backbone",
           "what does the author's note say about removing colloquial words from the lectures",
           "compare the essay's view of curiosity with any serial you have followed",
           "how does the definition of story differ from the definition of plot in criticism",
           "link the essay's idea of an ending to Frank Kermode's The Sense of an Ending"])]

H.emit("keww136", H.make_cat(
    "keww136", "The Story",
    C, W, E))

# ------------------------------------------------------------------ #
# keww137 -- Bridges, Kumudini Lakhia
# ------------------------------------------------------------------ #
C = []
C.append(H.concept(
    "keww.137.1", "A Reluctant Child and the Making of a Dancer", "Bridges",
    "Kumudini Lakhia recalls that she never wanted to dance as a child; it was "
    "her mother who rode crowded trains with an unwilling daughter, and only "
    "the pull of film songs turned the child who had begun classes into one "
    "who practised willingly four days a week.",
    "",
    "Discipline imposed from outside slowly turns into an inner vocation; the "
    "guru-shishya framework of classical training carried her even when the "
    "child in her resisted.",
    "keww137.txt childhood, mother and dance-class passages",
    ["why did Kumudini Lakhia not want to dance as a child",
     "what role did the mother play in the dancer's early training",
     "how did the film industry spur the writer's interest in dance",
     "describe the guru-shishya pattern of training described in the essay",
     "what subjects formed the writer's childhood education apart from dance",
     "how does the essay present the struggle behind learning to dance"],
    "verify_property",
    [H.vstep(1, "trace the resistance", "an unwilling child is taken by local train about forty-five minutes each way to a dance class she did not ask for"),
     H.vstep(2, "mark the turning point", "imitating a film actor at home persuades the watching mother, and the child keeps attending without complaint"),
     H.vstep(3, "read the lesson", "talent grows inside a lattice of parental effort, regular classes and early imitation rather than from a dream of the stage")]))

C.append(H.concept(
    "keww.137.2", "Technique Must Be Thrown Overboard: Questioning the Form",
    "Bridges",
    "The essay repeatedly stages the clash between learned technique and "
    "understanding: the young dancer asks why she is gyrating in this way, and "
    "her guru finally tells her she has perfected the technique and must now "
    "throw it overboard and dance.",
    "",
    "Mastery is not the destination; the trained body must become free enough "
    "to express meaning, which is why the questioning pupil makes the truer artist.",
    "keww137.txt guru's advice and questioning passages",
    ["what does the guru mean by perfect the technique and throw it overboard",
     "why did the young dancer begin to question her training",
     "how does the essay connect discipline with a questioning spirit",
     "what was missing in the answer the teacher could not give",
     "explain the phrase to dance means to struggle in the essay",
     "how does questioning a form help an artist internalise it"],
    "verify_property",
    [H.vstep(1, "state the conflict", "the pupil wants reasons for each movement while the tradition hands down movement alone"),
     H.vstep(2, "give the resolution", "after perfection the guru frees her to dance from understanding rather than from rule"),
     H.vstep(3, "generalise", "bridges between tradition and creativity are built exactly at this point where discipline meets doubt")]))

C.append(H.concept(
    "keww.137.3", "Memory, Hunger and the Creative Self", "Bridges",
    "Two childhood memories organise the essay's inner landscape: the "
    "gardener's terrifying revenge for picked guavas, and the mother already "
    "dead when the daughter arrived thirty-six hours later, whose hunger the "
    "writer says she still mistakes inside herself.",
    "",
    "Personal loss and learned fear feed the choreographer's work; the writer "
    "treats sensitivity and sentimentality as different powers and chooses the first.",
    "keww137.txt gardener episode, mother's death and hunger passages",
    ["what lessons did the guava-tree incident teach the writer",
     "how does the essay describe the mother's death and the journey home",
     "why does the writer speak of mistaking different kinds of hunger",
     "distinguish sensitivity from sentimentality as the essay does",
     "how do early memories surface later in the writer's work",
     "what does the window image of the Indian woman suggest in the essay"],
    "verify_property",
    [H.vstep(1, "collect the memories", "the seized guava-pickers, the falsely cheerful summons home, the mother dead on arrival after thirty-six hours"),
     H.vstep(2, "read the hunger figure", "bodily, emotional and creative hungers are confused in the writer's own account and visibly feed her choreography"),
     H.vstep(3, "draw the distinction", "grandmother's training taught her to keep sensitivity while shedding sentimentality, a working rule for art and life")]))

C.append(H.concept(
    "keww.137.4", "Bridges: Touring, Choreography and Returning Home", "Bridges",
    "The adult career builds the bridges of the title: seven years abroad, "
    "learning folk forms from kummi to ghumar alongside classical training, "
    "choreographing works such as Duvidha, Atah Kim and Panch Paras, dancing "
    "in more than forty countries, and finally returning to home and family.",
    "",
    "The essay's title names the crossings the dancer makes: between "
    "tradition and innovation, India and the world, performing and "
    "choreographing, public art and private life.",
    "keww137.txt tour, choreography, Umrao Jaan note and closing family passage",
    ["why is the essay titled Bridges",
     "what works of choreography are named in the essay and what do they explore",
     "how did the years abroad change the writer's understanding of dance",
     "what folk dance forms does the essay mention learning",
     "how does the writer compare a family with a group performance",
     "what is the significance of Umrao Jaan and Sur Sangam for the writer"],
    "verify_property",
    [H.vstep(1, "follow the outward journey", "training at the cultural centre mixes classical and folk forms; touring after the war shows her post-war Germany's desolation and the way stage placement changes a piece"),
     H.vstep(2, "follow the inward return", "home, marriage, children and friends become another ensemble in which she is no longer a solo performer"),
     H.vstep(3, "state the title idea", "every crossing she makes becomes a bridge that carries the past of Kathak into her own new choreography")]))

W = [H.we(
    "we_keww137_1", "keww137.txt guru's advice passage",
    "keww.137.2",
    "Explain the guru's instruction that the dancer should perfect the "
    "technique and then throw it overboard, and what it reveals about "
    "learning any art.",
    {},
    [H.vstep(1, "read the two halves", "first comes disciplined perfection of technique, then its deliberate abandonment in expression"),
     H.vstep(2, "connect with the questioning pupil", "the writer's demand to know why she gyrates prepares her for that freedom"),
     H.vstep(3, "state the general lesson", "rules are bridges to be crossed, not walls to live inside; art begins where internalised technique turns into meaning")],
    qtype="short_answer"),
     H.we(
    "we_keww137_2", "keww137.txt title and choreography passages",
    "keww.137.4",
    "Justify the title Bridges with reference to the different crossings of "
    "Kumudini Lakhia's life described in the essay.",
    {},
    [H.vstep(1, "list the crossings", "childhood resistance to vocation, classical training to creative choreography, India to the world, stage to home"),
     H.vstep(2, "show how each is bridged", "each pair is joined, not chosen: folk forms sit beside kathak, family beside career"),
     H.vstep(3, "conclude", "the dancer's life is a series of bridges, and the essay narrates their building")],
    qtype="short_answer")]

E = [H.ex("ex_keww137_1", "keww137.txt Understanding the text questions, reworded",
          ["what lessons of her younger days did Kumudini carry into adult life",
           "why does the writer call dancing a struggle",
           "how does the essay weave together dance and everyday life",
           "what place do the works Duvidha, Atah Kim and Panch Paras hold in her career",
           "explain the writer's account of mistaking one hunger for another"]),
     H.ex("ex_keww137_2", "keww137.txt Talking about the text and Appreciation, reworded",
          ["argue for or against the claim that talent cannot be taught, using the essay",
           "can discipline and a questioning spirit coexist in one individual as the essay suggests",
           "how does the essay illustrate the emancipation of women",
           "make an inventory of folk dance forms of different regions as the exercise asks",
           "distinguish the literary terms given at the end of the chapter, such as fable, satire, allegory and pathos"])]

H.emit("keww137", H.make_cat(
    "keww137", "Bridges",
    C, W, E))

# ------------------------------------------------------------------ #
# khan101 -- Husain ki Kahani (Antral)
# ------------------------------------------------------------------ #
C = []
C.append(H.concept(
    "khan.101.1", "Husain Ki Kahani: Aatmakatha ka Ang", "Prastavana",
    "Ye path M.F. Husain ke jeevan par aadharit aatmakathya ka ang hai jismein "
    "dada ji ki mrityu ke baad Makbool ko Baroda ke boarding madarse mein daakhil "
    "karaya jaata hai; lekhak svayam pahli purush mein apne bachpan ka vruttant "
    "dete hain.",
    "",
    "Rachna aatmakatha viidha ka udaharan hai jismein kalaakar apne bachpan ke "
    "anubhav svayam sunate hain; pura path pehli purush drishti se likha hai.",
    "khan101.txt prastavana aur Baroda boarding ke prasang",
    ["हुसैन की कहानी किस विधा की रचना है",
     "मकबूल को बड़ौदा के बोर्डिंग स्कूल क्यों भेजा गया",
     "पाठ में आत्मकथ्य की कौन-सी विशेषताएँ मिलती हैं",
     "दादा की मृत्यु के बाद मकबूल की स्थिति कैसी हो गई",
     "मदरसा हुसामिया के बारे में पाठ में क्या वर्णन है",
     "लेखक ने अपने बचपन का वर्णन किस दृष्टि से किया है"],
    "verify_property",
    [H.vstep(1, "विधा पहचानें", "पाठ आत्मकथ्य है क्योंकि कलाकार स्वयं अपने बचपन की घटनाएँ पहले पुरुष में सुनाता है"),
     H.vstep(2, "प्रसंग जोड़ें", "दादा के साथ जुड़ाव, उनकी मृत्यु के बाद का खालीपन और बड़ौदा प्रस्थान कथा का आधार हैं"),
     H.vstep(3, "निष्कर्ष निकालें", "बचपन के प्रसंग ही आगे चलकर चित्रकार के व्यक्तित्व की जड़ें दिखाते हैं")]))

C.append(H.concept(
    "khan.101.2", "Panch Doston ke Shabd-Chitra", "Katha-vasstu",
    "Madarse ke do saalon mein Makbool ki mitrata chhah ladkon se hui jinmein "
    "se paanch dostON ke aleag vyaktitv path mein shabd-chitron ke roop mein "
    "chitre hain: attar banne wala, radio ki aawaz, Karachi ka nagarik, Kuwait "
    "jaane wala aur kalakar banne wala Makbool svayam.",
    "",
    "Har dost ka ek-ek vaakya mein aankda ja sakta vyaktitv hai; yahi "
    "alag-alag dishaen baad mein sabko duniya ke alag kono mein pahunchati hain, "
    "phir bhi do saal ki nazdeeki umr bhar dil ki doori nahi badal paaee.",
    "khan101.txt paanch doston ka parichay prasang",
    ["पाठ में पाँच मित्रों के शब्द-चित्र कैसे खींचे गए हैं",
     "मकबूल के पाँचों दोस्त कौन-कौन से काम करते हैं",
     "अलग-अलग व्यक्तित्व वाले मित्र घनिष्ठ कैसे रहे",
     "अरशद, हामिद और अब्बासजी के स्वभाव के बारे में क्या लिखा है",
     "दोस्तों का बँटना भी मित्रता क्यों नहीं तोड़ पाता",
     "शब्द-चित्र शैली किसे कहते हैं"],
    "verify_property",
    [H.vstep(1, "मित्रों की सूची बनाएँ", "अत्तार, हँसता चेहरा अरशद, पहलवान हामिद, व्यापारी स्वभाव का अब्बासजी और शांत मकबूल फिदा"),
     H.vstep(2, "भेद और मेल दिखाएँ", "रीति-रिवाज और रुचियाँ भिन्न होते हुए भी मदरसे की दो साल की नजदीकी जीवन भर की मित्रता बन जाती है"),
     H.vstep(3, "शैली पहचानें", "एक-एक वाक्य में पूरा व्यक्तित्व खींच देना ही शब्द-चित्र की कला है")]))

C.append(H.concept(
    "khan.101.3", "Janmajat Kalakar: Hunar aur Pratibha", "Bhav",
    "Path ke anusaar Makbool janmajat kalakar hai: blackboard par bina "
    "practice ki chidiya utar aana, Gandhi jee ka portrait bana dena, dukaan "
    "ke saamne guzarne walon ke sketches, aur Sinhgadh ke poster se prabhavit "
    "hokar kitaben bech kar kharidi gayi oil colours se pehli oil painting, "
    "sab uski pratibha ke svatah prakat hone ke praman hai.",
    "",
    "Pratibha chhupayi nahi chhupti: dukaan par baithhe-baithhe bhi bachche ke "
    "bhitar ka kalakar sketches aur hisab-diye ke beech khisakta rehta hai.",
    "khan101.txt chidiya, Gandhi portrait, dukaan aur Sinhgadh poster ke prasang",
    ["प्रतिभा छुपाये नहीं छुपती कथन के आधार पर मकबूल का व्यक्तित्व प्रकाशित कीजिए",
     "मकबूल के भीतर का कलाकार दुकान पर किन कार्यकलापों से अभिव्यक्त होता है",
     "सिंहगढ़ फिल्म के पोस्टर ने मकबूल को कैसे प्रभावित किया",
     "पहली ऑयल पेंटिंग के लिए मकबूल ने क्या-क्या किया",
     "ड्रॉइंग मास्टर की चिड़िया वाली घटना में मकबूल की प्रतिभा कहाँ झलकती है",
     "बेंद्रे से मुलाकात मकबूल के लिए क्यों महत्वपूर्ण थी"],
    "verify_property",
    [H.vstep(1, "प्रमाण इकट्ठे करें", "चिड़िया की नकल में दस में दस नंबर, गांधी जयंती का पोट्रेट, स्केचों की बाढ़"),
     H.vstep(2, "निर्णय का क्षण देखें", "किताबें बेचकर ऑयल कलर खरीदना और दुकान पर पहली ऑयल पेंटिंग बनाना निर्णायक प्रतिबद्धता है"),
     H.vstep(3, "संरक्षण की भूमिका जोड़ें", "अब्बा की रोशनखयाली और बेंद्रे का मशवरा मिलकर कला को घर की दीवारों से कारखानों की दीवारों तक ले जाने का रास्ता खोलते हैं")]))

C.append(H.concept(
    "khan.101.4", "Sahityik Samay-Rekha ki Ganana", "Lekhak parichay",
    "Lekhak-parichay se pata chalta hai ki Makbool Fida Husain ka janm san 1915 "
    "mein hua aur nidhan san 2011 mein; janm-varsh se nidhan-varsh ghatane par "
    "jeevan-avdhi ke baras nikalte haiN, aur kisi ghatna ke varsh se janm-varsh "
    "ghatane par us samay aayu nikalti hai.",
    "lifetime_years = death_year - birth_year",
    "Aatmakatha ke sahi context ke liye lekhak ki aayu aur ghatnaon ke samay "
    "ka hisab jodna zaruri hai.",
    "khan101.txt ant mein diya gaya lekhak parichay (1915-2011) aur 1933 ki painting",
    ["मकबूल फिदा हुसैन की जीवन-अवधि कितने वर्ष की रही",
     "लेखक की आयु ज्ञात करने का सूत्र क्या होगा",
     "1933 की पेंटिंग के समय मकबूल की आयु कितनी थी",
     "आत्मकथ्य में वर्षों का महत्व क्यों होता है",
     "साहित्यिक समयरेखा कैसे बनाई जाती है",
     "बेंद्रे की चांदी का मेडल वाली पेंटिंग किस वर्ष की है"],
    "compute",
    [H.cstep(1, "jeevan-avdhi ka sutra likhen", "ant-varsh se janm-varsh ghatakar varshon mein avdhi aati hai", "lifetime_years = death_year - birth_year"),
     H.cstep(2, "ghatna samay ki aayu nikalen", "kisi ghatna ke varsh mein se janm-varsh ghatane par us samay ki aayu aati hai", "age_at_event = event_year - birth_year")]))

W = [H.we(
    "we_khan101_1", "khan101.txt lekhak parichay (1915-2011)",
    "khan.101.4",
    "Lekhak-parichay ke anusaar Makbool Fida Husain ki jeevan-avdhi kitne "
    "varsh ki rahee?",
    {"birth_year": 1915, "death_year": 2011},
    [H.cstep(1, "maanon set karen", "janm san 1915, nidhan san 2011 path ke parichay se", "birth_year = 1915"),
     H.cstep(2, "sutra lagayen", "jeevan-avdhi = nidhan varsh - janm varsh", "lifetime_years = death_year - birth_year")]),
     H.we(
    "we_khan101_2", "khan101.txt 1933 ki Vagband painting ka prasang",
    "khan.101.4",
    "1933 mein Bendre ki Vagband painting par silver medal mila; usi varsh "
    "Makbool ki aayu (janm 1915) kitni thi?",
    {"birth_year": 1915, "event_year": 1933},
    [H.cstep(1, "maanon set karen", "janm 1915, ghatna varsh 1933", "birth_year = 1915"),
     H.cstep(2, "aayu ka sutra lagayen", "aayu = ghatna varsh - janm varsh", "age_at_event = event_year - birth_year")])]

E = [H.ex("ex_khan101_1", "khan101.txt prashna-abhyas 1-4, reworded",
          ["पाँच मित्रों के शब्द-चित्रों से उनके अलग व्यक्तित्व की झलक कैसे मिलती है",
           "प्रतिभा छुपाये नहीं छुपती के आधार पर मकबूल के व्यक्तित्व पर प्रकाश डालिए",
           "आत्मकथा में लेखक का जन्मजात कलाकार होना सबसे पहले कहाँ उद्घाटित होता है",
           "दुकान पर बैठे-बैठे मकबूल का भीतर का कलाकार किन कार्यकलापों से अभिव्यक्त होता है",
           "प्रचार-प्रसार के पुराने और वर्तमान तरीकों में अंतर पाठ के आधार पर बताइए"]),
     H.ex("ex_khan101_2", "khan101.txt prashna-abhyas 5-7 aur shabdarth, reworded",
          ["कला के प्रति लोगों का नजरिया पहले कैसा था और अब क्या बदलाव आया है",
           "मकबूल के पिता के व्यक्तित्व की तुलना अपने पिता से कीजिए",
           "अब्बा की रोशनखयाली कैसे पिता-पुत्र की रिवायती बंदिशों को तोड़ती है",
           "शब्दार्थ से अत्तर, सालन, रोशनखयाली और रिवायती के अर्थ स्पष्ट कीजिए",
           "बेंद्रे की टेकनीक (टिंटेड पेपर, गोआश वॉटर कलर) का पाठ में क्या महत्व है"])]

H.emit("khan101", H.make_cat(
    "khan101", "हुसैन की कहानी...",
    C, W, E))

# ------------------------------------------------------------------ #
# khan102 -- Aawara Maseeha (Vishnu Prabhakar)
# ------------------------------------------------------------------ #
C = []
C.append(H.concept(
    "khan.102.1", "Aawara Maseeha: Baal-man ke Saath Kheli Gayi Kahani", "Katha",
    "Vishnu Prabhakar ki is kahani mein Ganguli-parivar ka nauvasa Sharat "
    "school ki aadhi chhutti mein purane bagh ki sair par mama Surendra ke "
    "saath jaata hai aur phir ghar, goshaalon, godaam aur gaon ke bachchon ke "
    "beech apni makal kiya karti hai; prastavana hi batati hai ki kahani "
    "bal-man ke saath khelne wale avaidh bachche ki kahani hai.",
    "",
    "Kahani ka kendra Sharat ki avaidh, prashnachanchal aur Dayalu man hai jo "
    "khel-kud, shaitani aur anayas daya ko ek saath jeeta hai.",
    "khan102.txt prastavana, Sharat-mama samvad aur ghar-goshaal prasang",
    ["आवारा मसीहा कहानी का केंद्रीय पात्र कौन है",
     "शरत अपनी छुट्टी का समय कैसे बिताता है",
     "मामा सुरेंद्र और शरत के संबंध पाठ में कैसे चित्रित हैं",
     "शरत की प्रवृत्तियों में शैतानी और दया कैसे साथ-साथ चलती हैं",
     "कहानी में बाल-मन का चित्रण किस प्रकार हुआ है",
     "आवारा मसीहा शीर्षक की सार्थकता स्पष्ट कीजिए"],
    "verify_property",
    [H.vstep(1, "कथा-सूत्र पकड़ें", "गर्मी की छुट्टी, पुराना बाग और घनी छाया की निस्तब्धता कहानी का आरंभिक माहौल बनाते हैं"),
     H.vstep(2, "पात्र के दो पहलू देखें", "एक ही शरत घर में शैतानी करता है और देवी, भोलू जैसे कमजोरों के लिए सहज दया दिखाता है"),
     H.vstep(3, "शीर्षक से जोड़ें", "घुमक्कड़ जैसा घूमने वाला बच्चा जो अनायास परोपकार करता है, ही आवारा मसीहा है")]))

C.append(H.concept(
    "khan.102.2", "Sharat ka Charitr-chitran", "Paatr",
    "Sharat prashnachanchal, jiddi aur jhukav wala balak hai jo pait par mar "
    "jaane ki baat karke mama ko dara deta hai, machhli ki tarah jameen par "
    "tairta hai, bhaunkne wale kutton se dosti karta hai aur pita ke daurte "
    "hue bhi apna khel nahi chhodta; saath hi dard dekhkar uski aankhein bhar "
    "aati hain.",
    "",
    "Sharat ke charitr mein avaidhta aur karuna ka sanyog hi kahani ka bal-man "
    "vigyan hai: bachcha jaanbujhkar bura nahi, bas Poori tarah svachhand hai.",
    "khan102.txt Sharat ke khel, shararat aur daya ke prasang",
    ["शरत के चरित्र की तीन प्रमुख विशेषताएँ बताइए",
     "शरत की शैतानियों के कौन-से प्रसंग कहानी में हैं",
     "किन प्रसंगों से शरत की दयालुता झलकती है",
     "शरत अपने पिता के डर को कैसे झेलता है",
     "शरत और अन्य बच्चों के संबंध कैसे हैं",
     "आवारा मसीहा बनने के लिए शरत में क्या गुण थे"],
    "verify_property",
    [H.vstep(1, "शरारत के प्रसंग जुटाएँ", "बग की सैर, पेड़ पर चढ़ना, खेलों के नए नियम और घर की चीजों से खिलवाड़ शरत की उछल के प्रमाण हैं"),
     H.vstep(2, "दया के प्रसंग जुटाएँ", "दुखी पर असहाय पात्रों के लिए शरत सहज रूप से कदम उठाता है, बिना किसी लाभ की सोच"),
     H.vstep(3, "मेल बैठाएँ", "यही बिना योजना वाली सहानुभूति उसे आवारा मसीहा कहलाती है")]))

C.append(H.concept(
    "khan.102.3", "Bhasha-Shaili: Sanvad aur Bal-bhasha", "Shaili",
    "Kahani ki bhasha mein sanvadon ka bojhal hissa hai; bachchon ki bolchal, "
    "khelon ke naye shabd (kait ij aaut, let maus play) aur parivarik baat-cheet "
    "ko aam bhasha mein likha gaya hai, jisse bal-man ki sprsh satik rehti hai.",
    "",
    "Samvad-pradhan shaili aur bachchon ki jaban ka prayog hi is kahani ko "
    "jeevant banata hai.",
    "khan102.txt sanvad-prasang aur shabdarth khand",
    ["आवारा मसीहा की भाषा-शैली की विशेषताएँ बताइए",
     "कहानी में संवादों की क्या भूमिका है",
     "बच्चों की बोलचाल के उदाहरण पाठ से दीजिए",
     "शब्दार्थ सूची किन शब्दों की दी गई है",
     "विष्णु प्रभाकर की कथा-शैली की पहचान क्या है",
     "बाल-कथा की भाषा में किन बातों का ध्यान रखना पड़ता है"],
    "verify_property",
    [H.vstep(1, "संवाद पहचानें", "अधिकांश कथा संवादों में आगे बढ़ती है, वर्णन न्यूनतम रहता है"),
     H.vstep(2, "भाषा का स्तर देखें", "खेल, विद्यालय और घर की बोलचाल के शब्द ज्यों-के-त्यों रखे गए हैं"),
     H.vstep(3, "प्रभाव मापें", "इससे पाठक सीधे बच्चों की दुनिया में पहुँचता है और बाल-मन आत्मस्थ होता है")]))

C.append(H.concept(
    "khan.102.4", "Sahityik Samay-Rekha ki Ganana", "Lekhak parichay",
    "Path ke ant mein diya lekhak parichay ke anusaar Vishnu Prabhakar ka janm "
    "san 1912 aur nidhan san 2009 mein hua; varshon ke antar se jeevan-avdhi "
    "aur kisi ghatna ke varsh se us samay ki aayu nikali jati hai.",
    "lifetime_years = death_year - birth_year",
    "Kahani ke lekhak ke samay ka hisab rakhna path ke sahi sandarbh ke liye "
    "zaruri hai.",
    "khan102.txt ant ka lekhak parichay (1912-2009)",
    ["विष्णु प्रभाकर की जीवन-अवधि कितने वर्ष की रही",
     "लेखक की आयु निकालने का सूत्र बताइए",
     "लेखक के जीवनकाल की गणना किस प्रकार होती है",
     "आवारा मसीहा किस काल की रचना की ओर संकेत करती है",
     "साहित्यिक समयरेखा क्या है",
     "विष्णु प्रभाकर के जीवनकाल का हिसाब लगाइए"],
    "compute",
    [H.cstep(1, "jeevan-avdhi ka sutra", "nidhan varsh se janm varsh ghatakar avdhi nikalti hai", "lifetime_years = death_year - birth_year"),
     H.cstep(2, "ghatna ke samay ki aayu", "ghatna varsh se janm varsh ghatakar us samay ki aayu aati hai", "age_at_event = event_year - birth_year")]))

W = [H.we(
    "we_khan102_1", "khan102.txt lekhak parichay (1912-2009)",
    "khan.102.4",
    "Vishnu Prabhakar ki jeevan-avdhi kitne varsh ki rahee?",
    {"birth_year": 1912, "death_year": 2009},
    [H.cstep(1, "maanon set karen", "janm 1912, nidhan 2009 lekhak parichay se", "birth_year = 1912"),
     H.cstep(2, "sutra lagayen", "jeevan-avdhi = nidhan - janm", "lifetime_years = death_year - birth_year")]),
     H.we(
    "we_khan102_2", "khan102.txt Sharat ke charitr prasang",
    "khan.102.2",
    "Sharat ke vyaktitv mein shararat aur daya kaise saath-saath chalti hain, "
    "path ke do prasangon se spast kijiye.",
    {},
    [H.vstep(1, "shararat ka prasang dein", "khel ki nayi shartein aur mama ke saath bagh ki sair uski uchhal-bukhar dikhati hain"),
     H.vstep(2, "daya ka prasang dein", "dard dekhkar uski aankhon se aansu aur asahay ke liye kadmo ka uthana uski karuna dikhati hai"),
     H.vstep(3, "nishkarsh dein", "dono pravrittiyan ek hi svachhand bal-man ke do chehre hain, isi se pātr kee jeevanta ta banti hai")],
    qtype="short_answer")]

E = [H.ex("ex_khan102_1", "khan102.txt prashna-abhyas, reworded",
          ["शरत को आवारा मसीहा क्यों कहा गया है",
           "शरत की शिक्षा-दीक्षा के प्रसंगों का उल्लेख कीजिए",
           "कहानी में माँ के व्यक्तित्व की कौन-सी झलकियाँ मिलती हैं",
           "शरत के खेलों से बच्चों की सोच कैसी प्रतिबिंबित होती है",
           "पाठ के आधार पर गांगुली परिवार का वातावरण चित्रित कीजिए"]),
     H.ex("ex_khan102_2", "khan102.txt shabdarth aur chintan, reworded",
          ["यायावर प्रकृति, अपरिग्रही, स्वल्पाहारी जैसे शब्दों के अर्थ पाठ के संदर्भ में लिखिए",
           "प्रत्युत्पन्नमति का अर्थ समझाकर शरत के किस व्यवहार से जोड़िए",
           "कहानी का कौन-सा प्रसंग आपको अपने बचपन से जोड़ता है, कारण सहित लिखिए",
           "आवारा मसीहा की कथ्य-दृष्टि से बाल-साहित्य में स्थान बताइए",
           "संवादों को कथा के लय में पढ़ते समय कौन-सी सावधानियाँ रखें"])]

H.emit("khan102", H.make_cat(
    "khan102", "आवारा मसीहा",
    C, W, E))

print("draft1 done")
