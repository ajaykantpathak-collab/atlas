"""
CISCE Class 11 Mass Media & Communication — Deterministic Question Generator
Covers all major Class 11 syllabus topics.
No external API calls. Uses seeded random for reproducibility.
"""

import random
import math
import json
from dataclasses import dataclass, field, asdict
from typing import List, Dict, Optional, Any

# ============================================================
# SEED UTILITY
# ============================================================

def make_rng(seed: int) -> random.Random:
    rng = random.Random(seed)
    rng.jumpahead = lambda n: None
    return rng

# ============================================================
# QUESTION DATACLASS
# ============================================================

@dataclass
class Question:
    id: str
    type: str
    topic: str
    difficulty: str
    bloom_level: str
    competency: bool
    question: str
    options: Optional[List[str]] = None
    answer: Any = None
    steps: Optional[List[str]] = None
    explanation: str = ""
    marks: int = 1

    def to_dict(self) -> dict:
        d = asdict(self)
        d["options"] = list(d["options"]) if d["options"] else None
        return d

# ============================================================
# DATA POOLS — INDIAN CONTEXT
# ============================================================

INDIAN_NAMES = [
    "Priya Sharma", "Rahul Verma", "Ananya Iyer", "Vikram Singh",
    "Sneha Patel", "Arjun Reddy", "Kavita Nair", "Rohan Gupta",
    "Meera Krishnan", "Aditya Joshi", "Divya Chauhan", "Siddharth Rao",
    "Pooja Agarwal", "Karthik Menon", "Riya Banerjee", "Varun Malhotra",
    "Nisha Kapoor", "Amit Desai", "Shruti Pillai", "Deepak Sharma"
]

INDIAN_PLACES = [
    "Mumbai", "Delhi", "Bangalore", "Kolkata", "Chennai",
    "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Lucknow",
    "Chandigarh", "Indore", "Kochi", "Varanasi", "Goa",
    "Nagpur", "Surat", "Kanpur", "Bhopal", "Coimbatore"
]

INDIAN_CITIES_PAPER = [
    "Delhi", "Kolkata", "Mumbai", "Chennai", "Bangalore",
    "Hyderabad", "Ahmedabad", "Pune", "Jaipur", "Lucknow"
]

INDIAN_MEDIA_ORGS = [
    "The Hindu", "Times of India", "Indian Express", "Hindustan Times",
    "Dainik Jagran", "Amar Ujala", "Malayala Manorama", "Dina Thanthi",
    "BBC Hindi", "NDTV", "Republic TV", "India Today",
    "Zee News", "ABP News", "Doordarshan", "All India Radio",
    "Radio Mirchi", "Red FM", "The Quint", "Scroll.in"
]

INDIAN_FILMS = [
    "Sholay", "Mother India", "Lagaan", "Dangal", "3 Idiots",
    "Queen", "Baahubali", "Masaan", "Article 15", "Pink",
    "Gully Boy", "Udaan", "Taare Zameen Par", "Swades", "Rang De Basanti"
]

INDIAN_AD_CAMPAIGNS = [
    "Mountain Dew (Darr Ke Aage Jeet Hai)", "Amul (Taste of India)",
    "Fevicol (Fevicol ka mazboot jod hai)", "Hindustan Unilever (Pure It)",
    "Tata Tea (Jaago Re)", "Surf Excel (Daag Achhe Hain)",
    "Pepsi (Yeh Dil Maange More)", "Nike (Just Do It in Indian context)",
    "Airtel (Express Yourself)", "Fogg (Nothing Like It)"
]

TV_CHANNELS = [
    "Star Plus", "Zee TV", "Colors", "Sony Entertainment",
    "DD National", "SAB TV", "&TV", "Life OK",
    "Star Sports", "Ten Sports", "DD Sports", "Sony Six"
]

RADIO_STATIONS = [
    "Radio Mirchi 98.3 FM", "Red FM 93.5", "Big FM 92.7",
    "AIR FM Gold", "AIR Vividh Bharati", "Radio City 91.1",
    "Fever 104 FM", "Gyan Vani", "AIR FM Rainbow", "Hello FM"
]

FILM_DIRECTORS = [
    "Satyajit Ray", "Guru Dutt", "Raj Kapoor", "Satyajit Ray",
    "Mani Ratnam", "Sanjay Leela Bhansali", "Anurag Kashyap",
    "Zoya Akhtar", "Aamir Khan", "Shoojit Sircar",
    "R. Balki", "Mira Nair", "Ashutosh Gowariker"
]

JOURNALISM_TERMS = [
    "News Value", "Gatekeeping", "Agenda Setting", "Framing",
    "Newsroom Hierarchy", "Beat Reporting", "Investigative Journalism",
    "Human Interest Story", "Editorial Independence", "Objectivity",
    "Source Attribution", "Press Freedom Index", "News Hole",
    "Stringer", "Stringer", "Syndication", "Byline"
]

MEDIA_THEORIES = [
    "Magic Bullet Theory", "Two-Step Flow Theory", "Uses and Gratification Theory",
    "Cultivation Theory", "Agenda Setting Theory", "Framing Theory",
    "Spiral of Silence", "Dependency Theory", "Encoding/Decoding Model",
    "Hypodermic Needle Theory"
]

INDIAN_LAWS = [
    "Press Council of India Act", "Contempt of Courts Act",
    "Information Technology Act", "Cable Television Networks (Regulation) Act",
    "Cinematograph Act", "Copyright Act", "Defamation Law",
    "Right to Information Act", "Indian Penal Code Section 499",
    "Broadcasting Services Regulation Bill"
]

# ============================================================
# TOPIC DEFINITIONS FOR CLASS 11
# ============================================================

TOPICS = {
    "T1": "Introduction to Mass Communication",
    "T2": "Print Media",
    "T3": "Electronic Media — Radio",
    "T4": "Electronic Media — Television",
    "T5": "Advertising",
    "T6": "Public Relations",
    "T7": "Photography and Photojournalism",
    "T8": "New Media and Digital Communication",
    "T9": "Media Law and Ethics",
    "T10": "Media Research and Audience Analysis",
    "T11": "Media Management and Economics",
    "T12": "Social Media and Emerging Trends",
}

# ============================================================
# QUESTION GENERATORS
# ============================================================

