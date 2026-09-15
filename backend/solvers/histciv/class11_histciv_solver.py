"""
CISCE Class 11 History & Civics - Deterministic Solver and Question Generator
Covers: Rise of Fascism in Italy, Weaknesses of the Weimar Republic,
        Economic & Political Causes of Japanese Militarism (1930s)
"""

import random
import math
import fractions
import hashlib
import json
import re
from dataclasses import dataclass, field, asdict
from typing import List, Dict, Any, Optional, Tuple
from datetime import datetime


# ======================================================================
# UTILITIES
# ======================================================================

def make_seed(*args) -> int:
    """Deterministic integer seed from any number of arguments."""
    raw = json.dumps(args, sort_keys=True, default=str)
    h = hashlib.md5(raw.encode()).hexdigest()
    return int(h, 16) % (2**31)


def normalize(s: str) -> str:
    """Normalise whitespace for comparison."""
    return " ".join(s.lower().split())


# ======================================================================
# MASTER QUESTION BANK  (standard + Indian-context competency items)
# ======================================================================

_QUESTION_BANK: List[Dict[str, Any]] = [
    # ── NODE c11_hist_046: Post-War Discontent → Fascism in Italy ─────
    {
        "id": "C11H046_MCQ_01",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Rise of Fascism in Italy",
        "node": "c11_hist_046",
        "question": "Why is Italy's victory in WWI described as a 'mutilated victory'?",
        "options": [
            "A - Italy lost the war and had to cede territory to Austria",
            "B - Italy gained Trento, Trieste, and South Tyrol but was denied Fiume, Dalmatia, and colonial territories promised in the 1915 Treaty of London",
            "C - Italy was forced to pay massive war reparations to the Allies",
            "D - The Italian army was completely defeated at Caporetto in 1917",
        ],
        "answer": "B",
        "explanation": "Italy fought on the winning Allied side in WWI but felt cheated at the Paris Peace Conference (1919). Although it gained Trento, Trieste, and South Tyrol, it was denied Fiume, Dalmatia, and promised colonial territories. Nationalist poet Gabriele D'Annunzio coined the phrase 'vittoria mutilata' (mutilated victory) to express this sense of betrayal.",
        "competency": False,
    },
    {
        "id": "C11H046_MCQ_02",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Rise of Fascism in Italy",
        "node": "c11_hist_046",
        "question": "Approximately how many strikes occurred in Italy during 1919, the first year of the Biennio Rosso?",
        "options": ["A - 450", "B - 980", "C - 1,883", "D - 3,210"],
        "answer": "C",
        "explanation": "The Biennio Rosso ('Red Biennium') of 1919-20 saw massive industrial unrest: 1,883 strikes in 1919 and 2,061 in 1920. In September 1920, metalworkers in Turin and Milan occupied 570 factories. This wave of strikes terrified the middle class and property owners, making them receptive to Mussolini's promise of law and order.",
        "competency": False,
    },
    {
        "id": "C11H046_MCQ_03",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Rise of Fascism in Italy",
        "node": "c11_hist_046",
        "question": "On what date and in which city did Mussolini formally found the Fasci di Combattimento?",
        "options": [
            "A - 23 March 1919, Milan",
            "B - 4 November 1918, Rome",
            "C - 28 June 1919, Paris",
            "D - 29 October 1922, Turin",
        ],
        "answer": "A",
        "explanation": "Benito Mussolini founded the Fasci di Combattimento in Milan's Piazza San Sepolcro on 23 March 1919 with about 200 members, mostly ex-servicemen and nationalists. This organisation later evolved into the National Fascist Party (PNF) in 1921.",
        "competency": False,
    },
    {
        "id": "C11H046_MCQ_04",
        "type": "mcq",
        "difficulty": "Hard",
        "topic": "Rise of Fascism in Italy",
        "node": "c11_hist_046",
        "question": "By 1920, inflation in Italy had reached approximately:",
        "options": ["A - 100%", "B - 200%", "C - 400%", "D - 800%"],
        "answer": "C",
        "explanation": "WWI expenditure (148 billion lire) was financed by borrowing, causing inflation that reached 400% by 1920. The lira fell from 25 to the dollar before the war to about 40 after the war, destroying the savings of the middle class - a key group Fascism later recruited.",
        "competency": False,
    },
    {
        "id": "C11H046_MCQ_05",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Rise of Fascism in Italy",
        "node": "c11_hist_046",
        "question": (
            "In the Indian context, which INC leader's concept of 'mutilated victory' "
            "analogously reflected Indian disappointment at the Versailles Conference "
            "where Indian self-determination was ignored?"
        ),
        "options": [
            "A - Bal Gangadhar Tilak",
            "B - Annie Besant (who launched the Home Rule League in 1916, inspired by self-determination rhetoric)",
            "C - Lala Lajpat Rai",
            "D - C. Rajagopalachari",
        ],
        "answer": "B",
        "explanation": "Annie Besant's Home Rule Movement (1916) was directly inspired by President Woodrow Wilson's principle of self-determination. Indian nationalists felt equally 'mutilated' when the Versailles Conference (1919) ignored India's claim to self-government despite India's massive contribution of soldiers and resources to the Allied war effort. This analogy helps Indian students understand the emotional force of the 'mutilated victory' concept.",
        "competency": True,
    },
    {
        "id": "C11H046_FB_01",
        "type": "fill_blank",
        "difficulty": "Medium",
        "topic": "Rise of Fascism in Italy",
        "node": "c11_hist_046",
        "question": (
            "The period 1919-1920 in Italy, marked by a wave of strikes and factory "
            "occupations, is known as the __________."
        ),
        "answer": "Biennio Rosso",
        "alternate_answers": ["Biennio Rosso (Red Biennium)", "Biennio Rosso / Red Biennium"],
        "explanation": "Biennio Rosso (Italian for 'Red Biennium') refers to the two-year period 1919-1920 of intense social conflict, characterised by mass strikes, peasant land occupations, and factory takeovers. The Socialist Party (PSI) grew rapidly during this period, alarming the middle and upper classes.",
        "competency": False,
    },
    {
        "id": "C11H046_FB_02",
        "type": "fill_blank",
        "difficulty": "Medium",
        "topic": "Rise of Fascism in Italy",
        "node": "c11_hist_046",
        "question": (
            "Italian nationalist poet Gabriele D'Annunzio led a private force to seize "
            "the port city of __________ in 1919, in defiance of the Versailles settlement, "
            "for 15 months."
        ),
        "answer": "Fiume",
        "alternate_answers": ["Rijeka (Fiume)"],
        "explanation": "In September 1919, D'Annunzio led 2,000 nationalist volunteers (arditi) to seize the Adriatic port of Fiume (modern-day Rijeka, Croatia), which had a large Italian population but was not awarded to Italy at Versailles. His 15-month occupation made him a national hero and directly inspired Mussolini's Fascist movement.",
        "competency": False,
    },
    {
        "id": "C11H046_FB_03",
        "type": "fill_blank",
        "difficulty": "Hard",
        "topic": "Rise of Fascism in Italy",
        "node": "c11_hist_046",
        "question": (
            "Fascist paramilitary squads led by local landowners and industrialists, "
            "responsible for attacking socialist offices and beating up trade unionists, "
            "were known as __________."
        ),
        "answer": "squadristi (or squadristi / Blackshirts)",
        "alternate_answers": ["squadristi", "Blackshirts", "squadrismo"],
        "explanation": "The squadristi (singular: squadrista), also called 'Blackshirts' (camicie nere) for their uniforms, were Fascist paramilitary squads organised by local landowners, industrialists, and Fascist party bosses (ras). They used violence - burning socialist newspaper offices, beating trade unionists, and attacking peasant cooperatives - with tacit approval from police and army officers.",
        "competency": False,
    },
    {
        "id": "C11H046_FB_04",
        "type": "fill_blank",
        "difficulty": "Easy",
        "topic": "Rise of Fascism in Italy",
        "node": "c11_hist_046",
        "question": (
            "Elite WWI shock troops in Italy who later became a key support base for "
            "Fascism were called __________."
        ),
        "answer": "arditi",
        "explanation": "The arditi (Italian for 'the daring ones') were elite shock troops in the Italian army during WWI. After demobilisation they found no jobs and no recognition, making them bitter and receptive to Fascism, which promised to restore national pride. Mussolini recruited heavily from among the arditi.",
        "competency": False,
    },
    {
        "id": "C11H046_SA_01",
        "type": "short_answer",
        "difficulty": "Medium",
        "topic": "Rise of Fascism in Italy",
        "node": "c11_hist_046",
        "question": "List and explain any FOUR specific causes of post-war discontent in Italy (1919-22).",
        "answer": (
            "Four causes of post-war discontent in Italy:\n"
            "1. Mutilated Victory: Italy joined the Allies in 1915 after the Treaty of London promised territorial gains (Trento, Trieste, South Tyrol, Fiume, Dalmatia, colonial territories). At Versailles (1919) Italy received only Trento, Trieste, and South Tyrol. D'Annunzio called this 'vittoria mutilata'. Nationalists felt betrayed.\n"
            "2. Economic Crisis: WWI cost 148 billion lire, financed by borrowing. Inflation reached 400% by 1920; the lira collapsed from 25 to 40 per dollar. Middle-class savings were wiped out.\n"
            "3. Social Unrest (Biennio Rosso): 1919-20 saw 1,883 strikes (1919) and 2,061 (1920). In Sept 1920, metalworkers occupied 570 factories in Turin and Milan. The PSI (Socialist Party) grew to 200,000 members, frightening property owners.\n"
            "4. Returning Soldiers / Arditi: 600,000 Italian dead, 950,000 wounded. Ex-servicemen found no jobs, no pensions, no recognition. They became a ready-made violent force for Fascism."
        ),
        "keywords": [
            "mutilated victory",
            "economic crisis",
            "inflation",
            "Biennio Rosso",
            "arditi",
            "unemployment",
        ],
        "explanation": "These four interconnected causes - diplomatic humiliation, economic collapse, social revolution, and veteran discontent - created the conditions in which Mussolini's Fascist movement could grow. The middle class and industrialists financed the Fascist squads to crush the socialist threat.",
        "competency": False,
    },
    {
        "id": "C11H046_SA_02",
        "type": "short_answer",
        "difficulty": "Medium",
        "topic": "Rise of Fascism in Italy",
        "node": "c11_hist_046",
        "question": (
            "Indian students often confuse Fascism in Italy with Germany. "
            "State TWO fundamental differences in the conditions that gave rise to "
            "Fascism in Italy vs Nazism in Germany."
        ),
        "answer": (
            "Two fundamental differences:\n"
            "1. Italy was on the WINNING side in WWI; Germany was on the LOSING side. "
            "Italy's grievance was the 'mutilated victory' - inadequate territorial gains "
            "despite victory. Germany's grievance was defeat, war guilt, and reparations "
            "(Treaty of Versailles).\n"
            "2. Italy's post-war crisis was primarily a social revolution scare (Biennio "
            "Rosso - fear of communist revolution among property owners). Germany's crisis "
            "was hyperinflation destroying the middle class (1923) and later mass "
            "unemployment from the Great Depression (1929), plus the national humiliation "
            "of the Treaty of Versailles and War Guilt Clause."
        ),
        "keywords": [
            "winning side",
            "losing side",
            "mutilated victory",
            "defeat",
            "reparations",
            "social revolution",
            "hyperinflation",
        ],
        "explanation": "Understanding these differences is crucial for Indian students studying comparative ideologies. Italy's Fascism rose from a fear of socialism among property owners; Germany's Nazism rose from economic catastrophe and national humiliation. Both exploited democratic weaknesses, but their root causes differed significantly.",
        "competency": True,
    },
    {
        "id": "C11H046_NUM_01",
        "type": "numerical",
        "difficulty": "Medium",
        "topic": "Rise of Fascism in Italy",
        "node": "c11_hist_046",
        "question": (
            "Italy spent 148 billion lire on WWI. If Italy's pre-war national income was "
            "approximately 16 billion lire per year, how many years of national income did "
            "Italy spend on the war? Show your calculation."
        ),
        "answer": 9.25,
        "unit": "years of national income",
        "explanation": "Calculation: 148 billion / 16 billion = 9.25 years. This massive expenditure, financed almost entirely by borrowing from domestic banks, created the conditions for hyperinflation and economic crisis after the war. The scale of borrowing meant the government could not honour its debts without printing money, causing inflation.",
        "competency": False,
        "verification": {"numerator": 148, "denominator": 16, "result": 9.25},
    },
    {
        "id": "C11H046_NUM_02",
        "type": "numerical",
        "difficulty": "Hard",
        "topic": "Rise of Fascism in Italy",
        "node": "c11_hist_046",
        "question": (
            "In 1919 there were 1,883 strikes in Italy and in 1920 there were 2,061 strikes. "
            "What is the percentage increase in the number of strikes from 1919 to 1920? "
            "(Round to the nearest whole number.)"
        ),
        "answer": 9,
        "unit": "%",
        "explanation": "Percentage increase = ((2061 - 1883) / 1883) x 100 = (178 / 1883) x 100 ≈ 9.46% ≈ 9% (nearest whole number). The continuing rise in strikes in 1920, combined with the factory occupations in September 1920, convinced the middle class that the state was losing control.",
        "competency": False,
        "verification": {"num": 2061, "den": 1883, "diff": 178, "pct": round(178 / 1883 * 100)},
    },
    {
        "id": "C11H046_LA_01",
        "type": "long_answer",
        "difficulty": "Hard",
        "topic": "Rise of Fascism in Italy",
        "node": "c11_hist_046",
        "question": (
            "'Mussolini did not create Fascism - Fascism created Mussolini.' "
            "Discuss this statement with reference to the socio-economic and political "
            "conditions in Italy between 1919 and 1922."
        ),
        "answer": (
            "The statement means that Mussolini's rise was not the product of individual "
            "genius or charisma alone, but of objective structural conditions in Italian "
            "society that made the Fascist movement a mass force.\n\n"
            "ECONOMIC CONDITIONS: Italy spent 148 billion lire on WWI (9.25 years of "
            "national income), financed by borrowing. This caused inflation of 400% by "
            "1920, wiping out middle-class savings. The lira fell from 25 to 40 per "
            "dollar. Industrialists and landowners, whose profits were threatened by "
            "strikes, willingly financed the Fascist squads (squadristi).\n\n"
            "SOCIAL CONDITIONS - BIENNIO ROSSO: 1919-20 saw 1,883 strikes in 1919 and "
            "2,061 in 1920. In September 1920, 570 factories were occupied in Turin and "
            "Milan by metalworkers. The PSI (Italian Socialist Party) grew to 200,000 "
            "members. Property owners feared a Bolshevik-style revolution.\n\n"
            "POLITICAL CONDITIONS: The parliamentary system was weak and fragmented. "
            "Five coalition governments fell between 1919 and 1922. Giolitti's "
            "liberal governments relied on temporary majorities. The King (Victor "
            "Emmanuel III) distrusted the Socialists.\n\n"
            "MUSSOLINI'S EXPLOITATION: Mussolini skillfully exploited all these "
            "conditions - he presented Fascism as the only force capable of stopping "
            "communism, restoring order, and achieving national glory. The squadristi "
            "violence was tacitly supported by the state. The March on Rome (October "
            "1922) succeeded not because of Fascist military strength but because the "
            "King and establishment chose Mussolini as the 'lesser evil' to prevent "
            "leftist revolution.\n\n"
            "CONCLUSION: Without the mutilated victory, economic collapse, Biennio "
            "Rosso, and weak parliamentary system, Fascism would have remained a fringe "
            "movement of 200 men in Piazza San Sepolcro. The conditions created the "
            "Fascist mass movement; Mussolini merely provided its leadership."
        ),
        "keywords": [
            "mutilated victory",
            "148 billion lire",
            "400% inflation",
            "Biennio Rosso",
            "1,883 strikes",
            "570 factories",
            "PSI",
            "weak coalition",
            "squadristi",
            "March on Rome",
        ],
        "min_keywords": 5,
        "explanation": "A good long-answer response must cover all four structural conditions (economic, social, political, diplomatic) and explain how Mussolini exploited each. The Indian student should note parallels with how colonial economic disruption and political instability can create openings for authoritarian movements.",
        "competency": False,
    },
    {
        "id": "C11H046_LA_02",
        "type": "long_answer",
        "difficulty": "Hard",
        "topic": "Rise of Fascism in Italy",
        "node": "c11_hist_046",
        "question": (
            "Compare the 'Red Menace' in Italy (1919-20) with the fear of communist "
            "revolution in India during the same period (e.g., the Tebhaga movement, "
            "Telangana armed struggle context). How did fear of revolution serve as a "
            "political tool for authoritarian forces in both contexts?"
        ),
        "answer": (
            "The 'Red Menace' in Italy (1919-20) and the fear of communist revolution "
            "in colonial India share important parallels as political instruments:\n\n"
            "ITALY - RED MENACE: The Biennio Rosso (1919-20) saw 1,883 strikes in 1919 "
            "and factory occupations in 1920. The PSI (Italian Socialist Party) grew "
            "rapidly. Industrialists, landowners, and the middle class feared a "
            "Bolshevik-style revolution like that in Russia (1917). Mussolini exploited "
            "this fear by positioning Fascism as the defender of property, law, and "
            "order. The state turned a blind eye to squadristi violence against "
            "socialists.\n\n"
            "INDIA - FEAR OF COMMUNISM: In the Tebhaga movement (1946-47) in Bengal "
            "and the Telangana armed struggle (1946-51), peasants rose against "
            "zamindars. The Indian National Congress and Muslim League, representing "
            "landed interests, painted these peasant movements as ' communist-inspired' "
            "to justify suppression. In the 1950s-60s, the 'Communist Threat' was used "
            "by the Congress government to justify the Defence of India Rules and crack "
            "downs on leftist movements.\n\n"
            "COMMON PATTERN: In both contexts, fear of revolution from below was "
            "instrumentalised by dominant economic and political groups to justify "
            "authoritarian measures, suppress democratic movements, and consolidate "
            "power. The 'Red Menace' served to unite disparate ruling-class interests "
            "against a common enemy - whether workers/peasants in Italy or landless "
            "peasants in India."
        ),
        "keywords": [
            "Red Menace",
            "Biennio Rosso",
            "fear of revolution",
            "squadristi",
            "Tebhaga",
            "Telangana",
            "zamindars",
            "authoritarian",
        ],
        "min_keywords": 4,
        "explanation": "This competency question connects Italian Fascism to Indian history, making the material more relatable for CISCE students. The key insight is that fear of revolution is a universal political tool used by ruling groups across different historical contexts.",
        "competency": True,
    },
    # ── NODE c11_hist_050: Weaknesses of the Weimar Republic ────────────
    {
        "id": "C11H050_MCQ_01",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Weaknesses of the Weimar Republic",
        "node": "c11_hist_050",
        "question": "In which year was the Weimar Republic officially founded, and where was its constitution adopted?",
        "options": [
            "A - 1918, Berlin",
            "B - 1919, Weimar",
            "C - 1920, Munich",
            "D - 1923, Frankfurt",
        ],
        "answer": "B",
        "explanation": "The Weimar Republic was founded in 1919 after the abdication of Kaiser Wilhelm II in November 1918. The new constitution was drafted and adopted in the city of Weimar (in Thuringia) in August 1919, chosen because Berlin was still under threat from the Spartacist uprising.",
        "competency": False,
    },
    {
        "id": "C11H050_MCQ_02",
        "type": "mcq",
        "difficulty": "Hard",
        "topic": "Weaknesses of the Weimar Republic",
        "node": "c11_hist_050",
        "question": "Article 48 of the Weimar Constitution allowed the President to:",
        "options": [
            "A - Declare war without Reichstag approval",
            "B - Rule by emergency decree without Reichstag approval",
            "C - Appoint the Chancellor without elections",
            "D - Dissolve the Reichstag permanently",
        ],
        "answer": "B",
        "explanation": "Article 48 of the Weimar Constitution allowed the Reichspräsident (President) to take emergency measures without prior consent of the Reichstag, including issuing emergency decrees. This was originally intended for genuine emergencies but was systematically exploited. Chancellor Heinrich Brüning used Article 48 over 100 times (1930-1932) to pass budgets, effectively ruling by decree.",
        "competency": False,
    },
    {
        "id": "C11H050_MCQ_03",
        "type": "mcq",
        "difficulty": "Hard",
        "topic": "Weaknesses of the Weimar Republic",
        "node": "c11_hist_050",
        "question": "The Weimar Republic's system of proportional representation led to:",
        "options": [
            "A - Strong majority governments",
            "B - Stable two-party systems",
            "C - Fragmented Reichstag with unstable coalition governments",
            "D - Frequent direct presidential elections",
        ],
        "answer": "C",
        "explanation": "Proportional representation meant that even small parties (often with 2-3% of the vote) won seats in the Reichstag. This produced highly fragmented parliaments with no single party able to command a majority. Coalition governments were fragile and short-lived, undermining effective governance and public confidence in democracy.",
        "competency": False,
    },
    {
        "id": "C11H050_MCQ_04",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Weaknesses of the Weimar Republic",
        "node": "c11_hist_050",
        "question": "How much did Germany have to pay in reparations under the Treaty of Versailles (1919)?",
        "options": [
            "A - 33 billion gold marks",
            "B - 66 billion gold marks",
            "C - 132 billion gold marks",
            "D - 264 billion gold marks",
        ],
        "answer": "C",
        "explanation": "The Treaty of Versailles imposed 132 billion gold marks in reparations on Germany (set in 1921). This enormous sum, combined with the loss of 13% of European territory (including the industrial-rich Alsace-Lorraine and the Saar), crippled the German economy and poisoned the Republic's legitimacy from the start.",
        "competency": False,
    },
    {
        "id": "C11H050_MCQ_05",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Weaknesses of the Weimar Republic",
        "node": "c11_hist_050",
        "question": (
            "The 'War Guilt Clause' of the Treaty of Versailles (Article 231) was "
            "particularly damaging to the Weimar Republic because:"
        ),
        "options": [
            "A - It forced Germany to accept all blame for WWI, which German nationalists used to attack the Republic as 'traitors'",
            "B - It banned the German military entirely",
            "C - It gave France control over the Rhine",
            "D - It divided Germany into occupation zones",
        ],
        "answer": "A",
        "explanation": "Article 231 (the War Guilt Clause) required Germany to accept sole responsibility for WWI. German nationalists, including the Nazis and the DNVP, used this clause to portray the Weimar government as 'November Criminals' who had 'stabbed Germany in the back' (Dolchstosslegende). The Republic was associated with national humiliation from its inception.",
        "competency": False,
    },
    {
        "id": "C11H050_MCQ_06",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Weaknesses of the Weimar Republic",
        "node": "c11_hist_050",
        "question": (
            "In India, the Government of India Act 1935 introduced which feature that "
            "was similar in its effect to proportional representation in Weimar Germany "
            "- both leading to unstable coalition governments?"
        ),
        "options": [
            "A - A strong executive with no legislature",
            "B - Separate electorates for minorities",
            "C - Provincial autonomy with diarchy at the centre",
            "D - Proportional representation for minorities and separate electorates",
        ],
        "answer": "D",
        "explanation": "The Government of India Act 1935 (based on the 1933 White Paper) introduced communal (separate) electorates for Muslims, Sikhs, Christians, and others. Like proportional representation in Weimar, this created highly fragmented legislatures where no single party could command a majority, leading to unstable coalition governments at the provincial level.",
        "competency": True,
    },
    {
        "id": "C11H050_FB_01",
        "type": "fill_blank",
        "difficulty": "Medium",
        "topic": "Weaknesses of the Weimar Republic",
        "node": "c11_hist_050",
        "question": (
            "The article of the Weimar Constitution that allowed the President to rule "
            "by emergency decree was Article __________."
        ),
        "answer": "48",
        "alternate_answers": ["Article 48", "Art. 48"],
        "explanation": "Article 48 was the constitutional mechanism that ultimately destroyed the Weimar Republic. Originally intended for genuine national emergencies, it was invoked over 100 times by Chancellor Brüning (1930-32) to pass austerity budgets without Reichstag approval. This normalised rule by decree and eroded parliamentary democracy.",
        "competency": False,
    },
    {
        "id": "C11H050_FB_02",
        "type": "fill_blank",
        "difficulty": "Medium",
        "topic": "Weaknesses of the Weimar Republic",
        "node": "c11_hist_050",
        "question": (
            "By November 1923, hyperinflation in Germany had driven the price of a "
            "loaf of bread to approximately __________ marks."
        ),
        "answer": "200 billion",
        "alternate_answers": ["200,000,000,000", "200 milliard"],
        "explanation": "German hyperinflation of 1923 was one of the most extreme episodes in economic history. By November 1923, a loaf of bread cost 200 billion marks, a kilogram of butter 2-3 trillion marks. The middle class saw life savings wiped out. This destroyed faith in the democratic Republic, which was blamed for the crisis.",
        "competency": False,
    },
    {
        "id": "C11H050_FB_03",
        "type": "fill_blank",
        "difficulty": "Easy",
        "topic": "Weaknesses of the Weimar Republic",
        "node": "c11_hist_050",
        "question": (
            "The nickname given to Germans who signed the 1919 armistice and ratified "
            "the Treaty of Versailles, used by right-wing nationalists to delegitimise "
            "the Weimar Republic, was the '__________.'"
        ),
        "answer": "November Criminals",
        "alternate_answers": ["Novemberkriminelle", "Novembersverbrecher"],
        "explanation": "The Dolchstosslegende ('Stab-in-the-Back Myth') held that Germany's armies were undefeated on the battlefield but were betrayed by civilians - Jews, Socialists, and politicians - who signed the armistice and ratified Versailles. These people were called 'November Criminals.' The myth delegitimised the Weimar Republic from its inception.",
        "competency": False,
    },
    {
        "id": "C11H050_FB_04",
        "type": "fill_blank",
        "difficulty": "Hard",
        "topic": "Weaknesses of the Weimar Republic",
        "node": "c11_hist_050",
        "question": (
            "The emergency plan by which American loans were supposed to sustain "
            "German reparations payments after 1924 was known as the __________ Plan."
        ),
        "answer": "Dawes",
        "alternate_answers": ["Dawes Plan", "Dawes"],
        "explanation": "The Dawes Plan (1924), engineered by American banker Charles Dawes, restructured German reparations payments and arranged for American loans to flow into Germany. This temporarily stabilised the German economy (1924-29 - the 'Golden Years'). When the Wall Street Crash (October 1929) ended American lending, Germany's economy collapsed again.",
        "competency": False,
    },
    {
        "id": "C11H050_SA_01",
        "type": "short_answer",
        "difficulty": "Medium",
        "topic": "Weaknesses of the Weimar Republic",
        "node": "c11_hist_050",
        "question": "Explain how each of the following weakened the Weimar Republic: (a) Article 48, (b) proportional representation, (c) the Treaty of Versailles.",
        "answer": (
            "(a) Article 48: Allowed the President to rule by emergency decree without "
            "Reichstag approval. Used over 100 times by Brüning (1930-32) to pass "
            "budgets. Normalised authoritarian rule and bypassed parliamentary democracy.\n"
            "(b) Proportional representation: Produced a highly fragmented Reichstag "
            "with no single party able to command a majority. Coalition governments were "
            "fragile and short-lived, undermining effective governance and public faith "
            "in democracy.\n"
            "(c) Treaty of Versailles: Imposed 132 billion gold marks in reparations, "
            "13% territorial loss including Alsace-Lorraine, the War Guilt Clause "
            "(Article 231), and military restrictions. Right-wing nationalists used "
            "Versailles to attack the Republic as 'November Criminals' - the Republic "
            "was associated with national humiliation from day one."
        ),
        "keywords": [
            "Article 48",
            "emergency decree",
            "Brüning",
            "proportional representation",
            "unstable coalition",
            "fragmented",
            "Treaty of Versailles",
            "132 billion gold marks",
            "War Guilt Clause",
            "November Criminals",
        ],
        "min_keywords": 5,
        "explanation": "This question tests the student's ability to explain the structural weaknesses of the Weimar Republic. Note the interconnection: proportional representation made coalition government unstable, which made Article 48 seem necessary, which further eroded democracy - a self-reinforcing spiral of weakness.",
        "competency": False,
    },
    {
        "id": "C11H050_SA_02",
        "type": "short_answer",
        "difficulty": "Medium",
        "topic": "Weaknesses of the Weimar Republic",
        "node": "c11_hist_050",
        "question": (
            "State THREE Weimar chancellors who ruled primarily by emergency decree "
            "under Article 48 between 1930 and 1933."
        ),
        "answer": (
            "Three Weimar chancellors who ruled by Article 48 emergency decree:\n"
            "1. Heinrich Brüning (1930-1932): Used Article 48 over 100 times to pass "
            "austerity budgets.\n"
            "2. Franz von Papen (1932): Also ruled by decree; lifted the ban on the "
            "SA, hoping to use the Nazis against the left.\n"
            "3. Kurt von Schleicher (1932-1933): The last Weimar chancellor before "
            "Hitler; attempted to split the Nazi Party but failed.\n"
            "(Note: some sources also include von Papen as Vice-Chancellor under "
            "Hindenburg who effectively controlled the government.)"
        ),
        "keywords": [
            "Brüning",
            "Papen",
            "Schleicher",
            "Article 48",
            "emergency decree",
            "1930",
            "1932",
        ],
        "explanation": "By 1932, parliamentary democracy had effectively ceased to function in Germany. Three successive chancellors governed entirely by emergency decree, bypassing the Reichstag. This normalised authoritarian governance and paved the way for Hitler's appointment as Chancellor in January 1933.",
        "competency": False,
    },
    {
        "id": "C11H050_NUM_01",
        "type": "numerical",
        "difficulty": "Medium",
        "topic": "Weaknesses of the Weimar Republic",
        "node": "c11_hist_050",
        "question": (
            "Germany's reparations were set at 132 billion gold marks. If the Dawes Plan "
            "(1924) reduced the annual payment to approximately 1 billion gold marks, "
            "how many years would it take to pay off the full reparations at that rate?"
        ),
        "answer": 132,
        "unit": "years",
        "explanation": "132 billion / 1 billion per year = 132 years. The Dawes Plan rescheduled payments but did not reduce the total - it simply spread it out with American loans. When the Wall Street Crash ended those loans in 1929, Germany could no longer make payments, leading to the Young Plan renegotiation (1929).",
        "competency": False,
        "verification": {"total": 132, "annual": 1, "years": 132},
    },
    {
        "id": "C11H050_NUM_02",
        "type": "numerical",
        "difficulty": "Hard",
        "topic": "Weaknesses of the Weimar Republic",
        "node": "c11_hist_050",
        "question": (
            "In the 1932 elections, unemployment in Germany reached approximately "
            "6 million, representing about 30% of the workforce. If the total workforce "
            "was 20 million in 1932, verify whether 6 million represents 30%."
        ),
        "answer": 30,
        "unit": "%",
        "explanation": "Verification: (6,000,000 / 20,000,000) x 100 = 30%. This mass unemployment - the highest in any industrialised nation - destroyed public faith in the Weimar Republic and made extremist parties (Nazis and Communists) more attractive. The Nazis promised jobs and national restoration.",
        "competency": False,
        "verification": {"unemployed": 6, "workforce": 20, "pct": 30},
    },
    {
        "id": "C11H050_LA_01",
        "type": "long_answer",
        "difficulty": "Hard",
        "topic": "Weaknesses of the Weimar Republic",
        "node": "c11_hist_050",
        "question": (
            "Analyse how the structural flaws of the Weimar Constitution - specifically "
            "proportional representation and Article 48 - combined with external shocks "
            "(Versailles, 1923 hyperinflation, 1929 Great Depression) to undermine "
            "German democracy between 1919 and 1933."
        ),
        "answer": (
            "The Weimar Republic was undermined by a deadly interaction between "
            "internal structural flaws and external economic shocks:\n\n"
            "STRUCTURAL FLAWS:\n"
            "1. Proportional Representation: Produced fragmented Reichstag with 10-15 "
            "parties. No party ever won a majority alone. Coalition governments were "
            "fragile, short-lived, and ineffective.\n"
            "2. Article 48: Designed as a safety valve for emergencies, it was "
            "exploited to bypass parliament entirely. Brüning used it 100+ times "
            "(1930-32), normalising authoritarian governance.\n\n"
            "EXTERNAL SHOCKS:\n"
            "1. Treaty of Versailles (1919): 132 billion gold marks reparations, 13% "
            "territorial loss, War Guilt Clause. Right-wing parties (DNVP, NSDAP) used "
            "this to attack the Republic as 'November Criminals.'\n"
            "2. Hyperinflation (1923): A loaf of bread cost 200 billion marks by Nov "
            "1923. Middle-class savings wiped out. Destroyed faith in democratic "
            "government's economic management.\n"
            "3. Great Depression (1929): Wall Street Crash ended American loans (Dawes "
            "Plan). Unemployment reached 6 million (30%) by 1932.\n\n"
            "INTERACTION: Each crisis amplified the constitutional weaknesses. The "
            "fragmented Reichstag could not agree on solutions, so Article 48 was "
            "invoked more frequently, further eroding democratic norms. The Republic "
            "never had a period of stable democratic governance to consolidate public "
            "support. By 1932, democracy had effectively ceased; Hitler's appointment "
            "as Chancellor in January 1933 was the final step in a process already "
            "well underway."
        ),
        "keywords": [
            "proportional representation",
            "Article 48",
            "fragmented",
            "unstable coalition",
            "Treaty of Versailles",
            "132 billion",
            "hyperinflation",
            "200 billion marks",
            "Great Depression",
            "6 million unemployed",
            "November Criminals",
        ],
        "min_keywords": 6,
        "explanation": "This long-answer question requires students to synthesise constitutional, diplomatic, and economic factors. The key analytical insight is that structural flaws and external shocks interacted to create a spiral of democratic breakdown - each crisis made the next constitutional abuse more likely.",
        "competency": False,
    },
    # ── NODE c11_hist_055: Causes of Japanese Militarism (1930s) ────────
    {
        "id": "C11H055_MCQ_01",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Causes of Japanese Militarism",
        "node": "c11_hist_055",
        "question": "The Great Depression of 1929 devastated Japan primarily by causing the collapse of:",
        "options": [
            "A - Japanese agricultural rice production",
            "B - Japanese silk exports to the USA (which fell by over 50% by 1930)",
            "C - The Japanese military budget",
            "D - The Japanese gold standard",
        ],
        "answer": "B",
        "explanation": "Japan's economy was heavily dependent on exports, particularly raw silk to the United States. When the Wall Street Crash caused American demand for luxury goods like silk to collapse, Japanese silk exports fell by over 50% by 1930. This devastated rural farmers in Tohoku (northeast Japan) who relied on silkworm rearing, creating mass rural poverty and discrediting the civilian party government.",
        "competency": False,
    },
    {
        "id": "C11H055_MCQ_02",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Causes of Japanese Militarism",
        "node": "c11_hist_055",
        "question": "The Washington Naval Treaty (1922) and the London Naval Treaty (1930) angered the Japanese military because they:",
        "options": [
            "A - Forced Japan to reduce its navy to a ratio unfavourable to Japan compared to the USA and Britain",
            "B - Required Japan to pay war reparations to China",
            "C - Forbade Japan from having any submarines",
            "D - Required Japan to withdraw from Korea",
        ],
        "answer": "A",
        "explanation": "The Washington Naval Treaty (1922) established a 5:5:3 ratio of capital ships for USA:Britain:Japan. The London Naval Treaty (1930) further restricted Japan's fleet. The military saw this as humiliation - a Western conspiracy to contain Japan's rise as a Pacific power. Prime Minister Hamaguchi Osachi was assassinated (14 Nov 1930) for ratifying the London Treaty.",
        "competency": False,
    },
    {
        "id": "C11H055_MCQ_03",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Causes of Japanese Militarism",
        "node": "c11_hist_055",
        "question": "The Manchurian Incident (September 1931) is significant because it marked:",
        "options": [
            "A - Japan's formal declaration of war on China",
            "B - The Kwantung Army staging an invasion of Manchuria without government approval, breaking civilian control over the military",
            "C - The formation of the League of Nations",
            "D - Japan's withdrawal from the League of Nations",
        ],
        "answer": "B",
        "explanation": "The Manchurian Incident (18 September 1931) was staged by the Kwantung Army (Japan's military force in Manchuria) without authorization from the civilian cabinet in Tokyo. They blew up a section of the South Manchuria Railway near Mukden and blamed Chinese forces. This marked the definitive breakdown of civilian control over foreign policy - the military now dictated national policy.",
        "competency": False,
    },
    {
        "id": "C11H055_MCQ_04",
        "type": "mcq",
        "difficulty": "Hard",
        "topic": "Causes of Japanese Militarism",
        "node": "c11_hist_055",
        "question": "The May 15 Incident of 1932 resulted in:",
        "options": [
            "A - The resignation of the Emperor",
            "B - The assassination of Prime Minister Inukai Tsuyoshi by young naval officers, ending party-based cabinets",
            "C - Japan's invasion of Manchuria",
            "D - The dissolution of the Imperial Diet",
        ],
        "answer": "B",
        "explanation": "On 15 May 1932, a group of young naval officers and army cadets assassinated Prime Minister Inukai Tsuyoshi in his official residence. Inukai had been attempting to negotiate with China over Manchuria and curb military spending. His murder marked the effective end of party-based (democratic) government in Japan. Military-backed cabinets followed.",
        "competency": False,
    },
    {
        "id": "C11H055_MCQ_05",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Causes of Japanese Militarism",
        "node": "c11_hist_055",
        "question": (
            "The large industrial conglomerates that monopolised Japanese industry in the "
            "1930s - Mitsui, Mitsubishi, Sumitomo, and Yasuda - were known as:"
        ),
        "options": [
            "A - Shogunates",
            "B - Zaibatsu",
            "C - Kamikaze",
            "D - Samurai",
        ],
        "answer": "B",
        "explanation": "The zaibatsu (literally 'financial clique') were four massive family-controlled industrial and financial conglomerates - Mitsui, Mitsubishi, Sumitomo, and Yasuda - that dominated the Japanese economy. They controlled banks, mining, shipping, and manufacturing. Their collusion with the military was crucial to Japan's militarisation. (After WWII, the zaibatsu were broken up by the Allied Occupation but re-emerged as keiretsu.)",
        "competency": False,
    },
    {
        "id": "C11H055_MCQ_06",
        "type": "mcq",
        "difficulty": "Hard",
        "topic": "Causes of Japanese Militarism",
        "node": "c11_hist_055",
        "question": (
            "An Indian parallel to the Japanese zaibatsu - large industrial conglomerates "
            "that controlled both industry and politics - can be seen in the:"
        ),
        "options": [
            "A - Princely states",
            "B - Tata, Birla, and Ambani industrial groups, which have historically wielded significant influence over Indian economic policy",
            "C - Zamindari system of land tenure",
            "D - Indian National Congress party",
        ],
        "answer": "B",
        "explanation": "In India, large industrial houses like the Tatas, Birlas, and later the Ambanis have wielded enormous influence over economic policy-making, similar to how the zaibatsu dominated Japanese politics. Indian business houses have historically been close to ruling political parties, influencing policy decisions. This helps Indian students understand how economic concentration can shape political outcomes.",
        "competency": True,
    },
    {
        "id": "C11H055_FB_01",
        "type": "fill_blank",
        "difficulty": "Medium",
        "topic": "Causes of Japanese Militarism",
        "node": "c11_hist_055",
        "question": (
            "The Japanese army unit stationed in Manchuria that staged the 1931 invasion "
            "without government approval was called the __________ Army."
        ),
        "answer": "Kwantung",
        "alternate_answers": ["Kwantung Army", "Guandong Army"],
        "explanation": "The Kwantung Army (关东军) was Japan's elite military force stationed in Manchuria (northeast China) to protect the South Manchuria Railway. By the 1930s it acted independently of the Tokyo government. The Manchurian Incident (18 September 1931) was initiated by the Kwantung Army without cabinet approval, demonstrating the military's growing autonomy.",
        "competency": False,
    },
    {
        "id": "C11H055_FB_02",
        "type": "fill_blank",
        "difficulty": "Medium",
        "topic": "Causes of Japanese Militarism",
        "node": "c11_hist_055",
        "question": (
            "The Japanese concept of __________ referred to the uniqueness of Japan's "
            "national polity or 'national essence,' used by militarists to justify "
            "emperor-worship and expansionism."
        ),
        "answer": "kokutai",
        "alternate_answers": ["国体 (kokutai)", "national polity"],
        "explanation": "Kokutai (国体, 'national polity') was a concept promoted by Japanese militarists and ultranationalists to emphasise Japan's divine imperial heritage and unique national identity. It was used to justify emperor-worship, expansionism, and the suppression of political dissent as 'un-Japanese.'",
        "competency": False,
    },
    {
        "id": "C11H055_FB_03",
        "type": "fill_blank",
        "difficulty": "Easy",
        "topic": "Causes of Japanese Militarism",
        "node": "c11_hist_055",
        "question": (
            "The two major political parties in pre-militarist Japan were the "
            "__________ and the Seiyukai."
        ),
        "answer": "Minseito",
        "alternate_answers": ["Minseito (Rikken Minseito)", "Minseito / Rikken Minseito"],
        "explanation": "The Rikken Minseito (Constitutional Democratic Party) and the Rikken Seiyukai (Constitutional Association of Political Friends) were the two major political parties in pre-war Japan (the 'Taisho Democracy' period, 1912-26). By the 1930s, both were discredited by the Great Depression and military violence, paving the way for one-party military rule.",
        "competency": False,
    },
    {
        "id": "C11H055_FB_04",
        "type": "fill_blank",
        "difficulty": "Hard",
        "topic": "Causes of Japanese Militarism",
        "node": "c11_hist_055",
        "question": (
            "By how much did Japanese silk exports to the USA fall between 1929 and "
            "1930 during the Great Depression? (Express as a percentage decrease: "
            "'over __%')"
        ),
        "answer": "50",
        "alternate_answers": ["50%", "over 50%", "fifty"],
        "explanation": "Japanese silk exports to the USA collapsed by over 50% between 1929 and 1930. This was catastrophic for rural Tohoku farmers who relied entirely on silkworm rearing. The 1934 Tohoku famine saw desperate farmers selling their daughters to textile mills. This rural devastation discredited civilian governments and fuelled support for military solutions.",
        "competency": False,
    },
    {
        "id": "C11H055_SA_01",
        "type": "short_answer",
        "difficulty": "Medium",
        "topic": "Causes of Japanese Militarism",
        "node": "c11_hist_055",
        "question": "List and explain any FOUR causes of the rise of militarism in Japan during the 1930s.",
        "answer": (
            "Four causes of the rise of Japanese militarism in the 1930s:\n"
            "1. Great Depression / Economic Collapse (1929): Silk exports to the USA "
            "fell over 50% by 1930, devastating rural Tohoku farmers. Urban unemployment "
            "rose. The civilian Minseito and Seiyukai governments appeared helpless.\n"
            "2. Naval Treaty Humiliation: The Washington Naval Treaty (1922) and London "
            "Naval Treaty (1930) imposed a 5:5:3 ratio on Japan's navy, seen as Western "
            "conspiracy to contain Japan. PM Hamaguchi Osachi was assassinated for "
            "ratifying the London Treaty.\n"
            "3. Breakdown of Civilian Control: The Kwantung Army staged the Manchurian "
            "Incident (Sept 1931) without cabinet approval. The May 15 Incident (1932) "
            "assassinated PM Inukai Tsuyoshi. The military now dictated foreign and "
            "domestic policy.\n"
            "4. Zaibatsu-Military Alliance: The four zaibatsu (Mitsui, Mitsubishi, "
            "Sumitomo, Yasuda) needed new markets and raw materials for their industries. "
            "They colluded with the military to pursue imperial expansion (Manchuria, "
            "China) to secure resources."
        ),
        "keywords": [
            "Great Depression",
            "silk exports",
            "Tohoku",
            "Naval Treaty",
            "Kwantung Army",
            "Manchurian Incident",
            "zaibatsu",
            "breakdown of civilian control",
        ],
        "min_keywords": 4,
        "explanation": "Japanese militarism had both economic and political roots. The Great Depression shattered faith in party government, while the military exploited this by presenting expansion as the solution to economic crisis. The zaibatsu provided the economic base for militarisation.",
        "competency": False,
    },
    {
        "id": "C11H055_SA_02",
        "type": "short_answer",
        "difficulty": "Medium",
        "topic": "Causes of Japanese Militarism",
        "node": "c11_hist_055",
        "question": (
            "Explain the significance of the Manchurian Incident (18 September 1931) "
            "in the breakdown of civilian government in Japan."
        ),
        "answer": (
            "The Manchurian Incident (18 September 1931) was significant because:\n"
            "1. It was STAGED by the Kwantung Army without authorisation from the "
            "civilian cabinet in Tokyo, demonstrating that the military no longer "
            "acknowledged civilian supremacy.\n"
            "2. The Japanese government, rather than punishing the Kwantung Army, "
            "eventually endorsed the invasion and established the puppet state of "
            "Manchukuo (1932), normalising military adventurism.\n"
            "3. It discredited the party-based (Minseito/Seiyukai) governments who "
            "appeared powerless to control the military.\n"
            "4. It set a precedent: military actions abroad could expand Japan's "
            "territory and resources without democratic accountability.\n"
            "5. The League of Nations condemned the invasion (Lytton Report, 1932), "
            "and Japan withdrew from the League in 1933, isolating itself internationally."
        ),
        "keywords": [
            "Kwantung Army",
            "staged",
            "without authorisation",
            "Manchukuo",
            "civilian control",
            "discredited",
            "League of Nations",
        ],
        "min_keywords": 4,
        "explanation": "The Manchurian Incident is a watershed event: it demonstrated the military's complete independence from civilian authority. When the government backed the invasion rather than punishing the officers, it confirmed that Japan was now a military dictatorship in all but name.",
        "competency": False,
    },
    {
        "id": "C11H055_LA_01",
        "type": "long_answer",
        "difficulty": "Hard",
        "topic": "Causes of Japanese Militarism",
        "node": "c11_hist_055",
        "question": (
            "'Economic collapse, not military ambition, was the primary cause of "
            "Japanese militarism in the 1930s.' Analyse this statement with reference "
            "to the Great Depression, rural poverty, and zaibatsu interests."
        ),
        "answer": (
            "While military ambition played a role, economic collapse caused by the "
            "Great Depression was indeed the primary driver of Japanese militarism:\n\n"
            "THE GREAT DEPRESSION AND ECONOMIC COLLAPSE:\n"
            "Japan's economy was heavily dependent on exports, particularly raw silk "
            "to the USA. When the Wall Street Crash (October 1929) caused American "
            "demand to collapse, Japanese silk exports fell by over 50% by 1930. This "
            "catastrophic decline devastated rural communities in Tohoku (northeast "
            "Japan) where farmers relied on silkworm rearing. By 1934, the Tohoku "
            "famine saw farmers literally selling their daughters to textile mills. "
            "Urban unemployment also soared as industries contracted.\n\n"
            "FAILURE OF CIVILIAN GOVERNMENT:\n"
            "The Minseito and Seiyukai party governments appeared completely helpless "
            "in the face of economic collapse. They could not stimulate the economy or "
            "provide relief to starving rural communities. This discredited parliamentary "
            "democracy (the 'Taisho Democracy' experiment, 1912-26) in the eyes of the "
            "public.\n\n"
            "ZAIBATSU INTERESTS:\n"
            "The zaibatsu (Mitsui, Mitsubishi, Sumitomo, Yasuda) monopolised Japanese "
            "industry and finance. They needed new markets, raw materials, and "
            "investment opportunities that Japan's resource-poor home islands could not "
            "provide. Imperial expansion into Manchuria and China offered both raw "
            "materials (coal, iron ore) and captive markets for Japanese manufactured "
            "goods. The zaibatsu financially supported the military's expansionist "
            "programme.\n\n"
            "MILITARY AMBITION AS INSTRUMENT:\n"
            "Military ambition was not independent of economic factors - it was the "
            "INSTRUMENT chosen to solve Japan's economic crisis. Expansion into Manchuria "
            "(1931) and later China (1937) was driven by the need for resources and "
            "markets. The military presented itself as the only force capable of solving "
            "Japan's economic problems through imperial conquest.\n\n"
            "CONCLUSION: Military ambition was the vehicle, but economic collapse - "
            "driven by the Great Depression, rural poverty, and the zaibatsu's need for "
            "new markets - was the engine of Japanese militarism."
        ),
        "keywords": [
            "Great Depression",
            "silk exports",
            "Tohoku",
            "farmers selling daughters",
            "zaibatsu",
            "Minseito",
            "Seiyukai",
            "military as instrument",
            "imperial expansion",
            "Manchuria",
        ],
        "min_keywords": 6,
        "explanation": "This long-answer question tests the student's ability to analyse economic causes of political change. The key argument is that economic crisis created the conditions for military takeover, and the military's expansionist ideology served the economic interests of both the zaibatsu and desperate rural populations.",
        "competency": True,
    },
    {
        "id": "C11H055_LA_02",
        "type": "long_answer",
        "difficulty": "Hard",
        "topic": "Causes of Japanese Militarism",
        "node": "c11_hist_055",
        "question": (
            "Compare and contrast the conditions that led to the rise of Fascism in "
            "Italy (1919-22) and the rise of militarism in Japan (1930s). "
            "Identify at least THREE similarities and TWO differences."
        ),
        "answer": (
            "SIMILARITIES:\n"
            "1. Economic crisis post-WWI: Both Italy and Japan experienced severe "
            "economic disruption. Italy suffered 400% inflation (1919-20); Japan "
            "suffered a 50% collapse in silk exports (1930). Economic crisis discredited "
            "existing governments in both countries.\n"
            "2. Weak civilian governments: Italy had five collapsing coalition governments "
            "(1919-22); Japan's Minseito and Seiyukai governments appeared helpless "
            "during the Depression. In both cases, the public lost faith in parliamentary "
            "democracy.\n"
            "3. Fear of communism / socialism: In Italy, the Biennio Rosso (socialist "
            "strikes and factory occupations) alarmed the middle class and industrialists. "
            "In Japan, while there was no equivalent socialist revolution, the zaibatsu "
            "and military used the threat of 'Red Menace' to justify authoritarian "
            "measures and suppress labour movements.\n\n"
            "DIFFERENCES:\n"
            "1. Italy was on the WINNING side in WWI; Japan was also on the winning side "
            "but its grievance was naval treaty limitations (5:5:3 ratio). Italy's "
            "'mutilated victory' was about territorial disappointment; Japan's was about "
            "being treated as an inferior naval power.\n"
            "2. Italy had a mass Fascist movement (Fasci di Combattimento) with popular "
            "support; Japanese militarism was primarily a takeover by the military "
            "institution itself (Kwantung Army) with less mass popular mobilisation "
            "outside military circles.\n"
            "3. Italy had a charismatic leader (Mussolini) who built a mass party; Japan "
            "had no equivalent single leader - power was distributed among military "
            "factions and the zaibatsu.\n\n"
            "CONCLUSION: Both cases show how economic crisis and weak democracy create "
            "conditions for authoritarian takeover, but the specific forms of authoritarianism "
            "differed: Italy developed a mass Fascist movement; Japan saw a military "
            "institutional takeover backed by industrial conglomerates."
        ),
        "keywords": [
            "economic crisis",
            "inflation",
            "silk exports",
            "weak civilian government",
            "fear of communism",
            "mutilated victory",
            "naval treaty",
            "Mussolini",
            "Kwantung Army",
            "zaibatsu",
            "mass movement",
        ],
        "min_keywords": 6,
        "explanation": "This comparative question tests analytical skills at the highest level. Indian students benefit from comparing two non-Indian historical cases, developing transferable analytical frameworks. The competency element comes from the structured comparison format.",
        "competency": True,
    },
]


