"""
CISCE Class 4 Geography Question Generator
Deterministic, seeded, comprehensive coverage of all syllabus nodes.
"""

import random
import math
from fractions import Fraction
from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional

# ============================================================
# SYLLABUS DATA
# ============================================================

TOPICS = {
    "rotation": "Rotation of Earth",
    "revolution": "Revolution of Earth and Seasons",
    "four_domains": "Four Domains of the Earth",
    "continents_oceans": "Continents and Oceans",
    "maps": "Maps and Map Elements",
    "india_states": "India - States and UTs",
    "india_physical": "India - Physical Divisions",
    "rivers_india": "Rivers of India",
    "climate_vegetation": "Climate and Vegetation",
    "soils_india": "Soils of India",
}

# ============================================================
# QUESTION BANK - Competency + Standard (50/50 mix)
# ============================================================

QUESTION_BANK = [
    # ---- ROTATION ----
    {
        "id": "c4g_001", "type": "mcq", "topic": "rotation", "difficulty": "easy",
        "question": "The Earth rotates on its axis. This imaginary line runs from which point to which point?",
        "options": ["Equator to Tropic of Cancer", "North Pole to South Pole",
                     "Tropic of Capricorn to Tropic of Cancer", "Prime Meridian to 180 deg "],
        "answer": 1,
        "explanation": "The Earth's axis is an imaginary line that runs from the North Pole to the South Pole. It is tilted at 23.5 deg  from the vertical."
    },
    {
        "id": "c4g_002", "type": "mcq", "topic": "rotation", "difficulty": "easy",
        "question": "In which direction does the Earth rotate on its axis?",
        "options": ["East to West", "West to East", "North to South", "South to North"],
        "answer": 1,
        "explanation": "The Earth rotates from west to east. This is why the Sun appears to rise in the east and set in the west."
    },
    {
        "id": "c4g_003", "type": "fill_blank", "topic": "rotation", "difficulty": "easy",
        "question": "One complete rotation of the Earth takes _____ hours, which is equal to one _____.",
        "answer": ["24", "day"],
        "explanation": "The Earth completes one full rotation in 24 hours. This period of 24 hours is called one day."
    },
    {
        "id": "c4g_004", "type": "mcq", "topic": "rotation", "difficulty": "easy",
        "question": "Which of the following is NOT an effect of the Earth's rotation?",
        "options": ["Day and night", "Sun appears to rise in the east",
                     "Tides", "Change of seasons"],
        "answer": 3,
        "explanation": "Change of seasons is caused by revolution, not rotation. The effects of rotation are: day and night cycle, apparent rising and setting of the Sun, and tides."
    },
    {
        "id": "c4g_005", "type": "short_answer", "topic": "rotation", "difficulty": "easy",
        "question": "What is the tilt of the Earth's axis (in degrees) from the vertical?",
        "answer": "23.5 degrees",
        "explanation": "The Earth's axis is tilted at 23.5 deg  from the vertical. This tilt is responsible for the changing seasons along with revolution."
    },
    {
        "id": "c4g_006", "type": "short_answer", "topic": "rotation", "difficulty": "medium",
        "question": "Why does the Sun appear to rise in the east and set in the west?",
        "answer": "Because the Earth rotates from west to east on its axis.",
        "explanation": "The Earth rotates from west to east. As the Earth turns, different parts face the Sun (day) or face away (night). This westward apparent motion of the Sun is actually due to Earth's eastward rotation."
    },
    {
        "id": "c4g_007", "type": "long_answer", "topic": "rotation", "difficulty": "medium",
        "question": "Explain how the rotation of the Earth causes day and night. Use a diagram description in your answer.",
        "answer": "The Earth rotates on its axis from west to east. At any given moment, one half of the Earth faces the Sun and receives sunlight - this is day. The other half faces away from the Sun - this is night. As the Earth completes its rotation in 24 hours, each place on Earth experiences both day and night. A simple diagram would show a globe with one half shaded (night) and one half lit (day), with an arrow showing west-to-east rotation.",
        "explanation": "Rotation is the spinning of Earth on its axis. The half facing the Sun experiences daylight while the opposite half is in darkness. As Earth rotates, positions change from day to night and back, completing one cycle in 24 hours."
    },
    {
        "id": "c4g_008", "type": "mcq", "topic": "rotation", "difficulty": "easy",
        "question": "In Indian cities like Delhi and Mumbai, the Sun is brightest around noon. What does this tell us about India's position relative to the Sun at noon?",
        "options": ["India is on the side of Earth facing away from the Sun",
                     "India is on the side of Earth facing the Sun",
                     "India is at the North Pole",
                     "India is at the South Pole"],
        "answer": 1,
        "explanation": "At noon in India, the country is on the side of Earth facing the Sun. This is why sunlight is brightest. This happens because of Earth's rotation."
    },
    {
        "id": "c4g_009", "type": "numerical", "topic": "rotation", "difficulty": "medium",
        "question": "One rotation of Earth takes 24 hours. How many minutes is that?",
        "options": ["120 minutes", "1440 minutes", "240 minutes", "60 minutes"],
        "answer": 1,
        "explanation": "24 hours x 60 minutes/hour = 1440 minutes. This is the total time for one complete rotation."
    },
    {
        "id": "c4g_010", "type": "mcq", "topic": "rotation", "difficulty": "easy",
        "question": "The imaginary line passing through the North Pole and South Pole is called the:",
        "options": ["Equator", "Axis", "Meridian", "Parallel"],
        "answer": 1,
        "explanation": "The axis is the imaginary line passing through the North Pole and South Pole around which the Earth rotates."
    },
    {
        "id": "c4g_011", "type": "fill_blank", "topic": "rotation", "difficulty": "easy",
        "question": "The apparent rising of the Sun in the _____ is due to Earth's west-to-east rotation.",
        "answer": ["east"],
        "explanation": "Because Earth rotates from west to east, the Sun appears to rise in the east and set in the west."
    },

    # ---- REVOLUTION ----
    {
        "id": "c4g_012", "type": "mcq", "topic": "revolution", "difficulty": "easy",
        "question": "One complete revolution of the Earth around the Sun takes approximately:",
        "options": ["24 hours", "30 days", "3651/4 days", "28 days"],
        "answer": 2,
        "explanation": "The Earth takes approximately 3651/4 days to complete one revolution around the Sun. This period is called one year."
    },
    {
        "id": "c4g_013", "type": "mcq", "topic": "revolution", "difficulty": "easy",
        "question": "Why do we have a leap year every 4 years?",
        "options": ["To add an extra day in February because 3651/4 x 4 = 1461 days = 4 years",
                     "Because the Earth slows down",
                     "To make the calendar longer",
                     "Because of the Moon's orbit"],
        "answer": 0,
        "explanation": "Every 4 years, the extra 1/4 day accumulates to 1 full day. So, we add 1 day to February in a leap year (29 days instead of 28). 365.25 x 4 = 1461 days = exactly 4 years."
    },
    {
        "id": "c4g_014", "type": "mcq", "topic": "revolution", "difficulty": "medium",
        "question": "Which movement of the Earth is primarily responsible for the changing seasons?",
        "options": ["Rotation", "Revolution", "Both equally", "Neither"],
        "answer": 1,
        "explanation": "The changing seasons are caused by the Earth's revolution around the Sun combined with its 23.5 deg  axial tilt. Different parts of Earth receive varying amounts of sunlight throughout the year."
    },
    {
        "id": "c4g_015", "type": "numerical", "topic": "revolution", "difficulty": "medium",
        "question": "If one revolution takes 365.25 days, how many days are there in 4 years?",
        "answer": 1461,
        "explanation": "365.25 days/year x 4 years = 1461 days. Of these 1461 days, 3 years have 365 days and 1 year (leap year) has 366 days: 3x365 + 366 = 1461. ✓"
    },
    {
        "id": "c4g_016", "type": "fill_blank", "topic": "revolution", "difficulty": "easy",
        "question": "The Earth revolves around the _____ in an elliptical orbit.",
        "answer": ["Sun"],
        "explanation": "The Earth revolves around the Sun in an elliptical (slightly oval-shaped) orbit. One complete revolution takes about 3651/4 days."
    },
    {
        "id": "c4g_017", "type": "mcq", "topic": "revolution", "difficulty": "easy",
        "question": "In India, when it is summer, the Southern Hemisphere experiences:",
        "options": ["Summer too", "Winter", "Spring", "Autumn"],
        "answer": 1,
        "explanation": "Due to the Earth's tilted axis and revolution, seasons are opposite in the two hemispheres. When the Northern Hemisphere (including India) is tilted toward the Sun (summer), the Southern Hemisphere is tilted away (winter)."
    },
    {
        "id": "c4g_018", "type": "distinguish", "topic": "revolution", "difficulty": "medium",
        "question": "Distinguish between Rotation and Revolution of the Earth.",
        "answer": {
            "Rotation": "Spinning of Earth on its axis; takes 24 hours; causes day and night; direction is west to east.",
            "Revolution": "Movement of Earth around the Sun; takes 3651/4 days (one year); causes seasons; orbit is elliptical."
        },
        "explanation": "Rotation and Revolution are two different movements. Rotation is spinning on axis (daily effect: day/night). Revolution is orbiting the Sun (yearly effect: seasons)."
    },
    {
        "id": "c4g_019", "type": "mcq", "topic": "revolution", "difficulty": "easy",
        "question": "Which month has 29 days in a leap year?",
        "options": ["January", "June", "February", "December"],
        "answer": 2,
        "explanation": "In a leap year, February has 29 days instead of the usual 28 days. This accounts for the extra 1/4 day each year."
    },

    # ---- FOUR DOMAINS ----
    {
        "id": "c4g_020", "type": "mcq", "topic": "four_domains", "difficulty": "easy",
        "question": "The solid part of the Earth consisting of rocks, soil, and mountains is called:",
        "options": ["Hydrosphere", "Lithosphere", "Atmosphere", "Biosphere"],
        "answer": 1,
        "explanation": "The lithosphere is the solid, rocky part of the Earth. It includes the crust and upper mantle, comprising landforms like mountains, plateaus, and plains."
    },
    {
        "id": "c4g_021", "type": "mcq", "topic": "four_domains", "difficulty": "easy",
        "question": "Which domain of the Earth covers about 71% of its surface?",
        "options": ["Lithosphere", "Hydrosphere", "Atmosphere", "Biosphere"],
        "answer": 1,
        "explanation": "The hydrosphere covers about 71% of the Earth's surface. It includes all water bodies - oceans, seas, rivers, lakes, and groundwater."
    },
    {
        "id": "c4g_022", "type": "mcq", "topic": "four_domains", "difficulty": "easy",
        "question": "The layer of air surrounding the Earth is called:",
        "options": ["Lithosphere", "Hydrosphere", "Atmosphere", "Biosphere"],
        "answer": 2,
        "explanation": "The atmosphere is the blanket of air surrounding the Earth. It protects us from harmful solar rays and provides oxygen for breathing."
    },
    {
        "id": "c4g_023", "type": "mcq", "topic": "four_domains", "difficulty": "easy",
        "question": "Which domain of the Earth includes all living things - plants, animals, and humans?",
        "options": ["Lithosphere", "Hydrosphere", "Atmosphere", "Biosphere"],
        "answer": 3,
        "explanation": "The biosphere is the part of the Earth where life exists. It includes all living organisms - plants, animals, and humans."
    },
    {
        "id": "c4g_024", "type": "fill_blank", "topic": "four_domains", "difficulty": "easy",
        "question": "The four domains of the Earth are lithosphere, hydrosphere, atmosphere, and _____.",
        "answer": ["biosphere"],
        "explanation": "The four domains are: Lithosphere (land), Hydrosphere (water), Atmosphere (air), and Biosphere (life)."
    },
    {
        "id": "c4g_025", "type": "short_answer", "topic": "four_domains", "difficulty": "medium",
        "question": "Which domain of the Earth is the deepest? Give an example.",
        "answer": "The hydrosphere is the deepest domain. The Mariana Trench in the Pacific Ocean is the deepest known point on Earth at about 11 km below sea level.",
        "explanation": "The hydrosphere includes oceans and seas. The Mariana Trench reaches approximately 11 km below sea level, making it the deepest known point on Earth, far deeper than any landform."
    },
    {
        "id": "c4g_026", "type": "mcq", "topic": "four_domains", "difficulty": "easy",
        "question": "Which domain includes the Himalayan mountains and the Thar Desert?",
        "options": ["Lithosphere", "Hydrosphere", "Atmosphere", "Biosphere"],
        "answer": 0,
        "explanation": "The Himalayas and the Thar Desert are part of the lithosphere - the solid, rocky part of the Earth."
    },
    {
        "id": "c4g_027", "type": "short_answer", "topic": "four_domains", "difficulty": "medium",
        "question": "Name any two major oceans of the world.",
        "answer": "Pacific Ocean and Atlantic Ocean (any two of: Pacific, Atlantic, Indian, Arctic, Southern).",
        "explanation": "The five major oceans are: Pacific (largest), Atlantic, Indian, Arctic, and Southern (or Antarctic)."
    },

    # ---- CONTINENTS AND OCEANS ----
    {
        "id": "c4g_028", "type": "mcq", "topic": "continents_oceans", "difficulty": "easy",
        "question": "Which is the largest continent in the world by area?",
        "options": ["Africa", "North America", "Asia", "Europe"],
        "answer": 2,
        "explanation": "Asia is the largest continent, covering about 44.6 million sq km. It is home to countries like India, China, Russia (partly), and Japan."
    },
    {
        "id": "c4g_029", "type": "mcq", "topic": "continents_oceans", "difficulty": "easy",
        "question": "Which is the smallest continent in the world?",
        "options": ["Europe", "Australia", "Antarctica", "South America"],
        "answer": 1,
        "explanation": "Australia is the smallest continent. It is both a country and a continent, located in the Southern Hemisphere."
    },
    {
        "id": "c4g_030", "type": "mcq", "topic": "continents_oceans", "difficulty": "easy",
        "question": "Which is the largest ocean in the world?",
        "options": ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        "answer": 3,
        "explanation": "The Pacific Ocean is the largest ocean, covering about 165 million sq km. It lies between Asia/Australia and the Americas."
    },
    {
        "id": "c4g_031", "type": "mcq", "topic": "continents_oceans", "difficulty": "easy",
        "question": "Which ocean is to the south of India?",
        "options": ["Arabian Sea", "Bay of Bengal", "Indian Ocean", "Pacific Ocean"],
        "answer": 2,
        "explanation": "The Indian Ocean lies to the south of India. India is bounded by the Arabian Sea on the west, the Bay of Bengal on the east, and the Indian Ocean on the south."
    },
    {
        "id": "c4g_032", "type": "fill_blank", "topic": "continents_oceans", "difficulty": "easy",
        "question": "The continent where India is located is called _____.",
        "answer": ["Asia"],
        "explanation": "India is located in the continent of Asia. Asia is the largest continent and India is the seventh largest country in Asia by area."
    },
    {
        "id": "c4g_033", "type": "mcq", "topic": "continents_oceans", "difficulty": "medium",
        "question": "How many continents are there in the world?",
        "options": ["5", "6", "7", "8"],
        "answer": 2,
        "explanation": "There are 7 continents: Asia, Africa, North America, South America, Antarctica, Europe, and Australia (sometimes called Oceania)."
    },
    {
        "id": "c4g_034", "type": "numerical", "topic": "continents_oceans", "difficulty": "medium",
        "question": "If the Pacific Ocean covers about 165 million sq km and the Atlantic covers 106 million sq km, what is the difference?",
        "answer": "59 million sq km",
        "explanation": "165 million - 106 million = 59 million sq km. The Pacific Ocean is about 59 million sq km larger than the Atlantic Ocean."
    },
    {
        "id": "c4g_035", "type": "short_answer", "topic": "continents_oceans", "difficulty": "easy",
        "question": "Name the ocean that lies between India and Australia.",
        "answer": "Indian Ocean",
        "explanation": "The Indian Ocean lies between India (to the north), Australia (to the east), Africa (to the west), and the Southern Ocean (to the south)."
    },

    # ---- MAPS ----
    {
        "id": "c4g_036", "type": "mcq", "topic": "maps", "difficulty": "easy",
        "question": "A map showing mountains, rivers, and plains is called a:",
        "options": ["Political map", "Physical map", "Thematic map", "Road map"],
        "answer": 1,
        "explanation": "A physical map shows natural features of the Earth like mountains, rivers, plains, plateaus, and oceans."
    },
    {
        "id": "c4g_037", "type": "mcq", "topic": "maps", "difficulty": "easy",
        "question": "A map showing countries, states, and cities with their boundaries is called a:",
        "options": ["Physical map", "Political map", "Thematic map", "Weather map"],
        "answer": 1,
        "explanation": "A political map shows human-made boundaries like countries, states, cities, and their borders."
    },
    {
        "id": "c4g_038", "type": "mcq", "topic": "maps", "difficulty": "easy",
        "question": "Which element of a map shows which way is north, south, east, and west?",
        "options": ["Scale", "Title", "Direction", "Legend"],
        "answer": 2,
        "explanation": "The direction indicator (usually a north arrow) on a map shows which way is north, south, east, and west. North is always at the top of most maps."
    },
    {
        "id": "c4g_039", "type": "mcq", "topic": "maps", "difficulty": "easy",
        "question": "The part of a map that explains what different symbols and colours mean is called the:",
        "options": ["Scale", "Title", "Legend (or Key)", "Border"],
        "answer": 2,
        "explanation": "The legend (or key) of a map explains the meaning of symbols, colours, and patterns used on the map. For example, a blue area might mean a river."
    },
    {
        "id": "c4g_040", "type": "fill_blank", "topic": "maps", "difficulty": "easy",
        "question": "The ratio between the distance on a map and the actual distance on the ground is called the _____.",
        "answer": ["scale"],
        "explanation": "Scale shows the relationship between map distance and ground distance. For example, 1 cm on map = 10 km on ground."
    },
    {
        "id": "c4g_041", "type": "mcq", "topic": "maps", "difficulty": "easy",
        "question": "A map showing rainfall distribution or population density is an example of a:",
        "options": ["Physical map", "Political map", "Thematic map", "Topographic map"],
        "answer": 2,
        "explanation": "A thematic map focuses on a specific theme or topic, such as rainfall, temperature, population, or crops. Physical and political maps are general-purpose maps."
    },
    {
        "id": "c4g_042", "type": "numerical", "topic": "maps", "difficulty": "medium",
        "question": "On a map, the scale is 1 cm = 50 km. If two cities are 3 cm apart on the map, what is the actual distance?",
        "options": ["100 km", "150 km", "200 km", "50 km"],
        "answer": 1,
        "explanation": "Actual distance = 3 cm x 50 km/cm = 150 km. Scale tells us how to convert map measurements to real-world distances."
    },
    {
        "id": "c4g_043", "type": "short_answer", "topic": "maps", "difficulty": "easy",
        "question": "What does the title of a map tell us?",
        "answer": "The title tells us what the map is about - e.g., 'Physical Map of India' or 'Political Map of the World'.",
        "explanation": "The title of a map briefly describes the subject or area covered by the map. It helps the reader understand the map's purpose at a glance."
    },
    {
        "id": "c4g_044", "type": "mcq", "topic": "maps", "difficulty": "easy",
        "question": "In a map symbol, what does a blue line usually represent?",
        "options": ["A road", "A river or water body", "A boundary", "A mountain"],
        "answer": 1,
        "explanation": "On most maps, blue represents water bodies - rivers, lakes, and seas. Green usually means vegetation, brown means mountains, and yellow/orange means plains."
    },

    # ---- INDIA - STATES AND UTs ----
    {
        "id": "c4g_045", "type": "mcq", "topic": "india_states", "difficulty": "easy",
        "question": "How many states are there in India (as of the current count)?",
        "options": ["28", "29", "30", "27"],
        "answer": 0,
        "explanation": "India has 28 states (as of the current reorganization, including the bifurcation of Jammu & Kashmir and the creation of new states). The number has been updated to 28 states and 8 Union Territories."
    },
    {
        "id": "c4g_046", "type": "mcq", "topic": "india_states", "difficulty": "easy",
        "question": "Which is the largest state in India by area?",
        "options": ["Madhya Pradesh", "Maharashtra", "Rajasthan", "Uttar Pradesh"],
        "answer": 2,
        "explanation": "Rajasthan is the largest state in India by area, covering about 342,239 sq km. It is located in the northwestern part of India."
    },
    {
        "id": "c4g_047", "type": "mcq", "topic": "india_states", "difficulty": "easy",
        "question": "Which is the smallest state in India by area?",
        "options": ["Sikkim", "Goa", "Tripura", "Nagaland"],
        "answer": 1,
        "explanation": "Goa is the smallest state in India by area, covering about 3,702 sq km. It is located on the western coast."
    },
    {
        "id": "c4g_048", "type": "mcq", "topic": "india_states", "difficulty": "easy",
        "question": "Which is the capital of India?",
        "options": ["Mumbai", "Kolkata", "New Delhi", "Chennai"],
        "answer": 2,
        "explanation": "New Delhi is the capital of India. It is located in the northern part of the country and serves as the seat of the Government of India."
    },
    {
        "id": "c4g_049", "type": "mcq", "topic": "india_states", "difficulty": "easy",
        "question": "Which Union Territory is the capital of India?",
        "options": ["Mumbai", "New Delhi", "Chandigarh", "Puducherry"],
        "answer": 1,
        "explanation": "New Delhi is a Union Territory and also serves as the capital of India. It is part of the National Capital Territory of Delhi."
    },
    {
        "id": "c4g_050", "type": "fill_blank", "topic": "india_states", "difficulty": "easy",
        "question": "The largest state in India by area is _____.",
        "answer": ["Rajasthan"],
        "explanation": "Rajasthan is the largest state in India by area (about 342,239 sq km), followed by Madhya Pradesh."
    },
    {
        "id": "c4g_051", "type": "short_answer", "topic": "india_states", "difficulty": "medium",
        "question": "Name the Union Territory that is an island group in the Arabian Sea.",
        "answer": "Lakshadweep",
        "explanation": "Lakshadweep is a Union Territory consisting of a group of islands in the Arabian Sea, off the southwestern coast of India."
    },
    {
        "id": "c4g_052", "type": "mcq", "topic": "india_states", "difficulty": "easy",
        "question": "Which Indian state is known as the 'Land of Five Rivers'?",
        "options": ["Haryana", "Punjab", "Rajasthan", "Gujarat"],
        "answer": 1,
        "explanation": "Punjab is known as the 'Land of Five Rivers' (Punj = five, aab = water). The five rivers are the Sutlej, Beas, Ravi, Chenab, and Jhelum."
    },

    # ---- INDIA - PHYSICAL DIVISIONS ----
    {
        "id": "c4g_053", "type": "mcq", "topic": "india_physical", "difficulty": "easy",
        "question": "The Himalayan mountains form the _____ boundary of India.",
        "options": ["Southern", "Western", "Northern", "Eastern"],
        "answer": 2,
        "explanation": "The Himalayan mountain range forms the northern boundary of India, separating it from China, Nepal, and Bhutan."
    },
    {
        "id": "c4g_054", "type": "mcq", "topic": "india_physical", "difficulty": "easy",
        "question": "Which physical division of India includes the Thar Desert?",
        "options": ["The Northern Plains", "The Peninsular Plateau", "The Great Indian Desert", "The Coastal Plains"],
        "answer": 2,
        "explanation": "The Great Indian Desert (Thar Desert) is located in Rajasthan and forms part of the western physical division of India."
    },
    {
        "id": "c4g_055", "type": "mcq", "topic": "india_physical", "difficulty": "easy",
        "question": "Which physical division of India is the most fertile and densely populated?",
        "options": ["The Himalayas", "The Northern Plains", "The Peninsular Plateau", "The Coastal Plains"],
        "answer": 1,
        "explanation": "The Northern Plains, formed by the Ganga, Yamuna, and Brahmaputra rivers, are the most fertile and densely populated region of India."
    },
    {
        "id": "c4g_056", "type": "fill_blank", "topic": "india_physical", "difficulty": "easy",
        "question": "The _____ Desert is also called the Thar Desert.",
        "answer": ["Great Indian"],
        "explanation": "The Great Indian Desert, also called the Thar Desert, is located mainly in the state of Rajasthan."
    },
    {
        "id": "c4g_057", "type": "mcq", "topic": "india_physical", "difficulty": "easy",
        "question": "The Western Ghats and Eastern Ghats are part of which physical division?",
        "options": ["The Himalayas", "The Northern Plains", "The Peninsular Plateau", "The Islands"],
        "answer": 2,
        "explanation": "The Western Ghats and Eastern Ghats are mountain ranges that form part of the Peninsular Plateau - the southern physical division of India."
    },

    # ---- RIVERS OF INDIA ----
    {
        "id": "c4g_058", "type": "mcq", "topic": "rivers_india", "difficulty": "easy",
        "question": "Which of the following is a Himalayan river?",
        "options": ["Godavari", "Krishna", "Ganga", "Kaveri"],
        "answer": 2,
        "explanation": "The Ganga is a Himalayan river. It originates from the Gangotri glacier in the Himalayas and flows across the Northern Plains."
    },
    {
        "id": "c4g_059", "type": "mcq", "topic": "rivers_india", "difficulty": "easy",
        "question": "Which of the following is a Peninsular river?",
        "options": ["Indus", "Ganga", "Brahmaputra", "Krishna"],
        "answer": 3,
        "explanation": "The Krishna is a Peninsular river. It flows eastward across the Deccan Plateau and drains into the Bay of Bengal."
    },
    {
        "id": "c4g_060", "type": "mcq", "topic": "rivers_india", "difficulty": "easy",
        "question": "Which is the longest river in India?",
        "options": ["Yamuna", "Ganga", "Brahmaputra", "Godavari"],
        "answer": 1,
        "explanation": "The Ganga is the longest river in India, flowing for about 2,525 km from the Gangotri glacier to the Bay of Bengal."
    },
    {
        "id": "c4g_061", "type": "mcq", "topic": "rivers_india", "difficulty": "medium",
        "question": "Which Peninsular river flows through a rift valley?",
        "options": ["Godavari", "Narmada", "Krishna", "Kaveri"],
        "answer": 1,
        "explanation": "The Narmada is the only major Peninsular river that flows westward in a rift valley between the Vindhya and Satpura ranges, draining into the Arabian Sea."
    },
    {
        "id": "c4g_062", "type": "fill_blank", "topic": "rivers_india", "difficulty": "easy",
        "question": "The Ganga and the Yamuna meet at _____ (in Uttar Pradesh).",
        "answer": ["Allahabad / Prayagraj"],
        "explanation": "The Ganga and Yamuna rivers meet at Prayagraj (formerly Allahabad) in Uttar Pradesh. This confluence is considered sacred in Hinduism."
    },
    {
        "id": "c4g_063", "type": "mcq", "topic": "rivers_india", "difficulty": "easy",
        "question": "Himalayan rivers are generally _____ while Peninsular rivers are _____.",
        "options": ["Perennial / Seasonal", "Seasonal / Perennial", "Both perennial / Both seasonal", "Short / Long"],
        "answer": 0,
        "explanation": "Himalayan rivers are perennial (flow year-round) because they originate from glaciers and snowmelt. Peninsular rivers are seasonal - they depend on monsoon rainfall."
    },
    {
        "id": "c4g_064", "type": "mcq", "topic": "rivers_india", "difficulty": "medium",
        "question": "Which of these rivers does NOT drain into the Bay of Bengal?",
        "options": ["Mahanadi", "Godavari", "Krishna", "Narmada"],
        "answer": 3,
        "explanation": "The Narmada flows westward in a rift valley and drains into the Arabian Sea. Mahanadi, Godavari, Krishna, and Kaveri all flow eastward into the Bay of Bengal."
    },
    {
        "id": "c4g_065", "type": "short_answer", "topic": "rivers_india", "difficulty": "medium",
        "question": "Name any two Peninsular rivers of India.",
        "answer": "Godavari and Krishna (any two from: Godavari, Krishna, Kaveri, Mahanadi, Narmada, Tapti).",
        "explanation": "Major Peninsular rivers include: Godavari (longest Peninsular river), Krishna, Kaveri, Mahanadi, Narmada, and Tapti."
    },

    # ---- CLIMATE AND VEGETATION ----
    {
        "id": "c4g_066", "type": "mcq", "topic": "climate_vegetation", "difficulty": "easy",
        "question": "India has mainly which type of climate?",
        "options": ["Mediterranean", "Tropical monsoon", "Continental", "Polar"],
        "answer": 1,
        "explanation": "India has a tropical monsoon climate. The monsoon winds bring most of the rainfall between June and September."
    },
    {
        "id": "c4g_067", "type": "mcq", "topic": "climate_vegetation", "difficulty": "easy",
        "question": "The wind that brings heavy rainfall to India is called the:",
        "options": ["Trade winds", "Monsoon winds", "Westerlies", "Polar winds"],
        "answer": 1,
        "explanation": "The southwest monsoon winds blow from the Indian Ocean towards the Indian landmass from June to September, bringing heavy rainfall across most of India."
    },
    {
        "id": "c4g_068", "type": "mcq", "topic": "climate_vegetation", "difficulty": "easy",
        "question": "Which season in India is associated with the southwest monsoon?",
        "options": ["Winter", "Summer", "Rainy season (Monsoon)", "Spring"],
        "answer": 2,
        "explanation": "The rainy season or monsoon season in India occurs from June to September, when southwest monsoon winds bring heavy rainfall."
    },
    {
        "id": "c4g_069", "type": "mcq", "topic": "climate_vegetation", "difficulty": "easy",
        "question": "Which type of forest is found in areas of heavy rainfall in India?",
        "options": ["Thorn forest", "Tropical evergreen forest", "Montane forest", "Mangrove forest"],
        "answer": 1,
        "explanation": "Tropical evergreen forests are found in areas of heavy rainfall (over 200 cm) such as the Western Ghats and the Andaman & Nicobar Islands."
    },
    {
        "id": "c4g_070", "type": "mcq", "topic": "climate_vegetation", "difficulty": "easy",
        "question": "Mangrove forests are found in which region of India?",
        "options": ["The Himalayas", "The Thar Desert", "The Sundarbans (West Bengal)", "The Deccan Plateau"],
        "answer": 2,
        "explanation": "Mangrove forests are found in the Sundarbans of West Bengal, where the Ganga and Brahmaputra meet the Bay of Bengal. The Sundarbans are home to the Royal Bengal Tiger."
    },
    {
        "id": "c4g_071", "type": "fill_blank", "topic": "climate_vegetation", "difficulty": "easy",
        "question": "The wind that brings rainfall to India from the _____ Ocean is called the southwest monsoon.",
        "answer": ["Indian"],
        "explanation": "The southwest monsoon winds blow from the Indian Ocean, carrying moisture and bringing rainfall to most of India between June and September."
    },
    {
        "id": "c4g_072", "type": "mcq", "topic": "climate_vegetation", "difficulty": "medium",
        "question": "Thorn forests are found in which part of India?",
        "options": ["The Western Ghats", "Rajasthan and Gujarat (arid regions)", "The Eastern Himalayas", "The Sundarbans"],
        "answer": 1,
        "explanation": "Thorn forests are found in arid and semi-arid regions like Rajasthan, Gujarat, and parts of Madhya Pradesh. These forests have thorny trees and bushes adapted to low rainfall."
    },
    {
        "id": "c4g_073", "type": "mcq", "topic": "climate_vegetation", "difficulty": "easy",
        "question": "The Sundarbans, famous for the Royal Bengal Tiger, is located in which state?",
        "options": ["Odisha", "West Bengal", "Assam", "Kerala"],
        "answer": 1,
        "explanation": "The Sundarbans Delta is located in West Bengal. It is the largest mangrove forest in the world and a UNESCO World Heritage Site."
    },
    {
        "id": "c4g_074", "type": "short_answer", "topic": "climate_vegetation", "difficulty": "medium",
        "question": "Name the season in India when the northeast monsoon (retreating monsoon) brings rainfall to Tamil Nadu and parts of Andhra Pradesh.",
        "answer": "October to December (post-monsoon / winter season).",
        "explanation": "After the southwest monsoon withdraws (October), the northeast monsoon winds bring rainfall to the southeastern coast, particularly Tamil Nadu and parts of Andhra Pradesh."
    },

    # ---- SOILS OF INDIA ----
    {
        "id": "c4g_075", "type": "mcq", "topic": "soils_india", "difficulty": "easy",
        "question": "Which is the most widely spread soil type in India?",
        "options": ["Black soil", "Red soil", "Alluvial soil", "Laterite soil"],
        "answer": 2,
        "explanation": "Alluvial soil is the most widely spread soil type in India, found mainly in the Northern Plains and the deltas of major rivers. It is very fertile."
    },
    {
        "id": "c4g_076", "type": "mcq", "topic": "soils_india", "difficulty": "easy",
        "question": "'Regur soil' is the scientific name for which soil type?",
        "options": ["Red soil", "Black soil", "Alluvial soil", "Desert soil"],
        "answer": 1,
        "explanation": "Regur soil is the scientific name for black soil. It is rich in iron, magnesium, and lime, and is excellent for growing cotton. It is found mainly in the Deccan Plateau (Maharashtra, Gujarat, Madhya Pradesh)."
    },
    {
        "id": "c4g_077", "type": "mcq", "topic": "soils_india", "difficulty": "easy",
        "question": "Which soil is best suited for growing cotton?",
        "options": ["Alluvial soil", "Red soil", "Black soil (Regur)", "Laterite soil"],
        "answer": 2,
        "explanation": "Black soil (Regur soil) is best for cotton cultivation. It retains moisture well and is rich in nutrients. Maharashtra and Gujarat are major cotton-growing states with black soil."
    },
    {
        "id": "c4g_078", "type": "mcq", "topic": "soils_india", "difficulty": "easy",
        "question": "Red soil is found mainly in which part of India?",
        "options": ["The Northern Plains", "The Deccan Plateau", "The Coastal Plains", "The Himalayas"],
        "answer": 1,
        "explanation": "Red soil is found mainly in the Deccan Plateau - parts of Tamil Nadu, Karnataka, Andhra Pradesh, and Madhya Pradesh. It is red in colour due to iron oxide."
    },
    {
        "id": "c4g_079", "type": "fill_blank", "topic": "soils_india", "difficulty": "easy",
        "question": "The soil found in the Ganga plain is called _____ soil.",
        "answer": ["alluvial"],
        "explanation": "Alluvial soil is found in the Ganga plain and the Brahmaputra plain. It is deposited by rivers and is very fertile."
    },
    {
        "id": "c4g_080", "type": "mcq", "topic": "soils_india", "difficulty": "easy",
        "question": "Which soil is found in desert areas of Rajasthan?",
        "options": ["Alluvial soil", "Black soil", "Desert soil", "Red soil"],
        "answer": 2,
        "explanation": "Desert soil (also called arid soil) is found in the desert areas of Rajasthan. It is sandy and has low organic matter but can become fertile with irrigation."
    },
    {
        "id": "c4g_081", "type": "short_answer", "topic": "soils_india", "difficulty": "medium",
        "question": "Why is alluvial soil considered very fertile?",
        "answer": "Alluvial soil is very fertile because it is deposited by rivers and is rich in minerals like potash, phosphoric acid, and lime. The Ganga and its tributaries bring down fertile silt from the Himalayas.",
        "explanation": "Alluvial soil gets replenished annually during floods when rivers deposit fresh silt. This makes the soil continuously fertile without much need for fertilizers."
    },
    {
        "id": "c4g_082", "type": "mcq", "topic": "soils_india", "difficulty": "easy",
        "question": "Laterite soil is commonly found in which Indian state?",
        "options": ["Punjab", "Kerala", "Haryana", "Uttar Pradesh"],
        "answer": 1,
        "explanation": "Laterite soil is found in areas of high rainfall such as Kerala, Karnataka, Assam, and the hills of Odisha. It is red in colour and rich in iron and aluminium."
    },
    {
        "id": "c4g_083", "type": "distinguish", "topic": "soils_india", "difficulty": "medium",
        "question": "Distinguish between Alluvial soil and Black soil.",
        "answer": {
            "Alluvial soil": "Found in Northern Plains and river deltas; deposited by rivers; very fertile; best for rice, wheat, sugarcane.",
            "Black soil": "Found in Deccan Plateau (Maharashtra, Gujarat); also called Regur soil; rich in iron and lime; best for cotton."
        },
        "explanation": "Alluvial soil is river-deposited and found in plains; it supports diverse crops. Black soil (Regur) is found on the Deccan Plateau and is specifically good for cotton."
    },
    {
        "id": "c4g_084", "type": "long_answer", "topic": "soils_india", "difficulty": "medium",
        "question": "Describe the four major types of soil found in India and mention one major crop grown on each.",
        "answer": {
            "Alluvial soil": "Found in the Northern Plains; very fertile; crops: rice and wheat.",
            "Black soil": "Found in the Deccan Plateau; rich in iron and lime; crop: cotton.",
            "Red soil": "Found in the Deccan and parts of eastern India; crop: groundnut (peanut) and millets.",
            "Laterite soil": "Found in high-rainfall areas like Kerala; crop: rubber and cashew."
        },
        "explanation": "India has diverse soil types. Alluvial is most widespread and fertile. Black soil (Regur) is ideal for cotton. Red soil needs fertilizer but grows groundnuts. Laterite soil, though leached, supports plantation crops."
    },

    # ---- COMPETENCY / INDIAN CONTEXT QUESTIONS (50%) ----
    {
        "id": "c4g_c01", "type": "mcq", "topic": "rotation", "difficulty": "easy",
        "question": "Students in a school in Kerala start their day at 8:00 AM IST. At that same moment, students in a school in Fiji (ahead in time) would already be in afternoon classes. Why?",
        "options": ["Earth revolves faster near the equator",
                     "Earth rotates from west to east, so places to the east see the Sun earlier",
                     "Fiji is closer to the Sun",
                     "India and Fiji are on different planets"],
        "answer": 1,
        "explanation": "Because Earth rotates from west to east, places to the east experience sunrise and noon earlier. Fiji is east of India, so when it is 8 AM in India, it is already afternoon in Fiji."
    },
    {
        "id": "c4g_c02", "type": "short_answer", "topic": "rotation", "difficulty": "medium",
        "question": "Kumbh Mela is held at Prayagraj where the Ganga and Yamuna meet. Devotees take a holy dip at sunrise. Why do they prefer early morning?",
        "answer": "They prefer early morning because sunrise is considered spiritually significant. Also, the morning water of the Ganga is considered pure and the weather is cool.",
        "explanation": "This question connects rotation (Sunrise at east due to Earth's west-to-east rotation) with an Indian cultural practice. Sunrise timing is a direct result of Earth's rotation."
    },
    {
        "id": "c4g_c03", "type": "mcq", "topic": "revolution", "difficulty": "easy",
        "question": "In India, Makar Sankranti is celebrated in January when the Sun enters the zodiac sign Capricorn. This festival marks:",
        "options": ["The start of the monsoon season",
                     "The Sun's northward movement (Uttarayan) after the winter solstice",
                     "The Earth's rotation",
                     "A full moon night"],
        "answer": 1,
        "explanation": "Makar Sankranti celebrates Uttarayan - the Sun's apparent northward movement after the winter solstice (around December 21-22). This is caused by Earth's revolution and tilted axis."
    },
    {
        "id": "c4g_c04", "type": "short_answer", "topic": "four_domains", "difficulty": "medium",
        "question": "The 'Namami Gange' mission aims to clean the Ganga river. Which domain of the Earth does the Ganga belong to?",
        "answer": "The Ganga belongs to the hydrosphere (water domain) of the Earth.",
        "explanation": "The Ganga is a river and thus part of the hydrosphere. The Namami Gange mission is an Indian Government initiative to reduce pollution in the Ganga river."
    },
    {
        "id": "c4g_c05", "type": "mcq", "topic": "maps", "difficulty": "easy",
        "question": "A student from Mumbai is planning a trip to Kolkata by train. She looks at an Indian political map to find the states she will pass through. What kind of map is she using?",
        "options": ["Physical map", "Political map", "Thematic map", "Weather map"],
        "answer": 1,
        "explanation": "She is using a political map, which shows states, cities, and boundaries. The train route from Mumbai (Maharashtra) to Kolkata (West Bengal) passes through several states."
    },
    {
        "id": "c4g_c06", "type": "short_answer", "topic": "india_states", "difficulty": "medium",
        "question": "The Republic Day parade in New Delhi on 26th January showcases the culture of different Indian states. Which state is known for its Bihu dance and is shown in the parade?",
        "answer": "Assam",
        "explanation": "Assam is known for the Bihu dance, performed during the Bihu festival. The Republic Day parade in New Delhi features a tableau from each state showcasing its unique culture."
    },
    {
        "id": "c4g_c07", "type": "mcq", "topic": "rivers_india", "difficulty": "easy",
        "question": "The Kumbh Mela is held at the confluence of the Ganga and Yamuna at Prayagraj. These rivers are:",
        "options": ["Peninsular rivers", "Himalayan rivers",
                     "Both Himalayan and Peninsular", "Neither"],
        "answer": 1,
        "explanation": "Both the Ganga and the Yamuna originate in the Himalayas (Gangotri glacier and Yamunotri respectively), making them Himalayan rivers. They are also perennial rivers."
    },
    {
        "id": "c4g_c08", "type": "mcq", "topic": "climate_vegetation", "difficulty": "easy",
        "question": "During the monsoon season, farmers in Maharashtra eagerly await the rains. Which wind system brings rain to Maharashtra?",
        "options": ["Northeast monsoon", "Southwest monsoon", "Trade winds", "Western disturbances"],
        "answer": 1,
        "explanation": "The southwest monsoon winds (from the Arabian Sea) bring rainfall to Maharashtra between June and September. This rain is crucial for kharif crops."
    },
    {
        "id": "c4g_c09", "type": "short_answer", "topic": "soils_india", "difficulty": "easy",
        "question": "Maharashtra is famous for cotton production. Which soil type makes Maharashtra ideal for cotton?",
        "answer": "Black soil (Regur soil), which is found extensively in Maharashtra.",
        "explanation": "Maharashtra has large areas of black soil (Regur soil) which is rich in iron, lime, and magnesium. This soil retains moisture well and is perfect for growing cotton, making Maharashtra one of India's top cotton-producing states."
    },
    {
        "id": "c4g_c10", "type": "mcq", "topic": "continents_oceans", "difficulty": "easy",
        "question": "India shares its maritime boundary in the Indian Ocean with which island nation to the south?",
        "options": ["Sri Lanka", "Maldives", "Bangladesh", "Nepal"],
        "answer": 1,
        "explanation": "Maldives is an island nation in the Indian Ocean, southwest of India. Sri Lanka is closer and shares a maritime boundary too, but Maldives is specifically in the open Indian Ocean."
    },
    {
        "id": "c4g_c11", "type": "short_answer", "topic": "rivers_india", "difficulty": "medium",
        "question": "The Dal Lake is famous in which Indian state, and what kind of water body is it?",
        "answer": "Jammu and Kashmir; it is a freshwater lake.",
        "explanation": "Dal Lake is located in Srinagar, Jammu and Kashmir. It is a freshwater lake famous for its houseboats (floating hotels) and is a major tourist attraction in India."
    },
    {
        "id": "c4g_c12", "type": "mcq", "topic": "four_domains", "difficulty": "easy",
        "question": "The Indian Navy operates in which domain of the Earth?",
        "options": ["Lithosphere", "Hydrosphere", "Atmosphere", "Biosphere"],
        "answer": 1,
        "explanation": "The Indian Navy operates in the hydrosphere - the water domain. It protects India's interests in the Indian Ocean and other water bodies."
    },
    {
        "id": "c4g_c13", "type": "fill_blank", "topic": "climate_vegetation", "difficulty": "easy",
        "question": "The Western Ghats are a biodiversity hotspot. The Agasthyamalai range in the Western Ghats is located in the states of _____ and Kerala.",
        "answer": ["Tamil Nadu"],
        "explanation": "The Agasthyamalai hills are located on the border of Tamil Nadu and Kerala in the southern Western Ghats. This area has rich tropical evergreen forests."
    },
    {
        "id": "c4g_c14", "type": "mcq", "topic": "maps", "difficulty": "easy",
        "question": "A thematic map of India showing the percentage of people who can read and write in each state is showing:",
        "options": ["Physical features", "Literacy rate", "Political boundaries", "Road networks"],
        "answer": 1,
        "explanation": "A thematic map shows a specific theme. In this case, it shows the literacy rate (percentage of literate people) across different states of India."
    },
    {
        "id": "c4g_c15", "type": "short_answer", "topic": "revolution", "difficulty": "medium",
        "question": "Why do schools in India have summer vacations from May to June?",
        "answer": "Because May-June is the hottest period in most of India due to the Sun's position. During summer vacation, schools close to protect children from extreme heat.",
        "explanation": "India's summer season (March to June) coincides with the period when the Tropic of Cancer is tilted toward the Sun, resulting in longer, hotter days - a consequence of Earth's revolution and axial tilt."
    },
]