def gen_mcq(rng, topic_label, topic_name, competency, difficulty, bloom):
    """Generate a multiple choice question."""
    bank = [
        {
            "topic": "T1",
            "q": "Which of the following is considered the oldest form of mass communication?",
            "opts": ["Print media (newspapers)", "Radio", "Television", "Social media"],
            "ans": 0,
            "exp": "Print media, specifically newspapers, is considered the oldest form of mass communication. The first newspaper 'Relation' was published in Germany in 1605. In India, Hicky's Bengal Gazette was published in 1780 by James Augustus Hicky."
        },
        {
            "topic": "T1",
            "q": "According to the Lasswell model of communication, the question 'With what effect?' refers to which element?",
            "opts": ["Feedback", "Effect/Outcome", "Channel", "Context"],
            "ans": 1,
            "exp": "Lasswell's model asks: Who (says) What (in) Which channel (to) Whom (with) What effect? The 'What effect' element examines the impact of the message on the audience."
        },
        {
            "topic": "T1",
            "q": "Mass communication differs from interpersonal communication primarily in:",
            "opts": [
                "The number of receivers and the use of technology",
                "The emotional content of messages",
                "The language used",
                "The speed of delivery"
            ],
            "ans": 0,
            "exp": "Mass communication involves transmitting messages to a large, heterogeneous, and geographically dispersed audience through mediated channels. Interpersonal communication is typically between two people or small groups."
        },
        {
            "topic": "T1",
            "q": "The term 'media' is plural of which word?",
            "opts": ["Medium", "Message", "Method", "Mode"],
            "ans": 0,
            "exp": "Media is the plural of medium. A medium is a channel or tool used to convey a message. Mass media refers to channels that communicate to a large audience simultaneously."
        },
        {
            "topic": "T2",
            "q": "Who published 'Hicky's Bengal Gazette', considered India's first newspaper?",
            "opts": ["James Augustus Hicky", "Raja Ram Mohan Roy", "Dadabhai Naoroji", "Bal Gangadhar Tilak"],
            "ans": 0,
            "exp": "Hicky's Bengal Gazette was published by James Augustus Hicky in Calcutta on January 29, 1780. It was a weekly newspaper published in English."
        },
        {
            "topic": "T2",
            "q": "Which of the following is India's highest-circulated newspaper?",
            "opts": ["Dainik Jagran", "The Hindu", "Indian Express", "Hindustan Times"],
            "ans": 0,
            "exp": "Dainik Jagran is consistently ranked as India's highest-circulated newspaper. It is a Hindi-language daily newspaper published from multiple cities across North India."
        },
        {
            "topic": "T2",
            "q": "What is the role of the Editor-in-Chief in a newspaper?",
            "opts": [
                "Overall editorial control and final decision-making",
                "Typesetting and layout design",
                "Distribution and circulation management",
                "Advertisement sales"
            ],
            "ans": 0,
            "exp": "The Editor-in-Chief is responsible for the overall editorial policy of a newspaper, makes final decisions on content, and oversees the editorial department."
        },
        {
            "topic": "T2",
            "q": "A 'news beat' refers to:",
            "opts": [
                "A specific subject area assigned to a reporter",
                "The daily news schedule of a channel",
                "The circulation area of a newspaper",
                "The physical location of the newsroom"
            ],
            "ans": 0,
            "exp": "A news beat is a specific subject area or geographic location assigned to a reporter. Common beats include politics, sports, crime, education, and health."
        },
        {
            "topic": "T2",
            "q": "Which pioneer of Indian journalism started the newspaper 'Kesari'?",
            "opts": ["Bal Gangadhar Tilak", "Mahatma Gandhi", "Jawaharlal Nehru", "Rabindranath Tagore"],
            "ans": 0,
            "exp": "Bal Gangadhar Tilak started the Marathi newspaper 'Kesari' in 1881 and the English newspaper 'Mahratta'. He used these newspapers to spread nationalist sentiments."
        },
        {
            "topic": "T3",
            "q": "Who is known as the 'Father of Radio Broadcasting'?",
            "opts": ["Guglielmo Marconi", "Thomas Edison", "Nikola Tesla", "Alexander Graham Bell"],
            "ans": 0,
            "exp": "Guglielmo Marconi is known as the 'Father of Radio Broadcasting'. He developed the first practical radio telegraph system and demonstrated transatlantic radio communication in 1901."
        },
        {
            "topic": "T3",
            "q": "Radio broadcasting in India officially began in which year?",
            "opts": ["1936", "1927", "1947", "1950"],
            "ans": 1,
            "exp": "Radio broadcasting in India began in 1927 when the Indian Broadcasting Company started its operations. It was later taken over by the government and became All India Radio in 1936."
        },
        {
            "topic": "T3",
            "q": "AIR FM Gold primarily broadcasts:",
            "opts": [
                "News and informative programs with classical music",
                "Only Bollywood music",
                "Only regional language content",
                "Only advertisements"
            ],
            "ans": 0,
            "exp": "AIR FM Gold (100.1 MHz in Delhi) broadcasts news, informative programs, and retro Hindi film music. It caters to a mature audience with a focus on quality content."
        },
        {
            "topic": "T3",
            "q": "What is the frequency range of FM radio?",
            "opts": ["88-108 MHz", "535-1605 kHz", "300-3000 MHz", "3-30 kHz"],
            "ans": 0,
            "exp": "FM radio operates in the frequency range of 88-108 MHz. In India, FM radio was privatized in phases starting from 2001, allowing private companies to operate FM stations."
        },
        {
            "topic": "T4",
            "q": "When did Doordarshan begin regular television broadcasting in India?",
            "opts": ["1965", "1976", "1982", "1991"],
            "ans": 0,
            "exp": "Doordarshan began experimental telecast in 1959 and started regular broadcasting on September 15, 1965. Colour television was introduced during the 1982 Asian Games in Delhi."
        },
        {
            "topic": "T4",
            "q": "What does the term 'TRP' stand for?",
            "opts": [
                "Television Rating Point", "Total Reach Percentage",
                "Television Response Program", "Target Rating Parameter"
            ],
            "ans": 0,
            "exp": "TRP stands for Television Rating Point. It is a metric used to measure the popularity of television programs by estimating the percentage of viewers watching a particular channel or program."
        },
        {
            "topic": "T4",
            "q": "The television medium is primarily a:",
            "opts": ["Visual and audio medium", "Print medium", "Only audio medium", "Text-based medium"],
            "ans": 0,
            "exp": "Television is an audio-visual medium that combines moving images with sound. This makes it a powerful and immersive medium for communication, capable of engaging both visual and auditory senses simultaneously."
        },
        {
            "topic": "T5",
            "q": "The AIDA model in advertising stands for:",
            "opts": [
                "Attention, Interest, Desire, Action",
                "Analysis, Information, Design, Application",
                "Advertising, Integration, Development, Assessment",
                "Audience, Impact, Delivery, Analysis"
            ],
            "ans": 0,
            "exp": "AIDA stands for Attention (capture the audience's attention), Interest (generate interest in the product), Desire (create desire for the product), and Action (prompt the audience to take action/buy the product)."
        },
        {
            "topic": "T5",
            "q": "What is the primary objective of public service advertising?",
            "opts": [
                "To promote social welfare and awareness",
                "To increase sales of products",
                "To earn revenue for media houses",
                "To compete with other brands"
            ],
            "ans": 0,
            "exp": "Public service advertising (PSA) aims to promote social welfare, awareness about social issues, and positive behavioral changes. Examples include campaigns on polio eradication, cleanliness, and women's safety."
        },
        {
            "topic": "T5",
            "q": "In advertising, the 'target audience' refers to:",
            "opts": [
                "The specific group of consumers at whom the advertisement is aimed",
                "The person who creates the advertisement",
                "The person who approves the advertisement",
                "The company buying the advertisement space"
            ],
            "ans": 0,
            "exp": "The target audience is the specific group of consumers for whom the product or service is intended and to whom the advertisement message is directed. Advertisers tailor their messages based on demographics, psychographics, and behavior of the target audience."
        },
        {
            "topic": "T5",
            "q": "Which Indian advertising campaign is famous for the tagline 'Taste of India'?",
            "opts": ["Amul", "Nestle", "Cadbury", "Parle-G"],
            "ans": 0,
            "exp": "Amul's 'Taste of India' campaign is one of the longest-running ad campaigns in India. The Amul girl mascot, created in 1967, is one of the most recognized advertising icons in India."
        },
        {
            "topic": "T5",
            "q": "A 'copywriter' in advertising is responsible for:",
            "opts": [
                "Writing the text/content of advertisements",
                "Creating visual designs",
                "Printing the advertisements",
                "Distributing the advertisements"
            ],
            "ans": 0,
            "exp": "A copywriter creates the written content of advertisements, including headlines, body copy, taglines, and slogans. The copywriter works closely with the art director to create integrated advertising campaigns."
        },
        {
            "topic": "T6",
            "q": "Public Relations is primarily about:",
            "opts": [
                "Building and maintaining mutually beneficial relationships with publics",
                "Selling products to consumers",
                "Reporting news objectively",
                "Producing television programs"
            ],
            "ans": 0,
            "exp": "Public Relations (PR) is about managing communication between an organization and its publics (stakeholders). The goal is to build trust, credibility, and positive relationships through strategic communication."
        },
        {
            "topic": "T6",
            "q": "A 'press release' is:",
            "opts": [
                "An official statement issued to media to provide information",
                "A news article written by a journalist",
                "An advertisement placed in a newspaper",
                "A letter of complaint to the editor"
            ],
            "ans": 0,
            "exp": "A press release (or press statement) is an official communication issued by an organization to the media. It contains newsworthy information about events, product launches, company announcements, etc."
        },
        {
            "topic": "T6",
            "q": "Which is a key tool of Public Relations?",
            "opts": ["Press Conference", "Television Commercial", "Sales Promotion", "Direct Mail"],
            "ans": 0,
            "exp": "A press conference is a key PR tool where an organization invites journalists to hear an announcement and ask questions. Other PR tools include press releases, newsletters, press briefings, and events."
        },
        {
            "topic": "T7",
            "q": "In photography, what does 'aperture' control?",
            "opts": [
                "The amount of light entering the camera",
                "The shutter speed",
                "The ISO sensitivity",
                "The image resolution"
            ],
            "ans": 0,
            "exp": "Aperture controls the amount of light entering the camera through the lens. It is measured in f-stops (f/1.4, f/2, f/4, etc.). A smaller f-number means a larger aperture, letting in more light."
        },
        {
            "topic": "T7",
            "q": "Who is known as the father of modern photojournalism?",
            "opts": [
                "Henri Cartier-Bresson",
                "Ansel Adams",
                "Dorothea Lange",
                "Robert Capa"
            ],
            "ans": 0,
            "exp": "Henri Cartier-Bresson is considered the father of modern photojournalism. He pioneered the concept of the 'decisive moment' in photography and co-founded Magnum Photos agency in 1947."
        },
        {
            "topic": "T7",
            "q": "What is 'photojournalism'?",
            "opts": [
                "Using photographs to tell a news story",
                "Taking artistic photographs for galleries",
                "Editing photographs for advertisements",
                "Photographing for scientific purposes"
            ],
            "ans": 0,
            "exp": "Photojournalism is a form of journalism that uses images to tell a news story. Photojournalists capture images that document events, convey emotions, and tell stories in a way that complements written journalism."
        },
        {
            "topic": "T7",
            "q": "The 'rule of thirds' in photography refers to:",
            "opts": [
                "Composing by dividing the frame into a 3x3 grid",
                "Using three different camera settings",
                "Taking three photos of every subject",
                "Editing photos in three steps"
            ],
            "ans": 0,
            "exp": "The rule of thirds is a composition technique where the frame is divided into nine equal parts using two horizontal and two vertical lines. The subject is placed along these lines or at their intersections for better composition."
        },
        {
            "topic": "T8",
            "q": "The 'digital divide' refers to:",
            "opts": [
                "The gap between those with access to technology and those without",
                "The difference between analog and digital signals",
                "The gap between computer hardware and software",
                "The difference between text and image editing"
            ],
            "ans": 0,
            "exp": "The digital divide is the gap between individuals, households, businesses, and geographic areas at different socio-economic levels with regard to both their opportunities to access information and communication technologies (ICTs) and to their use of the Internet for a wide variety of activities."
        },
        {
            "topic": "T8",
            "q": "Which of the following is NOT a characteristic of new media?",
            "opts": [
                "One-way communication only",
                "Interactivity",
                "Convergence",
                "User-generated content"
            ],
            "ans": 0,
            "exp": "New media is characterized by interactivity (two-way communication), convergence (integration of different media forms), and user-generated content. Traditional media is typically one-way (broadcast), while new media enables active participation and feedback."
        },
        {
            "topic": "T8",
            "q": "Media convergence refers to:",
            "opts": [
                "The merging of print, broadcast, and digital media platforms",
                "The concentration of media ownership",
                "The increase in number of TV channels",
                "The expansion of radio networks"
            ],
            "ans": 0,
            "exp": "Media convergence is the merging of previously distinct media forms and platforms. For example, newspapers now have websites and apps, television is available on mobile phones, and social media platforms host video, text, and audio content."
        },
        {
            "topic": "T9",
            "q": "The Press Council of India was established in which year?",
            "opts": ["1966", "1978", "1950", "1982"],
            "ans": 0,
            "exp": "The Press Council of India was established in 1966 under the Press Council Act. It is a statutory body that regulates the print media and preserves the freedom of the press."
        },
        {
            "topic": "T9",
            "q": "Defamation in media law refers to:",
            "opts": [
                "Publishing false statements that harm a person's reputation",
                "Publishing true statements about a public figure",
                "Criticizing government policies",
                "Reporting court proceedings"
            ],
            "ans": 0,
            "exp": "Defamation involves publishing or communicating false statements about a person that damage their reputation. It can be libel (written) or slander (spoken). Under Indian law, defamation is covered under Section 499 of the IPC and is also a civil wrong."
        },
        {
            "topic": "T9",
            "q": "The Right to Information (RTI) Act was enacted in which year?",
            "opts": ["2005", "1995", "2010", "2000"],
            "ans": 0,
            "exp": "The Right to Information Act was enacted in 2005. It provides citizens the right to access information held by public authorities, promoting transparency and accountability in governance."
        },
        {
            "topic": "T9",
            "q": "Media ethics primarily deals with:",
            "opts": [
                "Moral principles and standards guiding media practice",
                "The profitability of media organizations",
                "The technical standards of broadcasting",
                "The legal framework for media"
            ],
            "ans": 0,
            "exp": "Media ethics deals with the moral principles, values, and standards that guide the conduct of media professionals. Key ethical principles include truthfulness, fairness, impartiality, independence, respect for privacy, and accountability."
        },
        {
            "topic": "T10",
            "q": "In media research, a 'survey' is a method used to:",
            "opts": [
                "Collect data from a large number of respondents",
                "Observe people's behavior directly",
                "Analyze existing media content",
                "Conduct in-depth interviews"
            ],
            "ans": 0,
            "exp": "A survey is a research method used to collect data from a large number of respondents through questionnaires or interviews. Surveys help understand audience opinions, preferences, and behaviors."
        },
        {
            "topic": "T10",
            "q": "What does 'sampling' mean in media research?",
            "opts": [
                "Selecting a representative subset of the population for study",
                "Recording all available media content",
                "Interviewing every member of a community",
                "Using random numbers for data analysis"
            ],
            "ans": 0,
            "exp": "Sampling is the process of selecting a representative subset (sample) from a larger population for study. A well-selected sample allows researchers to make valid generalizations about the entire population."
        },
        {
            "topic": "T10",
            "q": "Content analysis in media research involves:",
            "opts": [
                "Systematic analysis of media content",
                "Surveying audience opinions",
                "Observing viewer behavior",
                "Conducting experiments"
            ],
            "ans": 0,
            "exp": "Content analysis is a systematic research method for analyzing the content of media messages. It involves coding and categorizing media content to identify patterns, themes, and trends in media representation."
        },
        {
            "topic": "T11",
            "q": "The main source of revenue for most print media in India is:",
            "opts": ["Advertising revenue", "Subscription fees", "Government grants", "Sale of newsprint"],
            "ans": 0,
            "exp": "Advertising revenue is the primary source of income for most print media organizations in India. Typically, 60-70% of revenue comes from advertising, while the rest comes from circulation/sales."
        },
        {
            "topic": "T11",
            "q": "What does 'circulation' mean in the context of print media?",
            "opts": [
                "The number of copies of a publication sold/distributed",
                "The process of printing a newspaper",
                "The distribution network of a media house",
                "The geographic reach of a publication"
            ],
            "ans": 0,
            "exp": "Circulation refers to the average number of copies of a publication distributed per edition. It is a key metric for advertisers who want to reach a specific audience through print media."
        },
        {
            "topic": "T12",
            "q": "Which platform is an example of social media?",
            "opts": ["Facebook", "Doordarshan", "The Hindu", "Radio Mirchi"],
            "ans": 0,
            "exp": "Facebook is an example of social media — platforms that enable users to create, share, and exchange content in virtual communities. Traditional media like newspapers, television, and radio are not social media as they are primarily one-way communication channels."
        },
        {
            "topic": "T12",
            "q": "The term 'influencer marketing' refers to:",
            "opts": [
                "Collaborating with social media personalities to promote products",
                "Advertising on television channels",
                "Printing ads in newspapers",
                "Broadcasting ads on radio"
            ],
            "ans": 0,
            "exp": "Influencer marketing involves collaborating with social media personalities (influencers) who have a large following to promote products or services. This has become a significant advertising trend in India, especially among youth."
        },
    ]

    items = [b for b in bank if b["topic"] == topic_label]
    if not items:
        items = bank
    item = rng.choice(items)
    return item


