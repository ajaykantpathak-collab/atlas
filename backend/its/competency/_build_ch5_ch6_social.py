# -*- coding: utf-8 -*-
"""Build Class 6 Social Science competency catalogs for chapters 5 and 6."""
import json
import os

OUT_DIR = r"D:\platform\backend\its\competency"

# ---------------------------------------------------------------------------
# Chapter 5: India, That Is Bharat
# ---------------------------------------------------------------------------
ch5 = {
    "class": 6,
    "subject": "social_science",
    "chapter": 5,
    "chapter_title": "India, That Is Bharat",
    "source_file": "D:/node_generator/ncert-mcp/data/processed/text_cache/c6ss5.txt",
    "concepts": [
        {
            "id": "c6ss.5.1",
            "title": "Names of India - India, Bharat and Hindustan",
            "section": "5.1 NAMES OF INDIA",
            "definition": "India is known by several names -- 'India' comes from the river Sindhu (Indus), 'Bharat' comes from the ancient Bharata tribe and is used in the Constitution, and 'Hindustan' refers to the land of the Hindus or the people living beyond the Indus.",
            "formula": "",
            "key_idea": "The different names of India reflect its long history, diverse cultures and the influence of different peoples and languages over thousands of years.",
            "textbook_ref": "",
            "question_patterns": [
                "what are the different names of India",
                "how did India get its name",
                "what is the origin of the word Bharat",
                "where does the name Hindustan come from",
                "which name of India is used in the Constitution"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "Identify the names used for India",
                    "explain": "Recognise that India is referred to by several names including India, Bharat and Hindustan, each with a different origin."
                },
                {
                    "step": 2,
                    "action": "Trace the origin of each name",
                    "explain": "'India' derives from the river Sindhu (Indus) via the Greeks and Persians; 'Bharat' comes from the Bharata tribe mentioned in ancient texts; 'Hindustan' comes from the Persian name for the land beyond the Indus."
                },
                {
                    "step": 3,
                    "action": "Connect the names to history and the Constitution",
                    "explain": "Understand that these names reflect India's long history and that Article 1 of the Constitution states that 'India, that is Bharat, shall be a Union of States'."
                }
            ],
            "worked_examples": [
                {
                    "question": "How did India get the name 'India'?",
                    "solution": "The name 'India' comes from the river Sindhu (Indus). The Persians and Greeks who came to India pronounced Sindhu as 'Hindos' or 'Indos', and the land to the east of the river came to be called India.",
                    "answer": "The name 'India' comes from the river Sindhu (Indus)."
                },
                {
                    "question": "What is the origin of the name 'Bharat'?",
                    "solution": "The name 'Bharat' comes from the ancient Bharata tribe, one of the early Aryan tribes mentioned in the Rig Veda. The Constitution of India uses 'Bharat' as the official name.",
                    "answer": "'Bharat' comes from the ancient Bharata tribe and is used in the Constitution."
                },
                {
                    "question": "Where does the name 'Hindustan' come from?",
                    "solution": "The Persians called the land beyond the Indus river 'Hindustan', meaning the land of the Hindus or the people living beyond the Sindhu (Indus) river.",
                    "answer": "'Hindustan' comes from the Persian word for the land beyond the Indus river."
                }
            ],
            "exercises": [
                {
                    "question": "List the three main names of India and explain the origin of each.",
                    "type": "verify_property"
                },
                {
                    "question": "Which name of India is mentioned in Article 1 of the Constitution?",
                    "type": "verify_property"
                }
            ]
        },
        {
            "id": "c6ss.5.2",
            "title": "Location and Size of India",
            "section": "5.2 LOCATION AND SIZE OF INDIA",
            "definition": "India is located in the northern hemisphere, extending between latitudes 8 degrees 4 minutes N and 37 degrees 6 minutes N and longitudes 68 degrees 7 minutes E and 97 degrees 25 minutes E, covering an area of about 3.28 million square kilometres.",
            "formula": "",
            "key_idea": "India is the seventh largest country in the world by area and lies entirely in the northern hemisphere, with the Tropic of Cancer passing through its middle.",
            "textbook_ref": "",
            "question_patterns": [
                "what is the location of India in terms of latitude and longitude",
                "what is the area of India in square kilometres",
                "which rank does India hold in the world by area",
                "which important latitude line passes through the middle of India",
                "in which hemisphere does India lie"
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "Identify the latitudinal and longitudinal extent of India",
                    "explain": "Note that India lies between 8 degrees 4 minutes N and 37 degrees 6 minutes N latitude and 68 degrees 7 minutes E and 97 degrees 25 minutes E longitude.",
                    "compute": "lat_extent = 37.1 - 8.07 = 29.03 degrees N"
                },
                {
                    "step": 2,
                    "action": "Determine the area and rank of India",
                    "explain": "India covers about 3.28 million square kilometres, making it the seventh largest country in the world by area.",
                    "compute": "area = 3.28 million sq km; rank = 7"
                },
                {
                    "step": 3,
                    "action": "Locate the Tropic of Cancer and the hemisphere",
                    "explain": "India lies entirely in the northern hemisphere and the Tropic of Cancer (23 degrees 30 minutes N) passes through the middle of the country, dividing it into two climatic zones.",
                    "compute": "tropic_of_cancer = 23.5 degrees N"
                }
            ],
            "worked_examples": [
                {
                    "question": "What is the latitudinal extent of India?",
                    "solution": "India extends from 8 degrees 4 minutes N in the south to 37 degrees 6 minutes N in the north, giving a total latitudinal extent of about 29 degrees.",
                    "answer": "India lies between 8 degrees 4 minutes N and 37 degrees 6 minutes N latitude."
                },
                {
                    "question": "What is the area of India and what is its rank in the world by area?",
                    "solution": "India has an area of about 3.28 million square kilometres, which makes it the seventh largest country in the world.",
                    "answer": "Area = 3.28 million sq km; Rank = 7th largest."
                },
                {
                    "question": "Which important line of latitude passes through the middle of India?",
                    "solution": "The Tropic of Cancer, at 23 degrees 30 minutes N, passes through the middle of India, dividing it into two almost equal climatic zones.",
                    "answer": "The Tropic of Cancer (23 degrees 30 minutes N)."
                }
            ],
            "exercises": [
                {
                    "question": "State the latitudinal and longitudinal extent of India.",
                    "type": "compute"
                },
                {
                    "question": "In which hemisphere does India lie and what is its area in square kilometres?",
                    "type": "compute"
                }
            ]
        },
        {
            "id": "c6ss.5.3",
            "title": "Boundaries of India",
            "section": "5.3 BOUNDARIES OF INDIA",
            "definition": "India is bounded by the Himalayas in the north, the Bay of Bengal in the east, the Indian Ocean in the south, and the Arabian Sea in the west, and shares land borders with seven countries.",
            "formula": "",
            "key_idea": "India's location gives it a vast coastline and natural boundaries of mountains and seas, while its land borders connect it to seven neighbouring countries.",
            "textbook_ref": "",
            "question_patterns": [
                "what are the natural boundaries of India",
                "which seas and ocean surround India",
                "how many countries share a land border with India",
                "which mountain range forms the northern boundary of India",
                "name the water bodies that surround India"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "Identify the natural boundaries of India",
                    "explain": "The Himalayas form the northern boundary, the Bay of Bengal lies to the east, the Indian Ocean to the south, and the Arabian Sea to the west."
                },
                {
                    "step": 2,
                    "action": "List the neighbouring countries",
                    "explain": "India shares land borders with seven countries: Pakistan, Afghanistan, China, Nepal, Bhutan, Myanmar and Bangladesh."
                },
                {
                    "step": 3,
                    "action": "Note the significance of the boundaries",
                    "explain": "The mountain and sea boundaries provide natural protection, while the long coastline enables trade and cultural exchange with other countries."
                }
            ],
            "worked_examples": [
                {
                    "question": "Which water bodies surround India?",
                    "solution": "India is surrounded by the Arabian Sea in the west, the Bay of Bengal in the east, and the Indian Ocean in the south.",
                    "answer": "Arabian Sea (west), Bay of Bengal (east), Indian Ocean (south)."
                },
                {
                    "question": "How many countries share a land border with India? Name them.",
                    "solution": "Seven countries share a land border with India: Pakistan, Afghanistan, China, Nepal, Bhutan, Myanmar and Bangladesh.",
                    "answer": "Seven countries: Pakistan, Afghanistan, China, Nepal, Bhutan, Myanmar, Bangladesh."
                }
            ],
            "exercises": [
                {
                    "question": "Describe the natural boundaries of India in the north, east, west and south.",
                    "type": "verify_property"
                },
                {
                    "question": "List the seven countries that share a land border with India.",
                    "type": "verify_property"
                }
            ]
        },
        {
            "id": "c6ss.5.4",
            "title": "Physical Divisions of India",
            "section": "5.4 PHYSICAL DIVISIONS OF INDIA",
            "definition": "India is divided into six main physical divisions: the Great Himalayas (Northern Mountains), the Northern Plains, the Peninsular Plateau, the Indian Desert, the Coastal Plains, and the Islands.",
            "formula": "",
            "key_idea": "Each physical division of India has distinct features -- the Himalayas are young fold mountains, the plains are fertile and flat, the plateau is ancient and rocky, the desert is dry, the coastal plains are narrow strips along the coast, and the islands lie in the seas.",
            "textbook_ref": "",
            "question_patterns": [
                "what are the main physical divisions of India",
                "how many physical divisions does India have",
                "describe the northern plains of India",
                "what is the peninsular plateau",
                "name the six physical divisions of India"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "Identify the six physical divisions of India",
                    "explain": "India is divided into the Great Himalayas (Northern Mountains), Northern Plains, Peninsular Plateau, Indian Desert, Coastal Plains, and Islands."
                },
                {
                    "step": 2,
                    "action": "Describe the key features of each division",
                    "explain": "The Himalayas are young fold mountains; the Northern Plains are flat and fertile, formed by alluvial deposits; the Peninsular Plateau is an ancient, stable landform; the Desert is dry and sandy; the Coastal Plains are narrow strips along the coast; and the Islands lie in the Arabian Sea and the Bay of Bengal."
                },
                {
                    "step": 3,
                    "action": "Relate the divisions to their locations",
                    "explain": "The Himalayas lie in the north, the plains south of the Himalayas, the plateau in the central and southern part, the desert in the west, the coastal plains along the coasts, and the islands in the surrounding seas."
                }
            ],
            "worked_examples": [
                {
                    "question": "What are the six main physical divisions of India?",
                    "solution": "The six physical divisions are: the Great Himalayas (Northern Mountains), the Northern Plains, the Peninsular Plateau, the Indian Desert, the Coastal Plains, and the Islands.",
                    "answer": "The Great Himalayas, Northern Plains, Peninsular Plateau, Indian Desert, Coastal Plains, and Islands."
                },
                {
                    "question": "Describe the main features of the Northern Plains of India.",
                    "solution": "The Northern Plains are flat, fertile and level land formed by the alluvial deposits brought by the rivers Ganga, Indus and Brahmaputra. They are one of the most densely populated regions of India.",
                    "answer": "The Northern Plains are flat, fertile plains formed by river alluvium."
                },
                {
                    "question": "What is the Peninsular Plateau?",
                    "solution": "The Peninsular Plateau is an ancient, stable landform that lies to the south of the Northern Plains. It is made of old, hard rocks and is divided into the Central Highlands and the Deccan Plateau.",
                    "answer": "The Peninsular Plateau is an ancient, stable tableland of old hard rocks."
                }
            ],
            "exercises": [
                {
                    "question": "List the six physical divisions of India and state one feature of each.",
                    "type": "verify_property"
                },
                {
                    "question": "Describe the location and features of the Indian Desert.",
                    "type": "verify_property"
                }
            ]
        },
        {
            "id": "c6ss.5.5",
            "title": "The Himalayas - Northern Mountains",
            "section": "5.4 PHYSICAL DIVISIONS OF INDIA",
            "definition": "The Himalayas are young fold mountains in the north of India, formed by the folding of the earth's crust, and are divided into three parallel ranges: the Himadri (Greater Himalayas), the Himachal (Lesser Himalayas), and the Shivaliks (Outer Himalayas).",
            "formula": "",
            "key_idea": "The Himalayas are the highest mountain range in the world, act as a natural barrier protecting India from cold winds, and are the source of major rivers like the Ganga and Indus.",
            "textbook_ref": "",
            "question_patterns": [
                "what are the three ranges of the Himalayas",
                "what type of mountains are the Himalayas",
                "which is the highest range of the Himalayas",
                "why are the Himalayas important for India",
                "how were the Himalayas formed"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "Identify the type and formation of the Himalayas",
                    "explain": "The Himalayas are young fold mountains formed by the folding of the earth's crust due to the movement of tectonic plates over millions of years."
                },
                {
                    "step": 2,
                    "action": "Name the three parallel ranges",
                    "explain": "The Himalayas have three parallel ranges: the Himadri (Greater Himalayas) which is the highest and has permanently snow-covered peaks; the Himachal (Lesser Himalayas) which lies to the south; and the Shivaliks (Outer Himalayas) which is the outermost and lowest range."
                },
                {
                    "step": 3,
                    "action": "Explain the importance of the Himalayas",
                    "explain": "The Himalayas protect India from cold winds from the north, are the source of major perennial rivers, and support a wide variety of plant and animal life."
                }
            ],
            "worked_examples": [
                {
                    "question": "What are the three parallel ranges of the Himalayas?",
                    "solution": "The three ranges are the Himadri (Greater Himalayas), the Himachal (Lesser Himalayas), and the Shivaliks (Outer Himalayas).",
                    "answer": "Himadri, Himachal, and Shivaliks."
                },
                {
                    "question": "Why are the Himalayas called young fold mountains?",
                    "solution": "The Himalayas are called young fold mountains because they were formed relatively recently in geological time by the folding of the earth's crust, and they are still rising.",
                    "answer": "They are young fold mountains formed by the folding of the earth's crust and are still rising."
                }
            ],
            "exercises": [
                {
                    "question": "Name the three ranges of the Himalayas and state one feature of each.",
                    "type": "verify_property"
                },
                {
                    "question": "Explain two ways in which the Himalayas are important for India.",
                    "type": "verify_property"
                }
            ]
        },
        {
            "id": "c6ss.5.6",
            "title": "Rivers of India and Their Basins",
            "section": "5.5 RIVERS OF INDIA",
            "definition": "India's rivers are classified into the Himalayan rivers (Ganga, Indus, Brahmaputra) which are perennial and fed by snow and rain, and the Peninsular rivers (Narmada, Tapi, Godavari, Krishna, Kaveri) which are seasonal and rain-fed.",
            "formula": "",
            "key_idea": "Rivers are the lifelines of India -- they provide water for drinking, irrigation and industry, deposit fertile alluvium in the plains, and form the basis of agriculture and civilisation.",
            "textbook_ref": "",
            "question_patterns": [
                "what are the major rivers of India",
                "what is the difference between Himalayan and Peninsular rivers",
                "which rivers form the Northern Plains",
                "why are Himalayan rivers perennial",
                "what is a river basin"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "Classify the rivers of India",
                    "explain": "Divide the rivers into Himalayan rivers (Ganga, Indus, Brahmaputra) which are perennial, and Peninsular rivers (Narmada, Tapi, Godavari, Krishna, Kaveri) which are seasonal."
                },
                {
                    "step": 2,
                    "action": "Explain the source and flow of each group",
                    "explain": "Himalayan rivers originate from glaciers in the Himalayas and flow throughout the year because they are fed by snowmelt and rain; Peninsular rivers originate in the Western Ghats or central highlands and depend on monsoon rainfall."
                },
                {
                    "step": 3,
                    "action": "Describe the river basin and its importance",
                    "explain": "A river basin is the area drained by a river and its tributaries; river basins are fertile and support agriculture, which is why most of India's population lives in river basins."
                }
            ],
            "worked_examples": [
                {
                    "question": "What is the difference between Himalayan rivers and Peninsular rivers?",
                    "solution": "Himalayan rivers are perennial, fed by snowmelt and rain, and have large basins; Peninsular rivers are seasonal, depend on monsoon rain, and have smaller basins. Himalayan rivers form broad valleys and deltas, while Peninsular rivers flow in narrower channels.",
                    "answer": "Himalayan rivers are perennial and snow-fed; Peninsular rivers are seasonal and rain-fed."
                },
                {
                    "question": "Why are Himalayan rivers called perennial rivers?",
                    "solution": "Himalayan rivers are called perennial because they have water throughout the year. They are fed by the melting snow of glaciers in summer and by monsoon rains, so they never dry up completely.",
                    "answer": "Himalayan rivers are perennial because they are fed by snowmelt and rain throughout the year."
                },
                {
                    "question": "What is a river basin?",
                    "solution": "A river basin is the entire area drained by a river and its tributaries. It includes the land from which water flows into the river and is usually fertile, making it suitable for agriculture.",
                    "answer": "A river basin is the area drained by a river and its tributaries."
                }
            ],
            "exercises": [
                {
                    "question": "Name three major Himalayan rivers and three major Peninsular rivers of India.",
                    "type": "verify_property"
                },
                {
                    "question": "Explain why river basins are important for human settlement and agriculture.",
                    "type": "verify_property"
                }
            ]
        },
        {
            "id": "c6ss.5.7",
            "title": "Climate of India",
            "section": "5.6 CLIMATE OF INDIA",
            "definition": "India has a tropical monsoon climate characterised by distinct seasons -- winter (December to February), summer (March to May), the southwest monsoon (June to September), and the retreating monsoon (October to November).",
            "formula": "",
            "key_idea": "The climate of India is influenced by its location, the Himalayas, and the monsoon winds; the Tropic of Cancer divides the country into two climatic zones.",
            "textbook_ref": "",
            "question_patterns": [
                "what type of climate does India have",
                "what are the four seasons of India",
                "what is the monsoon and why is it important",
                "how does the Tropic of Cancer affect India's climate",
                "why do different parts of India have different climates"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "Identify the type of climate of India",
                    "explain": "India has a tropical monsoon climate, which means it has hot summers, a rainy monsoon season, and a cool winter, driven by the seasonal reversal of monsoon winds."
                },
                {
                    "step": 2,
                    "action": "List the four main seasons",
                    "explain": "The four seasons are winter (December to February), summer (March to May), the southwest monsoon or rainy season (June to September), and the retreating monsoon (October to November)."
                },
                {
                    "step": 3,
                    "action": "Explain the factors affecting the climate",
                    "explain": "The climate is influenced by the location of India, the Himalayas which block cold winds, the Tropic of Cancer which divides the country into two zones, and the monsoon winds which bring most of the rainfall."
                }
            ],
            "worked_examples": [
                {
                    "question": "What type of climate does India have?",
                    "solution": "India has a tropical monsoon climate. It is characterised by hot summers, a rainy season brought by the southwest monsoon, and a cool winter, with most of the rainfall occurring between June and September.",
                    "answer": "India has a tropical monsoon climate."
                },
                {
                    "question": "What are the four main seasons of India?",
                    "solution": "The four seasons are winter (December to February), summer (March to May), the southwest monsoon (June to September), and the retreating monsoon (October to November).",
                    "answer": "Winter, summer, southwest monsoon, and retreating monsoon."
                }
            ],
            "exercises": [
                {
                    "question": "Describe the four seasons of India with their months.",
                    "type": "verify_property"
                },
                {
                    "question": "Explain how the Himalayas and the Tropic of Cancer influence the climate of India.",
                    "type": "verify_property"
                }
            ]
        },
        {
            "id": "c6ss.5.8",
            "title": "Natural Vegetation of India",
            "section": "5.7 NATURAL VEGETATION OF INDIA",
            "definition": "Natural vegetation refers to the plant cover that grows naturally without human interference; India has five main types -- tropical evergreen forests, tropical deciduous forests, thorn forests, mountain forests, and mangrove forests.",
            "formula": "",
            "key_idea": "The type of natural vegetation in a region depends on the climate, especially temperature and rainfall; India's varied climate gives it a rich diversity of vegetation.",
            "textbook_ref": "",
            "question_patterns": [
                "what is natural vegetation",
                "what are the types of natural vegetation in India",
                "where are tropical evergreen forests found in India",
                "what are mangrove forests and where are they found",
                "how does climate affect natural vegetation"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "Define natural vegetation",
                    "explain": "Natural vegetation is the plant cover that grows on its own without any human help, determined by the climate, soil and topography of a region."
                },
                {
                    "step": 2,
                    "action": "List the five main types of vegetation in India",
                    "explain": "The five types are tropical evergreen forests (heavy rainfall areas), tropical deciduous forests (moderate rainfall), thorn forests (dry regions), mountain forests (Himalayan slopes), and mangrove forests (coastal deltas)."
                },
                {
                    "step": 3,
                    "action": "Relate vegetation to climate and rainfall",
                    "explain": "Tropical evergreen forests grow where rainfall is heavy and constant; deciduous forests shed leaves in the dry season; thorn forests grow in dry areas with scanty rain; mountain forests change with altitude; and mangroves grow in salty coastal waters."
                }
            ],
            "worked_examples": [
                {
                    "question": "What is natural vegetation?",
                    "solution": "Natural vegetation is the plant cover that grows naturally in a region without human interference. The type of vegetation depends mainly on the climate, especially the amount of rainfall and temperature.",
                    "answer": "Natural vegetation is the plant cover that grows naturally without human help."
                },
                {
                    "question": "Where are mangrove forests found in India?",
                    "solution": "Mangrove forests are found in the deltas of rivers where fresh water mixes with sea water. In India, the Sundarbans in the delta of the Ganga and Brahmaputra is the largest mangrove forest, known for the Royal Bengal tiger.",
                    "answer": "Mangrove forests are found in coastal deltas, especially the Sundarbans."
                },
                {
                    "question": "How does rainfall affect the type of natural vegetation?",
                    "solution": "Areas with heavy rainfall have tropical evergreen forests; areas with moderate rainfall have deciduous forests that shed leaves in the dry season; and dry areas with scanty rainfall have thorn forests and shrubs.",
                    "answer": "More rainfall supports evergreen forests; less rainfall supports thorn forests."
                }
            ],
            "exercises": [
                {
                    "question": "List the five main types of natural vegetation found in India.",
                    "type": "verify_property"
                },
                {
                    "question": "Explain how temperature and rainfall determine the type of natural vegetation in a region.",
                    "type": "verify_property"
                }
            ]
        },
        {
            "id": "c6ss.5.9",
            "title": "Unity in Diversity in India",
            "section": "5.8 UNITY IN DIVERSITY",
            "definition": "Unity in diversity means that despite differences in language, religion, culture, food, dress and customs, the people of India are united by a shared history, common values and a sense of belonging to one nation.",
            "formula": "",
            "key_idea": "India's diversity is visible in its languages, religions, festivals, food and clothing, yet a common thread of shared traditions and national identity binds the country together.",
            "textbook_ref": "",
            "question_patterns": [
                "what is meant by unity in diversity",
                "how is diversity reflected in India",
                "give examples of unity in diversity in India",
                "why is India called a country of unity in diversity",
                "how do festivals show unity in diversity in India"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "Identify the elements of diversity in India",
                    "explain": "India has diversity in language, religion, culture, food, clothing, festivals and customs, with people of different communities living across the country."
                },
                {
                    "step": 2,
                    "action": "Identify the elements of unity",
                    "explain": "Despite the diversity, the people of India share a common history, common national symbols, a shared Constitution, and a sense of belonging to one nation."
                },
                {
                    "step": 3,
                    "action": "Explain the concept of unity in diversity",
                    "explain": "Unity in diversity means that the different people of India live together peacefully, respect each other's traditions, and are bound by a common national identity, making India a unique nation."
                }
            ],
            "worked_examples": [
                {
                    "question": "What is meant by 'unity in diversity' in the context of India?",
                    "solution": "Unity in diversity means that although the people of India differ in language, religion, food, dress and customs, they are united by a shared history, common values and a sense of belonging to one nation.",
                    "answer": "Unity in diversity means being united despite differences in culture, language and religion."
                },
                {
                    "question": "Give two examples that show unity in diversity in India.",
                    "solution": "First, festivals like Diwali, Eid and Christmas are celebrated by people of all communities across India. Second, people across the country share a common national identity and respect the same Constitution despite speaking different languages.",
                    "answer": "Festivals celebrated by all communities and a shared national identity are examples of unity in diversity."
                }
            ],
            "exercises": [
                {
                    "question": "Explain the meaning of 'unity in diversity' with reference to India.",
                    "type": "verify_property"
                },
                {
                    "question": "Give three examples that show unity in diversity in India.",
                    "type": "verify_property"
                }
            ]
        },
        {
            "id": "c6ss.5.10",
            "title": "Significance of India's Geography",
            "section": "5.9 SIGNIFICANCE OF INDIA'S GEOGRAPHY",
            "definition": "India's geography -- its location, mountains, rivers, climate and coastline -- has shaped its history, supported agriculture and trade, and contributed to its cultural diversity and unity.",
            "formula": "",
            "key_idea": "The diverse geography of India has enabled a variety of crops, supported dense populations in river plains, facilitated trade through the coastline, and acted as a natural barrier protecting the country.",
            "textbook_ref": "",
            "question_patterns": [
                "how has geography shaped the history of India",
                "why is India's location important",
                "how do rivers support life in India",
                "what role does the coastline play in India's trade",
                "how has India's geography contributed to its diversity"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "Identify the key geographical features of India",
                    "explain": "Note the main features: the Himalayas in the north, the fertile Northern Plains, the Peninsular Plateau, the long coastline, the monsoon climate and the major rivers."
                },
                {
                    "step": 2,
                    "action": "Explain how geography supports agriculture and population",
                    "explain": "The fertile plains and perennial rivers support intensive agriculture, which has allowed large populations to settle in the Northern Plains and river deltas."
                },
                {
                    "step": 3,
                    "action": "Explain how geography supports trade, defence and diversity",
                    "explain": "The long coastline enables sea trade, the Himalayas provide natural defence, and the varied climate and relief support a diversity of crops, cultures and lifestyles across the country."
                }
            ],
            "worked_examples": [
                {
                    "question": "How has India's geography contributed to its cultural diversity?",
                    "solution": "India's varied geography -- mountains, plains, plateaus, deserts and coastal areas -- supports different ways of life, crops, food and clothing in different regions, leading to a rich diversity of cultures.",
                    "answer": "Varied geography supports different lifestyles and cultures across regions."
                },
                {
                    "question": "Why is the long coastline of India important?",
                    "solution": "The long coastline of India along the Arabian Sea, the Bay of Bengal and the Indian Ocean enables trade and cultural exchange with other countries, and supports fishing and port cities.",
                    "answer": "The coastline enables trade, cultural exchange and fishing."
                },
                {
                    "question": "How do the rivers of India support its people?",
                    "solution": "Rivers provide water for drinking, irrigation and industry, deposit fertile alluvium in the plains, support fisheries, and form the basis of agriculture, which is the main occupation of a large part of India's population.",
                    "answer": "Rivers provide water, fertile soil and support agriculture and industry."
                }
            ],
            "exercises": [
                {
                    "question": "Explain how India's geography has shaped its history and development.",
                    "type": "verify_property"
                },
                {
                    "question": "Describe the role of rivers and the coastline in supporting life and trade in India.",
                    "type": "verify_property"
                }
            ]
        }
    ]
}