# ============================================================
# SOLVER FUNCTIONS
# ============================================================

def solve_mcq(params: dict) -> dict:
    """Solve a multiple-choice question."""
    selected = params.get("selected", None)
    correct = params.get("answer", None)
    question = params.get("question", "")
    options = params.get("options", [])
    explanation = params.get("explanation", "")

    is_correct = (selected == correct)
    steps = [
        f"Question: {question}",
        f"Options provided: {options}",
        f"Correct answer index: {correct} ({options[correct] if options else 'N/A'})",
        f"Student selected: index {selected} ({options[selected] if selected is not None and selected < len(options) else 'N/A'})",
        f"Result: {'CORRECT' if is_correct else 'INCORRECT'}",
    ]
    verification = {
        "method": "Direct comparison",
        "selected": selected,
        "correct": correct,
        "is_correct": is_correct,
    }
    return {"answer": options[correct] if options else "", "steps": steps,
            "verification": verification, "correct": is_correct}


def solve_fill_blank(params: dict) -> dict:
    """Solve a fill-in-the-blank question."""
    student_answers = params.get("student_answers", [])
    correct_answers = params.get("answer", [])
    question = params.get("question", "")
    explanation = params.get("explanation", "")

    # Normalize for comparison (case-insensitive, strip whitespace)
    def normalize(a):
        return str(a).strip().lower()

    if isinstance(student_answers, str):
        student_answers = [student_answers]
    if isinstance(correct_answers, str):
        correct_answers = [correct_answers]

    all_correct = True
    details = []
    for i, (s, c) in enumerate(zip(student_answers, correct_answers)):
        match = normalize(s) == normalize(c)
        if not match:
            all_correct = False
        details.append({"blank": i + 1, "student": s, "correct": c, "match": match})

    steps = [
        f"Question: {question}",
        f"Number of blanks: {len(correct_answers)}",
    ]
    for d in details:
        steps.append(f"Blank {d['blank']}: student='{d['student']}', correct='{d['correct']}' → {'✓' if d['match'] else '✗'}")

    verification = {
        "method": "Case-insensitive string comparison",
        "blanks_checked": len(correct_answers),
        "all_correct": all_correct,
        "details": details,
    }
    return {"answer": correct_answers, "steps": steps,
            "verification": verification, "correct": all_correct}


