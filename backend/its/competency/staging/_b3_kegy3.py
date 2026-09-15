"""Build batch_3 geography catalogs part 3: kegy301-306."""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _b3_build import step, concept, worked, catalog, dump

SRC = "D:/node_generator/ncert-mcp/data/processed/text_cache_new/"
OUT = os.path.dirname(os.path.abspath(__file__)) + "/"
STEPS = [{"step": 1, "action": "identify the tool or method",
          "explain": "Note the map element or technique the question asks about."},
         {"step": 2, "action": "apply the rule or procedure",
          "explain": "Follow the chapter's procedure or definition precisely."},
         {"step": 3, "action": "state the result or conclusion",
          "explain": "Summarise the answer with the correct map terminology."}]
V = "verify_property"
C = "compute"


def sc(cid, title, definition, key_idea, ref, qps, *extra):
    return concept(cid, title, "", definition, "", key_idea, ref, qps, V, STEPS)


def build(stem, chap, title, concepts, wex, exercises):
    cat = catalog(11, "geography", chap, title, SRC + stem + ".txt", concepts, wex, exercises)
    dump(OUT + "catalog_class11_geography_" + stem + ".json", cat)


# kegy301 Introduction to Maps
c1 = sc("kegy.301.1.1", "Maps: Meaning, Types and Their Uses",
        "A map is a representation of the whole or part of the earth's surface drawn to scale on a plane, classified by scale into large scale cadastral and topographical maps and small scale wall and atlas maps, and by theme into physical and cultural maps serving planning, navigation and education.",
        "Maps carry a title, scale, direction, legend or key and conventional signs, so that any reader can decode the surface features accurately.",
        "kegy301.txt types and uses of maps sections",
        ["define a map and state its essential elements",
         "classify maps on the basis of scale and purpose", "differentiate large scale and small scale maps",
         "what are physical maps and cultural maps", "state the uses of maps in planning",
         "explain the legend or key of a map"])
c2 = sc("kegy.301.2.1", "Globes, Aerial Photographs and Remote Sensing as Map Sources",
        "A globe is the truest representation of the earth without scale distortion, aerial photographs taken from aircraft and satellite images from remote sensing supply raw data from which maps are compiled, and modern GIS stores and analyses these map layers digitally.",
        "Photographs and satellite data reduce field work and update maps quickly, while GIS overlays thematic layers for spatial analysis.",
        "kegy301.txt globe aerial photos sections",
        ["why is a globe called a true model of the earth",
         "how do aerial photographs help in map making", "what is remote sensing and its use in mapping",
         "define gis and its advantages over paper maps",
         "compare aerial photograph and satellite image", "state the limitations of a globe compared to a map"])
build("kegy301", 301, "Introduction to Maps", [c1, c2], [],
      [{"id": "exq1", "source_ref": "kegy301.txt exercises",
        "questions": ["Choose the correct answer about map types.",
         "What is a map? State its elements.",
        "Differentiate between large scale and small scale maps.",
        "How is remote sensing useful in map making?",
        "Write a note on GIS and its uses."]}])

# kegy302 Map Scale
c1 = concept("kegy.302.1.1", "Map Scale, Representative Fraction and Ground Distance",
        "Map scale", "Map scale expresses the ratio between map distance and ground distance as a statement, a representative fraction such as 1:50,000 or a linear graphical scale, and the actual ground distance equals the map distance multiplied by the scale value.",
        "actual_distance = map_distance * scale",
        "The representative fraction is unit free, so one inch on a 1:63,360 map means one mile on the ground.",
        "kegy302.txt methods of expressing scale section",
        ["define map scale and name the methods of expressing it",
         "calculate the ground distance from map distance and scale",
         "what is a representative fraction and why is it unit free",
         "convert a statement of scale into a representative fraction",
         "compare statement scale and graphical scale",
         "find the map distance for a given ground distance"],
        C, [step(1, "multiply map distance by scale",
                 "Multiply the distance measured on the map by the scale value to obtain the actual ground distance",
                 "actual_distance = map_distance * scale")])
