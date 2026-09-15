# -*- coding: utf-8 -*-
"""Batch-1 builder: class 6 English (Poorvi) fepr101-105."""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _b1_build import build, steps, we, exr

# ---- reusable verify_property step templates (author-first) ----
def theme_steps():
    return steps(
        ("recall what the main character does", "Retell the central events in one or two sentences, naming the main character."),
        ("trace the turn in the story", "Point out the moment where the character changes or learns something."),
        ("state the message", "Say what the story teaches about life in one clear sentence."))

def char_steps():
    return steps(
        ("collect actions and words", "List what the character does and says at key points of the story."),
        ("infer the trait behind each action", "Match each action to a quality such as kindness, honesty or courage."),
        ("support with evidence", "Quote or point to the exact moment in the text that shows the trait."))

def seq_steps():
    return steps(
        ("pick out the main events", "List the events that move the story forward, each in a few words."),
        ("arrange them in time order", "Number the events from what happened first to what happened last."),
        ("check against the text", "Reread the story to confirm no event is misplaced or missing."))

def vocab_steps():
    return steps(
        ("find the word in its line", "Locate the sentence where the new word appears."),
        ("use the surrounding clues", "Read before and after the word to see what sense the sentence needs."),
        ("replace and test", "Swap in the guessed meaning; if the sentence still makes sense, the meaning is right."))

# ================= fepr101: A Bottle of Dew =================
c = []
c.append(dict(
    title="Hard Work versus Magic Shortcuts",
    section="A Bottle of Dew, Let us read",
    definition="The theme of the story is that real wealth grows from patient labour, not from any magical shortcut. Rama Natha chases a potion that turns things to gold, yet the plantation he tends along the way earns the gold for him.",
    formula="theme = hard work + patience, not magic",
    key_idea="The sage's trick makes Rama Natha work his land for six years; the banana crop, not magic, creates the wealth.",
    patterns=[
        "what is the message of the story a bottle of dew",
        "how does the sage teach rama natha the value of hard work",
        "why does the sage play a trick on rama natha instead of telling the truth",
        "what created the wealth of rama natha in the end",
        "why is there no magic potion that can turn things into gold",
        "what lesson does the story a bottle of dew teach about shortcuts"],
    stype="verify_property", steps=theme_steps()))
c.append(dict(
    title="Rama Natha and Madhumati: Character Study",
    section="A Bottle of Dew, Let us read",
    definition="Rama Natha begins as a dreamer who wastes his inheritance chasing a magic potion and grows into a hardworking farmer. Madhumati is the practical, worried wife whose market sense turns the banana crop into money.",
    formula="",
    key_idea="Rama Natha changes from a dreamer into a willing worker, while Madhumati supports him by selling the fruit.",
    patterns=[
        "draw a character sketch of rama natha",
        "how does rama natha change by the end of the story",
        "what role does madhumati play in the family's success",
        "why was madhumati worried about her husband",
        "which qualities help rama natha succeed in the end",
        "compare rama natha before and after meeting the sage"],
    stype="verify_property", steps=char_steps()))
c.append(dict(
    title="Sequence of Story Events",
    section="A Bottle of Dew, Let us read and reflect",
    definition="The story runs in a fixed order: a lazy heir hears of a potion, plants banana plants to gather dew, collects five litres over six years, and learns the trick only when the potion fails but a box of gold coins appears.",
    formula="",
    key_idea="Ordering events, like giving the bottle to the sage before the failure of the potion, shows how the plot builds to the reveal.",
    patterns=[
        "arrange the events of a bottle of dew in the correct order",
        "what happened after rama natha collected five litres of dew",
        "which event starts the story of rama natha",
        "how does the story end for rama natha and the sage",
        "what did the sage do when he received the bottle of dew",
        "when did rama natha realise the trick played on him"],
    stype="verify_property", steps=seq_steps()))
c.append(dict(
    title="Word Meanings in Context: Potion, Dew and Chant",
    section="A Bottle of Dew, Let us learn",
    definition="New words are understood from the sentence around them: a potion is a liquid with magical properties, dew is night moisture on leaves, and to chant is to repeat a word or phrase again and again.",
    formula="",
    key_idea="Context clues around a new word, like leaves and night for dew, give its meaning without a dictionary.",
    patterns=[
        "what does the word potion mean in the story",
        "what is dew and where does it form",
        "what does it mean to chant magic words",
        "find the meaning of tended and muttered from the story",
        "use the word precious in a sentence of your own",
        "which word in the story means spoke in a low voice"],
    stype="verify_property", steps=vocab_steps()))