def solve_short_answer(params: dict) -> dict:
    """Solve a short-answer question with keyword matching."""
    student_answer = str(params.get("student_answer", "")).strip().lower()
    correct_answer = str(params.get("answer", "")).strip().lower()
    question = params.get("question", "")
    explanation = params.get("explanation", "")

    # Extract key words from correct answer for partial credit
    correct_words = set(correct_answer.replace(",", " ").replace(".", " ").split())
    student_words = set(student_answer.replace(",", " ").replace(".", " ").split())
    matching_words = correct_words & student_words
    match_ratio = len(matching_words) / max(len(correct_words), 1)

    is_correct = match_ratio >= 0.5

    steps = [
        f"Question: {question}",
        f"Correct answer: {correct_answer}",
        f"Student answer: {student_answer}",
        f"Key words matched: {matching_words}",
        f"Match ratio: {match_ratio:.0%}",
        f"Result: {'CORRECT' if is_correct else 'INCORRECT'} (threshold: 50%)",
    ]

    verification = {
        "method": "Keyword overlap comparison",
        "match_ratio": round(match_ratio, 2),
        "matching_words": list(matching_words),
        "threshold": 0.5,
        "is_correct": is_correct,
    }
    return {"answer": correct_answer, "steps": steps,
            "verification": verification, "correct": is_correct}


