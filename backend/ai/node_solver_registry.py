"""Node-to-solver registry for Mathematics.

Maps every enrichment node_id to a solver function.
If a node is conceptual (no calculation), it maps to None.
If a node has a calculation solver, it maps to the function.

This is the single source of truth for "which solver handles this node".
The compute engine and tutor service use this to find the right solver
after routing identifies the node.

Format:
    NODE_SOLVERS = {
        "c1_math_001": None,               # conceptual
        "c1_math_010": solve_arithmetic,   # calculation
        ...
    }
"""

from backend.ai.math_solvers import (
    # Existing solvers
    solve_trig_values, solve_trig_identity, solve_distance, solve_midpoint,
    solve_slope, solve_circle, solve_vector_magnitude, solve_dot_product,
    solve_cross_product, solve_ap, solve_gp, solve_complex_modulus,
    solve_permutation, solve_combination, solve_probability, solve_binomial,
    solve_mean, solve_statistics, solve_sphere, solve_cylinder, solve_cone,
    solve_simple_interest, solve_compound_interest, solve_profit_loss,
    solve_speed_distance_time, solve_probability_basic, solve_factorise,
    # Primary school solvers
    solve_number_comparison, solve_before_after_between,
    solve_ascending_descending, solve_place_value,
    solve_greatest_smallest_from_digits, solve_number_names,
    solve_skip_counting, solve_hcf_lcm, solve_prime_check, solve_factors,
    solve_prime_factorization, solve_divisibility, solve_roman_numerals,
    solve_rounding, solve_area_perimeter, solve_percentage_conversion,
    solve_integers, solve_angles, solve_time_conversion, solve_patterns,
    solve_multiplication_table, solve_even_odd,
    # Middle school solvers
    solve_ratio, solve_proportion, solve_cube_root, solve_trapezium,
    solve_cube, solve_cuboid, solve_simplify_sqrt, solve_rationalise,
    solve_simultaneous, solve_herons_formula, solve_evaluate_expression,
    solve_simplify_expression, solve_pythagoras, solve_parallelogram_area,
    solve_circle_circumference, solve_logarithm, solve_percentage_more,
    solve_discount, solve_time_work, solve_average, solve_median,
    solve_mode, solve_range_stats, solve_speed,
)
from backend.ai.compute_engine import ComputeEngine


# =========================================================================== #
# CLASS 1 (28 nodes)
# =========================================================================== #
CLASS_1 = {
    "c1_math_001": None,  # Numbers and numerals 1-20 (conceptual)
    "c1_math_002": None,  # Introduction to Zero (conceptual)
    "c1_math_003": None,  # Counting objects 1-99 (conceptual)
    "c1_math_004": None,  # Representing number in tens and ones (conceptual)
    "c1_math_005": solve_number_names,  # Numeral and number names up to 99
    "c1_math_006": solve_number_comparison,  # Comparison of numbers up to 99
    "c1_math_007": solve_greatest_smallest_from_digits,  # Forming two digit numbers
    "c1_math_008": solve_ascending_descending,  # Sequences in increasing/decreasing order
    "c1_math_009": solve_before_after_between,  # Before, after and in between numbers
    "c1_math_010": None,  # Addition and subtraction up to 20 (compute_engine handles)
    "c1_math_011": None,  # Addition and subtraction within 99 (compute_engine handles)
    "c1_math_012": None,  # Word problems by addition and subtraction (compute_engine handles)
    "c1_math_013": None,  # Sorting shapes (conceptual)
    "c1_math_014": None,  # Basic 3D shapes (conceptual)
    "c1_math_015": None,  # 2D shapes as outlines (conceptual)
    "c1_math_016": None,  # 2D shapes - rectangle, square, triangle, circle (conceptual)
    "c1_math_017": None,  # Length vocabulary (conceptual)
    "c1_math_018": None,  # Compare lengths (conceptual)
    "c1_math_019": None,  # Measure short lengths (conceptual)
    "c1_math_020": None,  # Estimation of distances (conceptual)
    "c1_math_021": None,  # Weight compare (conceptual)
    "c1_math_022": None,  # Volume capacity (conceptual)
    "c1_math_023": None,  # Time earlier-later (conceptual)
    "c1_math_024": None,  # Time short and long duration (conceptual)
    "c1_math_025": None,  # Time sequence of events (conceptual)
    "c1_math_026": None,  # Collection and interpretation of info (conceptual)
    "c1_math_027": solve_patterns,  # Simple patterns in shapes and numbers
    "c1_math_028": solve_patterns,  # Patterns from daily life
}


# =========================================================================== #
# CLASS 2 (27 nodes)
# =========================================================================== #
CLASS_2 = {
    "c2_math_001": solve_number_names,  # Numbers up to 99 and their number names
    "c2_math_002": solve_number_names,  # Read and write 3 digit numbers up to 999
    "c2_math_003": solve_place_value,  # Place and face values of digits
    "c2_math_004": solve_ascending_descending,  # Comparison and ascending/descending
    "c2_math_005": None,  # Addition and subtraction with regrouping (compute_engine)
    "c2_math_006": None,  # Place value in standard algorithm (compute_engine)
    "c2_math_007": None,  # Addition of zero, subtracting zero (compute_engine)
    "c2_math_008": None,  # Commutative property of addition (conceptual)
    "c2_math_009": None,  # Daily life problems addition/subtraction (compute_engine)
    "c2_math_010": None,  # Construction of problems (conceptual)
    "c2_math_011": None,  # Estimation of sum and difference (conceptual)
    "c2_math_012": solve_multiplication_table,  # Multiplication tables of 2,3,4,5
    "c2_math_013": None,  # Equal grouping and equal sharing (conceptual)
    "c2_math_014": None,  # Mental addition and subtraction (conceptual)
    "c2_math_015": None,  # Creation of 2D shapes (conceptual)
    "c2_math_016": None,  # Attribute of 2D shapes (conceptual)
    "c2_math_017": None,  # Straight lines (conceptual)
    "c2_math_018": None,  # Draw horizontal, vertical lines (conceptual)
    "c2_math_019": None,  # Introduction to curved lines (conceptual)
    "c2_math_020": None,  # Measurement of lengths (conceptual)
    "c2_math_021": None,  # Compare weights (conceptual)
    "c2_math_022": None,  # Simple balance (conceptual)
    "c2_math_023": None,  # Order containers by capacity (conceptual)
    "c2_math_024": None,  # Simple graphs (conceptual)
    "c2_math_025": solve_patterns,  # Unit of repeat in pattern
    "c2_math_026": solve_patterns,  # Extension of pattern
    "c2_math_027": solve_patterns,  # Create patterns from daily life
}


