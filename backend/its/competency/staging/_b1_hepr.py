# -*- coding: utf-8 -*-
"""Batch-1 builder: class 8 English (Poorvi) hepr101-105."""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _b1_build import build, steps, we, exr


def theme_steps():
    return steps(
        ("recall the central events", "Retell the main happenings in one or two sentences."),
        ("trace the turn", "Point to the moment of change, realisation or sacrifice."),
        ("state the theme", "Say the message of the text in one sentence of your own."))


def char_steps():
    return steps(
        ("collect actions and words", "List what the character does and says at key moments."),
        ("infer the traits", "Match each action to a quality such as wit, valour or patience."),
        ("cite the evidence", "Point to the lines of the text that support each trait."))


def vocab_steps():
    return steps(
        ("locate the word", "Find the sentence where the new word appears."),
        ("read the clues around it", "Use nearby words to sense the meaning that fits."),
        ("test a replacement", "Swap in the guessed meaning and check the sentence still works."))


# ================= hepr101: The Wit that Won Hearts =================
c = []
c.append(dict(
    title="Tenali Rama's Wit Wins Hearts",
    section="The Wit that Won Hearts, Let us read",
    definition="Tenali Ramakrishna, the witty poet of Krishnadeva Raya's court, uses humour instead of argument; a plate of paddy seeds and a joke about yawning melt the king's anger and reunite him with Queen Thirumalambal.",
    formula="wit + timing = problem solved",
    key_idea="Wit works where lectures fail: laughter opens the mind that pride had closed.",
    patterns=[
        "how does tenali rama solve the quarrel between the king and the queen",
        "why did the king stop speaking to queen thirumalambal",
        "what trick did tenali rama play with the paddy seeds",
        "how does the yawning joke make the king realise his mistake",
        "why is tenali ramakrishna loved in the court of krishnadeva raya",
        "what gifts did the royal couple give tenali rama"],
    stype="verify_property", steps=theme_steps()))
c.append(dict(
    title="Pride and Apology: The Royal Quarrel",
    section="The Wit that Won Hearts, Let us think and reflect",
    definition="A small misunderstanding grows when pride blinds the king; harmony returns only when he admits that he overreacted, showing that a sincere apology can end a long silence.",
    formula="",
    key_idea="Pride prolongs quarrels; admitting fault, as the king does, needs maturity and self-awareness.",
    patterns=[
        "why did the king punish the queen for yawning",
        "what does the king mean by i let my pride blind me",
        "how did the queen feel during the weeks of silence",
        "why does the queen say we can leave this quarrel behind us",
        "what does the king's apology show about his character",
        "how does the story end for the royal couple"],
    stype="verify_property", steps=[
        ("find the cause", "Note the tiny trigger, a yawn during a poem, that began the quarrel."),
        ("follow the silence", "Describe the sadness the quarrel spreads through the palace."),
        ("watch the repair", "Trace the apology that restores the bond and the joy of the court.")]))
c.append(dict(
    title="A Strategy of Indirect Teaching",
    section="The Wit that Won Hearts, Let us read",
    definition="Tenali Rama asks for time and plans his move; he raises the paddy seed matter in open court, lets the courtiers laugh first, and leads the king to the truth about yawning without ever mentioning the quarrel.",
    formula="",
    key_idea="Indirect teaching protects dignity: the learner discovers the lesson himself, so it is accepted gladly.",
    patterns=[
        "why does tenali rama ask for time before helping the queen",
        "what is the strategy behind the special paddy seeds",
        "why does tenali rama speak in the open court instead of privately",
        "how do the courtiers react when rama shows his seeds",
        "why does rama say the real issue is the person who sows the seeds",
        "what makes the king realise that yawning is natural"],
    stype="verify_property", steps=[
        ("state the goal", "Say what Rama wants: the king must see his own unfairness."),
        ("follow the plan", "Trace each step, from the seed claim to the yawn question."),
        ("judge the method", "Explain why the indirect way succeeds where direct advice would fail.")]))