ex101 = [exr("ex1", "fepr101.txt, Let us think and reflect (A Bottle of Dew)", [
    "Why did Rama Natha keep trying even when people cheated him about the potion?",
    "Arrange in order: the sage smiled, the bottle was handed over, drops fell on a copper vessel, the magic words were spoken, the wait for gold began.",
    "True or false: Madhumati was troubled by her husband's obsession with the potion.",
    "What did the sage ask Rama Natha to do to make the potion?",
    "Fill in the before-and-after table about Rama Natha's habits."]),
    exr("ex2", "fepr101.txt, Let us discuss (II)", [
    "Why did Rama Natha feel angry at the end?",
    "How did the couple build their wealth over six years?"])]

we101 = [
    we("ex1", "fepr.1.1", "fepr101.txt, end of the story", "verify_property",
       "Why did the sage play a trick on Rama Natha?",
       {}, [
        {"step": 1, "action": "recall the sage's own words",
         "explain": "The sage says a direct truth would not have been believed by Rama Natha."},
        {"step": 2, "action": "state the purpose of the trick",
         "explain": "Only six years of work on the plantation could show Rama Natha that effort, not magic, makes money."}]),
    we("ex2", "fepr.1.3", "fepr101.txt, Let us think and reflect I.2(i)", "verify_property",
       "Put these in order: the sage smiled; the bottle was given; drops fell on the vessel; words were murmured; the wait began.",
       {}, [
        {"step": 1, "action": "mark the first act",
         "explain": "Rama Natha must hand over the bottle before anything else can happen."},
        {"step": 2, "action": "follow the text order",
         "explain": "The sage smiles, mutters over the water, returns it; then drops fall on the copper vessel and the wait begins."}])]

p = build("fepr101", 6, "english", "A Bottle of Dew", c, we101, ex101)
print("wrote", p)

# ================= fepr102: The Unlikely Best Friends =================
c = []
c.append(dict(
    title="Friendship between Gajaraj and Buntee",
    section="The Unlikely Best Friends, Let us read",
    definition="The story shows friendship as care given freely between two very different animals: an elephant shares food, baths and rides with a stray dog, and the dog refuses to stay away from him even when taken home.",
    formula="friend = one who shares, plays and misses you",
    key_idea="Gajaraj and Buntee choose each other; both stop eating when separated, which proves the bond.",
    patterns=[
        "how did the friendship between gajaraj and buntee begin",
        "why is the friendship of an elephant and a dog called unlikely",
        "what did gajaraj and buntee do together",
        "how do the two friends react when they are separated",
        "what does the story the unlikely best friends say about friendship",
        "who were friends at the end of the story and how did it happen"],
    stype="verify_property", steps=theme_steps()))
c.append(dict(
    title="Gajaraj the Elephant: Character and Feelings",
    section="The Unlikely Best Friends, Let us read",
    definition="Gajaraj is a royal elephant who lacks nothing except company; his sadness without a friend and his refusal to eat show that affection matters more to him than comfort.",
    formula="",
    key_idea="Actions such as sharing food and lifting Buntee with the trunk reveal Gajaraj's gentle, playful nature.",
    patterns=[
        "draw a character sketch of gajaraj the elephant",
        "why was gajaraj sad in spite of royal comforts",
        "how did gajaraj show that he loved buntee",
        "why did gajaraj stop eating his food",
        "what does the mahout do for gajaraj every day",
        "how did gajaraj welcome buntee back to the stable"],
    stype="verify_property", steps=char_steps()))
c.append(dict(
    title="Caretaker versus Friend",
    section="The Unlikely Best Friends, Let us think and reflect",
    definition="The mahout feeds and bathes Gajaraj as a good caretaker, yet a friend is the one you play with and miss. The story draws this line clearly and then erases it when mahout and farmer also become friends.",
    formula="",
    key_idea="Service meets the body's needs, friendship meets the heart's needs; the story needs both.",
    patterns=[
        "what is the difference between a friend and a caretaker",
        "why is the mahout called a good caretaker but not a friend",
        "who else becomes friends at the end of the story",
        "why does the farmer let buntee go back to the elephant",
        "how does the mahout come to know that gajaraj is sad",
        "why do you think the farmer and the mahout hug each other"],
    stype="verify_property", steps=theme_steps()))