# =========================================================================== #
# CLASS 3 (40 nodes)
# =========================================================================== #
CLASS_3 = {
    "c3_math_001": solve_number_names,  # 4 digit numbers up to 9999
    "c3_math_002": solve_place_value,  # Place value and expanded form
    "c3_math_003": solve_skip_counting,  # Count numbers in different ways
    "c3_math_004": solve_ascending_descending,  # Comparison and arrange ascending/descending
    "c3_math_005": solve_greatest_smallest_from_digits,  # Greatest and smallest from digits
    "c3_math_006": None,  # Addition and Subtraction up to 3 digits (compute_engine)
    "c3_math_007": None,  # Place value to add and subtract (compute_engine)
    "c3_math_008": None,  # Problem solving addition/subtraction (compute_engine)
    "c3_math_009": solve_multiplication_table,  # Multiplication tables 2,3,4,5,7,9,10
    "c3_math_010": None,  # Multiplication two-digit by one-digit (compute_engine)
    "c3_math_011": None,  # Division in equal grouping (compute_engine)
    "c3_math_012": None,  # Division facts (compute_engine)
    "c3_math_013": None,  # Relation multiplication with division (conceptual)
    "c3_math_014": None,  # Mental computation (conceptual)
    "c3_math_015": None,  # Mental multiplication (conceptual)
    "c3_math_016": None,  # Estimation of sum/difference/product (conceptual)
    "c3_math_017": None,  # Make straight lines, curved lines (conceptual)
    "c3_math_018": None,  # Various shapes using tangram (conceptual)
    "c3_math_019": None,  # Compare shapes (conceptual)
    "c3_math_020": None,  # Tessellation (conceptual)
    "c3_math_021": None,  # Shapes that tile and do not tile (conceptual)
    "c3_math_022": None,  # Simple map reading (conceptual)
    "c3_math_023": None,  # Line drawings of 3D objects (conceptual)
    "c3_math_024": None,  # Need for standard units (conceptual)
    "c3_math_025": None,  # Measurement of lengths (conceptual)
    "c3_math_026": None,  # Use of measuring tools (conceptual)
    "c3_math_027": None,  # Estimation of length (conceptual)
    "c3_math_028": None,  # Relationship between metre and centimeter (compute_engine conversion)
    "c3_math_029": None,  # Non-standard units to weigh (conceptual)
    "c3_math_030": None,  # Measurement of capacity (conceptual)
    "c3_math_031": None,  # Conservation of volume (conceptual)
    "c3_math_032": None,  # Calendar to find day and date (conceptual)
    "c3_math_033": None,  # Read and write time am/pm (conceptual)
    "c3_math_034": None,  # Conversion of 12hr to 24hr (conceptual)
    "c3_math_035": solve_time_conversion,  # Conversion of days to hours, hours to minutes
    "c3_math_036": None,  # Data collection pictograph (conceptual)
    "c3_math_037": None,  # Classification and comparison of data (conceptual)
    "c3_math_038": None,  # Recording data using tally marks (conceptual)
    "c3_math_039": solve_patterns,  # Patterns with unit of repeat
    "c3_math_040": solve_patterns,  # Extension of pattern using rule
}


# =========================================================================== #
# CLASS 4 (41 nodes)
# =========================================================================== #
CLASS_4 = {
    "c4_math_001": solve_number_names,  # 6 digit numbers up to lac
    "c4_math_002": solve_place_value,  # Place value and face values
    "c4_math_003": solve_ascending_descending,  # Ascending and descending order
    "c4_math_004": solve_greatest_smallest_from_digits,  # Greatest and smallest from digits
    "c4_math_005": solve_roman_numerals,  # Roman Numerals I, V, X
    "c4_math_006": None,  # Fractions as part of whole (conceptual)
    "c4_math_007": None,  # Types of fractions (conceptual)
    "c4_math_008": None,  # Visual idea of equivalent fractions (conceptual)
    "c4_math_009": None,  # Addition and subtraction of like fractions (compute_engine)
    "c4_math_010": None,  # Addition and subtraction up to 4 digits (compute_engine)
    "c4_math_011": solve_multiplication_table,  # Multiplication table up to 10
    "c4_math_012": None,  # Multiplication two and three digit (compute_engine)
    "c4_math_013": None,  # Division single digit (compute_engine)
    "c4_math_014": None,  # Application of four operations (compute_engine)
    "c4_math_015": None,  # Word problems (compute_engine)
    "c4_math_016": None,  # Estimation (conceptual)
    "c4_math_017": solve_factors,  # Factors
    "c4_math_018": None,  # Multiples (conceptual)
    "c4_math_019": solve_prime_check,  # Prime and composite numbers
    "c4_math_020": solve_divisibility,  # Test for divisibility by 2,3,4,5,9,10
    "c4_math_021": solve_prime_factorization,  # Prime factors by factor tree
    "c4_math_022": solve_hcf_lcm,  # HCF by listing and common division
    "c4_math_023": solve_hcf_lcm,  # LCM by listing and common division
    "c4_math_024": None,  # Tangram shapes (conceptual)
    "c4_math_025": None,  # Tessellation (conceptual)
    "c4_math_026": None,  # Circle - centre, radius, diameter (conceptual)
    "c4_math_027": None,  # Relation between diameter and radius (conceptual)
    "c4_math_028": None,  # Reflection symmetry (conceptual)
    "c4_math_029": solve_area_perimeter,  # Area and perimeter of simple shapes
    "c4_math_030": None,  # Perspectives of shapes (conceptual)
    "c4_math_031": None,  # Introduction to terminology (conceptual)
    "c4_math_032": None,  # Lines, intersecting and perpendicular (conceptual)
    "c4_math_033": None,  # Conversion of units m to cm, g to kg, L to mL (compute_engine)
    "c4_math_034": None,  # Solve problems involving lengths, weight, volume (compute_engine)
    "c4_math_035": None,  # Estimation of length, weight, volume (conceptual)
    "c4_math_036": solve_time_conversion,  # Conversion of days, hrs and minutes
    "c4_math_037": None,  # Approximate time elapsed (conceptual)
    "c4_math_038": None,  # Pictorial representation of data (conceptual)
    "c4_math_039": None,  # Interpretation of bar graph (conceptual)
    "c4_math_040": solve_patterns,  # Growing and reducing patterns
    "c4_math_041": solve_patterns,  # Rule to extend growing/reducing pattern
}


