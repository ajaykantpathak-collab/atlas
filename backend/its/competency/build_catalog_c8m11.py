"""Build concept catalog for Class 8 Maths Chapter 11 (Direct and Inverse Proportions).
Extracted from hemh111.txt -- NCERT Class 8 Maths textbook (Reprint 2024-25).
"""
import json
import os

CATALOG = {
    "class": 8,
    "subject": "maths",
    "chapter": 11,
    "chapter_title": "Direct and Inverse Proportions",
    "source_file": "D:/node_generator/ncert-mcp/data/processed/text_cache/hemh111.txt",
    "concepts": [
        {
            "id": "c8m11.2.1",
            "title": "Direct Proportion",
            "section": "11.2",
            "definition": "Two quantities x and y are said to be in direct proportion if they increase (or decrease) together in such a manner that the ratio of their corresponding values remains constant. That is, x/y = k or x = ky. If y1 and y2 are the values of y corresponding to the values x1 and x2 of x, then x1/y1 = x2/y2. For example, the cost of 5 metres of cloth is 210, so the cost of 2 metres is found from 5/210 = 2/y.",
            "formula": "x1/y1 = x2/y2; y2 = x2 x y1 / x1",
            "key_idea": "Same ratio for corresponding values; cross multiply to find the unknown.",
            "textbook_ref": "hemh111.txt lines 28-64, 152-192, 597-605",
            "question_patterns": [
                "the cost of 5 metres of cloth is 210 find the cost of 2 metres",
                "find the cost of the given metres of cloth",
                "how many bottles will it fill in five hours",
                "if 1 part of red pigment requires 75 ml of base how much red pigment should we mix with 1800 ml",
                "find the parts of base that need to be added",
                "direct proportion find the unknown",
                "the cost increases in the same ratio find the new cost",
                "how many sugar crystals are there in 5 kg of sugar",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "tabulate the two quantities",
                    "explain": "Put the known pair (x1, y1) and the unknown (x2, y2) in a table",
                },
                {
                    "step": 2,
                    "action": "write the proportion",
                    "explain": "x1/y1 = x2/y2",
                },
                {
                    "step": 3,
                    "action": "cross multiply and divide",
                    "explain": "y2 = x2 x y1 / x1",
                    "compute": "x2 * y1 / x1",
                },
            ],
        },
        {
            "id": "c8m11.2.2",
            "title": "Direct Proportion: Speed, Distance and Time",
            "section": "11.2",
            "definition": "Since the speed is uniform, the distance covered is directly proportional to time. Remember 1 hour = 60 minutes. A train moving at a uniform speed of 75 km/hour covers 75 km in 60 minutes; the distance in 20 minutes is found from 75/60 = x/20.",
            "formula": "distance = speed x time; x1/y1 = x2/y2 with 1 hour = 60 minutes",
            "key_idea": "At uniform speed, distance is directly proportional to time.",
            "textbook_ref": "hemh111.txt lines 267-294, 355-356",
            "question_patterns": [
                "a train is moving at a uniform speed of 75 km per hour how far will it travel in 20 minutes",
                "find the time required to cover a distance of 250 km",
                "a loaded truck travels 14 km in 25 minutes how far can it travel in 5 hours",
                "how far will it travel in the given minutes",
                "find the time to cover the distance at uniform speed",
                "distance covered at uniform speed",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "convert time units",
                    "explain": "1 hour = 60 minutes",
                    "compute": "hours * 60",
                },
                {
                    "step": 2,
                    "action": "write the proportion",
                    "explain": "speed per 60 min / 60 = distance x / time x",
                },
                {
                    "step": 3,
                    "action": "find the unknown distance",
                    "explain": "distance = speed x minutes / 60",
                    "compute": "speed * minutes / 60",
                },
                {
                    "step": 4,
                    "action": "or find the time",
                    "explain": "minutes = distance x 60 / speed",
                    "compute": "distance * 60 / speed",
                },
            ],
        },
        {
            "id": "c8m11.2.3",
            "title": "Direct Proportion: Map Scale",
            "section": "11.2",
            "definition": "The scale shows a relationship between actual length and the length represented on the map. The scale of the map is the ratio of the distance between two points on the map to the actual distance between two points on the large region. The scale of a map is based on the concept of direct proportion. For example, if 1 cm on the map represents 8 km of actual distance then 2 cm on the same map will represent 16 km.",
            "formula": "actual distance = map distance x scale",
            "key_idea": "Map distance to actual distance is a fixed ratio.",
            "textbook_ref": "hemh111.txt lines 298-318, 350-351",
            "question_patterns": [
                "the scale of a map is given as 1:30000000 two cities are 4 cm apart find the actual distance",
                "find the actual distance between the cities using the map scale",
                "she drives 72 km what would be her distance covered in the map",
                "a road map with a scale of 1 cm representing 18 km",
                "find the map distance from the actual distance",
                "map scale direct proportion",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "read the scale",
                    "explain": "1 cm : scale km, or a ratio like 1:30000000",
                },
                {
                    "step": 2,
                    "action": "multiply for actual distance",
                    "explain": "actual distance = map distance x scale",
                    "compute": "map_distance * scale",
                },
                {
                    "step": 3,
                    "action": "divide for map distance",
                    "explain": "map distance = actual distance / scale",
                    "compute": "actual_distance / scale",
                },
            ],
        },
        {
            "id": "c8m11.3.1",
            "title": "Inverse Proportion",
            "section": "11.3",
            "definition": "Two quantities x and y are said to be in inverse proportion if an increase in x causes a proportional decrease in y (and vice-versa) in such a manner that the product of their corresponding values remains constant. That is, if xy = k, then x1 y1 = x2 y2. For example, 6 pipes fill a tank in 80 minutes, so 5 pipes take x minutes with 80 x 6 = x x 5. When two quantities x and y are in inverse proportion they are also written as x proportional to 1/y.",
            "formula": "x1 x y1 = x2 x y2; y2 = x1 x y1 / x2",
            "key_idea": "Product stays constant; multiply the known pair and divide.",
            "textbook_ref": "hemh111.txt lines 386-434, 473-529, 610-617",
            "question_patterns": [
                "6 pipes are required to fill a tank in 1 hour 20 minutes how long will it take if only 5 pipes are used",
                "how long will the provisions last if 25 more students join",
                "if 15 workers can build a wall in 48 hours how many workers will be required in 30 hours",
                "a contractor estimates 3 persons could rewire the house in 4 days if he uses 4 persons how long",
                "a car takes 2 hours at the speed of 60 km per hour how long at 80 km per hour",
                "how many machines would be required to produce in 54 days",
                "inverse proportion find the unknown",
                "the food would last how many days if there were more animals",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "tabulate the two quantities",
                    "explain": "Put the known pair (x1, y1) and the unknown (x2, y2) in a table",
                },
                {
                    "step": 2,
                    "action": "write the constant product",
                    "explain": "x1 x y1 = x2 x y2",
                    "compute": "x1 * y1",
                },
                {
                    "step": 3,
                    "action": "divide to find the unknown",
                    "explain": "y2 = x1 x y1 / x2",
                    "compute": "x1 * y1 / x2",
                },
            ],
        },
        {
            "id": "c8m11.3.2",
            "title": "Identifying Direct or Inverse Proportion",
            "section": "11.3",
            "definition": "Check whether two quantities are in direct proportion by seeing if the ratio of corresponding values stays constant (x/y = k). Check inverse proportion by seeing if the product of corresponding values stays constant (xy = k). For example, the number of workers on a job and the time to complete the job are in inverse proportion; variables increasing together need not always be in direct proportion.",
            "formula": "direct: x/y constant; inverse: xy constant",
            "key_idea": "Ratio constant = direct; product constant = inverse.",
            "textbook_ref": "hemh111.txt lines 117-149, 459-465, 531-536",
            "question_patterns": [
                "which of the following are in inverse proportion",
                "check if the parking charges are in direct proportion to the parking time",
                "observe the tables and find if x and y are directly proportional",
                "is the prize money given to an individual winner directly or inversely proportional",
                "are the number of spokes and the angles in inverse proportion",
                "is it a case of inverse proportion",
                "find which pair of variables are in inverse proportion",
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "compute the ratios of corresponding values",
                    "explain": "If x1/y1 = x2/y2 = k, the quantities are in direct proportion",
                },
                {
                    "step": 2,
                    "action": "compute the products of corresponding values",
                    "explain": "If x1 y1 = x2 y2 = k, the quantities are in inverse proportion",
                },
                {
                    "step": 3,
                    "action": "conclude",
                    "explain": "Neither constant means the quantities are not proportional",
                },
            ],
        },
    ],
    "worked_examples": [
        {
            "id": "ex1",
            "source_ref": "hemh111.txt lines 152-192 (Example 1)",
            "concept": "c8m11.2.1",
            "question_type": "direct_proportion_cost",
            "question_pattern": "the cost of {x1} metres of cloth is {y1}. find the cost of {x2} metres of cloth of the same type",
            "extracted_variables": {
                "x1": "known length",
                "y1": "known cost",
                "x2": "required length",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "note it is direct proportion",
                    "explain": "As length increases, cost increases in the same ratio",
                },
                {
                    "step": 2,
                    "action": "write the relation",
                    "explain": "x1/y1 = x2/y2",
                },
                {
                    "step": 3,
                    "action": "solve for y2",
                    "explain": "y2 = x2 x y1 / x1",
                    "compute": "x2 * y1 / x1",
                },
            ],
        },
        {
            "id": "ex2",
            "source_ref": "hemh111.txt lines 193-227 (Example 2)",
            "concept": "c8m11.2.1",
            "question_type": "direct_proportion_shadow",
            "question_pattern": "an electric pole {h1} metres high casts a shadow of {s1} metres. find the height of a tree that casts a shadow of {s2} metres",
            "extracted_variables": {
                "h1": "height of the pole",
                "s1": "shadow of the pole",
                "s2": "shadow of the tree",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "note direct proportion",
                    "explain": "More the height of an object, the more would be the length of its shadow",
                },
                {
                    "step": 2,
                    "action": "write the proportion",
                    "explain": "h1/s1 = h2/s2",
                },
                {
                    "step": 3,
                    "action": "solve for the height",
                    "explain": "h2 = h1 x s2 / s1",
                    "compute": "h1 * s2 / s1",
                },
            ],
        },
        {
            "id": "ex3",
            "source_ref": "hemh111.txt lines 267-294 (Example 4)",
            "concept": "c8m11.2.2",
            "question_type": "speed_distance_time",
            "question_pattern": "a train is moving at a uniform speed of {speed} km per hour. how far will it travel in {minutes} minutes",
            "extracted_variables": {
                "speed": "uniform speed in km per hour",
                "minutes": "time in minutes",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "tabulate with 60 minutes",
                    "explain": "1 hour = 60 minutes; the train covers speed km in 60 minutes",
                },
                {
                    "step": 2,
                    "action": "write the proportion",
                    "explain": "speed/60 = x/minutes",
                },
                {
                    "step": 3,
                    "action": "solve for x",
                    "explain": "distance = speed x minutes / 60",
                    "compute": "speed * minutes / 60",
                },
            ],
        },
        {
            "id": "ex4",
            "source_ref": "hemh111.txt lines 306-318 (Example 5)",
            "concept": "c8m11.2.3",
            "question_type": "map_scale",
            "question_pattern": "the scale of a map is 1:{scale}. two cities are {map_distance} cm apart on the map. find the actual distance",
            "extracted_variables": {
                "scale": "scale denominator",
                "map_distance": "distance on the map in cm",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "write the proportion",
                    "explain": "1/scale = map distance / actual distance",
                },
                {
                    "step": 2,
                    "action": "solve",
                    "explain": "actual distance = map distance x scale cm",
                    "compute": "map_distance * scale",
                },
                {
                    "step": 3,
                    "action": "convert units",
                    "explain": "1 km = 100000 cm; divide by 100000 for km",
                    "compute": "map_distance * scale / 100000",
                },
            ],
        },
        {
            "id": "ex5",
            "source_ref": "hemh111.txt lines 473-488 (Example 7)",
            "concept": "c8m11.3.1",
            "question_type": "inverse_proportion_pipes",
            "question_pattern": "{x1} pipes are required to fill a tank in {y1} minutes. how long will it take if only {x2} pipes of the same type are used",
            "extracted_variables": {
                "x1": "known number of pipes",
                "y1": "known time in minutes",
                "x2": "new number of pipes",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "note inverse proportion",
                    "explain": "Lesser the number of pipes, more will be the time required",
                },
                {
                    "step": 2,
                    "action": "write the constant product",
                    "explain": "x1 x y1 = x2 x y2",
                },
                {
                    "step": 3,
                    "action": "solve for the time",
                    "explain": "y2 = x1 x y1 / x2",
                    "compute": "x1 * y1 / x2",
                },
            ],
        },
        {
            "id": "ex6",
            "source_ref": "hemh111.txt lines 489-512 (Example 8)",
            "concept": "c8m11.3.1",
            "question_type": "inverse_proportion_provisions",
            "question_pattern": "there are {x1} students and food provision for {y1} days. how long will the provisions last if {extra} more students join",
            "extracted_variables": {
                "x1": "original number of students",
                "y1": "number of days",
                "extra": "additional students",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "find the new number of students",
                    "explain": "x2 = x1 + extra",
                    "compute": "x1 + extra",
                },
                {
                    "step": 2,
                    "action": "write the constant product",
                    "explain": "More students means the provisions exhaust sooner, so inverse proportion",
                },
                {
                    "step": 3,
                    "action": "solve for the days",
                    "explain": "y2 = x1 x y1 / x2",
                    "compute": "x1 * y1 / (x1 + extra)",
                },
            ],
        },
        {
            "id": "ex7",
            "source_ref": "hemh111.txt lines 513-529 (Example 9)",
            "concept": "c8m11.3.1",
            "question_type": "inverse_proportion_workers",
            "question_pattern": "if {x1} workers can build a wall in {y1} hours, how many workers will be required to do the same work in {y2} hours",
            "extracted_variables": {
                "x1": "known number of workers",
                "y1": "known number of hours",
                "y2": "required number of hours",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "note inverse proportion",
                    "explain": "More the number of workers, faster they build the wall",
                },
                {
                    "step": 2,
                    "action": "write the constant product",
                    "explain": "x1 x y1 = x2 x y2",
                },
                {
                    "step": 3,
                    "action": "solve for the workers",
                    "explain": "x2 = x1 x y1 / y2",
                    "compute": "x1 * y1 / y2",
                },
            ],
        },
    ],
    "exercises": [
        {
            "id": "ex11.1",
            "source_ref": "hemh111.txt lines 325-356 (Exercise 11.1)",
            "questions": [
                "Following are the car parking charges: upto 4 hours 60; 8 hours 100; 12 hours 140; 24 hours 180. Check if the parking charges are in direct proportion to the parking time",
                "A mixture of paint is prepared by mixing 1 part of red pigments with 8 parts of base. In the table, find the parts of base that need to be added",
                "If 1 part of a red pigment requires 75 mL of base, how much red pigment should we mix with 1800 mL of base?",
                "A machine in a soft drink factory fills 840 bottles in six hours. How many bottles will it fill in five hours?",
                "A photograph of a bacteria enlarged 50000 times attains a length of 5 cm. What is the actual length of the bacteria? If the photograph is enlarged 20000 times only, what would be its enlarged length?",
                "In a model of a ship, the mast is 9 cm high, while the mast of the actual ship is 12 m high. If the length of the ship is 28 m, how long is the model ship?",
                "Suppose 2 kg of sugar contains 9 x 10^6 crystals. How many sugar crystals are there in (i) 5 kg of sugar? (ii) 1.2 kg of sugar?",
                "Rashmi has a road map with a scale of 1 cm representing 18 km. She drives on a road for 72 km. What would be her distance covered in the map?",
                "A 5 m 60 cm high vertical pole casts a shadow 3 m 20 cm long. Find at the same time (i) the length of the shadow cast by another pole 10 m 50 cm high (ii) the height of a pole which casts a shadow 5 m long",
                "A loaded truck travels 14 km in 25 minutes. If the speed remains the same, how far can it travel in 5 hours?",
            ],
        },
        {
            "id": "ex11.2",
            "source_ref": "hemh111.txt lines 530-579 (Exercise 11.2)",
            "questions": [
                "Which of the following are in inverse proportion? (i) The number of workers on a job and the time to complete the job (ii) The time taken for a journey and the distance travelled in a uniform speed (iii) Area of cultivated land and the crop harvested (iv) The time taken for a fixed journey and the speed of the vehicle (v) The population of a country and the area of land per person",
                "In a television game show the prize money of 100000 is to be divided equally amongst the winners. Complete the table and find whether the prize money given to an individual winner is directly or inversely proportional to the number of winners",
                "Rehman is making a wheel using spokes. He wants to fix equal spokes so that the angles between any pair of consecutive spokes are equal. Complete the table for 4, 6, 8, 10, 12 spokes; are the number of spokes and the angles in inverse proportion? Calculate the angle for 15 spokes. How many spokes would be needed if the angle is 40 degrees?",
                "If a box of sweets is divided among 24 children, they will get 5 sweets each. How many would each get, if the number of the children is reduced by 4?",
                "A farmer has enough food to feed 20 animals in his cattle for 6 days. How long would the food last if there were 10 more animals in his cattle?",
                "A contractor estimates that 3 persons could rewire a house in 4 days. If he uses 4 persons instead of three, how long should they take to complete the job?",
                "A batch of bottles were packed in 25 boxes with 12 bottles in each box. If the same batch is packed using 20 bottles in each box, how many boxes would be filled?",
                "A factory requires 42 machines to produce a given number of articles in 63 days. How many machines would be required to produce the same number of articles in 54 days?",
                "A car takes 2 hours to reach a destination by travelling at the speed of 60 km/h. How long will it take when the car travels at the speed of 80 km/h?",
                "Two persons could fit new windows in a house in 3 days: (i) one of the persons fell ill before the work started, how long would the job take now? (ii) how many persons would be needed to fit the windows in one day?",
                "A school has 8 periods a day each of 45 minutes duration. How long would each period be, if the school has 9 periods a day, assuming the number of school hours to be the same?",
            ],
        },
    ],
}


def main():
    out_dir = os.path.dirname(os.path.abspath(__file__))
    out_path = os.path.join(
        out_dir, "catalog_class8_maths_ch11_direct_inverse_proportions.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(CATALOG, f, indent=2, ensure_ascii=True)
    print("Wrote catalog to:", out_path)
    print("Concepts:", len(CATALOG["concepts"]))
    print("Worked examples:", len(CATALOG["worked_examples"]))
    print("Exercises:", len(CATALOG["exercises"]))
    print("Total exercise questions:", sum(len(e["questions"]) for e in CATALOG["exercises"]))


if __name__ == "__main__":
    main()