# ======================================================================
# QUESTION GENERATOR
# ======================================================================

def generate_questions(seed: int, count: int) -> List[Dict[str, Any]]:
    """
    Deterministically generate 'count' questions from the bank.

    Selection strategy:
      • Split bank into standard (competency=False) and competency (competency=True).
      • 50% of output slots → standard, 50% → competency.
      • Within each half, cycle through the sub-bank in seeded-random order
        (repeat from start if count exceeds sub-bank size).
    """
    rng = random.Random(seed)

    standard = [q for q in _QUESTION_BANK if not q.get("competency", False)]
    competency = [q for q in _QUESTION_BANK if q.get("competency", False)]

    # shuffle each sub-list deterministically
    std_order = standard[:]
    comp_order = competency[:]
    rng.shuffle(std_order)
    rng.shuffle(comp_order)

    n_std = count // 2
    n_comp = count - n_std  # odd count → extra goes to competency

    selected: List[Dict[str, Any]] = []
    for i in range(n_std):
        selected.append(std_order[i % len(std_order)])
    for i in range(n_comp):
        selected.append(comp_order[i % len(comp_order)])

    # Shuffle the combined list to interleave standard and competency questions
    rng.shuffle(selected)

    # Assign sequential IDs and return clean copies
    result = []
    for idx, q in enumerate(selected):
        q_copy = dict(q)
        q_copy["id"] = f"C11H_GEN_{seed:08d}_{idx:03d}"
        result.append(q_copy)

    return result