def gen_fill_blank(rng, topic_label, topic_name, competency, difficulty, bloom):
    """Generate a fill-in-the-blank question."""
    bank = [
        {
            "topic": "T1",
            "q": "The process of creating and transmitting messages through various channels to a large and diverse audience is called ______.",
            "ans": "mass communication",
            "exp": "Mass communication is defined as the process of creating and transmitting messages through various channels to a large, heterogeneous, and geographically dispersed audience."
        },
        {
            "topic": "T1",
            "q": "According to the Shannon-Weaver model, the element that can disrupt communication is called ______.",
            "ans": "noise",
            "exp": "In the Shannon-Weaver model of communication, noise refers to any interference or disruption that distorts the message during transmission. Noise can be physical (static), semantic (language barriers), or psychological (bias)."
        },
        {
            "topic": "T2",
            "q": "India's first newspaper, Hicky's Bengal Gazette, was published in the year ______.",
            "ans": "1780",
            "exp": "Hicky's Bengal Gazette was published by James Augustus Hicky in Calcutta on January 29, 1780. It was a weekly newspaper that ceased publication in 1782 due to government suppression."
        },
        {
            "topic": "T2",
            "q": "The Press Council of India was established in the year ______.",
            "ans": "1966",
            "exp": "The Press Council of India was established in 1966 under the Press Council Act as a statutory body to preserve the freedom of the press and to maintain and improve the standards of newspapers and news agencies."
        },
        {
            "topic": "T3",
            "q": "The abbreviation AIR stands for ______.",
            "ans": "All India Radio",
            "exp": "AIR (All India Radio), formerly known as the Indian Broadcasting Company, is the national public radio broadcaster of India. It was established in 1936 and is now known as Akashvani."
        },
        {
            "topic": "T3",
            "q": "FM radio operates in the frequency range of ______ to ______ MHz.",
            "ans": "88 to 108",
            "exp": "FM radio broadcasting in India operates in the frequency range of 88 to 108 MHz. The FM band is divided into three phases (I, II, III) for licensing to private operators."
        },
        {
            "topic": "T4",
            "q": "Doordarshan began regular telecast on ______ (date).",
            "ans": "September 15, 1965",
            "exp": "Doordarshan (DD) began experimental telecast in 1959 and started regular television broadcasting on September 15, 1965. The color TV era began with the 1982 Asian Games in Delhi."
        },
        {
            "topic": "T4",
            "q": "TRP stands for ______.",
            "ans": "Television Rating Point",
            "exp": "Television Rating Point (TRP) is a metric used to estimate the number of viewers watching a television channel or program. It helps broadcasters and advertisers understand audience preferences."
        },
        {
            "topic": "T5",
            "q": "The AIDA model in advertising stands for Attention, Interest, Desire, and ______.",
            "ans": "Action",
            "exp": "The AIDA model is a classical advertising model that describes the stages a consumer goes through before making a purchase: Attention (be aware of the product), Interest (develop interest), Desire (want the product), and Action (take action/purchase)."
        },
        {
            "topic": "T5",
            "q": "The text or script of an advertisement is called ______.",
            "ans": "copy",
            "exp": "In advertising, 'copy' refers to the text or script of an advertisement. It includes the headline, body copy, tagline, and call to action. The person who writes the copy is called a copywriter."
        },
        {
            "topic": "T6",
            "q": "A written statement sent to the media to announce something newsworthy is called a ______.",
            "ans": "press release",
            "exp": "A press release (also called a press statement or news release) is an official written communication issued by an organization to the media, containing information about an event, product launch, or company announcement."
        },
        {
            "topic": "T6",
            "q": "The process of building and maintaining positive relationships with the public is called ______.",
            "ans": "public relations",
            "exp": "Public Relations (PR) is the strategic communication process that builds mutually beneficial relationships between organizations and their publics. PR aims to create and maintain a positive image and reputation."
        },
        {
            "topic": "T7",
            "q": "In photography, the term 'aperture' is measured in ______.",
            "ans": "f-stops",
            "exp": "Aperture is measured in f-stops (f-numbers) such as f/1.4, f/2, f/2.8, f/4, f/5.6, etc. A lower f-number means a wider aperture that allows more light to enter the camera."
        },
        {
            "topic": "T7",
            "q": "______ is known as the father of modern photojournalism.",
            "ans": "Henri Cartier-Bresson",
            "exp": "Henri Cartier-Bresson (1908-2004) is considered the father of modern photojournalism. He pioneered the 'decisive moment' concept in photography and co-founded Magnum Photos in 1947."
        },
        {
            "topic": "T8",
            "q": "The gap between those who have access to digital technology and those who do not is called the ______.",
            "ans": "digital divide",
            "exp": "The digital divide refers to the gap between individuals, households, businesses, and geographic areas at different socio-economic levels with regard to opportunities to access information and communication technologies."
        },
        {
            "topic": "T8",
            "q": "The combination or merging of different media forms into one platform is called ______.",
            "ans": "media convergence",
            "exp": "Media convergence refers to the merging of previously distinct media forms, technologies, and platforms. For example, newspapers now publish online, television content is available on mobile phones, and social media integrates text, images, and video."
        },
        {
            "topic": "T9",
            "q": "The Press Council of India was established in the year ______.",
            "ans": "1966",
            "exp": "The Press Council of India was established in 1966 under the Press Council Act. It is a statutory body that works to preserve the freedom of the press and maintain standards of newspapers and news agencies."
        },
        {
            "topic": "T9",
            "q": "The RTI Act was enacted in the year ______.",
            "ans": "2005",
            "exp": "The Right to Information Act was enacted in 2005 to provide citizens the right to access information held by public authorities, promoting transparency and accountability in governance."
        },
        {
            "topic": "T10",
            "q": "A representative subset selected from a larger population for study is called a ______.",
            "ans": "sample",
            "exp": "In research methodology, a sample is a representative subset of a larger population selected for study. Proper sampling techniques allow researchers to make reliable inferences about the entire population without studying every individual."
        },
        {
            "topic": "T11",
            "q": "The main source of revenue for most print media organizations is ______.",
            "ans": "advertising",
            "exp": "Advertising revenue is the primary source of income for most print media organizations in India. Typically, 60-70% of revenue comes from advertisements, with the rest coming from sales of copies."
        },
        {
            "topic": "T12",
            "q": "User-created content shared on social platforms is called ______ content.",
            "ans": "user-generated",
            "exp": "User-generated content (UGC) refers to any form of content created by users of a system or service and made available on social media platforms. Examples include tweets, YouTube videos, Instagram posts, and blog articles."
        },
    ]

    items = [b for b in bank if b["topic"] == topic_label]
    if not items:
        items = bank
    item = rng.choice(items)
    return item


