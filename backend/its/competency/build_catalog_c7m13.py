"""Build concept catalog for Class 7 Maths Chapter 13 (Visualising Solid Shapes).
Extracted from gemh113.txt -- NCERT Class 7 Maths textbook.
"""
import json
import os

CATALOG = {
    "class": 7,
    "subject": "maths",
    "chapter": 13,
    "chapter_title": "Visualising Solid Shapes",
    "source_file": "D:/node_generator/ncert-mcp/data/processed/text_cache/gemh113.txt",
    "concepts": [
        {
            "id": "c7m13.1.1",
            "title": "Plane Figures and Solid Shapes",
            "section": "13.1",
            "definition": "2-D (plane) figures have only length and breadth (circle, square, rectangle, triangle, quadrilateral). 3-D (solid) shapes have length, breadth, and height (cube, cuboid, sphere, cylinder, cone, pyramid).",
            "formula": "2-D: length, breadth; 3-D: length, breadth, height",
            "key_idea": "2-D = flat, 3-D = solid with depth.",
            "textbook_ref": "gemh113.txt lines 1-39",
            "question_patterns": [
                "what is a 2-D figure",
                "what is a 3-D shape",
                "identify the solid shape",
                "match shape with name",
                "examples of plane figures",
                "examples of solid shapes",
                "classify as 2-D or 3-D",
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {"step": 1, "action": "check dimensions", "explain": "Has only length/breadth = 2-D. Has length/breadth/height = 3-D."},
                {"step": 2, "action": "classify", "explain": "Identify as plane figure or solid shape"},
            ],
        },
        {
            "id": "c7m13.2.1",
            "title": "Faces, Edges, and Vertices",
            "section": "13.2",
            "definition": "Faces are flat surfaces of a solid. Edges are line segments forming the skeleton. Vertices are corners. Cube: 6 faces, 12 edges, 8 vertices. Cylinder: 2 circular faces, no vertices.",
            "formula": "Cube: F=6, E=12, V=8; Cuboid: F=6, E=12, V=8",
            "key_idea": "Faces = flat surfaces, Edges = line segments, Vertices = corners.",
            "textbook_ref": "gemh113.txt lines 40-69",
            "question_patterns": [
                "how many faces edges vertices",
                "count the faces of",
                "count the edges of",
                "count the vertices of",
                "complete the table faces edges vertices",
                "faces of cylinder",
                "faces of pyramid",
                "faces of cube",
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {"step": 1, "action": "count flat surfaces", "explain": "Each flat surface is a face"},
                {"step": 2, "action": "count line segments", "explain": "Each line segment in skeleton is an edge"},
                {"step": 3, "action": "count corners", "explain": "Each corner is a vertex"},
            ],
        },
        {
            "id": "c7m13.3.1",
            "title": "Nets for Building 3-D Shapes",
            "section": "13.3",
            "definition": "A net is a 2-D skeleton-outline that can be folded to form a 3-D shape. Same solid can have different nets. Cube has 11 distinct nets.",
            "formula": "net = 2-D outline that folds to 3-D shape",
            "key_idea": "Net folds into a solid. Same solid, multiple nets.",
            "textbook_ref": "gemh113.txt lines 70-138",
            "question_patterns": [
                "identify nets for cube",
                "can this be a net for a die",
                "match nets with solids",
                "complete the net for cube",
                "make a net for cone",
                "make a net for cylinder",
                "make a net for pyramid",
                "two correct nets for tetrahedron",
                "dice nets opposite faces total 7",
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {"step": 1, "action": "examine net", "explain": "Look at 2-D outline"},
                {"step": 2, "action": "visualize folding", "explain": "Imagine folding along edges to form 3-D shape"},
                {"step": 3, "action": "verify", "explain": "Check if all faces meet correctly without overlap or gaps"},
                {"step": 4, "action": "for dice", "explain": "Opposite faces must sum to 7"},
            ],
        },
        {
            "id": "c7m13.4.1",
            "title": "Oblique Sketches",
            "section": "13.4.1",
            "definition": "Oblique sketch is a drawing of a solid on flat paper where lengths are not proportional but the shape is recognizable. Front and opposite faces are same size, edges appear equal.",
            "formula": "oblique sketch: not proportional, but recognizable",
            "key_idea": "Oblique sketch: lengths not proportional, shape recognizable.",
            "textbook_ref": "gemh113.txt lines 144-194",
            "question_patterns": [
                "draw oblique sketch",
                "make an oblique sketch",
                "oblique sketch of cuboid",
                "oblique sketch of cube",
                "draw solid on paper",
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {"step": 1, "action": "draw front face", "explain": "Draw the front face as a square/rectangle"},
                {"step": 2, "action": "draw opposite face", "explain": "Draw opposite face, offset from front"},
                {"step": 3, "action": "join corners", "explain": "Connect corresponding corners"},
                {"step": 4, "action": "show hidden edges", "explain": "Use dotted lines for hidden edges"},
            ],
        },
        {
            "id": "c7m13.4.2",
            "title": "Isometric Sketches",
            "section": "13.4.2",
            "definition": "Isometric sketch is drawn on isometric dot paper where measurements are proportional to the actual solid. Lengths agree with the solid's dimensions.",
            "formula": "isometric sketch: proportional measurements, on isometric paper",
            "key_idea": "Isometric sketch: measurements proportional, uses isometric paper.",
            "textbook_ref": "gemh113.txt lines 178-203",
            "question_patterns": [
                "draw isometric sketch",
                "make an isometric sketch",
                "isometric sketch of cuboid",
                "isometric sketch of cube",
                "use isometric dot paper",
                "draw three different isometric sketches",
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {"step": 1, "action": "use isometric paper", "explain": "Paper with equilateral triangle grid"},
                {"step": 2, "action": "draw front face", "explain": "Draw rectangle for front face to scale"},
                {"step": 3, "action": "draw parallel lines", "explain": "Draw parallel lines of correct length from corners"},
                {"step": 4, "action": "connect", "explain": "Connect matching corners to complete"},
            ],
        },
        {
            "id": "c7m13.4.3",
            "title": "Visualising Solid Objects",
            "section": "13.4.3",
            "definition": "Visualising combined shapes including hidden cubes. When cubes are joined side by side, only length increases. Important for guessing dimensions of combined solids.",
            "formula": "two cubes side by side: length = sum, breadth/height unchanged",
            "key_idea": "Visualize hidden parts. Combined cubes: add lengths.",
            "textbook_ref": "gemh113.txt lines 224-265",
            "question_patterns": [
                "how many cubes",
                "two cubes placed side by side dimensions",
                "three cubes side by side cuboid dimensions",
                "guess number of cubes",
                "resulting cuboid dimensions",
                "dice placed side by side face opposite",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {"step": 1, "action": "count visible cubes", "explain": "Count cubes visible from the front"},
                {"step": 2, "action": "estimate hidden", "explain": "Estimate cubes hidden behind"},
                {"step": 3, "action": "for combined cuboid", "explain": "Length adds, breadth and height stay same"},
            ],
        },
        {
            "id": "c7m13.5.1",
            "title": "Viewing Sections by Cutting or Slicing",
            "section": "13.5.1",
            "definition": "Cross-section is the face obtained when a solid is cut. Vertical cut of a brick gives rectangle. Horizontal cut of a round apple gives circle. Cut of a circular pipe gives circle.",
            "formula": "cross-section = face from a cut",
            "key_idea": "Cross-section = shape obtained by cutting solid.",
            "textbook_ref": "gemh113.txt lines 269-298",
            "question_patterns": [
                "what cross-section do you get",
                "vertical cut of brick",
                "horizontal cut of apple",
                "vertical cut of circular pipe",
                "cross-section of ice cream cone",
                "cross-section of die",
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {"step": 1, "action": "visualize the cut", "explain": "Imagine cutting the solid vertically or horizontally"},
                {"step": 2, "action": "identify face shape", "explain": "The exposed face is the cross-section"},
            ],
        },
        {
            "id": "c7m13.5.2",
            "title": "Viewing by Shadow Play",
            "section": "13.5.2",
            "definition": "Shadow of a 3-D object is 2-D. Ball casts circular shadow. Cylindrical pipe casts rectangle (or circle from end). Book casts rectangle. Cube can cast square or rectangle shadow.",
            "formula": "shadow = 2-D projection of 3-D object",
            "key_idea": "Shadow is 2-D projection. Different positions give different shadows.",
            "textbook_ref": "gemh113.txt lines 299-347",
            "question_patterns": [
                "name the shape of the shadow",
                "shadow of ball",
                "shadow of cylindrical pipe",
                "shadow of book",
                "identify solid from shadow",
                "shadow of cube",
                "can cube cast rectangle shadow",
                "can cube cast hexagon shadow",
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {"step": 1, "action": "place light source", "explain": "Light directly above the solid"},
                {"step": 2, "action": "observe shadow", "explain": "Note the 2-D shape of the shadow"},
                {"step": 3, "action": "consider positions", "explain": "Different positions of light give different shadows"},
            ],
        },
        {
            "id": "c7m13.5.3",
            "title": "Viewing from Different Angles",
            "section": "13.5.3",
            "definition": "An object can be viewed from front, side, or top. Each gives a different view. Front view, side view, and top view together describe a 3-D object.",
            "formula": "front view + side view + top view = describe 3-D object",
            "key_idea": "Three views: front, side, top. Together describe object.",
            "textbook_ref": "gemh113.txt lines 348-372",
            "question_patterns": [
                "identify top front side views",
                "draw front view",
                "draw side view",
                "draw top view",
                "front view side view top view of building",
                "view from direction indicated by arrow",
                "different views of solid",
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {"step": 1, "action": "stand in front", "explain": "Look at object from front to get front view"},
                {"step": 2, "action": "stand at side", "explain": "Look from side to get side view"},
                {"step": 3, "action": "look from above", "explain": "Look from top to get top view"},
            ],
        },
    ],
    "worked_examples": [
        {
            "id": "ex1",
            "source_ref": "gemh113.txt lines 195-203",
            "concept": "c7m13.4.2",
            "question_type": "oblique_to_isometric",
            "question_pattern": "given oblique sketch of cuboid, draw isometric sketch that matches",
            "solution_template": [
                {"step": 1, "action": "read dimensions from oblique", "explain": "Identify length, breadth, height from oblique sketch"},
                {"step": 2, "action": "use isometric paper", "explain": "Draw on isometric dot paper with proportional measurements"},
                {"step": 3, "action": "verify", "explain": "Check that measurements match the oblique sketch"},
            ],
        },
        {
            "id": "ex2",
            "source_ref": "gemh113.txt lines 249-256",
            "concept": "c7m13.4.3",
            "question_type": "combine_cubes_dimensions",
            "question_pattern": "two cubes of dimensions {a} x {b} x {c} placed side by side. what are dimensions of resulting cuboid?",
            "extracted_variables": {
                "a": "length of each cube",
                "b": "breadth of each cube",
                "c": "height of each cube",
                "n": "number of cubes",
            },
            "solution_template": [
                {"step": 1, "action": "identify which dimension increases", "explain": "Only the length along the joining direction increases"},
                {"step": 2, "action": "compute new length", "explain": "new length = n x a", "compute": "n * a"},
                {"step": 3, "action": "breadth and height unchanged", "explain": "breadth = b, height = c"},
            ],
        },
    ],
    "exercises": [
        {
            "id": "ex13.1",
            "source_ref": "gemh113.txt lines 111-138",
            "questions": [
                "Identify nets which can be used to make cubes (6 figures)",
                "Dice nets: opposite faces total to 7. Insert suitable numbers in blanks.",
                "Can this be a net for a die? Explain.",
                "Complete incomplete net for cube in at least two different ways",
                "Match the nets with appropriate solids (4 nets, 4 solids)",
            ],
        },
        {
            "id": "ex13.2",
            "source_ref": "gemh113.txt lines 205-223",
            "questions": [
                "Use isometric dot paper, make isometric sketch for each given shape (4 shapes)",
                "Cuboid dimensions 5 cm, 3 cm, 2 cm. Draw three different isometric sketches.",
                "Three cubes each with 2 cm edge placed side by side to form cuboid. Sketch oblique or isometric.",
                "Make oblique sketch for each given isometric shape",
                "Give oblique and isometric sketch for: cuboid 5x3x2 cm; cube edge 4 cm. Is sketch unique?",
            ],
        },
        {
            "id": "ex13.3",
            "source_ref": "gemh113.txt lines 293-298",
            "questions": [
                "Cross-sections from vertical and horizontal cuts: brick, round apple, die, circular pipe, ice cream cone",
            ],
        },
        {
            "id": "ex13.4",
            "source_ref": "gemh113.txt lines 331-347",
            "questions": [
                "Bulb above solids. Name shape of shadows: ball, cylindrical pipe, book",
                "Shadows of 3-D objects under lamp. Identify solids: circle, square, triangle, rectangle",
                "Examine if true: cube can cast rectangle shadow; cube can cast hexagon shadow",
            ],
        },
    ],
}


def main():
    out_dir = os.path.dirname(os.path.abspath(__file__))
    out_path = os.path.join(out_dir, "catalog_class7_maths_ch13_visualising_solid_shapes.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(CATALOG, f, indent=2, ensure_ascii=True)
    print("Wrote catalog to:", out_path)
    print("Concepts:", len(CATALOG["concepts"]))
    print("Worked examples:", len(CATALOG["worked_examples"]))
    print("Exercises:", len(CATALOG["exercises"]))
    print("Total exercise questions:", sum(len(e["questions"]) for e in CATALOG["exercises"]))


if __name__ == "__main__":
    main()
