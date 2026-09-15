import json

# ============================================================
# Chapter 1: Locating Places on the Earth
# ============================================================
ch1 = {
    "class": 6,
    "subject": "social_science",
    "chapter": 1,
    "chapter_title": "Locating Places on the Earth",
    "source_file": "",
    "concepts": [
        {
            "id": "c6ss.1.1",
            "title": "The Globe and its Features",
            "section": "1.1",
            "definition": "A globe is a small spherical model of the Earth that shows the correct shapes and relative sizes of continents, oceans, and other features.",
            "formula": "",
            "key_idea": "A globe is the most accurate representation of the Earth because it preserves true shape, area, and direction.",
            "textbook_ref": "",
            "question_patterns": [
                "What is a globe?",
                "Why is a globe considered the most accurate model of the Earth?",
                "What are the two main reference lines on a globe?",
                "How does a globe differ from a flat map?",
                "Name three features of the Earth that a globe shows."
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "Identify the globe as a model of Earth",
                    "explain": "A globe is a small spherical model that represents the whole Earth."
                },
                {
                    "step": 2,
                    "action": "Note its key features",
                    "explain": "A globe shows the correct shapes of continents and oceans and their relative sizes, using latitudes and longitudes as reference lines."
                },
                {
                    "step": 3,
                    "action": "Compare with a flat map",
                    "explain": "Unlike a flat map, a globe does not distort shapes or sizes because it keeps the Earth's spherical shape."
                }
            ],
            "worked_examples": [
                {
                    "question": "What is a globe?",
                    "solution": "A globe is a small spherical model of the Earth that shows the correct shapes and sizes of land and water bodies.",
                    "answer": "A globe is a small spherical model of the Earth."
                },
                {
                    "question": "Why is a globe more accurate than a flat map?",
                    "solution": "A globe keeps the Earth's spherical shape, so it shows correct shapes, areas, and directions without distortion.",
                    "answer": "A globe does not distort shapes or sizes because it is spherical."
                }
            ],
            "exercises": [
                {
                    "question": "Name the two main reference lines on a globe.",
                    "type": "verify_property"
                },
                {
                    "question": "Give one reason a globe is better than a flat map.",
                    "type": "verify_property"
                },
                {
                    "question": "What does a globe show about continents and oceans?",
                    "type": "verify_property"
                }
            ]
        },
        {
            "id": "c6ss.1.2",
            "title": "Latitudes",
            "section": "1.2",
            "definition": "Latitudes are imaginary horizontal lines drawn parallel to the Equator that measure distance north or south of the Equator in degrees.",
            "formula": "latitude ranges from 0 degrees (Equator) to 90 degrees N or S (poles)",
            "key_idea": "Latitudes run east-west and tell us how far north or south a place is from the Equator.",
            "textbook_ref": "",
            "question_patterns": [
                "What are latitudes?",
                "What is the Equator and what is its latitude?",
                "What is the range of latitude values on Earth?",
                "Name three important parallels of latitude.",
                "How do latitudes help us locate a place?"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "Define latitudes",
                    "explain": "Latitudes are imaginary lines running east-west, parallel to the Equator."
                },
                {
                    "step": 2,
                    "action": "Identify the Equator",
                    "explain": "The Equator is the 0 degree latitude that divides the Earth into two equal halves."
                },
                {
                    "step": 3,
                    "action": "State the range",
                    "explain": "Latitude values go from 0 degrees at the Equator to 90 degrees North and 90 degrees South at the poles."
                }
            ],
            "worked_examples": [
                {
                    "question": "What is the latitude of the Equator?",
                    "solution": "The Equator is the main line of latitude and its value is 0 degrees.",
                    "answer": "0 degrees latitude."
                },
                {
                    "question": "What is the maximum latitude value on Earth?",
                    "solution": "Latitude goes up to 90 degrees North and 90 degrees South at the two poles.",
                    "answer": "90 degrees North and 90 degrees South."
                },
                {
                    "question": "Name three important parallels of latitude.",
                    "solution": "The Equator (0 degrees), the Tropic of Cancer (23.5 degrees N), and the Tropic of Capricorn (23.5 degrees S) are important parallels.",
                    "answer": "Equator, Tropic of Cancer, Tropic of Capricorn."
                }
            ],
            "exercises": [
                {
                    "question": "What are latitudes and in which direction do they run?",
                    "type": "verify_property"
                },
                {
                    "question": "What is the latitude value at the North Pole?",
                    "type": "verify_property"
                },
                {
                    "question": "How does the Equator divide the Earth?",
                    "type": "verify_property"
                }
            ]
        },
        {
            "id": "c6ss.1.3",
            "title": "Longitudes",
            "section": "1.3",
            "definition": "Longitudes are imaginary vertical lines drawn from the North Pole to the South Pole that measure distance east or west of the Prime Meridian in degrees.",
            "formula": "longitude ranges from 0 degrees (Prime Meridian) to 180 degrees E or W",
            "key_idea": "Longitudes run north-south and tell us how far east or west a place is from the Prime Meridian.",
            "textbook_ref": "",
            "question_patterns": [
                "What are longitudes?",
                "What is the Prime Meridian and what is its longitude?",
                "What is the range of longitude values on Earth?",
                "How do longitudes differ from latitudes?",
                "Why are longitudes also called meridians?"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "Define longitudes",
                    "explain": "Longitudes are imaginary lines running from the North Pole to the South Pole."
                },
                {
                    "step": 2,
                    "action": "Identify the Prime Meridian",
                    "explain": "The Prime Meridian is the 0 degree longitude that passes through Greenwich, England."
                },
                {
                    "step": 3,
                    "action": "State the range",
                    "explain": "Longitude values go from 0 degrees to 180 degrees East and 180 degrees West."
                }
            ],
            "worked_examples": [
                {
                    "question": "What is the Prime Meridian?",
                    "solution": "The Prime Meridian is the 0 degree longitude that passes through Greenwich, England.",
                    "answer": "0 degrees longitude passing through Greenwich."
                },
                {
                    "question": "What is the maximum longitude value on Earth?",
                    "solution": "Longitude goes up to 180 degrees East and 180 degrees West.",
                    "answer": "180 degrees East and 180 degrees West."
                }
            ],
            "exercises": [
                {
                    "question": "In which direction do longitudes run?",
                    "type": "verify_property"
                },
                {
                    "question": "How do longitudes differ from latitudes?",
                    "type": "verify_property"
                },
                {
                    "question": "Where does the Prime Meridian pass through?",
                    "type": "verify_property"
                }
            ]
        },
        {
            "id": "c6ss.1.4",
            "title": "Map Reading and Symbols",
            "section": "1.4",
            "definition": "A map is a drawing of the Earth or a part of it on a flat surface, using symbols and colours to represent real features. A legend or key explains what each symbol means.",
            "formula": "",
            "key_idea": "Maps use symbols, colours, and a legend to show real-world features clearly on a flat surface.",
            "textbook_ref": "",
            "question_patterns": [
                "What is a map?",
                "Why do maps use symbols?",
                "What is a legend or key on a map?",
                "Give two examples of common map symbols.",
                "How do colours on a map help us read it?"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "Identify the map and its purpose",
                    "explain": "A map is a flat drawing of the Earth or part of it that shows features clearly."
                },
                {
                    "step": 2,
                    "action": "Read the symbols",
                    "explain": "Symbols stand for real things like roads, rivers, and buildings, and the legend explains each symbol."
                },
                {
                    "step": 3,
                    "action": "Use colours to understand features",
                    "explain": "Colours show types of land and water, such as blue for water bodies and green for plains."
                }
            ],
            "worked_examples": [
                {
                    "question": "What is a legend or key on a map?",
                    "solution": "A legend is a small box on the map that explains what each symbol and colour stands for.",
                    "answer": "A legend explains the symbols and colours used on the map."
                },
                {
                    "question": "Give two examples of common map symbols.",
                    "solution": "A blue line often represents a river, and a red line may represent a road or railway.",
                    "answer": "Blue line for a river, red line for a road."
                }
            ],
            "exercises": [
                {
                    "question": "Why do maps use symbols instead of pictures?",
                    "type": "verify_property"
                },
                {
                    "question": "What colour is usually used for water bodies on a map?",
                    "type": "verify_property"
                },
                {
                    "question": "How does a legend help a map reader?",
                    "type": "verify_property"
                }
            ]
        },
        {
            "id": "c6ss.1.5",
            "title": "Directions: Cardinal and Intermediate",
            "section": "1.5",
            "definition": "Cardinal directions are the four main directions: North, South, East, and West. Intermediate directions lie between them: North-East, North-West, South-East, and South-West.",
            "formula": "",
            "key_idea": "There are four cardinal directions and four intermediate directions, making eight directions in total.",
            "textbook_ref": "",
            "question_patterns": [
                "What are the four cardinal directions?",
                "What are the four intermediate directions?",
                "How many total directions are there on a compass?",
                "Which direction lies between North and East?",
                "How do we find directions on a map?"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "Identify the cardinal directions",
                    "explain": "The four cardinal directions are North, South, East, and West."
                },
                {
                    "step": 2,
                    "action": "Identify the intermediate directions",
                    "explain": "The four intermediate directions are North-East, North-West, South-East, and South-West."
                },
                {
                    "step": 3,
                    "action": "Use a compass or map",
                    "explain": "Most maps are drawn with North at the top, which helps us find all other directions."
                }
            ],
            "worked_examples": [
                {
                    "question": "What are the four cardinal directions?",
                    "solution": "The four cardinal directions are North, South, East, and West.",
                    "answer": "North, South, East, West."
                },
                {
                    "question": "Which direction lies between North and East?",
                    "solution": "The direction between North and East is North-East, which is an intermediate direction.",
                    "answer": "North-East."
                }
            ],
            "exercises": [
                {
                    "question": "Name the four intermediate directions.",
                    "type": "verify_property"
                },
                {
                    "question": "How many directions are there in total?",
                    "type": "verify_property"
                },
                {
                    "question": "Which side of a map usually shows North?",
                    "type": "verify_property"
                }
            ]
        },
        {
            "id": "c6ss.1.6",
            "title": "Scale of a Map",
            "section": "1.6",
            "definition": "The scale of a map is the ratio between the distance shown on the map and the actual distance on the ground.",
            "formula": "scale = map distance / ground distance",
            "key_idea": "Scale tells us how much the real distance has been reduced to fit on the map.",
            "textbook_ref": "",
            "question_patterns": [
                "What is the scale of a map?",
                "If the scale is 1 cm = 5 km, what does 4 cm on the map equal on the ground?",
                "Why is scale important on a map?",
                "How do you calculate real distance using a map scale?",
                "What is the difference between a large-scale and a small-scale map?"
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "Read the map scale",
                    "explain": "Identify the ratio that relates map distance to ground distance, for example 1 cm = 5 km.",
                    "compute": "scale_ratio = ground_distance_per_cm"
                },
                {
                    "step": 2,
                    "action": "Measure the map distance",
                    "explain": "Measure the distance between two points on the map in centimetres.",
                    "compute": "map_distance_cm = measured_value"
                },
                {
                    "step": 3,
                    "action": "Multiply to find ground distance",
                    "explain": "Multiply the map distance by the scale ratio to get the real distance on the ground.",
                    "compute": "ground_distance = map_distance_cm * scale_ratio"
                }
            ],
            "worked_examples": [
                {
                    "question": "If the scale is 1 cm = 5 km, what is the real distance for 4 cm on the map?",
                    "solution": "Multiply the map distance by the scale: 4 cm x 5 km = 20 km.",
                    "answer": "20 km."
                },
                {
                    "question": "On a map with scale 1 cm = 10 km, two towns are 3.5 cm apart. What is the real distance?",
                    "solution": "Multiply 3.5 cm by 10 km: 3.5 x 10 = 35 km.",
                    "answer": "35 km."
                }
            ],
            "exercises": [
                {
                    "question": "If the scale is 1 cm = 2 km, what is the real distance for 6 cm on the map?",
                    "type": "compute"
                },
                {
                    "question": "Why is scale important on a map?",
                    "type": "verify_property"
                },
                {
                    "question": "What is the difference between a large-scale and a small-scale map?",
                    "type": "verify_property"
                }
            ]
        },
        {
            "id": "c6ss.1.7",
            "title": "Types of Maps: Physical, Political, and Thematic",
            "section": "1.7",
            "definition": "Physical maps show natural features like mountains and rivers, political maps show boundaries of countries and states, and thematic maps focus on a specific topic such as rainfall or population.",
            "formula": "",
            "key_idea": "Maps are classified by their purpose: physical for natural features, political for boundaries, and thematic for specific information.",
            "textbook_ref": "",
            "question_patterns": [
                "What are the three main types of maps?",
                "What does a physical map show?",
                "What does a political map show?",
                "What is a thematic map? Give one example.",
                "Which type of map would you use to show rainfall in India?"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "Identify the map type by its purpose",
                    "explain": "Decide whether the map shows natural features, boundaries, or a specific topic."
                },
                {
                    "step": 2,
                    "action": "Match to the correct category",
                    "explain": "Physical maps show natural features, political maps show boundaries, and thematic maps show a specific theme."
                },
                {
                    "step": 3,
                    "action": "Give an example",
                    "explain": "For example, a rainfall map is a thematic map, and a map showing states is a political map."
                }
            ],
            "worked_examples": [
                {
                    "question": "What does a political map show?",
                    "solution": "A political map shows the boundaries of countries, states, and cities.",
                    "answer": "Boundaries of countries, states, and cities."
                },
                {
                    "question": "Which type of map would you use to show population density?",
                    "solution": "A population density map is a thematic map because it focuses on one specific topic.",
                    "answer": "Thematic map."
                },
                {
                    "question": "What does a physical map show?",
                    "solution": "A physical map shows natural features such as mountains, rivers, and plains.",
                    "answer": "Natural features like mountains, rivers, and plains."
                }
            ],
            "exercises": [
                {
                    "question": "Name the three main types of maps.",
                    "type": "verify_property"
                },
                {
                    "question": "Give one example of a thematic map.",
                    "type": "verify_property"
                },
                {
                    "question": "Which map type shows natural features?",
                    "type": "verify_property"
                }
            ]
        },
        {
            "id": "c6ss.1.8",
            "title": "Hemispheres of the Earth",
            "section": "1.8",
            "definition": "A hemisphere is half of the Earth. The Equator divides the Earth into the Northern and Southern Hemispheres, and the Prime Meridian divides it into the Eastern and Western Hemispheres.",
            "formula": "",
            "key_idea": "The Earth can be divided into two halves in two ways: north-south by the Equator and east-west by the Prime Meridian.",
            "textbook_ref": "",
            "question_patterns": [
                "What is a hemisphere?",
                "How does the Equator divide the Earth?",
                "How does the Prime Meridian divide the Earth?",
                "In which hemisphere does India lie?",
                "Name the four hemispheres of the Earth."
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "Define a hemisphere",
                    "explain": "A hemisphere is one half of the spherical Earth."
                },
                {
                    "step": 2,
                    "action": "Identify the Equator division",
                    "explain": "The Equator divides the Earth into the Northern Hemisphere and the Southern Hemisphere."
                },
                {
                    "step": 3,
                    "action": "Identify the Prime Meridian division",
                    "explain": "The Prime Meridian divides the Earth into the Eastern Hemisphere and the Western Hemisphere."
                }
            ],
            "worked_examples": [
                {
                    "question": "How does the Equator divide the Earth?",
                    "solution": "The Equator divides the Earth into the Northern Hemisphere and the Southern Hemisphere.",
                    "answer": "Northern and Southern Hemispheres."
                },
                {
                    "question": "In which hemispheres does India lie?",
                    "solution": "India lies entirely in the Northern Hemisphere and the Eastern Hemisphere.",
                    "answer": "Northern and Eastern Hemispheres."
                }
            ],
            "exercises": [
                {
                    "question": "How does the Prime Meridian divide the Earth?",
                    "type": "verify_property"
                },
                {
                    "question": "Name the four hemispheres of the Earth.",
                    "type": "verify_property"
                },
                {
                    "question": "What is a hemisphere?",
                    "type": "verify_property"
                }
            ]
        },
        {
            "id": "c6ss.1.9",
            "title": "Finding Locations Using Coordinates",
            "section": "1.9",
            "definition": "Every place on Earth can be located using its latitude and longitude together, which form a pair of coordinates that pinpoints the exact position.",
            "formula": "location = (latitude, longitude)",
            "key_idea": "Latitude and longitude together give the exact location of any place on Earth, just like a grid reference.",
            "textbook_ref": "",
            "question_patterns": [
                "How do we find the exact location of a place on Earth?",
                "What are coordinates made of?",
                "If a place is at 28 degrees N and 77 degrees E, which city could it be?",
                "Why do we need both latitude and longitude to locate a place?",
                "How does the grid of latitudes and longitudes help us?"
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "Read the latitude value",
                    "explain": "Find how far north or south the place is from the Equator, given in degrees N or S.",
                    "compute": "lat = latitude_value"
                },
                {
                    "step": 2,
                    "action": "Read the longitude value",
                    "explain": "Find how far east or west the place is from the Prime Meridian, given in degrees E or W.",
                    "compute": "lon = longitude_value"
                },
                {
                    "step": 3,
                    "action": "Combine to pinpoint the location",
                    "explain": "The pair (latitude, longitude) gives the exact position of the place on the Earth's surface.",
                    "compute": "location = (lat, lon)"
                }
            ],
            "worked_examples": [
                {
                    "question": "What coordinates locate a place at 28 degrees N latitude and 77 degrees E longitude?",
                    "solution": "The coordinates are (28 degrees N, 77 degrees E), which is near New Delhi.",
                    "answer": "(28 degrees N, 77 degrees E) -- near New Delhi."
                },
                {
                    "question": "Why do we need both latitude and longitude to locate a place?",
                    "solution": "Latitude alone gives only a horizontal line and longitude alone gives only a vertical line; together they cross at one exact point.",
                    "answer": "Both together pinpoint one exact location."
                }
            ],
            "exercises": [
                {
                    "question": "What two values are needed to locate a place on Earth?",
                    "type": "compute"
                },
                {
                    "question": "What is the coordinate pair for a place on the Equator and the Prime Meridian?",
                    "type": "compute"
                },
                {
                    "question": "How does the grid of latitudes and longitudes help us?",
                    "type": "verify_property"
                }
            ]
        },
        {
            "id": "c6ss.1.10",
            "title": "Time Zones and Earth's Rotation",
            "section": "1.10",
            "definition": "The Earth rotates from west to east, causing different places to see the Sun at different times. The Earth is divided into 24 time zones, each roughly 15 degrees of longitude wide, and local time changes by about 1 hour for every 15 degrees of longitude.",
            "formula": "time difference = (longitude difference / 15) hours",
            "key_idea": "Because the Earth rotates, places to the east see the Sun earlier, and every 15 degrees of longitude means about a 1-hour time difference.",
            "textbook_ref": "",
            "question_patterns": [
                "Why do different places have different local times?",
                "In which direction does the Earth rotate?",
                "How many time zones does the Earth have?",
                "If two places are 30 degrees apart in longitude, what is the time difference?",
                "Why does the Sun rise earlier in the east than in the west?"
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "Find the longitude difference",
                    "explain": "Subtract the smaller longitude from the larger longitude to get the difference in degrees.",
                    "compute": "lon_diff = abs(longitude1 - longitude2)"
                },
                {
                    "step": 2,
                    "action": "Divide by 15 degrees per hour",
                    "explain": "Each 15 degrees of longitude equals about 1 hour of time difference.",
                    "compute": "hours = lon_diff / 15"
                },
                {
                    "step": 3,
                    "action": "Determine which place is ahead",
                    "explain": "The place to the east is ahead in time because the Earth rotates from west to east.",
                    "compute": "eastern_time = western_time + hours"
                }
            ],
            "worked_examples": [
                {
                    "question": "If two places are 30 degrees apart in longitude, what is the time difference?",
                    "solution": "Divide 30 by 15: 30 / 15 = 2 hours.",
                    "answer": "2 hours."
                },
                {
                    "question": "Why does the Sun rise earlier in Arunachal Pradesh than in Gujarat?",
                    "solution": "Arunachal Pradesh is further east, so it sees the Sun earlier because the Earth rotates from west to east.",
                    "answer": "Because Arunachal Pradesh is further east and the Earth rotates west to east."
                },
                {
                    "question": "How many time zones does the Earth have?",
                    "solution": "The Earth has 24 time zones, one for each hour of the day.",
                    "answer": "24 time zones."
                }
            ],
            "exercises": [
                {
                    "question": "If two places are 45 degrees apart in longitude, what is the time difference?",
                    "type": "compute"
                },
                {
                    "question": "In which direction does the Earth rotate?",
                    "type": "verify_property"
                },
                {
                    "question": "How many degrees of longitude equal 1 hour of time?",
                    "type": "verify_property"
                }
            ]
        }
    ]
}