# =========================================================================== #
# CLASS 5 (67 nodes)
# =========================================================================== #
CLASS_5 = {
    "c5_math_001": solve_number_names,  # Indian and International system - 9 digit
    "c5_math_002": solve_place_value,  # Place value and face value
    "c5_math_003": solve_place_value,  # Expanded form
    "c5_math_004": solve_number_comparison,  # Comparison of numbers
    "c5_math_005": solve_ascending_descending,  # Ascending and descending order
    "c5_math_006": solve_greatest_smallest_from_digits,  # Greatest and smallest from digits
    "c5_math_007": solve_rounding,  # Rounding off nearest 10, 100, 1000
    "c5_math_008": solve_multiplication_table,  # Multiplication Tables 2 to 20
    "c5_math_009": None,  # Addition, Subtraction, Multiplication, Division (compute_engine)
    "c5_math_010": None,  # Word problems (compute_engine)
    "c5_math_011": solve_roman_numerals,  # Roman numerals for large numbers
    "c5_math_012": None,  # Standard algorithms for large numbers (compute_engine)
    "c5_math_013": None,  # Division up to 2 digits (compute_engine)
    "c5_math_014": None,  # Framing and solving problems (compute_engine)
    "c5_math_015": None,  # Estimation (conceptual)
    "c5_math_016": solve_number_comparison,  # Comparison of 3 or more fractions
    "c5_math_017": None,  # Addition and subtraction of unlike fractions (compute_engine)
    "c5_math_018": None,  # Addition and subtraction of mixed numbers (compute_engine)
    "c5_math_019": None,  # Word problems on fractions (compute_engine)
    "c5_math_020": None,  # Multiplication of fractions (compute_engine)
    "c5_math_021": None,  # Division of fractions (compute_engine)
    "c5_math_022": None,  # Relationship between fractions and decimals (conceptual)
    "c5_math_023": None,  # Pictorial representation of decimal (conceptual)
    "c5_math_024": solve_place_value,  # Place value of decimal fraction
    "c5_math_025": solve_place_value,  # Expanded form - decimal and fraction
    "c5_math_026": None,  # Types of decimal fractions (conceptual)
    "c5_math_027": solve_number_comparison,  # Comparing decimal fractions
    "c5_math_028": solve_ascending_descending,  # Ordering of decimal fraction
    "c5_math_029": None,  # Addition and subtraction of decimal (compute_engine)
    "c5_math_030": None,  # Word problems on decimals (compute_engine)
    "c5_math_031": None,  # Multiplication of decimals by 10, 100, 1000 (compute_engine)
    "c5_math_032": None,  # Multiplication of decimal by whole/decimal (compute_engine)
    "c5_math_033": solve_factors,  # Factors, common factors and HCF
    "c5_math_034": solve_hcf_lcm,  # Multiples, common multiples and LCM
    "c5_math_035": solve_prime_check,  # Prime and composite, twin primes, co-prime
    "c5_math_036": solve_prime_factorization,  # Prime factors - Factor Tree
    "c5_math_037": solve_hcf_lcm,  # HCF - Listing and Common Division
    "c5_math_038": solve_hcf_lcm,  # LCM - Listing and Common Division
    "c5_math_039": None,  # Relationship between HCF and LCM (conceptual)
    "c5_math_040": solve_divisibility,  # Test for divisibility by 2,3,4,5,9,10,11
    "c5_math_041": solve_integers,  # Introduction to negative numbers
    "c5_math_042": solve_integers,  # Idea of integers
    "c5_math_043": solve_number_comparison,  # Comparison of integers
    "c5_math_044": solve_ascending_descending,  # Ascending and descending order of integers
    "c5_math_045": solve_integers,  # Rules for addition, subtraction of integers
    "c5_math_046": solve_angles,  # Angle and its measures
    "c5_math_047": solve_angles,  # Classification of angles
    "c5_math_048": solve_angles,  # Identification of acute, obtuse, right angles
    "c5_math_049": None,  # Symmetry in 3D shapes (conceptual)
    "c5_math_050": None,  # Reflection and rotational symmetry (conceptual)
    "c5_math_051": None,  # Nets of cubes, cuboids, cylinders, cones (conceptual)
    "c5_math_052": solve_area_perimeter,  # Area and perimeter of simple shapes
    "c5_math_053": None,  # Daily life problems length, weight, time, money (compute_engine)
    "c5_math_054": None,  # Conversion of units (compute_engine)
    "c5_math_055": solve_percentage_conversion,  # Introduction to percentages
    "c5_math_056": solve_percentage_conversion,  # Relationship between fractions, decimals, percentage
    "c5_math_057": None,  # Pictorial representation of percentage (conceptual)
    "c5_math_058": solve_percentage_conversion,  # Conversion of fractions to percentages
    "c5_math_059": solve_percentage_conversion,  # Conversion of decimals to percentages
    "c5_math_060": solve_percentage_more,  # Simple word problems on percentage
    "c5_math_061": None,  # Pictorial representation of raw data (conceptual)
    "c5_math_062": None,  # Interpretation of bar graph, line graph, pie chart (conceptual)
    "c5_math_063": solve_patterns,  # Patterns with unit of repeat
    "c5_math_064": solve_patterns,  # Progressive patterns
    "c5_math_065": solve_patterns,  # Extension of progressive patterns
    "c5_math_066": solve_patterns,  # Patterns with more than one characteristic
    "c5_math_067": solve_patterns,  # Triangular and square numbers
}


# =========================================================================== #
# CLASS 6 (84 nodes)
# =========================================================================== #
CLASS_6 = {
    "c6_math_001": solve_number_comparison,  # Consolidating sense of numberness up to 5 digits
    "c6_math_002": solve_place_value,  # Place value recapitulation and extension
    "c6_math_003": None,  # Operations on large numbers (compute_engine)
    "c6_math_004": None,  # Word problems on number operations (compute_engine)
    "c6_math_005": None,  # Estimation of outcome (conceptual)
    "c6_math_006": solve_rounding,  # Large numbers up to 8 digits and approximation
    "c6_math_007": solve_number_comparison,  # Indian and International Systems comparison
    "c6_math_008": None,  # Natural numbers (conceptual)
    "c6_math_009": None,  # Whole numbers (conceptual)
    "c6_math_010": None,  # Properties of numbers (conceptual)
    "c6_math_011": None,  # Number line (conceptual)
    "c6_math_012": solve_integers,  # Need for negative numbers
    "c6_math_013": solve_integers,  # Representation of negative numbers on number line
    "c6_math_014": solve_ascending_descending,  # Ordering of negative numbers and integers
    "c6_math_015": solve_integers,  # Identification of integers on number line
    "c6_math_016": solve_integers,  # Addition and subtraction of integers
    "c6_math_017": solve_number_comparison,  # Comparison of integers
    "c6_math_018": None,  # Idea of sets (conceptual)
    "c6_math_019": None,  # Representation of sets (conceptual)
    "c6_math_020": None,  # Types of sets (conceptual)
    "c6_math_021": None,  # Cardinality of a set (conceptual)
    "c6_math_022": None,  # Revision of fractions (conceptual)
    "c6_math_023": None,  # Representation of fractions (conceptual)
    "c6_math_024": None,  # Proper, improper and mixed fractions (conceptual)
    "c6_math_025": None,  # Equivalent fractions (conceptual)
    "c6_math_026": solve_number_comparison,  # Comparison of fractions
    "c6_math_027": None,  # Operations on fractions (compute_engine)
    "c6_math_028": None,  # Review of decimal fraction (conceptual)
    "c6_math_029": None,  # Inter conversion of fractions and decimals (conceptual)
    "c6_math_030": None,  # Word problems involving decimals (compute_engine)
    "c6_math_031": None,  # Simplification of brackets (compute_engine)
    "c6_math_032": solve_factors,  # Multiples and factors
    "c6_math_033": solve_divisibility,  # Divisibility rules 2,3,4,5,6,8,9,10,11
    "c6_math_034": solve_prime_check,  # Even/odd, prime/composite, co-prime, prime factorisation
    "c6_math_035": solve_hcf_lcm,  # HCF and LCM, prime factorization and division method
    "c6_math_036": None,  # Difference between fraction and ratio (conceptual)
    "c6_math_037": solve_ratio,  # Concept of Ratio
    "c6_math_038": solve_proportion,  # Proportion as equality of two ratios
    "c6_math_039": None,  # Unitary method (conceptual)
    "c6_math_040": solve_ratio,  # Word problems on ratio and proportions
    "c6_math_041": solve_percentage_conversion,  # Idea of percent as fraction with 100
    "c6_math_042": solve_speed,  # Idea of speed, simple daily life problems
    "c6_math_043": None,  # Introduction to constants, variable (conceptual)
    "c6_math_044": solve_patterns,  # Generate patterns with generalisation
    "c6_math_045": None,  # Introduction to unknowns (conceptual)
    "c6_math_046": None,  # Terminology associated with algebra (conceptual)
    "c6_math_047": None,  # Framing algebraic expressions (conceptual)
    "c6_math_048": solve_evaluate_expression,  # Evaluation of algebraic expressions
    "c6_math_049": None,  # Introduction to linear equation in one variable (compute_engine)
    "c6_math_050": None,  # Basic geometrical ideas (conceptual)
    "c6_math_051": None,  # Line, line segment, ray (conceptual)
    "c6_math_052": None,  # Open and closed figures (conceptual)
    "c6_math_053": None,  # Interior and exterior (conceptual)
    "c6_math_054": None,  # Curvilinear and linear boundaries (conceptual)
    "c6_math_055": solve_angles,  # Angle - Vertex, arm, interior and exterior
    "c6_math_056": None,  # Triangle - vertices, sides, angles (conceptual)
    "c6_math_057": None,  # Quadrilateral (conceptual)
    "c6_math_058": None,  # Circle - Centre, radius, diameter (conceptual)
    "c6_math_059": None,  # Measure of line segment (conceptual)
    "c6_math_060": solve_angles,  # Measure of angles
    "c6_math_061": None,  # Pair of lines (conceptual)
    "c6_math_062": solve_angles,  # Types of angles
    "c6_math_063": None,  # Classification of triangles (conceptual)
    "c6_math_064": None,  # Types of quadrilaterals (conceptual)
    "c6_math_065": None,  # Simple polygons (conceptual)
    "c6_math_066": None,  # Identification of 3D shapes (conceptual)
    "c6_math_067": None,  # Elements of 3D figures (conceptual)
    "c6_math_068": None,  # Nets for cube, cuboids (conceptual)
    "c6_math_069": None,  # Symmetry - reflection (conceptual)
    "c6_math_070": None,  # Recognising reflection symmetry (conceptual)
    "c6_math_071": None,  # Constructions - line segment (conceptual)
    "c6_math_072": None,  # Construction of angles (conceptual)
    "c6_math_073": None,  # Angle bisector (conceptual)
    "c6_math_074": None,  # Drawing perpendicular (conceptual)
    "c6_math_075": solve_area_perimeter,  # Concept of perimeter
    "c6_math_076": solve_area_perimeter,  # Shapes with same perimeter
    "c6_math_077": solve_area_perimeter,  # Concept of area, area of rectangle and square
    "c6_math_078": solve_area_perimeter,  # Perimeter of rectangle and square
    "c6_math_079": None,  # Conversion of units (compute_engine)
    "c6_math_080": None,  # Collection of data (conceptual)
    "c6_math_081": None,  # Collection and organisation of data (conceptual)
    "c6_math_082": None,  # Pictograph (conceptual)
    "c6_math_083": None,  # Construction of bar graphs (conceptual)
    "c6_math_084": solve_mean,  # Mean and median of data
}


