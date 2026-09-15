# Batch 5 drafts: legy301-304 (Practical Work in Geography Part 2)
import _b5_helper as H

# ---------------- legy301: Data Sources and Compilation ---------------- #
C = [
 H.concept("legy.301.1", "Sources of Data: Primary and Secondary",
  "Sources of Data",
  "Data for geographic study come from primary sources collected in the field "
  "by the researcher through surveys, interviews and observation, and "
  "secondary sources already compiled by others such as the Census of India, "
  "National Sample Survey and government registers.",
  "",
  "Primary data fit the exact question asked but cost time; secondary data "
  "are cheap and comparable but may not match the study's needs.",
  "legy301.txt primary and secondary data sources and census-NSS references",
  ["distinguish primary and secondary sources of data",
   "name the major secondary sources for Indian geography",
   "what methods collect primary data in the field",
   "why is the census a key secondary source",
   "evaluate the reliability of secondary data",
   "give examples of government registers as data sources"],
  "verify_property",
  [H.vstep(1, "sort the sources", "field-collected data are primary; census and survey records are secondary"),
  H.vstep(2, "weigh the trade-off", "primary data cost effort but fit the purpose exactly"),
  H.vstep(3, "close with comparability", "secondary series like census decades allow long-run comparison")]),
 H.concept("legy.301.2", "Compilation and Tabulation of Data", "Compilation of Data",
  "Compilation arranges collected figures into tables with title, columns of "
  "head notes, stub and caption, source note; data are first classified into "
  "categories and then entered systematically so that analysis becomes "
  "possible.",
  "percentage_share = part_value * 100 / total_value",
  "The percentage share of any item in a table equals the part value times "
  "one hundred divided by the total value.",
  "legy301.txt compilation, tabulation parts and percentage calculation",
  ["list the parts of a statistical table",
   "compute the percentage share of a table item",
   "how is data classified before tabulation",
   "what goes into the caption and stub of a table",
   "why must a table carry a source note",
   "differentiate qualitative and quantitative classification"],
  "compute",
  [H.cstep(1, "state the ratio", "share equals part over total", "share_ratio = part_value / total_value"),
   H.cstep(2, "convert to percentage", "multiply the ratio by one hundred", "percentage_share = part_value * 100 / total_value")]),
 H.concept("legy.301.3", "Census and National Sample Survey as Sources",
  "Sources of Data",
  "The Census of India gives a complete decennial count of population, houses "
  "and economic activity, while the National Sample Survey Organisation "
  "collectives representative household data on consumption, employment and "
  "land holding through periodic rounds; both anchor secondary geographic "
  "analysis.",
  "",
  "Census gives completeness, NSS gives depth - together they cover most "
  "socio-economic questions a geographer asks.",
  "legy301.txt census rounds and National Sample Survey description",
  ["what does the Census of India record and how often",
   "what does the National Sample Survey collect",
   "compare complete enumeration with sample surveys",
   "why are census decades useful for trend study",
   "state limitations of census data for detailed analysis",
   "which agency runs the National Sample Survey"],
  "verify_property",
  [H.vstep(1, "define the two series", "census enumerates all households; NSS samples representative ones"),
  H.vstep(2, "match use to source", "density and literacy come from census; consumption patterns from NSS rounds"),
  H.vstep(3, "close with periodicity", "ten-year census and survey rounds frame India's data timeline")]),
 H.concept("legy.301.4", "Presentation Modes of Data", "Modes of Presentation",
  "Compiled data may be presented as tables, graphs, diagrams and maps; the "
  "choice depends on the nature of data and purpose - tables give exactness, "
  "graphs show trends, maps show spatial distribution.",
  "",
  "Choosing the right presentation mode turns numbers into arguments a reader "
  "can see.",
  "legy301.txt presentation of data modes discussion",
  ["list the modes of presenting data",
   "when is a table preferable to a graph",
   "why are maps chosen for spatial data",
   "match data type with presentation mode",
   "what makes a graph communicative",
   "give an example of map presentation of census data"],
  "verify_property",
  [H.vstep(1, "list the modes", "tables, graphs, diagrams and maps are the presentation choices"),
  H.vstep(2, "match purpose", "trend questions need graphs, location questions need maps"),
  H.vstep(3, "close with clarity", "the mode must serve the message, not decorate it")]),
]
W = [H.we("we_legy301_1", "legy301.txt percentage compilation passage", "legy.301.2",
  "A district records 4,80,000 literates out of a population of 12,00,000. "
  "Compute the percentage share of literates.",
  {"part_value": 480000, "total_value": 1200000},
  [H.cstep(1, "state the ratio", "share = part / total", "share_ratio = part_value / total_value"),
   H.cstep(2, "convert to per cent", "multiply by one hundred", "percentage_share = part_value * 100 / total_value")]),
 H.we("we_legy301_2", "legy301.txt sources sections", "legy.301.1",
  "Classify these into primary and secondary sources: field questionnaire, "
  "Census of India, village interview, NSS report.",
  {},
  [H.vstep(1, "primary group", "field questionnaire and village interviews are collected by the researcher"),
   H.vstep(2, "secondary group", "Census and NSS reports are compiled by agencies"),
   H.vstep(3, "contrast", "the first two fit the exact question, the second two give comparability")],
  qtype="short_answer"),
 H.we("we_legy301_3", "legy301.txt presentation modes", "legy.301.4",
  "Choose a presentation mode for three data types: temperature trend, "
  "land-use shares, soil texture regions.",
  {},
  [H.vstep(1, "trend data", "a line graph shows the temperature trend over years"),
   H.vstep(2, "share data", "a pie diagram displays land-use shares"),
   H.vstep(3, "spatial data", "a choropleth map shows soil texture regions")],
  qtype="short_answer")]
