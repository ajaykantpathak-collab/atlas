# -*- coding: utf-8 -*-
"""Batch-1 builder: class 7 English (Poorvi) gepr101-105."""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _b1_build import build, steps, we, exr


def theme_steps():
    return steps(
        ("recall the central events", "Retell what happens in one or two sentences with the main character named."),
        ("trace the turn or message", "Point to the moment of change or the idea the text keeps returning to."),
        ("state the theme", "Say the message of the text in one clear sentence of your own."))


def char_steps():
    return steps(
        ("collect actions and words", "List what the character does and says at the key moments."),
        ("infer the traits", "Match each action to a quality such as courage, kindness or curiosity."),
        ("cite the evidence", "Point to the exact lines of the text that support each trait."))


def vocab_steps():
    return steps(
        ("locate the word", "Find the sentence in which the new word appears."),
        ("read the clues around it", "Use the words before and after to sense what meaning fits."),
        ("test a replacement", "Swap in the guessed meaning; if the sentence still works, it is right."))


# ================= gepr101: The Day the River Spoke =================
c = []
c.append(dict(
    title="Jahnavi's Dream of Going to School",
    section="The Day the River Spoke, Let us read",
    definition="Jahnavi, nearly ten and always told 'maybe later', dreams of learning to read like her brothers; with the River's push she slips into a classroom, and the teacher's visit opens the school's door for her.",
    formula="dream + courage = school for jahnavi",
    key_idea="The story stands for every girl kept from school: one brave step, backed by support, ends the waiting.",
    patterns=[
        "what was jahnavi's dream and why was it important",
        "why was jahnavi not sent to school for so long",
        "how did jahnavi gather courage to enter the school",
        "what does the river tell jahnavi about girls and boys",
        "how does the teacher help jahnavi's dream come true",
        "what does jahnavi promise to do when she grows up"],
    stype="verify_property", steps=theme_steps()))
c.append(dict(
    title="The River as Friend and Guide",
    section="The Day the River Spoke, Let us read",
    definition="The River is written as a kind, knowing companion who listens to Jahnavi's sorrows, answers her whys, and nudges her to act for herself, reminding her that it is up to her.",
    formula="",
    key_idea="A friend guide does not solve the problem but gives courage and a plan, as the River does for Jahnavi.",
    patterns=[
        "how does the river help jahnavi fulfil her dream",
        "which qualities of the river does the story highlight",
        "why does the river say it is up to you to jahnavi",
        "what does the river know about jahnavi's daily visits",
        "why does the writer give the river a human voice",
        "what answers does the river give to jahnavi's questions"],
    stype="verify_property", steps=char_steps()))
c.append(dict(
    title="Overcoming Fear: Jahnavi's First Step",
    section="The Day the River Spoke, Let us think and reflect",
    definition="Jahnavi fears being chased out of school, yet she walks in, sits at the back and listens; the repeated words 'I couldn't' give way to 'I did it', showing fear beaten by action.",
    formula="",
    key_idea="Courage is not the absence of fear but doing the feared thing despite a dry throat, as Jahnavi shows.",
    patterns=[
        "why was jahnavi scared to go to school",
        "what did jahnavi do on her first day at the school door",
        "what does the repetition of i couldn't tell us about jahnavi",
        "why does the river laugh when jahnavi says she would be scared",
        "how did jahnavi feel after entering the classroom",
        "what change does jahnavi report to the river at the end"],
    stype="verify_property", steps=[
        ("name the fear", "State exactly what Jahnavi is afraid will happen to her."),
        ("follow her action", "Describe the morning she enters the school and what she does there."),
        ("contrast the outcome", "Compare her words before and after to show the fear was beaten.")]))