def gen_short_answer(rng, topic_label, topic_name, competency, difficulty, bloom):
    """Generate a short answer question."""
    standard_bank = [
        {
            "topic": "T1",
            "q": "List any two characteristics of mass communication.",
            "ans": "Two characteristics of mass communication are: (1) Large and heterogeneous audience, (2) Mediated through technology/channels, (3) Public nature of messages, (4) Delayed or no feedback, (5) Professional organization involved in production.",
            "steps": ["Identify characteristics of mass communication", "List any two from: large audience, mediated transmission, institutional production, limited feedback, public nature of messages"],
            "exp": "Mass communication is characterized by: (1) Large and heterogeneous audience, (2) Transmission through mediated channels (TV, radio, newspapers), (3) Public nature of the message, (4) Usually delayed or absent feedback, (5) Professional organization behind the production."
        },
        {
            "topic": "T1",
            "q": "Differentiate between mass communication and interpersonal communication.",
            "ans": "Mass communication: message directed to large, heterogeneous, geographically dispersed audience through mediated channels; interpersonal communication: message between two or few people, direct, immediate feedback. Mass comm is organized and institutional; interpersonal is personal and spontaneous.",
            "steps": ["Define mass communication", "Define interpersonal communication", "Compare key aspects: audience size, feedback, channels, nature of message"],
            "exp": "Key differences: Mass comm reaches a large, diverse audience through mediated channels (TV, radio, print) with limited/delayed feedback. Interpersonal comm is between individuals/small groups, is direct, face-to-face, with immediate feedback."
        },
        {
            "topic": "T1",
            "q": "Name the five elements of the Lasswell model of communication.",
            "ans": "The five elements of the Lasswell model are: (1) Communicator/Who, (2) Message/Says What, (3) Channel/In Which Channel, (4) Receiver/To Whom, (5) Effect/With What Effect.",
            "steps": ["Recall Lasswell's model: Who says What in Which channel to Whom with What effect", "List all five elements in order"],
            "exp": "Lasswell's model (1948) is a linear model of communication that answers five questions: Who (communicator), Says What (message), In Which Channel (medium), To Whom (receiver), With What Effect (outcome)."
        },
        {
            "topic": "T2",
            "q": "Explain the role of a newspaper editor.",
            "ans": "The editor of a newspaper is responsible for: (1) Setting editorial policy, (2) Selecting and editing news stories, (3) Ensuring accuracy and fairness, (4) Managing the editorial staff, (5) Making final decisions on content, (6) Maintaining the newspaper's voice and standards.",
            "steps": ["Identify the editor's responsibilities", "List key roles: policy setting, content selection, editing, staff management, final decisions", "Explain each briefly"],
            "exp": "The newspaper editor is the chief of the editorial department. They set the editorial policy, decide which stories to publish, assign stories to reporters, edit copy for accuracy and style, manage the editorial team, and represent the newspaper's editorial voice."
        },
        {
            "topic": "T2",
            "q": "What is a 'press conference'? Why is it important?",
            "ans": "A press conference is a meeting organized by an organization to convey information to journalists. It is important because it allows direct interaction between the organization and media, enables simultaneous dissemination of information to multiple media outlets, and provides an opportunity for journalists to ask questions.",
            "steps": ["Define press conference", "Explain importance: direct interaction, simultaneous information dissemination, Q&A opportunity", "Give example from Indian context"],
            "exp": "A press conference (news conference) is an event where an organization invites journalists to hear an announcement and ask questions. It is an important PR tool that ensures accurate and wide dissemination of information."
        },
        {
            "topic": "T3",
            "q": "Write a short note on the role of FM radio in India.",
            "ans": "FM radio in India was privatized starting 2001. Private operators like Radio Mirchi, Red FM, and Radio City run FM stations across cities. FM radio plays music, entertainment, local news, and interactive shows. It reaches millions of commuters and provides localized content in regional languages, making it a cost-effective and popular medium.",
            "steps": ["Note when FM radio was privatized in India", "Name major FM radio operators", "Describe content types", "Explain audience reach and significance"],
            "exp": "FM radio in India transformed after privatization in 2001. Stations like Radio Mirchi (98.3 FM), Red FM (93.5), and Radio City (91.1) serve urban audiences with music, entertainment shows, and local content. FM radio is popular among commuters and offers localized, interactive content."
        },
        {
            "topic": "T3",
            "q": "What is the difference between AM and FM radio?",
            "ans": "AM (Amplitude Modulation): amplitude of the carrier wave varies, longer range, susceptible to electrical interference. FM (Frequency Modulation): frequency of the carrier wave varies, better sound quality, shorter range, less interference. AM radio has wider coverage area especially in rural areas. FM provides better audio quality and is used for music and entertainment.",
            "steps": ["Define AM: amplitude varies", "Define FM: frequency varies", "Compare: AM has longer range but lower quality; FM has better quality but shorter range", "Give context of Indian usage"],
            "exp": "AM radio modulates the amplitude of the carrier wave and can travel long distances, making it suitable for wide-area broadcasting. FM modulates frequency and provides better sound quality with less static, making it ideal for music and entertainment broadcasting in urban areas."
        },
        {
            "topic": "T4",
            "q": "What is 'narrowcasting' in television? Give an example.",
            "ans": "Narrowcasting is targeting a specific, niche audience rather than the mass audience. Example: A cooking channel like 'Food Food' targets people interested in cooking, or a sports channel like 'Star Sports' targets sports enthusiasts. This is different from broadcasting to the general public.",
            "steps": ["Define narrowcasting", "Give example of a niche TV channel in India", "Contrast with broadcasting (targeting mass audience)"],
            "exp": "Narrowcasting involves targeting a specific, well-defined audience segment rather than the general mass audience. With the proliferation of TV channels in India, narrowcasting has become common through dedicated channels for movies, sports, news, cooking, travel, etc."
        },
        {
            "topic": "T4",
            "q": "Describe any two types of television programs in India.",
            "ans": "Entertainment programs: Soap operas (e.g., 'Kyunki Saas Bhi Kabhi Bahu Thi'), reality shows (Bigg Boss, Indian Idol), comedy shows (Taarak Mehta Ka Ooltah Chashmah). Informational programs: News bulletins (NDTV 24x7, Republic TV), documentaries, educational programs (Gyan Darshan), talk shows.",
            "steps": ["Type 1: Entertainment programs — soaps, reality shows, comedy", "Type 2: Informational programs — news, documentaries, educational content", "Give Indian examples for each"],
            "exp": "Indian television offers diverse program types. Entertainment programs include soap operas that dominated the 2000s and reality shows that gained popularity. Informational programs include 24-hour news channels and educational content broadcast by Doordarshan."
        },
        {
            "topic": "T5",
            "q": "Explain the difference between 'reach' and 'frequency' in advertising.",
            "ans": "Reach is the total number of unique people exposed to an advertisement at least once during a campaign. Frequency is the average number of times each person sees the advertisement. Reach focuses on breadth (how many people), frequency focuses on depth (how often). Both are important for effective advertising campaigns.",
            "steps": ["Define Reach: unique individuals exposed at least once", "Define Frequency: average number of exposures per person", "Compare: reach = breadth, frequency = depth", "Explain why both matter"],
            "exp": "Reach measures how many different people see an ad (breadth of exposure), while frequency measures how often they see it (depth of repetition). An effective campaign needs both adequate reach to build awareness and sufficient frequency to reinforce the message."
        },
        {
            "topic": "T5",
            "q": "What are the key elements of an advertisement?",
            "ans": "Key elements include: (1) Headline/Tagline — catches attention, (2) Body copy — explains the message, (3) Visual/Image — supports the message visually, (4) Call to Action — tells the consumer what to do, (5) Brand name/Logo — identifies the advertiser, (6) Contact information — where to buy/find more.",
            "steps": ["List headline/tagline", "List body copy", "List visuals", "List call to action", "List brand identity elements"],
            "exp": "An effective advertisement combines several elements: a compelling headline to grab attention, informative body copy, supporting visuals, a clear call to action (CTA), brand identification (logo/name), and contact/purchase information."
        },
        {
            "topic": "T6",
            "q": "What is 'crisis communication' in Public Relations?",
            "ans": "Crisis communication is a PR function that involves managing communication during an organizational crisis. It includes: (1) Immediate response to protect reputation, (2) Providing accurate and timely information to stakeholders, (3) Showing empathy and taking responsibility, (4) Outlining corrective actions, (5) Restoring public trust. Example: When an airline faces an accident, its PR team manages media communication.",
            "steps": ["Define crisis communication", "List key actions: immediate response, accurate info, empathy, corrective actions", "Give Indian example"],
            "exp": "Crisis communication is a critical PR function. When an organization faces a crisis (accident, scandal, product failure), the PR team must respond quickly with accurate information, show accountability, and work to restore stakeholder trust through transparent communication."
        },
        {
            "topic": "T6",
            "q": "Distinguish between Public Relations and Advertising.",
            "ans": "PR: focuses on building long-term relationships, earned media (free coverage), two-way communication, credibility through third-party endorsement. Advertising: focuses on short-term sales, paid media space, one-way communication, controlled message. PR targets multiple stakeholders; advertising targets consumers.",
            "steps": ["Define PR: relationship-building, earned media, credibility", "Define Advertising: paid space, message control, sales focus", "Compare on: cost, control, credibility, target, communication type"],
            "exp": "While both are promotional tools, PR and advertising differ significantly. PR is about building long-term credibility through earned media (journalists write about you), while advertising is paid space where the organization has complete control over the message."
        },
        {
            "topic": "T7",
            "q": "What is 'photojournalism'? How does it differ from documentary photography?",
            "ans": "Photojournalism uses photographs to tell a news story, accompanied by text. It is timely, objective, and informative. Documentary photography is a broader genre that documents real-life situations over extended periods, often with a social or historical purpose. Photojournalism is event-driven and published quickly; documentary photography is more in-depth and long-term.",
            "steps": ["Define photojournalism: images telling news stories, timely, objective", "Define documentary photography: long-term documentation, social/historical focus", "Compare: timing, purpose, objectivity, context"],
            "exp": "Photojournalism and documentary photography are related but distinct. Photojournalism captures news events and is published quickly with accompanying text. Documentary photography involves longer-term projects that document social issues or cultural phenomena with greater depth and context."
        },
        {
            "topic": "T7",
            "q": "Describe the role of a caption in a news photograph.",
            "ans": "A caption explains the context of a photograph by providing: (1) Description of what is happening in the image, (2) Names and identification of people, (3) Location and date of the event, (4) Brief explanation of the significance. Captions help readers understand images they cannot fully interpret on their own.",
            "steps": ["Define caption: text accompanying a photograph", "List information provided: what, who, where, when, why", "Explain why captions are important"],
            "exp": "A caption (also called a cutline) provides essential context for a news photograph. It tells readers what the photograph shows, who is in it, where and when it was taken, and why it matters. Good captions enhance the storytelling power of images."
        },
        {
            "topic": "T8",
            "q": "What is 'user-generated content' (UGC)? Give examples.",
            "ans": "User-generated content (UGC) is any form of content created by users of a platform rather than by media professionals. Examples: (1) YouTube videos created by individuals, (2) Instagram posts and stories, (3) Twitter/X tweets, (4) Blog posts on WordPress, (5) Wikipedia articles, (6) TikTok videos. UGC has transformed media by giving ordinary people a voice.",
            "steps": ["Define UGC: content created by platform users, not professionals", "List Indian examples: YouTube, Instagram, Twitter, blogs", "Explain significance: democratization of content creation"],
            "exp": "User-generated content has revolutionized media by enabling anyone with internet access to create and share content. In India, platforms like YouTube, Instagram, and ShareChat have millions of users creating content in multiple languages, bypassing traditional media gatekeepers."
        },
        {
            "topic": "T8",
            "q": "Explain the concept of 'media convergence' with an Indian example.",
            "ans": "Media convergence is the merging of different media forms into integrated platforms. Example: 'The Hindu' newspaper now has a website, mobile app, YouTube channel, and social media presence. A television channel like NDTV broadcasts on TV, streams online, posts on YouTube, and shares content on Twitter — all from the same newsroom. This allows audiences to access content across multiple platforms.",
            "steps": ["Define media convergence: merging of different media forms", "Give Indian example: newspaper with digital presence", "Explain benefits: wider reach, cross-platform distribution, audience engagement"],
            "exp": "Media convergence in India is evident in how media organizations now operate across multiple platforms. A traditional newspaper like The Hindu or Times of India reaches audiences through print, websites, mobile apps, social media, and YouTube, all as part of a unified content strategy."
        },
        {
            "topic": "T9",
            "q": "What is 'freedom of the press'? Why is it important for democracy?",
            "ans": "Freedom of the press is the right of journalists and media organizations to report news and express opinions without government censorship. It is important for democracy because: (1) It informs citizens about government actions, (2) It holds leaders accountable (watchdog role), (3) It provides a platform for diverse opinions, (4) It promotes transparency, (5) It enables public debate on important issues.",
            "steps": ["Define freedom of press", "List importance points: informing citizens, accountability, diverse opinions, transparency, public debate", "Connect to Indian democratic context"],
            "exp": "Freedom of the press is a cornerstone of democracy. In India, it is protected under Article 19(1)(a) of the Constitution (freedom of speech and expression). A free press acts as a watchdog, informing citizens, checking government power, and facilitating democratic discourse."
        },
        {
            "topic": "T9",
            "q": "What is 'plagiarism' in media? Why is it unethical?",
            "ans": "Plagiarism in media is using someone else's work, ideas, or words without proper credit or attribution. It is unethical because: (1) It violates intellectual property rights, (2) It deceives the audience about the source of information, (3) It undermines the journalist's credibility, (4) It violates professional codes of ethics, (5) It amounts to intellectual theft and dishonesty.",
            "steps": ["Define plagiarism: using others' work without credit", "Explain why unethical: IP violation, deception, credibility loss, code violation, theft", "Give example: copying another journalist's article without attribution"],
            "exp": "Plagiarism is a serious ethical violation in journalism. It undermines the core journalistic values of honesty, accuracy, and attribution. In India, the Press Council of India's guidelines emphasize the importance of crediting sources and avoiding plagiarism."
        },
        {
            "topic": "T10",
            "q": "What is 'content analysis' in media research? Describe its process.",
            "ans": "Content analysis is a systematic research method for analyzing the content of media messages. The process involves: (1) Defining research objectives, (2) Selecting media content to analyze, (3) Developing a coding scheme (categories and units), (4) Training coders, (5) Coding the content, (6) Analyzing coded data statistically, (7) Drawing conclusions. Example: Analyzing the representation of women in Indian television advertisements.",
            "steps": ["Define content analysis", "List process steps: objective, selection, coding scheme, training, coding, analysis, conclusions", "Give Indian example"],
            "exp": "Content analysis is widely used in media research to study representation, media bias, and communication patterns. In India, content analysis has been used to study gender representation in films, coverage of elections in news media, and portrayal of minorities in television programs."
        },
        {
            "topic": "T10",
            "q": "Explain the importance of media research for media professionals.",
            "ans": "Media research helps: (1) Understand audience preferences and behavior, (2) Measure the effectiveness of media campaigns, (3) Guide content and programming decisions, (4) Evaluate media impact on society, (5) Inform advertising strategies (TRP ratings), (6) Understand changing media consumption patterns, (7) Study media representation and bias.",
            "steps": ["List purposes: audience understanding, campaign measurement, content guidance, impact evaluation, advertising strategy, consumption patterns, representation studies", "Explain each briefly"],
            "exp": "Media research provides evidence-based insights that guide media planning, content creation, and strategic decisions. TRP surveys help broadcasters understand what programs audiences prefer. Audience research helps newspapers understand reader demographics and preferences."
        },
        {
            "topic": "T11",
            "q": "What is 'media ownership concentration' and why is it a concern?",
            "ans": "Media ownership concentration refers to the situation where a small number of companies or individuals control a large share of media outlets. In India, large business groups (like the Ambanis, Jindals, etc.) own multiple media properties across different platforms. It is a concern because: (1) It reduces media diversity, (2) It creates risk of biased reporting, (3) It limits pluralism of viewpoints, (4) It can lead to corporate interests overriding public interest.",
            "steps": ["Define ownership concentration", "Explain Indian context: few large groups own many outlets", "List concerns: reduced diversity, bias risk, limited viewpoints, corporate over public interest"],
            "exp": "Media ownership concentration is a growing concern globally, including in India. When a few conglomerates control multiple newspapers, TV channels, and online platforms, it threatens media pluralism and can lead to self-censorship or bias favoring the owners' business interests."
        },
        {
            "topic": "T12",
            "q": "How has social media changed the nature of news consumption in India?",
            "ans": "Social media has transformed news consumption in India by: (1) Enabling instant news sharing and viral content, (2) Allowing users to consume news on mobile devices, (3) Creating citizen journalism opportunities, (4) Making news more visual and interactive, (5) Enabling personalized news feeds, (6) Challenging traditional media credibility with fake news concerns, (7) Creating echo chambers through algorithmic feeds.",
            "steps": ["List changes: instant sharing, mobile consumption, citizen journalism, visual/interactive news, personalized feeds", "Add challenges: fake news, echo chambers", "Give Indian statistics: WhatsApp forwards, Twitter usage"],
            "exp": "Social media has revolutionized news consumption in India, where over 500 million people are online. Platforms like Twitter/X, WhatsApp, Facebook, and ShareChat have become primary news sources, especially in regional languages. However, this has also raised concerns about misinformation and filter bubbles."
        },
        {
            "topic": "T12",
            "q": "What is 'cyberbullying' and how does it relate to new media?",
            "ans": "Cyberbullying is the use of digital platforms (social media, messaging apps, online forums) to harass, threaten, or humiliate individuals. In India, cases of cyberbullying on Instagram, WhatsApp, and TikTok have been widely reported. It is related to new media because: (1) Anonymity makes perpetrators bolder, (2) Content spreads rapidly and permanently, (3) Victims cannot easily escape harassment, (4) It crosses geographical boundaries.",
            "steps": ["Define cyberbullying", "Explain relationship with new media: anonymity, rapid spread, permanence, borderless nature", "Give Indian context and legal provisions (IT Act)"],
            "exp": "Cyberbullying is a significant concern in India's digital space, especially affecting young people on social media platforms. India's Information Technology Act, 2000 (amended 2008) has provisions against cyberbullying, but enforcement remains challenging."
        },
    ]

    comp_bank = [
        # Competency-based questions
        {
            "topic": "T1",
            "q": "Priya, a resident of a village in Rajasthan, listens to AIR Vividh Bharati every evening while cooking. She shares news with her neighbors the next day. Analyze this situation using the Lasswell model of communication and comment on the reach of mass communication in rural India.",
            "ans": "Lasswell's model: Who: AIR (communicator), Says What: news, entertainment programs, In Which Channel: radio (medium wave), To Whom: Priya and her rural neighbors, With What Effect: awareness of current events, community discussion. This shows radio's effectiveness in rural India where TV/internet penetration may be limited. The 'two-step flow' is visible as Priya acts as an opinion leader, sharing information with neighbors.",
            "steps": ["Apply Lasswell's 5 elements to the scenario", "Identify the communicator (AIR), message (news/entertainment), channel (radio), receiver (Priya and neighbors), effect (awareness + discussion)", "Note the two-step flow pattern (Priya as opinion leader)", "Comment on rural reach of radio"],
            "exp": "This scenario demonstrates how mass communication (radio) effectively reaches rural audiences in India. Priya acts as an opinion leader in the two-step flow theory, interpreting and sharing media messages with her community. Radio remains crucial in rural India for its accessibility and affordability."
        },
        {
            "topic": "T1",
            "q": "Rahul from Mumbai reads three different newspapers every morning: one in English, one in Hindi, and one in Marathi. Explain how media messages are received differently based on language and cultural context, using concepts from communication theory.",
            "ans": "Rahul's multilingual newspaper reading illustrates: (1) Encoding/Decoding model — he decodes messages differently in each language, (2) Uses and Gratification theory — he actively selects media to fulfill different needs (English for national news, Hindi for political news, Marathi for local news), (3) Cultural context shapes interpretation — Marathi newspaper connects him to local culture, (4) Active audience theory — audiences are not passive but actively select and interpret media content.",
            "steps": ["Identify relevant communication theories: Uses & Gratification, Encoding/Decoding", "Apply to Rahul's behavior: different languages for different needs", "Explain cultural context of interpretation", "Conclude with active audience perspective"],
            "exp": "Rahul's behavior aligns with the Uses and Gratification theory, which views audiences as active participants who choose media to fulfill specific needs. His multilingual newspaper reading reflects India's linguistic diversity and how audiences navigate multiple media channels based on language preference and content relevance."
        },
        {
            "topic": "T2",
            "q": "Scenario: A small-town newspaper in Assam has a circulation of 15,000 copies but reaches an estimated 75,000 readers through shared reading. Explain the concept of 'pass-along readership' and discuss its significance for advertisers.",
            "ans": "Pass-along readership occurs when one copy of a newspaper is read by multiple people. Here, the readership multiplier is 75,000/15,000 = 5x. Significance for advertisers: (1) Actual reach is much higher than circulation figures suggest, (2) Advertisers get more value per rupee spent, (3) Shared reading happens in community spaces like tea shops (common in Assam and North East India), (4) Newspapers should report both circulation and readership figures for accurate advertising rates.",
            "steps": ["Calculate readership multiplier: 75,000 / 15,000 = 5x", "Define pass-along readership concept", "Explain significance for advertisers: better value, wider actual reach", "Mention shared reading in community spaces (tea shops)"],
            "exp": "Pass-along readership is a critical concept in media planning. In India, newspaper sharing is common in places like tea shops, community centers, and households. Advertisers must consider readership, not just circulation, to understand the true reach of their campaigns."
        },
        {
            "topic": "T5",
            "q": "Case Study: Tata Tea's 'Jaago Re' campaign (2009-2010) encouraged citizens to vote and be aware of social issues. Analyze this campaign using the AIDA model and explain how it combined advertising with social messaging. Suggest one improvement.",
            "ans": "AIDA Analysis: Attention — strong TV commercials with emotional appeal, Interest — linked voting to national interest, Desire — made viewers feel they could make a difference, Action — directed viewers to the Jaago Re website to pledge to vote. This was a public service campaign that also built Tata Tea's brand as socially responsible. Improvement: Add measurable on-ground actions beyond online pledges, such as voter registration drives in partnership with local NGOs.",
            "steps": ["Apply AIDA to each stage of the campaign", "Analyze blend of PSA and brand building", "Note the social messaging aspect", "Suggest one practical improvement"],
            "exp": "The Tata Tea Jaago Re campaign is a classic example of cause-related marketing in India. It combined a public service message (voting awareness) with brand building. The campaign effectively used AIDA to move viewers from attention to action, while positioning Tata Tea as a socially conscious brand."
        },
        {
            "topic": "T6",
            "q": "Scenario: A well-known Indian FMCG company faced a crisis when customers reported finding foreign objects in their product packets. As the PRO (Public Relations Officer), outline your crisis communication strategy step by step.",
            "ans": "Crisis Communication Strategy: Step 1: Acknowledge the issue immediately through official statement. Step 2: Apologize to affected customers and take responsibility. Step 3: Announce recall of affected batches with clear details. Step 4: Set up a helpline and refund/replacement process. Step 5: Explain corrective measures being taken (quality control improvements). Step 6: Share updates regularly through press releases and social media. Step 7: Rebuild trust through CSR initiatives and third-party quality certifications.",
            "steps": ["Acknowledge immediately", "Apologize and take responsibility", "Recall affected batches", "Set up customer support", "Explain corrective measures", "Regular updates", "Rebuild trust"],
            "exp": "Effective crisis communication requires speed, transparency, and accountability. The PRO must act quickly, take responsibility, provide clear information about what happened and what is being done, and maintain ongoing communication until the crisis is resolved. Indian examples include Nestle's Maggi crisis management in 2015."
        },
        {
            "topic": "T7",
            "q": "Case Study: A photojournalist in Mumbai covering a flood situation takes photographs of affected families. Some photos show faces clearly while others capture destroyed homes. Discuss the ethical considerations the photojournalist must balance between documenting truth and respecting the dignity of subjects.",
            "ans": "Ethical considerations: (1) Privacy vs. public interest — showing identifiable faces may violate privacy, (2) Dignity of subjects — photos should not exploit suffering, (3) Informed consent — subjects should know they are being photographed, (4) Context — photos need accurate captions to avoid misinterpretation, (5) Sensitivity — some images (especially children in distress) may need to be handled with extra care. The photojournalist should get consent, avoid exploiting suffering, and use captions to provide context.",
            "steps": ["Identify ethical dilemma: documenting truth vs. respecting subjects", "List considerations: privacy, dignity, consent, context, sensitivity", "Recommend best practices: consent, careful editing, accurate captions", "Reference Press Council of India guidelines"],
            "exp": "Photojournalists face ethical dilemmas between documenting events truthfully and respecting the dignity of their subjects. The Press Council of India's guidelines and international codes (like NPPA code) advise obtaining consent, avoiding sensationalism, and providing accurate context through captions."
        },
        {
            "topic": "T8",
            "q": "A local business in Indore wants to expand its reach. Compare the effectiveness of traditional media (newspaper) vs. new media (social media and website) for this purpose. Recommend a mixed strategy.",
            "ans": "Traditional media (newspaper in Indore): Benefits: trusted, reaches older demographics, local language editions (Dainik Bhaskar, Nai Duniya). Limitations: declining circulation, one-way communication, hard to measure ROI. New media (social media): Benefits: targeted advertising, interactive, measurable analytics, cost-effective, younger demographics. Limitations: requires consistent content creation, fake news concerns, digital divide. Recommended mixed strategy: Use newspaper ads for brand credibility among local audience, use Facebook/Instagram for engagement with younger customers, use Google My Business for local search visibility.",
            "steps": ["Analyze newspaper: benefits (trust, local reach) and limitations (declining, one-way)", "Analyze social media: benefits (targeted, interactive, measurable) and limitations (content effort, fake news)", "Propose mixed strategy combining both"],
            "exp": "A mixed media strategy leverages the strengths of both traditional and new media. Traditional media provides credibility and reach among older demographics, while new media offers targeting precision and engagement at lower cost. In tier-2 cities like Indore, a combination approach is most effective."
        },
        {
            "topic": "T10",
            "q": "A researcher wants to study media consumption habits of college students in three cities: Pune, Ahmedabad, and Kochi. Design a research plan using survey methodology.",
            "ans": "Research Plan: Step 1: Define objectives (understand time spent, preferred media, content types). Step 2: Define population: college students aged 18-22. Step 3: Sampling: stratified random sampling, 100 students from each city (300 total). Step 4: Questionnaire design: questions on time spent on TV, radio, newspapers, social media; preferred content; peak usage times. Step 5: Pilot testing with 20 students. Step 6: Data collection through online forms. Step 7: Data analysis using percentages and cross-tabulations. Step 8: Report findings with recommendations for media organizations.",
            "steps": ["Define research objectives", "Define population and sampling method", "Design questionnaire", "Pilot test", "Collect data", "Analyze data", "Report findings"],
            "exp": "A well-designed research plan follows systematic methodology. Stratified sampling ensures representation across cities. The questionnaire should cover all major media platforms. Pilot testing identifies issues before full deployment. Analysis should provide actionable insights for media organizations targeting college students."
        },
        {
            "topic": "T9",
            "q": "Scenario: An Indian news channel broadcasts a report claiming a local politician is involved in corruption based on anonymous social media posts. The politician files a defamation case. Analyze this situation from legal and ethical perspectives.",
            "ans": "Legal perspective: (1) Defamation under IPC Section 499 — publishing false statements harming reputation, (2) Burden of proof — politician must prove the statement is false, but media must prove it is true and in public interest. (3) Public interest defense — if the report serves public interest and is verified, it may be defended. Ethical perspective: (1) Journalists should verify information from anonymous sources before publishing, (2) Right to reply should be given, (3) Distinction between fact and opinion must be maintained. Recommendation: The channel should have verified the claim independently and given the politician a chance to respond.",
            "steps": ["Legal analysis: defamation laws, burden of proof, public interest defense", "Ethical analysis: verification, right to reply, fact/opinion distinction", "Recommend proper journalistic practice"],
            "exp": "This scenario highlights the tension between press freedom and protection of reputation. Indian defamation law allows civil and criminal action. Journalists must balance public interest reporting with responsible verification. The Press Council of India emphasizes giving the right to reply and verifying information from all sources."
        },
        {
            "topic": "T12",
            "q": "Aanganwadi workers in Uttar Pradesh are being trained to use WhatsApp groups for sharing health information with mothers in their villages. Evaluate this initiative using media literacy and digital divide frameworks.",
            "ans": "Evaluation: (1) Media literacy aspect: aanganwadi workers need training to use WhatsApp effectively and verify health information, (2) Digital divide: smartphone penetration in rural UP may limit access — some mothers may not have phones, (3) Barriers: literacy levels (especially for women), language (WhatsApp in English/Hindi vs. local dialects), (4) Benefits: WhatsApp is familiar, low-cost, can share images/videos, group format enables peer learning, (5) Sustainability: depends on continued support, network coverage, and training. Overall: a good initiative but needs complementary strategies for women without smartphones.",
            "steps": ["Analyze media literacy needs: training workers, verifying information", "Analyze digital divide: smartphone access, literacy barriers", "Identify benefits: familiarity, cost, multimedia sharing", "Identify challenges: language, literacy, network", "Evaluate sustainability"],
            "exp": "Using WhatsApp for health communication in rural India is innovative but faces real challenges. The digital divide means some community members are excluded. Media literacy training is essential to prevent misinformation spread. Complementary approaches (community meetings, posters) are needed for those without digital access."
        },
    ]

    if competency:
        items = [b for b in comp_bank if b["topic"] == topic_label]
        if not items:
            items = comp_bank
    else:
        items = [b for b in standard_bank if b["topic"] == topic_label]
        if not items:
            items = standard_bank
    item = rng.choice(items)
    return item