E = [H.ex("ex_legy301_1", "legy301.txt end-of-chapter exercises, reworded",
          ["distinguish primary and secondary data with examples",
           "compute the percentage share of an item in a data table",
           "describe the parts of a statistical table",
           "explain the role of census and NSS in geographic study",
           "match presentation modes with data types"]),
     H.ex("ex_legy301_2", "ex legy301 applied questions, reworded",
          ["plan a field survey for village land use",
           "evaluate census limitations for small area study",
           "convert a raw table into a percentage table",
           "criticise a table missing its source note",
           "relate data classification to analysis quality"])]
H.emit("legy301", H.make_cat("legy301", "Data: Sources and Compilation", C, W, E))

# ---------------- legy302: Data Processing ---------------- #
C = [
 H.concept("legy.302.1", "Measures of Central Tendency", "Measures of Central Tendency",
  "A measure of central tendency summarises a data series by one typical "
  "value: the arithmetic mean divides the sum of values by their number, the "
  "median is the middle value of the ordered series, and the mode is the most "
  "frequently occurring value.",
  "mean_value = sum_of_values / number_of_values",
  "The arithmetic mean equals the sum of all values divided by how many "
  "values there are.",
  "legy302.txt mean, median and mode definitions and computation",
  ["define mean, median and mode",
   "compute the mean of a given data series",
   "when is the median preferred over the mean",
   "find the mode of a frequency distribution",
   "what does central tendency summarise in data",
   "which measure is affected most by extreme values"],
  "compute",
  [H.cstep(1, "add the values", "the numerator of the mean is the sum of the series", "sum_of_values = value_1 + value_2 + value_3"),
   H.cstep(2, "divide by the count", "the mean is sum over count", "mean_value = sum_of_values / number_of_values")]),
 H.concept("legy.302.2", "Computing the Median", "Median",
  "The median is found by arranging values in ascending order and taking the "
  "middle value; for an even number of observations the median is the average "
  "of the two middle values, making it resistant to extremes.",
  "median_even = (middle_low + middle_high) / 2",
  "With an even number of ordered values the median is the average of the "
  "two central values.",
  "legy302.txt median computation steps",
  ["state the steps to find the median",
   "compute the median for even and odd counts",
   "why is the median called a positional measure",
   "compare median and mean for skewed rainfall data",
   "find the median from a frequency table",
   "give a geographic example where median fits better"],
  "compute",
  [H.cstep(1, "take the two middle values", "order the series and pick the central pair", "middle_low = 1"),
   H.cstep(2, "average them", "their average is the median", "median_even = (middle_low + middle_high) / 2")]),
 H.concept("legy.302.3", "Measures of Dispersion", "Measures of Dispersion",
  "Dispersion measures how values spread around the central value; the range "
  "is the difference between the largest and smallest values, the mean "
  "deviation averages absolute distances from the mean, and the standard "
  "deviation squares distances before averaging, giving the most used "
  "spread measure.",
  "range_value = largest_value - smallest_value",
  "The range of a data series is the largest value minus the smallest value.",
  "legy302.txt range, mean deviation and standard deviation sections",
  ["define range and compute it for a series",
   "what does a high standard deviation indicate",
   "contrast mean deviation and standard deviation",
   "why is dispersion needed alongside central tendency",
   "compute the range of monthly rainfall values",
   "relate dispersion to reliability of the mean"],
  "compute",
  [H.cstep(1, "identify the extremes", "the largest and smallest values bound the spread", "largest_value = 1"),
   H.cstep(2, "subtract smallest from largest", "the difference is the range", "range_value = largest_value - smallest_value")]),
 H.concept("legy.302.4", "Processing Steps for Geographic Data",
  "Processing of Data",
  "Data processing runs from editing and coding collected figures, "
  "classifying them into class intervals, tallying frequencies and computing "
  "summary measures, so that raw field sheets become analysable frequency "
  "tables ready for graphs and maps.",
  "",
  "Classification into class intervals is the bridge between raw numbers and "
  "every table, graph and map that follows.",
  "legy302.txt editing, classification and frequency table sections",
  ["list the steps of data processing",
   "how are class intervals chosen",
   "construct a frequency table from raw scores",
   "what is tally marking",
   "why edit data before processing",
   "relate frequency tables to later mapping"],
  "verify_property",
  [H.vstep(1, "sequence the steps", "editing, coding, classification, tally and summary form the processing chain"),
  H.vstep(2, "explain intervals", "class intervals group values so frequencies become visible"),
  H.vstep(3, "close with output", "the frequency table feeds every later diagram and map")]),
]
W = [H.we("we_legy302_1", "legy302.txt mean computation section", "legy.302.1",
  "Five villages record rainfall of 62, 58, 71, 69 and 60 cm. Compute the "
  "mean rainfall.",
  {"value_1": 62, "value_2": 58, "value_3": 71, "number_of_values": 5},
  [H.cstep(1, "add the values", "62 + 58 + 71 gives the running sum", "sum_of_values = value_1 + value_2 + value_3"),
   H.cstep(2, "divide by five", "sum over five villages is the mean", "mean_value = sum_of_values / number_of_values")]),
 H.we("we_legy302_2", "legy302.txt range section", "legy.302.3",
  "Monthly rainfall ranges from 3 cm in January to 31 cm in July. Compute the "
  "range.",
  {"largest_value": 31, "smallest_value": 3},
  [H.cstep(1, "identify extremes", "largest 31, smallest 3", "largest_value = 31"),
   H.cstep(2, "subtract", "31 - 3 = 28 cm is the range", "range_value = largest_value - smallest_value")]),
 H.we("we_legy302_3", "legy302.txt median section", "legy.302.2",
  "Find the median of the ordered series 4, 7, 9, 12, 15, 18.",
  {"middle_low": 9, "middle_high": 12},
  [H.cstep(1, "take the central pair", "the series has six values, so the middle pair is 9 and 12", "middle_low = 9"),
   H.cstep(2, "average the pair", "(9 + 12) / 2 = 10.5 is the median", "median_even = (middle_low + middle_high) / 2")]),
]
E = [H.ex("ex_legy302_1", "legy302.txt end-of-chapter exercises, reworded",
          ["compute the mean of a given rainfall series",
           "find the median of an even-numbered data set",
           "compute the range and interpret dispersion",
           "construct a frequency table with class intervals",
           "explain which measure of central tendency suits skewed data"]),
     H.ex("ex_legy302_2", "legy302.txt applied questions, reworded",
          ["argue why the mean misleads with extreme values",
           "process a raw field sheet into a frequency table",
           "compare mean deviation and standard deviation",
           "relate dispersion to crop risk assessment",
           "choose summary measures for a village income survey"])]