c2 = sc("kegy.302.2.1", "Conversion of Scales and Construction of Graphical Scale",
        "Converting scales changes a statement or fraction from metric to English units or vice versa using the relation that one inch equals 2.54 cm, and a graphical linear scale is constructed with primary and secondary divisions so that distance can be read directly even after map enlargement or reduction.",
        "A graphical scale keeps its truth when the map is photographically enlarged or reduced, which is its great advantage over verbal and fractional scales.",
        "kegy302.txt conversion and graphical scale sections",
        ["convert a representative fraction into a statement of scale",
         "how is a linear or graphical scale constructed",
         "why is a graphical scale superior to a verbal scale",
         "state the relation between inch centimetre and mile kilometre",
         "draw a graphical scale for a given representative fraction",
         "what happens to each scale type when a map is enlarged"],
        V, STEPS)
cat = catalog(11, "geography", 302, "Map Scale", SRC + "kegy302.txt", [c1, c2],
              [worked("ex1", "kegy302.txt scale computation section", "kegy.302.1.1", "compute_ground_distance",
                      "On a map with a scale of 1 cm to {scale} km, two towns lie {map_distance} cm apart. Calculate the actual ground distance between them.",
                      {"map_distance": 6, "scale": 5},
                      [step(1, "multiply map distance by scale",
                            "Multiply the distance measured on the map by the scale value to obtain the actual ground distance",
                            "actual_distance = map_distance * scale")]),
               worked("ex2", "kegy302.txt scale computation section", "kegy.302.1.1", "compute_ground_distance",
                      "A road measures {map_distance} cm on a map drawn at a scale of 1 cm to {scale} km. Find the real length of the road.",
                      {"map_distance": 4.5, "scale": 2},
                      [step(1, "multiply map distance by scale",
                            "Multiply the distance measured on the map by the scale value to obtain the actual ground distance",
                            "actual_distance = map_distance * scale")])],
              [{"id": "exq1", "source_ref": "kegy302.txt exercises",
                "questions": ["Convert the given representative fraction into a statement of scale.",
                 "Construct a graphical scale for the given fraction.",
                "Calculate the actual distance between two places from map measurements.",
                "Distinguish between verbal and graphical scales.",
                "Why is the representative fraction called an international scale?"]}])
dump(OUT + "catalog_class11_geography_kegy302.json", cat)

# kegy303 Latitude, Longitude and Time
c1 = concept("kegy.303.1.1", "Latitude, Longitude and Their Grid", "",
        "Latitude is the angular distance north or south of the equator measured in degrees up to 90, longitude is the angular distance east or west of the Prime Meridian at Greenwich up to 180, and the grid of parallels and meridians fixes every place on the earth.",
        "local_time = gmt + longitude_degrees / 15",
        "Parallels stay equally spaced while meridians converge at the poles, and one degree of latitude always spans about 111 km.",
        "kegy303.txt latitude and longitude sections",
        ["define latitude and longitude with their ranges",
         "calculate the local time of a place from its longitude",
         "what is the prime meridian and where is it located",
         "differentiate parallels of latitude and meridians of longitude",
         "why is the degree of longitude shortest at the poles",
         "state the value of each degree of latitude in kilometres"],
        C, [step(1, "convert longitude to local time offset",
                 "Divide the longitude in degrees by 15 to get the hours ahead of or behind Greenwich Mean Time",
                 "local_time = gmt + longitude_degrees / 15")])
c2 = concept("kegy.303.2.1", "Time Difference, International Date Line and Standard Time", "",
        "The earth rotates 360 degrees in 24 hours, so one degree of longitude equals four minutes of time, and places east of Greenwich are ahead while places west are behind; the International Date Line near the 180 degree meridian changes the date when crossed, and countries adopt standard time zones of their chosen meridians.",
        "time_lag = longitude_difference * 4",
        "The time lag between two places equals their longitude difference in degrees multiplied by four minutes, and India's single IST spans about 30 degrees of longitude.",
        "kegy303.txt time and date line sections",
        ["calculate the time difference between two longitudes",
         "what is the international date line and its effect on dates",
         "why is a standard time adopted by countries",
         "compute the time lag in minutes from a given longitude difference",
         "why does the date change on crossing the 180 degree meridian",
         "explain the indian standard time meridian"],
        C, [step(1, "apply four minutes per degree",
                 "Multiply the difference of longitudes in degrees by 4 to get the time lag in minutes",
                 "time_lag = longitude_difference * 4")])
