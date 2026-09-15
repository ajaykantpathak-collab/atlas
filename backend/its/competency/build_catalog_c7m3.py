"""Build concept catalog for Class 7 Maths Chapter 3 (Data Handling).
Extracted from gemh103.txt -- NCERT Class 7 Maths textbook.
"""
import json
import os

CATALOG = {
    "class": 7,
    "subject": "maths",
    "chapter": 3,
    "chapter_title": "Data Handling",
    "source_file": "D:/node_generator/ncert-mcp/data/processed/text_cache/gemh103.txt",
    "concepts": [
        {
            "id": "c7m3.2.1",
            "title": "Arithmetic Mean",
            "section": "3.2",
            "definition": "The arithmetic mean (or average) is the sum of all observations divided by the number of observations. mean = sum of observations / number of observations.",
            "formula": "mean = (sum of all observations) / (number of observations)",
            "key_idea": "Add all values, divide by how many values there are. Mean lies between the highest and lowest observation.",
            "textbook_ref": "gemh103.txt lines 34-66",
            "question_patterns": [
                "find the mean",
                "find the average",
                "calculate the mean",
                "what is the arithmetic mean",
                "find mean of the data",
                "find mean runs scored",
                "find mean score",
                "find mean enrolment",
                "find mean rainfall",
                "find mean height",
                "find the mean of first five whole numbers",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {"step": 1, "action": "sum all observations", "explain": "Add all the values together"},
                {"step": 2, "action": "count observations", "explain": "Count how many values there are"},
                {"step": 3, "action": "divide", "explain": "mean = sum / count"},
            ],
        },
        {
            "id": "c7m3.2.2",
            "title": "Range",
            "section": "3.2.1",
            "definition": "The range is the difference between the highest and lowest observation. range = highest - lowest.",
            "formula": "range = highest observation - lowest observation",
            "key_idea": "Subtract the smallest value from the largest value.",
            "textbook_ref": "gemh103.txt lines 105-131",
            "question_patterns": [
                "find the range",
                "what is the range of the data",
                "range of heights",
                "range of ages",
                "range of marks",
                "range of rainfall",
                "highest and lowest value",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {"step": 1, "action": "find highest observation", "explain": "Identify the largest value"},
                {"step": 2, "action": "find lowest observation", "explain": "Identify the smallest value"},
                {"step": 3, "action": "subtract", "explain": "range = highest - lowest"},
            ],
        },
        {
            "id": "c7m3.3.1",
            "title": "Mode",
            "section": "3.3",
            "definition": "The mode of a set of observations is the observation that occurs most often. A data set can have one mode, more than one mode, or no mode.",
            "formula": "mode = observation with highest frequency",
            "key_idea": "The value that appears most frequently. Can be more than one mode.",
            "textbook_ref": "gemh103.txt lines 180-252",
            "question_patterns": [
                "find the mode",
                "what is the mode of the data",
                "find mode of the numbers",
                "find mode and median",
                "is there more than one mode",
                "most frequent value",
                "most popular size",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {"step": 1, "action": "count frequency", "explain": "Count how many times each value appears"},
                {"step": 2, "action": "find highest frequency", "explain": "Identify the value(s) with the highest count"},
                {"step": 3, "action": "report mode", "explain": "The value with highest frequency is the mode. Can be multiple."},
            ],
        },
        {
            "id": "c7m3.3.2",
            "title": "Mode of Large Data",
            "section": "3.3.1",
            "definition": "For large data sets, use tally marks and frequency tables to find the mode.",
            "formula": "tabulate with tally marks, find highest frequency",
            "key_idea": "Use tally marks and frequency table for large data.",
            "textbook_ref": "gemh103.txt lines 217-246",
            "question_patterns": [
                "find mode of large data",
                "use tally marks to find mode",
                "tabulate the data and find mode",
                "find mode using frequency table",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {"step": 1, "action": "create frequency table", "explain": "List each value and count with tally marks"},
                {"step": 2, "action": "find highest frequency", "explain": "Identify the value with highest count"},
                {"step": 3, "action": "report mode", "explain": "The value with highest frequency is the mode"},
            ],
        },
        {
            "id": "c7m3.4.1",
            "title": "Median",
            "section": "3.4",
            "definition": "The median is the middle value when data is arranged in ascending or descending order. For odd number of observations, median = ((n+1)/2)th observation.",
            "formula": "median = middle value (for odd n); average of two middle values (for even n)",
            "key_idea": "Sort the data, find the middle value. Divides data into two equal halves.",
            "textbook_ref": "gemh103.txt lines 302-357",
            "question_patterns": [
                "find the median",
                "what is the median of the data",
                "find median of the numbers",
                "find mode and median",
                "find mean mode and median",
                "middle value of data",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {"step": 1, "action": "arrange in order", "explain": "Sort the data in ascending order"},
                {"step": 2, "action": "find middle position", "explain": "For odd n: position = (n+1)/2. For even n: average of n/2 and (n/2)+1 positions."},
                {"step": 3, "action": "report median", "explain": "The value at the middle position is the median"},
            ],
        },
        {
            "id": "c7m3.5.1",
            "title": "Bar Graphs",
            "section": "3.5",
            "definition": "A bar graph represents data using bars of uniform width. The length of each bar represents the frequency. Choose a scale (e.g., 1 unit = 10 students).",
            "formula": "bar length = frequency x scale",
            "key_idea": "Bars represent data visually. Tallest bar = mode. Choose appropriate scale.",
            "textbook_ref": "gemh103.txt lines 379-431",
            "question_patterns": [
                "draw a bar graph",
                "represent data on bar graph",
                "choose a scale for bar graph",
                "which is most preferred",
                "which is least preferred",
                "read the bar graph",
                "how many students have",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {"step": 1, "action": "choose scale", "explain": "Pick a scale where 1 unit represents a convenient number"},
                {"step": 2, "action": "draw axes", "explain": "Horizontal axis = categories, vertical axis = frequency"},
                {"step": 3, "action": "draw bars", "explain": "Draw bars with height proportional to frequency"},
                {"step": 4, "action": "label", "explain": "Label axes and bars"},
            ],
        },
        {
            "id": "c7m3.5.2",
            "title": "Double Bar Graphs",
            "section": "3.5",
            "definition": "A double bar graph compares two sets of data side by side using pairs of bars for each category.",
            "formula": "two bars per category, one for each data set",
            "key_idea": "Two bars per category to compare two data sets visually.",
            "textbook_ref": "gemh103.txt lines 435-501",
            "question_patterns": [
                "draw a double bar graph",
                "compare two data sets",
                "in which year was the difference least",
                "which is more preferred",
                "compare performance in two terms",
                "double bar graph for two cities",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {"step": 1, "action": "choose scale", "explain": "Pick a scale that fits both data sets"},
                {"step": 2, "action": "draw paired bars", "explain": "Draw two bars side by side for each category"},
                {"step": 3, "action": "use different colors", "explain": "Use different colors/patterns for the two data sets"},
                {"step": 4, "action": "label and legend", "explain": "Label axes and add a legend"},
            ],
        },
        {
            "id": "c7m3.5.3",
            "title": "Choosing Appropriate Representative Value",
            "section": "3.3",
            "definition": "Mean is appropriate when data is evenly spread. Mode is appropriate when we need the most common value. Median is appropriate when we need to divide into two equal groups.",
            "formula": "use mean for averages, mode for most common, median for middle",
            "key_idea": "Choose mean, mode, or median based on what the question asks.",
            "textbook_ref": "gemh103.txt lines 266-301",
            "question_patterns": [
                "which representative value to use",
                "when to use mean mode or median",
                "is mean appropriate",
                "is mode appropriate",
                "best measure of central tendency",
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {"step": 1, "action": "identify the question", "explain": "What is being asked: average, most common, or middle?"},
                {"step": 2, "action": "choose measure", "explain": "Mean for average, mode for most common, median for middle"},
                {"step": 3, "action": "justify", "explain": "Explain why this measure is appropriate"},
            ],
        },
        {
            "id": "c7m3.6.1",
            "title": "Probability and Chance",
            "section": "3.6",
            "definition": "Probability is the measure of how likely an event is to occur. For a fair die, each face is equally likely. probability = (number of favorable outcomes) / (total number of outcomes). A coin has 2 outcomes (heads, tails). A die has 6 outcomes (1-6).",
            "formula": "probability = favorable outcomes / total outcomes",
            "key_idea": "Probability = favorable / total. Range 0 to 1. Equally likely events have equal probability.",
            "textbook_ref": "gemh103.txt (probability introduced in NCERT Class 7 data handling)",
            "question_patterns": [
                "what is the probability",
                "find the probability",
                "a die is rolled",
                "a coin is tossed",
                "probability of getting",
                "probability of a number greater than",
                "probability of an event",
                "how likely is",
                "chance of getting",
                "equally likely outcomes",
                "favorable outcomes",
                "total number of outcomes",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {"step": 1, "action": "count total outcomes", "explain": "Count all possible outcomes (coin=2, die=6)"},
                {"step": 2, "action": "count favorable outcomes", "explain": "Count outcomes that match the event"},
                {"step": 3, "action": "divide", "explain": "probability = favorable / total"},
            ],
        },
    ],
    "worked_examples": [
        {
            "id": "ex1",
            "source_ref": "gemh103.txt lines 51-57",
            "concept": "c7m3.2.1",
            "question_type": "mean_study_hours",
            "question_pattern": "studies for {h1}, {h2} and {h3} hours on three days. how many hours daily on average?",
            "extracted_variables": {
                "hours": "list of study hours",
            },
            "solution_template": [
                {"step": 1, "action": "sum the hours", "explain": "total = sum of all hours", "compute": "sum(hours)"},
                {"step": 2, "action": "divide by number of days", "explain": "mean = total / number of days", "compute": "total / len(hours)"},
            ],
        },
        {
            "id": "ex2",
            "source_ref": "gemh103.txt lines 58-66",
            "concept": "c7m3.2.1",
            "question_type": "mean_runs",
            "question_pattern": "batsman scored {runs} in {n} innings. calculate mean runs.",
            "extracted_variables": {
                "runs": "list of runs per inning",
            },
            "solution_template": [
                {"step": 1, "action": "sum all runs", "explain": "total_runs = sum of all runs", "compute": "sum(runs)"},
                {"step": 2, "action": "divide by innings", "explain": "mean = total_runs / number of innings", "compute": "total_runs / len(runs)"},
            ],
        },
        {
            "id": "ex3",
            "source_ref": "gemh103.txt lines 110-131",
            "concept": "c7m3.2.2",
            "question_type": "range_and_mean",
            "question_pattern": "ages of teachers are {ages}. find oldest, youngest, range, and mean.",
            "extracted_variables": {
                "ages": "list of ages",
            },
            "solution_template": [
                {"step": 1, "action": "arrange in order", "explain": "Sort the ages in ascending order"},
                {"step": 2, "action": "find oldest and youngest", "explain": "oldest = max, youngest = min", "compute": "max(ages), min(ages)"},
                {"step": 3, "action": "find range", "explain": "range = oldest - youngest", "compute": "max(ages) - min(ages)"},
                {"step": 4, "action": "find mean", "explain": "mean = sum / count", "compute": "sum(ages) / len(ages)"},
            ],
        },
        {
            "id": "ex4",
            "source_ref": "gemh103.txt lines 213-216",
            "concept": "c7m3.3.1",
            "question_type": "find_mode",
            "question_pattern": "find the mode of {numbers}",
            "extracted_variables": {
                "numbers": "list of numbers",
            },
            "solution_template": [
                {"step": 1, "action": "count frequency", "explain": "Count how many times each number appears"},
                {"step": 2, "action": "find highest frequency", "explain": "The number with highest count is the mode"},
                {"step": 3, "action": "report mode", "explain": "Mode is the most frequent value"},
            ],
        },
        {
            "id": "ex5",
            "source_ref": "gemh103.txt lines 224-246",
            "concept": "c7m3.3.2",
            "question_type": "mode_large_data",
            "question_pattern": "margins of victory in matches are {margins}. find the mode.",
            "extracted_variables": {
                "margins": "list of victory margins",
            },
            "solution_template": [
                {"step": 1, "action": "create tally table", "explain": "Tabulate with tally marks"},
                {"step": 2, "action": "find highest frequency", "explain": "The margin with highest count is the mode"},
                {"step": 3, "action": "report mode", "explain": "Most matches won with this margin"},
            ],
        },
        {
            "id": "ex6",
            "source_ref": "gemh103.txt lines 250-252",
            "concept": "c7m3.3.1",
            "question_type": "multiple_modes",
            "question_pattern": "find the mode of {numbers} (may have multiple modes)",
            "extracted_variables": {
                "numbers": "list of numbers",
            },
            "solution_template": [
                {"step": 1, "action": "count frequency", "explain": "Count how many times each number appears"},
                {"step": 2, "action": "find all with highest frequency", "explain": "If multiple values have the same highest count, all are modes"},
                {"step": 3, "action": "report all modes", "explain": "A data set can have more than one mode"},
            ],
        },
        {
            "id": "ex7",
            "source_ref": "gemh103.txt lines 355-357",
            "concept": "c7m3.4.1",
            "question_type": "find_median",
            "question_pattern": "find the median of {numbers}",
            "extracted_variables": {
                "numbers": "list of numbers",
            },
            "solution_template": [
                {"step": 1, "action": "arrange in ascending order", "explain": "Sort the data"},
                {"step": 2, "action": "find middle position", "explain": "For odd n: position = (n+1)/2"},
                {"step": 3, "action": "report median", "explain": "The value at the middle position is the median"},
            ],
        },
        {
            "id": "ex8",
            "source_ref": "gemh103.txt lines 392-421",
            "concept": "c7m3.5.1",
            "question_type": "bar_graph_colors",
            "question_pattern": "students chose favorite colors. represent on bar graph. which is most and least preferred?",
            "extracted_variables": {
                "colors": "list of colors",
                "counts": "number of students per color",
            },
            "solution_template": [
                {"step": 1, "action": "choose scale", "explain": "Pick scale where 1 unit = 10 students"},
                {"step": 2, "action": "draw bar graph", "explain": "Draw bars for each color"},
                {"step": 3, "action": "identify most preferred", "explain": "Tallest bar = most preferred"},
                {"step": 4, "action": "identify least preferred", "explain": "Shortest bar = least preferred"},
            ],
        },
        {
            "id": "ex9",
            "source_ref": "gemh103.txt lines 469-478",
            "concept": "c7m3.5.2",
            "question_type": "double_bar_comparison",
            "question_pattern": "compare scores of students in two tests. draw double bar graph.",
            "extracted_variables": {
                "students": "list of students",
                "scores1": "scores in test 1",
                "scores2": "scores in test 2",
            },
            "solution_template": [
                {"step": 1, "action": "choose scale", "explain": "Pick scale that fits both data sets"},
                {"step": 2, "action": "draw double bar graph", "explain": "Two bars per student, one for each test"},
                {"step": 3, "action": "compare", "explain": "Compare heights to see improvement"},
            ],
        },
    ],
    "exercises": [
        {
            "id": "ex3.1",
            "source_ref": "gemh103.txt lines 132-179",
            "questions": [
                "Find the range of heights of any ten students of your class",
                "Organise marks 4, 6, 7, 5, 3, 5, 4, 5, 2, 6, 2, 5, 1, 9, 6, 5, 8, 4, 6, 7. Find highest, lowest, range, mean.",
                "Find the mean of the first five whole numbers",
                "Cricketer scores 58, 76, 40, 35, 46, 45, 0, 100. Find mean score.",
                "Players A, B, C scored in 4 games. Find mean for each. Who is best performer?",
                "Marks obtained: 85, 76, 90, 85, 39, 48, 56, 95, 81, 75. Find highest, lowest, range, mean.",
                "Enrolment over 6 years: 1555, 1670, 1750, 2013, 2540, 2820. Find mean enrolment.",
                "Rainfall in mm for 7 days: 0.0, 12.2, 2.1, 0.0, 20.5, 5.5, 1.0. Find range, mean, days with less than mean.",
                "Heights of 10 girls: 135, 150, 139, 128, 151, 132, 146, 149, 143, 141. Find tallest, shortest, range, mean, count above mean.",
            ],
        },
        {
            "id": "ex3.2",
            "source_ref": "gemh103.txt lines 358-378",
            "questions": [
                "Scores: 19, 25, 23, 20, 9, 20, 15, 10, 5, 16, 25, 20, 24, 12, 20. Find mode and median. Are they same?",
                "Runs by 11 players: 6, 15, 120, 50, 100, 80, 10, 15, 8, 10, 15. Find mean, mode, median. Are they same?",
                "Weights of 15 students: 38, 42, 35, 37, 45, 50, 32, 43, 43, 40, 36, 38, 43, 38, 47. Find mode and median. More than one mode?",
                "Find mode and median: 13, 16, 12, 14, 19, 12, 14, 13, 14",
                "True or false: mode is always in data; mean is always in data; median is always in data; data 6,4,3,8,9,12,13,9 has mean 9.",
            ],
        },
        {
            "id": "ex3.3",
            "source_ref": "gemh103.txt lines 505-552",
            "questions": [
                "Use bar graph to find most popular pet and how many have dogs",
                "Read bar graph: how many books sold in 1989, 1990, 1992? In which year 475 books? 225 books? Fewer than 250?",
                "Children in six classes: 135, 120, 95, 100, 90, 80. Draw bar graph. Which class max/min? Ratio of sixth to eighth.",
                "Performance in 1st and 2nd term: English 67/70, Hindi 72/65, Maths 88/95, Science 81/85, S.Science 73/75. Draw double bar graph. Most improvement? Least? Any decline?",
                "Favorite sports: Cricket 1240/620, Basketball 470/320, Swimming 510/320, Hockey 430/250, Athletics 250/105 (watching/participating). Draw double bar. Most popular? Watching or participating more?",
                "Temperature data of cities. Draw double bar. Largest difference? Hottest? Coldest? Two cities where max of one less than min of other?",
            ],
        },
    ],
}


def main():
    out_dir = os.path.dirname(os.path.abspath(__file__))
    out_path = os.path.join(out_dir, "catalog_class7_maths_ch3_data_handling.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(CATALOG, f, indent=2, ensure_ascii=True)
    print("Wrote catalog to:", out_path)
    print("Concepts:", len(CATALOG["concepts"]))
    print("Worked examples:", len(CATALOG["worked_examples"]))
    print("Exercises:", len(CATALOG["exercises"]))
    print("Total exercise questions:", sum(len(e["questions"]) for e in CATALOG["exercises"]))


if __name__ == "__main__":
    main()