# ======================================================================
# SCORING / EVALUATION HELPERS
# ======================================================================

def score_keyword_answer(user_answer: str, keywords: List[str],
                         min_keywords: int = 3) -> Tuple[float, List[str]]:
    """Score a free-text answer against a keyword list."""
    norm = normalize(user_answer)
    matched = [kw for kw in keywords if normalize(kw) in norm]
    score = min(len(matched) / min_keywords, 1.0)
    return round(score, 2), matched


def score_long_answer(user_answer: str, keywords: List[str],
                      min_keywords: int = 5) -> Tuple[float, List[str]]:
    """Score a long-answer question against a keyword list."""
    norm = normalize(user_answer)
    matched = [kw for kw in keywords if normalize(kw) in norm]
    score = min(len(matched) / min_keywords, 1.0)
    return round(score, 2), matched


# ======================================================================
# SOLVER FUNCTIONS
# ======================================================================

def solve_mcq(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Solve an MCQ question.
    params: {question_id, selected_option}
    Returns: answer, correct, explanation, steps, verification
    """
    question_id = params.get("question_id", "")
    selected = params.get("selected_option", "")

    # Find the question in the bank
    question = next((q for q in _QUESTION_BANK if q["id"] == question_id), None)
    if not question:
        return {
            "answer": "Question not found",
            "correct": False,
            "explanation": f"No question with ID '{question_id}' found in the bank.",
            "steps": ["Look up question by ID in question bank."],
            "verification": {"question_found": False},
        }

    correct_answer = question["answer"]
    is_correct = (selected.strip().upper() == correct_answer.strip().upper())

    steps = [
        f"1. Identified question ID: {question_id}",
        f"2. Question type: MCQ ({question['difficulty']}) - Topic: {question['topic']}",
        f"3. Correct answer: {correct_answer}",
        f"4. Student selected: {selected}",
        f"5. Comparison: selected == correct → {is_correct}",
    ]

    verification = {
        "question_found": True,
        "correct_answer": correct_answer,
        "selected_option": selected,
        "is_correct": is_correct,
        "all_options": [opt.split(" - ")[0].strip() for opt in question.get("options", [])],
    }

    return {
        "answer": correct_answer,
        "correct": is_correct,
        "explanation": question["explanation"],
        "steps": steps,
        "verification": verification,
    }


def solve_fill_blank(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Solve a fill-in-the-blank question.
    params: {question_id, student_answer}
    Returns: answer, correct, explanation, steps, verification
    """
    question_id = params.get("question_id", "")
    student_answer = params.get("student_answer", "")

    question = next((q for q in _QUESTION_BANK if q["id"] == question_id), None)
    if not question:
        return {
            "answer": "Question not found",
            "correct": False,
            "explanation": f"No question with ID '{question_id}' found.",
            "steps": ["Look up question by ID in question bank."],
            "verification": {"question_found": False},
        }

    correct_answer = question["answer"]
    alt_answers = question.get("alternate_answers", [])

    # Check primary and alternate answers
    norm_student = normalize(student_answer)
    is_correct = normalize(correct_answer) == norm_student
    if not is_correct:
        is_correct = any(normalize(alt) == norm_student for alt in alt_answers)

    steps = [
        f"1. Identified question ID: {question_id}",
        f"2. Question type: Fill-in-the-blank ({question['difficulty']}) - Topic: {question['topic']}",
        f"3. Correct answer: {correct_answer}",
        f"4. Alternate acceptable answers: {alt_answers}",
        f"5. Student answer: {student_answer}",
        f"6. Normalised comparison → correct: {is_correct}",
    ]


    return {"status": "ok", "note": "truncated"}