# =========================================================================== #
# CLASS 7 (50 nodes)
# =========================================================================== #
CLASS_7 = {
    "c7_math_001": solve_integers,  # Multiplication and division of integers
    "c7_math_002": None,  # Properties of operations on integers (conceptual)
    "c7_math_003": solve_integers,  # Problem solving using operations on integers
    "c7_math_004": solve_integers,  # Word problems involving integers
    "c7_math_005": None,  # Introduction to rational numbers (conceptual)
    "c7_math_006": None,  # Word problems on rational numbers (compute_engine)
    "c7_math_007": None,  # Decimal representation of rational numbers (conceptual)
    "c7_math_008": None,  # Problem solving using rational numbers (compute_engine)
    "c7_math_009": None,  # Fraction as an operator (conceptual)
    "c7_math_010": None,  # Reciprocal of a fraction (conceptual)
    "c7_math_011": None,  # Multiplication and division of decimal fractions (compute_engine)
    "c7_math_012": None,  # Exponents (compute_engine handles 2^5)
    "c7_math_013": None,  # Laws of exponents (conceptual)
    "c7_math_014": None,  # Application of laws of exponents (conceptual)
    "c7_math_015": None,  # Revision of idea of sets (conceptual)
    "c7_math_016": None,  # Equal, equivalent, universal sets (conceptual)
    "c7_math_017": None,  # Cardinal property of sets (conceptual)
    "c7_math_018": solve_ratio,  # Ratio and proportion revision
    "c7_math_019": None,  # Unitary method (conceptual)
    "c7_math_020": solve_percentage_conversion,  # Percentage introduction
    "c7_math_021": solve_percentage_conversion,  # Percentage as fraction with denominator 100
    "c7_math_022": solve_percentage_conversion,  # Converting fractions and decimals to percentage
    "c7_math_023": solve_profit_loss,  # Application to profit and loss
    "c7_math_024": solve_simple_interest,  # Application to simple interest
    "c7_math_025": solve_speed,  # Speed, distance, time
    "c7_math_026": None,  # Terms related to algebra (conceptual)
    "c7_math_027": None,  # Generate algebraic expressions (conceptual)
    "c7_math_028": None,  # Operations on algebraic expressions (conceptual)
    "c7_math_029": None,  # Simple linear equations in one variable (compute_engine)
    "c7_math_030": None,  # Inequalities (conceptual)
    "c7_math_031": solve_angles,  # Pairs of angles
    "c7_math_032": solve_angles,  # Properties of parallel lines with transversal
    "c7_math_033": solve_angles,  # Angle sum property of triangles
    "c7_math_034": solve_angles,  # Exterior angle property
    "c7_math_035": solve_pythagoras,  # Pythagoras Theorem
    "c7_math_036": None,  # Symmetry - reflection (conceptual)
    "c7_math_037": None,  # Rotational symmetry (conceptual)
    "c7_math_038": None,  # Representing 3D in 2D (conceptual)
    "c7_math_039": None,  # Mapping space (conceptual)
    "c7_math_040": None,  # Congruence through superimposition (conceptual)
    "c7_math_041": None,  # Extend congruence to shapes (conceptual)
    "c7_math_042": None,  # Criteria of congruence (conceptual)
    "c7_math_043": None,  # Construction of parallel line (conceptual)
    "c7_math_044": None,  # Construction of simple triangles (conceptual)
    "c7_math_045": solve_circle_circumference,  # Circumference of Circle
    "c7_math_046": solve_area_perimeter,  # Area of square, rectangle, triangle, parallelogram, circle
    "c7_math_047": None,  # Collection and organisation of data (conceptual)
    "c7_math_048": solve_mean,  # Mean, median and mode of ungrouped data
    "c7_math_049": None,  # Constructing and interpreting bar graphs (conceptual)
    "c7_math_050": solve_probability_basic,  # Feel of probability using data
}


# =========================================================================== #
# CLASS 8 (39 nodes)
# =========================================================================== #
CLASS_8 = {
    "c8_math_001": None,  # Properties of rational numbers (conceptual)
    "c8_math_002": None,  # Representation of rational numbers on number line (conceptual)
    "c8_math_003": None,  # Between any two rational numbers (conceptual)
    "c8_math_004": None,  # Word problem higher logic (compute_engine)
    "c8_math_005": None,  # Laws of exponents with integral powers (conceptual)
    "c8_math_006": None,  # Square and Square roots (compute_engine handles sqrt)
    "c8_math_007": solve_cube_root,  # Cubes and cubes roots
    "c8_math_008": None,  # Writing numbers in generalized form (conceptual)
    "c8_math_009": solve_divisibility,  # Deducing divisibility test rules
    "c8_math_010": None,  # Union and intersection of sets (conceptual)
    "c8_math_011": None,  # Disjoint set (conceptual)
    "c8_math_012": None,  # Complement of a set (conceptual)
    "c8_math_013": solve_profit_loss,  # Advanced problems on percentages, profit/loss, discount, tax
    "c8_math_014": solve_compound_interest,  # Difference between simple and compound interest
    "c8_math_015": None,  # Direct and inverse variations (conceptual)
    "c8_math_016": solve_time_work,  # Time and work problems
    "c8_math_017": solve_compound_interest,  # Arriving at formula for compound interest
    "c8_math_018": None,  # Multiplication and division of algebraic expressions (conceptual)
    "c8_math_019": None,  # Identities (a+b)^2 etc (compute_engine expand)
    "c8_math_020": None,  # Properties of inequalities (conceptual)
    "c8_math_021": solve_factorise,  # Factorisation simple cases
    "c8_math_022": None,  # Solving linear equations in one variable (compute_engine)
    "c8_math_023": solve_angles,  # Properties of quadrilaterals - Angle Sum
    "c8_math_024": None,  # Properties of parallelogram (conceptual)
    "c8_math_025": None,  # Representing 3D in 2D (conceptual)
    "c8_math_026": None,  # Counting vertices, edges, faces, Euler's relation (conceptual)
    "c8_math_027": None,  # Construction of Quadrilaterals (conceptual)
    "c8_math_028": None,  # Reflection symmetry (conceptual)
    "c8_math_029": None,  # Circle - centre, radius/diameter (conceptual)
    "c8_math_030": None,  # Cartesian plane (conceptual)
    "c8_math_031": solve_trapezium,  # Area of a trapezium, polygon and semi-circle
    "c8_math_032": solve_cuboid,  # Surface area of cube, cuboid, cylinder
    "c8_math_033": solve_cuboid,  # Total surface area and curved surface areas
    "c8_math_034": solve_cuboid,  # Volume of cube, cuboid and cylinder
    "c8_math_035": solve_cuboid,  # Volume and capacity
    "c8_math_036": None,  # Arranging ungrouped data into groups (conceptual)
    "c8_math_037": None,  # Simple Pie charts (conceptual)
    "c8_math_038": solve_probability_basic,  # Chance in events (coins, dice, probability)
    "c8_math_039": None,  # Sets and Venn diagrams (conceptual)
}