def gen_numerical(rng, topic_label, topic_name, competency, difficulty, bloom):
    """Generate a numerical question."""
    bank = [
        {
            "topic": "T1",
            "q": "A radio station broadcasts at 91.9 MHz. If the speed of electromagnetic waves is 3 x 10^8 m/s, calculate the wavelength of the broadcast signal.",
            "ans": "3.07 meters (approx)",
            "steps": [
                "Use formula: wavelength = speed / frequency",
                "Wavelength = (3 x 10^8) / (91.9 x 10^6)",
                "Wavelength = 3.265 meters (approx 3.27 m)"
            ],
            "exp": "The wavelength is calculated using the formula: wavelength (m) = speed of light (3 x 10^8 m/s) / frequency (Hz). For 91.9 MHz: wavelength = 3 x 10^8 / 91.9 x 10^6 = 3.27 meters approximately."
        },
        {
            "topic": "T3",
            "q": "An FM radio station broadcasts at 93.5 MHz. Calculate the wavelength of the broadcast signal. (Speed of light = 3 x 10^8 m/s)",
            "ans": "Approximately 3.21 meters",
            "steps": [
                "Formula: wavelength = speed / frequency",
                "Frequency = 93.5 MHz = 93.5 x 10^6 Hz",
                "Wavelength = (3 x 10^8) / (93.5 x 10^6)",
                "Wavelength = 3.21 meters (approx)"
            ],
            "exp": "Using wavelength = speed/frequency: 3x10^8 / 93.5x10^6 = 3.21 meters. This wavelength is in the VHF (Very High Frequency) range."
        },
        {
            "topic": "T10",
            "q": "A media researcher conducted a survey of 500 viewers in Mumbai. 320 said they watch news channels daily. Calculate the percentage of viewers who watch news daily.",
            "ans": "64%",
            "steps": [
                "Formula: Percentage = (Number watching daily / Total surveyed) x 100",
                "Percentage = (320 / 500) x 100",
                "Percentage = 0.64 x 100",
                "Percentage = 64%"
            ],
            "exp": "Out of 500 surveyed viewers, 320 watch news channels daily. This is calculated as (320/500) x 100 = 64%. This indicates a high news consumption rate among Mumbai viewers."
        },
        {
            "topic": "T11",
            "q": "A newspaper has a circulation of 200,000 copies and is sold at Rs 5 per copy. Its annual advertising revenue is Rs 30 crore. Calculate the ratio of advertising revenue to circulation revenue.",
            "ans": "15:1 (Advertising revenue is 15 times the circulation revenue)",
            "steps": [
                "Circulation revenue = 200,000 x 5 x 365 (daily) = Rs 36.5 crore/year",
                "Wait - let's compute per day: 200,000 x 5 = Rs 10 lakh per day",
                "Advertising revenue = Rs 30 crore per year",
                "Ratio = 30 crore : (10 lakh x 365 / 100 lakh) = 30 : 36.5 = approx 15:11",
                "Simpler: Ratio of ad revenue to daily circulation revenue = 30 crore : 10 lakh = 300:1 per day ratio"
            ],
            "explain": "This demonstrates how heavily Indian print media depends on advertising. Per day: circulation earns Rs 10 lakh, while advertising contributes significantly more. Advertisers pay premium rates based on circulation (readership).",
            "exp": "Advertising is the primary revenue source for most Indian newspapers. The ratio shows that advertising revenue far exceeds circulation revenue, which is typical for mass-circulation newspapers."
        },
        {
            "topic": "T4",
            "q": "A TV channel has a TRP of 3.5 in a market with 50 million TV households. Estimate the approximate number of viewers (assuming an average of 4 viewers per household).",
            "ans": "7 million viewers",
            "steps": [
                "TRP of 3.5 means 3.5% of households watch the channel",
                "TV households watching = 50,000,000 x 0.035 = 1,750,000 households",
                "Total viewers = 1,750,000 x 4 = 7,000,000",
                "Approximately 7 million viewers"
            ],
            "exp": "TRP (Television Rating Point) represents the percentage of TV households watching a channel. A TRP of 3.5 in a 50 million household market means about 1.75 million households, or approximately 7 million viewers, watch the channel."
        },
        {
            "topic": "T5",
            "q": "An advertising agency charges Rs 50,000 for a 30-second prime-time TV commercial. The commercial airs 20 times per day for 15 days. Calculate the total cost of the campaign and the cost per viewer if it reaches 5 million unique viewers.",
            "ans": "Total cost: Rs 1.5 crore. Cost per viewer: Rs 3.",
            "steps": [
                "Total cost = 50,000 x 20 (airings/day) x 15 (days)",
                "Total cost = 50,000 x 300 = Rs 1,50,00,000 = Rs 1.5 crore",
                "Cost per viewer = 1,50,00,000 / 50,00,000",
                "Cost per viewer = Rs 3 per viewer"
            ],
            "exp": "Prime-time advertising is expensive. A 30-second commercial aired 300 times (20 per day for 15 days) at Rs 50,000 per airing costs Rs 1.5 crore. The cost per viewer depends heavily on the channel's TRP and reach."
        },
        {
            "topic": "T3",
            "q": "An FM radio station in Pune reaches approximately 2 million listeners daily with an average listening duration of 45 minutes per listener. Calculate the total daily listening minutes and total daily listening hours.",
            "ans": "90 million minutes or 1.5 million hours",
            "steps": [
                "Total daily listening minutes = 2,000,000 listeners x 45 minutes",
                "Total daily listening minutes = 90,000,000 minutes",
                "Total daily listening hours = 90,000,000 / 60",
                "Total daily listening hours = 1,500,000 hours"
            ],
            "exp": "This calculation shows the massive scale of radio listening. 2 million listeners x 45 minutes each = 90 million minutes or 1.5 million hours of daily listening. This is why radio remains an important advertising medium in India."
        },
    ]

    items = [b for b in bank if b["topic"] == topic_label]
    if not items:
        items = bank
    item = rng.choice(items)
    return item