c.append(dict(
    title="Word Meanings: Slithered, Murmuring and Thicket",
    section="The Day the River Spoke, Let us learn",
    definition="Nature words carry the setting: slithered means moved by sliding from side to side, murmuring means speaking in a low voice, a thicket is a dense group of bushes and trees, and wailed means complained loudly.",
    formula="",
    key_idea="Sensory verbs like slithered and shrieked place the reader beside the river with Jahnavi.",
    patterns=[
        "what does slithered mean in the opening lines",
        "which creature slithered down to the river edge",
        "what is a thicket according to the gloss",
        "find the meaning of conspiratorially from the story",
        "which word means made a high pitched sound",
        "use the word startled in a sentence of your own"],
    stype="verify_property", steps=vocab_steps()))

ex = [exr("ex1", "gepr101.txt, Let us think and reflect", [
    "Why does the writer describe the sights and sounds of nature so carefully at the start?",
    "How did the River know so much about Jahnavi?",
    "What can you infer about Jahnavi's age and the school from her words that she is too old now?",
    "Why should Jahnavi follow the River's advice?",
    "State the main message of the story."]),
    exr("ex2", "gepr101.txt, Try Again poem and Let us learn", [
    "What does King Bruce learn from the spider in the poem Try Again?",
    "Pick the sound words from the text and match them to their meanings."])]

wex = [
    we("ex1", "gepr.1.2", "gepr101.txt, Let us read II", "verify_property",
       "Why does the River tell Jahnavi that little girls can do as much as little boys?",
       {}, [
        {"step": 1, "action": "recall the doubt",
         "explain": "Jahnavi believes she is too old and too scared to be allowed in school."},
        {"step": 2, "action": "read the River's reply",
         "explain": "The River points out that girls swim as fast as boys, so nothing but habit keeps them back."}]),
    we("ex2", "gepr.1.3", "gepr101.txt, Let us read III", "verify_property",
       "How did the teacher respond when she found Jahnavi in the class?",
       {}, [
        {"step": 1, "action": "recall the scene",
         "explain": "Jahnavi creeps in and sits quietly at the back with little Appu asleep on her shoulder."},
        {"step": 2, "action": "note the teacher's promise",
         "explain": "Instead of turning her out, the teacher says she will speak to Jahnavi's father and find a way."}])]

p = build("gepr101", 7, "english", "The Day the River Spoke", c, wex, ex)
print("wrote", p)

# ================= gepr102: Animals, Birds, and Dr. Dolittle =================
c = []
c.append(dict(
    title="Doctor Dolittle Becomes an Animal Doctor",
    section="Animals, Birds, and Dr. Dolittle, Let us read",
    definition="A stomach-ached visitor and a wise parrot convince John Dolittle that his true gift is with animals; he learns their languages, gives up his people's practice, and becomes the most famous animal doctor in the world.",
    formula="",
    key_idea="A career changes when talent meets need: Dolittle knows animals so well that treating them is the natural work for him.",
    patterns=[
        "why does the cat's food man ask doctor dolittle to become an animal doctor",
        "how did doctor dolittle learn the language of the animals",
        "why did doctor dolittle give up being a people's doctor",
        "how did doctor dolittle become famous among animals",
        "what made it easy for the doctor to cure sick animals",
        "describe how doctor dolittle treated the plough horse"],
    stype="verify_property", steps=theme_steps()))
c.append(dict(
    title="Polynesia: Teacher of Bird Language",
    section="Animals, Birds, and Dr. Dolittle, Let us read I",
    definition="Polynesia the parrot speaks both people's language and bird language; she insists animals can talk, gives the Doctor the Birds' A.B.C., and explains that animals also speak with ears, feet and tails.",
    formula="",
    key_idea="A good teacher opens a hidden world; Polynesia's patient word-by-word lessons turn doubt into skill.",
    patterns=[
        "how can we say polynesia was a good trainer of animal language",
        "what does ka ka oi ee fee fee mean in bird language",
        "why had polynesia never used bird language with the doctor earlier",
        "how do dogs ask questions according to polynesia",
        "what are the two languages polynesia can speak",
        "what does polynesia say about animals speaking without their mouths"],
    stype="verify_property", steps=char_steps()))