c.append(dict(
    title="Word Meanings: Distraught, Insurmountable and Sceptical",
    section="The Wit that Won Hearts, Let us learn",
    definition="Court-tale words take meaning from context: distraught means extremely sad, insurmountable means undefeatable, sceptical means doubtful, and orchestrated means arranged carefully.",
    formula="",
    key_idea="Feelings words like distraught and forlorn paint the silent palace before Rama's plan works.",
    patterns=[
        "what does distraught mean in the story",
        "which problems are called insurmountable here",
        "who looked at rama with sceptical eyes",
        "what does orchestrated the settlement mean",
        "find the meaning of gnawed as used in the story",
        "use the word profusely in a sentence of your own"],
    stype="verify_property", steps=vocab_steps()))

ex = [exr("ex1", "hepr101.txt, Let us discuss and think and reflect", [
    "Rectify the false statements about the quarrel and the paddy seeds.",
    "Why does the queen believe only Tenali Rama can help the king understand?",
    "What does the queen's regret about choosing the wrong day suggest about her feelings?",
    "How does the story conclude and what lesson can be learnt from it?",
    "Why was the reign of Krishnadeva Raya called the Golden Era?"])]

wex = [
    we("ex1", "hepr.1.3", "hepr101.txt, Let us read", "verify_property",
       "Why does Tenali Rama introduce the paddy seeds in the full court instead of speaking to the king alone?",
       {}, [
        {"step": 1, "action": "recall the king's mood",
         "explain": "A private lecture on yawning would wound the king's pride all over again."},
        {"step": 2, "action": "see the design",
         "explain": "Before the whole court, the yawning joke becomes public laughter, letting the king laugh at himself and change without being shamed."}]),
    we("ex2", "hepr.1.2", "hepr101.txt, Let us read (closing)", "verify_property",
       "What does the queen's reply to the apology reveal about her?",
       {}, [
        {"step": 1, "action": "read her words",
         "explain": "She offers to leave the quarrel behind and asks to hear the poem."},
        {"step": 2, "action": "name the quality",
         "explain": "Her readiness to forgive and her wish to listen show grace and affection."}])]

p = build("hepr101", 8, "english", "The Wit that Won Hearts", c, wex, ex)
print("wrote", p)

# ================= hepr102: A Tale of Valour =================
c = []
c.append(dict(
    title="Major Somnath Sharma: First Param Vir Chakra",
    section="A Tale of Valour, Let us read",
    definition="Major Somnath Sharma of the 4th Battalion, Kumaon Regiment, led 90 men of D Company against about 500 infiltrators at Badgam, refused to withdraw, and died at 24; he became the first recipient of the Param Vir Chakra.",
    formula="",
    key_idea="Courage beyond numbers: his last message, to fight to the last man and the last round, turned a lost post into saved Srinagar.",
    patterns=[
        "who was major somnath sharma and why is he remembered",
        "why was major sharma awarded the param vir chakra",
        "what did major sharma mean by fight to the last man and the last round",
        "why did major sharma insist on joining his company despite his plastered hand",
        "how did d company save the srinagar airport",
        "what was the age of major sharma at the time of his sacrifice"],
    stype="verify_property", steps=char_steps()))
c.append(dict(
    title="The Battle of Badgam: Events in Order",
    section="A Tale of Valour, Let us read",
    definition="The account moves in order: Operation Gulmarg sends tribal invaders into Kashmir, D Company is airlifted to Srinagar on 31 October, patrols find Badgam silent, the enemy attacks on 3 November, air strikes are called, and the company fights to its last rounds.",
    formula="",
    key_idea="Reading a battle account means fixing dates and sequence, from 22 October to the six-hour hold after the Major fell.",
    patterns=[
        "arrange the events of the battle of badgam in chronological order",
        "what was operation gulmarg and when was it launched",
        "why was d company flown into srinagar by air",
        "what happened on 3 november 1947 at badgam",
        "why did major sharma request air strikes",
        "what happened after the death of major sharma"],
    stype="verify_property", steps=[
        ("fix the timeline", "Place each dated event in order from late October to November 1947."),
        ("follow the company", "Track D Company from the airlift to the last stand."),
        ("connect cause and effect", "Show how the six-hour resistance brought reinforcements in time.")]))