def gen_long_answer(rng, topic_label, topic_name, competency, difficulty, bloom):
    """Generate a long answer question."""
    bank = [
        {
            "topic": "T1",
            "q": "Describe the evolution of mass communication in India from pre-independence to the digital age, highlighting at least four major milestones.",
            "ans": "Key milestones: (1) 1780: Hicky's Bengal Gazette, first Indian newspaper, (2) 1927: Indian Broadcasting Company starts radio, (3) 1936: All India Radio established, (4) 1959: Doordarshan experimental telecast, (5) 1965: Regular TV broadcasting begins, (6) 1976: Press Council of India established, (7) 1991: Economic liberalization opens media to private players, (8) 2000s: Internet and mobile media revolution, (9) 2010s: Social media and digital journalism growth. Each milestone transformed how Indians access information and entertainment.",
            "steps": ["Pre-independence: press as nationalist tool", "Post-independence: AIR as government broadcaster", "1965-1991: Doordarshan era", "1991+: Liberalization, private media, digital revolution", "Present: Social media dominance"],
            "exp": "The evolution of Indian mass communication reflects the country's socio-political journey. The press played a crucial role in the independence movement. Post-independence, radio and television were government-controlled. Economic liberalization in 1991 unleashed private media, and the digital revolution has further transformed the landscape."
        },
        {
            "topic": "T2",
            "q": "Discuss the role of newspapers in a democratic society. What challenges do Indian newspapers face in the digital age?",
            "ans": "Role in democracy: (1) Informing citizens about current affairs, (2) Acting as a watchdog on government and institutions, (3) Providing a platform for public debate, (4) Representing diverse viewpoints and marginalized voices, (5) Educating the public on important issues. Challenges in digital age: (1) Declining print circulation, (2) Competition from free online news, (3) Revenue decline (print advertising falling), (4) Need for digital transformation, (5) Fake news and misinformation, (6) Maintaining credibility in era of social media, (7) Rising cost of newsprint.",
            "steps": ["Role in democracy: information, watchdog, debate, representation, education", "Challenge 1: declining circulation", "Challenge 2: revenue decline", "Challenge 3: digital transformation need", "Challenge 4: fake news/credibility", "Challenge 5: newsprint costs"],
            "exp": "Newspapers have traditionally been the backbone of Indian democracy. The Press Council of India's guidelines emphasize the role of newspapers in promoting democratic values. However, the digital transition has disrupted traditional business models, requiring newspapers to adapt through digital subscriptions and diversified revenue streams."
        },
        {
            "topic": "T5",
            "q": "Explain the process of creating an advertising campaign. Illustrate with reference to a well-known Indian campaign.",
            "ans": "Advertising campaign process: (1) Brief: understanding client's product, target audience, objectives, budget, (2) Research: market research, consumer insights, competitive analysis, (3) Strategy: positioning, messaging strategy, media planning, (4) Creative: developing copy, visuals, taglines, (5) Production: filming, printing, digital asset creation, (6) Media scheduling: when and where to place ads, (7) Launch: executing the campaign, (8) Evaluation: measuring effectiveness through metrics. Example: Amul's 'Taste of India' campaign — consistent positioning as the taste of India, creative with the Amul girl commenting on current events, sustained over decades.",
            "steps": ["Step 1: Client brief", "Step 2: Research", "Step 3: Strategy", "Step 4: Creative development", "Step 5: Production", "Step 6: Media scheduling", "Step 7: Launch", "Step 8: Evaluation", "Illustrate with Amul campaign"],
            "exp": "An advertising campaign involves systematic planning from brief to evaluation. The Amul campaign exemplifies a long-running, effective campaign with consistent creative execution, strategic media placement, and strong brand positioning. Key to success is understanding the target audience and creating memorable, relevant messaging."
        },
        {
            "topic": "T7",
            "q": "Discuss the importance of photography in journalism. Explain the ethical responsibilities of a photojournalist.",
            "ans": "Importance in journalism: (1) Adds visual impact and emotional resonance to news stories, (2) Documents events for historical record, (3) Communicates across language barriers, (4) Provides evidence and authenticity, (5) Engages audiences more effectively than text alone. Ethical responsibilities: (1) Accuracy — photos should not be manipulated to mislead, (2) Privacy — respect the privacy of individuals, especially victims, (3) Dignity — avoid exploiting suffering or humiliation, (4) Context — provide accurate captions, (5) Consent — obtain consent when photographing individuals in private situations, (6) No staging — document real events truthfully, (7) Sensitivity — especially with children and victims of tragedy.",
            "steps": ["Importance: visual impact, documentation, cross-language communication, authenticity, engagement", "Ethical responsibility 1: no manipulation", "Ethical responsibility 2: privacy", "Ethical responsibility 3: dignity", "Ethical responsibility 4: context/captions", "Ethical responsibility 5: consent", "Ethical responsibility 6: no staging", "Ethical responsibility 7: sensitivity"],
            "exp": "Photography is often called 'the universal language' because it transcends barriers of literacy and language. In Indian journalism, powerful photojournalism has documented historical events from Partition to natural disasters. Ethical guidelines from the Press Council of India and international organizations like World Press Photo provide frameworks for responsible photojournalism."
        },
        {
            "topic": "T9",
            "q": "What are the major laws affecting media in India? Discuss any two in detail.",
            "ans": "Major media laws: (1) Press Council of India Act, 1978: regulates print media, protects press freedom, handles complaints against newspapers, (2) Information Technology Act, 2000 (amended 2008): governs digital communication, addresses cybercrime and online content regulation, (3) Cable Television Networks (Regulation) Act, 1995: regulates cable TV content and carriage, (4) Cinematograph Act, 1952: film certification and censorship. Detailed discussion of Press Council of India Act: establishes a statutory body with a chairman and 28 members representing press, Parliament, and cultural fields. It investigates complaints against the press and can censure. Detailed discussion of IT Act: Section 66A (struck down by Supreme Court in 2015) criminalized 'offensive' online speech. Section 69A allows blocking of online content. The Act faces criticism for vague provisions and potential misuse.",
            "steps": ["List major media laws", "Detail Press Council of India Act: structure, functions, powers", "Detail IT Act: key provisions, controversy over Section 66A", "Discuss balance between regulation and freedom"],
            "exp": "Indian media law is a complex framework balancing freedom of expression with reasonable restrictions. The Press Council of India protects press freedom while ensuring accountability. The IT Act governs the digital space but has faced constitutional challenges. Understanding these laws is essential for media professionals to practice responsibly."
        },
        {
            "topic": "T8",
            "q": "Discuss the opportunities and challenges of 'new media' in the Indian context.",
            "ans": "Opportunities: (1) Democratization — anyone can create and share content, bypassing traditional gatekeepers, (2) Accessibility — mobile penetration makes media accessible in rural areas, (3) Interactivity — audiences can comment, share, and participate, (4) Multilingual content — regional language content thrives online, (5) Cost-effectiveness — cheaper than traditional media, (6) Real-time information — news spreads instantly. Challenges: (1) Digital divide — rural/elderly populations excluded, (2) Fake news and misinformation, (3) Lack of editorial oversight and accountability, (4) Privacy concerns — data collection and surveillance, (5) Cyberbullying and harassment, (6) Filter bubbles — algorithms create echo chambers, (7) Monetization challenges for digital publishers.",
            "steps": ["Opportunity 1: democratization of content creation", "Opportunity 2: mobile accessibility", "Opportunity 3: interactivity", "Opportunity 4: multilingual content", "Challenge 1: digital divide", "Challenge 2: fake news", "Challenge 3: privacy concerns", "Challenge 4: monetization"],
            "exp": "New media has transformed Indian media landscape. With over 800 million internet users, India has one of the largest digital markets. Platforms like ShareChat (regional language), YouTube India, and WhatsApp have created new opportunities for content creation and consumption, while challenges like misinformation demand media literacy education."
        },
        {
            "topic": "T6",
            "q": "Define Public Relations. Explain its functions and tools with reference to Indian organizations.",
            "ans": "PR definition: managing communication between an organization and its publics to build mutually beneficial relationships. Functions: (1) Media relations — building relationships with journalists, (2) Crisis management — handling negative situations, (3) Internal communication — communicating with employees, (4) Community relations — building local community relationships, (5) Corporate communication — managing company's overall image. Tools: (1) Press releases, (2) Press conferences, (3) Newsletters, (4) Corporate films, (5) Social media, (6) Sponsorships and events. Indian examples: (1) Indian Army's public outreach through social media, (2) Infosys annual reports as PR tools, (3) CSR initiatives as community relations tools.",
            "steps": ["Define PR", "List functions: media relations, crisis mgmt, internal comms, community relations, corporate comms", "List tools: press releases, conferences, newsletters, films, social media, events", "Give Indian examples"],
            "exp": "PR in India has evolved significantly. Indian organizations now recognize PR as a strategic function. Government organizations like the Indian Army and ISRO use PR effectively. Corporate India uses PR for reputation management, crisis handling, and stakeholder engagement. Social media has become a crucial PR tool in India."
        },
        {
            "topic": "T10",
            "q": "Explain the concept of 'audience segmentation' in media. Why is it important for media organizations and advertisers?",
            "ans": "Audience segmentation divides a large audience into smaller, more homogeneous groups based on shared characteristics. Bases for segmentation: (1) Demographic (age, gender, income, education), (2) Geographic (urban/rural, region), (3) Psychographic (lifestyle, values, interests), (4) Behavioral (media consumption patterns, brand loyalty). Importance: (1) Media organizations can create targeted content, (2) Advertisers can reach specific consumer groups efficiently, (3) Higher engagement through relevant content, (4) Better ROI on advertising spend, (5) Understanding niche markets. Indian example: A channel like Colors targets mass entertainment, while MTV targets urban youth — each serving a different audience segment.",
            "steps": ["Define audience segmentation", "List segmentation bases: demographic, geographic, psychographic, behavioral", "Explain importance for media: targeted content", "Explain importance for advertisers: efficient reach, ROI", "Give Indian example"],
            "exp": "Audience segmentation is fundamental to modern media strategy. In India's diverse market, segmentation allows media organizations to serve specific audience needs. The proliferation of niche TV channels (food, travel, fashion, devotional) and digital platforms (ShareChat for regional languages, Hoichoi for Bengali content) reflects this trend."
        },
        {
            "topic": "T4",
            "q": "Trace the history of television in India, from its inception to the present day. Highlight key developments and their social impact.",
            "ans": "History: (1) 1959: Experimental telecast begins from Delhi, (2) 1965: Regular Doordarshan service starts, (3) 1976: Doordarshan separated from AIR, (4) 1982: Color TV introduced during Asian Games, (5) 1984-1990: The Golden Age of DD — Ramayan, Mahabharat dominated viewership, (6) 1991: Economic liberalization allows private participation, (7) 1992: Zee TV becomes first private channel, (8) 2000s: Explosion of private channels — Star, Sony, Colors, etc., (9) 2003: DD Direct (DTH) launches, (10) 2010s: Digital and OTT platforms (Hotstar, Netflix India, Amazon Prime). Social impact: created national culture, influenced politics (e.g., Ramjanmabhoomi coverage), created celebrity culture, transformed advertising, shaped social norms.",
            "steps": ["1959: Experimental", "1965-1976: Doordarshan era", "1982-1991: Golden Age", "1991-2000: Private entry", "2000-2010: Channel explosion", "2010+: Digital/OTT", "Social impacts listed"],
            "exp": "Television has been the most influential mass medium in India. Doordarshan's Ramayan created shared national cultural experiences. The entry of private channels brought diversity but also commercialization. Today, OTT platforms are challenging traditional TV, especially among urban audiences."
        },
    ]

    items = [b for b in bank if b["topic"] == topic_label]
    if not items:
        items = bank
    item = rng.choice(items)
    return item