# =========================================================================== #
# CLASS 9 (67 nodes)
# =========================================================================== #
CLASS_9 = {
    "c9_math_001": None,  # Rational numbers as real numbers (conceptual)
    "c9_math_002": None,  # Irrational numbers (conceptual)
    "c9_math_003": None,  # Representation on number line (conceptual)
    "c9_math_004": solve_simplify_sqrt,  # Surds - introduction and simplification
    "c9_math_005": solve_rationalise,  # Rationalization of surds
    "c9_math_006": None,  # Proofs of irrationality (conceptual)
    "c9_math_007": solve_compound_interest,  # Compound interest as repeated simple interest
    "c9_math_008": solve_compound_interest,  # Compound interest formula
    "c9_math_009": solve_compound_interest,  # Interest compounded half-yearly
    "c9_math_010": solve_compound_interest,  # Finding one quantity given combinations
    "c9_math_011": solve_compound_interest,  # Rate of growth and depreciation using CI
    "c9_math_012": None,  # Expansion of (a +/- b)^2 (compute_engine expand)
    "c9_math_013": None,  # Expansion of (a +/- b)^3 (compute_engine expand)
    "c9_math_014": None,  # Expansion of (x +/- a)(x +/- b) (compute_engine expand)
    "c9_math_015": None,  # Expansion of (a +/- b +/- c)^2 (compute_engine expand)
    "c9_math_016": solve_factorise,  # Factorisation of a^2 - b^2
    "c9_math_017": solve_factorise,  # Factorisation of a^3 +/- b^3
    "c9_math_018": solve_factorise,  # Factorisation of ax^2 + bx + c
    "c9_math_019": solve_simultaneous,  # Solving simultaneous linear equations by elimination
    "c9_math_020": solve_simultaneous,  # Solving simultaneous linear equations by substitution
    "c9_math_021": solve_simultaneous,  # Solving simultaneous linear equations by cross multiplication
    "c9_math_022": solve_simultaneous,  # Word problems by framing simultaneous linear equations
    "c9_math_023": None,  # Laws of exponents (conceptual)
    "c9_math_024": None,  # Simplification of expressions involving exponents (compute_engine)
    "c9_math_025": solve_logarithm,  # Logarithmic form vs exponential form
    "c9_math_026": solve_logarithm,  # Laws of logarithms
    "c9_math_027": solve_logarithm,  # Expansion of expressions using laws of logarithms
    "c9_math_028": None,  # Congruency of triangles (conceptual)
    "c9_math_029": None,  # Angles opposite equal sides (conceptual)
    "c9_math_030": None,  # Greater angle opposite greater side (conceptual)
    "c9_math_031": None,  # Sum of any two sides greater than third (conceptual)
    "c9_math_032": None,  # Perpendicular is shortest (conceptual)
    "c9_math_033": None,  # Mid-Point Theorem (conceptual)
    "c9_math_034": None,  # Equal intercept theorem (conceptual)
    "c9_math_035": solve_pythagoras,  # Pythagoras Theorem
    "c9_math_036": None,  # Parallelogram theorems (conceptual)
    "c9_math_037": None,  # Parallelogram theorems (conceptual)
    "c9_math_038": None,  # Rhombus and rectangle diagonal properties (conceptual)
    "c9_math_039": None,  # Construction of quadrilaterals (conceptual)
    "c9_math_040": None,  # Construction of regular hexagon (conceptual)
    "c9_math_041": solve_parallelogram_area,  # Area theorems on parallelograms
    "c9_math_042": solve_parallelogram_area,  # Area theorems - triangle vs parallelogram
    "c9_math_043": None,  # Chord property (conceptual)
    "c9_math_044": None,  # Chord properties (conceptual)
    "c9_math_045": None,  # Arc properties (conceptual)
    "c9_math_046": None,  # Equal chords cut off equal arcs (conceptual)
    "c9_math_047": None,  # Raw, arrayed and grouped data (conceptual)
    "c9_math_048": None,  # Tabulation of raw data (conceptual)
    "c9_math_049": None,  # Discrete and continuous variables (conceptual)
    "c9_math_050": solve_mean,  # Mean of ungrouped data
    "c9_math_051": solve_median,  # Median of ungrouped data
    "c9_math_052": None,  # Class intervals (conceptual)
    "c9_math_053": None,  # Grouped frequency distributions (conceptual)
    "c9_math_054": None,  # Drawing a frequency polygon (conceptual)
    "c9_math_055": solve_herons_formula,  # Area and perimeter of triangle (Heron's formula)
    "c9_math_056": solve_area_perimeter,  # Area and perimeter of quadrilaterals
    "c9_math_057": solve_circle_circumference,  # Area and circumference of circle
    "c9_math_058": solve_cube,  # Surface area and volume of cube
    "c9_math_059": solve_cuboid,  # Surface area and volume of cuboid
    "c9_math_060": solve_trig_values,  # Trigonometric ratios
    "c9_math_061": solve_trig_values,  # Trigonometric ratios of standard angles
    "c9_math_062": solve_pythagoras,  # Simple 2-D problems with right-angled triangle
    "c9_math_063": solve_trig_values,  # Trigonometric ratios of complementary angles
    "c9_math_064": None,  # Dependent and independent variables (conceptual)
    "c9_math_065": None,  # Ordered pairs and plotting (conceptual)
    "c9_math_066": solve_simultaneous,  # Solution of simultaneous linear equations graphically
    "c9_math_067": solve_distance,  # Distance formula
}