# ============================================================
# Chapter 2: Oceans and Continents
# ============================================================
ch2 = {
    "class": 6,
    "subject": "social_science",
    "chapter": 2,
    "chapter_title": "Oceans and Continents",
    "source_file": "",
    "concepts": [
        {
            "id": "c6ss.2.1",
            "title": "The Continents",
            "section": "2.1",
            "definition": "A continent is a very large continuous area of land on the Earth. There are seven continents: Asia, Africa, Europe, North America, South America, Australia, and Antarctica.",
            "formula": "",
            "key_idea": "The Earth has seven continents that vary greatly in size, with Asia being the largest and Australia the smallest.",
            "textbook_ref": "",
            "question_patterns": [
                "What is a continent?",
                "How many continents are there on Earth?",
                "Name the seven continents.",
                "Which is the largest continent?",
                "Which is the smallest continent?"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "Define a continent",
                    "explain": "A continent is a huge continuous landmass on the Earth."
                },
                {
                    "step": 2,
                    "action": "List the seven continents",
                    "explain": "The seven continents are Asia, Africa, Europe, North America, South America, Australia, and Antarctica."
                },
                {
                    "step": 3,
                    "action": "Compare their sizes",
                    "explain": "Asia is the largest continent and Australia is the smallest."
                }
            ],
            "worked_examples": [
                {
                    "question": "How many continents are there on Earth?",
                    "solution": "There are seven continents on Earth: Asia, Africa, Europe, North America, South America, Australia, and Antarctica.",
                    "answer": "Seven continents."
                },
                {
                    "question": "Which is the largest continent?",
                    "solution": "Asia is the largest continent in both area and population.",
                    "answer": "Asia."
                },
                {
                    "question": "Which is the smallest continent?",
                    "solution": "Australia is the smallest continent.",
                    "answer": "Australia."
                }
            ],
            "exercises": [
                {
                    "question": "Name the seven continents.",
                    "type": "verify_property"
                },
                {
                    "question": "What is a continent?",
                    "type": "verify_property"
                },
                {
                    "question": "Which continent lies entirely in the Southern Hemisphere?",
                    "type": "verify_property"
                }
            ]
        },
        {
            "id": "c6ss.2.2",
            "title": "Asia and Africa",
            "section": "2.2",
            "definition": "Asia is the largest continent, covering about one-third of the total land area, and Africa is the second-largest continent, joined to Asia by the Isthmus of Suez.",
            "formula": "",
            "key_idea": "Asia is the largest and most populous continent, while Africa is the second-largest and is separated from Asia by the Suez Canal.",
            "textbook_ref": "",
            "question_patterns": [
                "What fraction of the Earth's land area does Asia cover?",
                "Which is the second-largest continent?",
                "What connects Africa to Asia?",
                "Name two countries in Asia.",
                "Why is Africa called the Dark Continent historically?"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "Describe Asia",
                    "explain": "Asia is the largest continent, covering about one-third of the total land area and having the most people."
                },
                {
                    "step": 2,
                    "action": "Describe Africa",
                    "explain": "Africa is the second-largest continent and is joined to Asia by the Isthmus of Suez."
                },
                {
                    "step": 3,
                    "action": "Note the connection",
                    "explain": "The Suez Canal now separates Africa from Asia, but they were historically joined at the Isthmus of Suez."
                }
            ],
            "worked_examples": [
                {
                    "question": "What fraction of the Earth's land area does Asia cover?",
                    "solution": "Asia covers about one-third of the total land area of the Earth.",
                    "answer": "About one-third of the land area."
                },
                {
                    "question": "What connects Africa to Asia?",
                    "solution": "Africa is joined to Asia by the Isthmus of Suez, and the Suez Canal cuts through this isthmus.",
                    "answer": "The Isthmus of Suez."
                }
            ],
            "exercises": [
                {
                    "question": "Which is the second-largest continent?",
                    "type": "verify_property"
                },
                {
                    "question": "Name two countries in Asia.",
                    "type": "verify_property"
                },
                {
                    "question": "What is the Isthmus of Suez?",
                    "type": "verify_property"
                }
            ]
        },
        {
            "id": "c6ss.2.3",
            "title": "Europe, the Americas, Australia, and Antarctica",
            "section": "2.3",
            "definition": "Europe is a small continent west of Asia, North and South America are connected by the Isthmus of Panama, Australia is the smallest continent, and Antarctica is a frozen continent at the South Pole.",
            "formula": "",
            "key_idea": "Europe, the Americas, Australia, and Antarctica complete the seven continents, each with unique features.",
            "textbook_ref": "",
            "question_patterns": [
                "What connects North America and South America?",
                "Which continent is frozen and has no permanent population?",
                "Where is Australia located?",
                "Which ocean separates the Americas from Europe and Africa?",
                "What is special about Antarctica?"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "Describe Europe",
                    "explain": "Europe lies to the west of Asia and is a relatively small continent."
                },
                {
                    "step": 2,
                    "action": "Describe the Americas and Australia",
                    "explain": "North and South America are joined by the Isthmus of Panama, and Australia is the smallest continent lying entirely in the Southern Hemisphere."
                },
                {
                    "step": 3,
                    "action": "Describe Antarctica",
                    "explain": "Antarctica is a frozen continent at the South Pole with no permanent human population."
                }
            ],
            "worked_examples": [
                {
                    "question": "What connects North America and South America?",
                    "solution": "North America and South America are connected by the Isthmus of Panama.",
                    "answer": "The Isthmus of Panama."
                },
                {
                    "question": "What is special about Antarctica?",
                    "solution": "Antarctica is permanently frozen and has no permanent human population.",
                    "answer": "It is frozen and has no permanent population."
                }
            ],
            "exercises": [
                {
                    "question": "Where is Australia located?",
                    "type": "verify_property"
                },
                {
                    "question": "Which ocean separates the Americas from Europe and Africa?",
                    "type": "verify_property"
                },
                {
                    "question": "Which continent has no permanent population?",
                    "type": "verify_property"
                }
            ]
        },
        {
            "id": "c6ss.2.4",
            "title": "The Oceans",
            "section": "2.4",
            "definition": "An ocean is a vast body of salt water that covers most of the Earth's surface. There are five oceans: the Pacific, Atlantic, Indian, Arctic, and Southern Oceans.",
            "formula": "",
            "key_idea": "The Earth has five oceans, with the Pacific being the largest and the Arctic being the smallest.",
            "textbook_ref": "",
            "question_patterns": [
                "How many oceans are there on Earth?",
                "Name the five oceans.",
                "Which is the largest ocean?",
                "Which is the smallest ocean?",
                "What separates North America and South America from Europe and Africa?"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "Define an ocean",
                    "explain": "An ocean is a huge body of salt water that covers most of the Earth's surface."
                },
                {
                    "step": 2,
                    "action": "List the five oceans",
                    "explain": "The five oceans are the Pacific, Atlantic, Indian, Arctic, and Southern Oceans."
                },
                {
                    "step": 3,
                    "action": "Compare their sizes",
                    "explain": "The Pacific is the largest ocean and the Arctic is the smallest."
                }
            ],
            "worked_examples": [
                {
                    "question": "How many oceans are there on Earth?",
                    "solution": "There are five oceans: the Pacific, Atlantic, Indian, Arctic, and Southern Oceans.",
                    "answer": "Five oceans."
                },
                {
                    "question": "Which is the largest ocean?",
                    "solution": "The Pacific Ocean is the largest and deepest ocean on Earth.",
                    "answer": "The Pacific Ocean."
                }
            ],
            "exercises": [
                {
                    "question": "Name the five oceans.",
                    "type": "verify_property"
                },
                {
                    "question": "Which is the smallest ocean?",
                    "type": "verify_property"
                },
                {
                    "question": "What is an ocean?",
                    "type": "verify_property"
                }
            ]
        },
        {
            "id": "c6ss.2.5",
            "title": "Distribution of Land and Water on Earth",
            "section": "2.5",
            "definition": "About 71 percent of the Earth's surface is covered by water and only about 29 percent is covered by land, meaning most of the Earth is ocean.",
            "formula": "water = 71 percent, land = 29 percent",
            "key_idea": "Water covers most of the Earth's surface, about 71 percent, while land covers only about 29 percent.",
            "textbook_ref": "",
            "question_patterns": [
                "What percentage of the Earth's surface is covered by water?",
                "What percentage of the Earth's surface is covered by land?",
                "Why is Earth called the blue planet?",
                "Is there more land or water on Earth?",
                "What is the ratio of land to water on Earth?"
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "Recall the water percentage",
                    "explain": "About 71 percent of the Earth's surface is covered by water.",
                    "compute": "water_percent = 71"
                },
                {
                    "step": 2,
                    "action": "Recall the land percentage",
                    "explain": "About 29 percent of the Earth's surface is covered by land.",
                    "compute": "land_percent = 29"
                },
                {
                    "step": 3,
                    "action": "Verify the total",
                    "explain": "The sum of water and land percentages should equal 100 percent.",
                    "compute": "total = water_percent + land_percent"
                }
            ],
            "worked_examples": [
                {
                    "question": "What percentage of the Earth's surface is covered by water?",
                    "solution": "About 71 percent of the Earth's surface is covered by water.",
                    "answer": "About 71 percent."
                },
                {
                    "question": "Why is Earth called the blue planet?",
                    "solution": "Earth is called the blue planet because water covers about 71 percent of its surface, making it look blue from space.",
                    "answer": "Because water covers 71 percent of the surface."
                }
            ],
            "exercises": [
                {
                    "question": "What percentage of the Earth's surface is covered by land?",
                    "type": "compute"
                },
                {
                    "question": "Is there more land or water on Earth?",
                    "type": "verify_property"
                },
                {
                    "question": "Verify that the land and water percentages add up to 100.",
                    "type": "compute"
                }
            ]
        },
        {
            "id": "c6ss.2.6",
            "title": "Major Seas and Gulfs",
            "section": "2.6",
            "definition": "A sea is a smaller body of salt water partly enclosed by land, while a gulf is a portion of the ocean that cuts deeply into a landmass.",
            "formula": "",
            "key_idea": "Seas and gulfs are smaller water bodies connected to oceans and partly surrounded by land.",
            "textbook_ref": "",
            "question_patterns": [
                "What is the difference between a sea and an ocean?",
                "What is a gulf?",
                "Name two major seas of the world.",
                "Name two important gulfs of the world.",
                "Where is the Arabian Sea located?"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "Define a sea",
                    "explain": "A sea is a smaller body of salt water that is partly enclosed by land."
                },
                {
                    "step": 2,
                    "action": "Define a gulf",
                    "explain": "A gulf is a part of the ocean that extends deeply into a landmass."
                },
                {
                    "step": 3,
                    "action": "Give examples",
                    "explain": "The Arabian Sea and the Bay of Bengal are seas near India, and the Gulf of Mexico and the Persian Gulf are well-known gulfs."
                }
            ],
            "worked_examples": [
                {
                    "question": "What is the difference between a sea and an ocean?",
                    "solution": "A sea is smaller than an ocean and is partly enclosed by land, while an ocean is a vast open body of water.",
                    "answer": "A sea is smaller and partly enclosed by land; an ocean is vast and open."
                },
                {
                    "question": "Name two major gulfs of the world.",
                    "solution": "The Gulf of Mexico and the Persian Gulf are two major gulfs.",
                    "answer": "Gulf of Mexico and Persian Gulf."
                }
            ],
            "exercises": [
                {
                    "question": "What is a gulf?",
                    "type": "verify_property"
                },
                {
                    "question": "Name two seas near India.",
                    "type": "verify_property"
                },
                {
                    "question": "Where is the Arabian Sea located?",
                    "type": "verify_property"
                }
            ]
        },
        {
            "id": "c6ss.2.7",
            "title": "Ocean Currents",
            "section": "2.7",
            "definition": "Ocean currents are continuous movements of ocean water in a particular direction, caused mainly by winds and differences in temperature.",
            "formula": "",
            "key_idea": "Ocean currents flow like rivers within the sea and affect the climate of nearby coastal areas.",
            "textbook_ref": "",
            "question_patterns": [
                "What are ocean currents?",
                "What causes ocean currents?",
                "How do ocean currents affect climate?",
                "What is the difference between warm and cold currents?",
                "Give one example of how a current affects a coast."
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "Define ocean currents",
                    "explain": "Ocean currents are continuous flows of ocean water moving in a set direction."
                },
                {
                    "step": 2,
                    "action": "Identify the causes",
                    "explain": "Winds, the Earth's rotation, and differences in water temperature and salinity cause currents."
                },
                {
                    "step": 3,
                    "action": "Explain the effect on climate",
                    "explain": "Warm currents make nearby coasts warmer, and cold currents make them cooler."
                }
            ],
            "worked_examples": [
                {
                    "question": "What are ocean currents?",
                    "solution": "Ocean currents are continuous movements of ocean water flowing in a particular direction.",
                    "answer": "Continuous flows of ocean water in a set direction."
                },
                {
                    "question": "How do ocean currents affect climate?",
                    "solution": "Warm currents warm the nearby coastal areas, while cold currents cool them down.",
                    "answer": "Warm currents warm coasts; cold currents cool coasts."
                }
            ],
            "exercises": [
                {
                    "question": "What causes ocean currents?",
                    "type": "verify_property"
                },
                {
                    "question": "What is the difference between warm and cold currents?",
                    "type": "verify_property"
                },
                {
                    "question": "Give one example of how a current affects a coast.",
                    "type": "verify_property"
                }
            ]
        },
        {
            "id": "c6ss.2.8",
            "title": "Importance of Oceans",
            "section": "2.8",
            "definition": "Oceans are important because they provide food, support trade and transport, regulate climate, and are home to a vast variety of living things.",
            "formula": "",
            "key_idea": "Oceans sustain life by providing food, enabling trade, regulating climate, and supporting marine biodiversity.",
            "textbook_ref": "",
            "question_patterns": [
                "Why are oceans important for humans?",
                "How do oceans help in trade and transport?",
                "How do oceans regulate climate?",
                "Name two resources we get from the ocean.",
                "Why is marine life important?"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "Identify the economic uses",
                    "explain": "Oceans provide fish and other food, and support trade and transport through shipping routes."
                },
                {
                    "step": 2,
                    "action": "Identify the climate role",
                    "explain": "Oceans absorb heat and distribute it around the Earth, helping to regulate the climate."
                },
                {
                    "step": 3,
                    "action": "Identify the ecological role",
                    "explain": "Oceans are home to a huge variety of plants and animals that support life on Earth."
                }
            ],
            "worked_examples": [
                {
                    "question": "Why are oceans important for humans?",
                    "solution": "Oceans provide food, support trade and transport, and regulate the climate.",
                    "answer": "They provide food, trade, transport, and climate regulation."
                },
                {
                    "question": "Name two resources we get from the ocean.",
                    "solution": "We get fish and salt from the ocean, along with minerals and petroleum.",
                    "answer": "Fish and salt."
                }
            ],
            "exercises": [
                {
                    "question": "How do oceans help in trade and transport?",
                    "type": "verify_property"
                },
                {
                    "question": "How do oceans regulate climate?",
                    "type": "verify_property"
                },
                {
                    "question": "Why is marine life important?",
                    "type": "verify_property"
                }
            ]
        },
        {
            "id": "c6ss.2.9",
            "title": "Features of Continents",
            "section": "2.9",
            "definition": "Continents have diverse physical features including mountains, plateaus, plains, deserts, and rivers that shape the land and influence how people live.",
            "formula": "",
            "key_idea": "Each continent has a unique combination of mountains, plains, rivers, and deserts that define its geography.",
            "textbook_ref": "",
            "question_patterns": [
                "What are the main physical features of continents?",
                "Name a major mountain range on a continent.",
                "What is a plateau?",
                "How do rivers help people on continents?",
                "Give one example of a desert on a continent."
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "Identify the main landforms",
                    "explain": "Continents have mountains, plateaus, plains, and deserts as their main physical features."
                },
                {
                    "step": 2,
                    "action": "Link features to examples",
                    "explain": "For example, the Himalayas are in Asia and the Sahara Desert is in Africa."
                },
                {
                    "step": 3,
                    "action": "Explain the influence on life",
                    "explain": "Rivers provide water for farming and cities, while mountains and deserts affect where people can live."
                }
            ],
            "worked_examples": [
                {
                    "question": "Name a major mountain range on a continent.",
                    "solution": "The Himalayas are a major mountain range in Asia.",
                    "answer": "The Himalayas in Asia."
                },
                {
                    "question": "Give one example of a desert on a continent.",
                    "solution": "The Sahara Desert is a large desert in Africa.",
                    "answer": "The Sahara Desert in Africa."
                }
            ],
            "exercises": [
                {
                    "question": "What are the main physical features of continents?",
                    "type": "verify_property"
                },
                {
                    "question": "What is a plateau?",
                    "type": "verify_property"
                },
                {
                    "question": "How do rivers help people on continents?",
                    "type": "verify_property"
                }
            ]
        },
        {
            "id": "c6ss.2.10",
            "title": "Features of Oceans",
            "section": "2.10",
            "definition": "Oceans have features such as the ocean floor with trenches, ridges, and plains, varying depths, and different temperatures and salinity levels.",
            "formula": "",
            "key_idea": "The ocean floor is not flat; it has mountains, valleys, and deep trenches, and ocean water varies in temperature and saltiness.",
            "textbook_ref": "",
            "question_patterns": [
                "What are the main features of the ocean floor?",
                "What is a trench in the ocean?",
                "How does ocean temperature vary with depth?",
                "What is salinity?",
                "Why is ocean water salty?"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "Describe the ocean floor",
                    "explain": "The ocean floor has plains, ridges, and deep trenches, similar to land features."
                },
                {
                    "step": 2,
                    "action": "Explain temperature variation",
                    "explain": "Ocean water is warmer near the surface and at the Equator, and colder in the deep and near the poles."
                },
                {
                    "step": 3,
                    "action": "Explain salinity",
                    "explain": "Salinity is the amount of salt dissolved in ocean water, which makes the water salty."
                }
            ],
            "worked_examples": [
                {
                    "question": "What is a trench in the ocean?",
                    "solution": "A trench is a long, narrow, and very deep valley on the ocean floor.",
                    "answer": "A deep, narrow valley on the ocean floor."
                },
                {
                    "question": "Why is ocean water salty?",
                    "solution": "Ocean water is salty because it contains dissolved salts, mainly from rocks and minerals washed in from land.",
                    "answer": "Because it contains dissolved salts from rocks and minerals."
                }
            ],
            "exercises": [
                {
                    "question": "What are the main features of the ocean floor?",
                    "type": "verify_property"
                },
                {
                    "question": "How does ocean temperature vary with depth?",
                    "type": "verify_property"
                },
                {
                    "question": "What is salinity?",
                    "type": "verify_property"
                }
            ]
        }
    ]
}

