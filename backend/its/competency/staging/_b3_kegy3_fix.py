"""Add third concepts + WE to kegy301-306 catalogs."""
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _b3_build import concept, worked, step

OUT = os.path.dirname(os.path.abspath(__file__)) + "/"
STEPS = [{"step": 1, "action": "identify the tool or method",
          "explain": "Note the map element or technique the question asks about."},
         {"step": 2, "action": "apply the rule or procedure",
          "explain": "Follow the chapter's procedure or definition precisely."},
         {"step": 3, "action": "state the result or conclusion",
          "explain": "Summarise the answer with the correct map terminology."}]
V = "verify_property"

ADD = {
 "kegy301": concept("kegy.301.3.1", "Essential Elements and Conventions of Map Language",
   "Elements of maps", "Every map carries five essential elements of title, scale, direction shown by north line, legend or key of conventional signs, and date or source of data, and its language of symbols, colours and lines lets complex surface information be read quickly and uniformly.",
   "", "North is conventionally placed at the top and symbols are standardised so that any trained reader interprets the map identically.",
   "kegy301.txt map elements sections",
   ["list the essential elements of a map",
    "why is the legend called the key to the map",
    "how is direction shown on a map", "why are conventional signs used on maps",
    "what role does the title play in reading a map", "state the language of a map with examples"],
   V, STEPS),
 "kegy302": concept("kegy.302.3.1", "Uses of Scales and Their Choice for Different Maps",
   "Uses of scale", "The choice of scale depends on the purpose and extent of the map: large scales of 1:25,000 show cadastral detail, 1:50,000 topographical sheets serve field studies, and small scales of 1:1 million or more serve atlases and wall maps, since finer detail needs larger scale.",
   "", "Scale controls generalisation: small scale maps must omit and simplify features, while large scale maps preserve positional accuracy.",
   "kegy302.txt uses of scale sections",
   ["which scale suits a cadastral map and why",
    "differentiate large scale maps from small scale maps with examples",
    "what scale do topographical sheets of india use", "how does scale affect the detail shown on a map",
    "choose a suitable scale for an atlas map of a continent", "state the relation between scale and generalisation"],
   V, STEPS),
 "kegy303": concept("kegy.303.3.1", "Meridians, Zones and the Grid Reference System",
   "Grid reference", "The grid of parallels and meridians divides the globe into time and position zones, and on maps the grid reference of eastings and northings pinpoints any location to six figures, linking the spherical coordinate system to practical map reading.",
   "", "A six figure grid reference gives easting first and northing second, locating a point within 100 metres on a 1:50,000 sheet.",
   "kegy303.txt grid reference sections",
   ["define grid reference and state its use",
    "how is a six figure grid reference read", "which value comes first easting or northing",
    "how do meridians create time zones of the world",
    "explain the relation between the grid and map reading",
    "what is the precision of a four figure and a six figure reference"],
   V, STEPS),
 "kegy304": concept("kegy.304.3.1", "Drawing and Choosing Projections for Map Making",
   "Drawing projections",
   "Drawing a projection means constructing the graticule of parallels and meridians by geometry from the chosen properties, and the cartographer picks the projection after weighing the area to be mapped, its latitudinal position and the purpose of the map.",
   "", "For example, a zenithal equidistant projection serves a polar map, a polyconic suite serves India's topographical sheets and Mercator serves ocean route charts.",
   "kegy304.txt drawing and choosing sections",
   ["what steps are followed in drawing a projection's graticule",
    "which projection is used for maps of polar regions",
    "why does india use the polyconic projection for topo sheets",
    "how does the purpose of a map decide its projection",
    "state the properties of the conical projection with two standard parallels",
    "compare the graticule of cylindrical and conical projections"],
   V, STEPS),
 "kegy305": concept("kegy.305.3.1", "Interpretation of Human and Economic Features on Topo Sheets",
   "Interpreting topo sheets",
   "Beyond relief, topo sheets reveal settlement patterns of nucleated or dispersed villages, land use of cultivated and wasteland, transport routes, wells, tanks, temples and post offices, so the interpreter reconstructs the economy and life of the region from conventional signs.",
   "", "Green wash with field boundaries shows agriculture, blue tanks show irrigation, and lines of huts along roads show ribbon settlement.",
   "kegy305.txt interpretation sections",
   ["how do you identify settlement patterns on a topo sheet",
    "what do broken black rectangles on a topo sheet indicate",
    "interpret irrigation features shown on a topo sheet",
    "how can occupation of people be inferred from a topo sheet",
    "describe the road and rail symbols of topo sheets",
    "what signs indicate dry and perennial water sources"],
   V, STEPS),
 "kegy306": concept("kegy.306.3.1", "Electromagnetic Radiation and Interaction with Targets",
   "Electromagnetic radiation",
   "Remote sensing uses electromagnetic radiation ranging from visible light to infrared and microwave, and each surface target reflects or emits this energy differently by wavelength, so the interaction of radiation with water, vegetation and soil produces the spectral differences that sensors record.",
   "", "Healthy vegetation reflects strongly in the near infrared while water absorbs almost all radiation, which is why spectral bands are chosen for each application.",
   "kegy306.txt radiation interaction sections",
   ["define electromagnetic radiation and its spectrum used in sensing",
    "how do vegetation soil and water differ in spectral response",
    "why is near infrared useful for vegetation study",
    "state the stages of interaction of energy with the target",
    "what is a spectral band in satellite sensing",
    "compare reflection absorption and transmission of radiation"],
   V, STEPS),
}

WEX = (worked("exA", "kegy303.txt time calculation section", "kegy.303.1.1", "compute_local_time",
              "A place lies at {longitude_degrees} degrees east of Greenwich. If it is {gmt} o'clock GMT, calculate the local time of the place.",
              {"longitude_degrees": 60, "gmt": 12},
              [step(1, "convert longitude to local time offset",
                    "Divide the longitude in degrees by 15 to get the hours ahead of or behind Greenwich Mean Time",
                    "local_time = gmt + longitude_degrees / 15")]),
      worked("exB", "kegy303.txt time calculation section", "kegy.303.1.1", "compute_local_time",
              "A ship's position is {longitude_degrees} degrees west of the prime meridian where the time is {gmt} o'clock GMT. Find the local time of the ship.",
              {"longitude_degrees": 45, "gmt": 16},
              [step(1, "convert longitude to local time offset",
                    "Divide the longitude in degrees by 15 to get the hours ahead of or behind Greenwich Mean Time",
                    "local_time = gmt + longitude_degrees / 15")]))

for stem, extra in ADD.items():
    p = OUT + "catalog_class11_geography_" + stem + ".json"
    cat = json.load(open(p, encoding="utf-8"))
    if len(cat["concepts"]) < 3:
        cat["concepts"].append(extra)
    if stem == "kegy303":
        have = {w.get("concept") for w in cat.get("worked_examples") or []}
        if "kegy.303.1.1" not in have:
            cat["worked_examples"].extend(WEX)
    json.dump(cat, open(p, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("patched", stem)
