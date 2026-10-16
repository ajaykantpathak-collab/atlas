// galaxy.js — the signature surface, fixed.
// Rules: <=12 labels ever, zero overlap (spatial-hash placement),
// zoom-gated detail (subject -> topic -> star), ignition on click.
(function () {
  const cv = document.getElementById("galaxy");
  if (!cv) return;
  const ctx = cv.getContext("2d");
  let W, H, dpr;

  // soft glow sprite — stars are light, not pixels
  const SPR = document.createElement("canvas");
  SPR.width = SPR.height = 32;
  (() => {
    const s = SPR.getContext("2d");
    const g = s.createRadialGradient(16, 16, 0, 16, 16, 16);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.35, "rgba(235,240,255,0.5)");
    g.addColorStop(1, "rgba(235,240,255,0)");
    s.fillStyle = g; s.fillRect(0, 0, 32, 32);
  })();

  // --- demo constellation: Class 9 Science, signed-out preview ---
  const SUBJECTS = [
    { name: "PHYSICS",    col: "#6fb3e8", cx: 0.28, cy: 0.34 },
    { name: "CHEMISTRY",  col: "#4fd0a5", cx: 0.68, cy: 0.30 },
    { name: "BIOLOGY",    col: "#d98fd6", cx: 0.38, cy: 0.66 },
    { name: "MATHEMATICS",col: "#e8b54f", cx: 0.72, cy: 0.62 }
  ];
  const TOPICS = {
    PHYSICS: ["Motion", "Force & Laws", "Gravitation", "Work & Energy", "Sound"],
    CHEMISTRY: ["Matter", "Atoms & Molecules", "Structure of Atom"],
    BIOLOGY: ["Cell", "Tissues", "Diversity", "Why We Fall Ill"],
    MATHEMATICS: ["Number Systems", "Polynomials", "Coordinate Geo", "Linear Eqn", "Triangles", "Circles"]
  };
  // pre-lit mastered stars (demo): first 2 topics of physics, 1 of biology
  const LIT = { "PHYSICS:Motion": true, "PHYSICS:Force & Laws": true, "BIOLOGY:Cell": true };

  const stars = [];   // {x,y,col,lit,topic,subject}
  const clusters = []; // {subject, x, y, col, topics:[{name,x,y,n,lit}]}
  let rng = 7;
  const rand = () => (rng = (rng * 16807) % 2147483647) / 2147483647;

  function build() {
    stars.length = 0; clusters.length = 0;
    for (const s of SUBJECTS) {
      const sx = s.cx * W, sy = s.cy * H;
      const cl = { subject: s.name, x: sx, y: sy, col: s.col, topics: [] };
      const tops = TOPICS[s.name];
      tops.forEach((tname, ti) => {
        const ang = (ti / tops.length) * Math.PI * 2 + rand();
        const tr = 60 + rand() * 50;
        const tx = sx + Math.cos(ang) * tr * 1.35, ty = sy + Math.sin(ang) * tr;
        const n = 14 + Math.floor(rand() * 14);
        let litN = 0;
        for (let i = 0; i < n; i++) {
          const a = rand() * Math.PI * 2, r = Math.sqrt(rand()) * 44;
          const lit = LIT[`${s.name}:${tname}`] ? rand() < 0.7 : rand() < 0.04;
          if (lit) litN++;
          stars.push({
            x: tx + Math.cos(a) * r * 1.3, y: ty + Math.sin(a) * r,
            col: s.col, lit, topic: tname, subject: s.name,
            sz: lit ? 1.4 + rand() * 1.6 : 0.6 + rand() * 0.9,
            tw: rand() * Math.PI * 2, gx: 0, gy: 0
          });
        }
        cl.topics.push({ name: tname, x: tx, y: ty, n, lit: litN });
      });
      clusters.push(cl);
    }
    // scattered background stars
    for (let i = 0; i < 180; i++)
      stars.push({ x: rand() * W, y: rand() * H, col: "#5c5870", lit: false,
        topic: "", subject: "", sz: 0.4 + rand() * 0.7, tw: rand() * 6, gx: 0, gy: 0, bg: true });
  }

  // --- view ---
  const view = { zoom: 1, ox: 0, oy: 0 };
  let t = 0, ignitions = [];
  const mouse = { x: -9e3, y: -9e3 };
  let hover = null;

  // label placement with spatial-hash collision: sorted by priority,
  // skip any box that overlaps an accepted one. Zero overlap guaranteed.
  function placeLabels(cands) {
    const placed = [];
    const PAD = 4;
    function hit(b) {
      return placed.some(p =>
        b.x < p.x + p.w + PAD && b.x + b.w + PAD > p.x &&
        b.y < p.y + p.h + PAD && b.y + b.h + PAD > p.y);
    }
    cands.sort((a, b) => b.pri - a.pri);
    const out = [];
    for (const c of cands) {
      ctx.font = c.font;
      const w = ctx.measureText(c.text).width;
      const box = { x: c.x - w / 2, y: c.y - 7, w, h: 14 };
      if (box.x < 6 || box.x + box.w > W - 6 || box.y < 30 || box.y + box.h > H - 8) continue;
      if (hit(box)) continue;
      placed.push(box); out.push(c);
      if (out.length >= 12) break; // hard cap: never more than 12 labels
    }
    return out;
  }

  function draw() {
    t += 1;
    ctx.clearRect(0, 0, W, H);
    ctx.save();
    ctx.translate(view.ox, view.oy);
    ctx.scale(view.zoom, view.zoom);

    hover = null;
    const mx = (mouse.x - view.ox) / view.zoom, my = (mouse.y - view.oy) / view.zoom;

    for (const s of stars) {
      const tw = 0.55 + 0.45 * Math.sin(s.tw + t * 0.025);
      const a = s.bg ? 0.35 * tw : (s.lit ? 0.95 : 0.30 + 0.15 * tw);
      const sz = s.sz * (s.lit ? 1.6 : 1);
      // halo
      ctx.globalAlpha = a * (s.lit ? 0.55 : 0.30);
      const hd = sz * (s.lit ? 10 : 5);
      ctx.globalCompositeOperation = "lighter";
      ctx.drawImage(SPR, s.x - hd / 2, s.y - hd / 2, hd, hd);
      ctx.globalCompositeOperation = "source-over";
      // colored core
      ctx.globalAlpha = a;
      ctx.fillStyle = s.bg ? "#4a4760" : s.col;
      ctx.beginPath(); ctx.arc(s.x, s.y, Math.max(0.7, sz * 0.7), 0, 7); ctx.fill();
      if (!s.bg && Math.abs(s.x - mx) < 7 && Math.abs(s.y - my) < 7) hover = s;
    }

    // ignitions
    ignitions = ignitions.filter(ig => t - ig.t0 < 40);
    for (const ig of ignitions) {
      const p = (t - ig.t0) / 40;
      ctx.globalAlpha = (1 - p) * 0.8;
      ctx.strokeStyle = ig.col; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(ig.x, ig.y, 6 + p * 46, 0, 7); ctx.stroke();
      ctx.globalAlpha = (1 - p) * 0.5;
      ctx.beginPath(); ctx.arc(ig.x, ig.y, 3 + p * 20, 0, 7); ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.restore();

    // ---- labels: zoom-gated, collision-free, <=12 ----
    const cands = [];
    const Z = view.zoom;
    if (Z < 1.6) {                       // far: subjects only
      for (const c of clusters)
        cands.push({ text: c.subject, x: c.x * Z + view.ox, y: c.y * Z + view.oy - 58,
          col: c.col, pri: 3, font: "600 11px 'Cascadia Code', monospace" });
    } else if (Z < 2.6) {                // mid: topics
      for (const c of clusters) {
        cands.push({ text: c.subject, x: c.x * Z + view.ox, y: c.y * Z + view.oy - 100,
          col: c.col, pri: 4, font: "600 11px 'Cascadia Code', monospace" });
        for (const tp of c.topics)
          cands.push({ text: `${tp.name} · ${tp.lit}/${tp.n}`,
            x: tp.x * Z + view.ox, y: tp.y * Z + view.oy - 50,
            col: "#b9b4a8", pri: tp.lit > 0 ? 3 : 1,
            font: "10px 'Cascadia Code', monospace" });
      }
    } else {                             // near: star-level
      for (const s of stars)
        if (!s.bg && s.lit)
          cands.push({ text: s.topic, x: s.x * Z + view.ox, y: s.y * Z + view.oy - 14,
            col: s.col, pri: 2, font: "9.5px 'Cascadia Code', monospace" });
    }
    for (const c of placeLabels(cands)) {
      ctx.font = c.font; ctx.textAlign = "center";
      ctx.globalAlpha = 0.95; ctx.fillStyle = c.col;
      ctx.fillText(c.text.toUpperCase(), c.x, c.y);
    }
    ctx.globalAlpha = 1;

    // hover readout
    if (hover) {
      const hx = hover.x * view.zoom + view.ox, hy = hover.y * view.zoom + view.oy;
      ctx.font = "10px 'Cascadia Code', monospace"; ctx.textAlign = "left";
      const txt = `${hover.subject} · ${hover.topic} ${hover.lit ? "· BRIGHT" : "· DIM"}`;
      const tw2 = ctx.measureText(txt).width;
      ctx.fillStyle = "rgba(5,6,10,0.85)";
      ctx.fillRect(hx + 10, hy - 24, tw2 + 16, 20);
      ctx.strokeStyle = "rgba(232,230,223,0.25)"; ctx.strokeRect(hx + 10, hy - 24, tw2 + 16, 20);
      ctx.fillStyle = hover.col; ctx.fillText(txt, hx + 18, hy - 10);
    }

    requestAnimationFrame(draw);
  }

  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  let drag = null;
  cv.addEventListener("pointerdown", e => { drag = { x: e.clientX, y: e.clientY, ox: view.ox, oy: view.oy }; });
  addEventListener("pointermove", e => {
    const r = cv.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    if (drag) { view.ox = drag.ox + e.clientX - drag.x; view.oy = drag.oy + e.clientY - drag.y; }
  });
  addEventListener("pointerup", e => {
    if (drag && Math.abs(e.clientX - drag.x) < 5 && Math.abs(e.clientY - drag.y) < 5 && hover && !hover.lit) {
      hover.lit = true; ignitions.push({ x: hover.x, y: hover.y, col: hover.col, t0: t });
    }
    drag = null;
  });
  cv.addEventListener("wheel", e => {
    e.preventDefault();
    const z0 = view.zoom;
    view.zoom = Math.min(4, Math.max(0.7, view.zoom * (e.deltaY < 0 ? 1.15 : 0.87)));
    const r = cv.getBoundingClientRect();
    const mx = e.clientX - r.left, my = e.clientY - r.top;
    view.ox = mx - (mx - view.ox) * (view.zoom / z0);
    view.oy = my - (my - view.oy) * (view.zoom / z0);
  }, { passive: false });

  resize(); build(); draw();
  addEventListener("resize", () => { resize(); build(); });
})();