def solve_numerical(params: dict) -> dict:
    """Solve a numerical question with computation verification."""
    student_answer = params.get("student_answer", None)
    correct_answer = params.get("answer", None)
    question = params.get("question", "")
    computation = params.get("computation", "")
    explanation = params.get("explanation", "")

    try:
        student_val = float(student_answer)
        tolerance = 0.01
        correct_val = float(correct_answer)
        is_correct = abs(student_val - correct_val) <= tolerance
    except (ValueError, TypeError):
        is_correct = False
        student_val = student_answer
        correct_val = correct_answer

    steps = [
        f"Question: {question}",
        f"Computation: {computation}",
        f"Correct answer: {correct_val}",
        f"Student answer: {student_val}",
        f"Difference: {abs(float(student_val) - float(correct_val)) if isinstance(student_val, (int, float)) and isinstance(correct_val, (int, float)) else 'N/A'}",
        f"Tolerance: ±{tolerance}",
        f"Result: {'CORRECT' if is_correct else 'INCORRECT'}",
    ]

    verification = {
        "method": "Numerical comparison with tolerance",
        "tolerance": tolerance,
        "difference": abs(float(student_val) - float(correct_val)) if isinstance(student_val, (int, float)) and isinstance(correct_val, (int, float)) else None,
        "is_correct": is_correct,
    }
    return {"answer": str(correct_val), "steps": steps,
            "verification": verification, "correct": is_correct}