c.append(dict(
    title="Word Meanings: Strayed, Munching and Winced",
    section="The Unlikely Best Friends, Let us learn",
    definition="The story's glossary words are worked out from context: strayed means came by mistake, munching means chewing, and winced means shrunk back in pain or distress.",
    formula="",
    key_idea="Each new word sits beside clues, like the dog arriving tired and hungry, that fix its meaning.",
    patterns=[
        "what does strayed mean in the story",
        "what was the dog munching when gajaraj saw him",
        "why did the dog yelp and what does yelped mean",
        "find the meaning of accompanied and delighted",
        "which word means held closely in the story",
        "use the word crumbs in your own sentence"],
    stype="verify_property", steps=vocab_steps()))

ex102 = [exr("ex1", "fepr102.txt, Let us think and reflect", [
    "Complete the analogy: mahout is to kind as Gajaraj is to what?",
    "Give two examples that show Gajaraj was happy to have a friend.",
    "How did the mahout discover that Gajaraj was sad?",
    "Why do you think Buntee licked the farmer's hand before running away?",
    "What was unlikely about the friendship of Gajaraj and Buntee?"]),
    exr("ex2", "fepr102.txt, Let us learn", [
    "Form opposites of words from the story using prefixes like un-, in-, dis- and mis-."])]

we102 = [
    we("ex1", "fepr.1.3", "fepr102.txt, Let us think and reflect I.2", "verify_property",
       "Why did the farmer remove the rope from Buntee's neck?",
       {}, [
        {"step": 1, "action": "note the dog's state",
         "explain": "Buntee had not touched food since he was brought home."},
        {"step": 2, "action": "connect it to friendship",
         "explain": "The farmer sees the dog is missing his friend and lets him go, saying he cannot watch him go hungry."}]),
    we("ex2", "fepr.1.2", "fepr102.txt, Let us discuss I", "verify_property",
       "How did Gajaraj treat the tired visitor on the first evening?",
       {}, [
        {"step": 1, "action": "find the first meeting",
         "explain": "A hungry stray enters the stable late one evening."},
        {"step": 2, "action": "list the acts of care",
         "explain": "Gajaraj pushes his own food towards the dog and lets him sleep in the stable."}])]

p = build("fepr102", 6, "english", "The Unlikely Best Friends", c, we102, ex102)
print("wrote", p)

# ================= fepr103: Neem Baba =================
c = []
c.append(dict(
    title="Uses of the Neem Tree",
    section="Neem Baba, Let us read II",
    definition="Neem serves health and farming together: twigs clean teeth, leaves fight germs in measles, bark and flowers make medicines, seed powder shields crops from locusts and termites, and oil goes into soap and toothpaste.",
    formula="neem_uses = medicines + crop protection + daily products",
    key_idea="Every part of the neem, from leaf to root, has a use, which is why it is called nature's gift.",
    patterns=[
        "how is the neem tree useful to farmers",
        "mention some uses of the neem tree",
        "why are neem leaves advised for a measles patient",
        "how does neem seed powder protect crops",
        "which parts of the neem tree are used to make medicines",
        "how does neem stop mosquitoes from breeding in stagnant water"],
    stype="verify_property", steps=[
        ("scan for the uses", "Collect each use of neem as the dialogue mentions it, part by part."),
        ("sort them by purpose", "Group the uses under health, farming and daily life."),
        ("sum up the value", "State in one line why people call neem useful and precious.")]))
c.append(dict(
    title="Neem Baba: Names and Origins",
    section="Neem Baba, Let us read I",
    definition="The neem tree was born millions of years ago in North India or Myanmar and spread across Asia, Africa and parts of America. Its Sanskrit names include Arishta and Nimba, Iranians gave the name Neem, and scientists call it the bitter grace of God and the magic tree.",
    formula="",
    key_idea="A name story, from Arishta the healer to Nimb and Neem, carries the tree's fame across languages.",
    patterns=[
        "where was the neem tree born and where is it found now",
        "which sanskrit names does the neem tree have",
        "who gave the neem tree the name neem",
        "why do scientists call the neem the magic tree",
        "what are the different names of neem in india",
        "why is neem called arishta or the one who cures diseases"],
    stype="verify_property", steps=[
        ("trace the origin", "Note the birthplace and spread of the tree from the dialogue."),
        ("list the names with their givers", "Arrange the names under Sanskrit, Iranian, Hindi and scientist groups."),
        ("explain the naming idea", "Say why each name fits the tree's healing nature.")]))