c.append(dict(
    title="Listening to Animals: The Horse's Lesson",
    section="Animals, Birds, and Dr. Dolittle, Let us read II",
    definition="The plough horse shows why animal patients suffer: vets give pills without asking, because animals cannot complain. Able to talk with the horse at last, Dolittle learns the real trouble is failing eyesight and orders green spectacles.",
    formula="",
    key_idea="Right treatment starts with listening; the horse's complaint that anyone thinks he can doctor animals is the heart of the story.",
    patterns=[
        "what was the real problem of the plough horse",
        "why did the horse need green spectacles",
        "what does the horse say about doctoring animals",
        "why does the horse say animals are taken for granted",
        "what became a common sight in puddleby afterwards",
        "how did the doctor give individual attention to each animal"],
    stype="verify_property", steps=[
        ("find the patient's complaint", "Note what the horse says is wrong and what the earlier vet had done."),
        ("match cure to cause", "Check that spectacles, not pills, answer the real need."),
        ("draw the general lesson", "State why listening matters in every kind of doctoring.")]))
c.append(dict(
    title="Word Meanings: Scholar, Cellar and Countryside",
    section="Animals, Birds, and Dr. Dolittle, Let us learn",
    definition="Story words grow from context: a scholar is a learned person, a cellar is a room below ground level, and the countryside is the rural area around a town.",
    formula="",
    key_idea="Place words like cellar and countryside map the little house at Puddleby where the animals crowd in.",
    patterns=[
        "what does scholar mean in this chapter",
        "where did the mice wait for the doctor",
        "what is a cellar according to the gloss",
        "what does countryside mean here",
        "find the meaning of cracker from the text",
        "use the word vet in a sentence of your own"],
    stype="verify_property", steps=vocab_steps()))

ex = [exr("ex1", "gepr102.txt, Let us think and reflect", [
    "Why can 'Good Gracious' in the Doctor's cry be replaced by 'gosh'?",
    "Complete the analogy: digging is to flower bed as what is to field?",
    "Do you agree that a really good animal doctor needs to be cleverer than a people's doctor? Give reasons.",
    "Arrange the ten events of the Dolittle story in the correct order.",
    "What challenges might Doctor Dolittle face as more and more animals arrive?"])]

wex = [
    we("ex1", "gepr.1.3", "gepr102.txt, Let us read II", "verify_property",
       "Why were farm animals seen wearing glasses around Puddleby?",
       {}, [
        {"step": 1, "action": "trace the first case",
         "explain": "The plough horse admitted to failing eyesight once someone could understand him."},
        {"step": 2, "action": "follow the spread",
         "explain": "Other animals told their friends about the talking doctor, so green spectacles became the norm in the countryside."}]),
    we("ex2", "gepr.1.1", "gepr102.txt, Let us read I", "verify_property",
       "What advice does Polynesia give the Doctor after the visitor leaves?",
       {}, [
        {"step": 1, "action": "recall the visitor's point",
         "explain": "The Cat's-food-Man says Dolittle knows animals better than the local vets."},
        {"step": 2, "action": "state the parrot's push",
         "explain": "Polynesia tells him to give up silly people and take care of animals, who will soon recognise his worth."}])]

p = build("gepr102", 7, "english", "Animals, Birds, and Dr. Dolittle", c, wex, ex)
print("wrote", p)

# ================= gepr103: My Brother's Great Invention =================
c = []
c.append(dict(
    title="Anand the Young Inventor",
    section="My Brother's Great Invention, Let us read",
    definition="Anand, a boy who believes he is a scientist, fills the house with homemade gadgets, from a water-bag burglar alarm to a full-size time machine, and never doubts that the next invention will work.",
    formula="",
    key_idea="Curiosity plus overconfidence makes Anand both a nuisance and a delight; his tinkering never stops.",
    patterns=[
        "draw a character sketch of anand the young inventor",
        "why does anand love tinkering with gadgets",
        "how did anand's burglar alarm backfire on his father",
        "what does anand do when he is in one of his inventing binges",
        "why did papa lock up his toolbox",
        "what is anand's new project at the end of the story"],
    stype="verify_property", steps=char_steps()))