c.append(dict(
    title="Valour, Duty and Sacrifice: Theme",
    section="A Tale of Valour, Let us read (Medal of Honour)",
    definition="The chapter presents valour as love of country in action: outnumbered men hold their ground because one leader shows that duty stands above safety, and their sacrifice keeps the tricolour flying over Srinagar.",
    formula="",
    key_idea="Sacrifice is not only dying in battle but holding on so that others may live free; the Honour Wall keeps such names alive.",
    patterns=[
        "what does the chapter teach about duty and honour",
        "why is the battle of badgam called a tale of valour",
        "how does the story of major sharma inspire generations",
        "what is the significance of the honour wall at the national war memorial",
        "which qualities of a soldier does the chapter highlight",
        "why should citizens remember the price paid for freedom"],
    stype="verify_property", steps=theme_steps()))
c.append(dict(
    title="Word Meanings: Valour, Infiltrators and Posthumously",
    section="A Tale of Valour, Let us learn",
    definition="From context, valour means courage, infiltrators are people who secretly invade, posthumously means after death, and tenacity means determination that does not let go.",
    formula="",
    key_idea="Military words like ammunition, casualties and reinforcements carry the weight of the battle account.",
    patterns=[
        "what does valour mean in this chapter",
        "who are called infiltrators in the account",
        "what does it mean to be awarded posthumously",
        "find the meaning of resolute and unparalleled",
        "what are magazines in a military context here",
        "use the word tenacity in a sentence about d company"],
    stype="verify_property", steps=vocab_steps()))

ex = [exr("ex1", "hepr102.txt, Let us discuss and think and reflect", [
    "Arrange the eight events of Major Sharma's life and battle in chronological order.",
    "Why did Major Sharma say his men would not go into action without him?",
    "How did D Company's stand give time for reinforcements to reach Srinagar?",
    "Which early influences shaped young Somnath's military life?",
    "Why is Major Sharma's name etched on the Honour Wall of the National War Memorial?"])]

wex = [
    we("ex1", "hepr.1.2", "hepr102.txt, Let us read", "verify_property",
       "Why did the enemy wait until only D Company remained near Badgam?",
       {}, [
        {"step": 1, "action": "recall the patrol plan",
         "explain": "Several companies patrolled Badgam and were ordered back one by one by afternoon."},
        {"step": 2, "action": "spot the trap",
         "explain": "The invaders attacked when the small force of 90 was left alone, hoping to overrun it before help could arrive."}]),
    we("ex2", "hepr.1.1", "hepr102.txt, message to brigade headquarters", "verify_property",
       "What was Major Sharma's reply when asked to pull back?",
       {}, [
        {"step": 1, "action": "recall the situation",
         "explain": "Ammunition was running out and the enemy was only 50 yards away."},
        {"step": 2, "action": "quote his resolve",
         "explain": "He said he would not withdraw an inch but would fight to the last man and the last round."}])]

p = build("hepr102", 8, "english", "A Tale of Valour", c, wex, ex)
print("wrote", p)