# =========================================================================== #
# CLASS 10 (80 nodes)
# =========================================================================== #
CLASS_10 = {
    "c10_math_001": solve_percentage_more,  # GST - computation of tax
    "c10_math_002": solve_percentage_more,  # GST - SGST and CGST
    "c10_math_003": solve_percentage_more,  # GST - inverse cases
    "c10_math_004": None,  # Banking - RD concept and formula (conceptual)
    "c10_math_005": None,  # Banking - maturity value of RD (needs specific solver)
    "c10_math_006": None,  # Shares - Face Value, Market Value (conceptual)
    "c10_math_007": None,  # Shares - Dividend and Rate of Dividend (conceptual)
    "c10_math_008": None,  # Shares - Income and Return formulae (needs specific solver)
    "c10_math_009": None,  # Linear inequations (conceptual)
    "c10_math_010": None,  # Linear inequations - set notation (conceptual)
    "c10_math_011": None,  # Quadratic equations - introduction (conceptual)
    "c10_math_012": solve_factorise,  # Solving quadratic equations by factorisation
    "c10_math_013": None,  # Solving quadratic equations by formula (compute_engine)
    "c10_math_014": None,  # Nature of roots - discriminant (conceptual)
    "c10_math_015": None,  # Quadratic equation word problems (compute_engine)
    "c10_math_016": solve_ratio,  # Ratio and proportion - continued and mean
    "c10_math_017": solve_proportion,  # Ratio and proportion - componendo etc
    "c10_math_018": solve_ratio,  # Ratio and proportion - combined applications
    "c10_math_019": None,  # Remainder Theorem (conceptual)
    "c10_math_020": None,  # Factor Theorem (conceptual)
    "c10_math_021": solve_factorise,  # Factorising a polynomial completely
    "c10_math_022": None,  # Matrices - order (conceptual)
    "c10_math_023": None,  # Matrices - compatibility (conceptual)
    "c10_math_024": None,  # Matrices - null and identity (conceptual)
    "c10_math_025": None,  # Matrices - addition and subtraction (conceptual)
    "c10_math_026": None,  # Matrices - multiplication by scalar (conceptual)
    "c10_math_027": None,  # Matrices - multiplication of 2x2 (conceptual)
    "c10_math_028": solve_ap,  # AP - general term
    "c10_math_029": solve_ap,  # AP - sum of first n terms
    "c10_math_030": solve_gp,  # GP - general term
    "c10_math_031": solve_gp,  # GP - sum of first n terms
    "c10_math_032": solve_ap,  # AP and GP - simple applications
    "c10_math_033": None,  # Reflection of a point in a line (conceptual)
    "c10_math_034": None,  # Reflection of a point in the origin (conceptual)
    "c10_math_035": None,  # Invariant points under reflection (conceptual)
    "c10_math_036": solve_midpoint,  # Section formula and midpoint
    "c10_math_037": None,  # Centroid of a triangle (conceptual)
    "c10_math_038": solve_slope,  # Slope of a line
    "c10_math_039": None,  # Equation of a line - slope-intercept (conceptual)
    "c10_math_040": None,  # Equation of a line - two-point form (conceptual)
    "c10_math_041": solve_slope,  # Conditions for parallel and perpendicular lines
    "c10_math_042": None,  # Similarity - size transformation (conceptual)
    "c10_math_043": None,  # Similarity - comparison with congruency (conceptual)
    "c10_math_044": None,  # Similarity conditions (conceptual)
    "c10_math_045": None,  # Basic Proportionality Theorem (conceptual)
    "c10_math_046": None,  # Areas of similar triangles (conceptual)
    "c10_math_047": solve_ratio,  # Applications of similarity to maps and models
    "c10_math_048": None,  # Loci - definition (conceptual)
    "c10_math_049": solve_circle,  # Locus at fixed distance from fixed point (circle)
    "c10_math_050": None,  # Locus equidistant from two lines (conceptual)
    "c10_math_051": None,  # Locus equidistant from two points (conceptual)
    "c10_math_052": solve_angles,  # Angle at centre is double angle at circumference
    "c10_math_053": solve_angles,  # Angles in the same segment are equal
    "c10_math_054": solve_angles,  # Angle in a semi-circle is right angle
    "c10_math_055": solve_angles,  # Cyclic quadrilateral - opposite angles supplementary
    "c10_math_056": solve_angles,  # Cyclic quadrilateral - exterior angle
    "c10_math_057": None,  # Tangent and radius are perpendicular (conceptual)
    "c10_math_058": None,  # Two tangents from external point are equal (conceptual)
    "c10_math_059": None,  # Chord-tangent intersection (conceptual)
    "c10_math_060": None,  # Alternate segment theorem (conceptual)
    "c10_math_061": None,  # Construction of tangents (conceptual)
    "c10_math_062": None,  # Construction - circumscribing/inscribing (conceptual)
    "c10_math_063": None,  # Construction - hexagon (conceptual)
    "c10_math_064": solve_cylinder,  # Cylinder - curved and total surface area
    "c10_math_065": solve_cylinder,  # Cylinder - volume
    "c10_math_066": solve_cone,  # Cone - curved and total surface area
    "c10_math_067": solve_cone,  # Cone - volume
    "c10_math_068": solve_sphere,  # Sphere - surface area
    "c10_math_069": solve_sphere,  # Sphere - volume
    "c10_math_070": None,  # Combination of solids (conceptual)
    "c10_math_071": solve_trig_identity,  # Trigonometric identities
    "c10_math_072": solve_trig_identity,  # Trigonometric identities - proving
    "c10_math_073": solve_pythagoras,  # Heights and distances - angles of elevation
    "c10_math_074": solve_pythagoras,  # Heights and distances - angles of depression
    "c10_math_075": solve_mean,  # Mean of grouped data - direct method
    "c10_math_076": solve_mean,  # Mean of grouped data - short-cut and step-deviation
    "c10_math_077": solve_median,  # Median and mode for raw and grouped data
    "c10_math_078": None,  # Histogram and finding mode (conceptual)
    "c10_math_079": None,  # Ogive and finding quartiles/median (conceptual)
    "c10_math_080": solve_probability_basic,  # Probability - random experiments
}