cat = catalog(11, "geography", 303, "Latitude, Longitude and Time", SRC + "kegy303.txt", [c1, c2],
              [worked("ex1", "kegy303.txt time calculation section", "kegy.303.2.1", "compute_time_lag",
                      "Two cities differ in longitude by {longitude_difference} degrees. Calculate the time lag between them in minutes.",
                      {"longitude_difference": 30},
                      [step(1, "apply four minutes per degree",
                            "Multiply the difference of longitudes in degrees by 4 to get the time lag in minutes",
                            "time_lag = longitude_difference * 4")]),
               worked("ex2", "kegy303.txt time calculation section", "kegy.303.2.1", "compute_time_lag",
                      "A ship sails from a port to another port {longitude_difference} degrees of longitude away. Find the time difference the navigator must allow, in minutes.",
                      {"longitude_difference": 45},
                      [step(1, "apply four minutes per degree",
                            "Multiply the difference of longitudes in degrees by 4 to get the time lag in minutes",
                            "time_lag = longitude_difference * 4")])],
              [{"id": "exq1", "source_ref": "kegy303.txt exercises",
                "questions": ["What is the latitudinal and longitudinal extent of India?",
                "Calculate the local time of a place from its longitude.",
                "Why is the International Date Line not a straight line?",
                "Define parallels and meridians with diagrams.",
                "How many minutes does the earth take to rotate through one degree?"]}])
dump(OUT + "catalog_class11_geography_kegy303.json", cat)

# kegy304 Map Projections
c1 = sc("kegy.304.1.1", "Map Projection: Need, Properties and Classification",
        "A map projection is the systematic drawing of the parallels and meridians of the globe on a flat surface, unavoidable because a sphere cannot be flattened without distortion; projections are classified by developing surface into cylindrical, conical and zenithal or azimuthal families, and by preservation into equal area, true shape and equidistant types.",
        "", "No projection can keep area, shape and distance all true at once, so each projection is chosen for the purpose of the map.",
        "kegy304.txt need and classification sections",
        ["define map projection and explain its need",
         "classify projections by the developing surface", "differentiate equal area and orthomorphic projections",
         "what is meant by the developing surface of a projection", "name the properties a good projection should preserve",
         "why does every projection distort the earth's surface"])
c2 = sc("kegy.304.2.1", "Types of Projections and Their Suitability",
        "Zenithal projections suit polar areas, cylindrical projections like Mercator suit equatorial regions and navigation with true directions, conical projections with one or two standard parallels suit mid latitude countries, and Bonne's projection suits equal area mapping of a continent.",
        "", "Mercator keeps directions true with growing area towards poles, while Sanson-Flamsteed and Bonne keep areas true for distribution maps.",
        "kegy304.txt projection types sections",
        ["compare cylindrical conical and zenithal projections",
         "why is mercator projection best for navigation", "which projection suits a mid latitude country and why",
         "describe the bonne projection and its use", "what is a zenithal projection suited for polar areas",
         "choose a suitable projection for a distribution map"])
build("kegy304", 304, "Map Projections", [c1, c2], [],
      [{"id": "exq1", "source_ref": "kegy304.txt exercises",
        "questions": ["What is a map projection and why is it needed?",
         "Classify projections according to their developing surfaces.",
        "Explain the properties of Mercator projection.",
        "Which projection would you use for a map of India and why?",
        "Differentiate between equal area and correct shape projections."]}])