# ---------------------------------------------------------------------------
# Chapter 6: The Beginnings of Indian Civilisation
# ---------------------------------------------------------------------------
ch6 = {
    "class": 6,
    "subject": "social_science",
    "chapter": 6,
    "chapter_title": "The Beginnings of Indian Civilisation",
    "source_file": "D:/node_generator/ncert-mcp/data/processed/text_cache/c6ss6.txt",
    "concepts": [
        {
            "id": "c6ss.6.1",
            "title": "The Indus Valley Civilisation - Harappa and Mohenjo-daro",
            "section": "6.1 THE INDUS VALLEY CIVILISATION",
            "definition": "The Indus Valley Civilisation (also called the Harappan Civilisation) was one of the earliest urban civilisations in the world, flourishing around 2600 BCE to 1900 BCE along the Indus river, with major cities at Harappa and Mohenjo-daro.",
            "formula": "",
            "key_idea": "The Indus Valley Civilisation was a highly advanced urban civilisation known for its city planning, brick houses, drainage systems and trade, spread over a large area in present-day Pakistan and northwest India.",
            "textbook_ref": "",
            "question_patterns": [
                "what was the Indus Valley Civilisation",
                "where was the Indus Valley Civilisation located",
                "what are the major cities of the Harappan Civilisation",
                "when did the Indus Valley Civilisation flourish",
                "why is it called the Harappan Civilisation"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "Identify the time and location of the civilisation",
                    "explain": "The Indus Valley Civilisation flourished between about 2600 BCE and 1900 BCE along the floodplain of the Indus river and its tributaries in present-day Pakistan and northwest India."
                },
                {
                    "step": 2,
                    "action": "Name the major cities",
                    "explain": "The two most important cities were Harappa (on the bank of the Ravi) and Mohenjo-daro (on the bank of the Indus). Other sites include Kalibangan, Lothal, Dholavira and Rakhigarhi."
                },
                {
                    "step": 3,
                    "action": "Explain why it is called the Harappan Civilisation",
                    "explain": "It is called the Harappan Civilisation because Harappa was the first site to be discovered and excavated, in 1921, and it gave the civilisation its name."
                }
            ],
            "worked_examples": [
                {
                    "question": "When and where did the Indus Valley Civilisation flourish?",
                    "solution": "The Indus Valley Civilisation flourished between about 2600 BCE and 1900 BCE along the Indus river and its tributaries in present-day Pakistan and northwest India.",
                    "answer": "It flourished from 2600 BCE to 1900 BCE along the Indus river valley."
                },
                {
                    "question": "Why is the Indus Valley Civilisation also called the Harappan Civilisation?",
                    "solution": "It is called the Harappan Civilisation because Harappa was the first site of this civilisation to be discovered and excavated, in 1921, and the name Harappa was used to identify the entire civilisation.",
                    "answer": "It is named after Harappa, the first site to be discovered."
                },
                {
                    "question": "Name the two most important cities of the Indus Valley Civilisation.",
                    "solution": "The two most important cities were Harappa, located on the bank of the river Ravi, and Mohenjo-daro, located on the bank of the river Indus.",
                    "answer": "Harappa and Mohenjo-daro."
                }
            ],
            "exercises": [
                {
                    "question": "Describe the location and time period of the Indus Valley Civilisation.",
                    "type": "verify_property"
                },
                {
                    "question": "Name four important sites of the Harappan Civilisation besides Harappa and Mohenjo-daro.",
                    "type": "verify_property"
                }
            ]
        },
        {
            "id": "c6ss.6.2",
            "title": "Town Planning and Architecture of the Harappan Cities",
            "section": "6.2 TOWN PLANNING AND ARCHITECTURE",
            "definition": "The Harappan cities were remarkable for their town planning -- they had a grid layout of streets, baked-brick houses, a citadel and a lower town, the Great Bath, granaries and an advanced drainage system.",
            "formula": "",
            "key_idea": "The Harappan cities show a high level of planning with straight streets crossing at right angles, standardised bricks, covered drains and public buildings, reflecting an organised civic administration.",
            "textbook_ref": "",
            "question_patterns": [
                "what were the features of town planning in Harappan cities",
                "describe the Great Bath of Mohenjo-daro",
                "what was the drainage system of the Harappan cities like",
                "how were houses built in the Indus Valley Civilisation",
                "what is the citadel in a Harappan city"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "Describe the layout of the cities",
                    "explain": "Harappan cities were divided into two parts -- a raised citadel (the western part) and a lower town (the eastern part). The streets were laid out in a grid pattern, crossing each other at right angles."
                },
                {
                    "step": 2,
                    "action": "Describe the houses and public buildings",
                    "explain": "Houses were made of baked bricks, usually with a courtyard, rooms around it, a well and a bathroom. Public buildings included the Great Bath at Mohenjo-daro and large granaries for storing grain."
                },
                {
                    "step": 3,
                    "action": "Describe the drainage system",
                    "explain": "The drainage system was the most remarkable feature -- drains were covered, made of bricks, and connected to house drains; wastewater flowed into street drains and then into soak pits, showing advanced sanitation planning."
                }
            ],
            "worked_examples": [
                {
                    "question": "Describe the town planning of the Harappan cities.",
                    "solution": "Harappan cities were divided into a citadel and a lower town. The streets were laid out in a grid pattern, crossing at right angles. Houses were made of baked bricks and had wells and bathrooms. The cities had a well-planned covered drainage system.",
                    "answer": "Grid-pattern streets, baked-brick houses, a citadel, a lower town and covered drains."
                },
                {
                    "question": "What was the Great Bath of Mohenjo-daro?",
                    "solution": "The Great Bath was a large rectangular tank in the citadel of Mohenjo-daro, lined with bricks and sealed with a layer of tar to make it waterproof. It was probably used for ritual bathing.",
                    "answer": "The Great Bath was a large waterproof tank used for ritual bathing."
                },
                {
                    "question": "Why is the drainage system of the Harappan cities considered remarkable?",
                    "solution": "The drains were covered with bricks or stone slabs, connected to house drains, and had soak pits to collect wastewater. No other contemporary civilisation had such an advanced drainage system.",
                    "answer": "The covered, connected drainage system with soak pits was unmatched by any contemporary civilisation."
                }
            ],
            "exercises": [
                {
                    "question": "Describe the layout and main features of a Harappan city.",
                    "type": "verify_property"
                },
                {
                    "question": "Explain the drainage system of the Harappan cities and why it was advanced.",
                    "type": "verify_property"
                }
            ]
        },
        {
            "id": "c6ss.6.3",
            "title": "Agriculture and Trade in the Indus Valley Civilisation",
            "section": "6.3 AGRICULTURE AND TRADE",
            "definition": "The Harappans practised agriculture along the fertile Indus floodplain, growing wheat, barley, peas and cotton, and engaged in extensive trade with regions within and beyond the subcontinent.",
            "formula": "",
            "key_idea": "Agriculture along the Indus river provided surplus food that supported the urban population, while trade in beads, metals, precious stones and pottery connected the Harappans to Mesopotamia and other regions.",
            "textbook_ref": "",
            "question_patterns": [
                "what crops did the Harappans grow",
                "how did agriculture support the Harappan cities",
                "what did the Harappans trade and with whom",
                "what evidence shows that the Harappans traded with Mesopotamia",
                "how did the Harappans use the Indus river for trade"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "Describe the agriculture of the Harappans",
                    "explain": "The Harappans grew wheat, barley, peas, sesame, mustard and cotton along the fertile floodplain of the Indus. They used wooden ploughs and stored grain in large granaries."
                },
                {
                    "step": 2,
                    "action": "Describe the trade of the Harappans",
                    "explain": "The Harappans traded in beads, ornaments, cotton, metals, precious stones and pottery. They traded within the subcontinent and with regions like Mesopotamia, Afghanistan and Persia."
                },
                {
                    "step": 3,
                    "action": "Explain the evidence of trade",
                    "explain": "Evidence of trade includes Harappan seals found in Mesopotamia, dockyards at Lothal, standardised weights and measures, and references in Mesopotamian texts to trade with a land called 'Meluhha', believed to be the Indus region."
                }
            ],
            "worked_examples": [
                {
                    "question": "What crops did the Harappans cultivate?",
                    "solution": "The Harappans grew wheat, barley, peas, sesame, mustard and cotton. Cotton was one of the earliest crops cultivated in this region, and the Harappans may have been the first people to grow cotton.",
                    "answer": "Wheat, barley, peas, sesame, mustard and cotton."
                },
                {
                    "question": "With which regions did the Harappans trade?",
                    "solution": "The Harappans traded with regions within the subcontinent and beyond, including Mesopotamia, Afghanistan and Persia. Harappan seals and beads have been found in Mesopotamian cities.",
                    "answer": "They traded with Mesopotamia, Afghanistan, Persia and regions within the subcontinent."
                },
                {
                    "question": "What evidence shows that the Harappans traded with Mesopotamia?",
                    "solution": "Harappan seals, beads and pottery have been found in Mesopotamian cities. Mesopotamian texts mention trade with a land called 'Meluhha', which is believed to be the Indus region. The dockyard at Lothal also shows maritime trade.",
                    "answer": "Harappan seals in Mesopotamia, Mesopotamian texts mentioning Meluhha, and the Lothal dockyard."
                }
            ],
            "exercises": [
                {
                    "question": "Describe the agriculture of the Harappan Civilisation and the crops they grew.",
                    "type": "verify_property"
                },
                {
                    "question": "Explain the evidence that shows the Harappans engaged in long-distance trade.",
                    "type": "verify_property"
                }
            ]
        },
        {
            "id": "c6ss.6.4",
            "title": "Arts and Crafts of the Harappan Civilisation",
            "section": "6.4 ARTS AND CRAFTS",
            "definition": "The Harappans were skilled in arts and crafts -- they made beads, ornaments, pottery, seals, bronze and copper tools, and terracotta figurines, showing a high level of craftsmanship.",
            "formula": "",
            "key_idea": "The Harappans specialised in crafts like bead-making, pottery, metalworking and seal-making; their standardised weights, measures and seals indicate an organised craft production and trade system.",
            "textbook_ref": "",
            "question_patterns": [
                "what arts and crafts were practised by the Harappans",
                "describe the seals of the Indus Valley Civilisation",
                "what was special about Harappan pottery",
                "what metals did the Harappans use",
                "what were the terracotta figurines of the Harappans"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "Identify the main crafts of the Harappans",
                    "explain": "The Harappans were skilled in bead-making, pottery, metalworking (copper and bronze), seal-making, weaving and making terracotta figurines."
                },
                {
                    "step": 2,
                    "action": "Describe the seals and their purpose",
                    "explain": "Harappan seals were made of steatite (soapstone), usually square, with animal figures and an undeciphered script. They were probably used to mark goods for trade."
                },
                {
                    "step": 3,
                    "action": "Describe the pottery and metalwork",
                    "explain": "Harappan pottery was red and black, well-fired and often painted with designs. The Harappans used copper and bronze for tools and weapons, and made ornaments from gold, silver and beads."
                }
            ],
            "worked_examples": [
                {
                    "question": "What were the Harappan seals and what was their purpose?",
                    "solution": "Harappan seals were small, usually square pieces made of steatite, engraved with animal figures like the unicorn and an undeciphered script. They were probably used by traders to stamp goods and mark ownership.",
                    "answer": "Steatite seals with animal figures and script, used to mark goods for trade."
                },
                {
                    "question": "Describe the pottery of the Harappan Civilisation.",
                    "solution": "Harappan pottery was made of red clay, well-fired, and painted in black with geometric and animal designs. It was of a high quality and was mass-produced, showing skilled craftsmanship.",
                    "answer": "Red and black painted pottery, well-fired with geometric and animal designs."
                },
                {
                    "question": "Which metals did the Harappans use and for what purposes?",
                    "solution": "The Harappans used copper and bronze to make tools, weapons and vessels, and gold and silver to make ornaments and beads. They did not use iron.",
                    "answer": "Copper and bronze for tools; gold and silver for ornaments. Iron was not used."
                }
            ],
            "exercises": [
                {
                    "question": "Describe the arts and crafts of the Harappan Civilisation.",
                    "type": "verify_property"
                },
                {
                    "question": "Explain the significance of the Harappan seals and what they tell us about the civilisation.",
                    "type": "verify_property"
                }
            ]
        },
        {
            "id": "c6ss.6.5",
            "title": "Writing and Script of the Harappan Civilisation",
            "section": "6.5 WRITING AND SCRIPT",
            "definition": "The Harappans had a system of writing that has not yet been deciphered; the script was pictographic and is found on seals, pottery and other objects, usually written from right to left.",
            "formula": "",
            "key_idea": "The Harappan script remains undeciphered, which is why we do not know the language they spoke; the script appears on seals and artefacts and was probably used for trade and administration.",
            "textbook_ref": "",
            "question_patterns": [
                "what was the script of the Harappan Civilisation",
                "has the Harappan script been deciphered",
                "on what objects is the Harappan script found",
                "in which direction was the Harappan script written",
                "why do we know little about the Harappan language"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "Describe the Harappan script",
                    "explain": "The Harappan script was pictographic, with signs representing objects, animals and ideas. It had about 375 to 400 signs and was usually written from right to left."
                },
                {
                    "step": 2,
                    "action": "State where the script is found",
                    "explain": "The script is found mainly on seals, but also on pottery, copper tablets, terracotta and other objects. Most inscriptions are short, with only a few signs."
                },
                {
                    "step": 3,
                    "action": "Explain that the script is undeciphered",
                    "explain": "The Harappan script has not yet been deciphered because there is no bilingual text (like the Rosetta Stone) to help scholars read it, so the language spoken by the Harappans remains unknown."
                }
            ],
            "worked_examples": [
                {
                    "question": "Has the Harappan script been deciphered? Why or why not?",
                    "solution": "No, the Harappan script has not been deciphered. Scholars have not found a bilingual text that could help them read it, so the language of the Harappans is still unknown.",
                    "answer": "No, the script is undeciphered because no bilingual key has been found."
                },
                {
                    "question": "On what objects is the Harappan script found?",
                    "solution": "The Harappan script is found mainly on seals, but also on pottery, copper tablets, terracotta objects and other artefacts. Most inscriptions are very short.",
                    "answer": "On seals, pottery, copper tablets and terracotta objects."
                }
            ],
            "exercises": [
                {
                    "question": "Describe the Harappan script and state why it has not been deciphered.",
                    "type": "verify_property"
                },
                {
                    "question": "On what kinds of objects is the Harappan script found?",
                    "type": "verify_property"
                }
            ]
        },
        {
            "id": "c6ss.6.6",
            "title": "Decline of the Indus Valley Civilisation",
            "section": "6.6 DECLINE OF THE INDUS VALLEY CIVILISATION",
            "definition": "The Indus Valley Civilisation declined around 1900 BCE, possibly due to a combination of factors including climate change, drying of rivers, floods, deforestation, and a decline in trade.",
            "formula": "",
            "key_idea": "The decline of the Harappan Civilisation was gradual and not sudden; scholars suggest several causes such as environmental changes, river shifts, natural disasters and a breakdown of trade and urban order.",
            "textbook_ref": "",
            "question_patterns": [
                "when did the Indus Valley Civilisation decline",
                "what were the causes of the decline of the Harappan Civilisation",
                "how did climate change affect the Indus Valley Civilisation",
                "did the drying of rivers cause the decline of the Harappan cities",
                "what happened to the Harappan cities after their decline"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "State when the civilisation declined",
                    "explain": "The Indus Valley Civilisation declined around 1900 BCE, about 700 years after it began, as shown by the abandonment of cities and a decline in the quality of artefacts."
                },
                {
                    "step": 2,
                    "action": "List the possible causes of decline",
                    "explain": "Scholars suggest several causes: climate change and reduced rainfall, the drying or shifting of rivers, floods, deforestation, overuse of land, and a decline in trade with Mesopotamia."
                },
                {
                    "step": 3,
                    "action": "Explain that the decline was gradual",
                    "explain": "The decline was not sudden; cities were gradually abandoned, trade declined, and the quality of crafts and town planning deteriorated, leading to the end of the urban phase of the civilisation."
                }
            ],
            "worked_examples": [
                {
                    "question": "When did the Indus Valley Civilisation decline?",
                    "solution": "The Indus Valley Civilisation declined around 1900 BCE. The cities were gradually abandoned and the quality of crafts and town planning deteriorated.",
                    "answer": "Around 1900 BCE."
                },
                {
                    "question": "What were the possible causes of the decline of the Harappan Civilisation?",
                    "solution": "Possible causes include climate change with reduced rainfall, the drying or shifting of rivers, floods, deforestation, overuse of land, and a decline in trade with Mesopotamia. The decline was gradual, not sudden.",
                    "answer": "Climate change, river shifts, floods, deforestation and decline in trade."
                }
            ],
            "exercises": [
                {
                    "question": "State the approximate time of the decline of the Indus Valley Civilisation.",
                    "type": "verify_property"
                },
                {
                    "question": "Explain three possible causes of the decline of the Harappan Civilisation.",
                    "type": "verify_property"
                }
            ]
        },
        {
            "id": "c6ss.6.7",
            "title": "The Vedic Period - Early and Later Vedic",
            "section": "6.7 THE VEDIC PERIOD",
            "definition": "The Vedic period (about 1500 BCE to 600 BCE) followed the decline of the Harappan Civilisation and is divided into the Early Vedic period (pastoral, tribal society) and the Later Vedic period (agricultural, settled kingdoms), named after the Vedas.",
            "formula": "",
            "key_idea": "The Vedic period is known from the four Vedas -- Rig Veda, Sama Veda, Yajur Veda and Atharva Veda -- which are the earliest literary sources of India and describe the life, society and beliefs of the Indo-Aryans.",
            "textbook_ref": "",
            "question_patterns": [
                "what was the Vedic period",
                "what are the four Vedas",
                "what is the difference between early and later Vedic period",
                "who were the Aryans",
                "what is the Rig Veda"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "Define the Vedic period and its sources",
                    "explain": "The Vedic period lasted from about 1500 BCE to 600 BCE and is known from the four Vedas -- Rig Veda, Sama Veda, Yajur Veda and Atharva Veda -- which are the earliest literary sources of ancient India."
                },
                {
                    "step": 2,
                    "action": "Describe the Early Vedic period",
                    "explain": "In the Early Vedic period, the people were semi-nomadic pastoralists who reared cattle, lived in tribes, and had a simple society with no rigid caste system. The Rig Veda was composed during this period."
                },
                {
                    "step": 3,
                    "action": "Describe the Later Vedic period",
                    "explain": "In the Later Vedic period, people settled down to agriculture, formed kingdoms (janapadas), and society became more stratified with the emergence of the varna system and the rule of kings."
                }
            ],
            "worked_examples": [
                {
                    "question": "What are the four Vedas?",
                    "solution": "The four Vedas are the Rig Veda (the oldest, a collection of hymns), the Sama Veda (melodies for chanting), the Yajur Veda (ritual formulas) and the Atharva Veda (spells and charms). They are the earliest literary sources of ancient India.",
                    "answer": "Rig Veda, Sama Veda, Yajur Veda and Atharva Veda."
                },
                {
                    "question": "What is the difference between the Early Vedic and Later Vedic periods?",
                    "solution": "In the Early Vedic period, people were semi-nomadic pastoralists with a tribal, egalitarian society. In the Later Vedic period, people settled to agriculture, formed kingdoms, and society became stratified with the varna system and kingship.",
                    "answer": "Early Vedic was pastoral and tribal; Later Vedic was agricultural with kingdoms and the varna system."
                },
                {
                    "question": "What is the Rig Veda and why is it important?",
                    "solution": "The Rig Veda is the oldest of the four Vedas and the earliest literary source of ancient India. It is a collection of over 1,000 hymns addressed to gods like Indra and Agni, and gives information about the Early Vedic society.",
                    "answer": "The Rig Veda is the oldest Veda, a collection of hymns and the earliest literary source of India."
                }
            ],
            "exercises": [
                {
                    "question": "Name the four Vedas and state what each contains.",
                    "type": "verify_property"
                },
                {
                    "question": "Explain the main differences between the Early Vedic and Later Vedic periods.",
                    "type": "verify_property"
                }
            ]
        },
        {
            "id": "c6ss.6.8",
            "title": "Society and Economy in the Vedic Period",
            "section": "6.8 SOCIETY AND ECONOMY IN THE VEDIC PERIOD",
            "definition": "Vedic society was organised into tribes and later into the four varnas (Brahmins, Kshatriyas, Vaishyas and Shudras); the economy was based on cattle rearing in the Early Vedic period and agriculture and trade in the Later Vedic period.",
            "formula": "",
            "key_idea": "In the Early Vedic period, society was tribal and cattle were the main form of wealth; in the Later Vedic period, the varna system became rigid, agriculture became the main occupation, and trade and craft guilds developed.",
            "textbook_ref": "",
            "question_patterns": [
                "what was the social structure of the Vedic period",
                "what are the four varnas",
                "what was the economy of the Early Vedic period based on",
                "how did the economy change in the Later Vedic period",
                "what was the role of cattle in Vedic society"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "Describe the social structure",
                    "explain": "In the Early Vedic period, society was tribal and relatively equal. In the Later Vedic period, society was divided into four varnas: Brahmins (priests), Kshatriyas (warriors and rulers), Vaishyas (farmers, traders) and Shudras (servants)."
                },
                {
                    "step": 2,
                    "action": "Describe the Early Vedic economy",
                    "explain": "In the Early Vedic period, the economy was based on cattle rearing; cattle were the main form of wealth and were used in trade and as a measure of value. Agriculture was secondary."
                },
                {
                    "step": 3,
                    "action": "Describe the Later Vedic economy",
                    "explain": "In the Later Vedic period, agriculture became the main occupation with the use of iron tools. Trade expanded, craft guilds (shrenis) developed, and coins were used for exchange."
                }
            ],
            "worked_examples": [
                {
                    "question": "What were the four varnas of the Later Vedic society?",
                    "solution": "The four varnas were Brahmins (priests and scholars), Kshatriyas (kings and warriors), Vaishyas (farmers, traders and craftsmen) and Shudras (who served the other three varnas).",
                    "answer": "Brahmins, Kshatriyas, Vaishyas and Shudras."
                },
                {
                    "question": "What was the role of cattle in the Early Vedic economy?",
                    "solution": "In the Early Vedic period, cattle were the main form of wealth. They were used for milk, transport and as a medium of exchange. A person's wealth was measured by the number of cattle they owned.",
                    "answer": "Cattle were the main form of wealth and a medium of exchange."
                },
                {
                    "question": "How did the economy change from the Early to the Later Vedic period?",
                    "solution": "In the Early Vedic period, the economy was mainly pastoral, based on cattle rearing. In the Later Vedic period, agriculture became the main occupation with iron tools, trade expanded, and craft guilds and the use of coins developed.",
                    "answer": "The economy shifted from cattle rearing to agriculture and trade, with iron tools and coins."
                }
            ],
            "exercises": [
                {
                    "question": "Describe the four varnas of the Later Vedic society and their roles.",
                    "type": "verify_property"
                },
                {
                    "question": "Explain how the economy changed from the Early Vedic to the Later Vedic period.",
                    "type": "verify_property"
                }
            ]
        }
    ]
}


def write_catalog(catalog, filename):
    path = os.path.join(OUT_DIR, filename)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(catalog, f, indent=1, ensure_ascii=False)
    # validate
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    print(f"OK: {filename} -- {len(data['concepts'])} concepts, keys={list(data.keys())}")
    for c in data["concepts"]:
        assert c["id"].startswith("c6ss."), f"bad id {c['id']}"
        assert len(c["question_patterns"]) == 5, f"bad patterns {c['id']}"
        assert len(c["solution_steps"]) == 3, f"bad steps {c['id']}"
        assert len(c["worked_examples"]) >= 2, f"bad examples {c['id']}"
        assert len(c["exercises"]) >= 2, f"bad exercises {c['id']}"
    print(f"  validated all concepts in {filename}")


write_catalog(ch5, "catalog_class6_social_ch5.json")
write_catalog(ch6, "catalog_class6_social_ch6.json")
print("DONE")