# =========================================================================== #
# CLASS 11 (108 nodes)
# =========================================================================== #
CLASS_11 = {
    "c11_math_001": None,  # Sets - representations (conceptual)
    "c11_math_002": None,  # Sets - equal sets, subsets (conceptual)
    "c11_math_003": None,  # Sets - power set (conceptual)
    "c11_math_004": None,  # Sets - Venn diagrams (conceptual)
    "c11_math_005": None,  # Sets - union and intersection (conceptual)
    "c11_math_006": None,  # Sets - difference and complement (conceptual)
    "c11_math_007": None,  # Ordered pairs and Cartesian product (conceptual)
    "c11_math_008": None,  # Relations - definition (conceptual)
    "c11_math_009": None,  # Function as special type of relation (conceptual)
    "c11_math_010": None,  # Function as mapping (conceptual)
    "c11_math_011": None,  # Real valued functions - constant, identity (conceptual)
    "c11_math_012": None,  # Real valued functions - rational, modulus (conceptual)
    "c11_math_013": None,  # Real valued functions - exponential, logarithmic (conceptual)
    "c11_math_014": None,  # Graphs of standard functions (conceptual)
    "c11_math_015": None,  # Sum, difference, product of functions (conceptual)
    "c11_math_016": None,  # Quotient of functions (conceptual)
    "c11_math_017": None,  # Positive and negative angles, radians and degrees (conceptual)
    "c11_math_018": None,  # Relation S = r*theta and area of sector (needs specific solver)
    "c11_math_019": solve_trig_values,  # Trigonometric functions using unit circle
    "c11_math_020": solve_trig_identity,  # Identity sin^2x + cos^2x = 1
    "c11_math_021": None,  # Signs of trigonometric functions in quadrants (conceptual)
    "c11_math_022": None,  # Domain and range of trigonometric functions (conceptual)
    "c11_math_023": None,  # Graphs of trigonometric functions (conceptual)
    "c11_math_024": None,  # Periods of trigonometric functions (conceptual)
    "c11_math_025": solve_trig_identity,  # Compound angles - sin(x+/-y), cos(x+/-y)
    "c11_math_026": solve_trig_identity,  # Compound angles - tan(x+/-y)
    "c11_math_027": solve_trig_identity,  # Sum and difference as products
    "c11_math_028": solve_trig_identity,  # Product to sum or difference
    "c11_math_029": solve_trig_identity,  # Double angle formulas
    "c11_math_030": solve_trig_identity,  # Triple angle formulas
    "c11_math_031": solve_trig_identity,  # Half angle formulas
    "c11_math_032": solve_trig_identity,  # Proving simple trigonometric identities
    "c11_math_033": solve_trig_identity,  # Relationship between trigonometric functions
    "c11_math_034": solve_complex_modulus,  # Complex numbers - introduction
    "c11_math_035": None,  # Algebraic properties of complex numbers (conceptual)
    "c11_math_036": solve_complex_modulus,  # Conjugate, modulus, and argument
    "c11_math_037": None,  # Argand plane and polar representation (conceptual)
    "c11_math_038": None,  # Operations on complex numbers (conceptual)
    "c11_math_039": None,  # Additive and multiplicative inverse (conceptual)
    "c11_math_040": None,  # Square root of a complex number (conceptual)
    "c11_math_041": None,  # Cube roots of unity (conceptual)
    "c11_math_043": None,  # Solving quadratic equations using formula (compute_engine)
    "c11_math_044": None,  # Equations reducible to quadratic form (compute_engine)
    "c11_math_045": None,  # Nature of roots - sum and product (conceptual)
    "c11_math_046": None,  # Framing quadratic equations with given roots (conceptual)
    "c11_math_047": None,  # Quadratic equations with common roots (conceptual)
    "c11_math_048": None,  # Sign of quadratic expression (conceptual)
    "c11_math_049": None,  # Graph of quadratic function (conceptual)
    "c11_math_050": None,  # Linear and quadratic inequalities (conceptual)
    "c11_math_051": None,  # Inequalities involving rational expressions (conceptual)
    "c11_math_052": None,  # Fundamental principle of counting (conceptual)
    "c11_math_053": solve_permutation,  # Factorial notation n! (uses permutation solver)
    "c11_math_054": solve_permutation,  # Permutations (nPr)
    "c11_math_055": solve_permutation,  # Permutations - things together, things never occur
    "c11_math_056": solve_permutation,  # Permutations - alike things and repeated
    "c11_math_057": solve_permutation,  # Circular permutations
    "c11_math_058": solve_combination,  # Combinations (nCr)
    "c11_math_059": solve_combination,  # Mixed problems on permutations and combinations
    "c11_math_060": solve_binomial,  # Binomial Theorem
    "c11_math_061": solve_binomial,  # Pascal's triangle
    "c11_math_062": solve_binomial,  # General and middle term in binomial expansion
    "c11_math_063": solve_ap,  # AP - general term and sum
    "c11_math_064": solve_ap,  # Arithmetic Mean and inserting arithmetic means
    "c11_math_065": solve_gp,  # GP - general term and sum
    "c11_math_066": solve_gp,  # Infinite GP and its sum
    "c11_math_067": solve_gp,  # Geometric Mean and AM-GM relation
    "c11_math_068": None,  # Special sums (Sigma n, Sigma n^2, Sigma n^3) (conceptual)
    "c11_math_069": None,  # Straight lines - shifting of origin (conceptual)
    "c11_math_070": solve_slope,  # Slope of a line and angle between two lines
    "c11_math_071": solve_slope,  # Conditions for parallel and perpendicular lines
    "c11_math_072": None,  # Various forms of equation of a line (conceptual)
    "c11_math_073": None,  # General equation of a line (conceptual)
    "c11_math_074": solve_distance,  # Distance of a point from a line
    "c11_math_075": solve_distance,  # Distance between parallel lines
    "c11_math_076": None,  # Family of lines and locus (conceptual)
    "c11_math_077": solve_midpoint,  # Section formula, incentre, collinearity
    "c11_math_078": solve_circle,  # Circles - standard, diameter, general forms
    "c11_math_079": solve_circle,  # Finding centre, radius, equation of circle
    "c11_math_080": None,  # Conic sections - introduction (conceptual)
    "c11_math_081": None,  # Parabola - standard equations (conceptual)
    "c11_math_082": None,  # Ellipse - standard equation (conceptual)
    "c11_math_083": None,  # Hyperbola - standard equation (conceptual)
    "c11_math_084": None,  # 3D Geometry - coordinate axes (conceptual)
    "c11_math_085": solve_distance,  # 3D Geometry - distance and section formula
    "c11_math_086": None,  # Limits - notion, meaning (conceptual)
    "c11_math_087": None,  # Left hand limit, right hand limit (conceptual)
    "c11_math_088": None,  # Limits of algebraic, trig functions (compute_engine)
    "c11_math_089": None,  # Derivative - meaning (conceptual)
    "c11_math_090": None,  # Differentiation using first principles (conceptual)
    "c11_math_091": None,  # Derivatives of algebraic and trig functions (compute_engine)
    "c11_math_092": None,  # Derivatives of sum, difference, product, quotient (compute_engine)
    "c11_math_093": solve_statistics,  # Statistics - range and mean deviation
    "c11_math_094": solve_statistics,  # Statistics - standard deviation and variance
    "c11_math_095": solve_statistics,  # Statistics - combined mean and standard deviation
    "c11_math_096": solve_probability_basic,  # Probability - random experiments
    "c11_math_097": solve_probability_basic,  # Probability - sure, impossible, mutually exclusive
    "c11_math_098": solve_probability_basic,  # Probability - addition theorem
    "c11_math_099": None,  # AM-GM inequality (conceptual)
    "c11_math_100": None,  # Cauchy-Schwarz inequality (conceptual)
    "c11_math_101": solve_permutation,  # Derangements
    "c11_math_102": None,  # Symmetric functions of roots (Vieta's) (conceptual)
    "c11_math_103": None,  # Transformation of roots (conceptual)
    "c11_math_104": None,  # Rotation theorem and geometry of complex numbers (conceptual)
    "c11_math_105": None,  # Locus problems in complex numbers (conceptual)
    "c11_math_106": None,  # Tangent and normal to parabola (conceptual)
    "c11_math_107": None,  # Tangent and normal to ellipse and hyperbola (conceptual)
    "c11_math_108": None,  # Chord properties and polar equations of conics (conceptual)
    "c11_math_109": solve_trig_values,  # General solution of trigonometric equations
}