H.emit("legy302", H.make_cat("legy302", "Data Processing", C, W, E))

# ---------------- legy303: Graphical Representation of Data ---------------- #
C = [
 H.concept("legy.303.1", "Choosing Graphs and Diagrams", "Choice of Diagrams",
  "Graphic representation turns processed data into line graphs for trends, "
  "bar diagrams for comparison, pie diagrams for shares and pictograms for "
  "popular communication; the choice depends on the nature of data and the "
  "message intended.",
  "",
  "Each diagram answers a different question: lines ask how it changed, bars "
  "ask how they compare, pies ask how it divides.",
  "legy303.txt types of diagrams and their choice sections",
  ["name the major types of diagrams for data presentation",
   "when should a line graph be used",
   "what data suit a pie diagram",
   "compare simple, multiple and compound bar diagrams",
   "why are pictograms effective for public communication",
   "match geographic data sets with diagram types"],
  "verify_property",
  [H.vstep(1, "list the types", "line graphs, bar diagrams, pie diagrams and pictograms are the core set"),
  H.vstep(2, "match data to diagram", "time series take lines, component shares take pies"),
  H.vstep(3, "close with purpose", "the message chooses the medium, not fashion")]),
 H.concept("legy.303.2", "Constructing a Pie Diagram", "Pie Diagram",
  "A pie diagram divides a circle of 360 degrees among component shares; the "
  "angle for each component equals its share of the total multiplied by 360 "
  "divided by 100 when shares are percentages, and the sectors are then "
  "arranged and shaded distinctly.",
  "sector_angle = component_share * 360 / 100",
  "Multiplying each percentage share by 3.6 gives its sector angle in degrees.",
  "legy303.txt pie diagram construction and angle calculation",
  ["state the formula for a pie diagram's sector angle",
   "compute angles for a three-component share",
   "draw a pie diagram for land use shares",
   "why must pie sectors total 360 degrees",
   "compare pie diagrams with stacked bars",
   "what labelling does a pie diagram need"],
  "compute",
  [H.cstep(1, "record the component share", "shares are given as percentages summing to 100", "component_share = 25"),
   H.cstep(2, "scale to the circle", "each percentage point is 3.6 degrees", "sector_angle = component_share * 360 / 100")]),
 H.concept("legy.303.3", "Line Graphs and Bar Diagrams", "Line Graphs and Bar Diagrams",
  "Line graphs plot values against a continuous axis, ideal for temperature "
  "and rainfall trends over months or years; bar diagrams raise rectangles of "
  "equal width whose lengths are proportional to values, simple bars for one "
  "series, multiple bars for comparison and compound bars for totals with "
  "components.",
  "",
  "The y-axis scale decides honesty: too large a scale exaggerates change, "
  "too small hides it.",
  "legy303.txt line graph construction and bar diagram types",
  ["construct a line graph from monthly temperature data",
   "differentiate simple, multiple and compound bar diagrams",
   "what rules govern bar width and spacing",
   "how does axis scaling affect the impression of change",
   "draw a compound bar for male-female population",
   "give a geographic example for a multiple bar diagram"],
  "verify_property",
  [H.vstep(1, "draw the line", "plot month against temperature and join the points"),
  H.vstep(2, "raise the bars", "equal-width rectangles carry proportional lengths"),
  H.vstep(3, "close with scale", "sensible scales keep the picture truthful")]),
 H.concept("legy.303.4", "Thematic Maps as Data Presentation", "Maps for Data Presentation",
  "Maps present spatial data through dot maps for distribution, "
  "choropleth maps for density ratios by units, and isopleth maps joining "
  "equal values like contour lines; the choice follows whether data are "
  "points, ratios or continuous surfaces.",
  "",
  "Geography's signature diagram is the map: dots count, shades compare and "
  "isolines connect.",
  "legy303.txt dot, choropleth and isopleth map sections",
  ["differentiate dot, choropleth and isopleth maps",
   "what data suit a dot map",
   "why do choropleth maps need ratio data",
   "interpret an isopleth map of rainfall",
   "state the rules of dot value selection",
   "give examples of each map type from Indian data"],
  "verify_property",
  [H.vstep(1, "sort the maps", "dots for totals, choropleth for ratios, isopleths for surfaces"),
  H.vstep(2, "apply the rule", "population totals take dots, density takes choropleth shading"),
  H.vstep(3, "close with reading", "each map type carries its own legend discipline")]),
]
W = [H.we("we_legy303_1", "legy303.txt pie diagram section", "legy.303.2",
  "A district's land use has forest 25 per cent, cropland 50 per cent and "
  "other 25 per cent. Compute the sector angles for cropland.",
  {"component_share": 50},
  [H.cstep(1, "record the share", "cropland holds 50 per cent", "component_share = 50"),
   H.cstep(2, "scale to degrees", "50 times 3.6 gives 180 degrees", "sector_angle = component_share * 360 / 100")]),
 H.we("we_legy303_2", "legy303.txt bar diagram section", "legy.303.3",
  "Choose diagram types for three data sets: annual wheat output over ten "
  "years, state-wise literacy comparison, and sectoral composition of workers.",
  {},
  [H.vstep(1, "trend over years", "a line graph traces the wheat output trend"),
   H.vstep(2, "state comparison", "multiple bar diagrams compare state literacy rates"),
   H.vstep(3, "composition", "a compound bar or pie shows the worker composition")],
  qtype="short_answer"),
 H.we("we_legy303_3", "legy303.txt map types section", "legy.303.4",
  "Which map type suits each: village livestock counts, state population "
  "density, atmospheric pressure fields?",
  {},
  [H.vstep(1, "counts", "a dot map places one dot per hundred animals"),
   H.vstep(2, "density ratio", "a choropleth map shades states by persons per sq km"),
   H.vstep(3, "continuous field", "isobars join equal pressure values")],
  qtype="short_answer")]