c.append(dict(
    title="From Burglar Alarm to Time Machine: Plot Events",
    section="My Brother's Great Invention, Let us read II",
    definition="The plot climbs from a soaked father to a real thief: the alarm drenches Papa, a film sparks the time machine, Boppa the sweeper breaks in one night, and the trapped machine room swallows him, leaving only a green scarf.",
    formula="",
    key_idea="Each invention raises the stakes: a prank device becomes the strange centre of an actual burglary.",
    patterns=[
        "how did the burglar alarm work and why did it fail",
        "arrange the events of the night of the theft in order",
        "who was the thief and how did the family find out",
        "what happened when boppa entered anand's room",
        "why was the time machine dismantled at the end",
        "what was found near the panel of switches"],
    stype="verify_property", steps=[
        ("list the main events", "Note each invention and each misfire in the order they happen."),
        ("find the turning point", "Mark the night the stranger enters and the trap is sprung."),
        ("state the ending", "Report what the family believes and what Anand insists happened.")]))
c.append(dict(
    title="Anita's First-Person Narration",
    section="My Brother's Great Invention, Let us read",
    definition="Anita, fourteen, tells the story about her brother with affectionate mockery; her doubts and warnings let readers judge Anand's inventions, and her voice turns family chaos into gentle comedy.",
    formula="",
    key_idea="A first-person narrator shapes sympathy: we see Anand as both a menace and a genius through Anita's eyes.",
    patterns=[
        "who narrates the story my brother's great invention",
        "how does anita describe her brother's inventions",
        "why does anita warn anand not to involve her",
        "what does anita mean by let me put you in the picture",
        "compare what anita thinks of anand with what he thinks of himself",
        "why was anita angry with anand during the theft"],
    stype="verify_property", steps=[
        ("identify the narrator", "Name who tells the story and her relation to the inventor."),
        ("collect her comments", "Note the phrases in which she judges or teases her brother."),
        ("weigh the effect", "Say how her view colours the humour of every disaster.")]))
c.append(dict(
    title="Word Meanings: Tinkering, Sceptical and Crestfallen",
    section="My Brother's Great Invention, Let us learn",
    definition="Context fixes each word: tinkering means experimenting or fiddling with gadgets, sceptical means doubtful, a crestfallen look is a sad and disappointed appearance, and rigging up is assembling something temporarily.",
    formula="",
    key_idea="Every gloss word matches one of Anand's moods, from smug pride to crestfallen defeat.",
    patterns=[
        "what does tinkering mean in the story",
        "who was sceptical about the burglar alarm and why",
        "what is a crestfallen look",
        "what does rigged up mean here",
        "find the meaning of brandishing and cudgel",
        "use the word frantic in a sentence about anand's workshop"],
    stype="verify_property", steps=vocab_steps()))

ex = [exr("ex1", "gepr103.txt, Let us think and reflect", [
    "Which option best describes Anand's personality: methodical, creative and experimental, or shy?",
    "Which action of Anand during the theft shows his presence of mind?",
    "Complete the cause-and-effect table for the burglar alarm episode.",
    "Do you think Anand was able to keep his promise about not touching the time machine?",
    "Why does Anita say the doubts about the alarm were justified?"])]

wex = [
    we("ex1", "gepr.1.2", "gepr103.txt, Let us read II", "verify_property",
       "How did Anand mislead the thief, and why did it help?",
       {}, [
        {"step": 1, "action": "recall the wrong direction",
         "explain": "Asked for the father's room, Anand points the intruder to his own room next door."},
        {"step": 2, "action": "state the gain",
         "explain": "The false direction buys time for the children and lands the thief inside the humming time machine."}]),
    we("ex2", "gepr.1.1", "gepr103.txt, Let us read I", "verify_property",
       "Why did Papa get drenched at his own front door?",
       {}, [
        {"step": 1, "action": "recall the alarm's rule",
         "explain": "Anand rigged the alarm to trip only when the door opened gently, exactly Papa's habit."},
        {"step": 2, "action": "state the result",
         "explain": "The water bag loosened and soaked Papa, who then demanded to know who was behind the nonsense."}])]