def solve_long_answer(params: dict) -> dict:
    """Solve a long-answer question with key-point evaluation."""
    student_answer = str(params.get("student_answer", "")).strip().lower()
    correct_answer = str(params.get("answer", "")).strip().lower()
    if isinstance(correct_answer, dict):
        correct_answer = " ".join(str(v).lower() for v in correct_answer.values())
    question = params.get("question", "")
    explanation = params.get("explanation", "")

    # Split into key phrases
    key_phrases = []
    correct_lower = correct_answer
    # Extract meaningful phrases
    for phrase in correct_lower.replace(",", "|").replace(".", "|").replace("-", "|").split("|"):
        phrase = phrase.strip()
        if len(phrase) > 4:
            key_phrases.append(phrase)

    matched = sum(1 for p in key_phrases if p in student_answer)
    score = matched / max(len(key_phrases), 1)
    is_correct = score >= 0.4

    steps = [
        f"Question: {question}",
        f"Expected key points: {key_phrases[:5]}...",
        f"Key points matched: {matched}/{len(key_phrases)}",
        f"Score: {score:.0%}",
        f"Result: {'GOOD' if is_correct else 'NEEDS IMPROVEMENT'}",
    ]

    verification = {
        "method": "Key phrase matching",
        "total_key_phrases": len(key_phrases),
        "matched": matched,
        "score": round(score, 2),
        "is_correct": is_correct,
    }
    return {"answer": str(correct_answer), "steps": steps,
            "verification": verification, "correct": is_correct}


