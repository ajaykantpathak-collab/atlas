"""Problem type descriptions for semantic routing.

Each description captures the MEANING of the problem type, not keywords.
These are embedded by MiniLM and compared to student questions.
"""

PROBLEM_TYPE_DESCRIPTIONS = {
    # ── Arithmetic ──
    "basic_arithmetic": "Add, subtract, multiply, or divide simple numbers. Basic numerical calculation without algebra.",
    "add_fractions": "Add or subtract fractions. Find sum or difference of fractional numbers with different denominators.",
    "multiply_fractions": "Multiply or divide fractions. Product or quotient of fractional numbers.",
    "divide_fractions": "Divide one fraction by another. Quotient of fractional numbers.",
    "exponents_problem": "Simplify expressions with powers and exponents. Find value of a^n, simplify exponential expressions, find last digit of powers.",
    "square_root_problem": "Find or simplify square roots. Evaluate sqrt of a number, simplify surds, rationalize denominators with square roots.",
    "cube_root_problem": "Find cube roots of numbers. Evaluate cube root, simplify expressions with cube roots.",
    "logarithm_problem": "Evaluate or simplify logarithmic expressions. Find value of log, solve logarithmic equations, apply log properties.",

    # ── Number Theory ──
    "hcf_lcm_problem": "Find HCF, GCD, or LCM of numbers. Highest common factor, least common multiple, prime factorization to find HCF or LCM, find smallest number divisible by given numbers, minimum rooms with equal grouping.",
    "prime_factorization_problem": "Find prime factorization of a number. Express number as product of primes, find exponent of a prime in factorization, identify composite numbers.",
    "check_prime": "Check if a number is prime or irrational. Prove a number is irrational, prove sqrt is irrational, check primality.",

    # ── Algebra ──
    "solve_equation_problem": "Solve system of linear equations in two variables. Find x and y from simultaneous equations, solve graphically, word problems leading to linear equations, ticket sales problems, digit problems.",
    "solve_quadratic": "Solve quadratic equation ax^2+bx+c=0. Find roots using quadratic formula, determine nature of roots using discriminant, find value when fraction simplifies to quadratic.",
    "polynomial_zeros_problem": "Find zeroes or roots of a polynomial. Find zeros of quadratic or cubic polynomial, verify relationship between zeroes and coefficients, find polynomial with given zeros.",
    "factor_polynomial_problem": "Factorize a polynomial. Split middle term, factor theorem, remainder theorem, polynomial division.",
    "polynomial_division_problem": "Divide one polynomial by another. Polynomial long division, find quotient and remainder using remainder theorem.",
    "expand_expression_problem": "Expand algebraic expressions. Expand (a+b)^2, (a+b)^3, binomial expansion of algebraic expressions.",
    "ratio_proportion_problem": "Solve ratio and proportion problems. Find unknown in ratio, divide quantity in given ratio, compare ratios, basic proportionality theorem, Thales theorem, divide sides of triangle in ratio.",
    "direct_proportion_problem": "Solve direct proportion problems. When one quantity increases, other increases proportionally.",
    "inverse_proportion_problem": "Solve inverse proportion problems. When one quantity increases, other decreases proportionally, pipes filling tank, work rate problems.",
    "function_composition_problem": "Find composition of functions, find domain and range of functions, check if relation is a function, find fog(x) or gof(x).",

    # ── Commercial Math ──
    "find_percentage": "Find percentage or percentage change. Calculate what percent one number is of another, percentage increase or decrease.",
    "find_percentage_of": "Find percentage of a quantity. Calculate discount, tax, GST, find percentage of a given amount.",
    "percentage_change": "Find percentage increase or decrease. Calculate change in price, population growth percentage, depreciation percentage.",
    "profit_loss_problem": "Calculate profit, loss, cost price, selling price, marked price. Find gain or loss percentage, discount calculations.",
    "discount_problem": "Calculate discount on marked price. Find discount percentage, selling price after discount, marked price given discount.",
    "simple_interest_problem": "Calculate simple interest, principal, rate, or time. SI = PRT/100, EMI flat rate, perpetuity present value.",
    "compound_interest_problem": "Calculate compound interest, amount with compound interest. CI formula, compounded annually or semi-annually, population growth, depreciation, bond pricing, sinking fund, EMI reducing balance.",

    # ── Sequences ──
    "ap_nth_term_problem": "Find nth term of arithmetic progression. Find specific term of AP, find which term has given value, find middle term of AP, common difference of AP.",
    "ap_sum_problem": "Find sum of arithmetic progression. Sum of first n terms of AP, sum of last n terms, find number of terms given sum, find sum given nth term formula.",
    "gp_nth_term_problem": "Find nth term of geometric progression. Find specific term of GP, common ratio of GP.",
    "gp_sum_problem": "Find sum of geometric progression. Sum of first n terms of GP, sum of infinite GP, find sum given common ratio.",
    "gp_infinite_sum_problem": "Find sum of infinite geometric progression. Sum to infinity of GP with |r| < 1.",

    # ── Matrices ──
    "matrix_multiply_problem": "Multiply two matrices. Find product AB, check if matrices can be multiplied, find dimensions of product matrix, matrix algebra properties like (A+B)^2.",
    "matrix_add_problem": "Add or subtract matrices. Find A+B or A-B, scalar multiplication of matrix.",
    "matrix_inverse_and_solve": "Find inverse of matrix and solve system of equations. Use matrix method to solve linear equations, find A^(-1), solve using matrix inversion, Cramer's rule.",
    "matrix_transpose_problem": "Find transpose of matrix. Find A^T, properties of transpose, (AB)^T = B^T A^T.",
    "find_determinant": "Find determinant of matrix. Calculate |A|, properties of determinants, |adj A|, |AB| = |A||B|, determinant of 3x3 matrix, Cramer's rule for equilibrium.",
    "verify_symmetric_problem": "Check if matrix is symmetric. Verify A^T = A, find values making matrix symmetric.",
    "verify_skew_symmetric_problem": "Check if matrix is skew-symmetric. Verify A^T = -A, find values making matrix skew-symmetric, find parameters for skew-symmetric matrix.",

    # ── Vectors ──
    "vector_operations": "Perform vector operations. Dot product, cross product, scalar triple product, find vectors from given conditions, component operations.",
    "angle_between_vectors_problem": "Find angle between two vectors. Use dot product to find angle, check if vectors are perpendicular, find if r is perpendicular to a cross b.",
    "vector_projection_problem": "Find projection of one vector on another. Find projected length, component of vector along a direction, scalar projection.",
    "area_triangle_vectors": "Find area of triangle or parallelogram using vectors. Use cross product to find area, area of triangle with position vectors, area of parallelogram formed by vectors.",
    "direction_cosines_problem": "Find direction cosines and direction ratios. Find angle of vector with axes, direction cosines of vector or line.",
    "distance_3d_problem": "Find distance in 3D space. Distance from point to line in 3D, distance from point to plane, distance of point from axis, point of intersection of lines in 3D, find perpendicular line to two skew lines.",
    "section_3d_problem": "Find section formula in 3D. Find point dividing line segment in ratio in 3D, midpoint in 3D, coordinates of point on line in 3D.",

    # ── Coordinate Geometry ──
    "distance_formula_problem": "Find distance between two points in 2D. Distance between points on coordinate plane, distance from point to axis, find which point is farthest or nearest.",
    "midpoint_problem": "Find midpoint of line segment. Find coordinates of midpoint, find point dividing segment in ratio using section formula, midpoint theorem of triangle, mirror image reflection.",
    "section_formula_problem": "Find point dividing line segment in given ratio. Section formula in 2D, find coordinates of point dividing line internally or externally.",
    "slope_problem": "Find slope of line. Find gradient, check if lines are parallel or perpendicular using slopes, find slope from two points.",
    "line_equation_problem": "Find equation of line. Equation of line in various forms, find equation of parallel or perpendicular line, find if lines are parallel or intersecting, find value of k for parallel lines.",
    "circle_equation_problem": "Find equation of circle. General equation of circle, find centre and radius from equation, find equation of circle with given conditions, conic sections including ellipse and hyperbola.",
    "parabola_vertex_problem": "Find vertex, focus, or equation of parabola. Standard form of parabola, find axis, latus rectum, directrix of parabola, conic section properties.",

    # ── Geometry ──
    "area_triangle_problem": "Find area of triangle. Area using base and height, Heron's formula, area of similar triangles, find sides of triangle circumscribing circle, median of similar triangles.",
    "area_circle_problem": "Find area or circumference of circle. Area of circle, circumference, ratio of areas of circles, find radius of circle, circle inscribed in square.",
    "area_rectangle_problem": "Find area or perimeter of rectangle, square, or quadrilateral. Identify type of quadrilateral from vertices, area of rectangle from coordinates.",
    "area_parallelogram_problem": "Find area of parallelogram or rhombus. Area using base and height, prove parallelogram circumscribing circle is rhombus.",
    "area_rhombus_problem": "Find area of rhombus. Area using diagonals, properties of rhombus.",
    "area_trapezium_problem": "Find area of trapezium. Area using parallel sides and height.",
    "pythagoras_hypotenuse_problem": "Find hypotenuse or longest side using Pythagoras theorem. Find length of tangent from external point to circle, find distance using right angle triangle, find radius from tangent length.",
    "pythagoras_side_problem": "Find a side of right triangle using Pythagoras theorem. Find leg of right triangle, find missing side, find diagonal of rectangle.",
    "tangent_equation_problem": "Find tangent to circle or properties of tangent. Length of tangent from external point, tangent properties, quadrilateral circumscribing circle, prove properties of tangents, angle in tangent constructions.",
    "sector_area_problem": "Find area of sector or segment of circle. Area of sector with given angle and radius, area of segment, arc length and sector area, area grazed by animal tied at corner, water sprinkler area.",
    "arc_length_problem": "Find length of arc of circle. Arc length given angle and radius, find angle given arc length and radius.",

    # ── Mensuration ──
    "volume_cube_problem": "Find volume or surface area of cube. Edge, diagonal, volume, total surface area of cube.",
    "volume_cuboid_problem": "Find volume or surface area of cuboid. Volume, total surface area, lateral surface area of cuboid.",
    "volume_cylinder_problem": "Find volume or surface area of cylinder. Volume of cylinder, total or curved surface area, hollow cylinder, cylinder with cavity, surface area of remaining solid.",
    "volume_cone_problem": "Find volume or surface area of cone. Volume of cone, frustum of cone, cone with ice cream, cone hollowed out, surface area of cone combined with other solids.",
    "volume_sphere_problem": "Find volume or surface area of sphere. Volume, surface area of sphere, rate of change of volume of sphere.",
    "volume_hemisphere_problem": "Find volume or surface area of hemisphere. Volume of hemisphere, hemisphere on cone, hemisphere on cylinder, combined solids with hemisphere.",
    "volume_frustum_problem": "Find volume or surface area of frustum of cone. Frustum of cone, bucket shape, lamp shade.",

    # ── Trigonometry ──
    "trig_value_problem": "Find values of trigonometric ratios. Evaluate sin, cos, tan at specific angles, find x in trigonometric equation like 2sin5x=sqrt(3), find values of trig expressions.",
    "prove_identity": "Prove trigonometric identities. Prove that LHS = RHS for trigonometric expressions, prove equations involving sin, cos, tan, sec, cosec, cot, prove identities like (cosA-sinA+1)/(cosA+sinA-1) = cosecA+cotA.",
    "inverse_trig_problem": "Find values or domain of inverse trigonometric functions. Evaluate tan^-1, sin^-1, cos^-1, sec^-1, find domain of inverse trig functions, principal value branch.",
    "heights_distances_problem": "Find height, distance, or angle of elevation/depression. Angle of elevation from point to top of tower or building, find height of chimney, find distance using angle of elevation, India Gate type problems.",

    # ── Complex Numbers ──
    "complex_modulus_problem": "Find modulus of complex number. |z|, |z1+z2|, properties of modulus, find magnitude of complex number.",
    "complex_argument_problem": "Find argument of complex number. arg(z), polar form, find argument of complex number, convert to polar form.",

    # ── Calculus ──
    "continuity_find_k": "Find value of k for continuity. Find k such that piecewise function is continuous at a point, check continuity at given point.",
    "deriv_at_point": "Find derivative at a point or derivative of function. Find f'(x), f'(1), dy/dx, d^2y/dx^2, derivative of inverse trig, logarithmic differentiation, implicit differentiation, parametric differentiation, prove derivative results.",
    "find_critical_points": "Find critical points of function. Find where derivative is zero, classify as maxima or minima, find critical points of profit or cost function, optimize revenue or cost.",
    "max_min_optimization": "Find maximum or minimum value of function. Optimize function, find maximum profit, minimum cost, find extreme values, box optimization.",
    "increasing_decreasing_problem": "Find intervals where function is increasing or decreasing. Find monotonicity, find intervals of increase and decrease.",
    "rate_of_change": "Find rate of change. Rate of volume change, rate of surface area change, marginal cost, marginal revenue, depreciation rate, related rates problems, rate proportional to surface area.",
    "indefinite_integral": "Find indefinite integral. Integrate functions, find antiderivative, integration by substitution, integration by parts, partial fractions integration, integral of trig or logarithmic functions.",
    "definite_integral": "Evaluate definite integral. Integral from a to b, integral with limits, evaluate using properties, integral of absolute value, King property integral, integral from 0 to 1.",
    "area_between_curves": "Find area between curves using integration. Area enclosed by curve and axis, area between two curves, area of region bounded by curves, consumer surplus, producer surplus using integration.",
    "solve_de": "Solve differential equation. Find general or particular solution of differential equation, find order and degree, solve homogeneous or linear differential equation, particular solution with initial condition.",
    "max_height": "Find maximum height of projectile. Maximum height, time of flight, range of projectile.",

    # ── Probability ──
    "basic_probability_problem": "Find basic probability. Probability of simple events, dice problems, coin toss, card problems, probability of letters in word, probability of equally likely outcomes, blood type probability.",
    "conditional_probability_problem": "Find conditional probability. Probability given that, Bayes theorem, probability of exactly one event, total probability, find probability given condition, screen time and anxiety probability, probability of selection given independent events.",
    "binomial_probability_problem": "Find binomial probability. Binomial distribution, Poisson distribution, find P(X=k), coin tossed n times find probability of heads, mean and variance of binomial distribution, failures following Poisson distribution.",

    # ── Statistics ──
    "mean_problem": "Find mean of data. Arithmetic mean, mean of grouped data, find missing frequency given mean, moving average, empirical relation between mean median and mode, average revenue.",
    "median_problem": "Find median of data. Median of grouped or ungrouped data, find median class, median height, cumulative frequency for median, effect on median when observations change.",
    "mode_problem": "Find mode of data. Mode of grouped data, find missing frequency given mode, modal class, empirical relation with mean and median.",
    "standard_deviation_problem": "Find standard deviation, variance, or analyze distribution. Standard deviation of data, variance, normal distribution, hypothesis testing, t-test, degree of freedom, central limit theorem, sampling distribution, trend components, match trend types.",
    "correlation_problem": "Find correlation between variables. Karl Pearson correlation, Spearman rank correlation, find correlation coefficient.",
    "regression_line_problem": "Find regression line or trend line. Least squares method, line of best fit, predict future values, trend line fitting, moving average trend.",
    "weighted_mean_problem": "Find weighted mean. Mean with weights, combined mean, weighted average.",

    # ── Permutations & Combinations ──
    "permutation_problem": "Find number of permutations or arrangements. Arrange objects, nPr, permutations with restrictions, arrange letters of word.",
    "combination_problem": "Find number of combinations or selections. Select objects, nCr, form committee, choose from group.",
    "binomial_coefficient_problem": "Find binomial coefficient. Find nCr value, properties of binomial coefficients.",
    "binomial_expansion_problem": "Expand using binomial theorem. Find specific term in binomial expansion, find coefficient, expand (a+b)^n.",
    "factorial_problem": "Find factorial of number. Calculate n!, simplify factorial expressions, find last digit of factorial.",

    # ── Sets & Relations ──
    "set_operations_problem": "Find set operations, relations, or properties. Union, intersection, reflexive, symmetric, transitive, equivalence relation, domain and range of relation, traffic flow as relation, check if relation is function.",

    # ── Linear Programming ──
    "lpp_optimize": "Solve linear programming problem. Maximize or minimize Z subject to constraints, find feasible region, find optimal solution, formulate LPP, find maximum distance or profit with constraints, identify redundant constraints.",
    "profit_maximization": "Find profit maximizing output. Given marginal cost and marginal revenue functions, find optimum output and maximum profit, find where MR = MC.",
    "speed_distance_time_problem": "Solve speed, distance, and time problems. Find speed of train or boat, upstream downstream speed, average speed, uniform speed, race and start problems, time taken for journey.",

    # ── "Show That" / "Prove That" Problem Types ──
    "show_increasing_problem": "Show that a function is always increasing or increasing on an interval. Prove f is increasing by showing derivative f'(x) is greater than zero. Show that function is monotonically increasing.",
    "show_decreasing_problem": "Show that a function is always decreasing or decreasing on an interval. Prove f is decreasing by showing derivative f'(x) is less than zero. Show that function is monotonically decreasing.",
    "show_max_at_point": "Show that a function has a maximum at a given point. Prove f has maximum value at x=a by showing f'(a)=0 and f''(a)<0. Verify that the function attains its maximum at a specific point.",
    "show_min_at_point": "Show that a function has a minimum at a given point. Prove f has minimum value at x=a by showing f'(a)=0 and f''(a)>0. Verify that the function attains its minimum at a specific point.",

    # ── Case Study Problem Types ──
    "case_study_optimization": "Case study optimization problem. Real-world word problem about maximizing profit, minimizing cost, maximizing volume of box, maximizing area with fixed perimeter. Read scenario and set up optimization function then find maximum or minimum.",
    "case_study_lpp": "Case study linear programming problem. Real-world LPP word problem about factory production, diet planning, resource allocation. Maximize or minimize objective subject to constraints, find optimal production plan.",
    "case_study_probability": "Case study probability problem. Real-world probability word problem about drawing balls from bag, rolling dice, drawing cards, coin tosses. Calculate probability of events from a described scenario.",
}