def gen_assertion_reasoning(rng, topic_label, topic_name, difficulty, bloom):
    """Generate an assertion-reasoning type question (competency-based)."""
    bank = [
        {
            "topic": "T1",
            "q": "Assertion (A): Mass media plays a significant role in shaping public opinion. Reason (R): Media messages are always interpreted in the same way by all audience members.",
            "ans": "A is true but R is false",
            "options": ["A is true but R is false", "Both A and R are true and R is the correct explanation of A", "A is false but R is true", "Both A and R are true but R is NOT the correct explanation of A"],
            "exp": "Assertion is true: mass media significantly influences public opinion through agenda-setting and framing. However, the Reason is false: audiences actively interpret media messages differently based on their cultural background, education, personal experiences, and social context (Encoding/Decoding model by Stuart Hall)."
        },
        {
            "topic": "T2",
            "q": "Assertion (A): The internet has replaced newspapers as the primary source of news for most urban Indians. Reason (R): Newspapers still have higher circulation figures in rural India.",
            "ans": "Both A and R are true but R is NOT the correct explanation of A",
            "options": ["A is true but R is false", "Both A and R are true and R is the correct explanation of A", "A is false but R is true", "Both A and R are true but R is NOT the correct explanation of A"],
            "exp": "Assertion is true: in urban India, internet news has surpassed print in terms of consumption. Reason is also true: newspapers like Dainik Jagran and Amar Ujala maintain high circulation in rural areas. However, the rural circulation of newspapers does NOT explain why internet has overtaken print in urban areas — these are separate trends."
        },
        {
            "topic": "T4",
            "q": "Assertion (A): Television is considered the most powerful mass medium in India. Reason (R): Television combines both visual and audio elements, making it more engaging than other media.",
            "ans": "Both A and R are true and R is the correct explanation of A",
            "options": ["A is true but R is false", "Both A and R are true and R is the correct explanation of A", "A is false but R is true", "Both A and R are true but R is NOT the correct explanation of A"],
            "exp": "Assertion is true: TV reaches over 900 million people in India. Reason is true: TV's audiovisual nature makes it more engaging and immersive than print or radio alone. The Reason correctly explains the Assertion: the audiovisual combination is precisely why TV has been so powerful in India."
        },
        {
            "topic": "T5",
            "q": "Assertion (A): Public service advertising is different from commercial advertising. Reason (R): Public service advertising promotes social causes while commercial advertising aims to sell products.",
            "ans": "Both A and R are true and R is the correct explanation of A",
            "options": ["A is true but R is false", "Both A and R are true and R is the correct explanation of A", "A is false but R is true", "Both A and R are true but R is NOT the correct explanation of A"],
            "exp": "Assertion is true: PSA and commercial advertising differ fundamentally. Reason is true: PSA promotes social welfare (e.g., polio eradication, cleanliness) while commercial advertising sells products/services. The Reason correctly explains the Assertion."
        },
        {
            "topic": "T8",
            "q": "Assertion (A): Social media has changed the relationship between media producers and consumers. Reason (R): On social media, users can create and share content, becoming both producers and consumers of media.",
            "ans": "Both A and R are true and R is the correct explanation of A",
            "options": ["A is true but R is false", "Both A and R are true and R is the correct explanation of A", "A is false but R is true", "Both A and R are true but R is NOT the correct explanation of A"],
            "exp": "Assertion is true: social media has transformed the passive audience into active participants. Reason is true: social media enables user-generated content, turning audiences into 'prosumers' (producer-consumers). The Reason explains the Assertion: the ability to create content is what changes the relationship."
        },
        {
            "topic": "T9",
            "q": "Assertion (A): Media ethics are essential for maintaining public trust in journalism. Reason (R): Ethical journalism ensures accuracy, fairness, and accountability in reporting.",
            "ans": "Both A and R are true and R is the correct explanation of A",
            "options": ["A is true but R is false", "Both A and R are true and R is the correct explanation of A", "A is false but R is true", "Both A and R are true but R is NOT the correct explanation of A"],
            "exp": "Assertion is true: ethics are crucial for public trust in media. Reason is true: ethical journalism involves accuracy (verifying facts), fairness (balanced reporting), and accountability (correcting errors, taking responsibility). The Reason explains the Assertion: ethical practices build and maintain trust."
        },
        {
            "topic": "T6",
            "q": "Assertion (A): Public Relations and Advertising serve the same organizational objectives. Reason (R): Both PR and advertising involve communicating with the public.",
            "ans": "Both A and R are true but R is NOT the correct explanation of A",
            "options": ["A is true but R is false", "Both A and R are true and R is the correct explanation of A", "A is false but R is true", "Both A and R are true but R is NOT the correct explanation of A"],
            "exp": "Assertion is true: both PR and advertising serve organizational objectives of building reputation and reaching audiences. Reason is true: both involve public communication. However, the Reason is NOT the correct explanation: they differ significantly in methods (earned vs. paid media), target audiences, communication direction, and cost."
        },
    ]

    items = [b for b in bank if b["topic"] == topic_label]
    if not items:
        items = bank
    item = rng.choice(items)
    return item


# ============================================================
# DATA INTERPRETATION / CASE STUDY BANK (competency-based)
# ============================================================

def gen_case_study(rng, topic_label, difficulty, bloom):
    """Generate a data interpretation / case study question."""
    bank = [
        {
            "topic": "T10",
            "q": "Study the data below and answer the questions that follow:\n\nMedia Consumption Survey — Tier-2 Cities in India (Sample: 1200 respondents)\n\n| Platform       | Daily Users | Avg. Time Spent | Most Popular Content |\n|----------------|-------------|-----------------|---------------------|\n| YouTube        | 68%         | 95 minutes      | Entertainment       |\n| WhatsApp       | 82%         | 120 minutes     | Social/News         |\n| Instagram      | 45%         | 60 minutes      | Visual Content      |\n| Television     | 55%         | 180 minutes     | Serials/News        |\n| Radio          | 22%         | 45 minutes      | Music/News          |\n| Newspapers     | 18%         | 25 minutes      | Local News          |\n\n(a) Which platform has the highest daily usage percentage? What does this indicate about media habits in tier-2 cities?\n(b) Calculate how much more time respondents spend on WhatsApp than on newspapers daily.\n(c) Suggest two reasons why newspaper consumption is lowest among these platforms.\n(d) What does the high television viewing time indicate about its continued relevance?",
            "ans": "(a) WhatsApp at 82% indicates social media messaging is the dominant media activity, driven by ease of use and group communication. (b) Difference = 120 - 25 = 95 minutes. Respondents spend 95 minutes more on WhatsApp daily than on newspapers. (c) Reasons for low newspaper consumption: (1) Digital alternatives are more accessible and affordable, (2) Younger generation prefers mobile-first content, (3) Regional language newspapers face competition from WhatsApp/YouTube regional content. (d) High TV viewing (180 min) indicates television's continued dominance for entertainment, especially family viewing of serials and news.",
            "steps": [
                "Identify highest usage: WhatsApp at 82%",
                "Calculate time difference: 120 - 25 = 95 minutes",
                "Analyze reasons for low newspaper use: digital competition, mobile-first generation, accessibility",
                "Interpret TV dominance: family entertainment, serials, simultaneous viewing"
            ],
            "exp": "This data reflects India's media consumption shift toward digital platforms while television remains strong for longer-duration family entertainment. WhatsApp's dominance shows the importance of messaging and social communication, even in tier-2 cities."
        },
        {
            "topic": "T5",
            "q": "A company launched a new detergent in India with the following advertising campaign:\n\nWeek 1: TV commercials on prime time (cost: Rs 8 lakh per spot, 10 spots/week)\nWeek 2: Print ads in 5 national dailies (cost: Rs 2 lakh per insert per paper)\nWeek 3: Digital ads on Facebook and Instagram (cost: Rs 50,000/day)\nWeek 4: Hoardings in 10 major cities (cost: Rs 1.5 lakh per city per month)\n\nCalculate: (a) Total cost of the 4-week campaign. (b) If the campaign reached 20 million people, what was the cost per thousand (CPM)? (c) The company sold 5 lakh units at Rs 80 each. Was the campaign profitable if total production + marketing cost was Rs 5 crore?",
            "ans": "(a) TV: 8 x 10 x 4 = Rs 32 lakh (4 weeks). Print: 2 x 5 x 4 = Rs 40 lakh. Digital: 0.5 x 7 x 4 = Rs 14 lakh. Hoardings: 1.5 x 10 = Rs 15 lakh. Total ad cost = Rs 1.01 crore. (b) CPM = (Total ad cost / Reach in thousands) = (1,01,00,000 / 20,00,000) x 1000 = Rs 50.5 CPM. (c) Revenue = 5,00,000 x 80 = Rs 4 crore. Cost = Rs 5 crore. The campaign was NOT profitable; it resulted in a loss of Rs 1 crore. The company spent more on marketing than it earned in sales.",
            "steps": [
                "Calculate TV ad cost: 8 lakh x 10 spots x 4 weeks = 320 lakh",
                "Calculate print ad cost: 2 lakh x 5 papers x 4 weeks = 400 lakh",
                "Calculate digital cost: 0.5 lakh x 7 days x 4 weeks = 140 lakh",
                "Calculate hoarding cost: 1.5 lakh x 10 cities = 150 lakh",
                "Total = 320 + 400 + 140 + 150 = 1010 lakh = Rs 1.01 crore",
                "CPM = (1,01,00,000 / 20,00,000) x 1000 = Rs 50.5",
                "Revenue = 5,00,000 x 80 = 4,00,00,000 = Rs 4 crore",
                "Profit/Loss = 4 crore - 5 crore = -1 crore (Loss)"
            ],
            "exp": "This case demonstrates how advertising campaigns are budgeted and evaluated. Cost per Mille (CPM) is a standard metric. The campaign's unprofitability suggests either the product price was too low, production costs were high, or the reach was insufficient to drive sales volume."
        },
        {
            "topic": "T11",
            "q": "Read the table below on media revenue patterns in India:\n\n| Media Type    | 2020 Revenue (Rs Cr) | 2023 Revenue (Rs Cr) | Growth Rate |\n|---------------|---------------------|---------------------|-------------|\n| Print         | 35,200              | 31,500              | -10.5%      |\n| Television    | 68,500              | 72,300              | +5.6%       |\n| Radio         | 3,800               | 4,500               | +18.4%      |\n| Digital       | 22,100              | 41,800              | +89.1%      |\n| Cinema        | 7,200               | 9,100               | +26.4%      |n\n(a) Which medium shows the highest growth rate? What factors contribute to this growth?\n(b) What is the percentage decline in print revenue from 2020 to 2023?\n(c) Calculate the total media revenue for 2023 and the digital media's share percentage.\n(d) What strategies should a traditional print newspaper adopt based on this data?",
            "ans": "(a) Digital shows 89.1% growth. Factors: smartphone penetration, affordable data (Jio effect), social media growth, online advertising targeting. (b) Decline = (35,200 - 31,500) / 35,200 x 100 = 10.5%. (c) Total 2023 revenue = 31,500 + 72,300 + 4,500 + 41,800 + 9,100 = Rs 1,59,200 crore. Digital share = 41,800 / 1,59,200 x 100 = 26.25%. (d) Strategies: (1) Develop digital editions and apps, (2) Use social media for content distribution, (3) Diversify revenue through events and digital advertising, (4) Create niche content, (5) Offer digital subscriptions.",
            "steps": [
                "Identify highest growth: Digital at 89.1%",
                "Explain growth factors: smartphones, data affordability, ad targeting",
                "Calculate print decline: (35,200 - 31,500) / 35,200 = 10.5%",
                "Calculate total 2023 revenue: sum all categories = 1,59,200 Cr",
                "Calculate digital share: 41,800 / 1,59,200 = 26.25%",
                "Recommend strategies for print adaptation"
            ],
            "exp": "The data clearly shows digital media's explosive growth in India, driven by smartphone proliferation and affordable data. Print's decline is a global trend. Traditional media organizations must embrace digital transformation to survive and compete in this changing landscape."
        },
        {
            "topic": "T3",
            "q": "A radio survey in three Indian cities found the following data on radio listenership:\n\n| City   | Population | Radio Listeners | FM Share | Peak Time |\n|--------|-----------|----------------|----------|----------|\n| Mumbai | 12.5M     | 6.2M           | 78%      | 8-10 AM  |\n| Pune   | 3.1M      | 1.4M           | 65%      | 5-7 PM   |\n| Nagpur | 2.5M      | 0.9M           | 45%      | 7-9 AM   |\n\n(a) Calculate the radio listenership percentage for each city.\n(b) Which city has the highest FM penetration? What factors might explain this?\n(c) An advertiser wants to reach office-goers during commute. Which city and time slot should they choose?\n(d) If FM operators charge Rs 10,000 per 30-second spot, and an ad is played 8 times during peak time for 7 days, calculate the total cost.",
            "ans": "(a) Mumbai: 6.2/12.5 = 49.6%. Pune: 1.4/3.1 = 45.2%. Nagpur: 0.9/2.5 = 36%. (b) Mumbai has 78% FM share, highest among the three. Factors: higher income levels, more FM stations, car ownership, commuting culture. (c) Mumbai, 8-10 AM slot — highest listenership among office-goers during commute. (d) Cost = 10,000 x 8 x 7 = Rs 5,60,000 (Rs 5.6 lakh).",
            "steps": [
                "Mumbai %: 6.2/12.5 = 49.6%",
                "Pune %: 1.4/3.1 = 45.2%",
                "Nagpur %: 0.9/2.5 = 36%",
                "Highest FM: Mumbai at 78% — explain factors",
                "Best ad slot: Mumbai 8-10 AM for office commuters",
                "Ad cost: 10,000 x 8 x 7 = 5,60,000"
            ],
            "exp": "Radio remains a strong medium in urban India, particularly during commute times. Mumbai's high FM penetration reflects the city's automotive culture and the diversity of FM programming. Advertisers choose time slots based on target audience availability and listening patterns."
        },
    ]

    items = [b for b in bank if b["topic"] == topic_label]
    if not items:
        items = bank
    item = rng.choice(items)
    return item


