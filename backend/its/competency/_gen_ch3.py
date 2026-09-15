import json

catalog = {
    "class": "Class 6",
    "subject": "Social Science",
    "chapter": 3,
    "chapter_title": "Landforms and Life",
    "source_file": "Exploring Society: India and Beyond - Chapter 3",
    "concepts": [
        {
            "id": "c6ss.3.1",
            "title": "Mountains and Their Types",
            "section": "Mountains",
            "definition": "Mountains are large natural elevations of the earth's surface rising abruptly from the surrounding level, classified into fold, block, volcanic, and residual types based on their mode of formation.",
            "formula": "",
            "key_idea": "Mountains form through tectonic forces (folding, faulting) or volcanic activity and are categorized by how they were formed.",
            "textbook_ref": "",
            "question_patterns": [
                "What are the different types of mountains and how are they formed?",
                "Distinguish between fold mountains and block mountains with examples.",
                "Explain how volcanic mountains are formed with an example.",
                "Why are the Himalayas called fold mountains?",
                "Describe the characteristics of residual mountains."
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {"step": 1, "action": "Identify the mountain type from its formation process", "explain": "Fold mountains form by compression of sedimentary rock layers; block mountains form by faulting; volcanic mountains form by lava accumulation; residual mountains are eroded remnants."},
                {"step": 2, "action": "Match the described characteristics to the correct category", "explain": "Compare structural features such as peaks, ridges, valleys, and rock composition with known mountain types."},
                {"step": 3, "action": "Provide a real-world example to confirm classification", "explain": "Examples: Fold - Himalayas, Block - Vindhyas, Volcanic - Mount Fuji, Residual - Aravallis."}
            ],
            "worked_examples": [
                {
                    "question": "The Himalayas were formed by the collision and folding of sedimentary rock layers due to tectonic compression. What type of mountain are they?",
                    "solution": "Step 1: The formation involves compression and folding of rock layers. Step 2: This matches the definition of fold mountains. Step 3: The Himalayas are a classic example of fold mountains.",
                    "answer": "Fold mountains"
                },
                {
                    "question": "Mount Fuji was formed by repeated eruption and accumulation of lava. What type of mountain is it?",
                    "solution": "Step 1: The formation involves volcanic eruption and lava accumulation. Step 2: This matches the definition of volcanic mountains. Step 3: Mount Fuji is a well-known volcanic mountain.",
                    "answer": "Volcanic mountain"
                }
            ],
            "exercises": [
                {"question": "Differentiate between block mountains and fold mountains with one example each.", "type": "long_answer"},
                {"question": "Why are the Aravallis called residual mountains?", "type": "short_answer"}
            ]
        },
        {
            "id": "c6ss.3.2",
            "title": "Plateaus and Their Features",
            "section": "Plateaus",
            "definition": "Plateaus are elevated flat-topped landforms that rise sharply above the surrounding area, also known as tablelands, formed by volcanic activity, erosion, or tectonic uplift.",
            "formula": "",
            "key_idea": "Plateaus are characterized by a flat top, steep sides, and varied formation processes including lava accumulation and erosion.",
            "textbook_ref": "",
            "question_patterns": [
                "What is a plateau and how does it differ from a mountain?",
                "Describe the main features of a plateau.",
                "How are plateaus formed?",
                "Explain the economic importance of plateaus with examples.",
                "Why is the Deccan Plateau called a lava plateau?"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {"step": 1, "action": "Identify the defining feature of the landform", "explain": "A plateau has a flat elevated top with steep sides, distinguishing it from pointed mountains and low-lying plains."},
                {"step": 2, "action": "Determine the formation process", "explain": "Plateaus form through volcanic lava flow (lava plateau), erosion of surrounding land (erosional plateau), or tectonic uplift (intermontane plateau)."},
                {"step": 3, "action": "Relate features to human and economic significance", "explain": "Plateaus are rich in minerals and support mining, agriculture in valleys, and generation of hydropower from waterfalls."}
            ],
            "worked_examples": [
                {
                    "question": "The Deccan Plateau has a flat top and was formed by layers of solidified lava. What type of plateau is it?",
                    "solution": "Step 1: The plateau has a flat top formed by lava. Step 2: Lava accumulation and solidification defines a lava plateau. Step 3: The Deccan Plateau is a classic lava plateau.",
                    "answer": "Lava plateau"
                },
                {
                    "question": "A landform is elevated, flat-topped, and rich in mineral deposits. Is it more likely a plateau or a plain? Justify.",
                    "solution": "Step 1: The flat top and elevation indicate a plateau. Step 2: Mineral richness is a characteristic feature of plateaus, not plains. Step 3: Therefore it is a plateau.",
                    "answer": "Plateau, because of the elevated flat top and mineral richness"
                }
            ],
            "exercises": [
                {"question": "List three economic uses of plateaus.", "type": "short_answer"},
                {"question": "Compare and contrast plateaus and plains in terms of formation and human use.", "type": "long_answer"}
            ]
        },
        {
            "id": "c6ss.3.3",
            "title": "Plains and Their Formation",
            "section": "Plains",
            "definition": "Plains are large flat areas of land with low relief, usually formed by the deposition of sediments brought down by rivers over long periods of time.",
            "formula": "",
            "key_idea": "Plains are formed mainly by alluvial deposition by rivers and are among the most fertile and densely populated landforms.",
            "textbook_ref": "",
            "question_patterns": [
                "How are plains formed by rivers?",
                "Why are plains the most densely populated landforms?",
                "What is alluvium and why is it important for plains?",
                "Describe the formation of the Northern Plains of India.",
                "Why are plains considered the 'food bowls' of a country?"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {"step": 1, "action": "Identify the formation mechanism of the plain", "explain": "Rivers erode soil and rock from mountains and deposit the sediments (alluvium) in lower courses, building up flat fertile plains over time."},
                {"step": 2, "action": "Assess the fertility and suitability for human settlement", "explain": "Alluvial soils are rich in nutrients and support intensive agriculture, attracting dense human population."},
                {"step": 3, "action": "Connect the plain to its regional example", "explain": "Example: The Indo-Gangetic Plain was formed by the Ganga, Indus, and Brahmaputra river systems."}
            ],
            "worked_examples": [
                {
                    "question": "The Indo-Gangetic Plain was formed by sediments deposited by the Ganga and its tributaries. What type of plain is it?",
                    "solution": "Step 1: The plain is formed by river sediment deposition. Step 2: Deposition of alluvium by rivers creates an alluvial plain. Step 3: The Indo-Gangetic Plain is an alluvial plain.",
                    "answer": "Alluvial plain"
                },
                {
                    "question": "Why do plains support the highest population density among landforms?",
                    "solution": "Step 1: Plains have flat terrain and fertile alluvial soil. Step 2: These features support agriculture, transport, and settlement. Step 3: Hence plains are densely populated.",
                    "answer": "Because of fertile soil, flat terrain, and ease of transportation and settlement"
                }
            ],
            "exercises": [
                {"question": "Explain the role of rivers in the formation of plains.", "type": "long_answer"},
                {"question": "Name two major plains of India and the rivers that formed them.", "type": "short_answer"}
            ]
        },
        {
            "id": "c6ss.3.4",
            "title": "Deserts and Their Characteristics",
            "section": "Deserts",
            "definition": "Deserts are arid landforms receiving very low rainfall (usually less than 25 cm per year), characterized by sparse vegetation, extreme temperature variation, and sandy or rocky surfaces.",
            "formula": "",
            "key_idea": "Deserts are defined by low precipitation and are classified into hot deserts (sandy) and cold deserts (snowy), each supporting specialized life forms.",
            "textbook_ref": "",
            "question_patterns": [
                "What are the main characteristics of a desert?",
                "Distinguish between hot deserts and cold deserts.",
                "How do plants and animals adapt to desert conditions?",
                "Why is the Sahara called a hot desert?",
                "Describe the lifestyle of people living in desert regions."
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {"step": 1, "action": "Identify the climatic condition defining the desert", "explain": "Low rainfall (below 25 cm/year) and high evaporation define arid desert conditions."},
                {"step": 2, "action": "Classify as hot or cold desert based on temperature", "explain": "Hot deserts like the Sahara have high temperatures and sandy surfaces; cold deserts like Ladakh have low temperatures and snow."},
                {"step": 3, "action": "Relate characteristics to adaptations of life", "explain": "Desert plants have deep roots and thick stems; animals are nocturnal and conserve water; humans practice nomadic herding and oasis farming."}
            ],
            "worked_examples": [
                {
                    "question": "A region receives less than 20 cm of rainfall annually, has sandy dunes, and daytime temperatures exceeding 45 degree C. What type of desert is it?",
                    "solution": "Step 1: Very low rainfall and sandy surface indicate a desert. Step 2: High temperatures classify it as a hot desert. Step 3: The Sahara is an example of such a hot desert.",
                    "answer": "Hot desert"
                },
                {
                    "question": "Ladakh is a cold, dry region at high altitude with sparse vegetation. Why is it classified as a cold desert?",
                    "solution": "Step 1: Ladakh receives very low precipitation. Step 2: It has extremely low temperatures and snow rather than heat. Step 3: These features define a cold desert.",
                    "answer": "Cold desert, because of low precipitation and freezing temperatures"
                }
            ],
            "exercises": [
                {"question": "Describe two adaptations of desert plants to arid conditions.", "type": "short_answer"},
                {"question": "Compare the climate and lifestyle in hot and cold deserts.", "type": "long_answer"}
            ]
        },
        {
            "id": "c6ss.3.5",
            "title": "Rivers and Valleys",
            "section": "Rivers and Valleys",
            "definition": "Rivers are natural flowing watercourses that shape valleys through erosion and deposition, creating fertile landforms that have sustained early civilizations.",
            "formula": "",
            "key_idea": "Rivers carve V-shaped valleys in mountains and U-shaped valleys in plains, and their floodplains and deltas provide fertile land for agriculture and settlement.",
            "textbook_ref": "",
            "question_patterns": [
                "How do rivers form valleys?",
                "What is the difference between a V-shaped valley and a U-shaped valley?",
                "Why did early civilizations develop along river valleys?",
                "Explain the formation of a river delta.",
                "How do rivers contribute to the fertility of plains?"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {"step": 1, "action": "Identify the erosional or depositional action of the river", "explain": "Rivers erode the land in upper courses forming valleys and deposit sediments in lower courses forming deltas and floodplains."},
                {"step": 2, "action": "Classify the valley shape based on river stage", "explain": "V-shaped valleys form in mountainous upper courses by vertical erosion; U-shaped or wide valleys form in plains by lateral erosion."},
                {"step": 3, "action": "Link the river valley to human settlement and civilization", "explain": "Fertile soil, water supply, and transport in river valleys attracted early settlements, e.g., the Indus Valley Civilization."}
            ],
            "worked_examples": [
                {
                    "question": "A river in a mountainous region cuts steeply downward, forming a narrow deep valley. What type of valley is this?",
                    "solution": "Step 1: The river is in its upper mountainous course. Step 2: Vertical downcutting erosion creates a V-shaped valley. Step 3: This is a V-shaped valley.",
                    "answer": "V-shaped valley"
                },
                {
                    "question": "Why did the Indus Valley Civilization flourish along the Indus River?",
                    "solution": "Step 1: The river provided water, fertile alluvial soil, and transport. Step 2: These resources supported agriculture and trade. Step 3: Hence the civilization flourished there.",
                    "answer": "Because the river provided fertile soil, water, and transport supporting agriculture and settlement"
                }
            ],
            "exercises": [
                {"question": "Explain how a river delta is formed with an example.", "type": "long_answer"},
                {"question": "Differentiate between a floodplain and a delta.", "type": "short_answer"}
            ]
        },
        {
            "id": "c6ss.3.6",
            "title": "Coastal Landforms",
            "section": "Coastal Landforms",
            "definition": "Coastal landforms are features shaped by the action of sea waves, tides, and currents along the shoreline, including beaches, cliffs, caves, arches, stacks, and estuaries.",
            "formula": "",
            "key_idea": "Sea waves erode the coast to form cliffs, caves, and arches, while deposition forms beaches, spits, and bars, constantly reshaping the coastline.",
            "textbook_ref": "",
            "question_patterns": [
                "What are coastal landforms and how are they formed?",
                "Explain the formation of sea cliffs and caves.",
                "How are beaches formed?",
                "What is an estuary and why is it important?",
                "Describe the erosional and depositional coastal landforms."
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {"step": 1, "action": "Identify whether the landform is erosional or depositional", "explain": "Wave erosion creates cliffs, caves, arches, and stacks; wave deposition creates beaches, spits, and bars."},
                {"step": 2, "action": "Describe the process that shaped the landform", "explain": "Erosional features form by wave action striking rock; depositional features form by sediment accumulation by waves and currents."},
                {"step": 3, "action": "Provide a real-world example", "explain": "Example: Beaches of Goa (depositional), sea cliffs of the Konkan coast (erosional)."}
            ],
            "worked_examples": [
                {
                    "question": "A stretch of coastline has a sandy deposit formed by wave action bringing and accumulating sand. What coastal landform is this?",
                    "solution": "Step 1: The landform is formed by deposition of sand by waves. Step 2: Depositional coastal features include beaches. Step 3: This is a beach.",
                    "answer": "Beach"
                },
                {
                    "question": "Sea waves continuously erode a rocky headland, carving out a hollow at its base. What feature is forming?",
                    "solution": "Step 1: Wave erosion is acting on a rocky coast. Step 2: Erosion at the base of a cliff forms a sea cave. Step 3: The feature is a sea cave.",
                    "answer": "Sea cave"
                }
            ],
            "exercises": [
                {"question": "List three erosional and three depositional coastal landforms.", "type": "short_answer"},
                {"question": "Explain with a diagram how a sea arch becomes a sea stack.", "type": "long_answer"}
            ]
        },
        {
            "id": "c6ss.3.7",
            "title": "Glacial Landforms",
            "section": "Glacial Landforms",
            "definition": "Glacial landforms are features shaped by the slow movement and erosional and depositional action of glaciers, including U-shaped valleys, moraines, cirques, and glacial lakes.",
            "formula": "",
            "key_idea": "Glaciers act as slow-moving rivers of ice that carve out distinctive U-shaped valleys and deposit debris as moraines when they retreat.",
            "textbook_ref": "",
            "question_patterns": [
                "What are glaciers and how do they shape landforms?",
                "How is a U-shaped glacial valley different from a V-shaped river valley?",
                "What are moraines and how are they formed?",
                "Explain the formation of a cirque.",
                "Describe the depositional features created by glaciers."
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {"step": 1, "action": "Identify the glacial process (erosion or deposition)", "explain": "Glacial erosion carves U-shaped valleys and cirques; glacial deposition forms moraines, drumlins, and erratics."},
                {"step": 2, "action": "Match the feature to its formation mechanism", "explain": "U-shaped valleys form by valley glacier movement; cirques form by headward erosion at mountain tops; moraines form by debris deposited at glacier edges or ends."},
                {"step": 3, "action": "Provide an example of such a landform", "explain": "Example: Glacial valleys in the Himalayas, moraines in the Gangotri glacier region."}
            ],
            "worked_examples": [
                {
                    "question": "A valley in a mountain region has a broad U-shape with steep sides, carved by a slow-moving mass of ice. What formed it?",
                    "solution": "Step 1: The valley is U-shaped and carved by ice. Step 2: Glaciers carve U-shaped valleys by plucking and abrasion. Step 3: This is a glacial U-shaped valley.",
                    "answer": "Glacier (U-shaped glacial valley)"
                },
                {
                    "question": "A ridge of unsorted rock debris is found at the end of a retreating glacier. What is this feature called?",
                    "solution": "Step 1: The debris is deposited at the glacier's end. Step 2: Such depositional features are called terminal moraines. Step 3: This is a moraine.",
                    "answer": "Terminal moraine"
                }
            ],
            "exercises": [
                {"question": "Differentiate between erosional and depositional glacial landforms with examples.", "type": "long_answer"},
                {"question": "What is a cirque and how is it formed?", "type": "short_answer"}
            ]
        },
        {
            "id": "c6ss.3.8",
            "title": "Impact of Landforms on Human Life",
            "section": "Human-Landform Relationship",
            "definition": "Landforms influence human life by determining settlement patterns, occupation, agriculture, transport, and culture, with mountains offering resources and defense, plains supporting farming and cities, and coasts enabling trade.",
            "formula": "",
            "key_idea": "The physical features of a region shape the lifestyle, economy, and culture of its people, creating distinct patterns of human activity across different landforms.",
            "textbook_ref": "",
            "question_patterns": [
                "How do landforms affect human settlement and occupation?",
                "Why are plains more densely populated than mountains?",
                "How do mountains influence the lifestyle of people living there?",
                "Explain the economic importance of coastal landforms.",
                "How do deserts shape the culture and occupation of their inhabitants?"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {"step": 1, "action": "Identify the landform and its key physical features", "explain": "Each landform (mountain, plateau, plain, desert, coast) has distinct features like slope, fertility, climate, and resources."},
                {"step": 2, "action": "Relate the features to human activities they support or restrict", "explain": "Plains support agriculture and cities; mountains support tourism, forestry, and hydropower; coasts support fishing and trade; deserts restrict settlement."},
                {"step": 3, "action": "Conclude the overall impact on lifestyle and economy", "explain": "The combination of supported and restricted activities determines population density, occupation, and cultural practices of the region."}
            ],
            "worked_examples": [
                {
                    "question": "Why are the Northern Plains of India more densely populated than the Himalayan region?",
                    "solution": "Step 1: Plains have flat fertile land while mountains have steep slopes. Step 2: Plains support large-scale agriculture, transport, and urban growth; mountains restrict these. Step 3: Hence plains are more densely populated.",
                    "answer": "Because plains offer fertile soil, flat terrain, and easy transport, supporting dense settlement and agriculture"
                },
                {
                    "question": "How do coastal landforms support the economy of a region?",
                    "solution": "Step 1: Coasts provide access to the sea and harbors. Step 2: This enables fishing, trade, tourism, and port-based industries. Step 3: Hence coastal regions have strong economies.",
                    "answer": "Coasts support fishing, maritime trade, tourism, and port industries"
                },
                {
                    "question": "What occupations are common among people living in mountainous regions?",
                    "solution": "Step 1: Mountains have forests, steep slopes, and mineral resources. Step 2: These support forestry, animal husbandry, terrace farming, tourism, and mining. Step 3: Hence these are common mountain occupations.",
                    "answer": "Forestry, animal husbandry, terrace farming, tourism, and mining"
                }
            ],
            "exercises": [
                {"question": "Explain how landforms influence the occupation and culture of people with examples.", "type": "long_answer"},
                {"question": "Why is life in deserts different from life in plains? Give two reasons.", "type": "short_answer"}
            ]
        }
    ]
}

with open(r"D:\platform\backend\its\competency\catalog_class6_social_ch3.json", "w", encoding="utf-8") as f:
    json.dump(catalog, f, indent=2, ensure_ascii=False)

print("Chapter 3 file written successfully")
print("Number of concepts:", len(catalog["concepts"]))