p = build("gepr103", 7, "english", "My Brother's Great Invention", c, wex, ex)
print("wrote", p)

# ================= gepr104: The Tunnel =================
c = []
c.append(dict(
    title="Suraj and the Dragon of His Dreams",
    section="The Tunnel, Let us read I",
    definition="Suraj, a boy from town, cycles to a jungle cutting to watch the noon train burst from the tunnel like a beautiful monster; his longing to know the inside of the tunnel leads him to the watchman's hut and a night friendship.",
    formula="",
    key_idea="Curiosity turns a railway cutting into an adventure; the steam engine is imagined as a dragon out of Suraj's dreams.",
    patterns=[
        "why did suraj wait near the tunnel at noon",
        "how does suraj describe the steam engine",
        "what did suraj see inside the tunnel",
        "why does suraj want to walk through the tunnel",
        "what did suraj think he saw on the hillside",
        "how does suraj feel when the night mail passes at the end"],
    stype="verify_property", steps=theme_steps()))
c.append(dict(
    title="Sunder Singh: The Watchman with the Lamp",
    section="The Tunnel, Let us read",
    definition="Sunder Singh guards the tunnel for years, inspecting it morning and night and warning the engine driver with a flag or lamp; his hut, marigolds and leopard stories make him the wise, lonely heart of the jungle.",
    formula="",
    key_idea="Duty done with love turns a small job into guardianship of train, leopard and jungle alike.",
    patterns=[
        "what are the duties of the tunnel watchman",
        "how does the watchman warn the engine driver of danger",
        "why does sunder singh say the tunnel is truly his",
        "how does sunder singh welcome his rare visitor",
        "what does sunder singh say about safety in the jungle and the town",
        "why is the watchman compared to a firefly at the end"],
    stype="verify_property", steps=char_steps()))
c.append(dict(
    title="Saving the Leopard from the Night Mail",
    section="The Tunnel, Let us read II",
    definition="Hearing the leopard's sawing call inside the tunnel, Sunder Singh and Suraj walk into the dark with an axe and a lamp and shout it clear of the tracks before the night mail arrives, so that neither animal nor train is harmed.",
    formula="",
    key_idea="Real courage protects: two friends face snarling darkness to save a wild animal they have never tamed.",
    patterns=[
        "how did sunder singh know the leopard was in the tunnel",
        "why did the two friends enter the tunnel before the train came",
        "how did they drive the leopard out of the tunnel",
        "why was suraj unable to shout at first",
        "what made the leopard turn back into the darkness",
        "what does the episode show about sunder singh's love for animals"],
    stype="verify_property", steps=[
        ("spot the danger", "Note the sound that tells the leopard is crouching between the tracks."),
        ("follow the rescue", "Trace how lamp, voice and friendship clear the tunnel in time."),
        ("state the care behind it", "Say why the watchman refuses to let the animal be run over.")]))
c.append(dict(
    title="Word Meanings: Embankment, Contemplation and Sinewy",
    section="The Tunnel, Let us learn",
    definition="The story's glossary builds the jungle scene: a railway embankment carries the line over low ground, contemplation is deep thought, sinewy means lean and muscular, and dazzling light blinds the eyes.",
    formula="",
    key_idea="Precise words like shimmered, scuttled and snarling let the reader hear and feel the cutting.",
    patterns=[
        "what is a railway embankment",
        "what does contemplation mean in the story",
        "which words describe the leopard's body",
        "what does scuttled mean as used for the lizard",
        "find the meaning of defying from the text",
        "use the word dazzled in a sentence of your own"],
    stype="verify_property", steps=vocab_steps()))