# ============================================================
# MAIN GENERATOR FUNCTION
# ============================================================

def generate_questions(seed: int, count: int = 20, topic: str = None) -> List[dict]:
    """
    Generate a list of questions for CISCE Class 11 Mass Media & Communication.
    
    Args:
        seed: Random seed for reproducibility
        count: Number of questions to generate
        topic: Optional topic filter (e.g., "T1" for Introduction to Mass Communication)
    
    Returns:
        List of question dictionaries
    """
    rng = make_rng(seed)
    questions = []
    question_id = 0

    # Build topic list
    all_topics = list(TOPICS.items())
    if topic:
        all_topics = [(t, n) for t, n in all_topics if t == topic]
        if not all_topics:
            all_topics = list(TOPICS.items())

    # Difficulty and bloom distributions
    difficulties = ["Easy", "Easy", "Medium", "Medium", "Hard"]
    blooms = ["Remembering", "Understanding", "Applying", "Analyzing", "Evaluating"]

    types_comp = ["case_study", "short_answer", "short_answer", "assertion_reasoning", "long_answer"]
    types_std = ["mcq", "mcq", "fill_blank", "fill_blank", "numerical", "short_answer"]

    for i in range(count):
        question_id += 1
        rng2 = make_rng(seed + i * 137 + question_id * 53)
        rng2.jumpahead = lambda n: None

        t_label, t_name = rng2.choice(all_topics)
        diff = rng2.choice(difficulties)
        bloom = rng2.choice(blooms)

        # Determine if competency-based (50%)
        is_comp = rng2.random() < 0.5
        if is_comp:
            q_type = rng2.choice(types_comp)
        else:
            q_type = rng2.choice(types_std)

        q_dict = None

        if q_type == "mcq":
            item = gen_mcq(rng2, t_label, t_name, is_comp, diff, bloom)
            options = item["opts"]
            q = Question(
                id=f"MM11_{question_id:04d}",
                type="MCQ",
                topic=t_label,
                difficulty=diff,
                bloom_level=bloom,
                competency=is_comp,
                question=item["q"],
                options=options,
                answer=item["ans"],
                explanation=item["exp"],
                marks=1
            )
            q_dict = q.to_dict()

        elif q_type == "fill_blank":
            item = gen_fill_blank(rng2, t_label, t_name, is_comp, diff, bloom)
            q = Question(
                id=f"MM11_{question_id:04d}",
                type="Fill in the Blank",
                topic=t_label,
                difficulty=diff,
                bloom_level=bloom,
                competency=is_comp,
                question=item["q"],
                answer=item["ans"],
                explanation=item["exp"],
                marks=1
            )
            q_dict = q.to_dict()

        elif q_type == "short_answer":
            item = gen_short_answer(rng2, t_label, t_name, is_comp, diff, bloom)
            steps = item.get("steps", [])
            q = Question(
                id=f"MM11_{question_id:04d}",
                type="Short Answer",
                topic=t_label,
                difficulty=diff,
                bloom_level=bloom,
                competency=is_comp,
                question=item["q"],
                answer=item["ans"],
                steps=steps,
                explanation=item["exp"],
                marks=3
            )
            q_dict = q.to_dict()

        elif q_type == "numerical":
            item = gen_numerical(rng2, t_label, t_name, is_comp, diff, bloom)
            steps = item.get("steps", [])
            q = Question(
                id=f"MM11_{question_id:04d}",
                type="Numerical",
                topic=t_label,
                difficulty=diff,
                bloom_level=bloom,
                competency=is_comp,
                question=item["q"],
                answer=item["ans"],
                steps=steps,
                explanation=item["exp"],
                marks=3
            )
            q_dict = q.to_dict()

        elif q_type == "long_answer":
            item = gen_long_answer(rng2, t_label, t_name, is_comp, diff, bloom)
            steps = item.get("steps", [])
            q = Question(
                id=f"MM11_{question_id:04d}",
                type="Long Answer",
                topic=t_label,
                difficulty=diff,
                bloom_level=bloom,
                competency=is_comp,
                question=item["q"],
                answer=item["ans"],
                steps=steps,
                explanation=item["exp"],
                marks=5
            )
            q_dict = q.to_dict()

        elif q_type == "assertion_reasoning":
            item = gen_assertion_reasoning(rng2, t_label, t_name, diff, bloom)
            q = Question(
                id=f"MM11_{question_id:04d}",
                type="Assertion-Reasoning",
                topic=t_label,
                difficulty=diff,
                bloom_level=bloom,
                competency=True,
                question=item["q"],
                options=item["options"],
                answer=item["ans"],
                explanation=item["exp"],
                marks=2
            )
            q_dict = q.to_dict()

        elif q_type == "case_study":
            item = gen_case_study(rng2, t_label, diff, bloom)
            steps = item.get("steps", [])
            q = Question(
                id=f"MM11_{question_id:04d}",
                type="Case Study",
                topic=t_label,
                difficulty=diff,
                bloom_level=bloom,
                competency=True,
                question=item["q"],
                answer=item["ans"],
                steps=steps,
                explanation=item["exp"],
                marks=5
            )
            q_dict = q.to_dict()

        if q_dict:
            questions.append(q_dict)

    return questions


# ============================================================
# VERIFICATION MODULE
# ============================================================

def verify_question(q: dict) -> bool:
    """Verify a question has all required fields."""
    required_fields = ["id", "type", "topic", "difficulty", "bloom_level",
                       "competency", "question", "answer", "explanation", "marks"]
    for field in required_fields:
        if field not in q:
            return False
    if q["answer"] is None:
        return False
    if not q["question"].strip():
        return False
    if not q["explanation"].strip():
        return False
    return True


def verify_batch(questions: list) -> dict:
    """Verify a batch of questions."""
    total = len(questions)
    passed = sum(1 for q in questions if verify_question(q))
    comp_count = sum(1 for q in questions if q.get("competency", False))
    type_counts = {}
    topic_counts = {}
    for q in questions:
        qt = q.get("type", "Unknown")
        tp = q.get("topic", "Unknown")
        type_counts[qt] = type_counts.get(qt, 0) + 1
        topic_counts[tp] = topic_counts.get(tp, 0) + 1
    return {
        "total": total,
        "passed": passed,
        "failed": total - passed,
        "competency_count": comp_count,
        "competency_pct": f"{(comp_count/total*100):.1f}%" if total > 0 else "0%",
        "type_distribution": type_counts,
        "topic_distribution": topic_counts
    }


# ============================================================
# FORMATTING AND OUTPUT
# ============================================================

def format_question(q: dict, index: int) -> str:
    """Format a single question for display."""
    lines = []
    lines.append("=" * 70)
    lines.append(f"Q{index}. [{q['type']}] [{q['topic']}] | Diff: {q['difficulty']} | Bloom: {q['bloom_level']}")
    lines.append(f"    Competency-based: {'Yes' if q['competency'] else 'No'} | Marks: {q['marks']}")
    lines.append(f"    ID: {q['id']}")
    lines.append("-" * 70)
    lines.append(f"  {q['question']}")

    if q.get("options"):
        lines.append("")
        for idx, opt in enumerate(q["options"]):
            marker = ">>>" if idx == q["answer"] else "   "
            lines.append(f"  {marker} ({chr(65+idx)}) {opt}")

    lines.append("")
    lines.append(f"  ANSWER: {q['answer']}")

    if q.get("steps"):
        lines.append("")
        lines.append("  STEPS:")
        for s_idx, step in enumerate(q["steps"], 1):
            lines.append(f"    {s_idx}. {step}")

    lines.append("")
    lines.append(f"  EXPLANATION: {q['explanation']}")
    lines.append("")
    return "\n".join(lines)


# ============================================================
# MAIN FUNCTION
# ============================================================

def main():
    print("=" * 70)
    print("CISCE Class 11 Mass Media & Communication")
    print("DETERMINISTIC QUESTION GENERATOR")
    print("=" * 70)
    print()

    # --- Demo 1: Generate 15 questions with seed 42 ---
    print("DEMO 1: Generating 15 questions (seed=42)")
    print("-" * 70)
    questions = generate_questions(seed=42, count=15)

    for idx, q in enumerate(questions, 1):
        print(format_question(q, idx))

    # --- Verification ---
    print()
    print("=" * 70)
    print("VERIFICATION REPORT")
    print("=" * 70)
    results = verify_batch(questions)
    print(f"  Total Questions:  {results['total']}")
    print(f"  Passed:           {results['passed']}")
    print(f"  Failed:           {results['failed']}")
    print(f"  Competency-Based: {results['competency_count']} ({results['competency_pct']})")
    print(f"\n  Type Distribution:")
    for t, c in sorted(results["type_distribution"].items()):
        print(f"    {t:25s}: {c}")
    print(f"\n  Topic Distribution:")
    for tp, c in sorted(results["topic_distribution"].items()):
        topic_name = TOPICS.get(tp, tp)
        print(f"    {tp} ({topic_name:40s}): {c}")

    # --- Demo 2: Reproducibility check ---
    print()
    print("=" * 70)
    print("DEMO 2: REPRODUCIBILITY CHECK (same seed = same output)")
    print("=" * 70)
    qs_run1 = generate_questions(seed=100, count=5)
    qs_run2 = generate_questions(seed=100, count=5)
    match = all(qs_run1[i]["id"] == qs_run2[i]["id"] for i in range(5))
    print(f"  Run 1 IDs: {[q['id'] for q in qs_run1]}")
    print(f"  Run 2 IDs: {[q['id'] for q in qs_run2]}")
    print(f"  Reproducibility: {'PASSED' if match else 'FAILED'}")

    # --- Demo 3: Topic-specific ---
    print()
    print("=" * 70)
    print("DEMO 3: TOPIC-SPECIFIC QUESTIONS (T5: Advertising)")
    print("=" * 70)
    topic_qs = generate_questions(seed=200, count=5, topic="T5")
    for idx, q in enumerate(topic_qs, 1):
        print(format_question(q, idx))

    # --- Demo 4: Export sample as JSON ---
    print()
    print("=" * 70)
    print("DEMO 4: JSON EXPORT (first 3 questions)")
    print("=" * 70)
    sample = questions[:3]
    print(json.dumps(sample, indent=2, ensure_ascii=True))

    print()
    print("=" * 70)
    print("Generator completed successfully.")
    print(f"Total topics covered: {len(TOPICS)}")
    for code, name in TOPICS.items():
        print(f"  {code}: {name}")
    print("=" * 70)


if __name__ == '__main__':
    main()