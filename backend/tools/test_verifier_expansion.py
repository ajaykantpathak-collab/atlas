import math, re

def test_trig_eq():
    q = "if 2 cos 3x = 1, find x"
    claim = 20.0
    m = re.search(r"(\d*)\s*(sin|cos|tan)\s*\(?\s*(\d*)\s*([a-z])\s*\)?\s*=\s*(sqrt\s*\d+|[\d.]+)", q, re.I)
    assert m is not None
    k = float(m.group(1) or 1)
    fn = m.group(2).lower()
    a = float(m.group(3) or 1)
    rhs = float(m.group(5))
    rad = math.radians(a * claim)
    val = k * (math.cos(rad) if fn == "cos" else (math.sin(rad) if fn == "sin" else math.tan(rad)))
    assert abs(val - rhs) < 1e-4
    print("test_trig_eq passed!")

def test_slope():
    q = "find the slope of the line joining (2,-3) and (-4, 5)"
    pts = re.findall(r"\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)", q)
    assert len(pts) == 2
    x1, y1 = float(pts[0][0]), float(pts[0][1])
    x2, y2 = float(pts[1][0]), float(pts[1][1])
    m = (y2 - y1) / (x2 - x1)
    claim = -4.0 / 3.0
    assert abs(m - claim) < 1e-4
    print("test_slope passed!")

def test_hcf_lcm():
    a, b = 12, 18
    claim_lcm = 36
    hcf = math.gcd(a, b)
    assert hcf * claim_lcm == a * b
    print("test_hcf_lcm passed!")

if __name__ == "__main__":
    test_trig_eq()
    test_slope()
    test_hcf_lcm()