E = [H.ex("ex_legy303_1", "legy303.txt end-of-chapter exercises, reworded",
          ["compute sector angles for a given pie diagram data set",
           "draw a line graph from monthly temperature data",
           "differentiate simple, multiple and compound bars",
           "choose map types for three data sets",
           "criticise a poorly scaled graph"]),
     H.ex("ex_legy303_2", "legy303.txt applied questions, reworded",
          ["present your district's land use as a pie diagram",
           "design a dot map of village population",
           "explain why choropleth maps need ratio data",
           "relate isopleths to physical geography maps",
           "argue the role of graphics in geographic writing"])]
H.emit("legy303", H.make_cat("legy303", "Graphical Representation of Data", C, W, E))

# ---------------- legy304: Use of Computers in Data Processing and Mapping ---------------- #
C = [
 H.concept("legy.304.1", "Computer System: Hardware and Software",
  "Computer System",
  "A computer system combines hardware - the physical units of input, "
  "central processing, memory and output - with software, the programmes that "
  "instruct it; system software manages the machine while application "
  "software such as databases and spreadsheets does the user's work.",
  "",
  "Input, processing, storage and output form the data cycle every computer "
  "runs, whether desktop or server.",
  "legy304.txt hardware components and software types sections",
  ["name the hardware components of a computer system",
   "differentiate system software from application software",
   "what does the central processing unit do",
   "compare primary and secondary memory",
   "list input and output devices used in mapping work",
   "why is software the set of instructions for hardware"],
  "verify_property",
  [H.vstep(1, "split the system", "hardware is physical machinery, software is its instructions"),
  H.vstep(2, "trace the data cycle", "data enter, are processed, stored and output as tables or maps"),
  H.vstep(3, "close with memory", "primary memory works instantly, secondary memory stores permanently")]),
 H.concept("legy.304.2", "Databases for Geographic Data", "Database Management Systems",
  "A database management system stores geographic data as organised tables of "
  "records and fields that can be sorted, queried and joined; attributes of "
  "villages, districts or weather stations sit in rows that software can "
  "filter and summarise instantly.",
  "",
  "Structured tables turn repetitive clerical work - sorting, totalling, "
  "searching - into single commands.",
  "legy304.txt database structure and query discussion",
  ["define a database and a database management system",
   "what are records and fields in a data table",
   "how does a query filter database records",
   "explain sorting and joining of tables",
   "why do geographers need databases for census data",
   "give an example of an attribute table for districts"],
  "verify_property",
  [H.vstep(1, "structure the table", "rows hold records for each village or district, columns hold fields like literacy"),
  H.vstep(2, "query the data", "a query selects records meeting a condition, such as density above a threshold"),
  H.vstep(3, "close with joining", "joining attribute tables to map units powers thematic mapping")]),
 H.concept("legy.304.3", "Computer-Assisted Computation", "Data Processing with Computers",
  "Spreadsheet-style software computes means, totals and ratios over entire "
  "columns at once; entering village populations and areas, the computer "
  "evaluates the density for every row and even averages the results, "
  "replacing hours of manual arithmetic.",
  "average_density = sum_of_densities / number_of_rows",
  "The computer evaluates average density as the sum of all row densities "
  "divided by the number of rows.",
  "legy304.txt computation capabilities and data processing with computers",
  ["how does spreadsheet software compute column totals",
   "compute average density over a set of district rows",
   "why is computer computation less error-prone",
   "state the steps of a computed column in a data table",
   "compare manual and computer data processing",
   "what functions summarise a data column quickly"],
  "compute",
  [H.cstep(1, "sum the row values", "the software totals the density column", "sum_of_densities = density_1 + density_2 + density_3"),
   H.cstep(2, "divide by the row count", "the average over all rows gives the overall density", "average_density = sum_of_densities / number_of_rows")]),
 H.concept("legy.304.4", "Computer Mapping and Its Advantages", "Computer Mapping",
  "Computer mapping converts attribute tables into thematic maps "
  "automatically - choropleth shades, dot patterns and symbols drawn to "
  "scale - allowing quick redesign of classes, colours and layouts, which "
  "manual cartography achieved only through slow redrafting.",
  "",
  "Digital maps are editable arguments: change the classification and the "
  "same data argues differently, in minutes.",
  "legy304.txt computer mapping capabilities and advantages sections",
  ["how does software convert data tables into thematic maps",
   "list the advantages of computer mapping over manual maps",
   "what map elements can be redesigned digitally",
   "explain choropleth shading by computer",
   "relate databases to computer maps",
   "state the limitations of computer mapping"],
  "verify_property",
  [H.vstep(1, "join data to map", "attribute tables link to area units for shading"),
  H.vstep(2, "redesign quickly", "classes, colours and legends change without redrafting"),
  H.vstep(3, "close with output", "print-quality thematic maps emerge from the same table")]),
]
W = [H.we("we_legy304_1", "legy304.txt computation section", "legy.304.3",
  "Three district rows carry densities 320, 410 and 390 persons per sq km. "
  "Compute the average density.",
  {"density_1": 320, "density_2": 410, "density_3": 390, "number_of_rows": 3},
  [H.cstep(1, "sum the densities", "320 + 410 + 390 gives the column total", "sum_of_densities = density_1 + density_2 + density_3"),
   H.cstep(2, "divide by rows", "total over three rows is the average", "average_density = sum_of_densities / number_of_rows")]),
 H.we("we_legy304_2", "legy304.txt database section", "legy.304.2",
  "Design a district attribute table: name its fields and give one query.",
  {},
  [H.vstep(1, "name the fields", "district, population, area, density, literacy rate"),
   H.vstep(2, "write the query", "select districts where density exceeds 500 persons per sq km"),
   H.vstep(3, "conclusion", "the filtered rows become inputs for a choropleth map")],
  qtype="short_answer"),
 H.we("we_legy304_3", "legy304.txt computer mapping section", "legy.304.4",
  "Give two advantages of computer mapping over manual cartography.",
  {},
  [H.vstep(1, "speed of revision", "changing classification or colours needs no redrafting"),
   H.vstep(2, "accuracy and storage", "digital maps store exactly and reproduce identically"),
   H.vstep(3, "conclusion", "revision speed invites experimentation with map arguments")],
  qtype="short_answer")]
E = [H.ex("ex_legy304_1", "legy304.txt end-of-chapter exercises, reworded",
          ["name hardware components and software types",
           "compute average density over computer-stored district rows",
           "explain database records, fields and queries",
           "describe how computers draw thematic maps",
           "list advantages and limitations of computer mapping"]),
     H.ex("ex_legy304_2", "legy304.txt applied questions, reworded",
          ["plan a computer workflow from field data to map",
           "relate spreadsheets to geographic data processing",
           "evaluate digital maps for school projects",
           "design queries for a census attribute table",
           "discuss GIS as an extension of computer mapping"])]
H.emit("legy304", H.make_cat("legy304", "Use of Computer in Data Processing and Mapping", C, W, E))

print("legy3 done")