# ================= hepr103: The Case of the Fifth Word =================
c = []
c.append(dict(
    title="Encyclopedia Brown, the Boy Detective",
    section="The Case of the Fifth Word, Let us read I",
    definition="Leroy Brown of Idaville, called Encyclopedia for his head full of facts, solves the police chief's hardest cases at the dinner table; he asks one careful question and never boasts about his help.",
    formula="",
    key_idea="Knowledge plus modesty makes the boy wonder: he reads endlessly, forgets nothing and keeps quiet about praise.",
    patterns=[
        "why is leroy brown called encyclopedia",
        "how does encyclopedia help his father solve cases",
        "what are the character traits of encyclopedia brown",
        "why does chief brown keep his son's talent secret",
        "what question does encyclopedia ask about the fir tree",
        "how does encyclopedia find the meaning of the four words"],
    stype="verify_property", steps=char_steps()))
c.append(dict(
    title="The Four-Word Code: Nom Utes Sweden Hurts",
    section="The Case of the Fifth Word, Let us read II",
    definition="Dying, Tim Nolan leaves four strange words beside his will; Encyclopedia sees they hide the days of the week without the letters day, so the missing fifth word, fir for Friday, marks the young fir tree under which the stolen jewellery lies.",
    formula="nom utes sweden hurts = monday tuesday wednesday thursday",
    key_idea="A code bends around its calendar page: each word stands for a weekday, and the unwritten day points to the hiding place.",
    patterns=[
        "how did encyclopedia crack the four word code",
        "what does nom stand for in nolan's code",
        "why did nolan write the words on a calendar sheet",
        "where was the stolen jewellery hidden",
        "why would the code make no sense to a stranger",
        "what was the fifth word and why was it left unwritten"],
    stype="verify_property", steps=[
        ("list the strange words", "Write the four words exactly as Nolan left them."),
        ("hunt the hidden pattern", "Notice that dropping day from each weekday leaves letters that reshape into the words."),
        ("name the missing piece", "See that the fifth weekday gives fir, the tree under which the loot was buried.")]))
c.append(dict(
    title="Clues and Inference: Solving a Mystery",
    section="The Case of the Fifth Word, Let us think and reflect",
    definition="The story is a chain of clues, a five-year-old robbery, a missing partner, a searched house, a deathbed will; inference joins them, as Encyclopedia reasons from the calendar sheet and the single fir tree to the buried jug of earth.",
    formula="",
    key_idea="A detective reasons instead of guessing: each small fact, one question at a time, closes in on the answer.",
    patterns=[
        "which clues help encyclopedia solve the case",
        "why does encyclopedia ask about the fir tree in the nursery",
        "what was suspicious about the sheet from the desk calendar",
        "how did the police know that nolan and davenport hid the jewellery",
        "why did the search of nolan's house find nothing",
        "what does the case teach about careful reasoning"],
    stype="verify_property", steps=[
        ("gather the facts", "Separate what is known, the robbery, the will, the searched house, from what is guessed."),
        ("join the facts", "Reason step by step from each clue towards the hiding place."),
        ("check the solution", "Test the answer against every clue before declaring the case closed.")]))
c.append(dict(
    title="Word Meanings: Hunch, Loot and Testify",
    section="The Case of the Fifth Word, Let us learn",
    definition="Detective words come clear from context: a hunch is a strong feeling about something, loot is stolen goods, to testify is to make a statement in court, and a hold-up is a robbery with threat or violence.",
    formula="",
    key_idea="Crime-story vocabulary, from court order to testimony, builds the world in which the boy detective works.",
    patterns=[
        "what is a hunch as chief brown uses the word",
        "what does loot mean in the story",
        "why did the clerk refuse to testify",
        "what are hold-ups according to the gloss",
        "find the meaning of foreseen from the text",
        "use the word nursery in a sentence of your own"],
    stype="verify_property", steps=vocab_steps()))

ex = [exr("ex1", "hepr103.txt, Let us discuss and think and reflect", [
    "Separate the facts from the opinions listed from parts I and II of the story.",
    "Match the textual evidences of the trait table to knowledge, modesty, patience and speed.",
    "What was suspicious about the sheet from Nolan's desk calendar?",
    "Do you think Chief Brown needed Leroy's help in this case? Why?",
    "Explain how the four words told Davenport where the jewellery was."])]