c.append(dict(
    title="Reading a Dialogue: Amber and Neem Baba",
    section="Neem Baba, Let us read",
    definition="The chapter is written as a conversation between a child and a tree that speaks; questions by Amber pull out facts one by one, which is how a dialogue text organises information.",
    formula="",
    key_idea="In a dialogue, each speaker's turn gives one new fact; following the turns gives the whole picture.",
    patterns=[
        "who are the two speakers in the chapter neem baba",
        "why does amber call the tree neem baba",
        "how does the dialogue form help share facts about neem",
        "what question does amber ask about farmers",
        "what warning does neem baba give about home remedies",
        "what does neem baba wish for amber at the end"],
    stype="verify_property", steps=[
        ("identify the speakers", "Name who speaks and what each one wants from the talk."),
        ("follow the turns", "Track how one question leads to one new fact in each turn."),
        ("collect the outcome", "State what the child learns by the end of the conversation.")]))
c.append(dict(
    title="Word Meanings: Twigs, Measles and Stagnant",
    section="Neem Baba, Let us learn",
    definition="Context gives the meanings: twigs are small thin branches, measles is a disease with fever and red spots, stagnant water is water that does not flow, and purifies means removes harmful particles.",
    formula="",
    key_idea="Gloss pairs in the margin mirror the clues inside the sentence, so meaning can be checked both ways.",
    patterns=[
        "what are twigs according to the chapter",
        "what kind of disease is measles",
        "what does stagnant water mean",
        "what does purifies the air mean here",
        "find the meaning of cost-effective from the text",
        "use the word breeds in a sentence about mosquitoes"],
    stype="verify_property", steps=vocab_steps()))

ex103 = [exr("ex1", "fepr103.txt, Let us think and reflect", [
    "Write any two facts about the neem tree that surprise you the most.",
    "Complete: Amber played in the shade of what?",
    "Neem seed powder protects crops from which pests?",
    "Why is the story of the neem tree thought-provoking?",
    "Which parts of the neem tree can be used to make medicines?"])]

we103 = [
    we("ex1", "fepr.1.1", "fepr103.txt, Let us read II", "verify_property",
       "How does neem seed powder help rice farmers?",
       {}, [
        {"step": 1, "action": "find the farming passage",
         "explain": "Neem Baba explains that seed powder mixed with water is sprayed on plants."},
        {"step": 2, "action": "list the three benefits",
         "explain": "Locusts stop eating the crop, mosquito breeding falls in standing water, and termites are kept away."}]),
    we("ex2", "fepr.1.2", "fepr103.txt, Let us read I", "verify_property",
       "Why is the name Arishta suitable for the neem tree?",
       {}, [
        {"step": 1, "action": "translate the name",
         "explain": "Arishta means the one who cures diseases."},
        {"step": 2, "action": "match it to the tree's work",
         "explain": "Neem leaves, bark and roots make medicines, so the healer name fits."}])]

p = build("fepr103", 6, "english", "Neem Baba", c, we103, ex103)
print("wrote", p)

# ================= fepr104: Change of Heart =================
c = []
c.append(dict(
    title="Prabhat's Change of Heart",
    section="Change of Heart, Let us read",
    definition="Prabhat starts as a boy who plays only to win and cannot bear defeat; watching Surya lose cheerfully and still enjoy basketball teaches him that games are for joy, and he becomes a true sportsman.",
    formula="old way = play only to win; new way = play to enjoy",
    key_idea="A defeat taken lightly by a friend turns Prabhat's fear of losing into the joy of playing.",
    patterns=[
        "how did prabhat change by the end of the story",
        "why is the story called change of heart",
        "what lesson does prabhat learn from surya",
        "why did prabhat refuse to play games he might lose",
        "how did prabhat cheat in the badminton match",
        "why was prabhat unable to sleep after winning the match"],
    stype="verify_property", steps=theme_steps()))