# kegy305 Topographical Maps
c1 = sc("kegy.305.1.1", "Topographical Maps: Conventional Signs, Colours and Marginal Information",
        "Topographical maps drawn by the Survey of India on scales of 1:250,000, 1:50,000 and 1:25,000 show relief by contours and spot heights, and use conventional signs in colours of black for names, blue for water, brown for contours, green for vegetation, red and yellow for roads and settlements, with marginal information of sheet number, scale and administrative details.",
        "", "Reading the margin first tells the sheet number, scale, grid references and the administrative data of the mapped area.",
        "kegy305.txt signs and marginal information sections",
        ["state the meaning and uses of topographical maps",
         "name the colours used on topo sheets and what they show",
         "describe the marginal information of a topo sheet",
         "what are conventional signs and why are they used",
         "which scales does the survey of india use for topo maps",
         "how are settlements and roads shown on a topo sheet"])
c2 = sc("kegy.305.2.1", "Reading Relief: Contours, Slopes and Drainage on Topo Sheets",
        "Contours join points of equal height, and their spacing and pattern reveal concave, convex, uniform and terraced slopes, V-shaped contours crossing rivers, hills, plateaus, ridges, spurs, passes and valleys, so the physical and cultural landscape of the mapped region can be reconstructed from the sheet.",
        "", "Closely spaced contours mean steep slope, wide spacing means gentle slope, and evenly spaced contours mean uniform slope.",
        "kegy305.txt contour reading sections",
        ["define contour and contour interval",
         "identify types of slopes from contour spacing", "how do contours show a valley and a ridge",
         "describe the drainage pattern visible on a topo sheet", "what do V shaped contours pointing upstream indicate",
         "read the human features like wells tanks and temples on a topo sheet"])
build("kegy305", 305, "Topographical Maps", [c1, c2], [],
      [{"id": "exq1", "source_ref": "kegy305.txt exercises",
        "questions": ["What are topographical maps? State their uses.",
         "Name the colours used on a topo sheet and their meanings.",
        "How do contours indicate the nature of slopes?",
        "Explain the marginal information given on a topo sheet.",
        "Describe the drainage pattern of the given topo sheet."]}])

# kegy306 Introduction to Remote Sensing
c1 = sc("kegy.306.1.1", "Remote Sensing: Concept, Stages and Platforms",
        "Remote sensing is the science of acquiring information about the earth's surface without physical contact, using electromagnetic energy through stages of energy source, interaction with the target, recording by sensors on platforms like aircraft and satellites, transmission, processing and interpretation into images and maps.",
        "", "Sensors record reflected sunlight in the visible and infrared bands or emit their own microwave energy, giving passive and active systems like radar.",
        "kegy306.txt concept and stages sections",
        ["define remote sensing and state its stages",
         "differentiate passive and active remote sensing", "what are the platforms used in remote sensing",
         "name the ideal characteristics of electromagnetic radiation for sensing",
         "explain the role of sensors in remote sensing", "how does a satellite image reach the user as a map"])
c2 = sc("kegy.306.2.1", "Indian Remote Sensing Satellites and Applications",
        "India's IRS satellite series launched by ISRO supplies images used in agriculture, forestry, water resources, land use, drought and flood monitoring, and multispectral digital data processed into false colour composites lets interpreters identify features by their spectral signatures.",
        "", "False colour composite images show vegetation in red, and the digital data support computer classification and GIS integration for planning.",
        "kegy306.txt irs and applications sections",
        ["name the indian remote sensing satellites and their uses",
         "what is a false colour composite image", "explain spectral signature and its use in identification",
         "state the applications of remote sensing in agriculture and forestry",
         "how does remote sensing help in drought and flood monitoring",
         "compare visual and digital interpretation of satellite data"])
build("kegy306", 306, "Introduction to Remote Sensing", [c1, c2], [],
      [{"id": "exq1", "source_ref": "kegy306.txt exercises",
        "questions": ["What is remote sensing? State its stages.",
         "Name the platforms used in remote sensing.",
        "Differentiate between active and passive remote sensing.",
        "Explain the applications of remote sensing in India.",
        "What is a false colour composite and how is it read?"]}])
print("kegy part 3 done")