# Write both files
base = r"D:\platform\backend\its\competency"
path1 = base + r"\catalog_class6_social_ch1.json"
path2 = base + r"\catalog_class6_social_ch2.json"

with open(path1, "w", encoding="utf-8") as f:
    json.dump(ch1, f, indent=2, ensure_ascii=False)

with open(path2, "w", encoding="utf-8") as f:
    json.dump(ch2, f, indent=2, ensure_ascii=False)

print("Wrote:", path1)
print("Wrote:", path2)

# Validate by reading back
with open(path1, "r", encoding="utf-8") as f:
    d1 = json.load(f)
with open(path2, "r", encoding="utf-8") as f:
    d2 = json.load(f)

print("Ch1 concepts:", len(d1["concepts"]))
print("Ch2 concepts:", len(d2["concepts"]))
for c in d1["concepts"]:
    assert c["id"].startswith("c6ss.1."), c["id"]
    assert len(c["question_patterns"]) == 5, c["id"]
    assert len(c["solution_steps"]) == 3, c["id"]
    assert len(c["worked_examples"]) >= 2, c["id"]
    assert len(c["exercises"]) >= 2, c["id"]
    if c["solution_type"] == "compute":
        for s in c["solution_steps"]:
            assert "compute" in s, c["id"]
for c in d2["concepts"]:
    assert c["id"].startswith("c6ss.2."), c["id"]
    assert len(c["question_patterns"]) == 5, c["id"]
    assert len(c["solution_steps"]) == 3, c["id"]
    assert len(c["worked_examples"]) >= 2, c["id"]
    assert len(c["exercises"]) >= 2, c["id"]
    if c["solution_type"] == "compute":
        for s in c["solution_steps"]:
            assert "compute" in s, c["id"]

print("All validations passed.")
