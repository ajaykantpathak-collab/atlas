import json

catalog = {
    "class": "Class 6",
    "subject": "Social Science",
    "chapter": 4,
    "chapter_title": "Timeline and Sources of History",
    "source_file": "Exploring Society: India and Beyond - Chapter 4",
    "concepts": [
        {
            "id": "c6ss.4.1",
            "title": "Sources of History: Literary and Archaeological",
            "section": "Sources of History",
            "definition": "Historical sources are materials from which historians reconstruct the past, broadly classified into literary sources (written texts) and archaeological sources (material remains like artifacts, monuments, and inscriptions).",
            "formula": "",
            "key_idea": "History is reconstructed by combining literary sources (manuscripts, books, chronicles) with archaeological evidence (tools, pottery, ruins, inscriptions) to build a complete picture of the past.",
            "textbook_ref": "",
            "question_patterns": [
                "What are the different sources of history?",
                "Distinguish between literary and archaeological sources with examples.",
                "Why do historians need both literary and archaeological sources?",
                "List five archaeological sources used to study ancient India.",
                "How do literary sources help in understanding the past?"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {"step": 1, "action": "Classify the source as literary or archaeological", "explain": "Literary sources include manuscripts, books, and chronicles; archaeological sources include inscriptions, coins, pottery, tools, and monuments."},
                {"step": 2, "action": "Evaluate the type of information each source provides", "explain": "Literary sources reveal ideas, events, and social customs; archaeological sources reveal material culture, technology, and daily life."},
                {"step": 3, "action": "Explain how the two sources complement each other", "explain": "Combining both sources cross-verifies information and fills gaps, giving a more accurate reconstruction of history."}
            ],
            "worked_examples": [
                {
                    "question": "An historian finds a copper plate inscription and a palm-leaf manuscript describing the same king. Which types of sources are these?",
                    "solution": "Step 1: The copper plate inscription is a material remain, an archaeological source. Step 2: The palm-leaf manuscript is a written text, a literary source. Step 3: Together they are one archaeological and one literary source.",
                    "answer": "The inscription is an archaeological source; the manuscript is a literary source"
                },
                {
                    "question": "Why is it insufficient to rely only on literary sources for studying ancient history?",
                    "solution": "Step 1: Literary sources may be biased, incomplete, or lost over time. Step 2: Archaeological sources provide physical evidence that can verify or challenge texts. Step 3: Hence both sources are needed for accuracy.",
                    "answer": "Because literary sources alone may be biased or incomplete; archaeological evidence is needed to verify and supplement them"
                }
            ],
            "exercises": [
                {"question": "Classify the following as literary or archaeological sources: coins, inscriptions, the Rigveda, pottery, a temple ruin.", "type": "short_answer"},
                {"question": "Explain with examples how literary and archaeological sources together help reconstruct history.", "type": "long_answer"}
            ]
        },
        {
            "id": "c6ss.4.2",
            "title": "Inscriptions and Edicts",
            "section": "Inscriptions and Edicts",
            "definition": "Inscriptions are writings engraved on hard surfaces like stone, metal, or clay; edicts are official orders or proclamations issued by rulers, with Ashoka's rock and pillar edicts being the most famous in Indian history.",
            "formula": "",
            "key_idea": "Inscriptions are durable primary sources that record royal orders, donations, achievements, and religious messages, providing direct evidence of historical events.",
            "textbook_ref": "",
            "question_patterns": [
                "What are inscriptions and why are they important for historians?",
                "Explain the significance of Ashoka's edicts.",
                "How do inscriptions differ from manuscripts as historical sources?",
                "What information do Ashoka's rock edicts provide about his policies?",
                "Why are inscriptions considered more reliable than literary sources?"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {"step": 1, "action": "Identify the inscription and its surface and content", "explain": "Inscriptions are engraved on stone, pillars, copper plates, or cave walls and carry official or commemorative messages."},
                {"step": 2, "action": "Determine the purpose of the inscription or edict", "explain": "Edicts convey royal orders and policies; donative inscriptions record grants of land or gifts; commemorative inscriptions record victories or events."},
                {"step": 3, "action": "Assess the historical value of the inscription", "explain": "Inscriptions are primary, contemporary sources that are difficult to alter, making them highly reliable for dating and understanding events."}
            ],
            "worked_examples": [
                {
                    "question": "Ashoka's pillar at Sarnath bears an inscription spreading the message of dhamma. What type of source is it and what is its significance?",
                    "solution": "Step 1: The writing is engraved on a stone pillar, making it an inscription. Step 2: It is an edict spreading Ashoka's policy of dhamma. Step 3: It is a primary archaeological source of great historical significance.",
                    "answer": "It is an inscription (edict); it is a primary archaeological source revealing Ashoka's policies"
                },
                {
                    "question": "A copper plate records a king's donation of land to a temple. Why is this inscription valuable to historians?",
                    "solution": "Step 1: The copper plate is a donative inscription. Step 2: It records the donor, date, and details of the grant. Step 3: It helps historians date the king's reign and understand land and temple practices.",
                    "answer": "It provides direct evidence of the king's reign, land grants, and temple practices"
                }
            ],
            "exercises": [
                {"question": "Why are inscriptions considered more durable and reliable than manuscripts?", "type": "short_answer"},
                {"question": "Describe the content and importance of Ashoka's rock and pillar edicts.", "type": "long_answer"}
            ]
        },
        {
            "id": "c6ss.4.3",
            "title": "Coins as Historical Sources",
            "section": "Coins",
            "definition": "Coins are metallic money used in trade and governance that serve as valuable historical sources, revealing information about rulers, dates, religion, economy, and trade relations of a period.",
            "formula": "",
            "key_idea": "Coins (numismatic evidence) carry names, titles, portraits, and symbols of rulers, and their metal content and distribution reveal economic conditions and trade networks.",
            "textbook_ref": "",
            "question_patterns": [
                "How do coins serve as sources of history?",
                "What information can historians gather from ancient coins?",
                "Explain the significance of the study of coins (numismatics).",
                "How do coins help in dating historical periods?",
                "What do Indo-Greek coins tell us about cultural interaction?"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {"step": 1, "action": "Examine the coin's inscriptions, symbols, and portraits", "explain": "Coins often bear the ruler's name, title, religious symbols, and date, helping identify the issuing authority."},
                {"step": 2, "action": "Analyze the metal composition and minting technique", "explain": "The metal (gold, silver, copper) and technique (punch-marked, cast, die-struck) reveal the economic prosperity and technological level of the period."},
                {"step": 3, "action": "Study the distribution and foreign coins found", "explain": "Coins found in different regions indicate trade routes and cultural contacts, such as Roman coins found in South India."}
            ],
            "worked_examples": [
                {
                    "question": "A silver coin bears the name of a king, a portrait, and a date. How does this help a historian?",
                    "solution": "Step 1: The name and portrait identify the ruler. Step 2: The date helps establish a chronology. Step 3: The silver content indicates economic prosperity of the period.",
                    "answer": "It identifies the ruler, helps date the period, and indicates economic conditions"
                },
                {
                    "question": "Roman gold coins have been found in archaeological sites in South India. What does this indicate?",
                    "solution": "Step 1: Foreign coins found in a region indicate trade contact. Step 2: Roman coins in South India show active trade between Rome and India. Step 3: This reveals trade relations and economic exchange.",
                    "answer": "It indicates active trade relations between ancient India and the Roman Empire"
                }
            ],
            "exercises": [
                {"question": "List four types of information that coins provide to historians.", "type": "short_answer"},
                {"question": "Explain how the study of coins helps reconstruct the economic history of ancient India.", "type": "long_answer"}
            ]
        },
        {
            "id": "c6ss.4.4",
            "title": "Manuscripts and Literary Sources",
            "section": "Literary Sources",
            "definition": "Manuscripts are hand-written records on materials like palm leaves, birch bark, parchment, and paper, encompassing religious texts, epics, chronicles, and treatises that form key literary sources of history.",
            "formula": "",
            "key_idea": "Literary sources include religious texts (Vedas, Bible, Quran), secular literature (Arthashastra, travelogues), and epics (Ramayana, Mahabharata) that reveal the ideas, society, and events of their times.",
            "textbook_ref": "",
            "question_patterns": [
                "What are manuscripts and on what materials were they written?",
                "How do literary sources help in understanding ancient society?",
                "Distinguish between religious and secular literary sources.",
                "What is the historical importance of the Arthashastra?",
                "How do foreign travelogues like those of Fa Xian help historians?"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {"step": 1, "action": "Identify the type of literary source", "explain": "Literary sources are religious (Vedas, Upanishads), secular (Arthashastra, biographies), or foreign accounts (travelogues of Chinese and Greek travelers)."},
                {"step": 2, "action": "Evaluate the content and perspective of the source", "explain": "Religious texts reveal beliefs and rituals; secular texts reveal administration and economy; travelogues give outsider observations of society."},
                {"step": 3, "action": "Assess reliability and limitations of the source", "explain": "Literary sources may be biased, exaggerated, or copied with errors, so they must be cross-checked with archaeological evidence."}
            ],
            "worked_examples": [
                {
                    "question": "The Arthashastra by Kautilya describes the administration and economy of the Mauryan Empire. What type of source is it?",
                    "solution": "Step 1: The Arthashastra is a written text on governance. Step 2: It is a secular literary source dealing with statecraft. Step 3: It is a secular literary source.",
                    "answer": "Secular literary source"
                },
                {
                    "question": "Fa Xian, a Chinese traveler, wrote about the society and Buddhism he observed in India. How is his account useful?",
                    "solution": "Step 1: Fa Xian's account is a foreign travelogue. Step 2: It provides an outsider's observation of Indian society and religion. Step 3: It is a valuable literary source for understanding Gupta-period India.",
                    "answer": "It is a foreign travelogue providing an outsider's account of Indian society and Buddhism"
                }
            ],
            "exercises": [
                {"question": "Name three materials on which ancient manuscripts were written in India.", "type": "short_answer"},
                {"question": "Explain the difference between religious and secular literary sources with two examples each.", "type": "long_answer"}
            ]
        },
        {
            "id": "c6ss.4.5",
            "title": "Dating Historical Events: BC/BCE and AD/CE",
            "section": "Dating Systems",
            "definition": "Historical events are dated using the BCE/CE (Before Common Era / Common Era) system, where BCE counts years backward from the year 1 and CE counts forward, replacing the older BC (Before Christ) and AD (Anno Domini) notation.",
            "formula": "",
            "key_idea": "The BCE/CE system provides a standardized way to place events on a timeline, where the year 1 BCE is followed immediately by the year 1 CE with no year zero in between.",
            "textbook_ref": "",
            "question_patterns": [
                "What is the difference between BC and BCE, and AD and CE?",
                "How do we calculate the number of years between a BCE date and a CE date?",
                "Why is there no year zero in the BCE/CE system?",
                "Convert a given event from BC notation to BCE notation.",
                "How many years passed between 300 BCE and 200 CE?"
            ],
            "solution_type": "compute",
            "solution_steps": [
                {"step": 1, "action": "Identify whether both dates are in the same era or different eras", "explain": "If both dates are BCE or both are CE, subtract the smaller from the larger. If one is BCE and one is CE, add them together."},
                {"step": 2, "action": "Perform the appropriate arithmetic operation", "explain": "Same era: difference = |larger - smaller|. Different eras: difference = BCE year + CE year (since there is no year zero).", "compute": "years_between = (BCE_year + CE_year) if different eras else abs(year1 - year2)"},
                {"step": 3, "action": "State the result with correct units and verify", "explain": "The result is the number of years between the two events; verify by checking the direction of counting on the timeline."}
            ],
            "worked_examples": [
                {
                    "question": "How many years are there between 500 BCE and 100 CE?",
                    "solution": "Step 1: The dates are in different eras (BCE and CE). Step 2: Add them: 500 + 100 = 600. Step 3: There is no year zero, so the total is 600 years.",
                    "answer": "600 years"
                },
                {
                    "question": "How many years passed between 200 BCE and 50 BCE?",
                    "solution": "Step 1: Both dates are in BCE (same era). Step 2: Subtract: 200 - 50 = 150. Step 3: The difference is 150 years.",
                    "answer": "150 years"
                },
                {
                    "question": "An event occurred in 322 BCE and another in 100 CE. What is the time gap between them?",
                    "solution": "Step 1: The dates are in different eras. Step 2: Add: 322 + 100 = 422. Step 3: The gap is 422 years.",
                    "answer": "422 years"
                }
            ],
            "exercises": [
                {"question": "Calculate the number of years between 753 BCE and 476 CE.", "type": "compute"},
                {"question": "Explain why there is no year zero in the BCE/CE dating system.", "type": "short_answer"}
            ]
        },
        {
            "id": "c6ss.4.6",
            "title": "Timeline of Major Historical Events",
            "section": "Timelines",
            "definition": "A timeline is a chronological arrangement of historical events that helps visualize the sequence and duration of events, placing them in correct order from earliest to latest.",
            "formula": "",
            "key_idea": "Timelines organize events chronologically, allowing historians to understand cause-effect relationships and the relative timing of developments across regions.",
            "textbook_ref": "",
            "question_patterns": [
                "What is a timeline and why is it useful in history?",
                "Arrange given historical events in chronological order.",
                "How does a timeline help understand cause and effect in history?",
                "Construct a timeline of major events of the Mauryan Empire.",
                "Why is chronological ordering important for studying history?"
            ],
            "solution_type": "compute",
            "solution_steps": [
                {"step": 1, "action": "List all events with their dates", "explain": "Collect each event and its corresponding year, noting whether it is BCE or CE."},
                {"step": 2, "action": "Sort events by date from earliest to latest", "explain": "BCE dates are earlier (larger BCE number = earlier); CE dates are later (larger CE number = later). BCE always comes before CE.", "compute": "sorted_events = sorted(events, key=lambda e: (-e['year'] if e['era']=='BCE' else e['year']))"},
                {"step": 3, "action": "Present the events in order on a timeline", "explain": "Draw or list the events sequentially with their dates to visualize the chronological flow of history."}
            ],
            "worked_examples": [
                {
                    "question": "Arrange the following in chronological order: Ashoka's reign (268 BCE), founding of the Gupta Empire (320 CE), Buddha's birth (563 BCE), Alexander's invasion (326 BCE).",
                    "solution": "Step 1: List dates: Buddha 563 BCE, Alexander 326 BCE, Ashoka 268 BCE, Gupta 320 CE. Step 2: Sort: 563 BCE (earliest), then 326 BCE, then 268 BCE, then 320 CE (latest). Step 3: Order: Buddha's birth, Alexander's invasion, Ashoka's reign, founding of Gupta Empire.",
                    "answer": "Buddha's birth (563 BCE), Alexander's invasion (326 BCE), Ashoka's reign (268 BCE), founding of Gupta Empire (320 CE)"
                },
                {
                    "question": "Which came first: the composition of the Rigveda (around 1500 BCE) or the Indus Valley Civilization (around 2500 BCE)?",
                    "solution": "Step 1: Note the dates: Indus Valley 2500 BCE, Rigveda 1500 BCE. Step 2: Larger BCE number means earlier, so 2500 BCE is earlier. Step 3: The Indus Valley Civilization came first.",
                    "answer": "The Indus Valley Civilization (around 2500 BCE) came first"
                }
            ],
            "exercises": [
                {"question": "Arrange in chronological order: Fall of Rome (476 CE), Birth of Buddha (563 BCE), Mauryan Empire founded (322 BCE), Gupta Empire founded (320 CE).", "type": "compute"},
                {"question": "Explain how timelines help us understand the relationship between historical events.", "type": "short_answer"}
            ]
        },
        {
            "id": "c6ss.4.7",
            "title": "Prehistoric and Historic Periods",
            "section": "Periodization of History",
            "definition": "Prehistory is the period before the invention of writing, studied through archaeological evidence alone, while history begins with the availability of written records, allowing both literary and archaeological study.",
            "formula": "",
            "key_idea": "The transition from prehistory to history is marked by the invention of writing, with prehistoric periods divided into the Stone Age (Paleolithic, Mesolithic, Neolithic) and metal ages (Chalcolithic, Bronze, Iron).",
            "textbook_ref": "",
            "question_patterns": [
                "What is the difference between prehistory and history?",
                "Why is the invention of writing considered the dividing line between prehistory and history?",
                "Describe the major periods of prehistory with their characteristics.",
                "What is the Stone Age and how is it divided?",
                "How did the discovery of metals change human life in prehistoric times?"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {"step": 1, "action": "Determine whether written records exist for the period", "explain": "If no written records exist, the period is prehistoric; if written records are available, it is historic."},
                {"step": 2, "action": "Classify the prehistoric period by tool technology", "explain": "Prehistory is divided into Paleolithic (old stone), Mesolithic (middle stone), Neolithic (new stone), Chalcolithic (copper-stone), Bronze Age, and Iron Age."},
                {"step": 3, "action": "Relate the period to major human developments", "explain": "Paleolithic: hunting-gathering; Neolithic: agriculture and settlement; Bronze/Iron Age: urbanization and tools."}
            ],
            "worked_examples": [
                {
                    "question": "A society used stone tools and had no written language. Is this period prehistoric or historic?",
                    "solution": "Step 1: There are no written records. Step 2: Absence of writing means the period is prehistoric. Step 3: The society belongs to the prehistoric period.",
                    "answer": "Prehistoric period"
                },
                {
                    "question": "The Harappan Civilization had seals and inscriptions but their script is undeciphered. How is it classified?",
                    "solution": "Step 1: The Harappans had a writing system (seals with script). Step 2: Though undeciphered, the presence of writing marks the beginning of history. Step 3: It is often considered the threshold between prehistory and history.",
                    "answer": "It is at the threshold of prehistory and history (proto-historic), as it has an undeciphered script"
                }
            ],
            "exercises": [
                {"question": "Differentiate between prehistory and history with two points of contrast.", "type": "short_answer"},
                {"question": "Describe the major stages of prehistory and the key development in each stage.", "type": "long_answer"}
            ]
        },
        {
            "id": "c6ss.4.8",
            "title": "Importance of Historical Sources",
            "section": "Significance of Sources",
            "definition": "Historical sources are essential because they provide the evidence from which the past is reconstructed, enabling historians to verify facts, understand perspectives, and build accurate narratives of human history.",
            "formula": "",
            "key_idea": "Without sources there can be no history; the variety, reliability, and cross-verification of sources determine the accuracy and richness of historical understanding.",
            "textbook_ref": "",
            "question_patterns": [
                "Why are historical sources important?",
                "How do historians verify the accuracy of a source?",
                "What problems do historians face when sources are incomplete?",
                "Explain the difference between primary and secondary sources.",
                "How can biased sources mislead historians?"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {"step": 1, "action": "Classify the source as primary or secondary", "explain": "Primary sources are created during the time of the event (inscriptions, coins, eyewitness accounts); secondary sources interpret primary sources later (textbooks, commentaries)."},
                {"step": 2, "action": "Evaluate the reliability and potential bias of the source", "explain": "Check the author's perspective, purpose, and context; official sources may glorify rulers, foreign accounts may misunderstand local customs."},
                {"step": 3, "action": "Cross-verify with other independent sources", "explain": "Comparing multiple sources of different types reduces bias and errors, leading to a more accurate historical conclusion."}
            ],
            "worked_examples": [
                {
                    "question": "A modern textbook describes Ashoka's Kalinga war based on his own edicts. Is the textbook a primary or secondary source?",
                    "solution": "Step 1: The textbook is written long after the event. Step 2: It interprets primary sources (edicts). Step 3: The textbook is a secondary source.",
                    "answer": "Secondary source"
                },
                {
                    "question": "A court poet's biography glorifies a king's achievements. How should a historian use this source?",
                    "solution": "Step 1: The biography is a primary source but written by a courtier with a bias. Step 2: The historian must account for the bias and not take it at face value. Step 3: The historian should cross-check with other sources like inscriptions.",
                    "answer": "Use it cautiously as a biased primary source and cross-verify with other evidence"
                }
            ],
            "exercises": [
                {"question": "Distinguish between primary and secondary sources with one example each.", "type": "short_answer"},
                {"question": "Explain why historians must cross-verify sources and how bias affects historical interpretation.", "type": "long_answer"}
            ]
        }
    ]
}

with open(r"D:\platform\backend\its\competency\catalog_class6_social_ch4.json", "w", encoding="utf-8") as f:
    json.dump(catalog, f, indent=2, ensure_ascii=False)

print("Chapter 4 file written successfully")
print("Number of concepts:", len(catalog["concepts"]))