def solve_distinguish(params: dict) -> dict:
    """Solve a distinguish/between question."""
    student_a = str(params.get("student_a", "")).strip().lower()
    student_b = str(params.get("student_b", "")).strip().lower()
    correct = params.get("answer", {})
    question = params.get("question", "")
    explanation = params.get("explanation", "")

    # Handle dict answer
    if isinstance(correct, dict):
        keys = list(correct.keys())
        correct_a = str(correct.get(keys[0], "")).lower() if keys else ""
        correct_b = str(correct.get(keys[1], "")).lower() if len(keys) > 1 else ""
    else:
        correct_a = ""
        correct_b = ""

    def keyword_match(s, c):
        s_words = set(s.replace(",", " ").replace(".", " ").split())
        c_words = set(c.replace(",", " ").replace(".", " ").split())
        if not c_words:
            return 0.5
        return len(s_words & c_words) / max(len(c_words), 1)

    match_a = keyword_match(student_a, correct_a)
    match_b = keyword_match(student_b, correct_b)
    avg_score = (match_a + match_b) / 2
    is_correct = avg_score >= 0.4

    steps = [
        f"Question: {question}",
        f"Part A - {keys[0] if isinstance(correct, dict) and keys else 'First'}: student match = {match_a:.0%}",
        f"Part B - {keys[1] if isinstance(correct, dict) and len(keys) > 1 else 'Second'}: student match = {match_b:.0%}",
        f"Overall score: {avg_score:.0%}",
        f"Result: {'GOOD' if is_correct else 'NEEDS IMPROVEMENT'}",
    ]

    verification = {
        "method": "Dual keyword matching",
        "part_a_score": round(match_a, 2),
        "part_b_score": round(match_b, 2),
        "overall_score": round(avg_score, 2),
        "is_correct": is_correct,
    }
    return {"answer": correct, "steps": steps,
            "verification": verification, "correct": is_correct}


