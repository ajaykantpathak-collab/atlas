// cosmos.js — hero particle field. Three scenes, live-switching:
//   orbit  — elliptical ring (Solar System)
//   band   — wide diagonal dust band (Milky Way)
//   hole   — bright accretion ring around a dark core (Black Hole)
// Pointer is a "passing mass": particles get nudged, then settle back.
(function () {
  const cv = document.getElementById("cosmos");
  if (!cv) return;
  const ctx = cv.getContext("2d");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let W, H, dpr, parts = [], dust = [], t = 0, scene = "orbit";
  const mouse = { x: -9e3, y: -9e3 };
  const RING = { a: 0.34, b: 0.30 };

  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function seed() {
    parts = []; dust = [];
    const n = Math.min(3600, Math.floor(W * H / 340));
    for (let i = 0; i < n; i++) {
      const p = {
        th: Math.random() * Math.PI * 2,
        x: 0, y: 0, vx: 0, vy: 0,
        tw: Math.random() * Math.PI * 2,
        gold: Math.random() < 0.05
      };
      if (scene === "orbit") {
        const outer = Math.random() < 0.22;
        p.rad = outer ? 1.10 + Math.random() * 0.28 : 1 + (Math.random() - 0.5) * 0.10;
        p.sp = (0.0016 + Math.random() * 0.0022) / p.rad;
        p.sz = outer ? 0.3 + Math.random() * 0.6 : 0.4 + Math.random() * 1.3;
      } else if (scene === "band") {
        // band across the diagonal; particles drift along it
        p.rad = (Math.random() - 0.5) * 0.34;          // band thickness
        p.off = Math.random();                          // 0..1 along band
        p.sp = 0.0004 + Math.random() * 0.0009;         // slow drift
        p.sz = 0.3 + Math.random() * 1.0;
      } else { // hole — tight luminous ring, minor chaos
        const outer = Math.random() < 0.18;
        p.rad = outer ? 1.18 + Math.random() * 0.22 : 1 + (Math.random() - 0.5) * 0.07;
        p.sp = (0.003 + Math.random() * 0.004) / p.rad; // spins faster — accretion
        p.sz = outer ? 0.3 + Math.random() * 0.5 : 0.4 + Math.random() * 1.1;
      }
      parts.push(p);
    }
    const dn = scene === "band" ? 200 : 320;
    for (let i = 0; i < dn; i++) {
      dust.push({
        x: Math.random() * W, y: Math.random() * H,
        s: Math.random() < 0.85 ? 0.5 : 1.1,
        a: 0.15 + Math.random() * 0.5,
        drift: (Math.random() - 0.5) * 0.05
      });
    }
  }

  // soft glow sprite — stars are light, not pixels
  const SPR = document.createElement("canvas");
  SPR.width = SPR.height = 32;
  (() => {
    const s = SPR.getContext("2d");
    const g = s.createRadialGradient(16, 16, 0, 16, 16, 16);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.35, "rgba(230,238,255,0.55)");
    g.addColorStop(1, "rgba(230,238,255,0)");
    s.fillStyle = g; s.fillRect(0, 0, 32, 32);
  })();

  const cx = () => W * 0.56, cy = () => H * 0.46;
  const BAND_ANG = -0.5; // milky way tilts

  function home(p) {
    const X = cx(), Y = cy();
    if (scene === "orbit") {
      return [X + Math.cos(p.th) * W * RING.a * p.rad,
              Y + Math.sin(p.th) * H * RING.b * p.rad];
    }
    if (scene === "band") {
      const bx = p.off * W * 1.3 - W * 0.15;
      const by = Y + (bx - X) * Math.tan(BAND_ANG) + p.rad * H;
      return [bx, by];
    }
    // hole — circle, not ellipse; ring is symmetric
    const r = Math.min(W, H) * 0.30 * p.rad;
    return [X + Math.cos(p.th) * r, Y + Math.sin(p.th) * r];
  }

  function tick() {
    t += 1;
    ctx.clearRect(0, 0, W, H);

    for (const d of dust) {
      d.x += d.drift;
      if (d.x < 0) d.x = W; if (d.x > W) d.x = 0;
      ctx.globalAlpha = d.a * (0.6 + 0.4 * Math.sin(t * 0.01 + d.y));
      ctx.fillStyle = "#cfd6e8";
      ctx.fillRect(d.x, d.y, d.s, d.s);
    }

    // black hole core: a void the ring wraps
    if (scene === "hole") {
      const r = Math.min(W, H) * 0.30;
      const g = ctx.createRadialGradient(cx(), cy(), 0, cx(), cy(), r);
      g.addColorStop(0, "rgba(0,0,0,0.98)");
      g.addColorStop(0.82, "rgba(0,0,0,0.94)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(cx(), cy(), r, 0, 7); ctx.fill();
      // photon sphere rim
      ctx.globalAlpha = 0.35 + 0.1 * Math.sin(t * 0.02);
      ctx.strokeStyle = "#e8d9a8"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(cx(), cy(), r * 0.98, 0, 7); ctx.stroke();
      ctx.globalAlpha = 1;
    }

    for (const p of parts) {
      if (!reduced) {
        if (scene === "band") { p.off += p.sp; if (p.off > 1) p.off -= 1; }
        else p.th += p.sp;
      }
      const [hx, hy] = home(p);
      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < 14400) {
        const d = Math.sqrt(d2) || 1;
        const f = (1 - d / 120) * 2.2;
        p.vx += (dx / d) * f; p.vy += (dy / d) * f;
      }
      p.vx += (hx - p.x) * 0.045; p.vy += (hy - p.y) * 0.045;
      p.vx *= 0.86; p.vy *= 0.86;
      p.x += p.vx; p.y += p.vy;
      if (!p.x && !p.y) { p.x = hx; p.y = hy; }

      const glow = 0.45 + 0.55 * Math.sin(p.tw + t * 0.03);
      ctx.globalAlpha = 0.35 + glow * 0.6;
      const d = p.sz * 6;
      if (p.gold) { ctx.globalAlpha *= 0.9; }
      ctx.globalCompositeOperation = "lighter";
      ctx.drawImage(SPR, p.x - d / 2, p.y - d / 2, d, d);
      if (p.gold) { // warm core fleck
        ctx.globalAlpha *= 0.8;
        ctx.fillStyle = "#d9b45c";
        ctx.fillRect(p.x, p.y, p.sz * 0.8, p.sz * 0.8);
      }
      ctx.globalCompositeOperation = "source-over";
    }
    ctx.globalAlpha = 1;

    // soft bloom
    const gR = scene === "band" ? 0.42 : 0.3;
    const g = ctx.createRadialGradient(cx(), cy(), 0, cx(), cy(), Math.min(W, H) * gR);
    g.addColorStop(0, scene === "hole" ? "rgba(232,217,168,0.045)" : "rgba(200,215,240,0.05)");
    g.addColorStop(1, "rgba(200,215,240,0)");
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(cx(), cy(), Math.min(W, H) * gR, 0, 7); ctx.fill();

    if (scene !== "hole") {
      ctx.strokeStyle = "rgba(185,200,222,0.05)";
      ctx.beginPath();
      if (scene === "band") { // guide line through the band
        ctx.moveTo(0, cy() - cx() * Math.tan(BAND_ANG));
        ctx.lineTo(W, cy() + (W - cx()) * Math.tan(BAND_ANG));
      } else {
        ctx.ellipse(cx(), cy(), W * RING.a, H * RING.b, 0, 0, Math.PI * 2);
      }
      ctx.stroke();
    }

    if (!reduced) requestAnimationFrame(tick);
  }

  // scene switching (landing only — other pages have no scene nav)
  window.cosmosScene = function (id, btn) {
    if (id === scene) return;
    scene = id; seed();
    document.querySelectorAll(".hero-scene-nav button").forEach(b => b.classList.remove("on"));
    if (btn) btn.classList.add("on");
  };

  cv.parentElement.addEventListener("pointermove", e => {
    const r = cv.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
  });
  cv.parentElement.addEventListener("pointerleave", () => { mouse.x = mouse.y = -9e3; });

  resize(); seed(); tick();
  addEventListener("resize", () => { resize(); seed(); });
})();