# =========================================================================== #
# CLASS 12 (109 nodes)
# =========================================================================== #
CLASS_12 = {
    "c12_math_001": None,  # Types of relations (conceptual)
    "c12_math_002": None,  # Equivalence relations (conceptual)
    "c12_math_003": None,  # Identity, empty, universal relations (conceptual)
    "c12_math_004": None,  # One-to-one and onto functions (conceptual)
    "c12_math_005": None,  # Composite functions (conceptual)
    "c12_math_006": None,  # Inverse of a function (conceptual)
    "c12_math_007": None,  # Sketching graph of function and inverse (conceptual)
    "c12_math_008": None,  # Inverse trigonometric functions (conceptual)
    "c12_math_009": None,  # Principal value branch (conceptual)
    "c12_math_010": None,  # Graphs of inverse trig (conceptual)
    "c12_math_011": solve_trig_identity,  # Inverse trig properties - sin^-1x + cos^-1x
    "c12_math_012": solve_trig_identity,  # Inverse trig properties - sin^-1x +/- sin^-1y
    "c12_math_013": solve_trig_identity,  # Inverse trig properties - tan^-1x +/- tan^-1y
    "c12_math_014": solve_trig_identity,  # Inverse trig - multiple angle formulas
    "c12_math_015": solve_trig_identity,  # Inverse trig - 3tan^-1x
    "c12_math_016": None,  # Matrices - concept, notation (conceptual)
    "c12_math_017": None,  # Types of matrices (conceptual)
    "c12_math_018": None,  # Transpose of a matrix (conceptual)
    "c12_math_019": None,  # Symmetric and skew-symmetric (conceptual)
    "c12_math_020": None,  # Matrix addition and scalar multiplication (conceptual)
    "c12_math_021": None,  # Matrix multiplication (conceptual)
    "c12_math_022": None,  # Non-commutativity (conceptual)
    "c12_math_023": None,  # Invertible matrices (conceptual)
    "c12_math_024": None,  # Determinants of square matrices (needs specific solver)
    "c12_math_025": None,  # Minors and cofactors (conceptual)
    "c12_math_026": None,  # Properties of determinants (conceptual)
    "c12_math_027": None,  # Area of triangle using determinants (conceptual)
    "c12_math_028": None,  # Adjoint of a square matrix (conceptual)
    "c12_math_029": None,  # Inverse of a matrix using adjoint (conceptual)
    "c12_math_030": None,  # Solving linear equations using inverse (conceptual)
    "c12_math_031": None,  # Consistency and inconsistency (conceptual)
    "c12_math_032": None,  # Continuity of a function at a point (conceptual)
    "c12_math_033": None,  # Continuity in an interval (conceptual)
    "c12_math_034": None,  # Removable discontinuity (conceptual)
    "c12_math_035": None,  # Differentiability and relation to continuity (conceptual)
    "c12_math_036": None,  # Derivatives of composite functions (compute_engine)
    "c12_math_037": None,  # Derivatives of inverse trig (compute_engine)
    "c12_math_038": None,  # Derivatives of exponential and logarithmic (compute_engine)
    "c12_math_039": None,  # Implicit differentiation (conceptual)
    "c12_math_040": None,  # Logarithmic differentiation (conceptual)
    "c12_math_041": None,  # Derivatives of parametric functions (conceptual)
    "c12_math_042": None,  # Differentiation of one function w.r.t. another (conceptual)
    "c12_math_043": None,  # Second order derivatives (compute_engine)
    "c12_math_044": None,  # Applications - rate of change (conceptual)
    "c12_math_045": None,  # Increasing and decreasing functions (conceptual)
    "c12_math_046": None,  # Tangent and normal (conceptual)
    "c12_math_047": None,  # Maxima and minima - critical points (conceptual)
    "c12_math_048": None,  # Maxima and minima - second derivative test (conceptual)
    "c12_math_049": None,  # Integration as inverse of differentiation (compute_engine)
    "c12_math_050": None,  # Standard integrals (compute_engine)
    "c12_math_051": None,  # Integration of trigonometric powers (conceptual)
    "c12_math_052": None,  # Integration by substitution (conceptual)
    "c12_math_053": None,  # Integration of tan, cot, sec, cosec (compute_engine)
    "c12_math_054": None,  # Integration of special forms (conceptual)
    "c12_math_055": None,  # Integration of forms (px+q)/(ax^2+bx+c) (conceptual)
    "c12_math_056": None,  # Integration of trigonometric forms (conceptual)
    "c12_math_057": None,  # Integration by partial fractions (conceptual)
    "c12_math_058": None,  # Integration by parts (conceptual)
    "c12_math_059": None,  # Definite integral and FTC (conceptual)
    "c12_math_060": None,  # Properties of definite integrals (conceptual)
    "c12_math_061": None,  # Area under simple curves (conceptual)
    "c12_math_062": None,  # Area between two curves (conceptual)
    "c12_math_063": None,  # Area bounded by curves (conceptual)
    "c12_math_064": None,  # Differential equations - definition (conceptual)
    "c12_math_065": None,  # Formation of differential equations (conceptual)
    "c12_math_066": None,  # General and particular solutions (conceptual)
    "c12_math_067": None,  # Solution by separation of variables (conceptual)
    "c12_math_068": None,  # Homogeneous differential equations (conceptual)
    "c12_math_069": None,  # Linear differential equations (conceptual)
    "c12_math_070": None,  # Vectors - scalars vs vectors (conceptual)
    "c12_math_071": None,  # Types of vectors (conceptual)
    "c12_math_072": solve_vector_magnitude,  # Position vector and components
    "c12_math_073": None,  # Vector addition and scalar multiplication (conceptual)
    "c12_math_074": solve_midpoint,  # Section formula in vectors
    "c12_math_075": solve_dot_product,  # Scalar (dot) product
    "c12_math_076": solve_cross_product,  # Vector (cross) product
    "c12_math_077": None,  # Direction cosines and direction ratios (conceptual)
    "c12_math_078": None,  # 3D Geometry - equation of a line (conceptual)
    "c12_math_079": None,  # 3D Geometry - coplanar and skew lines (conceptual)
    "c12_math_080": None,  # 3D Geometry - equation of a plane (conceptual)
    "c12_math_081": None,  # 3D Geometry - forms of plane equation (conceptual)
    "c12_math_082": solve_distance,  # 3D Geometry - distance of a point from a plane
    "c12_math_083": None,  # 3D Geometry - angle between lines, planes (conceptual)
    "c12_math_084": None,  # 3D Geometry - intersection of line and plane (conceptual)
    "c12_math_085": None,  # Linear Programming - introduction (conceptual)
    "c12_math_086": None,  # Linear Programming - mathematical formulation (conceptual)
    "c12_math_087": None,  # Linear Programming - graphical solution (conceptual)
    "c12_math_088": None,  # Linear Programming - bounded/unbounded (conceptual)
    "c12_math_089": solve_probability_basic,  # Conditional probability
    "c12_math_090": solve_probability_basic,  # Multiplication theorem and independent events
    "c12_math_091": solve_probability_basic,  # Theorem of total probability
    "c12_math_092": solve_probability_basic,  # Bayes' theorem
    "c12_math_093": solve_probability_basic,  # Random variable and probability distribution
    "c12_math_094": solve_mean,  # Mean of random variable
    "c12_math_095": None,  # L'Hopital's rule (conceptual)
    "c12_math_096": None,  # Rolle's theorem (conceptual)
    "c12_math_097": None,  # Lagrange's Mean Value Theorem (conceptual)
    "c12_math_098": solve_cross_product,  # Scalar triple product
    "c12_math_099": solve_cross_product,  # Vector triple product
    "c12_math_100": None,  # Properties of definite integrals (conceptual)
    "c12_math_101": None,  # Wallis' formula (conceptual)
    "c12_math_102": None,  # Exact differential equations (conceptual)
    "c12_math_103": None,  # Bernoulli's differential equation (conceptual)
    "c12_math_104": None,  # Area under parametric and polar curves (conceptual)
    "c12_math_105": solve_probability_basic,  # Binomial distribution
    "c12_math_106": None,  # Elementary row operations and rank (conceptual)
    "c12_math_107": None,  # Product of determinants (conceptual)
    "c12_math_108": None,  # Image of point in plane (conceptual)
    "c12_math_109": None,  # Bisector planes (conceptual)
}


# =========================================================================== #
# MASTER REGISTRY
# =========================================================================== #
NODE_SOLVERS = {}
NODE_SOLVERS.update(CLASS_1)
NODE_SOLVERS.update(CLASS_2)
NODE_SOLVERS.update(CLASS_3)
NODE_SOLVERS.update(CLASS_4)
NODE_SOLVERS.update(CLASS_5)
NODE_SOLVERS.update(CLASS_6)
NODE_SOLVERS.update(CLASS_7)
NODE_SOLVERS.update(CLASS_8)
NODE_SOLVERS.update(CLASS_9)
NODE_SOLVERS.update(CLASS_10)
NODE_SOLVERS.update(CLASS_11)
NODE_SOLVERS.update(CLASS_12)


def get_solver_for_node(node_id: str):
    """Return the solver function for a given node_id, or None if conceptual."""
    return NODE_SOLVERS.get(node_id)


def get_calc_node_count():
    """Count how many nodes have a solver (calculation nodes)."""
    return sum(1 for v in NODE_SOLVERS.values() if v is not None)


def get_conceptual_node_count():
    """Count how many nodes are conceptual (no solver)."""
    return sum(1 for v in NODE_SOLVERS.values() if v is None)


def solve_for_node(node_id: str, message: str):
    """Try to solve a question using the node's assigned solver.
    Returns ComputeResult or None.
    """
    solver = get_solver_for_node(node_id)
    if solver is None:
        return None
    try:
        return solver(message.lower().strip())
    except Exception:
        return None