def solve_mcq_backward(params: dict) -> dict:
    """MCQ solver that also checks all options."""
    selected = params.get("selected", None)
    correct = params.get("answer", None)
    question = params.get("question", "")
    options = params.get("options", [])
    explanation = params.get("explanation", "")

    is_correct = (selected == correct)
    steps = [
        f"Question: {question}",
    ]
    for i, opt in enumerate(options):
        marker = "✓ CORRECT" if i == correct else ("✗ SELECTED" if i == selected else "")
        steps.append(f"  Option {i+1}: {opt} {marker}")
    steps.append(f"Result: {'CORRECT' if is_correct else 'INCORRECT'}")
    steps.append(f"Explanation: {explanation}")

    verification = {
        "method": "Option-by-option validation",
        "selected": selected,
        "correct_index": correct,
        "is_correct": is_correct,
        "num_options": len(options),
    }
    return {"answer": options[correct] if options else "",
            "steps": steps, "verification": verification, "correct": is_correct}


# ============================================================
# QUESTION GENERATOR
# ============================================================

@dataclass
class QuestionGenerator:
    seed: int = 42

    def __post_init__(self):
        random.seed(self.seed)

    def _shuffle(self, items: list) -> list:
        """Deterministically shuffle a list."""
        result = items[:]
        random.shuffle(result)
        return result

    def generate(self, count: int = 20, difficulty_filter: str = "all",
                 topic_filter: str = "all") -> List[Dict[str, Any]]:
        """
        Generate a deterministic list of questions.

        Args:
            count: Number of questions to generate
            difficulty_filter: 'easy', 'medium', 'all'
            topic_filter: specific topic or 'all'

        Returns:
            List of question dicts with answer and explanation
        """
        random.seed(self.seed)

        # Filter questions
        pool = QUESTION_BANK[:]
        if difficulty_filter != "all":
            pool = [q for q in pool if q["difficulty"] == difficulty_filter]
        if topic_filter != "all":
            pool = [q for q in pool if q["topic"] == topic_filter]

        # Deterministic shuffle using seeded random
        shuffled = self._shuffle(pool)

        # Select count
        selected = shuffled[:min(count, len(shuffled))]

        # Assign sequential IDs and add verification info
        questions = []
        for idx, q in enumerate(selected):
            q_copy = dict(q)
            q_copy["id"] = f"c4g_gen_{self.seed}_{idx:03d}"
            q_copy["generated_order"] = idx + 1
            q_copy["verification"] = self._get_verification_info(q_copy)
            questions.append(q_copy)

        return questions

    def _get_verification_info(self, q: dict) -> dict:
        """Return verification metadata for a question."""
        qtype = q["type"]
        if qtype == "mcq":
            return {
                "method": "Option selection validation",
                "check_type": "selected_index == correct_index",
                "num_options": len(q.get("options", [])),
            }
# TRUNCATED:         elif