c.append(dict(
    title="Surya and the Sporting Spirit",
    section="Change of Heart, Let us read II",
    definition="Surya plays brilliantly at badminton and hopelessly at basketball with the same happy smile; his sporting spirit lies in enjoying the game for its own sake, not in the scoreboard.",
    formula="",
    key_idea="Enjoyment that does not depend on winning is the mark of sporting spirit, as Surya shows every day.",
    patterns=[
        "draw a character sketch of surya",
        "how did surya react to losing the badminton match",
        "what was special about the way surya played basketball",
        "what does sporting spirit mean in this story",
        "how was surya's attitude different from prabhat's",
        "why did surya not feel bad about losing"],
    stype="verify_property", steps=char_steps()))
c.append(dict(
    title="Winning versus Enjoying the Game",
    section="Change of Heart, Let us think and reflect",
    definition="The story argues that a scoreboard is not needed to enjoy a game; trying to do well and enjoying every moment matter more than the result of the match.",
    formula="enjoyment = effort + fun, not victory alone",
    key_idea="Prabhat wins by cheating yet feels empty, which proves that victory without joy is hollow.",
    patterns=[
        "is winning the only aim of playing a game justify",
        "why did winning by cheating not make prabhat happy",
        "what matters more than the scoreboard in a game",
        "was prabhat's early approach to games healthy why or why not",
        "why is sporting spirit important in life",
        "how does enjoyment change the way we play"],
    stype="verify_property", steps=theme_steps()))
c.append(dict(
    title="Word Meanings: Phenomenon, Significant and Defeat",
    section="Change of Heart, Let us learn",
    definition="From context, a phenomenon is someone with special qualities, significant means important, defeat means loss, and kept a close watch on means observed carefully.",
    formula="",
    key_idea="Words like phenomenon and significant raise the meaning of a sports story beyond the score.",
    patterns=[
        "what does phenomenon mean in this story",
        "why was the last friday significant for prabhat",
        "what is the meaning of defeat here",
        "find the meaning of conducted and sensed",
        "which word tells that surya had no skill in basketball",
        "use the word opponent in your own sentence"],
    stype="verify_property", steps=vocab_steps()))

ex104 = [exr("ex1", "fepr104.txt, Let us think and reflect", [
    "How did Prabhat's fear of losing spoil his enjoyment of games at first?",
    "Why do you think Prabhat cheated to win against Surya?",
    "How did Surya's attitude towards games differ from Prabhat's?",
    "Was Prabhat's approach to games healthy? Give reasons.",
    "Explain why the title Change of Heart suits the story."])]

we104 = [
    we("ex1", "fepr.1.1", "fepr104.txt, Let us read II", "verify_property",
       "What did Prabhat observe about Surya in the following days?",
       {}, [
        {"step": 1, "action": "watch the basketball game",
         "explain": "Surya cannot score for ten minutes yet keeps smiling and playing."},
        {"step": 2, "action": "draw the lesson",
         "explain": "Prabhat sees that enjoyment never depends on the score, and this changes him."}]),
    we("ex2", "fepr.1.3", "fepr104.txt, Let us read I", "verify_property",
       "Why did Prabhat play only those games he was sure to win?",
       {}, [
        {"step": 1, "action": "recall his feeling",
         "explain": "Winning felt so good that losing felt terrible to him."},
        {"step": 2, "action": "state the habit",
         "explain": "To protect that feeling he avoided any game he sensed he could lose."}])]

p = build("fepr104", 6, "english", "Change of Heart", c, we104, ex104)
print("wrote", p)

# ================= fepr105: Hamara Bharat, Incredible India =================
c = []
c.append(dict(
    title="Unity in Diversity: Ek Bharat Shreshtha Bharat",
    section="Hamara Bharat, Incredible India!",
    definition="Bharat is presented as a land of many languages, festivals and art forms held together by one bond; the Ek Bharat, Shreshtha Bharat programme lets children meet friends from every state and see the unity inside the diversity.",
    formula="",
    key_idea="Many cultures and traditions live side by side, and knowing each other's art makes the nation one.",
    patterns=[
        "what is the ek bharat shreshtha bharat programme about",
        "why is india called a land of unity in diversity",
        "what has bharat been known for since ancient times",
        "which geographical features of bharat does the passage mention",
        "why do travellers find india attractive",
        "what advice does the passage give to the people of india"],
    stype="verify_property", steps=theme_steps()))
