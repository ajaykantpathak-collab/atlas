"""Build concept catalog for Class 8 Maths Chapter 13 (Introduction to Graphs).
Extracted from hemh113.txt -- NCERT Class 8 Maths textbook (Reprint 2024-25).
"""
import json
import os

CATALOG = {
    "class": 8,
    "subject": "maths",
    "chapter": 13,
    "chapter_title": "Introduction to Graphs",
    "source_file": "D:/node_generator/ncert-mcp/data/processed/text_cache/hemh113.txt",
    "concepts": [
        {
            "id": "c8m13.1.1",
            "title": "Line Graphs",
            "section": "13.1.1",
            "definition": "A line graph displays data that changes continuously over periods of time. For example a doctor's record of body temperature taken every four hours may be called a time-temperature graph. The horizontal line (usually called the x-axis) shows the timings and the vertical line (the y-axis) shows the other quantity. Each piece of data is shown by a point on the square grid; the points are then connected by line segments.",
            "formula": "line graph = data points joined by line segments over time",
            "key_idea": "Line graphs show data that changes continuously over time.",
            "textbook_ref": "hemh113.txt lines 13-35, 322-324",
            "question_patterns": [
                "what is a line graph",
                "the graph shows the temperature of a patient what was the temperature at 1 pm",
                "when was the patient's temperature 38.5",
                "during which periods did the temperature show an upward trend",
                "what information is given on the two axes",
                "read the time temperature graph",
                "what does the line graph display",
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "read the axes",
                    "explain": "The x-axis shows the time, the y-axis shows the measured quantity",
                },
                {
                    "step": 2,
                    "action": "locate the point",
                    "explain": "Find the time on the x-axis and read the value on the y-axis",
                },
                {
                    "step": 3,
                    "action": "describe the trend",
                    "explain": "Rising or falling segments show the trend between readings",
                },
            ],
        },
        {
            "id": "c8m13.1.2",
            "title": "Reading Values from a Graph",
            "section": "13.1.1",
            "definition": "From a line graph we can read values, compare them and compute differences. For example the temperature increased by 3 degrees C (= 40 - 37) during the period 6 a.m. to 10 a.m. From a distance-time graph the distance covered during an hour is the difference of the readings, e.g. during the 2nd hour the car covered 100 km (150 - 50).",
            "formula": "change = later reading - earlier reading",
            "key_idea": "Subtract graph readings to find how much a quantity changed.",
            "textbook_ref": "hemh113.txt lines 31-35, 83-99, 100-160",
            "question_patterns": [
                "compute the difference between the sales in 2002 and 2006",
                "how much did plant A grow during the 3rd week",
                "how far did the car go in the first hour",
                "in which year was there the greatest difference between the sales",
                "what were the sales in 2002 and 2006",
                "how much distance did the car cover during the given period",
                "were the two plants of the same height during any week",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "read the first value",
                    "explain": "Locate the earlier time and read the y value",
                },
                {
                    "step": 2,
                    "action": "read the second value",
                    "explain": "Locate the later time and read the y value",
                },
                {
                    "step": 3,
                    "action": "subtract",
                    "explain": "change = later value - earlier value",
                    "compute": "later_value - earlier_value",
                },
            ],
        },
        {
            "id": "c8m13.2.1",
            "title": "Independent and Dependent Variables",
            "section": "13.2",
            "definition": "If more electricity is consumed, the bill is bound to be high. Amount of electric bill depends on the quantity of electricity used. We say that the quantity of electricity is an independent variable (or sometimes control variable) and the amount of electric bill is the dependent variable. The relation between such variables can be shown through a graph. For fixing a point on the graph sheet we need x-coordinate and y-coordinate.",
            "formula": "dependent variable = f(independent variable)",
            "key_idea": "The independent variable decides the other; plot x vs y.",
            "textbook_ref": "hemh113.txt lines 168-178, 325-326",
            "question_patterns": [
                "which is the independent variable",
                "which is the dependent variable",
                "what does the amount of electric bill depend on",
                "what do we need to fix a point on the graph sheet",
                "identify the independent and dependent variables in the situation",
                "the number of litres of petrol you buy will decide the amount you pay which is independent",
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "find what is chosen or controlled",
                    "explain": "The quantity we control is the independent variable (x-axis)",
                },
                {
                    "step": 2,
                    "action": "find what depends on it",
                    "explain": "The quantity that responds is the dependent variable (y-axis)",
                },
            ],
        },
        {
            "id": "c8m13.2.2",
            "title": "Drawing a Linear Graph",
            "section": "13.2",
            "definition": "To draw a graph from a table of values: (1) find the quantities to be plotted; (2) decide the quantities to be taken on the x-axis and on the y-axis; (3) choose a scale; (4) plot the points; (5) join the points. A line graph which is a whole unbroken line is called a linear graph.",
            "formula": "steps: choose scale -> mark axes -> plot points -> join the points",
            "key_idea": "Pick a scale, plot the table values, join with a straight unbroken line.",
            "textbook_ref": "hemh113.txt lines 179-205, 209-255, 324",
            "question_patterns": [
                "draw a graph to show the data",
                "plot a graph for the given table of values",
                "draw the linear graph with a suitable scale",
                "use the tables to draw linear graphs",
                "mark the number of litres along the horizontal axis",
                "join the points to get the graph",
                "is it a linear graph",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "choose the axes",
                    "explain": "Mark the independent variable on the horizontal axis, the other on the vertical axis",
                },
                {
                    "step": 2,
                    "action": "choose a suitable scale",
                    "explain": "e.g. 1 unit = 100 rupees on the horizontal axis; 1 unit = 10 rupees on the vertical axis",
                },
                {
                    "step": 3,
                    "action": "plot the points",
                    "explain": "Each table row gives a point (x, y)",
                },
                {
                    "step": 4,
                    "action": "join the points",
                    "explain": "Joining the points gives the graph; a whole unbroken line is a linear graph",
                },
            ],
        },
        {
            "id": "c8m13.2.3",
            "title": "Using Graphs of Direct Variation (Quantity-Cost, Time-Distance)",
            "section": "13.2",
            "definition": "This is the graph of a situation in which two quantities are in direct variation; in such situations the graphs will always be linear. Example 3 plots quantity of petrol against cost: points (10, 500), (15, 750), (20, 1000), (25, 1250). For a scooter at constant speed 30 km/hour the time-distance graph is drawn from the table 1 hour 30 km, 2 hours 60 km, 3 hours 90 km; corresponding to 75 km on the vertical axis we get the time 2.5 hours.",
            "formula": "distance = speed x time; cost = rate x quantity",
            "key_idea": "Direct variation gives a linear graph through which we read values.",
            "textbook_ref": "hemh113.txt lines 197-205, 256-292",
            "question_patterns": [
                "use the graph to find how much petrol can be purchased for 800",
                "find the annual interest for an investment of 250 from the graph",
                "the investment needed to get an annual simple interest of 70",
                "draw a time distance graph for a scooter at constant speed 30 km per hour",
                "the time taken to ride 75 km from the graph",
                "the distance covered in 3 and a half hours from the graph",
                "does the graph pass through the origin",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "make the table of values",
                    "explain": "For constant speed: distance = speed x hours",
                    "compute": "speed * hours",
                },
                {
                    "step": 2,
                    "action": "plot and join the points",
                    "explain": "The graph is a straight line for direct variation",
                },
                {
                    "step": 3,
                    "action": "read unknowns from the graph",
                    "explain": "Find the given value on one axis and read the answer on the other",
                    "compute": "distance / speed",
                },
            ],
        },
    ],
    "worked_examples": [
        {
            "id": "ex1",
            "source_ref": "hemh113.txt lines 36-64 (Example 1)",
            "concept": "c8m13.1.1",
            "question_type": "read_line_graph",
            "question_pattern": "the graph represents the total runs scored by two batsmen during ten matches. study the graph and answer",
            "extracted_variables": {
                "x_axis": "what the horizontal axis shows",
                "y_axis": "what the vertical axis shows",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "identify the axes",
                    "explain": "The horizontal axis indicates the matches played; the vertical axis shows the total runs scored",
                },
                {
                    "step": 2,
                    "action": "identify the lines",
                    "explain": "Each batsman is shown by a separate line (solid or dotted)",
                },
                {
                    "step": 3,
                    "action": "answer the questions",
                    "explain": "Same score occurs where the two lines meet; steadiness is judged by fewer ups and downs",
                },
            ],
        },
        {
            "id": "ex2",
            "source_ref": "hemh113.txt lines 65-99 (Example 2)",
            "concept": "c8m13.1.2",
            "question_type": "distance_time_reading",
            "question_pattern": "the graph describes the distances of a car from a city at different times. how far did the car go during the {which} hour",
            "extracted_variables": {
                "which": "which hour of travel",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "read the start of the hour",
                    "explain": "Note the distance reading at the beginning of the hour",
                },
                {
                    "step": 2,
                    "action": "read the end of the hour",
                    "explain": "Note the distance reading at the end of the hour",
                },
                {
                    "step": 3,
                    "action": "subtract",
                    "explain": "distance in that hour = end reading - start reading",
                    "compute": "later_value - earlier_value",
                },
            ],
        },
        {
            "id": "ex3",
            "source_ref": "hemh113.txt lines 179-205 (Example 3)",
            "concept": "c8m13.2.2",
            "question_type": "quantity_cost_graph",
            "question_pattern": "the table gives the quantity of petrol and its cost. plot a graph to show the data",
            "extracted_variables": {
                "quantities": "litres of petrol",
                "costs": "cost of the petrol",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "take a suitable scale on both axes",
                    "explain": "Mark number of litres along the horizontal axis and cost along the vertical axis",
                },
                {
                    "step": 2,
                    "action": "plot the points",
                    "explain": "e.g. (10, 500), (15, 750), (20, 1000), (25, 1250)",
                },
                {
                    "step": 3,
                    "action": "join the points",
                    "explain": "The graph is a line: a linear graph of direct variation",
                },
            ],
        },
        {
            "id": "ex4",
            "source_ref": "hemh113.txt lines 209-255 (Example 4)",
            "concept": "c8m13.2.3",
            "question_type": "principal_si_graph",
            "question_pattern": "a bank gives {rate}% simple interest on deposits. draw a graph and find the annual interest for an investment of {deposit}",
            "extracted_variables": {
                "rate": "rate of simple interest percent",
                "deposit": "the sum deposited",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "make the table",
                    "explain": "SI for a year = deposit x rate / 100 for each deposit value",
                    "compute": "deposit * rate / 100",
                },
                {
                    "step": 2,
                    "action": "plot deposit on x-axis and SI on y-axis",
                    "explain": "Choose a scale, plot the points, join them",
                },
                {
                    "step": 3,
                    "action": "read from the graph",
                    "explain": "Corresponding to the deposit on the horizontal axis, read the interest on the vertical axis",
                },
            ],
        },
        {
            "id": "ex5",
            "source_ref": "hemh113.txt lines 256-292 (Example 5)",
            "concept": "c8m13.2.3",
            "question_type": "time_distance_graph",
            "question_pattern": "a scooter moves constantly at {speed} km per hour. draw a time-distance graph and find the time taken to ride {distance} km",
            "extracted_variables": {
                "speed": "constant speed in km per hour",
                "distance": "the distance to cover",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "make the table",
                    "explain": "Each hour the distance grows by the speed: 30, 60, 90, 120 km",
                    "compute": "speed * hours",
                },
                {
                    "step": 2,
                    "action": "choose the scale and plot",
                    "explain": "Horizontal axis time, vertical axis distance; join the points to get a linear graph",
                },
                {
                    "step": 3,
                    "action": "read the answer",
                    "explain": "time = distance / speed",
                    "compute": "distance / speed",
                },
            ],
        },
    ],
    "exercises": [
        {
            "id": "ex13.1",
            "source_ref": "hemh113.txt lines 100-164 (Exercise 13.1)",
            "questions": [
                "The graph shows the temperature of a patient in a hospital recorded every hour: (a) what was the temperature at 1 p.m.? (b) when was it 38.5 degrees? (c) the temperature was the same two times, what were these times? (d) what was the temperature at 1.30 p.m.? (e) during which periods did it show an upward trend?",
                "The line graph shows the yearly sales figures for a manufacturing company: (a) what were the sales in 2002 and 2006? (b) what were the sales in 2003 and 2005? (c) compute the difference between the sales in 2002 and 2006 (d) in which year was there the greatest difference compared to its previous year?",
                "Two plants A and B were grown under similar conditions, heights measured at the end of each week: (a) how high was plant A after 2 and 3 weeks? (b) how high was plant B? (c) how much did plant A grow during the 3rd week? (d) how much did plant B grow from the end of the 2nd week to the end of the 3rd week? (e) during which week did plant A grow most? (f) during which week did plant B grow least? (g) were the two plants of the same height during any week?",
                "The graph shows the temperature forecast and the actual temperature for each day of a week: (a) on which days was the forecast same as the actual? (b) what was the maximum forecast temperature? (c) what was the minimum actual temperature? (d) on which day did the actual differ the most from the forecast?",
                "Use the tables to draw linear graphs: (a) number of days a hill side city received snow in different years (2003-2006) (b) population of men and women in a village in different years",
                "A courier-person cycles from a town to a neighbouring suburban area: (a) what is the scale taken for the time axis? (b) how much time did the person take for the travel? (c) how far is the merchant from the town? (d) did the person stop on the way? (e) during which period did he ride fastest?",
                "Can there be a time-temperature graph as shown in the figures? Justify your answer",
            ],
        },
        {
            "id": "ex13.2",
            "source_ref": "hemh113.txt lines 293-320 (Exercise 13.2)",
            "questions": [
                "Draw the graphs for the tables of values with suitable scales: (a) cost of apples (1-5 apples, 5-25 rupees) (b) distance travelled by a car (6 a.m. to 9 a.m., 40 to 160 km): (i) how much distance did the car cover during 7.30 a.m. to 8 a.m.? (ii) when had the car covered 100 km since its start?",
                "(c) interest on deposits for a year (1000-5000 rupees, 80-400 rupees): (i) does the graph pass through the origin? (ii) use the graph to find the interest on 2500 for a year (iii) to get an interest of 280 per year, how much money should be deposited?",
                "Draw a graph for the following: (i) side of square 2-6 cm and perimeter 8-24 cm; is it a linear graph? (ii) side of square 2-6 cm and area 4-36 sq cm; is it a linear graph?",
            ],
        },
    ],
}


def main():
    out_dir = os.path.dirname(os.path.abspath(__file__))
    out_path = os.path.join(
        out_dir, "catalog_class8_maths_ch13_introduction_to_graphs.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(CATALOG, f, indent=2, ensure_ascii=True)
    print("Wrote catalog to:", out_path)
    print("Concepts:", len(CATALOG["concepts"]))
    print("Worked examples:", len(CATALOG["worked_examples"]))
    print("Exercises:", len(CATALOG["exercises"]))
    print("Total exercise questions:", sum(len(e["questions"]) for e in CATALOG["exercises"]))


if __name__ == "__main__":
    main()