wex = [
    we("ex1", "hepr.1.2", "hepr103.txt, explanation section", "verify_property",
       "How does the calendar sheet serve as the key to Nolan's code?",
       {}, [
        {"step": 1, "action": "recall the sheet",
         "explain": "Nolan clipped a page from a desk calendar beside the will."},
        {"step": 2, "action": "apply the key",
         "explain": "Once the words are read as weekdays missing their day letters, the unwritten fifth day, Fir or Friday, names the hiding spot."}]),
    we("ex2", "hepr.1.3", "hepr103.txt, Let us read I", "verify_property",
       "Why did Chief Brown stare at his soup at dinner?",
       {}, [
        {"step": 1, "action": "read the family signal",
         "explain": "Staring at the cream-of-mushroom soup was the chief's habit when a case defeated him."},
        {"step": 2, "action": "state the reason",
         "explain": "Tim Nolan had died leaving a will and four words no one could read, and the stolen jewellery was still missing."}])]

p = build("hepr103", 8, "english", "The Case of the Fifth Word", c, wex, ex)
print("wrote", p)

# ================= hepr104: The Cherry Tree =================
c = []
c.append(dict(
    title="Rakesh and the Cherry Seed",
    section="The Cherry Tree, Let us read I",
    definition="Six-year-old Rakesh presses a cherry seed into a shady corner of his grandfather's Mussoorie garden and almost forgets it; the seed's quiet rise into a tree teaches him that luck grows only when it is put to use.",
    formula="seed + care + time = cherry tree",
    key_idea="Grandfather's line that nothing is lucky if you put it away turns a discarded seed into a living lesson.",
    patterns=[
        "how did rakesh plant the cherry seed",
        "what did grandfather say about lucky cherry seeds",
        "why did rakesh live with his grandfather in mussoorie",
        "how did rakesh care for the young cherry tree",
        "what did rakesh see one morning in early spring",
        "why is the cherry tree special to rakesh and grandfather"],
    stype="verify_property", steps=theme_steps()))
c.append(dict(
    title="The Cherry Tree's Struggles and Survival",
    section="The Cherry Tree, Let us read II",
    definition="The young tree survives a goat that eats its leaves, a grass-cutter's scythe that cuts it in two, and heavy snow; each time it sends out new shoots, until it blossoms pink and bears sour cherries that the birds love.",
    formula="",
    key_idea="Cherry trees are tough, as grandfather says; the tree's will to live answers every blow with fresh growth.",
    patterns=[
        "what dangers did the cherry tree face while growing",
        "how did the cherry tree recover after the goat ate its leaves",
        "what happened when the woman cut the tree with her scythe",
        "when did the cherry tree first blossom",
        "which birds came to feast on the cherries",
        "why did grandfather call the cherry tree tough"],
    stype="verify_property", steps=[
        ("list the setbacks", "Note each injury the tree suffers, season by season."),
        ("watch the recovery", "Describe the new leaves and shoots that follow each blow."),
        ("state the reward", "Recall the blossoms, the fruit and the visitors the grown tree earns.")]))
c.append(dict(
    title="Grandfather's Company: Bond across Generations",
    section="The Cherry Tree, Let us read",
    definition="Grandfather and Rakesh share stories by the charcoal fire, newspapers read aloud, and the garden; growing side by side with the tree, the boy learns patience while the old man finds shade and joy under its leaves.",
    formula="",
    key_idea="The tree binds the two ages: planted by a child, enjoyed by the old, it measures how both have grown.",
    patterns=[
        "how do rakesh and grandfather spend winter evenings",
        "why does rakesh read the newspaper to grandfather",
        "what does grandfather mean by we planted it ourselves",
        "how do rakesh and the cherry tree grow together",
        "why do grandfather and rakesh like the shade of the tree",
        "what does rakesh wonder as he lies beneath the tree"],
    stype="verify_property", steps=[
        ("collect the shared scenes", "List the moments the two spend together through the seasons."),
        ("watch the tree between them", "Note how their talk keeps returning to the growing tree."),
        ("state the bond", "Say what the tree finally means to each of them.")]))