ex = [exr("ex1", "gepr104.txt, Let us discuss", [
    "Pick the phrases that show Suraj compares the train to a magical creature.",
    "Complete the flow chart of the watchman's danger-signal system for day and night inspections.",
    "Why was Suraj unable to do any shouting in the tunnel at first?",
    "How did Suraj know, while travelling to Delhi, that his friend was out there?",
    "Why did Suraj's father take the boy along on his business trip?"])]

wex = [
    we("ex1", "gepr.1.3", "gepr104.txt, Let us read II", "verify_property",
       "Why does Sunder Singh refuse to let the night mail be stopped for a porcupine but act at once for the leopard?",
       {}, [
        {"step": 1, "action": "recall his rule",
         "explain": "Small animals on the line are not worth halting a train; he stops only for real danger to it."},
        {"step": 2, "action": "apply it to the leopard",
         "explain": "A big animal would be killed and might derail the train, so he drives it out himself instead."}]),
    we("ex2", "gepr.1.1", "gepr104.txt, Let us read I", "verify_property",
       "How did Suraj know the train was about to come out of the tunnel?",
       {}, [
        {"step": 1, "action": "recall the signal",
         "explain": "He heard the shrill whistle of the engine in the distance."},
        {"step": 2, "action": "add the sound cue",
         "explain": "A rumble like distant thunder issued from the tunnel just before the engine shot out."}])]

p = build("gepr104", 7, "english", "The Tunnel", c, wex, ex)
print("wrote", p)

# ================= gepr105: A Homage to Our Brave Soldiers =================
c = []
c.append(dict(
    title="The National War Memorial and Its Chakras",
    section="A Homage to Our Brave Soldiers, Let us read I",
    definition="The letter describes the National War Memorial near India Gate, built in 2019, with the eternal Amar Jawan Jyoti under a central obelisk and four circles: Amar, Veerta, Tyag and Raksha Chakra, each honouring one aspect of the soldiers' gift.",
    formula="memorial = obelisk + eternal flame + four chakras",
    key_idea="The memorial's design maps the soldiers' gifts, immortality, bravery, sacrifice and protection, onto four concentric circles.",
    patterns=[
        "describe the four chakras of the national war memorial",
        "what does the amar jawan jyoti symbolise",
        "which circle of the memorial is called the circle of sacrifice",
        "what is etched on the tablets of the tyag chakra walls",
        "why does the raksha chakra have a row of trees",
        "when was the national war memorial built and by whom was it inaugurated"],
    stype="verify_property", steps=[
        ("place the monument", "Note where the memorial stands, when it was built and what it honours."),
        ("walk through the circles", "Name each chakra and the part of the soldiers' spirit it stands for."),
        ("explain the flame", "Say why an ever-burning flame is the right tribute to fallen soldiers.")]))
c.append(dict(
    title="Gallantry Awards and the Param Vir Chakra",
    section="A Homage to Our Brave Soldiers, Let us read I",
    definition="The letter lists India's gallantry medals, from the Param Vir Chakra, the highest wartime award, to the Maha Vir, Kirti, Vir and Shaurya Chakras, and recalls heroes from Major Somnath Sharma, the first PVC, to the Kargil war.",
    formula="",
    key_idea="Medals keep memory alive: each award carries a citation that retells one act of courage for the nation.",
    patterns=[
        "which is india's highest wartime gallantry award",
        "who was the first recipient of the param vir chakra",
        "name the heroes awarded the param vir chakra after the 1971 war",
        "what does a citation of a gallantry award contain",
        "why were the maha vir chakra and other awards instituted",
        "which wars are remembered on the tablets of the memorial"],
    stype="verify_property", steps=[
        ("order the awards", "Rank the medals from highest wartime honour downwards as the letter lists them."),
        ("attach heroes to wars", "Match each named soldier with his war and award."),
        ("read one citation", "Retell a single citation in plain words to show what gallantry means.")]))