c.append(dict(
    title="Traditional Art Forms: Aipan, Dhokra and Kondapalli",
    section="Kalakritiyon ka Bharat, Let us read II",
    definition="Each state shows a craft: Aipan of Uttarakhand draws rice-flour designs on geru walls, Dhokra of Odisha casts brass figures through a wax mould, Kerala shapes coconut shells, and Andhra's Kondapalli toys are carved from soft hill wood.",
    formula="",
    key_idea="Folk arts carry the culture of a place; materials and steps of each craft grow from local life and nature.",
    patterns=[
        "describe the aipan folk art of uttarakhand",
        "how is a dhokra metal figure made step by step",
        "what things are made from coconut shell craft in kerala",
        "which wood is used for kondapalli toys and why",
        "match each child with the state and the art form presented",
        "why is coconut shell craft called biodegradable"],
    stype="verify_property", steps=[
        ("pick out each craft", "Note the state, the maker and the material of every art form."),
        ("follow the making steps", "Trace the order from raw material to finished piece for one craft."),
        ("compare the crafts", "Say what is common, such as natural materials and skill passed down.")]))
c.append(dict(
    title="Order Words in Craft Process Writing",
    section="Kalakritiyon ka Bharat, Let us learn",
    definition="Process writing uses order words such as to begin, first, then, after that, next and finally to fix the steps of a craft, so the reader can repeat the making exactly.",
    formula="process = first step + then steps + finally last step",
    key_idea="Order words turn a list of actions into a clear sequence anyone can follow.",
    patterns=[
        "which words show the order of steps in a process description",
        "rewrite the steps of dhokra casting using order words",
        "why do we use words like first then and finally in process writing",
        "what comes after the wax carving in dhokra craft",
        "what is the final step in making kondapalli toys",
        "describe the first step of coconut shell craft"],
    stype="verify_property", steps=[
        ("spot the order words", "Underline to begin, first, then, next and finally in the passage."),
        ("tie each word to a step", "Match every order word with the craft action it introduces."),
        ("retell the process", "Repeat the whole craft using the order words as signposts.")]))
c.append(dict(
    title="Ila Sachani: Embroidering Dreams with her Feet",
    section="Ila Sachani, Let us read",
    definition="Ila Sachani, born without the use of her hands, learns to stitch with her feet and rises from a village girl into a nationally admired embroidery artist, showing that will can beat physical limits.",
    formula="",
    key_idea="A disability does not end ability; patience and family support turn Ila's feet into her hands.",
    patterns=[
        "how did ila sachani learn to embroider with her feet",
        "what difficulty was ila sachani born with",
        "who encouraged ila in her early attempts",
        "how did ila's work become known outside her village",
        "what does the story of ila sachani teach us",
        "which awards or recognition did ila sachani receive"],
    stype="verify_property", steps=[
        ("note the challenge", "State the physical difficulty Ila faces from birth."),
        ("follow her response", "Trace how she turns her feet into tools of art step by step."),
        ("draw the message", "Say what her success tells about courage and determination.")]))

ex105 = [exr("ex1", "fepr105.txt, Let us think and reflect (Kalakritiyon ka Bharat)", [
    "Fill in: the designs for Aipan are taken from which two sources?",
    "Why is Dhokra metal craft called very old?",
    "Why does a base matter in coconut shell craft?",
    "Which materials go into Kondapalli toys besides soft wood?",
    "Why does Akanksha's family make Aipan?"]),
    exr("ex2", "fepr105.txt, Let us discuss (Hamara Bharat)", [
    "What is special about people living in unison in Bharat?",
    "What advice is given to everyone in the passage?"])]

we105 = [
    we("ex1", "fepr.1.2", "fepr105.txt, Let us read II (Dhokra)", "verify_property",
       "Why does the molten brass take the shape of the figure in Dhokra craft?",
       {}, [
        {"step": 1, "action": "recall the wax stage",
         "explain": "The clay-covered figure is heated so the wax melts and flows out, leaving a hollow mould."},
        {"step": 2, "action": "state the casting idea",
         "explain": "Liquid brass poured into the hollow sets in exactly the space the wax left behind."}]),
    we("ex2", "fepr.1.1", "fepr105.txt, opening passage", "verify_property",
       "What makes Bharat attractive to travellers, according to the passage?",
       {}, [
        {"step": 1, "action": "list the natural gifts",
         "explain": "Rivers, lakes, high mountains and green forests full of life are named."},
        {"step": 2, "action": "add the human bond",
         "explain": "People living in unison and a rich, diverse culture complete the attraction."}])]

p = build("fepr105", 6, "english", "Hamara Bharat, Incredible India", c, we105, ex105)
print("wrote", p)
print("FEPR DONE")