c.append(dict(
    title="Word Meanings: Stunted, Tang and Foliage",
    section="The Cherry Tree, Let us learn",
    definition="Hill-country words are fixed by context: stunted means stopped from growing to usual size, tang is a strong sharp taste, foliage means green leaves, and the outskirts are the edges of a town.",
    formula="",
    key_idea="Nature words like haunches, scythe and blossoms place the reader in the Himalayan garden.",
    patterns=[
        "what does stunted growth mean here",
        "what is the tang of a cherry",
        "what does foliage mean in the story",
        "where are the outskirts of mussoorie in the story",
        "find the meaning of plodded and grumpy",
        "use the word flitted in a sentence about the birds"],
    stype="verify_property", steps=vocab_steps()))

ex = [exr("ex1", "hepr104.txt, Let us discuss and think and reflect", [
    "Arrange the ten events of the story in the order they happen.",
    "Do you think the cherry tree would survive the goat and the scythe? Why?",
    "Complete the cause-and-effect table for part II of the story.",
    "Why did Rakesh water the tree even when it rained?",
    "What makes the cherry tree more special to Rakesh than the trees of the forest?"])]

wex = [
    we("ex1", "hepr.1.1", "hepr104.txt, Let us read I", "verify_property",
       "What advice did Grandfather give about the lucky cherry seed?",
       {}, [
        {"step": 1, "action": "recall Rakesh's question",
         "explain": "Rakesh asks whether cherry seeds are lucky and wants to keep the seed."},
        {"step": 2, "action": "read the answer",
         "explain": "Grandfather says nothing is lucky if you put it away; luck must be put to use, so the seed is planted."}]),
    we("ex2", "hepr.1.2", "hepr104.txt, Let us read II", "verify_property",
       "How did the cherry tree respond after the scythe cut it in two?",
       {}, [
        {"step": 1, "action": "recall the damage",
         "explain": "A woman cutting grass sweeps her scythe and the tree is cut in two."},
        {"step": 2, "action": "note the reply of the tree",
         "explain": "By the next summer it has sent out several new shoots with tender green leaves, refusing to die."}])]

p = build("hepr104", 8, "english", "The Cherry Tree", c, wex, ex)
print("wrote", p)

# ================= hepr105: Feathered Friend =================
c = []
c.append(dict(
    title="Claribel the Canary in the Space Station",
    section="Feathered Friend, Let us read I",
    definition="Sven Olsen smuggles a small yellow canary named Claribel aboard a space station; she weighs almost nothing, learns to glide in zero gravity with lazy flicks, and becomes the crew's general pet hidden from visiting VIPs.",
    formula="",
    key_idea="A bird adapted to weightlessness shows how life bends to new rules; Claribel does no unnecessary work in free fall.",
    patterns=[
        "how did claribel come to live on the space station",
        "how does claribel move inside the space station",
        "why was claribel a sensible choice of pet for space",
        "how did the crew hide claribel from visiting vips",
        "what was sven olsen's scientific curiosity about birds in space",
        "why does the narrator say nobody would look for a canary in a space station"],
    stype="verify_property", steps=char_steps()))