c.append(dict(
    title="Lance Naik Albert Ekka: A Citation of Courage",
    section="A Homage to Our Brave Soldiers, citation",
    definition="The citation tells how Lance Naik Albert Ekka charged an enemy bunker, silenced a machine gun though wounded, and cleared bunker after bunker in the 1971 war until the objective fell and he died of his injuries.",
    formula="",
    key_idea="Reading a citation closely shows supreme sacrifice as a series of choices, each made without thought of self.",
    patterns=[
        "what did lance naik albert ekka do at gangasagar",
        "why was albert ekka awarded the param vir chakra",
        "what does the citation say about his disregard to personal safety",
        "how did ekka silence the enemy machine gun in the building",
        "what happened to albert ekka after the capture of the objective",
        "which qualities of the soldier does the citation highlight"],
    stype="verify_property", steps=[
        ("set the battle", "Note the place, year and enemy position described in the citation."),
        ("follow the acts of valour", "List each brave action, from the first charge to the last bunker."),
        ("draw the meaning", "State what the supreme sacrifice of the soldier teaches the reader.")]))
c.append(dict(
    title="Letter Format: Sharing an Experience",
    section="A Homage to Our Brave Soldiers, Let us read",
    definition="The chapter is a friendly letter: address and date at the top, a warm opening, the visit told in order, feelings woven through facts, and a closing greeting; Soumya writes to Ananda to share her trip to the memorial.",
    formula="letter = date + greeting + body + closing",
    key_idea="A letter's personal voice, questions, little jokes about food, carries big public feelings like gratitude and pride.",
    patterns=[
        "who has written the letter and to whom",
        "which parts of a friendly letter can you identify in the chapter",
        "why does soumya write such a long letter to ananda",
        "how does the writer describe her feelings at the memorial",
        "what does soumya plan to present in the school assembly",
        "how does the letter form make the homage feel personal"],
    stype="verify_property", steps=[
        ("spot the frame", "Mark the date, greeting, body and farewell of the letter."),
        ("follow the telling", "Note how the visit moves from arrival to each chakra to the return home."),
        ("feel the voice", "Point out lines where personal feeling is mixed with information.")]))

ex = [exr("ex1", "gepr105.txt, Let us discuss and think and reflect", [
    "Complete the table of war heroes with their contributions and awards.",
    "What do the lines about the flame as a metaphor for eternal courage mean?",
    "Why was the visit to the National War Memorial an emotive experience for the class?",
    "Name the four concentric circles of the memorial and what each represents.",
    "Which award did Major Padmapani Acharya receive and for which war?"]),
    exr("ex2", "gepr105.txt, My Dear Soldiers poem region", [
    "How does the poem My Dear Soldiers address the soldiers of the nation?"])]

wex = [
    we("ex1", "gepr.1.1", "gepr105.txt, Let us read I", "verify_property",
       "Why does the Amar Jawan Jyoti burn day and night at the memorial?",
       {}, [
        {"step": 1, "action": "read the name",
         "explain": "Amar Jawan means immortal soldier, so the flame stands for spirits that never die."},
        {"step": 2, "action": "state its promise",
         "explain": "The ever-burning flame assures fallen heroes that the nation will never forget their sacrifice."}]),
    we("ex2", "gepr.1.4", "gepr105.txt, opening of the letter", "verify_property",
       "How does Soumya open her letter and set up the visit?",
       {}, [
        {"step": 1, "action": "note the greeting",
         "explain": "She asks after Ananda's family and recalls their talk on war and peace."},
        {"step": 2, "action": "watch the hook",
         "explain": "She invites her friend to guess the monument, pulling the reader into the story before naming the memorial."}])]

p = build("gepr105", 7, "english", "A Homage to Our Brave Soldiers", c, wex, ex)
print("wrote", p)
print("GEPR DONE")
