"""test_fixf4_nginx_internal.py — LAUNCH-FIX-F4: nginx recon surfaces
are loopback-only (structural pins on deploy/nginx.conf).

Background (audit laneB MEDIUM): /metrics (Prometheus handler names +
status counts), /docs and /openapi.json (full endpoint map) were
allow-listed for ALL RFC1918 ranges — including 172.16.0.0/12, the
docker bridge network, so any request tunneled through a sidecar read
as "internal" and the endpoints were effectively public on :80.

These tests parse the shipped conf structurally (no nginx binary on
this host; nginx -t runs at ship time in the container). They pin:
  1. the three locations allow ONLY loopback (127.0.0.1, ::1)
  2. no RFC1918 broad allows remain anywhere in the file
  3. braces balance and every location still has a proxy_pass (the
     tightening did not break routing)
  4. the public API/health/frontend locations are NOT access-restricted
     (no over-tightening: students must not lose /api/)
"""

import os
import re

CONF = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(
    os.path.abspath(__file__)))), "nginx.conf")

with open(CONF, encoding="utf-8") as fh:
    _TEXT = fh.read()


def _location_block(name):
    m = re.search(r"location\s+" + re.escape(name) + r"\s*\{",
                  _TEXT)
    assert m, f"location {name} missing from nginx.conf"
    start = m.end() - 1
    depth = 0
    for i in range(start, len(_TEXT)):
        if _TEXT[i] == "{":
            depth += 1
        elif _TEXT[i] == "}":
            depth -= 1
            if depth == 0:
                return _TEXT[start:i + 1]
    raise AssertionError(f"unbalanced braces in location {name}")


def test_internal_locations_allow_only_loopback():
    for loc in ("/metrics", "/docs", "/openapi.json"):
        block = _location_block(loc)
        allows = re.findall(r"allow\s+([^;]+);", block)
        assert sorted(allows) == sorted(["127.0.0.1", "::1"]), \
            f"{loc} must allow only loopback, got {allows}"
        assert re.search(r"deny\s+all\s*;", block), \
            f"{loc} must end with deny all"


def test_no_broad_private_allows_remain():
    # directives only — comments legitimately quote the old CIDRs
    directives = "\n".join(
        ln for ln in _TEXT.splitlines() if not ln.lstrip().startswith("#"))
    for cidr in ("10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16"):
        assert cidr not in directives, \
            f"broad RFC1918 allow {cidr} still present (docker-bridge " \
            "sources would pass)"


def test_braces_balance():
    assert _TEXT.count("{") == _TEXT.count("}")


def test_every_location_still_proxies():
    for name in re.findall(r"location\s+([^\s{]+)\s*\{", _TEXT):
        block = _location_block(name)
        assert "proxy_pass" in block, f"location {name} lost its proxy_pass"


def test_public_locations_not_over_tightened():
    for loc in ("/api/", "/", "/health"):
        block = _location_block(loc)
        assert "deny all" not in block, \
            f"{loc} must stay public (student-facing); only the recon " \
            "surfaces are loopback-gated"
        assert "proxy_pass" in block