c.append(dict(
    title="The Canary that Saved the Crew",
    section="Feathered Friend, Let us read II",
    definition="When Claribel faints and revives only under an oxygen mask, the narrator remembers that miners once carried canaries to warn of gas; the frozen air purifier and its silent alarm are found, and the bird proves a life-saving sentinel.",
    formula="",
    key_idea="Old wisdom meets new machines: a tiny bird catches the failure that half a million dollars of engineering missed.",
    patterns=[
        "why did claribel faint inside the space station",
        "how did the crew revive claribel",
        "what did miners carry canaries for in old times",
        "what was wrong with the air purifier that night",
        "why did the alarm circuit fail to warn the crew",
        "what does the narrator mean by being doubly safeguarded"],
    stype="verify_property", steps=[
        ("mark the crisis", "Note Claribel's collapse and her brief recovery under the oxygen mask."),
        ("recall the old practice", "Connect the canary to the miners' custom of testing air for gas."),
        ("find the fault", "Trace the frozen purifier and the unconnected second alarm to the danger.")]))
c.append(dict(
    title="Life in Zero Gravity",
    section="Feathered Friend, Let us read",
    definition="The story sketches space routine: twelve-hour watches in permanent sunlight, bunk straps, weightless girders assembled in slow-motion ballet, and a 150-pound bonus for light workers, showing how a station crew lives and works.",
    formula="",
    key_idea="Everyday habits, waking, breakfast, work, change shape in orbit, where there is no day, night or weight.",
    patterns=[
        "how does work in free fall differ from construction on earth",
        "why were some spacers paid a bonus for being light",
        "how do the crew keep track of morning in space",
        "what was the narrator checking in his cubbyhole",
        "why does claribel hang motionless in the air",
        "what sounds of earth comfort the crew in space"],
    stype="verify_property", steps=[
        ("collect the routines", "List how eating, sleeping and working happen on the station."),
        ("contrast with earth", "Note which habits change without gravity and which stay."),
        ("see the role of the pet", "Say how Claribel fits into this weightless day.")]))
c.append(dict(
    title="Word Meanings: Wiry, Cubbyhole and Bulkheads",
    section="Feathered Friend, Let us learn",
    definition="Space-story words fix themselves in context: wiry means thin but strong, a cubbyhole is a small enclosed space, bulkheads are dividing walls between compartments, and keeled over means collapsed or fainted.",
    formula="",
    key_idea="Technical words like girders, ventilating shafts and intercom make the station feel real.",
    patterns=[
        "what does wiry mean as used for sven",
        "where was the narrator's cubbyhole",
        "what are bulkheads in a space station",
        "what does keeled over mean in the story",
        "find the meaning of sluggish and sheepish",
        "use the word smuggled in a sentence of your own"],
    stype="verify_property", steps=vocab_steps()))

ex = [exr("ex1", "hepr105.txt, Let us discuss and think and reflect", [
    "Mark the statements about Claribel and the air purifier as true or false with reasons.",
    "Why did the narrator first mistake Claribel's whistle for an intercom sound?",
    "How did Jock Duncan try to find out whether the canary was alive?",
    "What caused the air purifier to freeze that night?",
    "Why does the narrator say visitors need not be alarmed by birdsong on a station?"])]

wex = [
    we("ex1", "hepr.1.2", "hepr105.txt, Let us read II", "verify_property",
       "Why was the narrator sure the trouble was in the air itself?",
       {}, [
        {"step": 1, "action": "recall his own state",
         "explain": "He woke with a nagging headache and a sluggish mind, signs he too needed oxygen."},
        {"step": 2, "action": "join it with the old custom",
         "explain": "Remembering miners' canaries, he sees that Claribel's fainting warns of bad air before any machine does."}]),
    we("ex2", "hepr.1.1", "hepr105.txt, Let us read I", "verify_property",
       "How did Claribel first meet the narrator?",
       {}, [
        {"step": 1, "action": "recall the sound",
         "explain": "A musical whistle beside his ear makes him expect an intercom announcement."},
        {"step": 2, "action": "see the bird",
         "explain": "Instead he finds a small yellow canary hanging motionless in the air, wings folded, before she loops away."}])]

p = build("hepr105", 8, "english", "Feathered Friend", c, wex, ex)
print("wrote", p)
print("HEPR DONE")
